
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyManager } from "@/components/vocabulary-manager";
import { GrammarGuide } from "@/components/grammar-guide";
import { BookOpen, Milestone, ArrowLeft } from "lucide-react";
import type { GrammarLesson } from "@/lib/types";
import { cn } from "@/lib/utils";

type AppView = "vocabulary" | "grammar";
type GrammarView = "main" | "lessons" | "lesson" | "quizzes";

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>("vocabulary");

  // State for Grammar Guide
  const [grammarView, setGrammarView] = useState<GrammarView>("main");
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [animation, setAnimation] = useState<'in' | 'out' | null>(null);

  const handleNavigateGrammar = (view: GrammarView, lesson: GrammarLesson | null = null) => {
    setAnimation('out');
    setTimeout(() => {
        setGrammarView(view);
        setSelectedLesson(lesson);
        setAnimation('in');
    }, 300);
  };

  const handleBackGrammar = () => {
    setAnimation('out');
    setTimeout(() => {
        if(selectedLesson) {
            setGrammarView('lessons');
            setSelectedLesson(null);
        } else {
            setGrammarView('main');
        }
        setAnimation('in');
    }, 300);
  }

  const getGrammarTitle = () => {
    switch (grammarView) {
      case "lessons":
        return "Lessons";
      case "lesson":
        return selectedLesson?.title || "Lesson";
      case "quizzes":
        return "Quizzes";
      case "main":
      default:
        return "Grammar Guide";
    }
  }

  const isGrammarHome = grammarView === 'main';

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm h-screen bg-background flex flex-col">
          <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as AppView)} className="w-full flex-1 flex flex-col">
            <header className="flex flex-col p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-20">
              <h1 className="font-headline text-xl font-bold text-primary text-center">
                Nihongo Mastery
              </h1>
              <div className="mt-4">
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
                  <TabsTrigger value="vocabulary" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <BookOpen className="mr-2 h-4 w-4"/>
                    Vocabulary
                    </TabsTrigger>
                  <TabsTrigger value="grammar" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <Milestone className="mr-2 h-4 w-4"/>
                    Grammar
                  </TabsTrigger>
                </TabsList>
              </div>
            </header>
            <main className="flex-1 flex flex-col overflow-y-auto">
                <TabsContent value="vocabulary" className="flex-1 overflow-y-auto mt-0">
                    <VocabularyManager />
                </TabsContent>
                <TabsContent value="grammar" className="flex-1 overflow-y-auto mt-0">
                    <GrammarGuide 
                        currentView={grammarView}
                        selectedLesson={selectedLesson}
                        animation={animation}
                        onNavigate={handleNavigateGrammar}
                        onBack={handleBackGrammar}
                        getTitle={getGrammarTitle}
                    />
                </TabsContent>
            </main>
        </Tabs>
        </div>
    </div>
  );
}
