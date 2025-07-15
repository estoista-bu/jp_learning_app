
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
            <header className={cn("flex flex-col p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-20 transition-all", !isGrammarHome && currentView === 'grammar' && 'py-2')}>
              <h1 className="font-headline text-xl font-bold text-primary text-center">
                Nihongo Mastery
              </h1>
              { (isGrammarHome || currentView === 'vocabulary') ? (
                  <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 mt-4">
                    <TabsTrigger value="vocabulary" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <BookOpen className="mr-2 h-4 w-4"/>
                      Vocabulary
                      </TabsTrigger>
                    <TabsTrigger value="grammar" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <Milestone className="mr-2 h-4 w-4"/>
                      Grammar
                    </TabsTrigger>
                  </TabsList>
                ) : (
                  <div className="flex items-center mt-2">
                     <button onClick={handleBackGrammar} className="flex items-center text-sm p-2 rounded-md hover:bg-muted -ml-2">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                    </button>
                    <h3 className="font-semibold text-center flex-1 px-4 truncate">
                      {getGrammarTitle()}
                    </h3>
                    <div className="w-[68px]"></div>
                  </div>
                )}

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
                    />
                </TabsContent>
            </main>
        </Tabs>
        </div>
    </div>
  );
}
