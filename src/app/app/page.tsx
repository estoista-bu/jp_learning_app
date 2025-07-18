
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyManager } from "@/components/vocabulary-manager";
import { GrammarGuide } from "@/components/grammar-guide";
import { BookOpen, Milestone, ArrowLeft, Users, LogOut, BarChart } from "lucide-react";
import type { Deck, GrammarLesson, Quiz, User, UserRole } from "@/lib/types";
import { allDecks as initialDecks } from "@/data/decks";
import { DictionarySearch } from "@/components/dictionary-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AiQuizGenerator } from "@/components/ai-quiz-generator";
import { StatsPage } from "@/components/stats-page";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

type AppView = "vocabulary" | "grammar" | "stats";
type GrammarView = "main" | "lessons" | "lesson" | "quizzes" | "quiz" | "checker" | "ai-quiz-generator";
type VocabularyView = "decks" | "dictionary";

export default function AppPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<AppView>("vocabulary");
  const [vocabularyView, setVocabularyView] = useState<VocabularyView>("decks");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);


  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push('/login');
      return;
    }
    
    // In a real app, you'd fetch user data. Here we simulate it.
    const { users } = require('@/lib/users');
    const user = users.find((u: User) => u.id === storedUserId) || null;
    setCurrentUser(user);
    setIsMounted(true);
  }, [router]);
  
  useEffect(() => {
    if (!currentUser) return;

    try {
      // Load user-specific decks
      const storedDecks = JSON.parse(localStorage.getItem(`userDecks_${currentUser.id}`) || '[]');
      setDecks(storedDecks);

      // Load group decks
      const allGroupDecks: Deck[] = JSON.parse(localStorage.getItem('allGroupDecks') || '[]');
      const userGroupIds = currentUser.groups || [];
      const relevantGroupDecks = allGroupDecks.filter(deck => userGroupIds.includes(deck.groupId!));

      // Combine user and group decks
      const allUserDecks = [...storedDecks, ...relevantGroupDecks];
      const uniqueDecks = Array.from(new Map(allUserDecks.map(deck => [deck.id, deck])).values());
      setDecks(uniqueDecks);
      
      const storedAiQuiz = sessionStorage.getItem(`ai-generated-quiz_${currentUser.id}`);
      if (storedAiQuiz) {
        setSelectedQuiz(JSON.parse(storedAiQuiz));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, [currentUser]);


  useEffect(() => {
    if (isMounted && currentUser) {
      const userSpecificDecks = decks.filter(d => d.category === 'user');
      localStorage.setItem(`userDecks_${currentUser.id}`, JSON.stringify(userSpecificDecks));
    }
  }, [decks, currentUser, isMounted]);


  const [grammarView, setGrammarView] = useState<GrammarView>("main");
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [animation, setAnimation] = useState<'in' | 'out' | null>(null);

  const saveDeck = (deckData: Omit<Deck, "id" | "category">, id?: string) => {
    if (id) {
      setDecks(prev => 
        prev.map(d => (d.id === id ? { ...d, ...deckData, category: "user" } : d))
      );
    } else {
      const newDeck: Deck = { ...deckData, id: Date.now().toString(), category: "user" as const };
      setDecks(prev => [...prev, newDeck]);
    }
  };
  
  const removeDeck = (id: string) => {
    setDecks((prev) => prev.filter((deck) => deck.id !== id));
  };


  const handleNavigateGrammar = (view: GrammarView, data: GrammarLesson | Quiz | null = null) => {
    setAnimation('out');
    setTimeout(() => {
      if (view === "ai-quiz-generator" && currentUser) {
        const storedAiQuiz = sessionStorage.getItem(`ai-generated-quiz_${currentUser.id}`);
        if (storedAiQuiz) {
            const progressKey = `quiz-progress-ai-generated_${currentUser.id}`;
            const progress = JSON.parse(localStorage.getItem(progressKey) || "[]");
            const isFinished = progress.length > 0 && progress.every((a: any) => a !== null);
            if (!isFinished) {
               setSelectedQuiz(JSON.parse(storedAiQuiz));
               setGrammarView('quiz');
               setAnimation('in');
               return;
            }
        }
        setGrammarView('ai-quiz-generator');
        setSelectedQuiz(null);
        if (currentUser) {
          sessionStorage.removeItem(`ai-generated-quiz_${currentUser.id}`);
          localStorage.removeItem(`quiz-progress-ai-generated_${currentUser.id}`);
        }

      } else {
         setGrammarView(view);
      }
     
      if (view === "lesson" && data) {
        setSelectedLesson(data as GrammarLesson);
        setSelectedQuiz(null);
      } else if (view === "quiz" && data) {
        const quizData = data as Quiz;
        if (quizData.id === 'ai-generated' && currentUser) {
          sessionStorage.setItem(`ai-generated-quiz_${currentUser.id}`, JSON.stringify(quizData));
        }
        setSelectedQuiz(quizData);
        setSelectedLesson(null);
      } else if(view !== 'ai-quiz-generator') {
        setSelectedLesson(null);
        setSelectedQuiz(null);
      }
      setAnimation('in');
    }, 100);
  };

  const handleBackGrammar = () => {
    setAnimation('out');
    setTimeout(() => {
      if (grammarView === 'lesson') {
        setGrammarView('lessons');
        setSelectedLesson(null);
      } else if (grammarView === 'quiz') {
        if (selectedQuiz?.id === 'ai-generated') {
            setGrammarView('main');
        } else {
            setGrammarView('quizzes');
            setSelectedQuiz(null);
        }
      } else if (grammarView === 'lessons' || grammarView === 'quizzes' || grammarView === 'checker' || grammarView === 'ai-quiz-generator') {
        setGrammarView('main');
      }
      setAnimation('in');
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const getGrammarTitle = () => {
    switch (grammarView) {
      case "lessons":
        return "Lessons";
      case "lesson":
        return selectedLesson?.title || "Lesson";
      case "quizzes":
        return "Quizzes";
      case "quiz":
        return selectedQuiz?.title || "Quiz";
      case "checker":
        return "AI Grammar Checker";
       case "ai-quiz-generator":
        return "AI Quiz Generator";
      case "main":
      default:
        return "Grammar Guide";
    }
  };
  
  const showSubHeader = grammarView !== 'main' && currentView === 'grammar';

  if (!isMounted || !currentUser) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            {/* You can add a loading spinner here */}
        </div>
    );
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-5xl bg-background flex flex-col pt-[env(safe-area-inset-top)] md:my-4 md:rounded-lg md:shadow-lg">
        <header className="flex flex-col p-4 border-b">
           {!showSubHeader && (
            <div className="flex justify-between items-center relative mb-4">
              <div className="w-8"></div>
              <h1 className="font-headline text-xl font-bold text-primary text-center flex-1">
                  Nihongo Mastery
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Users className="h-5 w-5" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Hi, {currentUser.username}!</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem onSelect={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
           )}
          <div>
            <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as AppView)}>
              <TabsList className="grid w-full grid-cols-3 bg-transparent p-0">
                <TabsTrigger value="vocabulary" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger value="grammar" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <Milestone className="mr-2 h-4 w-4" />
                  Grammar
                </TabsTrigger>
                 <TabsTrigger value="stats" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  <BarChart className="mr-2 h-4 w-4" />
                  Stats
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-y-auto">
          {currentView === 'vocabulary' && (
             <Tabs value={vocabularyView} onValueChange={(v) => setVocabularyView(v as VocabularyView)} className="flex flex-col h-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
                    <TabsTrigger value="decks">My Decks</TabsTrigger>
                    <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
                </TabsList>
                <TabsContent value="decks" className="flex-1 overflow-y-auto">
                    <VocabularyManager 
                        decks={decks}
                        onSaveDeck={saveDeck}
                        onRemoveDeck={removeDeck}
                        userId={currentUser.id}
                    />
                </TabsContent>
                <TabsContent value="dictionary" className="flex-1 overflow-y-auto">
                    <DictionarySearch />
                </TabsContent>
            </Tabs>
          )}
          {currentView === 'grammar' && (
             <div className="flex flex-col h-full">
              {showSubHeader && (
                 <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
                    <div className="flex items-center px-4 py-1 border-b">
                        <button onClick={handleBackGrammar} className="flex-shrink-0 flex items-center text-sm p-2 rounded-md hover:bg-muted -ml-2">
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                        </button>
                        <div className="flex-grow min-w-0 pl-4">
                            <h3 className="font-headline text-base font-bold text-primary truncate">
                                {getGrammarTitle()}
                            </h3>
                        </div>
                    </div>
                </div>
              )}
              {grammarView === 'ai-quiz-generator' ? (
                <AiQuizGenerator
                  onQuizGenerated={(quiz) => handleNavigateGrammar('quiz', quiz)}
                  userId={currentUser.id}
                />
              ) : (
                <GrammarGuide
                  currentView={grammarView}
                  selectedLesson={selectedLesson}
                  selectedQuiz={selectedQuiz}
                  animation={animation}
                  onNavigate={handleNavigateGrammar}
                  userId={currentUser.id}
                />
              )}
            </div>
          )}
           {currentView === 'stats' && (
             <StatsPage userId={currentUser.id} />
          )}
        </main>
      </div>
    </div>
  );
}
