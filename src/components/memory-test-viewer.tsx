
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { VocabularyWord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/flashcard";
import { cn } from "@/lib/utils";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip as ChartTooltipPrimitive,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "./ui/scroll-area";


type AnimationDirection = "left" | "right" | "none";

interface MemoryTestViewerProps {
    words: VocabularyWord[];
    isKana?: boolean;
    userId: string;
}

interface WeightedWord extends VocabularyWord {
  weight: number;
}

export function MemoryTestViewer({ words, isKana, userId }: MemoryTestViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("none");
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showStats, setShowStats] = useState(false);

  const [weightedWords, setWeightedWords] = useState<WeightedWord[]>([]);
  const [history, setHistory] = useState<WeightedWord[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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


  const handleGuess = (guessed: boolean) => {
    if (historyIndex < 0) return;
    
    const currentWord = history[historyIndex];
    
    const memoryTestData = JSON.parse(localStorage.getItem(`memoryTestResults_${userId}`) || '{}');
    memoryTestData[currentWord.id] = guessed ? 'known' : 'unknown';
    localStorage.setItem(`memoryTestResults_${userId}`, JSON.stringify(memoryTestData));

    if (guessed) {
      const masteryStats = JSON.parse(localStorage.getItem(`wordMasteryStats_${userId}`) || '{}');
      if (!masteryStats[currentWord.id]) {
        masteryStats[currentWord.id] = { correct: 0 };
      }
      masteryStats[currentWord.id].correct += 1;
      localStorage.setItem(`wordMasteryStats_${userId}`, JSON.stringify(masteryStats));
    }


    setWeightedWords(prevWords => {
        return prevWords.map(w => {
            if (w.id === currentWord.id) {
                const newWeight = guessed ? Math.max(1, w.weight / 10) : w.weight * 10;
                return { ...w, weight: newWeight };
            }
            return w;
        });
    });

    setTimeout(() => goToNext(), 100);
  };
  
  const handleNavigation = (direction: 'next' | 'prev') => {
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    
    setAnimationDirection(direction === 'next' ? 'right' : 'left');

    animationTimeoutRef.current = setTimeout(() => {
      setIsFlipped(false);

      if (direction === 'next') {
        if (historyIndex === history.length - 1) {
          const nextWord = selectNextWord();
          if (nextWord) {
            setHistory(prev => [...prev, nextWord]);
            setHistoryIndex(prev => prev + 1);
          }
        } else {
          setHistoryIndex(prev => prev + 1);
        }
      } else { 
        if (historyIndex > 0) {
          setHistoryIndex(prev => prev - 1);
        }
      }
      setAnimationDirection('none');
    }, 100);
  };

  const goToNext = () => handleNavigation('next');
  const goToPrevious = () => handleNavigation('prev');
  
  const canGoForward = historyIndex < history.length - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFlipped) {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            setIsFlipped(false);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            handleGuess(false); // Didn't Know
            break;
          case 'ArrowRight':
            e.preventDefault();
            handleGuess(true); // Knew It
            break;
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          if (historyIndex > 0) {
            goToPrevious();
          }
          break;
        case 'ArrowRight':
          if (canGoForward) {
            goToNext();
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
           e.preventDefault();
           setIsFlipped(true);
           break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [historyIndex, history.length, isFlipped, canGoForward, goToPrevious, goToNext, handleGuess]);

  const currentWord = historyIndex >= 0 ? history[historyIndex] : null;

  const totalWeight = weightedWords.reduce((sum, word) => sum + word.weight, 0);
  const chartData = weightedWords.map(word => ({
    name: word.japanese,
    probability: totalWeight > 0 ? (word.weight / totalWeight) * 100 : 0,
    weight: word.weight,
  })).sort((a, b) => a.name.localeCompare(b.name, 'ja'));

  const formatLabel = (value: number) => {
    if (value >= 1) {
      return value.toFixed(0);
    }
    return value.toFixed(2);
  };

  return (
    <div className="flex flex-col w-full h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
            {currentWord ? (
            <div
                key={`${currentWord.id}-${historyIndex}`}
                className={cn(
                    "w-full h-72",
                    animationDirection === 'right' && 'animate-slide-out-to-left',
                    animationDirection === 'left' && 'animate-slide-out-to-right',
                    animationDirection === 'none' && 'animate-slide-in'
                )}
            >
                <Flashcard
                    word={currentWord}
                    isKana={isKana}
                    isFlipped={isFlipped}
                    onFlip={() => setIsFlipped(!isFlipped)}
                    mode="test"
                    onGuess={handleGuess}
                />
            </div>
            ) : (
                 <p className="text-muted-foreground">Loading test...</p>
            )}
        </div>

        {showStats && (
            <div className="px-4 pb-2">
                <Card>
                    <CardHeader className="py-2 px-4">
                        <CardTitle className="text-sm">Debug: Word Probability</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                    <ScrollArea className="h-40 w-full">
                        <ChartContainer
                            config={{
                                probability: {
                                    label: "Probability",
                                    color: "hsl(var(--primary))",
                                },
                            }}
                            className="h-[500px]"
                        >
                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                                    width={60}
                                />
                                <ChartTooltipPrimitive
                                    cursor={{ fill: "hsl(var(--muted))" }}
                                    content={<ChartTooltipContent
                                        formatter={(value, name, props) => (
                                            <>
                                                <div className="font-medium">{props.payload.name}</div>
                                                <div className="text-muted-foreground">
                                                    <p>Weight: {Number(props.payload.weight).toPrecision(3)}</p>
                                                    <p>Chance: {Number(value).toFixed(2)}%</p>
                                                </div>
                                            </>
                                        )}
                                    />}
                                />
                                <Bar dataKey="probability" radius={4}>
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        )}
        
        <footer className="flex items-center justify-between p-4 border-t">
            <Button variant="outline" size="icon" onClick={goToPrevious} disabled={historyIndex <= 0}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous word</span>
            </Button>
            
            <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                    {historyIndex + 1} / {history.length}
                </p>
                <div className="flex items-center space-x-2">
                    <Checkbox id="stats" checked={showStats} onCheckedChange={(checked) => setShowStats(!!checked)} />
                    <Label htmlFor="stats" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        stats
                    </Label>
                </div>
            </div>

            <Button variant="outline" size="icon" onClick={goToNext} disabled={!canGoForward}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next word</span>
            </Button>
        </footer>
    </div>
  );
}
