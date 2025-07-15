
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateGrammarLesson, type GrammarLessonOutput } from "@/ai/flows/grammar-flow";
import { VocabularyWord } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


const allWords: VocabularyWord[] = [
  { id: "1", japanese: "日本語", reading: "にほんご", meaning: "Japanese language", deckId: "1" },
  { id: "2", japanese: "食べる", reading: "たべる", meaning: "To eat", deckId: "2" },
  { id: "3", japanese: "大きい", reading: "おおきい", meaning: "Big", deckId: "1" },
  { id: "4", japanese: "コンピューター", reading: "こんぴゅーたー", meaning: "Computer", deckId: "3" },
  { id: "5", japanese: "アプリケーション", reading: "あぷりけーしょん", meaning: "Application", deckId: "3" },
  { id: "6", japanese: "こんにちは", reading: "こんにちは", meaning: "Hello", deckId: "1" },
  { id: "7", japanese: "ありがとう", reading: "ありがとう", meaning: "Thank you", deckId: "1" },
  { id: "8", japanese: "寿司", reading: "すし", meaning: "Sushi", deckId: "2" },
  { id: "9", japanese: "ラーメン", reading: "らーめん", meaning: "Ramen", deckId: "2" },
  { id: "10", japanese: "空港", reading: "くうこう", meaning: "Airport", deckId: "3" },
];

export function GrammarGuide() {
  const [selectedTopic, setSelectedTopic] = useState<string>("Beginner");
  const [lesson, setLesson] = useState<GrammarLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLesson = async () => {
    setIsLoading(true);
    setError(null);
    setLesson(null);

    try {
      const vocabularyList = allWords.map(word => word.japanese);
      const result = await generateGrammarLesson({ topic: selectedTopic, vocabulary: vocabularyList });
      setLesson(result);
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate a lesson right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Grammar Guide</CardTitle>
          <CardDescription>Select a topic and let our AI generate a custom grammar lesson for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select a grammar topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner (e.g. N5)</SelectItem>
              <SelectItem value="Intermediate">Intermediate (e.g. N3)</SelectItem>
              <SelectItem value="Advanced">Advanced (e.g. N1)</SelectItem>
              <SelectItem value="Particles">Topic: Particles (は, が, を)</SelectItem>
              <SelectItem value="Verb Conjugation">Topic: Verb Conjugation</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateLesson} disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate Lesson"}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {lesson && (
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-lg text-accent">Explanation</h3>
              <p className="text-muted-foreground">{lesson.explanation}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg text-accent">Example Sentences</h3>
              <ul className="space-y-3">
                {lesson.exampleSentences.map((ex, index) => (
                  <li key={index} className="border-l-2 border-primary pl-3">
                    <p className="font-bold text-md">{ex.japanese}</p>
                    <p className="text-sm text-muted-foreground">{ex.reading}</p>
                    <p className="text-sm italic">{ex.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
