
"use client";

import { useState } from "react";
import { X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VocabularyWord } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


interface FlashcardProps {
  word: VocabularyWord;
  onRemove: () => void;
  onEdit: () => void;
}

export function Flashcard({ word, onRemove, onEdit }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const japaneseWordLength = word.japanese.length;
  const fontSizeClass =
    japaneseWordLength > 6 ? "text-4xl" : "text-5xl";

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
          <div className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handleEdit}
              aria-label={`Edit ${word.japanese}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={stopPropagation}
                    aria-label={`Remove ${word.japanese}`}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={stopPropagation}>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the word
                        <span className="font-semibold text-foreground"> {word.japanese}</span> from your list.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onRemove}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>
          <CardContent className="p-4 flex items-center justify-center">
            <p className={cn(
              "font-headline text-center text-primary drop-shadow-sm",
              "break-words",
              fontSizeClass
            )}>
              {word.japanese}
            </p>
          </CardContent>
        </Card>

        <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center overflow-hidden">
           <div className="absolute top-2 right-2 z-20 flex gap-1">
             <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={handleEdit}
                aria-label={`Edit ${word.japanese}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
               <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={stopPropagation}
                    aria-label={`Remove ${word.japanese}`}
                    >
                    <X className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={stopPropagation}>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the word
                        <span className="font-semibold text-foreground"> {word.japanese}</span> from your list.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onRemove}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
           </div>
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

    