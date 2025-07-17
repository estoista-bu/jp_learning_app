
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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
  if (!array) return [];
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
  
  const getProgressKey = (quizId: string) => `quiz-progress-${quizId}`;

  const startQuiz = useCallback(() => {
    const questions = shuffleArray(quiz.questions);
    setShuffledQuestions(questions);
    
    const initialAnswers = Array(questions.length).fill(null);
    setSelectedAnswers(initialAnswers);
    if (quiz.id !== 'ai-generated') {
      localStorage.setItem(getProgressKey(quiz.id), JSON.stringify(initialAnswers));
    }

    setCurrentQuestionIndex(0);
    setIsFinished(false);
  }, [quiz]);

  const finishQuiz = useCallback((questions = shuffledQuestions, answers = selectedAnswers, saveScore = true) => {
    if (saveScore && quiz.id !== 'ai-generated') {
      const storageKey = `quiz-highscore-${quiz.id}`;
      const currentHighScore = parseInt(localStorage.getItem(storageKey) || "0", 10);
      const finalScore = answers.reduce((acc, answer, index) => {
          if (!questions || !questions[index]) return acc;
          return answer === questions[index]?.correctAnswer ? acc + 1 : acc;
      }, 0);
      if (finalScore > currentHighScore) {
          localStorage.setItem(storageKey, finalScore.toString());
      }
    }
    setIsFinished(true);
  }, [quiz.id, shuffledQuestions]);


  // Load progress from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const progressKey = getProgressKey(quiz.id);
    const savedProgressJson = localStorage.getItem(progressKey);
    const questionsToUse = quiz.id === 'ai-generated' ? quiz.questions : shuffleArray(quiz.questions);

    if (savedProgressJson) {
        // For regular quizzes with saved progress.
        const savedAnswers = JSON.parse(savedProgressJson);
        const savedQuestionsOrder = shuffleArray(quiz.questions); // Use a consistent shuffle
        setShuffledQuestions(savedQuestionsOrder);
        setSelectedAnswers(savedAnswers);
        
        const lastAnsweredIndex = savedAnswers.findLastIndex((a: any) => a !== null);
        const nextQuestionIndex = lastAnsweredIndex >= 0 ? lastAnsweredIndex + 1 : 0;

        if (nextQuestionIndex < savedQuestionsOrder.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else if (savedAnswers.every((a: any) => a !== null)) {
            finishQuiz(savedQuestionsOrder, savedAnswers, false);
        }
    } else {
        // For AI quizzes or new regular quizzes.
        setShuffledQuestions(questionsToUse);
        const progress = Array(questionsToUse.length).fill(null);
        setSelectedAnswers(progress);
        setCurrentQuestionIndex(0);
    }
  }, [quiz, finishQuiz]);

  // Save progress to localStorage whenever answers change
  useEffect(() => {
    if (isMounted && !isFinished && selectedAnswers.length > 0 && quiz.id !== 'ai-generated') {
      localStorage.setItem(getProgressKey(quiz.id), JSON.stringify(selectedAnswers));
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
      if (!shuffledQuestions[index]) return acc;
      return answer === shuffledQuestions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [selectedAnswers, shuffledQuestions]);


  const goToNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const restartQuiz = () => {
    if (quiz.id !== 'ai-generated') {
      localStorage.removeItem(getProgressKey(quiz.id));
    }
    startQuiz();
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
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="pb-1 space-y-1">
      <div className="space-y-2 p-4">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
             <JapaneseText 
                text={currentQuestion.question}
                reading={currentQuestion.questionReading}
                isBlock
                isInteractive={true}
              />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = currentQuestion.correctAnswer === option;
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
                        isInteractive={!hasAnswered}
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
      
      {hasAnswered && (
        <div className="p-4 bg-muted/50 rounded-lg animate-in fade-in space-y-4">
            <div className="text-sm text-muted-foreground">
                 <JapaneseText
                    text={currentQuestion.explanation}
                    reading={currentQuestion.explanationReading}
                    isBlock
                    isInteractive={true}
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
