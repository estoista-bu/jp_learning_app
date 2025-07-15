
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
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
  score?: number | null;
};
