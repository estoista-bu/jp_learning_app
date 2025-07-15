
"use client"
import type { GrammarLesson } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface GrammarLessonViewProps {
  lesson: GrammarLesson;
}

export function GrammarLessonView({ lesson }: GrammarLessonViewProps) {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.explanation}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3 text-md text-accent border-b pb-1">
                Example Sentences
              </h3>
              <ul className="space-y-4">
                {lesson.exampleSentences.map((ex, exIndex) => (
                  <li key={exIndex} className="border-l-2 border-primary pl-4">
                    <p className="font-bold text-xl">{ex.japanese}</p>
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
