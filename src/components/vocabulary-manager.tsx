
"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Book, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Deck } from "@/lib/types";
import { DeckForm } from "@/components/deck-form";
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

const initialDecks: Deck[] = [
  { id: "1", name: "Greetings" },
  { id: "2", name: "Food" },
  { id: "3", name: "Travel" },
];

export function VocabularyManager() {
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deletingDeck, setDeletingDeck] = useState<Deck | null>(null);

  const handleOpenForm = (deck: Deck | null) => {
    setEditingDeck(deck);
    setIsFormOpen(true);
  };
  
  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setEditingDeck(null);
    }
    setIsFormOpen(open);
  }

  const saveDeck = (deckData: Omit<Deck, "id">, id?: string) => {
    if (id) {
      setDecks(prev => 
        prev.map(d => (d.id === id ? { ...d, ...deckData } : d))
      );
    } else {
      const newDeck = { ...deckData, id: Date.now().toString() };
      setDecks(prev => [...prev, newDeck]);
    }
    setIsFormOpen(false);
    setEditingDeck(null);
  };
  
  const removeDeck = (id: string) => {
    // In a real app, you'd also delete associated words.
    setDecks((prev) => prev.filter((deck) => deck.id !== id));
    setDeletingDeck(null);
  };

  return (
    <div className="flex justify-center items-start min-h-full">
      <Dialog open={isFormOpen} onOpenChange={handleFormOpenChange}>
        <div className="w-full max-w-sm flex flex-col">
          <header className="flex items-center justify-between p-4 pt-0 border-b">
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

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid gap-4">
              {decks.length > 0 ? (
                decks.map((deck) => (
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
                    <Link href={`/deck/${deck.id}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Book className="h-5 w-5 text-primary" />
                          <span>{deck.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          View and study this deck.
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-16">
                  <p>No decks found.</p>
                  <p className="mt-2">
                    Click the <Plus className="inline h-4 w-4 mx-1" /> button to create one.
                  </p>
                </div>
              )}
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
          <DeckForm onSaveDeck={saveDeck} deckToEdit={editingDeck} />
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
            <AlertDialogAction onClick={() => removeDeck(deletingDeck!.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
