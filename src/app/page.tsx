
"use client";

import { useState, useRef } from "react";
import { Plus, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import type { VocabularyWord } from "@/lib/types";
import { VocabularyForm } from "@/components/vocabulary-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Flashcard } from "@/components/flashcard";
import { cn } from "@/lib/utils";

const initialWords: VocabularyWord[] = [
  { id: "1", japanese: "日本語", reading: "にほんご", meaning: "Japanese language" },
  { id: "2", japanese: "食べる", reading: "たべる", meaning: "To eat" },
  { id: "3", japanese: "大きい", reading: "おおきい", meaning: "Big" },
  { id: "4", japanese: "コンピューター", reading: "こんぴゅーたー", meaning: "Computer" },
  { id: "5", japanese: "アプリケーション", reading: "あぷりけーしょん", meaning: "Application" },
];

type AnimationDirection = "left" | "right" | "none";

export default function Home() {
  const [words, setWords] = useState<VocabularyWord[]>(initialWords);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("none");
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const addWord = (word: Omit<VocabularyWord, "id">) => {
    const newWord = { ...word, id: Date.now().toString() };
    setWords((prev) => {
      const newWords = [...prev, newWord];
      setCurrentIndex(newWords.length - 1);
      return newWords;
    });
    setIsFormOpen(false);
  };

  const removeWord = (id: string) => {
    setWords((prev) => {
      const newWords = prev.filter((word) => word.id !== id);
      if (currentIndex >= newWords.length && newWords.length > 0) {
        setCurrentIndex(newWords.length - 1);
      } else if (newWords.length === 0) {
        setCurrentIndex(0);
      }
      return newWords;
    });
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setAnimationDirection(direction === 'next' ? 'right' : 'left');
    
    animationTimeoutRef.current = setTimeout(() => {
       if (direction === 'next') {
         setCurrentIndex((prev) => (prev + 1) % words.length);
       } else {
         setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
       }
       setAnimationDirection('none');
    }, 150);
  };

  const goToNext = () => handleNavigation('next');
  const goToPrevious = () => handleNavigation('prev');

  const shuffleWords = () => {
    setWords((currentWords) => {
      const shuffled = [...currentWords];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setCurrentIndex(0);
  };
  
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

  const currentWord = words.length > 0 ? words[currentIndex] : null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-sm h-screen bg-background flex flex-col">
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <h1 className="font-headline text-xl font-bold text-primary">
            Nihongo Mastery
          </h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="w-8 h-8">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add New Word</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline">Add New Word</DialogTitle>
                <DialogDescription>
                  Register a new Japanese word to your vocabulary list.
                </DialogDescription>
              </DialogHeader>
              <VocabularyForm onAddWord={addWord} />
            </DialogContent>
          </Dialog>
        </header>

        <main 
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
                onRemove={() => removeWord(currentWord.id)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
              <p className="text-lg font-semibold">Your vocabulary is empty.</p>
              <p className="mt-2">
                Tap the <Plus className="inline h-4 w-4 mx-1" /> button to get started!
              </p>
            </div>
          )}
        </main>
        
        {words.length > 1 && (
          <footer className="flex items-center justify-between p-4 border-t">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous word</span>
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={shuffleWords}>
                <Shuffle className="h-4 w-4" />
                <span className="sr-only">Shuffle words</span>
              </Button>
              <p className="text-sm text-muted-foreground">
                {currentIndex + 1} / {words.length}
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next word</span>
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
}
