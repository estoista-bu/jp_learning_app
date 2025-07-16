
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import type { VocabularyWord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/flashcard";
import { cn } from "@/lib/utils";

type AnimationDirection = "left" | "right" | "none";

interface FlashcardViewerProps {
    words: VocabularyWord[];
    isKana?: boolean;
    onEdit: (word: VocabularyWord) => void;
    onRemove: (id: string) => void;
}

export function FlashcardViewer({ words, isKana, onEdit, onRemove }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("none");
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [shuffledWords, setShuffledWords] = useState<VocabularyWord[]>([]);
  
  useEffect(() => {
    setShuffledWords([...words]);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [words]);


  const minSwipeDistance = 50;

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (shuffledWords.length < 2) return;
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setAnimationDirection(direction === 'next' ? 'right' : 'left');
    
    animationTimeoutRef.current = setTimeout(() => {
       if (direction === 'next') {
         setCurrentIndex((prev) => (prev + 1) % shuffledWords.length);
       } else {
         setCurrentIndex((prev) => (prev - 1 + shuffledWords.length) % shuffledWords.length);
       }
       setIsFlipped(false);
       setAnimationDirection('none');
    }, 100);
  };

  const goToNext = () => handleNavigation('next');
  const goToPrevious = () => handleNavigation('prev');

  const shuffle = () => {
    if (shuffledWords.length < 2) return;
    const newShuffledWords = [...shuffledWords];
    for (let i = newShuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newShuffledWords[i], newShuffledWords[j]] = [newShuffledWords[j], newShuffledWords[i]];
    }
    setShuffledWords(newShuffledWords);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setIsFlipped(false);
          break;
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
  }, [shuffledWords, currentIndex]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentWord = shuffledWords.length > 0 ? shuffledWords[currentIndex] : null;

  return (
    <div className="flex flex-col w-full h-full">
        <div 
            className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {currentWord ? (
            <div
                key={currentWord.id}
                className={cn(
                "w-full h-72",
                animationDirection === 'right' && 'animate-slide-out-to-left',
                animationDirection === 'left' && 'animate-slide-out-to-right',
                animationDirection === 'none' && 'animate-slide-in'
                )}
            >
                <Flashcard
                    word={currentWord}
                    onRemove={() => onRemove(currentWord.id)}
                    onEdit={() => onEdit(currentWord)}
                    isKana={isKana}
                    isFlipped={isFlipped}
                    onFlip={() => setIsFlipped(!isFlipped)}
                    mode="view"
                />
            </div>
            ) : null}
        </div>
        
        {shuffledWords.length > 0 && (
            <footer className="flex items-center justify-between p-4 border-t">
            <Button variant="outline" size="icon" onClick={goToPrevious} disabled={shuffledWords.length < 2}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous word</span>
            </Button>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={shuffle} disabled={shuffledWords.length < 2}>
                <Shuffle className="h-4 w-4" />
                <span className="sr-only">Shuffle words</span>
                </Button>
                <p className="text-sm text-muted-foreground">
                {currentIndex + 1} / {shuffledWords.length}
                </p>
            </div>
            <Button variant="outline" size="icon" onClick={goToNext} disabled={shuffledWords.length < 2}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next word</span>
            </Button>
            </footer>
        )}
    </div>
  );
}
