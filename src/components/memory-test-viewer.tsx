
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { VocabularyWord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/flashcard";
import { cn } from "@/lib/utils";

type AnimationDirection = "left" | "right" | "none";

interface MemoryTestViewerProps {
    words: VocabularyWord[];
    isKana?: boolean;
}

interface WeightedWord extends VocabularyWord {
  weight: number;
}

export function MemoryTestViewer({ words, isKana }: MemoryTestViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("none");
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [weightedWords, setWeightedWords] = useState<WeightedWord[]>([]);
  const [history, setHistory] = useState<WeightedWord[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Initialize words with a default weight
    const initialWords = words.map(word => ({ ...word, weight: 3 }));
    setWeightedWords(initialWords);
    setHistory([]);
    setHistoryIndex(-1);
  }, [words]);

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
    // Fallback in case of floating point inaccuracies
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
    setWeightedWords(prevWords => {
        return prevWords.map(w => {
            if (w.id === currentWord.id) {
                // If guessed correctly, decrease weight (min 1). If incorrect, increase weight.
                const newWeight = guessed ? Math.max(1, w.weight - 2) : w.weight + 4;
                return { ...w, weight: newWeight };
            }
            return w;
        });
    });

    // Automatically move to the next card
    setTimeout(() => goToNext(), 100);
  };
  
  const handleNavigation = (direction: 'next' | 'prev') => {
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    
    setAnimationDirection(direction === 'next' ? 'right' : 'left');

    animationTimeoutRef.current = setTimeout(() => {
      setIsFlipped(false);

      if (direction === 'next') {
        // If we are at the end of history, generate a new word
        if (historyIndex === history.length - 1) {
          const nextWord = selectNextWord();
          if (nextWord) {
            setHistory(prev => [...prev, nextWord]);
            setHistoryIndex(prev => prev + 1);
          }
        } else {
          // Otherwise, just move forward in history
          setHistoryIndex(prev => prev + 1);
        }
      } else { // 'prev'
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
      // Don't navigate with arrow keys while answer buttons are shown
      if (isFlipped) {
        // Allow flipping back with up/down arrows
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsFlipped(false);
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
          // Allow right arrow to navigate forward in history, but not past the end
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
  }, [historyIndex, history.length, isFlipped, canGoForward]);

  const currentWord = historyIndex >= 0 ? history[historyIndex] : null;

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
        
        <footer className="flex items-center justify-between p-4 border-t">
        <Button variant="outline" size="icon" onClick={goToPrevious} disabled={historyIndex <= 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous word</span>
        </Button>

        <p className="text-sm text-muted-foreground">
            {historyIndex + 1} / {history.length}
        </p>

        <Button variant="outline" size="icon" onClick={goToNext} disabled={!canGoForward}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next word</span>
        </Button>
        </footer>
    </div>
  );
}
