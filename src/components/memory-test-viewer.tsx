"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { VocabularyWord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as wanakana from 'wanakana';
import { ArrowRight } from "lucide-react";

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
  const [history, setHistory] = useState<WeightedWord[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const memoryTestData = JSON.parse(localStorage.getItem(`memoryTestResults_${userId}`) || '{}');
    const initialWords = words.map(word => ({ 
        ...word, 
        weight: memoryTestData[word.id] === 'known' ? 1 : 10 
    }));
    setWeightedWords(initialWords);
    setHistory([]);
    setHistoryIndex(-1);
  }, [words, userId]);
  
  useEffect(() => {
    if (inputRef.current) {
        wanakana.bind(inputRef.current, { IMEMode: 'toHiragana' });
        inputRef.current.focus();
    }
    return () => {
        if (inputRef.current) {
            wanakana.unbind(inputRef.current);
        }
    }
  }, [historyIndex]);

  const selectNextWord = useCallback(() => {
    if (weightedWords.length === 0) return null;

    const totalWeight = weightedWords.reduce((sum, word) => sum + word.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const word of weightedWords) {
        random -= word.weight;
        if (random <= 0) {
            return word;
        }
    }
    return weightedWords[weightedWords.length - 1];
  }, [weightedWords]);

  useEffect(() => {
    if (weightedWords.length > 0 && history.length === 0) {
      const firstWord = selectNextWord();
      if (firstWord) {
        setHistory([firstWord]);
        setHistoryIndex(0);
      }
    }
  }, [weightedWords, history, selectNextWord]);
  
  const goToNext = useCallback(() => {
    if (historyIndex === history.length - 1) {
      const nextWord = selectNextWord();
      if (nextWord) {
        setHistory(prev => [...prev, nextWord]);
        setHistoryIndex(prev => prev + 1);
      }
    } else {
      setHistoryIndex(prev => prev + 1);
    }
    setInputValue('');
    setAnswerStatus('idle');
  }, [historyIndex, history.length, selectNextWord]);

  
  const handleGuess = (guessed: boolean) => {
    if (historyIndex < 0) return;
    
    const currentWord = history[historyIndex];
    
    // Save overall result
    const memoryTestData = JSON.parse(localStorage.getItem(`memoryTestResults_${userId}`) || '{}');
    memoryTestData[currentWord.id] = guessed ? 'known' : 'unknown';
    localStorage.setItem(`memoryTestResults_${userId}`, JSON.stringify(memoryTestData));

    // Save mastery stats
    const masteryStats = JSON.parse(localStorage.getItem(`wordMasteryStats_${userId}`) || '{}');
    if (!masteryStats[currentWord.id]) {
      masteryStats[currentWord.id] = { correct: 0 };
    }
    if(guessed) {
       masteryStats[currentWord.id].correct += 1;
    }
    localStorage.setItem(`wordMasteryStats_${userId}`, JSON.stringify(masteryStats));

    // Update weights for this session
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
    handleGuess(isCorrect);
  };
  
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (answerStatus === 'idle') {
        const value = e.currentTarget.value;
        setInputValue(value); // Sync state with the final input value
        checkAnswer(value);
      } else {
        goToNext();
      }
    }
  };

  const handleDontKnow = () => {
    if (answerStatus !== 'idle') return;
    // Set input to something guaranteed to be incorrect
    const incorrectAnswer = "---";
    setInputValue(incorrectAnswer);
    checkAnswer(incorrectAnswer);
  }

  const currentWord = historyIndex >= 0 ? history[historyIndex] : null;

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


  return (
    <div className={cn("flex flex-col w-full h-full transition-colors duration-300", getBackgroundColor())}>
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden space-y-8">
            {currentWord ? (
            <div
                key={`${currentWord.id}-${historyIndex}`}
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
                    <Button type="button" onClick={goToNext} className="w-full mt-4">
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 )}
            </div>
        </div>
        
        <footer className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground w-1/3">
                {/* Placeholder for future use */}
            </p>
            <p className="text-sm text-muted-foreground w-1/3 text-center">
                Test: {historyIndex + 1}
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
