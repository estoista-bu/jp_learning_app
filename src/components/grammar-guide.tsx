
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
  },
  {
    title: "Particle の (no) for Possession",
    explanation: "The particle の (no) is used to show possession, similar to 's in English. It connects two nouns, where the first noun possesses or describes the second noun.",
    exampleSentences: [
      {
        japanese: "これは私の本です。",
        reading: "Kore wa watashi no hon desu.",
        meaning: "This is my book."
      },
      {
        japanese: "あれは山田さんの車です。",
        reading: "Are wa Yamada-san no kuruma desu.",
        meaning: "That is Mr. Yamada's car."
      },
      {
        japanese: "日本語の先生",
        reading: "Nihongo no sensei",
        meaning: "A teacher of Japanese (Japanese teacher)."
      }
    ]
  },
  {
    title: "i-Adjectives and na-Adjectives",
    explanation: "Japanese has two types of adjectives. 'i-adjectives' always end in い (i) (e.g., 大きい - ookii, 'big'). 'na-adjectives' do not end in い, and require な (na) when placed before a noun (e.g., きれいな花 - kirei na hana, 'beautiful flower').",
    exampleSentences: [
      {
        japanese: "このカバンは大きいです。",
        reading: "Kono kaban wa ookii desu.",
        meaning: "This bag is big. (i-adjective)"
      },
      {
        japanese: "静かな図書館",
        reading: "Shizuka na toshokan",
        meaning: "A quiet library. (na-adjective before noun)"
      },
      {
        japanese: "この町は静かです。",
        reading: "Kono machi wa shizuka desu.",
        meaning: "This town is quiet. (na-adjective at end of sentence)"
      }
    ]
  },
  {
    title: "Particle に (ni) for Time and Location",
    explanation: "The particle に (ni) is used to mark a specific point in time (e.g., on Sunday, at 3 o'clock) or the location of existence for inanimate objects (used with verbs like あります - arimasu).",
    exampleSentences: [
      {
        japanese: "３時に会いましょう。",
        reading: "San-ji ni aimashou.",
        meaning: "Let's meet at 3 o'clock. (Time)"
      },
      {
        japanese: "机の上に本があります。",
        reading: "Tsukue no ue ni hon ga arimasu.",
        meaning: "There is a book on the desk. (Location of existence)"
      }
    ]
  },
  {
    title: "The Te-form (て形)",
    explanation: "The te-form is a versatile verb conjugation that doesn't indicate tense. It's used for making requests (〜てください), connecting successive actions (action 1, and then action 2), and much more.",
    exampleSentences: [
      {
        japanese: "朝ごはんを食べて、学校に行きます。",
        reading: "Asagohan o tabete, gakkou ni ikimasu.",
        meaning: "I eat breakfast and then go to school."
      },
      {
        japanese: "ちょっと待ってください。",
        reading: "Chotto matte kudasai.",
        meaning: "Please wait a moment."
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
