
"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Eye, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allDecks as initialDecks } from "@/data/decks";
import { allWords as initialWords } from "@/data/words";
import type { Deck, VocabularyWord } from "@/lib/types";
import { FlashcardViewer } from "@/components/flashcard-viewer";
import { MemoryTestViewer } from "@/components/memory-test-viewer";
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
type DeckViewMode = "select" | "view" | "test";

export default function DeckPage({ params: paramsProp }: { params: { deckId: string } }) {
  const params = use(paramsProp);
  const { deckId } = params;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<VocabularyWord | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isUserDeck, setIsUserDeck] = useState(false);
  const [mode, setMode] = useState<DeckViewMode>("select");

  useEffect(() => {
    setIsMounted(true);
    const userDecks: Deck[] = JSON.parse(localStorage.getItem("userDecks") || "[]");
    const combinedDecks = [...initialDecks, ...userDecks];
    const currentDeck = combinedDecks.find((d) => d.id === deckId) || null;
    setDeck(currentDeck);

    const deckIsCustom = userDecks.some(d => d.id === deckId);
    setIsUserDeck(deckIsCustom);

    if (currentDeck) {
      if (deckIsCustom) {
        const storedWords = localStorage.getItem(`words_${deckId}`);
        setWords(storedWords ? JSON.parse(storedWords) : []);
      } else {
        setWords(initialWords.filter((word) => word.deckId === deckId));
      }
    }
  }, [deckId]);
  
  useEffect(() => {
    if (isMounted && isUserDeck) {
      localStorage.setItem(`words_${deckId}`, JSON.stringify(words));
    }
  }, [words, deckId, isUserDeck, isMounted]);


  const handleSaveWord = (data: VocabularyFormData, id?: string) => {
    let newWords: VocabularyWord[];
    if (id) {
      newWords = words.map((w) => (w.id === id ? { ...w, ...data } : w));
    } else {
      const newWord: VocabularyWord = {
        ...data,
        id: Date.now().toString(),
        deckId: deckId,
      };
      newWords = [...words, newWord];
    }
    setWords(newWords);

    if (!isUserDeck) {
        setIsUserDeck(true);
        const userDecks: Deck[] = JSON.parse(localStorage.getItem("userDecks") || "[]");
        if (!userDecks.some(d => d.id === deckId) && deck) {
            localStorage.setItem("userDecks", JSON.stringify([...userDecks, deck]));
        }
    }

    setIsFormOpen(false);
    setWordToEdit(null);
  };

  const handleRemoveWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
     if (!isUserDeck) {
        setIsUserDeck(true);
    }
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
    if (!isMounted) {
      return (
        <div className="p-4 text-center">
            <p className="text-lg font-semibold text-muted-foreground">Loading...</p>
        </div>
      );
    }
    if (!deck) {
      return (
        <div className="p-4 text-center">
            <p className="text-lg font-semibold text-muted-foreground">Deck not found.</p>
        </div>
      );
    }
    if (words.length === 0 && !isKanaDeck) {
      return (
        <div className="p-4 text-center flex flex-col items-center justify-center h-full">
            <p className="text-lg font-semibold text-muted-foreground mb-4">This deck is empty.</p>
            <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add First Word
            </Button>
        </div>
      );
    }

    switch (mode) {
      case "view":
        return <FlashcardViewer words={words} isKana={isKanaDeck} onEdit={handleEditWord} onRemove={handleRemoveWord} />;
      case "test":
        return <MemoryTestViewer words={words} isKana={isKanaDeck} />;
      case "select":
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
            <Card onClick={() => setMode('view')} className="w-full p-6 text-center cursor-pointer hover:bg-muted transition-colors">
              <Eye className="h-10 w-10 mx-auto text-primary mb-2"/>
              <h2 className="text-lg font-bold">View Each</h2>
              <p className="text-sm text-muted-foreground">Review cards one by one.</p>
            </Card>
            <Card onClick={() => setMode('test')} className="w-full p-6 text-center cursor-pointer hover:bg-muted transition-colors">
               <BrainCircuit className="h-10 w-10 mx-auto text-accent mb-2"/>
              <h2 className="text-lg font-bold">Memory Test</h2>
              <p className="text-sm text-muted-foreground">Test your recall.</p>
            </Card>
          </div>
        );
    }
  }

  const getHeaderTitle = () => {
    if (mode === "select") return deck?.name || "...";
    if (mode === "view") return "View Each";
    if (mode === "test") return "Memory Test";
    return deck?.name || "...";
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm h-screen bg-background flex flex-col">
            <Sheet open={isFormOpen} onOpenChange={handleFormOpenChange}>
                <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                    {mode === 'select' ? (
                       <Link href="/" passHref>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Decks</span>
                        </Button>
                       </Link>
                    ) : (
                        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setMode('select')}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Mode Select</span>
                        </Button>
                    )}
                    <h1 className="font-headline text-xl font-bold text-primary truncate px-2">
                        {getHeaderTitle()}
                    </h1>
                    
                    {!isKanaDeck && mode !== 'test' ? (
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
