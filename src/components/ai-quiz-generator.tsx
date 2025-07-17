
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { grammarLessons } from '@/data/lessons';
import { allDecks as initialDecks } from '@/data/decks';
import type { Quiz, Deck, VocabularyWord } from '@/lib/types';

interface AiQuizGeneratorProps {
    onQuizGenerated: (quiz: Quiz) => void;
}

export function AiQuizGenerator({ onQuizGenerated }: AiQuizGeneratorProps) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [allDecks, setAllDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>('none');

  useEffect(() => {
    const userDecks: Deck[] = JSON.parse(localStorage.getItem("userDecks") || "[]");
    const combined = [...initialDecks.filter(d => d.category === 'user'), ...userDecks];
    setAllDecks(combined);
  }, []);

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    try {
      let deckName: string | undefined;
      let vocabularyWords: VocabularyWord[] | undefined;
      let quizTitle = `AI Generated Quiz (${numQuestions} Questions)`;

      if (selectedDeckId !== 'none') {
        const selectedDeck = allDecks.find(d => d.id === selectedDeckId);
        if (selectedDeck) {
          deckName = selectedDeck.name;
          vocabularyWords = JSON.parse(localStorage.getItem(`words_${selectedDeckId}`) || "[]");
          quizTitle = `AI Quiz for "${deckName}"`;
        }
      }

      const result = await generateQuiz({ 
        lessons: grammarLessons, 
        numQuestions,
        deckName,
        vocabularyWords,
      });

      const generatedQuiz: Quiz = {
        id: 'ai-generated',
        title: quizTitle,
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
            Create a custom quiz based on all grammar lessons and chosen decks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="numQuestions">Number of Questions (1-100)</Label>
            <Input
              id="numQuestions"
              type="number"
              min="1"
              max="100"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)))}
              className="mt-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="deckSelect">Focus on a Deck (Optional)</Label>
            <Select value={selectedDeckId} onValueChange={setSelectedDeckId} disabled={isLoading}>
                <SelectTrigger id="deckSelect" className="mt-2">
                    <SelectValue placeholder="Select a deck" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None (General Quiz)</SelectItem>
                    {allDecks.map(deck => (
                        <SelectItem key={deck.id} value={deck.id}>
                            {deck.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
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
