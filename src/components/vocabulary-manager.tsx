
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Book, MoreHorizontal, ChevronDown, Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import type { Deck, VocabularyWord } from "@/lib/types";
import { DeckForm } from "@/components/deck-form";
import { allWords as initialWords } from "@/data/words";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "./ui/progress";

type KanaSelection = "hiragana" | "katakana";
const MASTERY_THRESHOLD = 10;

interface VocabularyManagerProps {
  decks: Deck[];
  onSaveDeck: (deckData: Omit<Deck, "id" | "category">, id?: string) => void;
  onRemoveDeck: (id: string) => void;
  userId: string;
}

export function VocabularyManager({ decks, onSaveDeck, onRemoveDeck, userId }: VocabularyManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deletingDeck, setDeletingDeck] = useState<Deck | null>(null);
  const [selectedKana, setSelectedKana] = useState<KanaSelection>("hiragana");
  const [masteryStats, setMasteryStats] = useState<Record<string, { correct: number }>>({});

  useEffect(() => {
    const storedMasteryStats = JSON.parse(localStorage.getItem(`wordMasteryStats_${userId}`) || '{}');
    setMasteryStats(storedMasteryStats);
  }, [userId]);

  const handleOpenForm = (deck: Deck | null) => {
    setEditingDeck(deck);
    setIsFormOpen(true);
  };

  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setEditingDeck(null);
    }
    setIsFormOpen(open);
  };
  
  const handleSaveDeck = (deckData: Omit<Deck, "id" | "category">, id?: string) => {
    onSaveDeck(deckData, id);
    setIsFormOpen(false);
    setEditingDeck(null);
  };

  const handleConfirmRemove = (id: string) => {
    onRemoveDeck(id);
    setDeletingDeck(null);
  };

  const getMasteryRate = (deckId: string) => {
    const wordsForDeck: VocabularyWord[] = JSON.parse(localStorage.getItem(`words_${deckId}_${userId}`) || "[]");
    const wordList = wordsForDeck.length > 0 ? wordsForDeck : initialWords.filter(w => w.deckId === deckId);
    
    if (wordList.length === 0) return 0;

    const masteredCount = wordList.filter(word => (masteryStats[word.id]?.correct || 0) >= MASTERY_THRESHOLD).length;
    return (masteredCount / wordList.length) * 100;
  }
  
  const getDeckIcon = (deck: Deck) => {
    if (deck.category === 'group') {
      return <Group className="h-5 w-5 text-accent" />;
    }
    return <Book className="h-5 w-5 text-primary" />;
  }
  
  const userDecks = decks.filter(d => d.category === 'user' || d.category === 'group');

  return (
    <div className="flex flex-col h-full">
      <Dialog open={isFormOpen} onOpenChange={handleFormOpenChange}>
        <div className="w-full flex flex-col">
          <header className="flex items-center justify-between px-4 pt-4 pb-2">
            <h2 className="font-headline text-lg font-bold">
              My Decks
            </h2>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" className="w-8 h-8" onClick={() => handleOpenForm(null)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add New Deck</span>
              </Button>
            </DialogTrigger>
          </header>

          <div className="flex-1 p-4 pt-2 overflow-y-auto">
            <div className="grid gap-4">
               <Card>
                <div className="flex items-center justify-between p-4">
                  <Link href={`/app/deck/${selectedKana}`} className="flex-1">
                    <div className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-primary" />
                      <p className="font-semibold">Kana Practice</p>
                    </div>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-4">
                        {selectedKana === "hiragana" ? "Hiragana" : "Katakana"}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuRadioGroup value={selectedKana} onValueChange={(value) => setSelectedKana(value as KanaSelection)}>
                          <DropdownMenuRadioItem value="hiragana">Hiragana</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="katakana">Katakana</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>

              {userDecks.map((deck) => {
                const masteryRate = getMasteryRate(deck.id);
                const isEditable = deck.category === 'user';
                return (
                  <Card key={deck.id} className="relative group">
                    {isEditable && (
                      <div className="absolute top-2 right-2 z-10">
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenForm(deck)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setDeletingDeck(deck)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                    <Link href={`/app/deck/${deck.id}`} className="block">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                          {getDeckIcon(deck)}
                          <span>{deck.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-muted-foreground">Mastery</p>
                                <span className="text-xs text-muted-foreground font-mono">{masteryRate.toFixed(0)}%</span>
                            </div>
                            <Progress value={masteryRate} className="h-2 w-full" />
                         </div>
                      </CardContent>
                    </Link>
                  </Card>
                )})}
            </div>
          </div>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingDeck ? "Edit Deck" : "Create New Deck"}</DialogTitle>
            <DialogDescription>
              {editingDeck ? "Update the name of your deck." : "Create a new deck to organize your vocabulary."}
            </DialogDescription>
          </DialogHeader>
          <DeckForm onSaveDeck={handleSaveDeck} deckToEdit={editingDeck} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingDeck} onOpenChange={() => setDeletingDeck(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              <span className="font-semibold text-foreground"> {deletingDeck?.name}</span> deck and all the words within it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleConfirmRemove(deletingDeck!.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
