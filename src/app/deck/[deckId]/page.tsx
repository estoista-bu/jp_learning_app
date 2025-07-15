
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

// Mock data - in a real app, you would fetch this based on deckId
const allWords: VocabularyWord[] = [
  // Deck 1: Greetings & Common Phrases
  { id: "1", japanese: "こんにちは", reading: "こんにちは", meaning: "Hello / Good afternoon", deckId: "1" },
  { id: "2", japanese: "おはようございます", reading: "おはようございます", meaning: "Good morning", deckId: "1" },
  { id: "3", japanese: "こんばんは", reading: "こんばんは", meaning: "Good evening", deckId: "1" },
  { id: "4", japanese: "ありがとう", reading: "ありがとう", meaning: "Thank you", deckId: "1" },
  { id: "5", japanese: "すみません", reading: "すみません", meaning: "Excuse me / I'm sorry", deckId: "1" },
  { id: "6", japanese: "さようなら", reading: "さようなら", meaning: "Goodbye", deckId: "1" },
  { id: "7", japanese: "じゃあね", reading: "じゃあね", meaning: "See you later (casual)", deckId: "1" },
  { id: "8", japanese: "おやすみなさい", reading: "おやすみなさい", meaning: "Good night", deckId: "1" },
  { id: "9", japanese: "はい", reading: "はい", meaning: "Yes", deckId: "1" },
  { id: "10", japanese: "いいえ", reading: "いいえ", meaning: "No", deckId: "1" },
  { id: "11", japanese: "お願いします", reading: "おねがいします", meaning: "Please", deckId: "1" },
  { id: "12", japanese: "どういたしまして", reading: "どういたしまして", meaning: "You're welcome", deckId: "1" },
  { id: "13", japanese: "はじめまして", reading: "はじめまして", meaning: "Nice to meet you", deckId: "1" },
  { id: "14", japanese: "どうぞよろしく", reading: "どうぞよろしく", meaning: "Pleased to meet you", deckId: "1" },
  { id: "15", japanese: "お元気ですか", reading: "おげんきですか", meaning: "How are you?", deckId: "1" },
  { id: "16", japanese: "元気です", reading: "げんきです", meaning: "I'm fine", deckId: "1" },
  { id: "17", japanese: "ごめんなさい", reading: "ごめんなさい", meaning: "I'm sorry", deckId: "1" },
  { id: "18", japanese: "いってきます", reading: "いってきます", meaning: "I'm leaving", deckId: "1" },
  { id: "19", japanese: "いってらっしゃい", reading: "いってらっしゃい", meaning: "Take care / See you", deckId: "1" },
  { id: "20", japanese: "ただいま", reading: "ただいま", meaning: "I'm home", deckId: "1" },
  { id: "21", japanese: "おかえりなさい", reading: "おかえりなさい", meaning: "Welcome home", deckId: "1" },

  // Deck 2: Food
  { id: "22", japanese: "食べる", reading: "たべる", meaning: "To eat", deckId: "2" },
  { id: "23", japanese: "飲む", reading: "のむ", meaning: "To drink", deckId: "2" },
  { id: "24", japanese: "寿司", reading: "すし", meaning: "Sushi", deckId: "2" },
  { id: "25", japanese: "ラーメン", reading: "らーめん", meaning: "Ramen", deckId: "2" },
  { id: "26", japanese: "天ぷら", reading: "てんぷら", meaning: "Tempura", deckId: "2" },
  { id: "27", japanese: "ご飯", reading: "ごはん", meaning: "Rice / Meal", deckId: "2" },
  { id: "28", japanese: "水", reading: "みず", meaning: "Water", deckId: "2" },
  { id: "29", japanese: "お茶", reading: "おちゃ", meaning: "Tea", deckId: "2" },
  { id: "30", japanese: "魚", reading: "さかな", meaning: "Fish", deckId: "2" },
  { id: "31", japanese: "肉", reading: "にく", meaning: "Meat", deckId: "2" },
  { id: "32", japanese: "野菜", reading: "やさい", meaning: "Vegetable", deckId: "2" },
  { id: "33", japanese: "果物", reading: "くだもの", meaning: "Fruit", deckId: "2" },
  { id: "34", japanese: "レストラン", reading: "れすとらん", meaning: "Restaurant", deckId: "2" },
  { id: "35", japanese: "美味しい", reading: "おいしい", meaning: "Delicious", deckId: "2" },
  { id: "36", japanese: "いただきます", reading: "いただきます", meaning: "Let's eat (said before meal)", deckId: "2" },
  { id: "37", japanese: "ごちそうさまでした", reading: "ごちそうさまでした", meaning: "Thanks for the meal", deckId: "2" },
  { id: "38", japanese: "メニュー", reading: "めにゅー", meaning: "Menu", deckId: "2" },
  { id: "39", japanese: "注文", reading: "ちゅうもん", meaning: "Order", deckId: "2" },
  { id: "40", japanese: "会計", reading: "かいけい", meaning: "Check / Bill", deckId: "2" },
  { id: "41", japanese: "朝ご飯", reading: "あさごはん", meaning: "Breakfast", deckId: "2" },
  { id: "42", japanese: "昼ご飯", reading: "ひるごはん", meaning: "Lunch", deckId: "2" },
  { id: "43", japanese: "晩ご飯", reading: "ばんごはん", meaning: "Dinner", deckId: "2" },

  // Deck 3: Travel
  { id: "44", japanese: "旅行", reading: "りょこう", meaning: "Travel / Trip", deckId: "3" },
  { id: "45", japanese: "空港", reading: "くうこう", meaning: "Airport", deckId: "3" },
  { id: "46", japanese: "駅", reading: "えき", meaning: "Station", deckId: "3" },
  { id: "47", japanese: "電車", reading: "でんしゃ", meaning: "Train", deckId: "3" },
  { id: "48", japanese: "地下鉄", reading: "ちかてつ", meaning: "Subway", deckId: "3" },
  { id: "49", japanese: "バス", reading: "ばす", meaning: "Bus", deckId: "3" },
  { id: "50", japanese: "タクシー", reading: "たくしー", meaning: "Taxi", deckId: "3" },
  { id: "51", japanese: "ホテル", reading: "ほてる", meaning: "Hotel", deckId: "3" },
  { id: "52", japanese: "予約", reading: "よやく", meaning: "Reservation", deckId: "3" },
  { id: "53", japanese: "地図", reading: "ちず", meaning: "Map", deckId: "3" },
  { id: "54", japanese: "切符", reading: "きっぷ", meaning: "Ticket", deckId: "3" },
  { id: "55", japanese: "パスポート", reading: "ぱすぽーと", meaning: "Passport", deckId: "3" },
  { id: "56", japanese: "荷物", reading: "にもつ", meaning: "Luggage", deckId: "3" },
  { id: "57", japanese: "どこですか", reading: "どこですか", meaning: "Where is it?", deckId: "3" },
  { id: "58", japanese: "いくらですか", reading: "いくらですか", meaning: "How much is it?", deckId: "3" },
  { id: "59", japanese: "右", reading: "みぎ", meaning: "Right", deckId: "3" },
  { id: "60", japanese: "左", reading: "ひだり", meaning: "Left", deckId: "3" },
  { id: "61", japanese: "まっすぐ", reading: "まっすぐ", meaning: "Straight ahead", deckId: "3" },
  { id: "62", japanese: "観光", reading: "かんこう", meaning: "Sightseeing", deckId: "3" },
  { id: "63", japanese: "お土産", reading: "おみやげ", meaning: "Souvenir", deckId: "3" },
  { id: "64", japanese: "写真", reading: "しゃしん", meaning: "Photograph", deckId: "3" },
];

const allDecks: Deck[] = [
  { id: "1", name: "Greetings" },
  { id: "2", name: "Food" },
  { id: "3", name: "Travel" },
];


type AnimationDirection = "left" | "right" | "none";

export default function DeckPage() {
  const params = useParams();
  const deckId = params.deckId as string;
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyWord | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("none");
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (deckId) {
      const currentDeck = allDecks.find(d => d.id === deckId) || null;
      const wordsInDeck = allWords.filter(w => w.deckId === deckId);
      setDeck(currentDeck);
      setWords(wordsInDeck);
      setCurrentIndex(0);
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
              <Button size="icon" className="w-8 h-8" onClick={() => handleOpenForm(null)}>
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
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <p className="text-lg font-semibold">This deck is empty.</p>
                <p className="mt-2">
                  Tap the <Plus className="inline h-4 w-4 mx-1" /> button to add your first word!
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
