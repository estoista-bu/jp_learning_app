
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle, Wand2, Lightbulb } from "lucide-react";
import {
  checkGrammar,
  type GrammarCheckOutput,
} from "@/ai/flows/grammar-checker-flow";

export function GrammarChecker() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GrammarCheckOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckGrammar = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await checkGrammar({ text });
      setResult(response);
    } catch (e) {
      setError("An error occurred while checking the grammar. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            <span>AI Grammar Checker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type or paste Japanese text here... (e.g., 私の犬は速い走る)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="text-base"
          />
          <Button
            onClick={handleCheckGrammar}
            disabled={isLoading || !text.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check Grammar"
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-4 animate-in fade-in">
          {result.isCorrect ? (
            <Alert variant="default" className="border-green-500">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700 dark:text-green-400">
                No Errors Found!
              </AlertTitle>
              <AlertDescription>
                The provided text appears to be grammatically correct.
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-2">Corrected Text:</h3>
                  <p className="p-3 bg-muted rounded-md text-lg">{result.correctedText}</p>
                </div>

                <div className="space-y-3">
                   <h3 className="font-semibold text-muted-foreground">Mistakes Found:</h3>
                  {result.mistakes.map((mistake, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="line-through text-muted-foreground">{mistake.original}</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{mistake.correction}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 mt-3 pt-3 border-t">
                         <Lightbulb className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                         <p className="text-sm text-muted-foreground">{mistake.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
