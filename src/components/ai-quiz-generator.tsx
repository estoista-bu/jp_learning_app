
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { grammarLessons } from '@/data/lessons';
import type { Quiz } from '@/lib/types';

interface AiQuizGeneratorProps {
    onQuizGenerated: (quiz: Quiz) => void;
}

export function AiQuizGenerator({ onQuizGenerated }: AiQuizGeneratorProps) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    try {
      const result = await generateQuiz({ lessons: grammarLessons, numQuestions });
      const generatedQuiz: Quiz = {
        id: 'ai-generated',
        title: `AI Generated Quiz (${numQuestions} Questions)`,
        level: 'AI',
        questions: result.questions,
      };
      onQuizGenerated(generatedQuiz);
    } catch (error) {
      console.error('AI Quiz generation failed:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Failed to generate the quiz. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            AI Quiz Generator
          </CardTitle>
          <CardDescription>
            Create a custom quiz based on all available grammar lessons.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="numQuestions">Number of Questions (1-10)</Label>
            <Input
              id="numQuestions"
              type="number"
              min="1"
              max="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1)))}
              className="mt-2"
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleGenerateQuiz} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Quiz'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
