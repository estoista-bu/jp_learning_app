
import { ChevronRight } from "lucide-react";
import type { GrammarLesson } from "@/lib/types";

interface GrammarLessonsListProps {
  onSelectLesson: (lesson: GrammarLesson) => void;
}

const grammarLessons: GrammarLesson[] = [
  {
    title: "Basic Sentence Structure (SOV)",
    explanation: "Japanese sentence structure is typically Subject-Object-Verb (SOV). This is different from English's Subject-Verb-Object (SVO) structure. The particle 'は' (wa) often marks the topic of the sentence, and 'を' (o) marks the direct object.",
    exampleSentences: [
      {
        japanese: [{ text: "私", furigana: "わたし" }, { text: "は" }, { text: "寿司", furigana: "すし" }, { text: "を" }, { text: "食", furigana: "た" }, { text: "べます。" }],
        reading: "Watashi wa sushi o tabemasu.",
        meaning: "I eat sushi."
      },
      {
        japanese: [{ text: "猫", furigana: "ねこ" }, { text: "は" }, { text: "魚", furigana: "さかな" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きです。" }],
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
        japanese: [{ text: "今日", furigana: "きょう" }, { text: "はいい" }, { text: "天気", furigana: "てんき" }, { text: "です。" }],
        reading: "Kyou wa ii tenki desu.",
        meaning: "Today, the weather is good. (Topic: Today)"
      },
      {
        japanese: [{ text: "雨", furigana: "あめ" }, { text: "が" }, { text: "降", furigana: "ふ" }, { text: "っています。" }],
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
        japanese: [{ text: "毎日", furigana: "まいにち" }, { text: "、" }, { text: "勉強", furigana: "べんきょう" }, { text: "します。" }],
        reading: "Mainichi, benkyou shimasu.",
        meaning: "I study every day. (Present)"
      },
      {
        japanese: [{ text: "昨日", furigana: "きのう" }, { text: "、" }, { text: "映画", furigana: "えいが" }, { text: "を" }, { text: "見", furigana: "み" }, { text: "ました。" }],
        reading: "Kinou, eiga o mimashita.",
        meaning: "I watched a movie yesterday. (Past)"
      },
      {
        japanese: [{ text: "お" }, { text: "酒", furigana: "さけ" }, { text: "は" }, { text: "飲", furigana: "の" }, { text: "みません。" }],
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
        japanese: [{ text: "これは" }, { text: "私", furigana: "わたし" }, { text: "の" }, { text: "本", furigana: "ほん" }, { text: "です。" }],
        reading: "Kore wa watashi no hon desu.",
        meaning: "This is my book."
      },
      {
        japanese: [{ text: "あれは" }, { text: "山田", furigana: "やまだ" }, { text: "さんの" }, { text: "車", furigana: "くるま" }, { text: "です。" }],
        reading: "Are wa Yamada-san no kuruma desu.",
        meaning: "That is Mr. Yamada's car."
      },
      {
        japanese: [{ text: "日本語", furigana: "にほんご" }, { text: "の" }, { text: "先生", furigana: "せんせい" }],
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
        japanese: [{ text: "このカバンは" }, { text: "大", furigana: "おお" }, { text: "きいです。" }],
        reading: "Kono kaban wa ookii desu.",
        meaning: "This bag is big. (i-adjective)"
      },
      {
        japanese: [{ text: "静", furigana: "しず" }, { text: "かな" }, { text: "図書館", furigana: "としょかん" }],
        reading: "Shizuka na toshokan",
        meaning: "A quiet library. (na-adjective before noun)"
      },
      {
        japanese: [{ text: "この" }, { text: "町", furigana: "まち" }, { text: "は" }, { text: "静", furigana: "しず" }, { text: "かです。" }],
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
        japanese: [{ text: "朝", furigana: "あさ" }, { text: "ごはんを" }, { text: "食", furigana: "た" }, { text: "べて、" }, { text: "学校", furigana: "がっこう" }, { text: "に" }, { text: "行", furigana: "い" }, { text: "きます。" }],
        reading: "Asagohan o tabete, gakkou ni ikimasu.",
        meaning: "I eat breakfast and then go to school."
      },
      {
        japanese: [{ text: "ちょっと" }, { text: "待", furigana: "ま" }, { text: "ってください。" }],
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
        japanese: [{ text: "何", furigana: "なに" }, { text: "をしていますか？" }],
        reading: "Nani o shite imasu ka?",
        meaning: "What are you doing?"
      },
      {
        japanese: [{ text: "音楽", furigana: "おんがく" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "いています。" }],
        reading: "Ongaku o kiite imasu.",
        meaning: "I am listening to music."
      },
      {
        japanese: [{ text: "佐藤", furigana: "さとう" }, { text: "さんは" }, { text: "結婚", furigana: "けっこん" }, { text: "しています。" }],
        reading: "Satou-san wa kekkon shite imasu.",
        meaning: "Mr. Sato is married. (A continuous state)"
      }
    ]
  },
    {
    title: "Making Invitations (〜ませんか vs 〜ましょう)",
    explanation: "To invite someone to do something, you can use 〜ませんか (masen ka?) for a polite suggestion ('Won't you...?') or 〜ましょう (mashou) for a more direct proposal ('Let's...').",
    exampleSentences: [
      {
        japanese: [{ text: "一緒", furigana: "いっしょ" }, { text: "に" }, { text: "映画", furigana: "えいが" }, { text: "を" }, { text: "見", furigana: "み" }, { text: "ませんか？" }],
        reading: "Issho ni eiga o mimasen ka?",
        meaning: "Won't you watch a movie with me?"
      },
      {
        japanese: [{ text: "喫茶店", furigana: "きっさてん" }, { text: "で" }, { text: "話", furigana: "はな" }, { text: "しましょう。" }],
        reading: "Kissaten de hanashimashou.",
        meaning: "Let's talk at the coffee shop."
      }
    ]
  },
  {
    title: "Plain Form (Dictionary Form)",
    explanation: "The plain form, or dictionary form, is the base form of a verb. It's used in casual conversation and in various grammatical structures. For example, the plain form of 食べます (tabemasu) is 食べる (taberu).",
    exampleSentences: [
      {
        japanese: [{ text: "友達", furigana: "ともだち" }, { text: "と" }, { text: "話", furigana: "はな" }, { text: "すのが" }, { text: "好", furigana: "す" }, { text: "きだ。" }],
        reading: "Tomodachi to hanasu no ga suki da.",
        meaning: "I like talking with my friends. (Casual speech)"
      },
      {
        japanese: [{ text: "本", furigana: "ほん" }, { text: "を" }, { text: "読", furigana: "よ" }, { text: "む" }, { text: "時間", furigana: "じかん" }, { text: "がない。" }],
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
        japanese: [{ text: "昨日", furigana: "きのう" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "食", furigana: "た" }, { text: "べた？" }],
        reading: "Kinou, nani o tabeta?",
        meaning: "What did you eat yesterday? (Casual)"
      },
      {
        japanese: [{ text: "日本", furigana: "にほん" }, { text: "に" }, { text: "行", furigana: "い" }, { text: "ったことがある。" }],
        reading: "Nihon ni itta koto ga aru.",
        meaning: "I have been to Japan. (Expressing experience)"
      }
    ]
  },
   {
    title: "Quoting (〜と思います / 〜と言っていました)",
    explanation: "Use 〜と思います (to omoimasu) to express your opinion ('I think...'). Use 〜と言っていました (to itte imashita) to report what someone else said ('...said that...'). Both use the plain form of the verb or adjective before the quote.",
    exampleSentences: [
      {
        japanese: [{ text: "明日", furigana: "あした" }, { text: "は" }, { text: "雨", furigana: "あめ" }, { text: "が" }, { text: "降", furigana: "ふ" }, { text: "ると" }, { text: "思", furigana: "おも" }, { text: "います。" }],
        reading: "Ashita wa ame ga furu to omoimasu.",
        meaning: "I think it will rain tomorrow."
      },
      {
        japanese: [{ text: "田中", furigana: "たなか" }, { text: "さんはパーティーに" }, { text: "来", furigana: "こ" }, { text: "ないと" }, { text: "言", furigana: "い" }, { text: "っていました。" }],
        reading: "Tanaka-san wa paatii ni konai to itte imashita.",
        meaning: "Ms. Tanaka said she isn't coming to the party."
      }
    ]
  },
  {
    title: "Potential Form (Can do)",
    explanation: "The potential form expresses the ability to do something ('can do'). Ru-verbs change the final -ru to -rareru. U-verbs change the final 'u' sound to the 'e' sound and add -ru.",
    exampleSentences: [
      {
        japanese: [{ text: "私", furigana: "わたし" }, { text: "は" }, { text: "漢字", furigana: "かんじ" }, { text: "が" }, { text: "読", furigana: "よ" }, { text: "めます。" }],
        reading: "Watashi wa kanji ga yomemasu.",
        meaning: "I can read kanji. (Polite form)"
      },
      {
        japanese: [{ text: "彼", furigana: "かれ" }, { text: "は" }, { text: "日本語", furigana: "にほんご" }, { text: "を" }, { text: "話", furigana: "はな" }, { text: "せる。" }],
        reading: "Kare wa nihongo o hanaseru.",
        meaning: "He can speak Japanese. (Plain form)"
      },
      {
        japanese: [{ text: "寿司", furigana: "すし" }, { text: "が" }, { text: "食", furigana: "た" }, { text: "べられますか？" }],
        reading: "Sushi ga taberaremasu ka?",
        meaning: "Can you eat sushi?"
      }
    ]
  },
    {
    title: "Comparison (AよりBのほうが...)",
    explanation: "To compare two items, use the structure 'A yori B no hou ga...' which means 'B is more ... than A'. The adjective comes after 'hou ga'.",
    exampleSentences: [
      {
        japanese: [{ text: "バスより" }, { text: "電車", furigana: "でんしゃ" }, { text: "の" }, { text: "方", furigana: "ほう" }, { text: "が" }, { text: "速", furigana: "はや" }, { text: "いです。" }],
        reading: "Basu yori densha no hou ga hayai desu.",
        meaning: "The train is faster than the bus."
      },
      {
        japanese: [{ text: "犬", furigana: "いぬ" }, { text: "と" }, { text: "猫", furigana: "ねこ" }, { text: "とどちらの" }, { text: "方", furigana: "ほう" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか？" }],
        reading: "Inu to neko to dochira no hou ga suki desu ka?",
        meaning: "Which do you like more, dogs or cats?"
      }
    ]
  },
  {
    title: "Giving Reasons (から and ので)",
    explanation: "から (kara) and ので (node) are both used to mean 'because' or 'so'. から is more common and can be used in a wide range of situations. ので is slightly more formal and implies a softer, more logical cause-and-effect relationship.",
    exampleSentences: [
      {
        japanese: [{ text: "時間", furigana: "じかん" }, { text: "がないから、" }, { text: "急", furigana: "いそ" }, { text: "ぎましょう。" }],
        reading: "Jikan ga nai kara, isogimashou.",
        meaning: "Because there's no time, let's hurry."
      },
      {
        japanese: [{ text: "雨", furigana: "あめ" }, { text: "が" }, { text: "降", furigana: "ふ" }, { text: "っているので、" }, { text: "傘", furigana: "かさ" }, { text: "を" }, { text: "持", furigana: "も" }, { text: "っていきます。" }],
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
        japanese: [{ text: "もっと" }, { text: "野菜", furigana: "やさい" }, { text: "を" }, { text: "食", furigana: "た" }, { text: "べた" }, { text: "方", furigana: "ほう" }, { text: "がいいですよ。" }],
        reading: "Motto yasai o tabeta hou ga ii desu yo.",
        meaning: "You should eat more vegetables."
      },
      {
        japanese: [{ text: "夜", furigana: "よる" }, { text: "遅", furigana: "おそ" }, { text: "くまで" }, { text: "起", furigana: "お" }, { text: "きない" }, { text: "方", furigana: "ほう" }, { text: "がいいです。" }],
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
        japanese: [{ text: "宿題", furigana: "しゅくだい" }, { text: "をしなければなりません。" }],
        reading: "Shukudai o shinakereba narimasen.",
        meaning: "I must do my homework."
      },
      {
        japanese: [{ text: "明日", furigana: "あした" }, { text: "、" }, { text: "早", furigana: "はや" }, { text: "く" }, { text: "起", furigana: "お" }, { text: "きなければならない。" }],
        reading: "Ashita, hayaku okinakereba naranai.",
        meaning: "I have to get up early tomorrow. (Casual form)"
      }
    ]
  },
  {
    title: "Volitional Form (しよう / しましょう)",
    explanation: "The volitional form expresses intention ('Let's do...' or 'I'll do...'). The plain form (e.g., 行こう - ikou, 'let's go') is casual, while the polite form ends in 〜ましょう (mashou), which we've seen in invitations.",
    exampleSentences: [
      {
        japanese: [{ text: "週末", furigana: "しゅうまつ" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "をしようか？" }],
        reading: "Shuumatsu, nani o shiyou ka?",
        meaning: "What should we do this weekend? (Casual)"
      },
      {
        japanese: [{ text: "日本", furigana: "にほん" }, { text: "に" }, { text: "行", furigana: "い" }, { text: "こうと" }, { text: "思", furigana: "おも" }, { text: "っています。" }],
        reading: "Nihon ni ikou to omotte imasu.",
        meaning: "I am thinking of going to Japan."
      }
    ]
  }
];

export function GrammarLessonsList({ onSelectLesson }: GrammarLessonsListProps) {
  return (
    <div className="space-y-2 p-4">
      {grammarLessons.map((lesson, index) => (
        <button
          key={index}
          onClick={() => onSelectLesson(lesson)}
          className="flex items-center justify-between w-full p-4 rounded-lg bg-card hover:bg-muted transition-colors text-left"
        >
          <span className="flex-1 pr-4">{lesson.title}</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
        </button>
      ))}
    </div>
  );
}
