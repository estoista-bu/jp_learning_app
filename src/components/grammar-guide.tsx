
"use client";

import { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { GrammarLessonsList } from "./grammar-lessons-list";
import { GrammarLessonView } from "./grammar-lesson-view";
import type { GrammarLesson } from "@/lib/types";
import { cn } from "@/lib/utils";

type GrammarView = "main" | "lessons" | "lesson" | "quizzes";

export function GrammarGuide() {
  const [currentView, setCurrentView] = useState<GrammarView>("main");
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [animation, setAnimation] = useState<'in' | 'out' | null>(null);

  const handleNavigate = (view: GrammarView, lesson: GrammarLesson | null = null) => {
    setAnimation('out');
    setTimeout(() => {
        setCurrentView(view);
        setSelectedLesson(lesson);
        setAnimation('in');
    }, 300); // Match animation duration
  };

  const handleBack = () => {
    setAnimation('out');
    setTimeout(() => {
        if(selectedLesson) {
            setCurrentView('lessons');
            setSelectedLesson(null);
        } else {
            setCurrentView('main');
        }
        setAnimation('in');
    }, 300);
  }

  const renderContent = () => {
    switch (currentView) {
      case "lessons":
        return <GrammarLessonsList onSelectLesson={(lesson) => handleNavigate("lesson", lesson)} />;
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
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavigate("lessons")}
                className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors"
              >
                <span>Lessons</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </li>
            <li>
              <button
                 onClick={() => handleNavigate("quizzes")}
                 className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors"
              >
                <span>Quizzes</span>
                 <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </li>
          </ul>
        );
    }
  };

  return (
    <div className="p-4 pt-0 pb-8 flex flex-col h-full">
      <div className="flex items-center mb-4 min-h-[40px]">
        {currentView !== 'main' && (
             <button onClick={handleBack} className="flex items-center text-sm p-2 -ml-2 rounded-md hover:bg-muted">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
            </button>
        )}
      </div>
      <div className={cn(
          "flex-1",
           animation === 'in' && 'animate-slide-in-from-right',
           animation === 'out' && 'animate-slide-out-to-left-fade'
      )}>
        {renderContent()}
      </div>
    </div>
  );
}
