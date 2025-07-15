
"use client";

import { ChevronRight } from "lucide-react";
import { GrammarLessonsList } from "./grammar-lessons-list";
import { GrammarLessonView } from "./grammar-lesson-view";
import type { GrammarLesson } from "@/lib/types";
import { cn } from "@/lib/utils";

type GrammarView = "main" | "lessons" | "lesson" | "quizzes";

interface GrammarGuideProps {
    currentView: GrammarView;
    selectedLesson: GrammarLesson | null;
    animation: 'in' | 'out' | null;
    onNavigate: (view: GrammarView, lesson?: GrammarLesson) => void;
}

export function GrammarGuide({ currentView, selectedLesson, animation, onNavigate }: GrammarGuideProps) {

  const renderContent = () => {
    switch (currentView) {
      case "lessons":
        return <GrammarLessonsList onSelectLesson={(lesson) => onNavigate("lesson", lesson)} />;
      case "lesson":
        return selectedLesson ? <GrammarLessonView lesson={selectedLesson} /> : null;
      case "quizzes":
         return (
          <div className="flex flex-col h-full items-center justify-center text-center text-muted-foreground p-8">
            <p className="text-lg font-semibold">Quizzes are coming soon!</p>
            <p className="mt-2">Check back later for updates.</p>
          </div>
        );
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
      <div className={cn(
          "flex-1",
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
