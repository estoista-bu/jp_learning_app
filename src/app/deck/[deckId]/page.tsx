
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, ArrowLeft } from "lucide-react";
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
import { allDecks } from "@/data/decks";
import { allWords } from "@/data/words";

export default function DeckPage() {
  const params = useParams();
  const deckId = params.deckId as string;
  
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyWord | null>(null);

  const currentDeck = allDecks.find(d => d.id === deckId) || null;

  useEffect(() => {
    if (deckId) {
      const wordsInDeck = allWords.filter(w => w.deckId === deckId);
      setWords(wordsInDeck);
    }
  }, [deckId]);


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
    // Note: This only saves to component state. We'll need to add persistence later.
    setIsFormOpen(false);
    setEditingWord(null);
  };

  const removeWord = (id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
    // Note: This only saves to component state. We'll need to add persistence later.
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
              {currentDeck?.name || "..."}
            </h1>
            <DialogTrigger asChild>
              <Button 
                size="icon" 
                className="w-8 h-8" 
                onClick={() => handleOpenForm(null)}
                disabled={currentDeck?.category === 'kana'}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add New Word</span>
              </Button>
            </DialogTrigger>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center overflow-hidden">
            {words.length > 0 ? (
                <FlashcardViewer 
                    words={words}
                    isKana={currentDeck?.category === 'kana'}
                    onEdit={handleOpenForm}
                    onRemove={removeWord}
                />
            ) : (
                <div className="text-center text-muted-foreground p-8">
                    <p className="text-lg font-semibold">This deck is empty.</p>
                    <p className="mt-2">
                        Tap the <Plus className="inline h-4 w-4 mx-1" /> button to add your first word!
                    </p>
                </div>
            )}
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
