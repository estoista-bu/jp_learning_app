
"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import type { Quiz } from "@/lib/types";
import { quizzes as allQuizzes } from "@/data/quizzes";
import { Badge } from "@/components/ui/badge";

interface QuizListProps {
  onSelectQuiz: (quiz: Quiz) => void;
}

export function QuizList({ onSelectQuiz }: QuizListProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    // This effect runs on the client-side, so `localStorage` is available.
    const quizzesWithScores = allQuizzes.map((quiz) => {
      const storedScore = localStorage.getItem(`quiz-highscore-${quiz.id}`);
      return {
        ...quiz,
        score: storedScore ? parseInt(storedScore, 10) : null,
      };
    });
    setQuizzes(quizzesWithScores);
  }, []);

  return (
    <div className="space-y-2 p-4">
      {quizzes.map((quiz) => (
        <button
          key={quiz.id}
          onClick={() => onSelectQuiz(quiz)}
          className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors text-left"
        >
          <div className="flex flex-col flex-1 pr-4">
            <span className="flex items-center gap-2">
                {quiz.title}
                 {quiz.score !== null && (
                    <Badge variant="secondary" className="text-xs">
                        High Score: {quiz.score}/{quiz.questions.length}
                    </Badge>
                )}
            </span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
        </button>
      ))}
    </div>
  );
}
