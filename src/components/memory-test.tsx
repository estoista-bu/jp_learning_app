
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { VocabularyWord } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Flashcard } from '@/components/flashcard';
import { cn } from '@/lib/utils';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type AnimationDirection = "left" | "right" | "none";

interface MemoryTestProps {
    words: VocabularyWord[];
    isKana?: boolean;
    onBack: () => void;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export function MemoryTest({ words, isKana, onBack }: MemoryTestProps) {
  const [sessionState, setSessionState] = useState<{
      history: VocabularyWord[];
      upcoming: VocabularyWord[];
      currentIndex: number;
  }>({ history: [], upcoming: [], currentIndex: -1 });

  const [isFlipped, setIsFlipped] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>('none');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Start a new session when the component mounts or words change
    if (words.length > 0) {
      const initialUpcoming = shuffleArray([...words]);
      const firstWord = initialUpcoming.shift();
      if (firstWord) {
        setSessionState({
          history: [firstWord],
          upcoming: initialUpcoming,
          currentIndex: 0
        });
        setIsFlipped(false);
        setIsFinished(false);
      }
    }
  }, [words]);

  const currentWord = useMemo(() => {
    if (sessionState.currentIndex < 0 || sessionState.currentIndex >= sessionState.history.length) {
      return null;
    }
    return sessionState.history[sessionState.currentIndex];
  }, [sessionState.currentIndex, sessionState.history]);

  const goToNext = useCallback((nextWord: VocabularyWord) => {
    setAnimationDirection('right');
    setTimeout(() => {
        setSessionState(prev => ({
            ...prev,
            history: [...prev.history, nextWord],
            currentIndex: prev.history.length
        }));
        setIsFlipped(false);
        setAnimationDirection('none');
    }, 150);
  }, []);

  const handleGuess = useCallback((correct: boolean) => {
    if (!currentWord) return;

    let newUpcoming = [...sessionState.upcoming];
    if (!correct) {
      // If guessed wrong, add it back to the upcoming list, but not right at the start.
      // Insert it somewhere in the first half to see it again soon.
      const insertIndex = Math.floor(Math.random() * (Math.min(newUpcoming.length, 5) + 1));
      newUpcoming.splice(insertIndex, 0, currentWord);
    }
    
    const nextWord = newUpcoming.shift();

    if (nextWord) {
        setSessionState(prev => ({ ...prev, upcoming: newUpcoming }));
        goToNext(nextWord);
    } else {
        // No more words, test is finished
        setIsFinished(true);
    }
  }, [currentWord, sessionState.upcoming, goToNext]);


  const goToPrevious = () => {
    if (sessionState.currentIndex > 0) {
        setAnimationDirection('left');
        setTimeout(() => {
            setSessionState(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }));
            setIsFlipped(false);
            setAnimationDirection('none');
        }, 150);
    }
  };

  if (isFinished) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <Card className="text-center p-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Great work!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You've completed this memory session.</p>
                    <Button onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Deck
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        {currentWord && (
          <div
            key={`${currentWord.id}-${sessionState.currentIndex}`}
            className={cn(
              "w-full h-72",
              animationDirection === 'right' && 'animate-slide-out-to-left',
              animationDirection === 'left' && 'animate-slide-out-to-right',
              animationDirection === 'none' && 'animate-slide-in'
            )}
          >
            <Flashcard
              word={currentWord}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              isKana={isKana}
              onEdit={() => {}} 
              onRemove={() => {}}
              hideControls={true} 
            />
          </div>
        )}
      </div>

      <footer className="p-4 border-t">
        {isFlipped ? (
            <div className="flex justify-around gap-4 animate-in fade-in">
                <Button className="w-full h-14 bg-red-600/20 hover:bg-red-600/30 text-red-800 dark:text-red-300" onClick={() => handleGuess(false)}>
                    <X className="mr-2"/> I did not guess it
                </Button>
                <Button className="w-full h-14 bg-green-600/20 hover:bg-green-600/30 text-green-800 dark:text-green-300" onClick={() => handleGuess(true)}>
                    <Check className="mr-2"/> I guessed it
                </Button>
            </div>
        ) : (
             <div className="flex justify-between items-center">
                <Button variant="outline" onClick={goToPrevious} disabled={sessionState.currentIndex <= 0}>
                   Previous
                </Button>
                 <Button variant="outline" onClick={onBack}>
                    End Test
                 </Button>
                <Button onClick={() => setIsFlipped(true)}>
                    Flip Card
                </Button>
             </div>
        )}
      </footer>
    </div>
  );
}
