
import type { GrammarLesson } from "@/lib/types";

export const grammarLessons: GrammarLesson[] = [
  {
    title: "Basic Sentence Structure (SOV)",
    explanation: "Japanese sentence structure is typically Subject-Object-Verb (SOV). This is different from English's Subject-Verb-Object (SVO) structure. The particle 'は' (wa) often marks the topic of the sentence, and 'を' (o) marks the direct object.",
    exampleSentences: [
      {
        japanese: "私は寿司を食べます。",
        reading: "わたしはすしをたべます。",
        meaning: "I eat sushi."
      },
      {
        japanese: "猫は魚が好きです。",
        reading: "ねこはさかながすきです。",
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
        reading: "きょうはいいてんきです。",
        meaning: "Today, the weather is good. (Topic: Today)"
      },
      {
        japanese: "雨が降っています。",
        reading: "あめがふっています。",
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
        reading: "まいにち、べんきょうします。",
        meaning: "I study every day. (Present)"
      },
      {
        japanese: "昨日、映画を見ました。",
        reading: "きのう、えいがをみました。",
        meaning: "I watched a movie yesterday. (Past)"
      },
      {
        japanese: "お酒は飲みません。",
        reading: "おさけはのみません。",
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
        reading: "これはわたしのほんです。",
        meaning: "This is my book."
      },
      {
        japanese: "あれは山田さんの車です。",
        reading: "あれはまださんのくるまです。",
        meaning: "That is Mr. Yamada's car."
      },
      {
        japanese: "日本語の先生",
        reading: "にほんごのせんせい",
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
        reading: "このかばんはおおきいです。",
        meaning: "This bag is big. (i-adjective)"
      },
      {
        japanese: "静かな図書館",
        reading: "しずかなとしょかん",
        meaning: "A quiet library. (na-adjective before noun)"
      },
      {
        japanese: "この町は静かです。",
        reading: "このまちはしずかです。",
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
        reading: "あさごはんをたべて、がっこうにいきます。",
        meaning: "I eat breakfast and then go to school."
      },
      {
        japanese: "ちょっと待ってください。",
        reading: "ちょっとまってください。",
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
        reading: "なにをしていますか？",
        meaning: "What are you doing?"
      },
      {
        japanese: "音楽を聞いています。",
        reading: "おんがくをきいています。",
        meaning: "I am listening to music."
      },
      {
        japanese: "佐藤さんは結婚しています。",
        reading: "さとうさんはけっこんしています。",
        meaning: "Mr. Sato is married. (A continuous state)"
      }
    ]
  },
    {
    title: "Making Invitations (〜ませんか vs 〜ましょう)",
    explanation: "To invite someone to do something, you can use 〜ませんか (masen ka?) for a polite suggestion ('Won't you...?') or 〜ましょう (mashou) for a more direct proposal ('Let's...').",
    exampleSentences: [
      {
        japanese: "一緒に映画を見ませんか？",
        reading: "いっしょにえいがをみませんか？",
        meaning: "Won't you watch a movie with me?"
      },
      {
        japanese: "喫茶店で話しましょう。",
        reading: "きっさてんで話しましょう。",
        meaning: "Let's talk at the coffee shop."
      }
    ]
  },
  {
    title: "Plain Form (Dictionary Form)",
    explanation: "The plain form, or dictionary form, is the base form of a verb. It's used in casual conversation and in various grammatical structures. For example, the plain form of 食べます (tabemasu) is 食べる (taberu).",
    exampleSentences: [
      {
        japanese: "友達と話すのが好きだ。",
        reading: "ともだちと話すのがすきだ。",
        meaning: "I like talking with my friends. (Casual speech)"
      },
      {
        japanese: "本を読む時間がない。",
        reading: "ほんをよむじかんがない。",
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
        reading: "きのう、なにをたべた？",
        meaning: "What did you eat yesterday? (Casual)"
      },
      {
        japanese: "日本に行ったことがある。",
        reading: "にほんにいったことがある。",
        meaning: "I have been to Japan. (Expressing experience)"
      }
    ]
  },
   {
    title: "Quoting (〜と思います / 〜と言っていました)",
    explanation: "Use 〜と思います (to omoimasu) to express your opinion ('I think...'). Use 〜と言っていました (to itte imashita) to report what someone else said ('...said that...'). Both use the plain form of the verb or adjective before the quote.",
    exampleSentences: [
      {
        japanese: "明日は雨が降ると思います。",
        reading: "あしたはあめがふるとおもいます。",
        meaning: "I think it will rain tomorrow."
      },
      {
        japanese: "田中さんはパーティーに来ないと言っていました。",
        reading: "たなかさんはパーティーにこないといっていました。",
        meaning: "Ms. Tanaka said she isn't coming to the party."
      }
    ]
  },
  {
    title: "Potential Form (Can do)",
    explanation: "The potential form expresses the ability to do something ('can do'). Ru-verbs change the final -ru to -rareru. U-verbs change the final 'u' sound to the 'e' sound and add -ru.",
    exampleSentences: [
      {
        japanese: "私は漢字が読めます。",
        reading: "わたしはかんじがよめます。",
        meaning: "I can read kanji. (Polite form)"
      },
      {
        japanese: "彼は日本語を話せる。",
        reading: "かれはにほんごをはなせる。",
        meaning: "He can speak Japanese. (Plain form)"
      },
      {
        japanese: "寿司が食べられますか？",
        reading: "すしがたべられますか？",
        meaning: "Can you eat sushi?"
      }
    ]
  },
    {
    title: "Comparison (AよりBのほうが...)",
    explanation: "To compare two items, use the structure 'A yori B no hou ga...' which means 'B is more ... than A'. The adjective comes after 'hou ga'.",
    exampleSentences: [
      {
        japanese: "バスより電車の方が速いです。",
        reading: "ばすよりでんしゃのほうがはやいです。",
        meaning: "The train is faster than the bus."
      },
      {
        japanese: "犬と猫とどちらの方が好きですか？",
        reading: "いぬとねことどちらのほうがすきですか？",
        meaning: "Which do you like more, dogs or cats?"
      }
    ]
  },
  {
    title: "Giving Reasons (から and ので)",
    explanation: "から (kara) and ので (node) are both used to mean 'because' or 'so'. から is more common and can be used in a wide range of situations. ので is slightly more formal and implies a softer, more logical cause-and-effect relationship.",
    exampleSentences: [
      {
        japanese: "時間がないから、急ぎましょう。",
        reading: "じかんがないから、いそぎましょう。",
        meaning: "Because there's no time, let's hurry."
      },
      {
        japanese: "雨が降っているので、傘を持っていきます。",
        reading: "あめがふっているので、かさをもっていきます。",
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
        reading: "もっとやさいをたべたほうがいいですよ。",
        meaning: "You should eat more vegetables."
      },
      {
        japanese: "夜遅くまで起きない方がいいです。",
        reading: "よるおそくまでおきないほうがいいです。",
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
        reading: "しゅくだいをしなければなりません。",
        meaning: "I must do my homework."
      },
      {
        japanese: "明日、早く起きなければならない。",
        reading: "あした、はやくおきなければならない。",
        meaning: "I have to get up early tomorrow. (Casual form)"
      }
    ]
  },
  {
    title: "Volitional Form (しよう / しましょう)",
    explanation: "The volitional form expresses intention ('Let's do...' or 'I'll do...'). The plain form (e.g., 行こう - ikou, 'let's go') is casual, while the polite form ends in 〜ましょう (mashou), which we've seen in invitations.",
    exampleSentences: [
      {
        japanese: "週末、何をしようか？",
        reading: "しゅうまつ、なにをしようか？",
        meaning: "What should we do this weekend? (Casual)"
      },
      {
        japanese: "日本に行こうと思っています。",
        reading: "にほんにいこうとおもっています。",
        meaning: "I am thinking of going to Japan."
      }
    ]
  }
];
