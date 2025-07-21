
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { VocabularyWord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as wanakana from 'wanakana';
import { ArrowRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

type AnswerStatus = "idle" | "correct" | "incorrect";

interface MemoryTestViewerProps {
    words: VocabularyWord[];
    isKana?: boolean;
    userId: string;
}

interface WeightedWord extends VocabularyWord {
  weight: number;
}

export function MemoryTestViewer({ words, userId }: MemoryTestViewerProps) {
  const [weightedWords, setWeightedWords] = useState<WeightedWord[]>([]);
  const [currentWord, setCurrentWord] = useState<WeightedWord | null>(null);
  const [seenWords, setSeenWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
  const [showStats, setShowStats] = useState(false);
  const [isEnterLocked, setIsEnterLocked] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const memoryTestData = JSON.parse(localStorage.getItem(`memoryTestResults_${userId}`) || '{}');
    const initialWords = words.map(word => ({ 
        ...word, 
        weight: memoryTestData[word.id] === 'known' ? 1 : 10 
    }));
    setWeightedWords(initialWords);
    setSeenWords([]);
    setCurrentWord(null);
  }, [words, userId]);
  
  const selectNextWord = useCallback(() => {
    if (weightedWords.length === 0) return null;

    let availableWords = weightedWords;
    // If all words have been seen, reset the seenWords list
    if (seenWords.length >= weightedWords.length) {
      setSeenWords([]);
    } else {
      availableWords = weightedWords.filter(w => !seenWords.includes(w.id));
    }

    const totalWeight = availableWords.reduce((sum, word) => sum + word.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const word of availableWords) {
        random -= word.weight;
        if (random <= 0) {
            return word;
        }
    }
    return availableWords[availableWords.length - 1];
  }, [weightedWords, seenWords]);

  useEffect(() => {
    if (weightedWords.length > 0 && !currentWord) {
      const firstWord = selectNextWord();
      if (firstWord) {
        setCurrentWord(firstWord);
        setSeenWords([firstWord.id]);
        setIsEnterLocked(true); // Lock on initial load
      }
    }
  }, [weightedWords, currentWord, selectNextWord]);
  
  useEffect(() => {
    if (currentWord) {
      const timer = setTimeout(() => {
        setIsEnterLocked(false);
      }, 200); // 200ms delay to prevent instant enter
      return () => clearTimeout(timer);
    }
  }, [currentWord]);

  const goToNext = useCallback(() => {
    const nextWord = selectNextWord();
    if (nextWord) {
        setCurrentWord(nextWord);
        setSeenWords(prev => [...prev, nextWord.id]);
    } else {
        // Handle case where all words are exhausted or no words are available
        setCurrentWord(null);
    }
    setInputValue('');
    setAnswerStatus('idle');
    setIsEnterLocked(true);
  }, [selectNextWord]);
  
  useEffect(() => {
    if (inputRef.current) {
      if (answerStatus === 'idle') {
        wanakana.bind(inputRef.current, { IMEMode: 'toHiragana' });
        inputRef.current.focus();
      } else {
         wanakana.unbind(inputRef.current);
      }
    }
     if (answerStatus !== 'idle' && nextButtonRef.current) {
         nextButtonRef.current.focus();
     }
  }, [answerStatus]);
  
  const handleGuess = (guessed: boolean, answer: string) => {
    if (!currentWord) return;
    
    setInputValue(answer);
    
    const memoryTestData = JSON.parse(localStorage.getItem(`memoryTestResults_${userId}`) || '{}');
    memoryTestData[currentWord.id] = guessed ? 'known' : 'unknown';
    localStorage.setItem(`memoryTestResults_${userId}`, JSON.stringify(memoryTestData));

    const masteryStats = JSON.parse(localStorage.getItem(`wordMasteryStats_${userId}`) || '{}');
    if (!masteryStats[currentWord.id]) {
      masteryStats[currentWord.id] = { correct: 0, incorrect: 0 };
    }
    
    if (guessed) {
       masteryStats[currentWord.id].correct = (masteryStats[currentWord.id].correct || 0) + 1;
    } else {
       masteryStats[currentWord.id].correct = Math.max(0, (masteryStats[currentWord.id].correct || 0) - 1);
       masteryStats[currentWord.id].incorrect = (masteryStats[currentWord.id].incorrect || 0) + 1;
    }
    localStorage.setItem(`wordMasteryStats_${userId}`, JSON.stringify(masteryStats));

    setWeightedWords(prevWords => {
        return prevWords.map(w => {
            if (w.id === currentWord.id) {
                const newWeight = guessed ? Math.max(1, w.weight / 10) : w.weight * 10;
                return { ...w, weight: newWeight };
            }
            return w;
        });
    });

    setAnswerStatus(guessed ? 'correct' : 'incorrect');
  };
  
  const checkAnswer = (answer: string) => {
    if (answerStatus !== 'idle' || !currentWord) return;
    const isCorrect = wanakana.toHiragana(answer.trim()) === currentWord.reading;
    handleGuess(isCorrect, answer);
  };
  
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (answerStatus === 'idle' && !isEnterLocked) {
        e.preventDefault();
        checkAnswer(e.currentTarget.value);
      }
    }
  };

  const handleDontKnow = () => {
    if (answerStatus !== 'idle') return;
    const incorrectAnswer = "---";
    handleGuess(false, incorrectAnswer);
  }

  const getBackgroundColor = () => {
    if (answerStatus === 'correct') return 'bg-green-200 dark:bg-green-900';
    if (answerStatus === 'incorrect') return 'bg-red-200 dark:bg-red-900';
    return 'bg-background';
  }
  
  const getInputBorderColor = () => {
    if (answerStatus === 'correct') return 'border-green-600 focus-visible:ring-green-600';
    if (answerStatus === 'incorrect') return 'border-red-600 focus-visible:ring-red-600';
    return 'border-input';
  }
  
  const maxWeight = Math.max(...weightedWords.map(w => w.weight), 1);


  return (
    <div className={cn("flex flex-col w-full h-full transition-colors duration-300", getBackgroundColor())}>
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden space-y-8">
            {currentWord ? (
            <div
                key={`${currentWord.id}`}
                className="w-full text-center animate-in fade-in"
            >
                <p className="font-headline text-primary drop-shadow-sm text-7xl md:text-8xl break-all">
                  {currentWord.japanese}
                </p>
                <p className="text-muted-foreground mt-2 text-xl">{currentWord.meaning}</p>
            </div>
            ) : (
                 <p className="text-muted-foreground">Loading test...</p>
            )}
            
            <div className="w-full max-w-sm">
                 <Input
                    ref={inputRef}
                    type="text"
                    lang="ja"
                    placeholder="Enter reading..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={handleKeyUp}
                    disabled={answerStatus !== 'idle'}
                    className={cn(
                        "h-16 text-center text-3xl font-japanese tracking-widest",
                        "transition-colors duration-300",
                        getInputBorderColor()
                    )}
                 />
                 {answerStatus === 'incorrect' && currentWord && (
                    <div className="mt-2 text-center text-lg font-semibold text-red-700 dark:text-red-400 animate-in fade-in">
                        {currentWord.reading}
                    </div>
                 )}
                 {answerStatus !== 'idle' && (
                    <Button ref={nextButtonRef} type="button" onClick={goToNext} className="w-full mt-4">
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 )}
            </div>
            
            {showStats && (
                <Card className="w-full max-w-md animate-in fade-in">
                    <CardHeader>
                        <CardTitle>Word Weights</CardTitle>
                        <CardDescription>
                            Higher weights mean a word is more likely to appear next.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-48">
                            <div className="space-y-4 pr-3">
                                {weightedWords.sort((a, b) => b.weight - a.weight).map(word => (
                                    <div key={word.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="truncate pr-2">{word.japanese}</span>
                                            <span className="font-mono text-muted-foreground">{word.weight.toFixed(2)}</span>
                                        </div>
                                        <Progress value={(word.weight / maxWeight) * 100} />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}

        </div>
        
        <footer className="flex items-center justify-between p-4 border-t">
             <div className="w-1/3 flex items-center space-x-2">
                <Checkbox id="show-stats" checked={showStats} onCheckedChange={(checked) => setShowStats(!!checked)} />
                <Label htmlFor="show-stats" className="text-sm font-medium">Stats</Label>
            </div>
            <p className="text-sm text-muted-foreground w-1/3 text-center">
                Test Progress: {seenWords.length} / {words.length}
            </p>
            <div className="w-1/3 flex justify-end">
                {answerStatus === 'idle' && (
                    <Button onClick={handleDontKnow} variant="outline" disabled={answerStatus !== 'idle'}>
                       I don't know
                    </Button>
                )}
            </div>
        </footer>
    </div>
  );
}
