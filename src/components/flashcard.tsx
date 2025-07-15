
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VocabularyWord } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FlashcardProps {
  word: VocabularyWord;
  onRemove: () => void;
}

export function Flashcard({ word, onRemove }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      className="group w-full h-full [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      aria-label={`Flashcard for ${word.japanese}. Click to flip.`}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        <Card className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-20 h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
            aria-label={`Remove ${word.japanese}`}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="p-4 flex items-center justify-center">
            <p className="font-headline text-5xl text-center text-primary drop-shadow-sm break-keep">
              {word.japanese}
            </p>
          </CardContent>
        </Card>

        <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center overflow-hidden">
           <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-20 h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
            aria-label={`Remove ${word.japanese}`}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="p-4 text-center">
            <p className="font-body text-3xl font-semibold text-accent">
              {word.reading}
            </p>
            <p className="text-muted-foreground mt-2 text-xl">{word.meaning}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
