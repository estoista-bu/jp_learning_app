
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
        question: "Select the correct particle for possession: 'これは私___本です' (Kore wa watashi ___ hon desu).",
        options: ["は (wa)", "が (ga)", "を (o)", "の (no)"],
        correctAnswer: "の (no)",
        explanation: "The particle の (no) is used to show possession, like 's in English. '私の本' means 'my book'."
      },
      {
        question: "Which of the following is an 'i-adjective'?",
        options: ["静か (shizuka - quiet)", "大きい (ookii - big)", "きれい (kirei - beautiful)", "有名 (yuumei - famous)"],
        correctAnswer: "大きい (ookii - big)",
        explanation: "i-adjectives, in their dictionary form, end with the hiragana character い (i). 大きい (ookii) is a classic example."
      },
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
        explanation: "The Te-form + います (imasu) structure is used to express the present progressive tense, similar to '-ing' in English."
      },
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
      },
      {
        question: "What is the function of the particle 'を' (o)?",
        options: ["Indicates location", "Marks the direct object", "Shows possession", "Marks the subject"],
        correctAnswer: "Marks the direct object",
        explanation: "The particle 'を' (o) is used to mark the direct object of a verb. For example, in 'パンを食べます' (pan o tabemasu - I eat bread), 'パン' (bread) is the direct object."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Quiz 2: Particles & Tense",
    questions: [
       {
        question: "Which particle marks the specific subject, often for new or emphasized information?",
        options: ["が (ga)", "を (o)", "は (wa)", "に (ni)"],
        correctAnswer: "が (ga)",
        explanation: "While は (wa) marks the topic, が (ga) marks the subject, often to introduce new information or for emphasis."
      },
      {
        question: "How do you say 'I will not eat' in polite form?",
        options: [
            "食べます (tabemasu)",
            "食べません (tabemasen)",
            "食べました (tabemashita)",
            "食べませんでした (tabemasen deshita)"
        ],
        correctAnswer: "食べません (tabemasen)",
        explanation: "The polite negative present/future tense is formed by changing the '-masu' ending to '-masen'."
      },
      {
        question: "What is the te-form of the verb '待ちます' (machimasu - to wait)?",
        options: ["待って (matte)", "待ちて (machite)", "待んで (mande)", "まて (mate)"],
        correctAnswer: "待って (matte)",
        explanation: "For u-verbs ending in -chimasu, the te-form is created by replacing 'chimasu' with 'tte'."
      },
      {
        question: "Which of the following is a 'na-adjective'?",
        options: ["新しい (atarashii - new)", "面白い (omoshiroi - interesting)", "静か (shizuka - quiet)", "高い (takai - expensive/high)"],
        correctAnswer: "静か (shizuka - quiet)",
        explanation: "'Na-adjectives' do not end in 'い' and require 'な' when they come before a noun (e.g., 静かな部屋 - shizuka na heya, 'a quiet room')."
      },
       {
        question: "How do you say 'Mr. Sato is married.' to describe a continuous state?",
        options: ["佐藤さんは結婚します (Satou-san wa kekkon shimasu)", "佐藤さんは結婚しました (Satou-san wa kekkon shimashita)", "佐藤さんは結婚しています (Satou-san wa kekkon shite imasu)", "佐藤さんは結婚しません (Satou-san wa kekkon shimasen)"],
        correctAnswer: "佐藤さんは結婚しています (Satou-san wa kekkon shite imasu)",
        explanation: "The 'te-form + います' structure is used not only for actions in progress but also to describe a continuous state, like being married."
      },
      {
        question: "What is the polite past negative of '飲みます' (nomimasu - to drink)?",
        options: ["飲みません (nomimasen)", "飲みました (nomimashita)", "飲みませんでした (nomimasen deshita)", "飲まなかった (nomanakatta)"],
        correctAnswer: "飲みませんでした (nomimasen deshita)",
        explanation: "The polite past negative is formed by using the '-masen' form and adding 'deshita'."
      },
      {
        question: "To connect two actions, 'I eat breakfast and then go to school,' what form is used for 'eat'?",
        options: ["Te-form (食べて)", "Dictionary form (食べる)", "Masu-form (食べます)", "Ta-form (食べた)"],
        correctAnswer: "Te-form (食べて)",
        explanation: "The te-form is used to link successive actions. '朝ごはんを食べて、学校に行きます。'"
      },
      {
        question: "How do you say 'quiet library' using a na-adjective?",
        options: ["静か図書館 (shizuka toshokan)", "静かな図書館 (shizuka na toshokan)", "静かい図書館 (shizukai toshokan)", "静かで図書館 (shizuka de toshokan)"],
        correctAnswer: "静かな図書館 (shizuka na toshokan)",
        explanation: "When a na-adjective comes directly before a noun, you must add な (na) between them."
      },
      {
        question: "What does '〜ませんか' (masen ka) express?",
        options: ["A direct command", "A question about ability", "A polite invitation", "A statement of fact"],
        correctAnswer: "A polite invitation",
        explanation: "'〜ませんか' (e.g., '行きませんか?' - Won't you go?) is a gentle and polite way to invite someone to do something."
      },
       {
        question: "What is the opposite of '大きいです' (ookii desu - it is big)?",
        options: ["大きくないです (ookikunai desu)", "大きいじゃないです (ookii janai desu)", "大きではありません (ooki dewa arimasen)", "Both A and B"],
        correctAnswer: "大きくないです (ookikunai desu)",
        explanation: "To make an i-adjective negative, you change the final 'い' to 'くないです'. While 'くありません' is also correct and more formal, 'くないです' is the most direct counterpart. 'じゃないです' is used for nouns and na-adjectives."
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Quiz 3: Plain & Potential Forms",
    questions: [
      {
        question: "What is the plain past tense (ta-form) of the verb '飲みます' (nomimasu)?",
        options: ["飲んで (nonde)", "飲んだ (nonda)", "飲む (nomu)", "飲まない (nomanai)"],
        correctAnswer: "飲んだ (nonda)",
        explanation: "For u-verbs ending in -mimasu, the te-form is -nde (飲んで) and the ta-form is -nda (飲んだ)."
      },
      {
        question: "Which of the following means 'I think it will rain'?",
        options: ["雨が降ると思います (Ame ga furu to omoimasu)", "雨が降ると言いました (Ame ga furu to iimashita)", "雨が降るでしょう (Ame ga furu deshou)", "雨が降るそうです (Ame ga furu sou desu)"],
        correctAnswer: "雨が降ると思います (Ame ga furu to omoimasu)",
        explanation: "To express your own opinion ('I think...'), you use the plain form of a verb followed by 'と思います' (to omoimasu)."
      },
      {
        question: "How do you correctly say 'I cannot eat sushi' in the potential form?",
        options: ["寿司を食べません (Sushi o tabemasen)", "寿司を食べられません (Sushi o taberaremasen)", "寿司を食べたくない (Sushi o tabetakunai)", "寿司を食べませんです (Sushi o tabemasen desu)"],
        correctAnswer: "寿司を食べられません (Sushi o taberaremasen)",
        explanation: "The potential form of the ru-verb '食べる' is '食べられる'. The polite negative is '食べられません'."
      },
       {
        question: "When reporting what someone else said, you use '〜と言っていました'. What form of the verb/adjective comes before it?",
        options: ["Masu-form", "Te-form", "Nai-form", "Plain Form"],
        correctAnswer: "Plain Form",
        explanation: "When quoting someone, you use the plain form of the verb or adjective before 'と言っていました'. For example, '彼は来ないと言っていました' (He said he isn't coming)."
      },
      {
        question: "What is the plain negative form of '行きます' (ikimasu)?",
        options: ["行かない (ikanai)", "行くない (ikunai)", "行いません (ikimasen)", "行けない (ikenai)"],
        correctAnswer: "行かない (ikanai)",
        explanation: "The plain negative (nai-form) of the u-verb '行きます' is '行かない'."
      },
      {
        question: "The structure '〜ことがあります' is used to express:",
        options: ["Obligation", "Experience", "Desire", "Ability"],
        correctAnswer: "Experience",
        explanation: "The 'ta-form + ことがあります' pattern is used to talk about things you have experienced. For example, '日本に行ったことがあります' (I have been to Japan)."
      },
      {
        question: "What is the potential form of the u-verb '泳ぎます' (oyogimasu - to swim)?",
        options: ["泳げます (oyogemasu)", "泳ぎられます (oyogiraremasu)", "泳がせます (oyogasemasu)", "泳ぎたいです (oyogitai desu)"],
        correctAnswer: "泳げます (oyogemasu)",
        explanation: "For u-verbs, the potential form is made by changing the final 'i' vowel sound of the stem to 'e'. So, 'oyogi' becomes 'oyoge'."
      },
      {
        question: "Which particle is often used with the potential form to mark the object?",
        options: ["を (o)", "が (ga)", "は (wa)", "で (de)"],
        correctAnswer: "が (ga)",
        explanation: "While 'を' (o) is not wrong, it's very common to use 'が' (ga) to mark the object of a potential verb. E.g., '日本語が話せます' (Nihongo ga hanasemasu)."
      },
      {
        question: "How do you say 'I like to read books' in casual speech?",
        options: ["本を読むのが好きです (Hon o yomu no ga suki desu)", "本を読みますのが好きだ (Hon o yomimasu no ga suki da)", "本を読むのが好きだ (Hon o yomu no ga suki da)", "本を読んでのが好きだ (Hon o yonde no ga suki da)"],
        correctAnswer: "本を読むのが好きだ (Hon o yomu no ga suki da)",
        explanation: "In this structure, the plain form '読む' is used to nominalize the verb, and the sentence ends with the plain copula 'だ'."
      },
      {
        question: "What is the plain past negative of '見ます' (mimasu - to see)?",
        options: ["見ませんでした (mimasen deshita)", "見なかった (minakatta)", "見ないでした (minai deshita)", "見えなかった (mienakatta)"],
        correctAnswer: "見なかった (minakatta)",
        explanation: "The plain past negative is formed from the nai-form. '見ない' (minai) becomes '見なかった' (minakatta) by replacing the final 'い' with 'かった'."
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
        question: "How do you give negative advice? 'It's better not to drink too much.'",
        options: [
          "飲みすぎない方がいいです (Nomisuginai hou ga ii desu)",
          "飲みすぎた方がいいです (Nomisugita hou ga ii desu)",
          "飲みすぎないでください (Nomisuginaide kudasai)",
          "飲みすぎてはいけません (Nomisugite wa ikemasen)"
        ],
        correctAnswer: "飲みすぎない方がいいです (Nomisuginai hou ga ii desu)",
        explanation: "For negative advice ('it's better not to...'), you use the plain negative (nai-form) of the verb before '方がいいです'."
      },
      {
        question: "What does the volitional form '行こう' (ikou) mean?",
        options: ["I want to go", "I can go", "I must go", "Let's go / I'll go"],
        correctAnswer: "Let's go / I'll go",
        explanation: "The volitional form expresses intention or suggestion. '行こう' is the plain/casual version of '行きましょう'."
      },
      {
        question: "Which particle is used to mean 'because', but is slightly more formal and logical than 'から'?",
        options: ["ので (node)", "でも (demo)", "し (shi)", "が (ga)"],
        correctAnswer: "ので (node)",
        explanation: "'ので' (node) is used to give reasons, similar to 'から' (kara), but it often implies a more objective cause-and-effect relationship and is slightly more formal."
      },
      {
        question: "The structure 'AとBとどちらの方が好きですか' is used to ask...?",
        options: ["Which is more expensive, A or B?", "Which do you like more, A or B?", "Where are A and B?", "What are A and B?"],
        correctAnswer: "Which do you like more, A or B?",
        explanation: "This is a standard pattern for asking someone to compare two items and state their preference."
      },
      {
        question: "How do you use the volitional form with 'と思っています' to express a long-held intention?",
        options: [
          "日本に行きたいと思います (Nihon ni ikitai to omoimasu)",
          "日本に行こうと思っています (Nihon ni ikou to omotte imasu)",
          "日本に行くと思っています (Nihon ni iku to omotte imasu)",
          "日本に行きましたと思っています (Nihon ni ikimashita to omotte imasu)"
        ],
        correctAnswer: "日本に行こうと思っています (Nihon ni ikou to omotte imasu)",
        explanation: "Using the volitional form + 'と思っています' implies that you've been thinking about doing something for a while."
      },
      {
        question: "What is a more casual way to say '〜なければなりません' (must do)?",
        options: ["〜なくてもいい (nakutemo ii)", "〜ないでください (naide kudasai)", "〜なきゃ (nakya) / 〜ないと (naito)", "〜たいです (tai desu)"],
        correctAnswer: "〜なきゃ (nakya) / 〜ないと (naito)",
        explanation: "'〜なきゃ' (a contraction of 'nakereba') and '〜ないと' (literally 'if I don't...') are common casual equivalents for expressing obligation."
      }
    ]
  },
  {
    id: "quiz-5",
    title: "Quiz 5: Comprehensive Review",
    questions: [
      {
        question: "Choose the correct particles for: 'I go TO the library AT 10 o'clock.' (私は１０時＿図書館＿行きます)",
        options: ["に、へ", "で、に", "へ、に", "に、に"],
        correctAnswer: "に、に",
        explanation: "The particle 'に' is used to mark a specific point in time (１０時に) and can also mark the destination/direction of movement (図書館に). 'へ' is also acceptable for destination but 'に' works for both here."
      },
      {
        question: "How would you combine these sentences using the te-form? 'I will buy a ticket. I will see a movie.'",
        options: [
          "切符を買って、映画を見ます (Kippu o katte, eiga o mimasu)",
          "切符を買うから、映画を見ます (Kippu o kau kara, eiga o mimasu)",
          "切符を買うし、映画を見ます (Kippu o kau shi, eiga o mimasu)",
          "切符を買う時、映画を見ます (Kippu o kau toki, eiga o mimasu)"
        ],
        correctAnswer: "切符を買って、映画を見ます (Kippu o katte, eiga o mimasu)",
        explanation: "The te-form is the standard way to connect a sequence of actions."
      },
      {
        question: "What is the plain form of the na-adjective '静か' (shizuka) in the past tense?",
        options: ["静かでした (shizuka deshita)", "静かだった (shizuka datta)", "静かくなかった (shizukakunakatta)", "静かじゃなかった (shizuka janakatta)"],
        correctAnswer: "静かだった (shizuka datta)",
        explanation: "The plain past tense of a na-adjective is formed by adding 'だった' (datta)."
      },
      {
        question: "How do you ask for permission using the te-form? 'May I take a photo?'",
        options: [
          "写真を撮ってもいいですか (Shashin o tottemo ii desu ka)",
          "写真を撮らなければなりません (Shashin o toranakereba narimasen)",
          "写真を撮るそうです (Shashin o toru sou desu)",
          "写真を撮ってください (Shashin o totte kudasai)"
        ],
        correctAnswer: "写真を撮ってもいいですか (Shashin o tottemo ii desu ka)",
        explanation: "The structure '(Verb, te-form) + もいいですか' is used to politely ask for permission."
      },
      {
        question: "What is the plain negative form of the i-adjective '楽しい' (tanoshii - fun)?",
        options: ["楽しくない (tanoshikunai)", "楽しいじゃない (tanoshii janai)", "楽しない (tanoshikunai)", "楽しではありません (tanoshii dewa arimasen)"],
        correctAnswer: "楽しくない (tanoshikunai)",
        explanation: "To make an i-adjective plain negative, you replace the final 'い' with 'くない'."
      },
      {
        question: "How do you express a desire to do something, e.g., 'I want to drink water.'?",
        options: ["水が飲めます (Mizu ga nomemasu)", "水を飲みます (Mizu o nomimasu)", "水が飲みたいです (Mizu ga nomitai desu)", "水を飲もう (Mizu o nomou)"],
        correctAnswer: "水が飲みたいです (Mizu ga nomitai desu)",
        explanation: "To express desire, you change the 'ます' (masu) from the verb stem to 'たいです' (tai desu). '飲みます' (nomimasu) becomes '飲みたいです' (nomitai desu)."
      },
      {
        question: "Which of these sentences means 'You must not enter'?",
        options: ["入らなくてもいいです (Hairanakutemo ii desu)", "入ってはいけません (Haitte wa ikemasen)", "入ることができます (Hairu koto ga dekimasu)", "入らないでください (Hairanaide kudasai)"],
        correctAnswer: "入ってはいけません (Haitte wa ikemasen)",
        explanation: "The structure '(Verb, te-form) + はいけません' is a strong way to express prohibition."
      },
       {
        question: "What is the correct potential form for the irregular verb '来ます' (kimasu - to come)?",
        options: ["来れます (koremasu)", "来られます (koraremasu)", "来させます (kosasemasu)", "来ますことができます (kimasu koto ga dekimasu)"],
        correctAnswer: "来られます (koraremasu)",
        explanation: "'来ます' (kimasu) is an irregular verb. Its potential form is '来られます' (koraremasu)."
      },
      {
        question: "Which is a casual way to say 'Let's eat'?",
        options: ["食べましょう (Tabemashou)", "食べませんか (Tabemasen ka)", "食べよう (Tabeyou)", "食べたい (Tabetai)"],
        correctAnswer: "食べよう (Tabeyou)",
        explanation: "'食べよう' (tabeyou) is the plain volitional form of '食べます' and is used in casual situations to mean 'Let's eat'."
      },
      {
        question: "Which sentence means 'Because it was expensive, I didn't buy it'?",
        options: [
          "高かったから、買いませんでした (Takakatta kara, kaimasen deshita)",
          "高いから、買いませんでした (Takai kara, kaimasen deshita)",
          "高くて、買いませんでした (Takakute, kaimasen deshita)",
          "高いので、買いませんでした (Takai node, kaimasen deshita)"
        ],
        correctAnswer: "高かったから、買いませんでした (Takakatta kara, kaimasen deshita)",
        explanation: "Since the reason ('it was expensive') is in the past, the past tense of the i-adjective ('高かった') should be used before 'から'."
      }
    ]
  }
];

    