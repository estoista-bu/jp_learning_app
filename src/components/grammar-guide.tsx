
"use client";

import { ChevronRight } from "lucide-react";
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
}

export function GrammarGuide({ currentView, selectedLesson, selectedQuiz, animation, onNavigate }: GrammarGuideProps) {

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
          <div className="p-4 pt-2">
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
    <div className={cn(
        "flex-1 overflow-y-auto",
          animation === 'in' && 'animate-slide-in-from-right',
          animation === 'out' && 'animate-slide-out-to-left-fade'
    )}>
      <div className="overflow-y-auto p-4 pt-2">
        {renderContent()}
      </div>
    </div>
  );
}
