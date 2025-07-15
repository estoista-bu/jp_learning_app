
import type { Quiz } from "@/lib/types";

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Quiz 1: Core Concepts",
    questions: [
      {
        question: "Which sentence correctly uses the SOV (Subject-Object-Verb) structure?",
        questionReading: "どのぶんがただしいSOV（しゅご、もくてきご、どうし）のこうぞうをつかっていますか？",
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
        explanationReading: "にほんごのぶんこうぞうは、ふつう、しゅご、もくてきご、どうしです。「わたしは」はしゅご、「すしを」はもくてきご、「たべます」はどうしです。"
      },
      {
        question: "Select the correct particle for possession: 'これは私___本です'.",
        questionReading: "しょゆうをあらわすただしいじょしをえらんでください：「これはわたし___ほんです」。",
        options: ["は", "が", "を", "の"],
        correctAnswer: "の",
        explanation: "The particle の is used to show possession, like 's in English. '私の本' means 'my book'.",
        explanationReading: "じょしの「の」はえいごの'sのようにしょゆうをあらわすのにちかわれます。「わたしのほん」は'my book'をいみします。"
      },
      {
        question: "Which of the following is an 'i-adjective'?",
        questionReading: "つぎのうち、「いけいようし」はどれですか？",
        options: ["静か", "大きい", "きれい", "有名"],
        optionsReading: ["しずか", "おおきい", "きれい", "ゆうめい"],
        correctAnswer: "大きい",
        explanation: "i-adjectives, in their dictionary form, end with the hiragana character い. 大きい is a classic example.",
        explanationReading: "「いけいようし」は、じしょけいではひらがなの「い」でおわります。「おおきい」はてんけいてきなれいです。"
      },
       {
        question: "Which particle marks the topic of a sentence?",
        questionReading: "どのじょしがぶんのトピックをマークしますか？",
        options: ["が", "を", "は", "に"],
        correctAnswer: "は",
        explanation: "は is the topic marker, used to introduce what the sentence is about.",
        explanationReading: "「は」はトピックマーカーで、ぶんがなにについてであるかをしめすためにちかわれます。"
      },
      {
        question: "How do you say 'I watched a movie yesterday' in polite form?",
        questionReading: "「きのう、えいがをみました」をていねいごでなんといいますか？",
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
        explanationReading: "どうしのていねいなかこけいは、ごびの「ます」を「ました」にかえることでつくられます。"
      },
       {
        question: "When describing an action in progress, like 'I am studying', which verb form is used?",
        questionReading: "「べんきょうしています」のように、しんこうちゅうのこうどうをあらわすとき、どのどうしのけいしきがちかわれますか？",
        options: ["Te-form + います", "Dictionary Form", "Ta-form", "Nai-form"],
        optionsReading: ["てけい + います", "じしょけい", "たけい", "ないけい"],
        correctAnswer: "Te-form + います",
        explanation: "The Te-form + います structure is used to express the present progressive tense, similar to '-ing' in English.",
        explanationReading: "「てけい + います」のこうぞうは、えいごの'-ing'ににて、げんざいしんこうけいをあらわすためにちかわれます。"
      },
      {
        question: "What is the plain form (dictionary form) of the verb '食べます'?",
        questionReading: "どうし「たべます」のじしょけいはなんですか？",
        options: ["食べた", "食べない", "食べる", "食べて"],
        optionsReading: ["たべた", "たべない", "たべる", "たべて"],
        correctAnswer: "食べる",
        explanation: "The dictionary form is the base form of the verb. For ru-verbs like 食べます, you replace -masu with -ru.",
        explanationReading: "じしょけいはどうしのきほんけいです。「たべます」のようなるどうしでは、「ます」を「る」におきかえます。"
      },
      {
        question: "How do you say 'I can speak Japanese' using the potential form?",
        questionReading: "かのうけいをちかって、「わたしはにほんごがはなせます」はなんといいますか？",
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
        explanationReading: "かのうけいはのうりょくをあらわします。「はなします」のようなうどうしでは、ごかんのさいごの「い」おんが「え」おんにかわり、「ます」がくわわり、「はなせます」となります。"
      },
      {
        question: "Which sentence correctly gives advice using '〜方がいいです'?",
        questionReading: "「〜ほうがいいです」をちかってただしくアドバイスしているぶんはどれですか？",
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
        explanationReading: "「〜したほうがいい」というアドバイスをするには、どうしのたけい（ふつうかこけい）のあとに「ほうがいいです」がきます。"
      },
      {
        question: "What is the function of the particle 'を'?",
        questionReading: "じょし「を」のはたらきはなんですか？",
        options: ["Indicates location", "Marks the direct object", "Shows possession", "Marks the subject"],
        optionsReading: ["ばしょをしめす", "ちょくせつもくてきごをマークする", "しょゆうをあらわす", "しゅごをマークする"],
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
        questionReading: "どのじょしがあたらしいじょうほうやきょうちょうのために、とくていのしゅごをマークしますか？",
        options: ["が", "を", "は", "に"],
        correctAnswer: "が",
        explanation: "While は marks the topic, が marks the subject, often to introduce new information or for emphasis.",
        explanationReading: "「は」がトピックをマークするのにたいし、「が」はしゅごをマークし、あたらしいじょうほうをしょうかいしたり、きょうちょうしたりするためによくちかわれます。"
      },
      {
        question: "How do you say 'I will not eat' in polite form?",
        questionReading: "「わたしはたべません」をていねいごでなんといいますか？",
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
        explanationReading: "ていねいなひていげんざい/みらいけいは、ごびの「ます」を「ません」にかえることでつくられます。"
      },
      {
        question: "What is the te-form of the verb '待ちます'?",
        questionReading: "どうし「まちます」のてけいはなんですか？",
        options: ["待って", "待ちて", "待んで", "まて"],
        optionsReading: ["まって", "まちて", "まんで", "まて"],
        correctAnswer: "待って",
        explanation: "For u-verbs ending in -chimasu, the te-form is created by replacing 'chimasu' with 'tte'.",
        explanationReading: "「ちます」でおわるうどうしでは、「ちます」を「って」におきかえることでてけいがつくられます。"
      },
      {
        question: "Which of the following is a 'na-adjective'?",
        questionReading: "つぎのうち、「なけいようし」はどれですか？",
        options: ["新しい", "面白い", "静か", "高い"],
        optionsReading: ["あたらしい", "おもしろい", "しずか", "たかい"],
        correctAnswer: "静か",
        explanation: "'Na-adjectives' do not end in 'い' and require 'な' when they come before a noun (e.g., 静かな部屋).",
        explanationReading: "「なけいようし」は「い」でおわらず、めいしのまえにくるときには「な」がひつようです（れい：しずかなへや）。"
      },
       {
        question: "How do you say 'Mr. Sato is married.' to describe a continuous state?",
        questionReading: "「さとうさんはけっこんしています」というけいぞくしたじょうたいをあらわすには、なんといいますか？",
        options: ["佐藤さんは結婚します", "佐藤さんは結婚しました", "佐藤さんは結婚しています", "佐藤さんは結婚しません"],
        optionsReading: ["さとうさんはけっこんします", "さとうさんはけっこんしました", "さとうさんはけっこんしています", "さとうさんはけっこんしません"],
        correctAnswer: "佐藤さんは結婚しています",
        explanation: "The 'te-form + います' structure is used not only for actions in progress but also to describe a continuous state, like being married.",
        explanationReading: "「てけい + います」のこうぞうは、しんこうちゅうのこうどうだけでなく、けっこんしているようなけいぞくしたじょうたいをあらわすためにもちかわれます。"
      },
      {
        question: "What is the polite past negative of '飲みます'?",
        questionReading: "「のみます」のていねいなかこひていけいはなんですか？",
        options: ["飲みません", "飲みました", "飲みませんでした", "飲まなかった"],
        optionsReading: ["のみません", "のみました", "のみませんでした", "のまなかった"],
        correctAnswer: "飲みませんでした",
        explanation: "The polite past negative is formed by using the '-masen' form and adding 'deshita'.",
        explanationReading: "ていねいなかこひていは、「ません」けいをちかって「でした」をつけることでつくられます。"
      },
      {
        question: "To connect two actions, 'I eat breakfast and then go to school,' what form is used for 'eat'?",
        questionReading: "「あさごはんをたべて、がっこうにいきます」というふたつのこうどうをつなげるには、「たべる」にどのけいしきがちかわれますか？",
        options: ["Te-form", "Dictionary form", "Masu-form", "Ta-form"],
        optionsReading: ["てけい", "じしょけい", "ますけい", "たけい"],
        correctAnswer: "Te-form",
        explanation: "The te-form is used to link successive actions. '朝ごはんを食べて、学校に行きます。'",
        explanationReading: "てけいは、れんぞくするこうどうをつなぐためにちかわれます。「あさごはんをたべて、がっこうにいきます。」"
      },
      {
        question: "How do you say 'quiet library' using a na-adjective?",
        questionReading: "なけいようしをちかって「しずかなとしょかん」はなんといいますか？",
        options: ["静か図書館", "静かな図書館", "静かい図書館", "静かで図書館"],
        optionsReading: ["しずかとしょかん", "しずかなとしょかん", "しずかいとしょかん", "しずかでとしょかん"],
        correctAnswer: "静かな図書館",
        explanation: "When a na-adjective comes directly before a noun, you must add な between them.",
        explanationReading: "なけいようしがめいしのちょくぜんにくるときは、そのあいだに「な」をいれなければなりません。"
      },
      {
        question: "What does '〜ませんか' express?",
        questionReading: "「〜ませんか」はなにをあらわしますか？",
        options: ["A direct command", "A question about ability", "A polite invitation", "A statement of fact"],
        optionsReading: ["ちょくせつなめいれい", "のうりょくについてのしつもん", "ていねいなさそい", "じじつのちんじゅつ"],
        correctAnswer: "A polite invitation",
        explanation: "'〜ませんか' (e.g., '行きませんか?') is a gentle and polite way to invite someone to do something.",
        explanationReading: "「〜ませんか」（れい：「いきませんか？」）は、だれかをなにかをするようにさそう、ていねいでやさしいほうほうです。"
      },
       {
        question: "What is the opposite of '大きいです'?",
        questionReading: "「おおきいです」のはんたいはなんですか？",
        options: ["大きくないです", "大きいじゃないです", "大きではありません", "Both A and B"],
        optionsReading: ["おおきくないです", "おおきいじゃないです", "おおきではありません", ""],
        correctAnswer: "大きくないです",
        explanation: "To make an i-adjective negative, you change the final 'い' to 'くないです'.",
        explanationReading: "いけいようしをひていにするには、さいごの「い」を「くないです」にかえます。"
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Quiz 3: Plain & Potential Forms",
    questions: [
      {
        question: "What is the plain past tense (ta-form) of the verb '飲みます'?",
        questionReading: "どうし「のみます」のふつうかこけい（たけい）はなんですか？",
        options: ["飲んで", "飲んだ", "飲む", "飲まない"],
        optionsReading: ["のんで", "のんだ", "のむ", "のまない"],
        correctAnswer: "飲んだ",
        explanation: "For u-verbs ending in -mimasu, the te-form is -nde (飲んで) and the ta-form is -nda (飲んだ).",
        explanationReading: "「みます」でおわるうどうしでは、てけいは「んで」（のんで）、たけいは「んだ」（のんだ）です。"
      },
      {
        question: "Which of the following means 'I think it will rain'?",
        questionReading: "つぎのうち、「あめがふるとおもいます」をいみするのはどれですか？",
        options: ["雨が降ると思います", "雨が降ると言いました", "雨が降るでしょう", "雨が降るそうです"],
        optionsReading: ["あめがふるとおもいます", "あめがふるといいました", "あめがふるでしょう", "あめがふるそうです"],
        correctAnswer: "雨が降ると思います",
        explanation: "To express your own opinion ('I think...'), you use the plain form of a verb followed by 'と思います'.",
        explanationReading: "じぶんのいけん（「～とおもいます」）をあらわすには、どうしのふつうけいのあとに「とおもいます」をちかいます。"
      },
      {
        question: "How do you correctly say 'I cannot eat sushi' in the potential form?",
        questionReading: "かのうけいをちかって、「わたしはすしがたべられません」はただしくなんといいますか？",
        options: ["寿司を食べません", "寿司を食べられません", "寿司を食べたくない", "寿司を食べませんです"],
        optionsReading: ["すしをたべません", "すしをたべられません", "すしをたべたくない", "すしをたべませんです"],
        correctAnswer: "寿司を食べられません",
        explanation: "The potential form of the ru-verb '食べる' is '食べられる'. The polite negative is '食べられません'.",
        explanationReading: "るどうし「たべる」のかのうけいは「たべられる」です。ていねいひていは「たべられません」です。"
      },
       {
        question: "When reporting what someone else said, you use '〜と言っていました'. What form of the verb/adjective comes before it?",
        questionReading: "だれかがいったことをほうこくするとき、「〜といっていました」をちかいます。そのまえにくるどうし/けいようしのかたちはどれですか？",
        options: ["Masu-form", "Te-form", "Nai-form", "Plain Form"],
        optionsReading: ["ますけい", "てけい", "ないけい", "ふつうけい"],
        correctAnswer: "Plain Form",
        explanation: "When quoting someone, you use the plain form of the verb or adjective before 'と言っていました'.",
        explanationReading: "だれかをいんようするときは、「〜といっていました」のまえにどうしやけいようしのふつうけいをちかいます。"
      },
      {
        question: "What is the plain negative form of '行きます'?",
        questionReading: "「いきます」のふつうひていけいはなんですか？",
        options: ["行かない", "行くない", "行いません", "行けない"],
        optionsReading: ["いかない", "いくない", "いきません", "いけない"],
        correctAnswer: "行かない",
        explanation: "The plain negative (nai-form) of the u-verb '行きます' is '行かない'.",
        explanationReading: "うどうし「いきます」のふつうひていけい（ないけい）は「いかない」です。"
      },
      {
        question: "The structure '〜ことがあります' is used to express:",
        questionReading: "「〜ことがあります」のこうぞうはなにをあらわすためにちかわれますか？",
        options: ["Obligation", "Experience", "Desire", "Ability"],
        optionsReading: ["ぎむ", "けいけん", "がんぼう", "のうりょく"],
        correctAnswer: "Experience",
        explanation: "The 'ta-form + ことがあります' pattern is used to talk about things you have experienced.",
        explanationReading: "「たけい + ことがあります」のパターンは、けいけんしたことについて話すためにちかわれます。"
      },
      {
        question: "What is the potential form of the u-verb '泳ぎます'?",
        questionReading: "うどうし「およぎます」のかのうけいはなんですか？",
        options: ["泳げます", "泳ぎられます", "泳がせます", "泳ぎたいです"],
        optionsReading: ["およげます", "およぎられます", "およがせます", "およぎたいです"],
        correctAnswer: "泳げます",
        explanation: "For u-verbs, the potential form is made by changing the final 'i' vowel sound of the stem to 'e'. So, 'oyogi' becomes 'oyoge'.",
        explanationReading: "うどうしでは、ごかんのさいごの「い」ぼいんおんを「え」にかえることでかのうけいがつくられます。なので、「およぎ」は「およげ」になります。"
      },
      {
        question: "Which particle is often used with the potential form to mark the object?",
        questionReading: "かのうけいとともにもくてきごをマークするためによくちかわれるじょしはどれですか？",
        options: ["を", "が", "は", "で"],
        correctAnswer: "が",
        explanation: "While 'を' is not wrong, it's very common to use 'が' to mark the object of a potential verb.",
        explanationReading: "「を」もまちがいではありませんが、かのうどうしのもくてきごをマークするためには「が」をちかうのがたいへんいっぱんてきです。"
      },
      {
        question: "How do you say 'I like to read books' in casual speech?",
        questionReading: "「ほんをよむのがすき」をカジュアルなかいわでなんといいますか？",
        options: ["本を読むのが好きです", "本を読みますのが好きだ", "本を読むのが好きだ", "本を読んでのが好きだ"],
        optionsReading: ["ほんをよむのがすきです", "ほんをよみますのがすきだ", "ほんをよむのがすきだ", "ほんをよんでのがすきだ"],
        correctAnswer: "本を読むのが好きだ",
        explanation: "In this structure, the plain form '読む' is used to nominalize the verb, and the sentence ends with the plain copula 'だ'.",
        explanationReading: "このこうぞうでは、どうしをめいしかするためにふつうけい「よむ」がちかわれ、ぶんはふつうけいのコピュラ「だ」でおわります。"
      },
      {
        question: "What is the plain past negative of '見ます'?",
        questionReading: "「みます」のふつうかこひていけいはなんですか？",
        options: ["見ませんでした", "見なかった", "見ないでした", "見えなかった"],
        optionsReading: ["みませんでした", "みなかった", "みないでした", "みえなかった"],
        correctAnswer: "見なかった",
        explanation: "The plain past negative is formed from the nai-form. '見ない' becomes '見なかった' by replacing the final 'い' with 'かった'.",
        explanationReading: "ふつうかこひていは、ないけいからつくられます。「みない」は、さいごの「い」を「かった」におきかえることで「みなかった」になります。"
      }
    ]
  },
  {
    id: "quiz-4",
    title: "Quiz 4: Intermediate Structures",
    questions: [
      {
        question: "How do you form a polite invitation? 'Won't you go to the movies together?'",
        questionReading: "ていねいなさそいかたはどうつくりますか？「いっしょにえいがにいきませんか？」",
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
        explanationReading: "「ませんか」けいは、だれかをなにかをするようにさそう、いっぱんてきでていねいなほうほうです。"
      },
      {
        question: "Which sentence correctly uses 'から' to give a reason?",
        questionReading: "「から」をりゆうをしめすためにただしくちかっているぶんはどれですか？",
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
        explanationReading: "「から」は、りゆうをのべるせつのあとにきます。「じかんがないから、いそぎます。」"
      },
      {
        question: "What is the correct way to express obligation? 'I must study.'",
        questionReading: "ぎむをあらわすただしいほうほうはどれですか？「わたしはべんきょうしなければなりません。」",
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
        explanationReading: "「なければなりません」のパターンは、なにかをしなければならないことをあらわすためにちかわれます。それはどうしのひてい「ない」けいからつくられます。"
      },
      {
        question: "Choose the correct comparison: 'The train is faster than the bus.'",
        questionReading: "ただしいひかくをえらんでください：「でんしゃはバスよりはやいです。」",
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
        explanationReading: "「AよりBのほうが…」のこうぞうは、「BはAよりもっと…」をいみします。ここでは、でんしゃ（B）はバス（A）よりはやいです。"
      },
       {
        question: "How do you give negative advice? 'It's better not to drink too much.'",
        questionReading: "ひていてきなアドバイスはどうあたえますか？「あまりのみすぎないほうがいいです。」",
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
        explanationReading: "ひていてきなアドバイス（「〜しないほうがいい」）をするには、どうしのふつうひていけい（ないけい）のまえに「ほうがいいです」をちかいます。"
      },
      {
        question: "What does the volitional form '行こう' mean?",
        questionReading: "いしけい「いこう」はなにをいみしますか？",
        options: ["I want to go", "I can go", "I must go", "Let's go / I'll go"],
        optionsReading: ["いきたい", "いける", "いかなければならない", "いこう / いくぞ"],
        correctAnswer: "Let's go / I'll go",
        explanation: "The volitional form expresses intention or suggestion. '行こう' is the plain/casual version of '行きましょう'.",
        explanationReading: "いしけいは、いとやていあんをあらわします。「いこう」は、「いきましょう」のふつう/カジュアルなバージョンです。"
      },
      {
        question: "Which particle is used to mean 'because', but is slightly more formal and logical than 'から'?",
        questionReading: "「から」よりもすこしかしこまって、ろんりてきなりゆうをしめすためにちかわれるじょしはどれですか？",
        options: ["ので", "でも", "し", "が"],
        correctAnswer: "ので",
        explanation: "'ので' is used to give reasons, similar to 'から', but it often implies a more objective cause-and-effect relationship and is slightly more formal.",
        explanationReading: "「ので」は「から」とどうようにりゆうをのべるためにちかわれますが、よりきゃっかんてきないんがかんけいをあんじすることがおおく、すこしかしこまっています。"
      },
      {
        question: "The structure 'AとBとどちらの方が好きですか' is used to ask...?",
        questionReading: "「AとBとどちらのほうがすきですか」のこうぞうはなにをたずねるためにちかわれますか？",
        options: ["Which is more expensive, A or B?", "Which do you like more, A or B?", "Where are A and B?", "What are A and B?"],
        optionsReading: [
            "AとB、どちらがたかいですか？",
            "AとB、どちらがすきですか？",
            "AとBはどこにありますか？",
            "AとBはなんですか？"
        ],
        correctAnswer: "Which do you like more, A or B?",
        explanation: "This is a standard pattern for asking someone to compare two items and state their preference.",
        explanationReading: "これは、だれかにふたつのアイテムをひかくしてこのみをのべてもらうためのひょうじゅんてきなパターンです。"
      },
      {
        question: "How do you use the volitional form with 'と思っています' to express a long-held intention?",
        questionReading: "ながいあいだのかんがえをあらわすために、いしけいと「とおもっています」をどうちかいますか？",
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
        explanationReading: "いしけい + 「とおもっています」をちかうと、しばらくのあいだなにかをしようとかんがえていたことをあんじします。"
      },
      {
        question: "What is a more casual way to say '〜なければなりません' (must do)?",
        questionReading: "「〜なければなりません」のよりカジュアルな言い方は何ですか？",
        options: ["〜なくてもいい", "〜ないでください", "〜なきゃ / 〜ないと", "〜たいです"],
        optionsReading: ["〜なくてもいい", "〜ないでください", "〜なきゃ / 〜ないと", "〜たいです"],
        correctAnswer: "〜なきゃ / 〜ないと",
        explanation: "'〜なきゃ' (a contraction of 'nakereba') and '〜ないと' (literally 'if I don't...') are common casual equivalents for expressing obligation.",
        explanationReading: "「〜なきゃ」（「なければ」のたんしゅくけい）と「〜ないと」（もじどおりには「もし〜しなければ」）は、ぎむをあらわすためのいっぱんてきなカジュアルなどうぎごです。"
      }
    ]
  },
  {
    id: "quiz-5",
    title: "Quiz 5: Comprehensive Review",
    questions: [
      {
        question: "Choose the correct particles for: 'I go TO the library AT 10 o'clock.' (私は１０時＿図書館＿行きます)",
        questionReading: "ただしいじょしをえらんでください：「わたしは１０じ＿としょかん＿いきます」",
        options: ["に、へ", "で、に", "へ、に", "に、に"],
        correctAnswer: "に、に",
        explanation: "The particle 'に' is used to mark a specific point in time (１０時に) and can also mark the destination/direction of movement (図書館に). 'へ' is also acceptable for destination but 'に' works for both here.",
        explanationReading: "じょし「に」は、とくていのじこくをマークするためにちかわれ（１０じに）、また、もくてきち/ほうこうをマークするためにもちかわれます（としょかんに）。「へ」ももくてきちにたいしてはかのうですが、ここでは「に」がどちらにもあてはまります。"
      },
      {
        question: "How would you combine these sentences using the te-form? 'I will buy a ticket. I will see a movie.'",
        questionReading: "てけいをちかってこれらのぶんをどうつなげますか？「きっぷをかいます。えいがをみます。」",
        options: [
          "切符を買って、映画を見ます",
          "切符を買うから、映画を見ます",
          "切符を買うし、映画を見ます",
          "切符を買う時、映画を見ます"
        ],
        optionsReading: [
            "きっぷをかって、えいがをみます",
            "きっぷをかうから、えいがをみます",
            "きっぷをかうし、えいがをみます",
            "きっぷをかうとき、えいがをみます"
        ],
        correctAnswer: "切符を買って、映画を見ます",
        explanation: "The te-form is the standard way to connect a sequence of actions.",
        explanationReading: "てけいは、いちれんのこうどうをつなぐためのひょうじゅんてきなほうほうです。"
      },
      {
        question: "What is the plain form of the na-adjective '静か' in the past tense?",
        questionReading: "なけいようし「しずか」のかこけいのふつうけいはなんですか？",
        options: ["静かでした", "静かだった", "静かくなかった", "静かじゃなかった"],
        optionsReading: ["しずかでした", "しずかだった", "しずかくなかった", "しずかじゃなかった"],
        correctAnswer: "静かだった",
        explanation: "The plain past tense of a na-adjective is formed by adding 'だった'.",
        explanationReading: "なけいようしのふつうかこけいは、「だった」をつけることでつくられます。"
      },
      {
        question: "How do you ask for permission using the te-form? 'May I take a photo?'",
        questionReading: "てけいをちかってきょかをもとめるにはどうしますか？「しゃしんをとってもいいですか？」",
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
        explanationReading: "「（どうし、てけい）+ もいいですか」のこうぞうは、ていねいにきょかをもとめるためにちかわれます。"
      },
      {
        question: "What is the plain negative form of the i-adjective '楽しい'?",
        questionReading: "いけいようし「たのしい」のふつうひていけいはなんですか？",
        options: ["楽しくない", "楽しいじゃない", "楽しない", "楽しではありません"],
        optionsReading: ["たのしくない", "たのしいじゃない", "たのしくない", "たのしいではありません"],
        correctAnswer: "楽しくない",
        explanation: "To make an i-adjective plain negative, you replace the final 'い' with 'くない'.",
        explanationReading: "いけいようしをふつうひていにするには、さいごの「い」を「くない」におきかえます。"
      },
      {
        question: "How do you express a desire to do something, e.g., 'I want to drink water.'?",
        questionReading: "なにかをしたいというがんぼうをどうあらわしますか？たとえば、「みずがのみたいです。」",
        options: ["水が飲めます", "水を飲みます", "水が飲みたいです", "水を飲もう"],
        optionsReading: ["みずがのめます", "みずをのみます", "みずがのみたいです", "みずをのもう"],
        correctAnswer: "水が飲みたいです",
        explanation: "To express desire, you change the 'ます' from the verb stem to 'たいです'. '飲みます' becomes '飲みたいです'.",
        explanationReading: "がんぼうをあらわすには、どうしのごかんから「ます」を「たいです」にかえます。「のみます」は「のみたいです」になります。"
      },
      {
        question: "Which of these sentences means 'You must not enter'?",
        questionReading: "これらのぶんのうち、「はいってはいけません」をいみするのはどれですか？",
        options: ["入らなくてもいいです", "入ってはいけません", "入ることができます", "入らないでください"],
        optionsReading: ["はいらなくてもいいです", "はいってはいけません", "はいることができます", "はいらないでください"],
        correctAnswer: "入ってはいけません",
        explanation: "The structure '(Verb, te-form) + はいけません' is a strong way to express prohibition.",
        explanationReading: "「（どうし、てけい）+ はいけません」のこうぞうは、きんしをあらわすつよいほうほうです。"
      },
       {
        question: "What is the correct potential form for the irregular verb '来ます'?",
        questionReading: "ふきそくどうし「きます」のただしいかのうけいはどれですか？",
        options: ["来れます", "来られます", "来させます", "来ますことができます"],
        optionsReading: ["これます", "こられます", "こさせます", "きますことができます"],
        correctAnswer: "来られます",
        explanation: "'来ます' is an irregular verb. Its potential form is '来られます'.",
        explanationReading: "「きます」はふきそくどうしです。そのかのうけいは「こられます」です。"
      },
      {
        question: "Which is a casual way to say 'Let's eat'?",
        questionReading: "「たべましょう」のカジュアルな言い方はどれですか？",
        options: ["食べましょう", "食べませんか", "食べよう", "食べたい"],
        optionsReading: ["たべましょう", "たべませんか", "たべよう", "たべたい"],
        correctAnswer: "食べよう",
        explanation: "'食べよう' is the plain volitional form of '食べます' and is used in casual situations to mean 'Let's eat'.",
        explanationReading: "「たべよう」は「たべます」のふつういしけいで、カジュアルなじょうきょうで「たべましょう」をいみするためにちかわれます。"
      },
      {
        question: "Which sentence means 'Because it was expensive, I didn't buy it'?",
        questionReading: "「たかかったので、かいませんでした」をいみするぶんはどれですか？",
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
        explanationReading: "りゆう（「たかかった」）がかこであるため、いけいようしのかこけい（「たかかった」）を「から」のまえにちかうべきです。"
      }
    ]
  }
];
