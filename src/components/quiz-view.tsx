
"use client";

import { useState, useEffect, useMemo } from "react";
import type { Quiz, QuizQuestion } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, RefreshCw, Circle, CheckCircle2 } from "lucide-react";
import { JapaneseText } from "./japanese-text";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface QuizViewProps {
  quiz: Quiz;
}

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function QuizView({ quiz }: QuizViewProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const startQuiz = useMemo(() => {
    return (progress: (string | null)[] = []) => {
      const questions = shuffleArray(quiz.questions);
      setShuffledQuestions(questions);
      
      const savedAnswers = progress.length > 0 ? progress : Array(questions.length).fill(null);
      
      // We need to map saved answers to the new shuffled order if progress exists
      if (progress.length > 0) {
        const reorderedAnswers = questions.map(q => {
          // This is a simplification; true progress restoration with shuffling is complex.
          // For now, we just reset on re-shuffle if progress exists.
          // A more robust solution would require saving answers against question IDs.
          // We will reset progress if a quiz is re-shuffled.
          return null;
        });
        setSelectedAnswers(reorderedAnswers);
        localStorage.setItem(`quiz-progress-${quiz.id}`, JSON.stringify(reorderedAnswers));
        setCurrentQuestionIndex(0);
      } else {
         setSelectedAnswers(savedAnswers);
         const lastAnsweredIndex = savedAnswers.findLastIndex(a => a !== null);
         const nextQuestionIndex = lastAnsweredIndex + 1;
         
         if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
         } else if (savedAnswers.every(a => a !== null)) {
            finishQuiz(questions, savedAnswers, false);
         }
      }

      setIsFinished(false);
    };
  }, [quiz]);


  // Load progress from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedProgressJson = localStorage.getItem(`quiz-progress-${quiz.id}`);
    const savedProgress = savedProgressJson ? JSON.parse(savedProgressJson) : [];
    
    // For simplicity, we restart if the number of questions doesn't match
    if (savedProgress.length !== quiz.questions.length) {
      startQuiz();
    } else {
      // If we have progress, we assume the question order was the same.
      // A better implementation would involve storing question IDs with answers.
      // For now, we just load the questions and answers as they were.
      setShuffledQuestions(quiz.questions); // Don't re-shuffle if loading progress
      setSelectedAnswers(savedProgress);

      const lastAnsweredIndex = savedProgress.findLastIndex((a: any) => a !== null);
      const nextQuestionIndex = lastAnsweredIndex + 1;

      if (nextQuestionIndex < quiz.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else if (savedProgress.every((a: any) => a !== null)) {
        finishQuiz(quiz.questions, savedProgress, false);
      }
    }
  }, [quiz.id, quiz.questions]);


  // Save progress to localStorage whenever answers change
  useEffect(() => {
    if (isMounted && !isFinished) {
      localStorage.setItem(`quiz-progress-${quiz.id}`, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, quiz.id, isMounted, isFinished]);
  
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const score = useMemo(() => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return answer === shuffledQuestions[index]?.correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [selectedAnswers, shuffledQuestions]);


  const finishQuiz = (questions = shuffledQuestions, answers = selectedAnswers, saveScore = true) => {
    if (saveScore && quiz.id !== 'ai-generated') {
      const storageKey = `quiz-highscore-${quiz.id}`;
      const currentHighScore = parseInt(localStorage.getItem(storageKey) || "0", 10);
      const finalScore = answers.reduce((acc, answer, index) => {
          return answer === questions[index]?.correctAnswer ? acc + 1 : acc;
      }, 0);
      if (finalScore > currentHighScore) {
          localStorage.setItem(storageKey, finalScore.toString());
      }
    }
    setIsFinished(true);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const restartQuiz = () => {
    startQuiz();
    localStorage.removeItem(`quiz-progress-${quiz.id}`);
    if (quiz.id === 'ai-generated') {
      sessionStorage.removeItem('ai-generated-quiz');
    }
  };

  const progress = isFinished ? 100 : ((currentQuestionIndex) / shuffledQuestions.length) * 100;
  
  if (!isMounted || !currentQuestion) {
    return (
        <div className="flex justify-center items-center h-full p-4">
            <p>Loading Quiz...</p>
        </div>
    );
  }

  if (isFinished) {
    const percentage = (score / shuffledQuestions.length) * 100;
    return (
      <div className="pb-4 flex flex-col items-center justify-center text-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
            <CardDescription>You scored</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-4xl font-bold text-primary">{score} / {shuffledQuestions.length}</p>
            <p className="text-2xl font-semibold text-muted-foreground">({percentage.toFixed(0)}%)</p>
            <Button onClick={restartQuiz} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Start Over
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will restart the quiz and all your current progress will be lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={restartQuiz}>
                            Restart Quiz
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Progress value={progress} />
          </div>
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
            {currentQuestionIndex < shuffledQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
        </div>
      )}
    </div>
  );
}
