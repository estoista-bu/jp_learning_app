
import type { Quiz } from "@/lib/types";

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Quiz 1: Core Concepts",
    questions: [
      {
        question: "Which sentence correctly uses the SOV (Subject-Object-Verb) structure?",
        options: [
          "食べます私は寿司を (Tabemasu watashi wa sushi o)",
          "私は寿司を食べます (Watashi wa sushi o tabemasu)",
          "寿司を私は食べます (Sushi o watashi wa tabemasu)",
          "私は食べます寿司を (Watashi wa tabemasu sushi o)"
        ],
        correctAnswer: "私は寿司を食べます (Watashi wa sushi o tabemasu)",
        explanation: "Japanese sentence structure is typically Subject-Object-Verb. '私は' (I) is the subject, '寿司を' (sushi) is the object, and '食べます' (eat) is the verb."
      },
      {
        question: "Select the correct particle for possession in 'This is my book.' (これは___の本です)",
        options: ["は (wa)", "が (ga)", "を (o)", "の (no)"],
        correctAnswer: "の (no)",
        explanation: "The particle の (no) is used to show possession, like 's in English. '私の本' means 'my book'."
      },
      {
        question: "Which of the following is an 'i-adjective'?",
        options: ["静か (shizuka - quiet)", "大きい (ookii - big)", "きれい (kirei - beautiful)", "有名 (yuumei - famous)"],
        correctAnswer: "大きい (ookii - big)",
        explanation: "i-adjectives, in their dictionary form, end with the hiragana character い (i). 大きい (ookii) is a classic example."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Quiz 2: Particles & Tense",
    questions: [
       {
        question: "Which particle marks the topic of a sentence?",
        options: ["が (ga)", "を (o)", "は (wa)", "に (ni)"],
        correctAnswer: "は (wa)",
        explanation: "は (wa) is the topic marker, used to introduce what the sentence is about."
      },
      {
        question: "How do you say 'I watched a movie yesterday' in polite form?",
        options: [
            "昨日、映画を見ます (Kinou, eiga o mimasu)", 
            "昨日、映画を見ません (Kinou, eiga o mimasen)",
            "昨日、映画を見ました (Kinou, eiga o mimashita)",
            "昨日、映画を見ませんでした (Kinou, eiga o mimasen deshita)"
        ],
        correctAnswer: "昨日、映画を見ました (Kinou, eiga o mimashita)",
        explanation: "The polite past tense of verbs is formed by changing the '-masu' ending to '-mashita'."
      },
      {
        question: "When describing an action in progress, like 'I am studying', which verb form is used?",
        options: ["Te-form + います (imasu)", "Dictionary Form", "Ta-form", "Nai-form"],
        correctAnswer: "Te-form + います (imasu)",
        explanation: "The Te-form + います (imasu) structure is used to express the present progressive tense, similar to '-ing' in English. E.g., 勉強しています (benkyou shite imasu)."
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Quiz 3: Plain Forms & Potential",
    questions: [
      {
        question: "What is the plain form (dictionary form) of the verb '食べます' (tabemasu)?",
        options: ["食べた (tabeta)", "食べない (tabenai)", "食べる (taberu)", "食べて (tabete)"],
        correctAnswer: "食べる (taberu)",
        explanation: "The dictionary form is the base form of the verb. For ru-verbs like 食べます, you replace -masu with -ru."
      },
      {
        question: "How do you say 'I can speak Japanese' using the potential form?",
        options: [
            "日本語を話します (Nihongo o hanashimasu)",
            "日本語を話せます (Nihongo o hanasemasu)",
            "日本語を話しました (Nihongo o hanashimashita)",
            "日本語を話したい (Nihongo o hanashitai)"
        ],
        correctAnswer: "日本語を話せます (Nihongo o hanasemasu)",
        explanation: "The potential form expresses ability. For u-verbs like 話します (hanashimasu), the final 'i' sound in the stem changes to 'e' and -masu is added, becoming 話せます (hanasemasu)."
      },
      {
        question: "Which sentence correctly gives advice using '〜方がいいです' (hou ga ii desu)?",
        options: [
            "薬を飲みます方がいいです (Kusuri o nomimasu hou ga ii desu)",
            "薬を飲んで方がいいです (Kusuri o nonde hou ga ii desu)",
            "薬を飲む方がいいです (Kusuri o nomu hou ga ii desu)",
            "薬を飲んだ方がいいです (Kusuri o nonda hou ga ii desu)"
        ],
        correctAnswer: "薬を飲んだ方がいいです (Kusuri o nonda hou ga ii desu)",
        explanation: "To give positive advice ('you should...'), the ta-form (plain past) of the verb is used before 方がいいです (hou ga ii desu)."
      }
    ]
  }
];
