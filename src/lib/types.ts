

export type VocabularyWord = {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  deckId: string;
};

export type Deck = {
  id: string;
  name: string;
  category?: 'user' | 'kana';
};

export type GrammarLesson = {
  title: string;
  explanation: string;
  exampleSentences: {
    japanese: string;
    reading: string;
    meaning: string;
  }[];
};

export type QuizQuestion = {
  question: string;
  questionReading?: string;
  options: string[];
  optionsReading?: string[];
  correctAnswer: string;
  explanation: string;
  explanationReading?: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
  score?: number | null;
};

export type JapaneseTextSegment = {
  text: string;
  furigana?: string;
};

export type JapaneseText = JapaneseTextSegment[];
    
