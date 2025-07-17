

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

// Schemas for AI Word Generation
export const WordGenerationInputSchema = z.object({
  deckName: z.string().describe("The topic or title of the deck for which to generate vocabulary."),
  existingWords: z.array(z.string()).describe("A list of Japanese words that are already in the deck to avoid generating duplicates."),
  numWords: z.number().int().min(1).max(10).describe("The number of words to generate."),
});
export type WordGenerationInput = z.infer<typeof WordGenerationInputSchema>;

export const WordGenerationOutputSchema = z.object({
  words: z.array(z.object({
    japanese: z.string().describe("The vocabulary word in Japanese (using Kanji where appropriate)."),
    reading: z.string().describe("The reading of the word in Hiragana."),
    meaning: z.string().describe("The English meaning of the word."),
  }))
});
export type WordGenerationOutput = z.infer<typeof WordGenerationOutputSchema>;


// Schemas for AI Sentence Generation
export const DifficultySchema = z.enum(['Basic', 'Advanced', 'Expert']);
export type Difficulty = z.infer<typeof DifficultySchema>;

const VocabularyWordSchema = z.object({
  japanese: z.string(),
  reading: z.string(),
  meaning: z.string(),
});

export const SentenceGenerationInputSchema = z.object({
  word: VocabularyWordSchema.describe("The word to create a sentence for."),
  difficulty: DifficultySchema.describe("The desired difficulty level for the sentence."),
});
export type SentenceGenerationInput = z.infer<typeof SentenceGenerationInputSchema>;

export const SentenceGenerationOutputSchema = z.object({
  sentence: z.string().describe("The generated example sentence in Japanese."),
  reading: z.string().describe("The reading of the sentence in hiragana."),
  translation: z.string().describe("The English translation of the sentence."),
});
export type SentenceGenerationOutput = z.infer<typeof SentenceGenerationOutputSchema>;
