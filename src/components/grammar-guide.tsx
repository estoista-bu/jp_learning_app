
"use client";

import { ChevronRight, ArrowLeft } from "lucide-react";
import { GrammarLessonsList } from "./grammar-lessons-list";
import { GrammarLessonView } from "./grammar-lesson-view";
import { QuizList } from "./quiz-list";
import { QuizView } from "./quiz-view";
import type { GrammarLesson, Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";


interface GrammarGuideProps {
    currentView: "main" | "lessons" | "lesson" | "quizzes" | "quiz";
    selectedLesson: GrammarLesson | null;
    selectedQuiz: Quiz | null;
    animation: 'in' | 'out' | null;
    onNavigate: (view: "main" | "lessons" | "lesson" | "quizzes" | "quiz", data?: GrammarLesson | Quiz) => void;
    onBack: () => void;
    getTitle: () => string;
}

export function GrammarGuide({ currentView, selectedLesson, selectedQuiz, animation, onNavigate, onBack, getTitle }: GrammarGuideProps) {

  const isMainView = currentView === 'main';

  const renderContent = () => {
    switch (currentView) {
      case "lessons":
        return <GrammarLessonsList onSelectLesson={(lesson) => onNavigate("lesson", lesson)} />;
      case "lesson":
        return selectedLesson ? <GrammarLessonView lesson={selectedLesson} /> : null;
      case "quizzes":
         return <QuizList onSelectQuiz={(quiz) => onNavigate("quiz", quiz)} />;
      case "quiz":
        return selectedQuiz ? <QuizView quiz={selectedQuiz} /> : null;
      case "main":
      default:
        return (
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("lessons")}
                  className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors"
                >
                  <span>Lessons</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </li>
              <li>
                <button
                   onClick={() => onNavigate("quizzes")}
                   className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors"
                >
                  <span>Quizzes</span>
                   <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
        {!isMainView && (
            <div className="flex items-center p-4 border-b">
                <button onClick={onBack} className="flex items-center text-sm p-2 rounded-md hover:bg-muted -ml-2">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </button>
                <h3 className="font-semibold text-center flex-1 px-4 truncate">
                    {getTitle()}
                </h3>
                 <div className="w-[68px]"></div>
            </div>
        )}
      <div className={cn(
          "flex-1 overflow-y-auto",
           animation === 'in' && 'animate-slide-in-from-right',
           animation === 'out' && 'animate-slide-out-to-left-fade'
      )}>
        <div className="overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
