import type { VocabularyWord } from "@/lib/types";
import { Flashcard } from "@/components/flashcard";

interface VocabularyGridProps {
  words: VocabularyWord[];
  onRemoveWord: (id: string) => void;
}

export function VocabularyGrid({ words, onRemoveWord }: VocabularyGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {words.map((word) => (
        <Flashcard
          key={word.id}
          word={word}
          onRemove={() => onRemoveWord(word.id)}
        />
      ))}
    </div>
  );
}
