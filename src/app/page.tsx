
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { VocabularyWord } from "@/lib/types";
import { VocabularyForm } from "@/components/vocabulary-form";
import { VocabularyCarousel } from "@/components/vocabulary-carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const initialWords: VocabularyWord[] = [
  { id: "1", japanese: "日本語", reading: "にほんご", meaning: "Japanese language" },
  { id: "2", japanese: "食べる", reading: "たべる", meaning: "To eat" },
  { id: "3", japanese: "大きい", reading: "おおきい", meaning: "Big" },
  { id: "4", japanese: "コンピューター", reading: "こんぴゅーたー", meaning: "Computer" },
];

export default function Home() {
  const [words, setWords] = useState<VocabularyWord[]>(initialWords);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addWord = (word: Omit<VocabularyWord, "id">) => {
    setWords((prev) => [...prev, { ...word, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  const removeWord = (id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="relative w-full max-w-sm h-[80vh] max-h-[900px] bg-background border-8 border-gray-800 dark:border-gray-200 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-gray-800 dark:bg-gray-200 rounded-b-xl z-20"></div>
        
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10 pt-8">
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

        <main className="flex-1 flex flex-col overflow-y-auto">
          {words.length > 0 ? (
            <VocabularyCarousel words={words} onRemoveWord={removeWord} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
              <p className="text-lg font-semibold">Your vocabulary is empty.</p>
              <p className="mt-2">
                Tap the <Plus className="inline h-4 w-4 mx-1" /> button to get started!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
