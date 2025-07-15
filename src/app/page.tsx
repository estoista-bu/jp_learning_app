
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyManager } from "@/components/vocabulary-manager";
import { GrammarGuide } from "@/components/grammar-guide";
import { BookOpen, Milestone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm h-screen bg-background flex flex-col">
           <header className="flex items-center justify-center p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
            <h1 className="font-headline text-xl font-bold text-primary">
              Nihongo Mastery
            </h1>
          </header>

          <main className="flex-1 flex flex-col overflow-y-auto">
             <Tabs defaultValue="vocabulary" className="w-full flex-1 flex flex-col">
                <div className="px-4 border-b">
                  <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
                    <TabsTrigger value="vocabulary" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <BookOpen className="mr-2 h-4 w-4"/>
                      Vocabulary
                      </TabsTrigger>
                    <TabsTrigger value="grammar" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                      <Milestone className="mr-2 h-4 w-4"/>
                      Grammar
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="vocabulary" className="flex-1 overflow-y-auto mt-0">
                    <VocabularyManager />
                </TabsContent>
                <TabsContent value="grammar" className="flex-1 overflow-y-auto mt-0">
                    <GrammarGuide />
                </TabsContent>
            </Tabs>
          </main>
        </div>
    </div>
  );
}
