
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, ChevronLeft, ChevronRight, Shuffle, ArrowLeft } from "lucide-react";
import type { VocabularyWord, Deck } from "@/lib/types";
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
import { allDecks } from "@/data/decks";
import { allWords as allWordsData } from "@/data/words";

type AnimationDirection = "left" | "right" | "none";

export default function DeckPage() {
  const params = useParams();
  const deckId = params.deckId as string;
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyWord | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("none");
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (deckId) {
      const currentDeck = allDecks.find(d => d.id === deckId) || null;
      const wordsInDeck = allWordsData.filter(w => w.deckId === deckId);
      setDeck(currentDeck);
      setWords(wordsInDeck);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [deckId]);


  const minSwipeDistance = 50;

  const handleOpenForm = (word: VocabularyWord | null) => {
    setEditingWord(word);
    setIsFormOpen(true);
  };
  
  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setEditingWord(null);
    }
    setIsFormOpen(open);
  }

  const saveWord = (wordData: Omit<VocabularyWord, "id" | "deckId">, id?: string) => {
    if (id) {
      setWords(prev => 
        prev.map(w => (w.id === id ? { ...w, ...wordData } : w))
      );
    } else {
      const newWord = { ...wordData, id: Date.now().toString(), deckId };
      setWords((prev) => {
        const newWords = [...prev, newWord];
        setCurrentIndex(newWords.length - 1);
        setIsFlipped(false);
        return newWords;
      });
    }
    setIsFormOpen(false);
    setEditingWord(null);
  };

  const removeWord = (id: string) => {
    setWords((prev) => {
      const newWords = prev.filter((word) => word.id !== id);
      if (currentIndex >= newWords.length && newWords.length > 0) {
        setCurrentIndex(newWords.length - 1);
      } else if (newWords.length === 0) {
        setCurrentIndex(0);
      }
      setIsFlipped(false);
      return newWords;
    });
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (!words.length) return;
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
       setIsFlipped(false);
       setAnimationDirection('none');
    }, 150);
  };

  const goToNext = () => handleNavigation('next');
  const goToPrevious = () => handleNavigation('prev');

  const shuffleWords = () => {
    if (words.length < 2) return;
    setWords((currentWords) => {
      const shuffled = [...currentWords];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFormOpen) return;
      
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
  }, [words, currentIndex, isFormOpen]);
  
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
      <Dialog open={isFormOpen} onOpenChange={handleFormOpenChange}>
        <div className="w-full max-w-sm h-screen bg-background flex flex-col">
          <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Decks</span>
              </Button>
            </Link>
            <h1 className="font-headline text-xl font-bold text-primary truncate px-2">
              {deck?.name || "..."}
            </h1>
            <DialogTrigger asChild>
              <Button 
                size="icon" 
                className="w-8 h-8" 
                onClick={() => handleOpenForm(null)}
                disabled={deck?.category === 'kana'}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add New Word</span>
              </Button>
            </DialogTrigger>
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
                  onEdit={() => handleOpenForm(currentWord)}
                  isKana={deck?.category === 'kana'}
                  isFlipped={isFlipped}
                  onFlip={() => setIsFlipped(!isFlipped)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <p className="text-lg font-semibold">This deck is empty.</p>
                {deck?.category !== 'kana' && (
                    <p className="mt-2">
                        Tap the <Plus className="inline h-4 w-4 mx-1" /> button to add your first word!
                    </p>
                )}
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingWord ? "Edit Word" : "Add New Word"}</DialogTitle>
            <DialogDescription>
              {editingWord ? "Update the details of your word." : "Register a new Japanese word to your vocabulary list."}
            </DialogDescription>
          </DialogHeader>
          <VocabularyForm onSaveWord={saveWord} wordToEdit={editingWord} deckId={deckId}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
