
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
  },
  {
    title: "Te-form + います (Present Progressive)",
    explanation: "The te-form of a verb followed by います (imasu) describes an action currently in progress, similar to '-ing' in English. It can also describe a continuous state.",
    exampleSentences: [
      {
        japanese: "何をしていますか？",
        reading: "Nani o shite imasu ka?",
        meaning: "What are you doing?"
      },
      {
        japanese: "音楽を聞いています。",
        reading: "Ongaku o kiite imasu.",
        meaning: "I am listening to music."
      },
      {
        japanese: "佐藤さんは結婚しています。",
        reading: "Satou-san wa kekkon shite imasu.",
        meaning: "Mr. Sato is married. (A continuous state)"
      }
    ]
  },
  {
    title: "Plain Form (Dictionary Form)",
    explanation: "The plain form, or dictionary form, is the base form of a verb. It's used in casual conversation and in various grammatical structures. For example, the plain form of 食べます (tabemasu) is 食べる (taberu).",
    exampleSentences: [
      {
        japanese: "友達と話すのが好きだ。",
        reading: "Tomodachi to hanasu no ga suki da.",
        meaning: "I like talking with my friends. (Casual speech)"
      },
      {
        japanese: "本を読む時間がない。",
        reading: "Hon o yomu jikan ga nai.",
        meaning: "I don't have time to read books. (Grammatical structure)"
      }
    ]
  },
  {
    title: "Plain Past Tense (Ta-form)",
    explanation: "The ta-form is the plain past tense of verbs, equivalent to the polite -mashita form. It's formed by changing the 'e' in the te-form to 'a'. For example, 食べて (tabete) becomes 食べた (tabeta).",
    exampleSentences: [
      {
        japanese: "昨日、何を食べた？",
        reading: "Kinou, nani o tabeta?",
        meaning: "What did you eat yesterday? (Casual)"
      },
      {
        japanese: "日本に行ったことがある。",
        reading: "Nihon ni itta koto ga aru.",
        meaning: "I have been to Japan. (Expressing experience)"
      }
    ]
  },
  {
    title: "Potential Form (Can do)",
    explanation: "The potential form expresses the ability to do something ('can do'). Ru-verbs change the final -ru to -rareru. U-verbs change the final 'u' sound to the 'e' sound and add -ru.",
    exampleSentences: [
      {
        japanese: "私は漢字が読めます。",
        reading: "Watashi wa kanji ga yomemasu.",
        meaning: "I can read kanji. (Polite form)"
      },
      {
        japanese: "彼は日本語を話せる。",
        reading: "Kare wa nihongo o hanaseru.",
        meaning: "He can speak Japanese. (Plain form)"
      },
      {
        japanese: "寿司が食べられますか？",
        reading: "Sushi ga taberaremasu ka?",
        meaning: "Can you eat sushi?"
      }
    ]
  },
  {
    title: "Giving Reasons (から and ので)",
    explanation: "から (kara) and ので (node) are both used to mean 'because' or 'so'. から is more common and can be used in a wide range of situations. ので is slightly more formal and implies a softer, more logical cause-and-effect relationship.",
    exampleSentences: [
      {
        japanese: "時間がないから、急ぎましょう。",
        reading: "Jikan ga nai kara, isogimashou.",
        meaning: "Because there's no time, let's hurry."
      },
      {
        japanese: "雨が降っているので、傘を持っていきます。",
        reading: "Ame ga futte iru node, kasa o motte ikimasu.",
        meaning: "Since it's raining, I will take an umbrella."
      }
    ]
  },
  {
    title: "Giving Advice (方がいいです)",
    explanation: "The structure (Verb, ta-form) + 方がいいです (hou ga ii desu) is used to give advice, meaning 'it would be better to...'. For negative advice ('it would be better not to...'), use (Verb, plain negative) + 方がいいです.",
    exampleSentences: [
      {
        japanese: "もっと野菜を食べた方がいいですよ。",
        reading: "Motto yasai o tabeta hou ga ii desu yo.",
        meaning: "You should eat more vegetables."
      },
      {
        japanese: "夜遅くまで起きない方がいいです。",
        reading: "Yoru osoku made okinai hou ga ii desu.",
        meaning: "It's better not to stay up late at night."
      }
    ]
  },
  {
    title: "Expressing Obligation (なければなりません)",
    explanation: "To express that you must do something, use the negative plain form of a verb, drop the final 'i', and add -kereba narimasen. For example, iku -> ikanai -> ikanakereba narimasen (must go).",
    exampleSentences: [
      {
        japanese: "宿題をしなければなりません。",
        reading: "Shukudai o shinakereba narimasen.",
        meaning: "I must do my homework."
      },
      {
        japanese: "明日、早く起きなければならない。",
        reading: "Ashita, hayaku okinakereba naranai.",
        meaning: "I have to get up early tomorrow. (Casual form)"
      }
    ]
  }
];


export function GrammarGuide() {
  return (
    <div className="p-4 pt-0 space-y-6">
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
