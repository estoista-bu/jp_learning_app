
import type { Quiz } from "@/lib/types";

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Quiz 1: Core Concepts",
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
      },
       {
        question: "When describing an action in progress, like 'I am studying', which verb form is used?",
        options: ["Te-form + います", "Dictionary Form", "Ta-form", "Nai-form"],
        optionsReading: ["てけい + います", "じしょけい", "たけい", "ないけい"],
        correctAnswer: "Te-form + います",
        explanation: "The Te-form + います structure is used to express the present progressive tense, similar to '-ing' in English.",
      },
      {
        question: "What is the plain form (dictionary form) of the verb '食べます'?",
        options: ["食べた", "食べない", "食べる", "食べて"],
        optionsReading: ["たべた", "たべない", "たべる", "たべて"],
        correctAnswer: "食べる",
        explanation: "The dictionary form is the base form of the verb. For ru-verbs like 食べます, you replace -masu with -ru.",
      },
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
        question: "What is the function of the particle 'を'?",
        options: ["Indicates location", "Marks the direct object", "Shows possession", "Marks the subject"],
        correctAnswer: "Marks the direct object",
        explanation: "The particle 'を' is used to mark the direct object of a verb. For example, in 'パンを食べます', 'パン' is the direct object.",
        explanationReading: "じょし「を」は、どうしのちょくせつもくてきごをしめすためにちかわれます。たとえば、「パンをたべます」では、「パン」がちょくせつもくてきごです。"
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Quiz 2: Particles & Tense",
    questions: [
       {
        question: "Which particle marks the specific subject, often for new or emphasized information?",
        options: ["が", "を", "は", "に"],
        correctAnswer: "が",
        explanation: "While は marks the topic, が marks the subject, often to introduce new information or for emphasis.",
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
        question: "Which of the following is a 'na-adjective'?",
        options: ["新しい", "面白い", "静か", "高い"],
        optionsReading: ["あたらしい", "おもしろい", "しずか", "たかい"],
        correctAnswer: "静か",
        explanation: "'Na-adjectives' do not end in 'い' and require 'な' when they come before a noun (e.g., 静かな部屋).",
      },
       {
        question: "How do you say 'Mr. Sato is married.' to describe a continuous state?",
        options: ["佐藤さんは結婚します", "佐藤さんは結婚しました", "佐藤さんは結婚しています", "佐藤さんは結婚しません"],
        optionsReading: ["さとうさんはけっこんします", "さとうさんはけっこんしました", "さとうさんはけっこんしています", "さとうさんはけっこんしません"],
        correctAnswer: "佐藤さんは結婚しています",
        explanation: "The 'te-form + います' structure is used not only for actions in progress but also to describe a continuous state, like being married.",
      },
      {
        question: "What is the polite past negative of '飲みます'?",
        options: ["飲みません", "飲みました", "飲みませんでした", "飲まなかった"],
        optionsReading: ["のみません", "のみました", "のみませんでした", "のまなかった"],
        correctAnswer: "飲みませんでした",
        explanation: "The polite past negative is formed by using the '-masen' form and adding 'deshita'.",
      },
      {
        question: "To connect two actions, 'I eat breakfast and then go to school,' what form is used for 'eat'?",
        options: ["Te-form", "Dictionary form", "Masu-form", "Ta-form"],
        optionsReading: ["てけい", "じしょけい", "ますけい", "たけい"],
        correctAnswer: "Te-form",
        explanation: "The te-form is used to link successive actions. '朝ごはんを食べて、学校に行きます。'",
        explanationReading: "てけいは、れんぞくするこうどうをつなぐためにちかわれます。「あさごはんをたべて、がっこうにいきます。」"
      },
      {
        question: "How do you say 'quiet library' using a na-adjective?",
        options: ["静か図書館", "静かな図書館", "静かい図書館", "静かで図書館"],
        optionsReading: ["しずかとしょかん", "しずかなとしょかん", "しずかいとしょかん", "しずかでとしょかん"],
        correctAnswer: "静かな図書館",
        explanation: "When a na-adjective comes directly before a noun, you must add な between them.",
      },
      {
        question: "What does '〜ませんか' express?",
        options: ["A direct command", "A question about ability", "A polite invitation", "A statement of fact"],
        correctAnswer: "A polite invitation",
        explanation: "'〜ませんか' (e.g., '行きませんか?') is a gentle and polite way to invite someone to do something.",
        explanationReading: "「〜ませんか」（れい：「いきませんか？」）は、だれかをなにかをするようにさそう、ていねいでやさしいほうほうです。"
      },
       {
        question: "What is the opposite of '大きいです'?",
        options: ["大きくないです", "大きいじゃないです", "大きではありません", "Both A and B"],
        optionsReading: ["おおきくないです", "おおきいじゃないです", "おおきではありません", ""],
        correctAnswer: "大きくないです",
        explanation: "To make an i-adjective negative, you change the final 'い' to 'くないです'.",
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Quiz 3: Plain & Potential Forms",
    questions: [
      {
        question: "What is the plain past tense (ta-form) of the verb '飲みます'?",
        options: ["飲んで", "飲んだ", "飲む", "飲まない"],
        optionsReading: ["のんで", "のんだ", "のむ", "のまない"],
        correctAnswer: "飲んだ",
        explanation: "For u-verbs ending in -mimasu, the te-form is -nde (飲んで) and the ta-form is -nda (飲んだ).",
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
        question: "When reporting what someone else said, you use '〜と言っていました'. What form of the verb/adjective comes before it?",
        options: ["Masu-form", "Te-form", "Nai-form", "Plain Form"],
        optionsReading: ["ますけい", "てけい", "ないけい", "ふつうけい"],
        correctAnswer: "Plain Form",
        explanation: "When quoting someone, you use the plain form of the verb or adjective before 'と言っていました'.",
      },
      {
        question: "What is the plain negative form of '行きます'?",
        options: ["行かない", "行くない", "行いません", "行けない"],
        optionsReading: ["いかない", "いくない", "いきません", "いけない"],
        correctAnswer: "行かない",
        explanation: "The plain negative (nai-form) of the u-verb '行きます' is '行かない'.",
      },
      {
        question: "The structure '〜ことがあります' is used to express:",
        options: ["Obligation", "Experience", "Desire", "Ability"],
        optionsReading: ["ぎむ", "けいけん", "がんぼう", "のうりょく"],
        correctAnswer: "Experience",
        explanation: "The 'ta-form + ことがあります' pattern is used to talk about things you have experienced.",
      },
      {
        question: "What is the potential form of the u-verb '泳ぎます'?",
        options: ["泳げます", "泳ぎられます", "泳がせます", "泳ぎたいです"],
        optionsReading: ["およげます", "およぎられます", "およがせます", "およぎたいです"],
        correctAnswer: "泳げます",
        explanation: "For u-verbs, the potential form is made by changing the final 'i' vowel sound of the stem to 'e'. So, 'oyogi' becomes 'oyoge'.",
      },
      {
        question: "Which particle is often used with the potential form to mark the object?",
        options: ["を", "が", "は", "で"],
        correctAnswer: "が",
        explanation: "While 'を' is not wrong, it's very common to use 'が' to mark the object of a potential verb.",
      },
      {
        question: "How do you say 'I like to read books' in casual speech?",
        options: ["本を読むのが好きです", "本を読みますのが好きだ", "本を読むのが好きだ", "本を読んでのが好きだ"],
        optionsReading: ["ほんをよむのがすきです", "ほんをよみますのがすきだ", "ほんをよむのがすきだ", "ほんをよんでのがすきだ"],
        correctAnswer: "本を読むのが好きだ",
        explanation: "In this structure, the plain form '読む' is used to nominalize the verb, and the sentence ends with the plain copula 'だ'.",
      },
      {
        question: "What is the plain past negative of '見ます'?",
        options: ["見ませんでした", "見なかった", "見ないでした", "見えなかった"],
        optionsReading: ["みませんでした", "みなかった", "みないでした", "みえなかった"],
        correctAnswer: "見なかった",
        explanation: "The plain past negative is formed from the nai-form. '見ない' becomes '見なかった' by replacing the final 'い' with 'かった'.",
      }
    ]
  },
  {
    id: "quiz-4",
    title: "Quiz 4: Intermediate Structures",
    questions: [
      {
        question: "How do you form a polite invitation? 'Won't you go to the movies together?'",
        options: [
          "一緒に映画に行きましょう",
          "一緒に映画に行きませんか",
          "一緒に映画に行きたい",
          "一緒に映画に行く"
        ],
        optionsReading: [
            "いっしょにえいがにいきましょう",
            "いっしょにえいがにいきませんか",
            "いっしょにえいがにいきたい",
            "いっしょにえいがにいく"
        ],
        correctAnswer: "一緒に映画に行きませんか",
        explanation: "The 'masen ka' form is a common and polite way to invite someone to do something.",
      },
      {
        question: "Which sentence correctly uses 'から' to give a reason?",
        options: [
          "急ぎますから、時間がない",
          "時間がないから、急ぎます",
          "から時間がない、急ぎます",
          "急ぎます、時間がないから"
        ],
        optionsReading: [
            "いそぎますから、じかんがない",
            "じかんがないから、いそぎます",
            "からじかんがない、いそぎます",
            "いそぎます、じかんがないから"
        ],
        correctAnswer: "時間がないから、急ぎます",
        explanation: "'から' follows the clause that states the reason. 'Because there's no time, I'll hurry.'",
      },
      {
        question: "What is the correct way to express obligation? 'I must study.'",
        options: [
          "勉強すると思います",
          "勉強したいです",
          "勉強しなければなりません",
          "勉強できます"
        ],
        optionsReading: [
            "べんきょうするとおもいます",
            "べんきょうしたいです",
            "べんきょうしなければなりません",
            "べんきょうできます"
        ],
        correctAnswer: "勉強しなければなりません",
        explanation: "The 'nakereba narimasen' pattern is used to express that something must be done. It's formed from the verb's negative 'nai' form.",
      },
      {
        question: "Choose the correct comparison: 'The train is faster than the bus.'",
        options: [
          "電車はバスの方が速いです",
          "バスは電車より速いです",
          "バスより電車の方が速いです",
          "電車とバスは速いです"
        ],
        optionsReading: [
            "でんしゃはバスのほうがはやいです",
            "バスはでんしゃよりはやいです",
            "バスよりでんしゃのほうがはやいです",
            "でんしゃとバスははやいです"
        ],
        correctAnswer: "バスより電車の方が速いです",
        explanation: "The structure 'A yori B no hou ga...' means 'B is more... than A'. Here, the train (B) is faster than the bus (A).",
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
      },
      {
        question: "What does the volitional form '行こう' mean?",
        options: ["I want to go", "I can go", "I must go", "Let's go / I'll go"],
        optionsReading: ["いきたい", "いける", "いかなければならない", "いこう / いくぞ"],
        correctAnswer: "Let's go / I'll go",
        explanation: "The volitional form expresses intention or suggestion. '行こう' is the plain/casual version of '行きましょう'.",
      },
      {
        question: "Which particle is used to mean 'because', but is slightly more formal and logical than 'から'?",
        options: ["ので", "でも", "し", "が"],
        correctAnswer: "ので",
        explanation: "'ので' is used to give reasons, similar to 'から', but it often implies a more objective cause-and-effect relationship and is slightly more formal.",
      },
      {
        question: "The structure 'AとBとどちらの方が好きですか' is used to ask...?",
        options: ["Which is more expensive, A or B?", "Which do you like more, A or B?", "Where are A and B?", "What are A and B?"],
        correctAnswer: "Which do you like more, A or B?",
        explanation: "This is a standard pattern for asking someone to compare two items and state their preference.",
      },
      {
        question: "How do you use the volitional form with 'と思っています' to express a long-held intention?",
        options: [
          "日本に行きたいと思います",
          "日本に行こうと思っています",
          "日本に行くと思っています",
          "日本に行きましたと思っています"
        ],
        optionsReading: [
            "にほんにいきたいとおもいます",
            "にほんにいこうとおもっています",
            "にほんにいくとおもっています",
            "にほんにいきましたとおもっています"
        ],
        correctAnswer: "日本に行こうと思っています",
        explanation: "Using the volitional form + 'と思っています' implies that you've been thinking about doing something for a while.",
      },
      {
        question: "What is a more casual way to say '〜なければなりません' (must do)?",
        options: ["〜なくてもいい", "〜ないでください", "〜なきゃ / 〜ないと", "〜たいです"],
        optionsReading: ["〜なくてもいい", "〜ないでください", "〜なきゃ / 〜ないと", "〜たいです"],
        correctAnswer: "〜なきゃ / 〜ないと",
        explanation: "The '〜なきゃ' (a contraction of 'nakereba') and '〜ないと' (literally 'if I don't...') are common casual equivalents for expressing obligation.",
      }
    ]
  },
  {
    id: "quiz-5",
    title: "Quiz 5: Comprehensive Review",
    questions: [
      {
        question: "Choose the correct particles for: '私は１０時＿図書館＿行きます'",
        questionReading: "わたしは１０じ＿としょかん＿いきます",
        options: ["に、へ", "で、に", "へ、に", "に、に"],
        correctAnswer: "に、に",
        explanation: "The particle 'に' is used to mark a specific point in time (１０時に) and can also mark the destination/direction of movement (図書館に). 'へ' is also acceptable for destination but 'に' works for both here.",
      },
      {
        question: "How would you combine these sentences using the te-form? 'I will buy a ticket. I will see a movie.'",
        options: [
          "切符を買って、映画を見ます",
          "切符を買うから、映画を見ます",
          "切符を買うし、映画を見ます",
          "切符を買う時、映画を見ます"
        ],
        optionsReading: [
            "きっぷをかって、えいがをみます",
            "きっぷをかうから、えいがをみます",
            "きっぷをかうとき、えいがをみます"
        ],
        correctAnswer: "切符を買って、映画を見ます",
        explanation: "The te-form is the standard way to connect a sequence of actions.",
      },
      {
        question: "What is the plain form of the na-adjective '静か' in the past tense?",
        options: ["静かでした", "静かだった", "静かくなかった", "静かじゃなかった"],
        optionsReading: ["しずかでした", "しずかだった", "しずかくなかった", "しずかじゃなかった"],
        correctAnswer: "静かだった",
        explanation: "The plain past tense of a na-adjective is formed by adding 'だった'.",
      },
      {
        question: "How do you ask for permission using the te-form? 'May I take a photo?'",
        options: [
          "写真を撮ってもいいですか",
          "写真を撮らなければなりません",
          "写真を撮るそうです",
          "写真を撮ってください"
        ],
        optionsReading: [
            "しゃしんをとってもいいですか",
            "しゃしんをとらなければなりません",
            "しゃしんをとるそうです",
            "しゃしんをとってください"
        ],
        correctAnswer: "写真を撮ってもいいですか",
        explanation: "The structure '(Verb, te-form) + もいいですか' is used to politely ask for permission.",
      },
      {
        question: "What is the plain negative form of the i-adjective '楽しい'?",
        options: ["楽しくない", "楽しいじゃない", "楽しない", "楽しではありません"],
        optionsReading: ["たのしくない", "たのしいじゃない", "たのしくない", "たのしいではありません"],
        correctAnswer: "楽しくない",
        explanation: "To make an i-adjective plain negative, you replace the final 'い' with 'くない'.",
      },
      {
        question: "How do you express a desire to do something, e.g., 'I want to drink water.'?",
        options: ["水が飲めます", "水を飲みます", "水が飲みたいです", "水を飲もう"],
        optionsReading: ["みずがのめます", "みずをのみます", "みずがのみたいです", "みずをのもう"],
        correctAnswer: "水が飲みたいです",
        explanation: "To express desire, you change the 'ます' from the verb stem to 'たいです'. '飲みます' becomes '飲みたいです'.",
      },
      {
        question: "Which of these sentences means 'You must not enter'?",
        options: ["入らなくてもいいです", "入ってはいけません", "入ることができます", "入らないでください"],
        optionsReading: ["はいらなくてもいいです", "はいってはいけません", "はいることができます", "はいらないでください"],
        correctAnswer: "入ってはいけません",
        explanation: "The structure '(Verb, te-form) + はいけません' is a strong way to express prohibition.",
      },
       {
        question: "What is the correct potential form for the irregular verb '来ます'?",
        options: ["来れます", "来られます", "来させます", "来ますことができます"],
        optionsReading: ["これます", "こられます", "こさせます", "きますことができます"],
        correctAnswer: "来られます",
        explanation: "'来ます' is an irregular verb. Its potential form is '来られます'.",
      },
      {
        question: "Which is a casual way to say 'Let's eat'?",
        options: ["食べましょう", "食べませんか", "食べよう", "食べたい"],
        optionsReading: ["たべましょう", "たべませんか", "たべよう", "たべたい"],
        correctAnswer: "食べよう",
        explanation: "'食べよう' is the plain volitional form of '食べます' and is used in casual situations to mean 'Let's eat'.",
      },
      {
        question: "Which sentence means 'Because it was expensive, I didn't buy it'?",
        options: [
          "高かったから、買いませんでした",
          "高いから、買いませんでした",
          "高くて、買いませんでした",
          "高いので、買いませんでした"
        ],
        optionsReading: [
            "たかかったから、かいませんでした",
            "たかいから、かいませんでした",
            "たかくて、かいませんでした",
            "たかいので、かいませんでした"
        ],
        correctAnswer: "高かったから、買いませんでした",
        explanation: "Since the reason ('it was expensive') is in the past, the past tense of the i-adjective ('高かった') should be used before 'から'.",
      }
    ]
  }
];

    