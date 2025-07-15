"use client";

import { useState } from "react";
import type { VocabularyWord } from "@/lib/types";
import { VocabularyForm } from "@/components/vocabulary-form";
import { VocabularyGrid } from "@/components/vocabulary-grid";
import { Separator } from "@/components/ui/separator";

const initialWords: VocabularyWord[] = [
  { id: "1", japanese: "日本語", reading: "にほんご", meaning: "Japanese language" },
  { id: "2", japanese: "食べる", reading: "たべる", meaning: "To eat" },
  { id: "3", japanese: "大きい", reading: "おおきい", meaning: "Big" },
  { id: "4", japanese: "コンピューター", reading: "こんぴゅーたー", meaning: "Computer" },
];

export default function Home() {
  const [words, setWords] = useState<VocabularyWord[]>(initialWords);

  const addWord = (word: Omit<VocabularyWord, "id">) => {
    setWords((prev) => [...prev, { ...word, id: Date.now().toString() }]);
  };

  const removeWord = (id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Nihongo Mastery
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your master path to Japanese proficiency.
        </p>
      </header>

      <section className="mb-12">
        <VocabularyForm onAddWord={addWord} />
      </section>

      <Separator className="my-12" />

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-8 text-center md:text-left">
          My Vocabulary
        </h2>
        {words.length > 0 ? (
          <VocabularyGrid words={words} onRemoveWord={removeWord} />
        ) : (
          <div className="text-center text-muted-foreground border-2 border-dashed border-border rounded-lg p-12">
            <p className="text-lg">Your vocabulary is empty.</p>
            <p>Add a new word using the form above to get started!</p>
          </div>
        )}
      </section>
    </main>
  );
}
