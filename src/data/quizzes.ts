

import type { Quiz } from "@/lib/types";

export const quizzes: Quiz[] = [
  {
    id: "n5-quiz-1",
    title: "N5 Quiz 1: Basics",
    level: "N5",
    questions: [
      {
        question: "Which sentence correctly uses the SOV (Subject-Object-Verb) structure?",
        options: [
          "食べます私は寿司を",
          "私は寿司を食べます",
          "寿司を私は食べます",
          "私は食べます寿司を"
        ],
        optionsReading: [
            "たべますわたしはすしを",
            "わたしはすしをたべます",
            "すしをわたしはたべます",
            "わたしはたべますすしを"
        ],
        correctAnswer: "私は寿司を食べます",
        explanation: "Japanese sentence structure is typically Subject-Object-Verb. '私は' is the subject, '寿司を' is the object, and '食べます' is the verb.",
      },
      {
        question: "Select the correct particle for possession: 'これは私___本です'.",
        questionReading: "これはわたし___ほんです",
        options: ["は", "が", "を", "の"],
        correctAnswer: "の",
        explanation: "The particle の is used to show possession, like 's in English. '私の本' means 'my book'.",
      },
      {
        question: "Which of the following is an 'i-adjective'?",
        options: ["静か", "大きい", "きれい", "有名"],
        optionsReading: ["しずか", "おおきい", "きれい", "ゆうめい"],
        correctAnswer: "大きい",
        explanation: "i-adjectives, in their dictionary form, end with the hiragana character い. 大きい is a classic example.",
      },
       {
        question: "Which particle marks the topic of a sentence?",
        options: ["が", "を", "は", "に"],
        correctAnswer: "は",
        explanation: "は is the topic marker, used to introduce what the sentence is about.",
      },
      {
        question: "How do you say 'I watched a movie yesterday' in polite form?",
        options: [
            "昨日、映画を見ます",
            "昨日、映画を見ません",
            "昨日、映画を見ました",
            "昨日、映画を見ませんでした"
        ],
        optionsReading: [
            "きのう、えいがをみます",
            "きのう、えいがをみません",
            "きのう、えいがをみました",
            "きのう、えいがをみませんでした"
        ],
        correctAnswer: "昨日、映画を見ました",
        explanation: "The polite past tense of verbs is formed by changing the '-masu' ending to '-mashita'.",
      }
    ]
  },
  {
    id: "n5-quiz-2",
    title: "N5 Quiz 2: Particles & Verbs",
    level: "N5",
    questions: [
       {
        question: "Which particle marks the location where an action takes place?",
        options: ["が", "で", "は", "に"],
        correctAnswer: "で",
        explanation: "The particle で marks the location of an action. For example, '図書館で勉強します' (I study at the library).",
      },
      {
        question: "How do you say 'I will not eat' in polite form?",
        options: [
            "食べます",
            "食べません",
            "食べました",
            "食べませんでした"
        ],
        optionsReading: [
            "たべます",
            "たべません",
            "たべました",
            "たべませんでした"
        ],
        correctAnswer: "食べません",
        explanation: "The polite negative present/future tense is formed by changing the '-masu' ending to '-masen'.",
      },
      {
        question: "What is the te-form of the verb '待ちます'?",
        options: ["待って", "待ちて", "待んで", "まて"],
        optionsReading: ["まって", "まちて", "まんで", "まて"],
        correctAnswer: "待って",
        explanation: "For u-verbs ending in -chimasu, the te-form is created by replacing 'chimasu' with 'tte'.",
      },
      {
        question: "How do you say 'quiet library' using a na-adjective?",
        options: ["静か図書館", "静かな図書館", "静かい図書館", "静かで図書館"],
        optionsReading: ["しずかとしょかん", "しずかなとしょかん", "しずかいとしょかん", "しずかでとしょかん"],
        correctAnswer: "静かな図書館",
        explanation: "When a na-adjective comes directly before a noun, you must add な between them.",
      },
       {
        question: "How do you say 'Mr. Sato is married.' to describe a continuous state?",
        options: ["佐藤さんは結婚します", "佐藤さんは結婚しました", "佐藤さんは結婚しています", "佐藤さんは結婚しません"],
        optionsReading: ["さとうさんはけっこんします", "さとうさんはけっこんしました", "さとうさんはけっこんしています", "さとうさんはけっこんしません"],
        correctAnswer: "佐藤さんは結婚しています",
        explanation: "The 'te-form + います' structure is used not only for actions in progress but also to describe a continuous state, like being married.",
      }
    ]
  },
   {
    id: "n5-quiz-3",
    title: "N5 Quiz 3: More Forms",
    level: "N5",
    questions: [
      {
        question: "How do you express 'I want to drink water'?",
        options: ["水が飲めます", "水を飲みます", "水が飲みたいです", "水を飲もう"],
        optionsReading: ["みずがのめます", "みずをのみます", "みずがのみたいです", "みずをのもう"],
        correctAnswer: "水が飲みたいです",
        explanation: "To express desire, you change the 'ます' from the verb stem to 'たいです'. '飲みます' becomes '飲みたいです'.",
      },
       {
        question: "What is the plain form (dictionary form) of the verb '食べます'?",
        options: ["食べた", "食べない", "食べる", "食べて"],
        optionsReading: ["たべた", "たべない", "たべる", "たべて"],
        correctAnswer: "食べる",
        explanation: "The dictionary form is the base form of the verb. For ru-verbs like 食べます, you replace -masu with -ru.",
      },
      {
        question: "How do you ask for permission politely? 'May I use this pen?'",
        options: [
            "このペンを使ってもいいですか。",
            "このペンを使ってください。",
            "このペンを使いたいです。",
            "このペンを使いませんか。"
        ],
        optionsReading: [
            "このぺんをつかってもいいですか。",
            "このぺんをつかってください。",
            "このぺんをつかいたいです。",
            "このぺんをつかいませんか。"
        ],
        correctAnswer: "このペンを使ってもいいですか。",
        explanation: "The structure '(Verb, te-form) + もいいですか' is used to politely ask for permission.",
      },
      {
        question: "What is the plain past tense (ta-form) of '行きます'?",
        options: ["行った", "行きった", "行んだ", "行って"],
        optionsReading: ["いった", "いきった", "いんだ", "いって"],
        correctAnswer: "行った",
        explanation: "The te-form of 行きます is 行って. The ta-form is created similarly, becoming 行った.",
      },
      {
        question: "What does '〜ませんか' express?",
        options: ["A direct command", "A question about ability", "A polite invitation", "A statement of fact"],
        correctAnswer: "A polite invitation",
        explanation: "'〜ませんか' (e.g., '行きませんか?') is a gentle and polite way to invite someone to do something.",
        explanationReading: "「〜ませんか」（れい：「いきませんか？」）は、だれかをなにかをするようにさそう、ていねいでやさしいほうほうです。"
      }
    ]
  },
  {
    id: "n4-quiz-1",
    title: "N4 Quiz 1: Potential & Advice",
    level: "N4",
    questions: [
      {
        question: "How do you say 'I can speak Japanese' using the potential form?",
        options: [
            "日本語を話します",
            "日本語を話せます",
            "日本語を話しました",
            "日本語を話したい"
        ],
        optionsReading: [
            "にほんごをはなします",
            "にほんごをはなせます",
            "にほんごをはなしました",
            "にほんごをはなしたい"
        ],
        correctAnswer: "日本語を話せます",
        explanation: "The potential form expresses ability. For u-verbs like 話します, the final 'i' sound in the stem changes to 'e' and -masu is added, becoming 話せます.",
      },
      {
        question: "Which sentence correctly gives advice using '〜方がいいです'?",
        options: [
            "薬を飲みます方がいいです",
            "薬を飲んで方がいいです",
            "薬を飲む方がいいです",
            "薬を飲んだ方がいいです"
        ],
        optionsReading: [
            "くすりをのみますほうがいいです",
            "くすりをのんでほうがいいです",
            "くすりをのむほうがいいです",
            "くすりをのんだほうがいいです"
        ],
        correctAnswer: "薬を飲んだ方がいいです",
        explanation: "To give positive advice ('you should...'), the ta-form (plain past) of the verb is used before 方がいいです.",
      },
      {
        question: "Which of the following means 'I think it will rain'?",
        options: ["雨が降ると思います", "雨が降ると言いました", "雨が降るでしょう", "雨が降るそうです"],
        optionsReading: ["あめがふるとおもいます", "あめがふるといいました", "あめがふるでしょう", "あめがふるそうです"],
        correctAnswer: "雨が降ると思います",
        explanation: "To express your own opinion ('I think...'), you use the plain form of a verb followed by 'と思います'.",
      },
      {
        question: "How do you correctly say 'I cannot eat sushi' in the potential form?",
        options: ["寿司を食べません", "寿司を食べられません", "寿司を食べたくない", "寿司を食べませんです"],
        optionsReading: ["すしをたべません", "すしをたべられません", "すしをたべたくない", "すしをたべませんです"],
        correctAnswer: "寿司を食べられません",
        explanation: "The potential form of the ru-verb '食べる' is '食べられる'. The polite negative is '食べられません'.",
      },
      {
        question: "How do you give negative advice? 'It's better not to drink too much.'",
        options: [
          "飲みすぎない方がいいです",
          "飲みすぎた方がいいです",
          "飲みすぎないでください",
          "飲みすぎてはいけません"
        ],
        optionsReading: [
            "のみすぎないほうがいいです",
            "のみすぎたほうがいいです",
            "のみすぎないでください",
            "のみすぎてはいけません"
        ],
        correctAnswer: "飲みすぎない方がいいです",
        explanation: "For negative advice ('it's better not to...'), you use the plain negative (nai-form) of the verb before '方がいいです'.",
      }
    ]
  },
  {
    id: "n4-quiz-2",
    title: "N4 Quiz 2: Complex Structures",
    level: "N4",
    questions: [
      {
        question: "Which sentence correctly uses the passive form? 'My cake was eaten by my brother.'",
        options: [
          "弟は私のケーキを食べました。",
          "私は弟にケーキを食べさせました。",
          "私は弟にケーキを食べられました。",
          "弟は私のケーキを食べていました。"
        ],
        optionsReading: [
          "おとうとはわたしのけーきをたべました。",
          "わたしはおとうとにけーきをたべさせました。",
          "わたしはおとうとにけーきをたべられました。",
          "おとうとはわたしのけーきをたべていました。"
        ],
        correctAnswer: "私は弟にケーキを食べられました。",
        explanation: "This is the 'suffering passive'. The subject (私) was negatively affected by the action. The actor (弟) is marked with に.",
      },
      {
        question: "How do you say 'Let's try eating natto.' using the 〜てみる grammar?",
        options: ["納豆を食べます", "納豆を食べてみます", "納豆を食べたいです", "納豆を食べさせます"],
        optionsReading: ["なっとうをたべます", "なっとうをたべてみます", "なっとうをたべたいです", "なっとうをたべさせます"],
        correctAnswer: "納豆を食べてみます",
        explanation: "The structure 'te-form + みる' is used to express trying something out.",
      },
      {
        question: "Which conditional is best for a natural, automatic consequence? 'When you press the button, a sound comes out.'",
        options: ["ボタンを押すと、音が出ます。", "ボタンを押せば、音が出ます。", "ボタンを押したら、音が出ます。", "ボタンを押すなら、音が出ます。"],
        optionsReading: ["ぼたんをおすと、おとがでます。", "ぼたんをおせば、おとがでます。", "ぼたんをおしたら、おとがでます。", "ぼたんをおすなら、おとがでます。"],
        correctAnswer: "ボタンを押すと、音が出ます。",
        explanation: "The 'と' conditional is used when B is a natural or inevitable result of A.",
      },
      {
        question: "Which sentence means 'My friend gave me a ticket.'?",
        options: [
          "私は友達に切符をあげました。",
          "友達は私に切符をもらいました。",
          "友達は私に切符をくれました。",
          "私は友達に切符をくれました。"
        ],
        optionsReading: [
            "わたしはともだちにきっぷをあげました。",
            "ともだちはわたしにきっぷをもらいました。",
            "ともだちはわたしにきっぷをくれました。",
            "わたしはともだちにきっぷをくれました。"
        ],
        correctAnswer: "友達は私に切符をくれました。",
        explanation: "くれる is used when someone gives something to you or your in-group. The giver is the subject.",
      },
      {
        question: "What is a casual way to say '〜なければなりません' (must do)?",
        options: ["〜なくてもいい", "〜ないでください", "〜なきゃ / 〜ないと", "〜たいです"],
        optionsReading: ["〜なくてもいい", "〜ないでください", "〜なきゃ / 〜ないと", "〜たいです"],
        correctAnswer: "〜なきゃ / 〜ないと",
        explanation: "The '〜なきゃ' (a contraction of 'nakereba') and '〜ないと' (literally 'if I don't...') are common casual equivalents for expressing obligation.",
      }
    ]
  }
];
