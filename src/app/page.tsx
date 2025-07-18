
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck, BrainCircuit, Milestone, Wand2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold font-headline text-primary">Nihongo Mastery</h1>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="text-center py-16 md:py-24 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              Your Master Path to Japanese Proficiency
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              An all-in-one platform to master Japanese vocabulary, grammar, and kanji with smart, AI-powered tools.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/login">Login to Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-bold font-headline mb-12">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <BookOpenCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="pt-4">Flashcard Decks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Create and study custom vocabulary decks. Master Hiragana, Katakana, and common words.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Milestone className="h-8 w-8 text-primary" />
                  </div>
                   <CardTitle className="pt-4">Grammar Guides</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">Comprehensive lessons from JLPT N5 to N4, complete with examples and explanations.</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                  </div>
                   <CardTitle className="pt-4">Smart Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">Test your knowledge with pre-made quizzes and track your progress over time.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Wand2 className="h-8 w-8 text-primary" />
                  </div>
                   <CardTitle className="pt-4">AI-Powered Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Generate custom quizzes, check your grammar, and create example sentences with AI assistance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 px-4 bg-muted/30">
           <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
               <div>
                  <h3 className="text-3xl font-bold font-headline text-primary">Learn Smarter, Not Harder</h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Our platform uses spaced repetition and AI-driven insights to help you focus on what you need to learn most, maximizing your study time and retention.
                  </p>
               </div>
               <div>
                 <Image 
                   src="https://placehold.co/600x400.png"
                   data-ai-hint="learning study"
                   alt="Illustration of a person studying with technology"
                   width={600}
                   height={400}
                   className="rounded-lg shadow-md"
                 />
               </div>
           </div>
        </section>

      </main>

      <footer className="p-4 text-center border-t">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Nihongo Mastery. All rights reserved.</p>
      </footer>
    </div>
  );
}
