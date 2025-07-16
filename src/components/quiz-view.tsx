
"use client";

import { useState } from "react";
import type { Quiz } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, RefreshCw, Circle, CheckCircle2 } from "lucide-react";
import { ClickableReading } from "./clickable-reading";
import { JapaneseText } from "./japanese-text";

interface QuizViewProps {
  quiz: Quiz;
}

export function QuizView({ quiz }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return answer === quiz.questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);

  const finishQuiz = () => {
    // Save high score to localStorage
    const storageKey = `quiz-highscore-${quiz.id}`;
    const currentHighScore = parseInt(localStorage.getItem(storageKey) || "0", 10);
    if (score > currentHighScore) {
        localStorage.setItem(storageKey, score.toString());
    }
    setIsFinished(true);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setIsFinished(false);
  };

  const progress = isFinished ? 100 : ((currentQuestionIndex) / quiz.questions.length) * 100;

  if (isFinished) {
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <div className="pb-4 flex flex-col items-center justify-center text-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
            <CardDescription>You scored</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold text-primary">{score} / {quiz.questions.length}</p>
            <p className="text-2xl font-semibold text-muted-foreground">({percentage.toFixed(0)}%)</p>
            <Button onClick={restartQuiz} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-4 space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
        <Progress value={progress} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
             <JapaneseText 
                text={currentQuestion.question}
                reading={currentQuestion.questionReading}
                isBlock
              />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = currentQuestion.correctAnswer === option;
              const hasAnswered = selectedAnswer !== null;
              const optionReading = currentQuestion.optionsReading?.[index]

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto py-3 text-left whitespace-normal text-foreground",
                    "hover:text-foreground",
                    hasAnswered && isCorrect && "bg-green-100 border-green-400 text-green-800 hover:bg-green-100 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300",
                    hasAnswered && !isCorrect && isSelected && "bg-red-100 border-red-400 text-red-800 hover:bg-red-100 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300",
                    !hasAnswered && "hover:bg-accent/10"
                  )}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={hasAnswered}
                >
                  {hasAnswered && isSelected ? (
                     <CheckCircle2 className="mr-3 h-5 w-5 text-primary"/>
                  ) : (
                     <Circle className="mr-3 h-5 w-5 text-muted-foreground/50"/>
                  )}
                  <span className="flex-1">
                     <JapaneseText
                        text={option}
                        reading={optionReading}
                      />
                  </span>
                  {hasAnswered && isCorrect && <CheckCircle className="ml-4 h-5 w-5 text-green-600 dark:text-green-400"/>}
                  {hasAnswered && !isCorrect && isSelected && <XCircle className="ml-4 h-5 w-5 text-red-600 dark:text-red-400"/>}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {selectedAnswer && (
        <div className="p-4 bg-muted/50 rounded-lg animate-in fade-in space-y-4">
            <div className="text-sm text-muted-foreground">
                 <JapaneseText
                    text={currentQuestion.explanation}
                    reading={currentQuestion.explanationReading}
                    isBlock
                  />
            </div>
            <Button onClick={goToNextQuestion} className="w-full">
            {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
        </div>
      )}
    </div>
  );
}
