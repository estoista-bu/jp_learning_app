
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeckPage() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm h-screen bg-background flex flex-col">
          <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Decks</span>
              </Button>
            </Link>
            <h1 className="font-headline text-xl font-bold text-primary truncate px-2">
              Deck Page
            </h1>
            <div className="w-8 h-8"></div>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center">
            <div className="p-4 text-center">
                <p className="text-lg font-semibold text-muted-foreground">Deck page content has been temporarily cleared for debugging.</p>
            </div>
          </main>
        </div>
    </div>
  );
}
