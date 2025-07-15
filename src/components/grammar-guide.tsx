
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const grammarLessons = [
  {
    title: "Basic Sentence Structure (SOV)",
    explanation: "Japanese sentence structure is typically Subject-Object-Verb (SOV). This is different from English's Subject-Verb-Object (SVO) structure. The particle 'は' (wa) often marks the topic of the sentence, and 'を' (o) marks the direct object.",
    exampleSentences: [
      {
        japanese: "私は寿司を食べます。",
        reading: "Watashi wa sushi o tabemasu.",
        meaning: "I eat sushi."
      },
      {
        japanese: "猫は魚が好きです。",
        reading: "Neko wa sakana ga suki desu.",
        meaning: "The cat likes fish."
      }
    ]
  },
  {
    title: "Particles は (wa) and が (ga)",
    explanation: "は (wa) is the topic marker, introducing what the sentence is about. が (ga) is the subject marker, identifying who or what is performing an action or being described. Use が for new information or to emphasize the subject.",
    exampleSentences: [
      {
        japanese: "今日はいい天気です。",
        reading: "Kyou wa ii tenki desu.",
        meaning: "Today, the weather is good. (Topic: Today)"
      },
      {
        japanese: "雨が降っています。",
        reading: "Ame ga futte imasu.",
        meaning: "It is raining. (Subject: Rain, new information)"
      }
    ]
  },
  {
    title: "Verb Conjugation (Masu-form)",
    explanation: "The -masu form is a polite way to end a verb in the present or future tense. To make it past tense, change -masu to -mashita. To make it negative, change -masu to -masen. For past negative, change it to -masen deshita.",
    exampleSentences: [
      {
        japanese: "毎日、勉強します。",
        reading: "Mainichi, benkyou shimasu.",
        meaning: "I study every day. (Present)"
      },
      {
        japanese: "昨日、映画を見ました。",
        reading: "Kinou, eiga o mimashita.",
        meaning: "I watched a movie yesterday. (Past)"
      },
      {
        japanese: "お酒は飲みません。",
        reading: "Osake wa nomimasen.",
        meaning: "I don't drink alcohol. (Negative)"
      }
    ]
  }
];


export function GrammarGuide() {
  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grammar Guide</CardTitle>
          <CardDescription>Browse through these lessons to improve your Japanese grammar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {grammarLessons.map((lesson, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{lesson.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-md text-accent">Explanation</h3>
                      <p className="text-muted-foreground text-sm">{lesson.explanation}</p>
                    </div>
                    <div>
                       <h3 className="font-semibold mb-2 text-md text-accent">Example Sentences</h3>
                       <ul className="space-y-3">
                        {lesson.exampleSentences.map((ex, exIndex) => (
                          <li key={exIndex} className="border-l-2 border-primary pl-3">
                            <p className="font-bold text-md">{ex.japanese}</p>
                            <p className="text-sm text-muted-foreground">{ex.reading}</p>
                            <p className="text-sm italic">{ex.meaning}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
