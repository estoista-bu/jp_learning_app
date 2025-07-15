"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { VocabularyWord } from "@/lib/types";
import { VocabularyForm } from "@/components/vocabulary-form";
import { Flashcard } from "@/components/flashcard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <h1 className="font-headline text-2xl font-bold text-primary">
          Nihongo Mastery
        </h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button size="icon">
              <Plus className="h-5 w-5" />
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

      <main className="flex-1 overflow-y-auto">
        {words.length > 0 ? (
           <ScrollArea className="h-full">
            <div className="p-4 grid grid-cols-1 gap-4">
              {words.map((word) => (
                <Flashcard
                  key={word.id}
                  word={word}
                  onRemove={() => removeWord(word.id)}
                />
              ))}
            </div>
          </ScrollArea>
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
  );
}
