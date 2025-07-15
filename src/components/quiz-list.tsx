
import { ChevronRight } from "lucide-react";
import type { Quiz } from "@/lib/types";
import { quizzes } from "@/data/quizzes";

interface QuizListProps {
  onSelectQuiz: (quiz: Quiz) => void;
}

export function QuizList({ onSelectQuiz }: QuizListProps) {
  return (
    <div className="space-y-2 p-4">
      {quizzes.map((quiz) => (
        <button
          key={quiz.id}
          onClick={() => onSelectQuiz(quiz)}
          className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors text-left"
        >
          <span className="flex-1 pr-4">{quiz.title}</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
        </button>
      ))}
    </div>
  );
}
