
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyManager } from "@/components/vocabulary-manager";
import { GrammarGuide } from "@/components/grammar-guide";
import { BookOpen, Milestone, ArrowLeft } from "lucide-react";
import type { GrammarLesson, Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GrammarContainer } from "@/components/grammar-container";

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
      <div className="w-full max-w-sm h-screen bg-background flex flex-col">
        <header className="flex flex-col p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-20 h-header">
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
            <GrammarContainer
                isMainView={grammarView === 'main'}
                onBack={handleBackGrammar}
                title={getGrammarTitle()}
            >
              <GrammarGuide
                currentView={grammarView}
                selectedLesson={selectedLesson}
                selectedQuiz={selectedQuiz}
                animation={animation}
                onNavigate={handleNavigateGrammar}
              />
            </GrammarContainer>
          )}
        </main>
      </div>
    </div>
  );
}
