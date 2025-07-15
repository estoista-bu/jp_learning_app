
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
  },
  {
    id: "quiz-4",
    title: "Quiz 4: Intermediate Concepts",
    questions: [
      {
        question: "How do you form a polite invitation? 'Won't you go to the movies together?'",
        options: [
          "一緒に映画に行きましょう (Issho ni eiga ni ikimashou)",
          "一緒に映画に行きませんか (Issho ni eiga ni ikimasen ka)",
          "一緒に映画に行きたい (Issho ni eiga ni ikitai)",
          "一緒に映画に行く (Issho ni eiga ni iku)"
        ],
        correctAnswer: "一緒に映画に行きませんか (Issho ni eiga ni ikimasen ka)",
        explanation: "The 'masen ka' form is a common and polite way to invite someone to do something."
      },
      {
        question: "Which sentence correctly uses 'から' (kara) to give a reason?",
        options: [
          "急ぎますから、時間がない (Isogimasu kara, jikan ga nai)",
          "時間がないから、急ぎます (Jikan ga nai kara, isogimasu)",
          "から時間がない、急ぎます (Kara jikan ga nai, isogimasu)",
          "急ぎます、時間がないから (Isogimasu, jikan ga nai kara)"
        ],
        correctAnswer: "時間がないから、急ぎます (Jikan ga nai kara, isogimasu)",
        explanation: "'から' (kara) follows the clause that states the reason. 'Because there's no time, I'll hurry.'"
      },
      {
        question: "What is the correct way to express obligation? 'I must study.'",
        options: [
          "勉強すると思います (Benkyou suru to omoimasu)",
          "勉強したいです (Benkyou shitai desu)",
          "勉強しなければなりません (Benkyou shinakereba narimasen)",
          "勉強できます (Benkyou dekimasu)"
        ],
        correctAnswer: "勉強しなければなりません (Benkyou shinakereba narimasen)",
        explanation: "The 'nakereba narimasen' pattern is used to express that something must be done. It's formed from the verb's negative 'nai' form."
      },
      {
        question: "How do you quote someone's thoughts? 'I think it will rain tomorrow.'",
        options: [
          "明日は雨が降ると言いました (Ashita wa ame ga furu to iimashita)",
          "明日は雨が降ると思います (Ashita wa ame ga furu to omoimasu)",
          "明日は雨が降るでしょう (Ashita wa ame ga furu deshou)",
          "明日は雨が降るかもしれません (Ashita wa ame ga furu kamoshiremasen)"
        ],
        correctAnswer: "明日は雨が降ると思います (Ashita wa ame ga furu to omoimasu)",
        explanation: "The plain form of a verb followed by 'と思います' (to omoimasu) is used to express one's own opinion or thoughts."
      }
    ]
  },
  {
    id: "quiz-5",
    title: "Quiz 5: Comprehensive Review",
    questions: [
      {
        question: "Choose the correct comparison: 'The train is faster than the bus.'",
        options: [
          "電車はバスの方が速いです (Densha wa basu no hou ga hayai desu)",
          "バスは電車より速いです (Basu wa densha yori hayai desu)",
          "バスより電車の方が速いです (Basu yori densha no hou ga hayai desu)",
          "電車とバスは速いです (Densha to basu wa hayai desu)"
        ],
        correctAnswer: "バスより電車の方が速いです (Basu yori densha no hou ga hayai desu)",
        explanation: "The structure 'A yori B no hou ga...' means 'B is more... than A'. Here, the train (B) is faster than the bus (A)."
      },
      {
        question: "What is the plain past tense (ta-form) of the verb '飲みます' (nomimasu)?",
        options: ["飲んで (nonde)", "飲んだ (nonda)", "飲む (nomu)", "飲まない (nomanai)"],
        correctAnswer: "飲んだ (nonda)",
        explanation: "For u-verbs ending in -mimasu, the te-form is -nde (飲んで) and the ta-form is -nda (飲んだ)."
      },
      {
        question: "How do you use the volitional form to say 'Let's go!' in a casual way?",
        options: ["行きましょう (Ikimashou)", "行きませんか (Ikimasen ka)", "行こう (Ikou)", "行きたい (Ikitai)"],
        correctAnswer: "行こう (Ikou)",
        explanation: "The plain volitional form (e.g., ikou) is used for casual suggestions like 'Let's go'. The polite equivalent is 'ikimashou'."
      },
      {
        question: "Which of the following is a 'na-adjective'?",
        options: ["新しい (atarashii - new)", "面白い (omoshiroi - interesting)", "静か (shizuka - quiet)", "高い (takai - expensive/high)"],
        correctAnswer: "静か (shizuka - quiet)",
        explanation: "'Na-adjectives' do not end in 'い' and require 'な' when they come before a noun (e.g., 静かな部屋 - shizuka na heya, 'a quiet room')."
      }
    ]
  }
];
