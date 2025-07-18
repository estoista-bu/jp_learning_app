
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopy, Brain, Percent, Trophy, BarChart2 } from 'lucide-react';
import { allDecks as initialDecks } from '@/data/decks';
import { allWords } from '@/data/words';
import { quizzes as allProvidedQuizzes } from '@/data/quizzes';
import type { Deck } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';

interface QuizResult {
  id?: string;
  score: number;
  total: number;
  timestamp: string;
}

interface QuizRates {
    total: number;
    correct: number;
    dailyCorrect: number;
    dailyTotal: number;
    weeklyCorrect: number;
    weeklyTotal: number;
    monthlyCorrect: number;
    monthlyTotal: number;
}

interface MemoryTestResults {
    [wordId: string]: 'known' | 'unknown';
}

export function StatsPage() {
    const [deckStats, setDeckStats] = useState<{ name: string; wordCount: number; isCustom: boolean }[]>([]);
    const [knownWordsRate, setKnownWordsRate] = useState(0);
    const [quizStats, setQuizStats] = useState<{ provided: QuizRates; ai: QuizRates }>({
        provided: { total: 0, correct: 0, dailyCorrect: 0, dailyTotal: 0, weeklyCorrect: 0, weeklyTotal: 0, monthlyCorrect: 0, monthlyTotal: 0 },
        ai: { total: 0, correct: 0, dailyCorrect: 0, dailyTotal: 0, weeklyCorrect: 0, weeklyTotal: 0, monthlyCorrect: 0, monthlyTotal: 0 }
    });
    const [quizMastery, setQuizMastery] = useState(0);

    useEffect(() => {
        // --- Vocabulary Stats ---
        const userDecks: Deck[] = JSON.parse(localStorage.getItem('userDecks') || '[]');
        const combinedDecks = [...initialDecks, ...userDecks];
        const uniqueDecks = Array.from(new Map(combinedDecks.map(deck => [deck.id, deck])).values());
        
        const calculatedDeckStats = uniqueDecks.map(deck => {
            const wordsForDeck = JSON.parse(localStorage.getItem(`words_${deck.id}`) || '[]');
            const wordCount = wordsForDeck.length > 0 ? wordsForDeck.length : allWords.filter(w => w.deckId === deck.id).length;
            const isCustom = userDecks.some(ud => ud.id === deck.id);
            return { name: deck.name, wordCount, isCustom };
        });
        setDeckStats(calculatedDeckStats);

        const memoryResults: MemoryTestResults = JSON.parse(localStorage.getItem('memoryTestResults') || '{}');
        const totalTracked = Object.keys(memoryResults).length;
        if(totalTracked > 0) {
            const knownCount = Object.values(memoryResults).filter(val => val === 'known').length;
            setKnownWordsRate((knownCount / totalTracked) * 100);
        }

        // --- Quiz Stats ---
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneMonth = 30 * oneDay;

        const calculateRates = (results: QuizResult[]): QuizRates => {
            return results.reduce((acc, r) => {
                acc.total += r.total;
                acc.correct += r.score;
                const timestamp = new Date(r.timestamp);
                const diff = now.getTime() - timestamp.getTime();
                if (diff < oneMonth) {
                    acc.monthlyCorrect += r.score;
                    acc.monthlyTotal += r.total;
                }
                if (diff < oneWeek) {
                    acc.weeklyCorrect += r.score;
                    acc.weeklyTotal += r.total;
                }
                if (diff < oneDay) {
                    acc.dailyCorrect += r.score;
                    acc.dailyTotal += r.total;
                }
                return acc;
            }, { 
                total: 0, correct: 0, dailyCorrect: 0, dailyTotal: 0, 
                weeklyCorrect: 0, weeklyTotal: 0, monthlyCorrect: 0, monthlyTotal: 0 
            });
        };

        const providedResults: QuizResult[] = JSON.parse(localStorage.getItem('quizResults_provided') || '[]');
        const aiResults: QuizResult[] = JSON.parse(localStorage.getItem('quizResults_ai') || '[]');
        
        setQuizStats({
            provided: calculateRates(providedResults),
            ai: calculateRates(aiResults)
        });

        // --- Quiz Mastery ---
        let totalPossibleScore = 0;
        let userTotalHighScore = 0;
        allProvidedQuizzes.forEach(quiz => {
            totalPossibleScore += quiz.questions.length;
            const highScore = parseInt(localStorage.getItem(`quiz-highscore-${quiz.id}`) || '0', 10);
            userTotalHighScore += highScore;
        });

        if (totalPossibleScore > 0) {
            setQuizMastery((userTotalHighScore / totalPossibleScore) * 100);
        }

    }, []);

    const formatRate = (correct: number, total: number) => {
        if (total === 0) return '0.0%';
        return `${((correct / total) * 100).toFixed(1)}%`;
    }
    
    const StatRow = ({ label, value }: { label: string, value: string }) => (
        <p className="flex justify-between items-center text-xs">
            <span className="flex-shrink-0 font-medium">{label}</span>
            <span className="font-mono text-muted-foreground">{value}</span>
        </p>
    );

    return (
        <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
                {/* Vocabulary Section */}
                <section>
                    <h2 className="text-xl font-headline font-bold text-primary mb-2">Vocabulary Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <BookCopy className="h-5 w-5 text-accent" />
                                    <span>Words per Deck</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm space-y-1">
                                    {deckStats.map(deck => (
                                        <li key={deck.name} className="flex justify-between">
                                            <span>{deck.name} {deck.isCustom && <span className="text-primary">*</span>}</span>
                                            <span className="font-mono">{deck.wordCount}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-muted-foreground mt-2">* Custom deck</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Brain className="h-5 w-5 text-accent" />
                                    <span>Known Words Rate</span>
                                </CardTitle>
                                <CardDescription>From Memory Test results</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-center">{knownWordsRate.toFixed(1)}<span className="text-lg">%</span></p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Quizzes Section */}
                <section>
                    <h2 className="text-xl font-headline font-bold text-primary mb-2">Quiz Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Trophy className="h-5 w-5 text-accent" />
                                    <span>Quizzes</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <StatRow label="Total Rate:" value={formatRate(quizStats.provided.correct, quizStats.provided.total)} />
                                <StatRow label="Monthly Rate:" value={formatRate(quizStats.provided.monthlyCorrect, quizStats.provided.monthlyTotal)} />
                                <StatRow label="Weekly Rate:" value={formatRate(quizStats.provided.weeklyCorrect, quizStats.provided.weeklyTotal)} />
                                <StatRow label="Daily Rate:" value={formatRate(quizStats.provided.dailyCorrect, quizStats.provided.dailyTotal)} />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <BarChart2 className="h-5 w-5 text-accent" />
                                    <span>AI Quizzes</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <StatRow label="Total Rate:" value={formatRate(quizStats.ai.correct, quizStats.ai.total)} />
                                <StatRow label="Monthly Rate:" value={formatRate(quizStats.ai.monthlyCorrect, quizStats.ai.monthlyTotal)} />
                                <StatRow label="Weekly Rate:" value={formatRate(quizStats.ai.weeklyCorrect, quizStats.ai.weeklyTotal)} />
                                <StatRow label="Daily Rate:" value={formatRate(quizStats.ai.dailyCorrect, quizStats.ai.dailyTotal)} />
                            </CardContent>
                        </Card>
                         <Card className="col-span-1 md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Percent className="h-5 w-5 text-accent" />
                                    <span>Quiz Mastery</span>
                                </CardTitle>
                                 <CardDescription>Your high scores vs. perfect scores on all standard quizzes.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <p className="text-3xl font-bold text-center">{quizMastery.toFixed(1)}<span className="text-lg">%</span></p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

            </div>
        </ScrollArea>
    );
}
