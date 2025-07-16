
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, ArrowLeft, View, BrainCircuit } from "lucide-react";
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
import { FlashcardViewer } from "@/components/flashcard-viewer";
import { MemoryTest } from "@/components/memory-test";
import { allDecks as initialDecks } from "@/data/decks";
import { allWords as initialWords } from "@/data/words";

const USER_DECKS_STORAGE_KEY = "nihongo-mastery-user-decks";
const USER_WORDS_STORAGE_KEY_PREFIX = "nihongo-mastery-words-";


export default function DeckPage() {
  const params = useParams();
  const deckId = params.deckId as string;
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyWord | null>(null);
  const [mode, setMode] = useState<"selection" | "view" | "test">("selection");


  useEffect(() => {
    if (deckId) {
      const storedUserDecks = localStorage.getItem(USER_DECKS_STORAGE_KEY);
      const userDecks: Deck[] = storedUserDecks ? JSON.parse(storedUserDecks) : [];
      const allAvailableDecks = [...initialDecks, ...userDecks];
      const currentDeck = allAvailableDecks.find(d => d.id === deckId) || null;
      setDeck(currentDeck);
      
      const userWordsStorageKey = `${USER_WORDS_STORAGE_KEY_PREFIX}${deckId}`;
      let wordsInDeck: VocabularyWord[] = [];

      if (currentDeck?.category === 'kana') {
         wordsInDeck = initialWords.filter(w => w.deckId === deckId);
      } else {
        try {
          const storedWords = localStorage.getItem(userWordsStorageKey);
          if (storedWords) {
            wordsInDeck = JSON.parse(storedWords);
          } else {
            // Pre-load initial decks from static data if no user data exists
            if (['1','2','3'].includes(deckId)) {
                wordsInDeck = initialWords.filter(w => w.deckId === deckId);
            } else {
                wordsInDeck = [];
            }
          }
        } catch (error) {
          console.error("Failed to load words from localStorage", error);
          wordsInDeck = initialWords.filter(w => w.deckId === deckId);
        }
      }
      setWords(wordsInDeck);
      setMode("selection");
    }
  }, [deckId]);
  
  useEffect(() => {
    if (deck && deck.category !== 'kana' && words.length > 0) {
      try {
        const userWordsStorageKey = `${USER_WORDS_STORAGE_KEY_PREFIX}${deckId}`;
        localStorage.setItem(userWordsStorageKey, JSON.stringify(words));
      } catch (error) {
        console.error("Failed to save words to localStorage", error);
      }
    }
  }, [words, deck, deckId]);


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
    let newWordsList: VocabularyWord[] = [];
    if (id) {
      newWordsList = words.map(w => (w.id === id ? { ...w, ...wordData } : w));
    } else {
      const newWord = { ...wordData, id: Date.now().toString(), deckId };
      newWordsList = [...words, newWord];
    }
    setWords(newWordsList);
    setIsFormOpen(false);
    setEditingWord(null);
  };

  const removeWord = (id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  const handleBackToSelection = () => {
    setMode("selection");
  }

  const renderContent = () => {
    if (words.length === 0 && deck?.category !== 'kana') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
            <p className="text-lg font-semibold">This deck is empty.</p>
            <p className="mt-2">
                Tap the <Plus className="inline h-4 w-4 mx-1" /> button to add your first word!
            </p>
        </div>
      );
    }

    switch (mode) {
      case 'view':
        return (
          <FlashcardViewer 
            words={words} 
            isKana={deck?.category === 'kana'}
            onEdit={handleOpenForm}
            onRemove={removeWord}
            onBack={handleBackToSelection}
          />
        );
      case 'test':
        return (
          <MemoryTest 
            words={words}
            isKana={deck?.category === 'kana'}
            onBack={handleBackToSelection}
          />
        );
      case 'selection':
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 space-y-4">
              <Button className="w-full h-20 text-lg" onClick={() => setMode('view')}>
                  <View className="mr-4 h-6 w-6"/> View Each
              </Button>
              <Button className="w-full h-20 text-lg" onClick={() => setMode('test')} variant="secondary">
                  <BrainCircuit className="mr-4 h-6 w-6" /> Memory Test
              </Button>
          </div>
        );
    }
  };

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

          <main className="flex-1 flex flex-col items-center justify-center overflow-hidden">
             {renderContent()}
          </main>
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
