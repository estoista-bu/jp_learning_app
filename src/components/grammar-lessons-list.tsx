
"use client";

import { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2 } from "lucide-react";
import type { GrammarLesson } from "@/lib/types";
import { grammarLessons as allLessons } from "@/data/lessons";
import { Badge } from './ui/badge';

interface GrammarLessonsListProps {
  onSelectLesson: (lesson: GrammarLesson) => void;
}

export function GrammarLessonsList({ onSelectLesson }: GrammarLessonsListProps) {
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);

  useEffect(() => {
    // This effect runs on the client-side, so `localStorage` is available.
    const lessonsWithStatus = allLessons.map((lesson) => ({
      ...lesson,
      isRead: !!localStorage.getItem(`lesson-read-${lesson.title}`),
    }));
    setLessons(lessonsWithStatus);
  }, []);

  const n5Lessons = lessons.filter(l => l.level === "N5");
  const n4Lessons = lessons.filter(l => l.level === "N4");

  return (
    <div className="space-y-4 p-4">
      
      {/* N5 Lessons */}
      <div>
        <h3 className="font-headline font-semibold text-lg mb-2 text-primary">N5 Lessons</h3>
        <div className="space-y-2">
          {n5Lessons.map((lesson, index) => (
            <button
              key={`n5-${index}`}
              onClick={() => onSelectLesson(lesson)}
              className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {lesson.isRead ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted rounded-full flex-shrink-0" />
                )}
                <span className="flex-1 pr-4">{lesson.title}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* N4 Lessons */}
       <div>
        <h3 className="font-headline font-semibold text-lg mb-2 text-primary">N4 Lessons</h3>
        <div className="space-y-2">
          {n4Lessons.map((lesson, index) => (
            <button
              key={`n4-${index}`}
              onClick={() => onSelectLesson(lesson)}
              className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                 {lesson.isRead ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted rounded-full flex-shrink-0" />
                )}
                <span className="flex-1 pr-4">{lesson.title}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
