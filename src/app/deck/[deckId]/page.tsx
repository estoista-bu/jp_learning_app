
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allDecks as initialDecks } from "@/data/decks";
import { allWords as initialWords } from "@/data/words";
import type { Deck, VocabularyWord } from "@/lib/types";
import { FlashcardViewer } from "@/components/flashcard-viewer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VocabularyForm } from "@/components/vocabulary-form";

type VocabularyFormData = Omit<VocabularyWord, "id" | "deckId">;

export default function DeckPage({ params }: { params: { deckId: string } }) {
  const { deckId } = params;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<VocabularyWord | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Find the deck from either initial static decks or user-created decks in localStorage
    const userDecks: Deck[] = JSON.parse(localStorage.getItem("userDecks") || "[]");
    const combinedDecks = [...initialDecks, ...userDecks];
    const currentDeck = combinedDecks.find((d) => d.id === deckId) || null;
    setDeck(currentDeck);

    // Load words
    if (currentDeck) {
      if (currentDeck.category === 'user') {
        const storedWords = localStorage.getItem(`words_${deckId}`);
        if (storedWords) {
          setWords(JSON.parse(storedWords));
        } else {
          // If it's a user deck but has no words yet, start with an empty array
          setWords([]);
        }
      } else {
        // For non-user decks (like kana), filter from the initial words
        setWords(initialWords.filter((word) => word.deckId === deckId));
      }
    }
  }, [deckId]);
  
  useEffect(() => {
    // Only save to localStorage if it's a user deck and the component has mounted
    if (isMounted && deck?.category === 'user') {
      localStorage.setItem(`words_${deckId}`, JSON.stringify(words));
    }
  }, [words, deckId, deck, isMounted]);


  const handleSaveWord = (data: VocabularyFormData, id?: string) => {
    if (id) {
      // Edit existing word
      setWords((prev) =>
        prev.map((w) => (w.id === id ? { ...w, ...data } : w))
      );
    } else {
      // Add new word
      const newWord: VocabularyWord = {
        ...data,
        id: Date.now().toString(),
        deckId: deckId,
      };
      setWords((prev) => [...prev, newWord]);
    }
    setIsFormOpen(false);
    setWordToEdit(null);
  };

  const handleRemoveWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  };

  const handleEditWord = (word: VocabularyWord) => {
    setWordToEdit(word);
    setIsFormOpen(true);
  };
  
  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setWordToEdit(null);
    }
    setIsFormOpen(open);
  }

  const isKanaDeck = deck?.category === 'kana';

  const renderContent = () => {
    if (!deck) {
       return (
         <div className="p-4 text-center">
             <p className="text-lg font-semibold text-muted-foreground">Deck not found.</p>
         </div>
       );
    }
    if (words.length === 0) {
      return (
        <div className="p-4 text-center flex flex-col items-center justify-center h-full">
            <p className="text-lg font-semibold text-muted-foreground mb-4">This deck is empty.</p>
            <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add First Word
            </Button>
        </div>
      );
    }
    return (
       <FlashcardViewer 
            words={words} 
            isKana={isKanaDeck}
            onEdit={handleEditWord}
            onRemove={handleRemoveWord}
        />
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm h-screen bg-background flex flex-col">
            <Sheet open={isFormOpen} onOpenChange={handleFormOpenChange}>
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
                    
                    {!isKanaDeck ? (
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="w-8 h-8">
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add Word</span>
                            </Button>
                        </SheetTrigger>
                    ) : <div className="w-8 h-8"></div>}
                </header>

                <main className="flex-1 flex flex-col">
                   {renderContent()}
                </main>

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="font-headline">
                            {wordToEdit ? "Edit Word" : "Add New Word"}
                        </SheetTitle>
                        <SheetDescription>
                            {wordToEdit ? "Update the details for this vocabulary word." : `Add a new word to the "${deck?.name}" deck.`}
                        </SheetDescription>
                    </SheetHeader>
                    <VocabularyForm
                        onSaveWord={handleSaveWord}
                        wordToEdit={wordToEdit}
                        deckId={deckId}
                    />
                </SheetContent>
            </Sheet>
        </div>
    </div>
  );
}
