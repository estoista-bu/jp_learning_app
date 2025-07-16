
"use client"
import type { GrammarLesson } from "@/lib/types";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ClickableReading } from "./clickable-reading";

interface GrammarLessonViewProps {
  lesson: GrammarLesson;
}

export function GrammarLessonView({ lesson }: GrammarLessonViewProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Mark lesson as read in localStorage when the component mounts
    localStorage.setItem(`lesson-read-${lesson.title}`, "true");
  }, [lesson.title]);


  const handlePlayAudio = (e: React.MouseEvent, text: string, index: number) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !window.speechSynthesis || playingIndex !== null) {
      return;
    }

    setPlayingIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.onend = () => setPlayingIndex(null);
    utterance.onerror = () => setPlayingIndex(null);
    
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <div>
      <Card>
        <CardHeader className="pt-6">
          <CardDescription>
            {lesson.explanation}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3 text-md text-accent border-b pb-1">
                Example Sentences
              </h3>
              <ul className="space-y-4">
                {lesson.exampleSentences.map((ex, exIndex) => (
                  <li key={exIndex} className="border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xl">
                        <ClickableReading japanese={ex.japanese} reading={ex.reading}/>
                      </p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handlePlayAudio(e, ex.japanese, exIndex)} 
                        disabled={playingIndex !== null}
                        className="h-8 w-8 text-muted-foreground hover:text-accent"
                        aria-label="Play pronunciation"
                      >
                        {playingIndex === exIndex ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-md text-muted-foreground">{ex.reading}</p>
                    <p className="text-md italic text-muted-foreground/80">{ex.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
