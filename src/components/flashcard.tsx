
"use client";

import { useState } from "react";
import { X, Pencil, Volume2, Loader2,ThumbsUp, ThumbsDown } from "lucide-react";
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
  onRemove?: () => void;
  onEdit?: () => void;
  isKana?: boolean;
  isFlipped: boolean;
  onFlip: () => void;
  mode?: "view" | "test";
  onGuess?: (guessed: boolean) => void;
}

export function Flashcard({ 
    word, 
    onRemove, 
    onEdit, 
    isKana = false, 
    isFlipped, 
    onFlip,
    mode = "view",
    onGuess
}: FlashcardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleGuess = (e: React.MouseEvent, guessed: boolean) => {
    e.stopPropagation();
    onGuess?.(guessed);
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !window.speechSynthesis || isPlaying) {
      return;
    }

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(word.reading || word.japanese);
    utterance.lang = 'ja-JP';
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };


  const japaneseWordLength = word.japanese.length;
  const fontSizeClass =
    japaneseWordLength > 6 ? "text-4xl" : "text-5xl";

  const editButtons = !isKana && mode === "view" ? (
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
  ) : null;

  const memoryTestControls = mode === 'test' && isFlipped && (
     <div className="absolute bottom-4 z-20 w-full px-4">
        <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={(e) => handleGuess(e, false)}>
                <ThumbsDown className="mr-2 h-5 w-5"/>
                Didn't Know
            </Button>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" onClick={(e) => handleGuess(e, true)}>
                <ThumbsUp className="mr-2 h-5 w-5"/>
                Knew It
            </Button>
        </div>
     </div>
  );

  return (
    <div
      className="group w-full h-full [perspective:1000px] cursor-pointer"
      onClick={onFlip}
      role="button"
      aria-label={`Flashcard for ${word.japanese}. Click to flip.`}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center overflow-hidden">
          {editButtons}
          <CardContent className="p-4 flex items-center justify-center">
            <p className={cn(
              "font-headline text-center text-primary drop-shadow-sm",
              "break-words",
              isKana ? "text-8xl" : fontSizeClass
            )}>
              {word.japanese}
            </p>
          </CardContent>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center overflow-hidden">
           {editButtons}
           <CardContent className="p-4 text-center flex flex-col items-center justify-center flex-1">
             <p className="font-body text-3xl font-semibold text-accent">
               {word.reading}
             </p>
             <p className="text-muted-foreground mt-2 text-xl">{word.meaning}</p>
           </CardContent>

           {memoryTestControls}

           <div className="w-full p-2 flex justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePlayAudio} 
                disabled={isPlaying}
                className="h-9 w-9 text-muted-foreground hover:text-accent"
                aria-label="Play pronunciation"
              >
                {isPlaying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
           </div>
        </Card>
      </div>
    </div>
  );
}
