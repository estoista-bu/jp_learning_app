

import { z } from 'zod';

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
  isRead?: boolean;
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


// Schema for AI Grammar Checker Input
export const GrammarCheckInputSchema = z.object({
  text: z.string().describe('The Japanese text to be checked for grammatical errors.'),
});
export type GrammarCheckInput = z.infer<typeof GrammarCheckInputSchema>;

// Schema for AI Grammar Checker Output
export const GrammarCheckOutputSchema = z.object({
  corrections: z
    .array(
      z.object({
        mistake: z.string().describe('The specific part of the text that is grammatically incorrect or awkward.'),
        suggestion: z.string().describe('A proposed correction for the identified mistake.'),
        explanation: z.string().describe('A clear and simple explanation of the grammatical error and why the suggestion is more appropriate.'),
      })
    )
    .describe('A list of identified grammar corrections. If no mistakes are found, this array will be empty.'),
  overallFeedback: z.string().describe('A brief, encouraging overall assessment of the text.'),
});
export type GrammarCheckOutput = z.infer<typeof GrammarCheckOutputSchema>;


// Types for Jisho.org API Response
export interface JishoResult {
  is_common: boolean;
  japanese: {
    word?: string;
    reading?: string;
  }[];
  senses: {
    english_definitions: string[];
    parts_of_speech: string[];
  }[];
}
