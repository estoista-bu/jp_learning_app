
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyManager } from "@/components/vocabulary-manager";
import { GrammarGuide } from "@/components/grammar-guide";
import { BookOpen, Milestone, ArrowLeft } from "lucide-react";
import type { Deck, GrammarLesson, Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";
import { allDecks as initialDecks } from "@/data/decks";

type AppView = "vocabulary" | "grammar";
type GrammarView = "main" | "lessons" | "lesson" | "quizzes" | "quiz";

const USER_DECKS_STORAGE_KEY = "nihongo-mastery-user-decks";

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>("vocabulary");
  const [decks, setDecks] = useState<Deck[]>([]);

  // Load decks from localStorage on initial render
  useEffect(() => {
    try {
      const storedDecks = localStorage.getItem(USER_DECKS_STORAGE_KEY);
      if (storedDecks) {
        setDecks(JSON.parse(storedDecks));
      } else {
        // If nothing in storage, load the initial default decks
        setDecks(initialDecks.filter(d => d.category === 'user'));
      }
    } catch (error) {
      console.error("Failed to load decks from localStorage", error);
      // Fallback to initial decks on error
      setDecks(initialDecks.filter(d => d.category === 'user'));
    }
  }, []);

  // Save decks to localStorage whenever they change
  useEffect(() => {
    // We don't save on the initial empty render, only after decks are loaded.
    if (decks.length > 0) {
        try {
            localStorage.setItem(USER_DECKS_STORAGE_KEY, JSON.stringify(decks));
        } catch (error) {
            console.error("Failed to save decks to localStorage", error);
        }
    }
  }, [decks]);


  // State for Grammar Guide
  const [grammarView, setGrammarView] = useState<GrammarView>("main");
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [animation, setAnimation] = useState<'in' | 'out' | null>(null);

  const saveDeck = (deckData: Omit<Deck, "id" | "category">, id?: string) => {
    if (id) {
      setDecks(prev => 
        prev.map(d => (d.id === id ? { ...d, ...deckData, category: "user" } : d))
      );
    } else {
      const newDeck = { ...deckData, id: Date.now().toString(), category: "user" as const };
      setDecks(prev => [...prev, newDeck]);
    }
  };
  
  const removeDeck = (id: string) => {
    setDecks((prev) => prev.filter((deck) => deck.id !== id));
  };


  const handleNavigateGrammar = (view: GrammarView, data: GrammarLesson | Quiz | null = null) => {
    setAnimation('out');
    setTimeout(() => {
      setGrammarView(view);
      if (view === "lesson" && data) {
        setSelectedLesson(data as GrammarLesson);
        setSelectedQuiz(null);
      } else if (view === "quiz" && data) {
        setSelectedQuiz(data as Quiz);
        setSelectedLesson(null);
      } else {
        setSelectedLesson(null);
        setSelectedQuiz(null);
      }
      setAnimation('in');
    }, 300);
  };

  const handleBackGrammar = () => {
    setAnimation('out');
    setTimeout(() => {
      if (grammarView === 'lesson') {
        setGrammarView('lessons');
        setSelectedLesson(null);
      } else if (grammarView === 'quiz') {
        setGrammarView('quizzes');
        setSelectedQuiz(null);
      } else if (grammarView === 'lessons' || grammarView === 'quizzes') {
        setGrammarView('main');
      }
      setAnimation('in');
    }, 300);
  };

  const getGrammarTitle = () => {
    switch (grammarView) {
      case "lessons":
        return "Lessons";
      case "lesson":
        return selectedLesson?.title || "Lesson";
      case "quizzes":
        return "Quizzes";
      case "quiz":
        return selectedQuiz?.title || "Quiz";
      case "main":
      default:
        return "Grammar Guide";
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-sm h-screen bg-background flex flex-col pt-[env(safe-area-inset-top)]">
        <header className="flex flex-col p-4 border-b">
          <h1 className="font-headline text-xl font-bold text-primary text-center">
            Nihongo Mastery
          </h1>
          <div className="mt-4">
            <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as AppView)}>
              <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
                <TabsTrigger value="vocabulary" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger value="grammar" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <Milestone className="mr-2 h-4 w-4" />
                  Grammar
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-y-auto">
          {currentView === 'vocabulary' && (
            <VocabularyManager 
              decks={decks}
              onSaveDeck={saveDeck}
              onRemoveDeck={removeDeck}
            />
          )}
          {currentView === 'grammar' && (
             <div className="flex flex-col h-full">
              {grammarView !== 'main' && (
                 <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
                    <div className="flex items-center px-4 py-1 border-b">
                        <button onClick={handleBackGrammar} className="flex-shrink-0 flex items-center text-sm p-2 rounded-md hover:bg-muted -ml-2">
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                        </button>
                        <div className="flex-grow min-w-0 pl-4">
                            <h3 className="font-headline text-base font-bold text-primary truncate">
                                {getGrammarTitle()}
                            </h3>
                        </div>
                    </div>
                </div>
              )}
              <GrammarGuide
                currentView={grammarView}
                selectedLesson={selectedLesson}
                selectedQuiz={selectedQuiz}
                animation={animation}
                onNavigate={handleNavigateGrammar}
                data-testid="grammar-guide"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
