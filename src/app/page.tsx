
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyManager } from "@/components/vocabulary-manager";
import { GrammarGuide } from "@/components/grammar-guide";
import { BookOpen, Milestone, ArrowLeft } from "lucide-react";
import type { GrammarLesson, Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";

type AppView = "vocabulary" | "grammar";
type GrammarView = "main" | "lessons" | "lesson" | "quizzes" | "quiz";

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>("vocabulary");

  // State for Grammar Guide
  const [grammarView, setGrammarView] = useState<GrammarView>("main");
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [animation, setAnimation] = useState<'in' | 'out' | null>(null);

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
            <VocabularyManager />
          )}
          {currentView === 'grammar' && (
             <div className="flex flex-col h-full">
              {grammarView !== 'main' && (
                 <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
                    <div className="flex items-center px-4 py-2 border-b">
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
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
