
"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Book, MoreHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import type { Deck } from "@/lib/types";
import { DeckForm } from "@/components/deck-form";
import { allDecks as initialDecks } from "@/data/decks";
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

type KanaSelection = "hiragana" | "katakana";

interface VocabularyManagerProps {
  decks: Deck[];
  onSaveDeck: (deckData: Omit<Deck, "id" | "category">, id?: string) => void;
  onRemoveDeck: (id: string) => void;
}

export function VocabularyManager({ decks, onSaveDeck, onRemoveDeck }: VocabularyManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deletingDeck, setDeletingDeck] = useState<Deck | null>(null);
  const [selectedKana, setSelectedKana] = useState<KanaSelection>("hiragana");

  const allUserDecks = [
    ...initialDecks.filter(d => d.category === 'user' && !d.id.match(/^\d+$/)),
    ...decks
  ];

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
                  <Link href={`/deck/${selectedKana}`} className="flex-1">
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

              {decks.map((deck) => (
                  <Card key={deck.id} className="relative group">
                    <div className="absolute top-2 right-2">
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
                    <Link href={`/deck/${deck.id}`} className="block">
                      <CardHeader className="p-4">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Book className="h-5 w-5 text-primary" />
                          <span>{deck.name}</span>
                        </CardTitle>
                      </CardHeader>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Form Dialog */}
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

      {/* Delete Confirmation Dialog */}
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
