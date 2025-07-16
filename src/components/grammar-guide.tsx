
"use client";

import { ChevronRight, ClipboardCheck, GraduationCap, ClipboardList } from "lucide-react";
import { GrammarLessonsList } from "./grammar-lessons-list";
import { GrammarLessonView } from "./grammar-lesson-view";
import { QuizList } from "./quiz-list";
import { QuizView } from "./quiz-view";
import type { GrammarLesson, Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { grammarLessons } from "@/data/lessons";
import { GrammarChecker } from "./grammar-checker";


interface GrammarGuideProps {
    currentView: "main" | "lessons" | "lesson" | "quizzes" | "quiz" | "checker";
    selectedLesson: GrammarLesson | null;
    selectedQuiz: Quiz | null;
    animation: 'in' | 'out' | null;
    onNavigate: (view: "main" | "lessons" | "lesson" | "quizzes" | "quiz" | "checker", data?: GrammarLesson | Quiz) => void;
}

export function GrammarGuide({ currentView, selectedLesson, selectedQuiz, animation, onNavigate }: GrammarGuideProps) {
  const [lessonProgress, setLessonProgress] = useState(0);

  useEffect(() => {
    // This effect runs on the client-side
    const readLessons = grammarLessons.filter(lesson => {
      return localStorage.getItem(`lesson-read-${lesson.title}`);
    });
    const progress = Math.round((readLessons.length / grammarLessons.length) * 100);
    setLessonProgress(progress);
  }, [currentView]); // Recalculate when view changes, e.g., coming back to main


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
      case "checker":
        return <GrammarChecker />;
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
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Lessons
                    {lessonProgress > 0 && (
                        <Badge variant="secondary">{lessonProgress}%</Badge>
                    )}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </li>
              <li>
                <button
                   onClick={() => onNavigate("quizzes")}
                   className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Quizzes
                  </span>
                   <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </li>
               <li>
                <button
                   onClick={() => onNavigate("checker")}
                   className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    Grammar Checker
                  </span>
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
      <div className="overflow-y-auto pb-4">
        {renderContent()}
      </div>
    </div>
  );
}
