"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizGenerationOutputSchema = exports.QuizGenerationInputSchema = exports.SentenceGenerationOutputSchema = exports.SentenceGenerationInputSchema = exports.DifficultySchema = exports.WordGenerationOutputSchema = exports.WordGenerationInputSchema = exports.GrammarCheckOutputSchema = exports.GrammarCheckInputSchema = void 0;
const zod_1 = require("zod");
// Schema for AI Grammar Checker Input
exports.GrammarCheckInputSchema = zod_1.z.object({
    text: zod_1.z.string().describe('The Japanese text to be checked for grammatical errors.'),
});
// Schema for AI Grammar Checker Output
exports.GrammarCheckOutputSchema = zod_1.z.object({
    corrections: zod_1.z
        .array(zod_1.z.object({
        mistake: zod_1.z.string().describe('The specific part of the text that is grammatically incorrect or awkward.'),
        suggestion: zod_1.z.string().describe('A proposed correction for the identified mistake.'),
        explanation: zod_1.z.string().describe('A clear and simple explanation of the grammatical error and why the suggestion is more appropriate.'),
    }))
        .describe('A list of identified grammar corrections. If no mistakes are found, this array will be empty.'),
    overallFeedback: zod_1.z.string().describe('A brief, encouraging overall assessment of the text.'),
});
const WordSchema = zod_1.z.object({
    japanese: zod_1.z.string().describe("The vocabulary word in Japanese (using Kanji where appropriate)."),
    reading: zod_1.z.string().describe("The reading of the word in Hiragana."),
    meaning: zod_1.z.string().describe("The English meaning of the word."),
    jlpt: zod_1.z.string().optional().describe("The JLPT level of the word, if applicable."),
});
// Schemas for AI Word Generation
exports.WordGenerationInputSchema = zod_1.z.object({
    deckName: zod_1.z.string().describe("The topic or title of the deck for which to generate vocabulary."),
    deckTopic: zod_1.z.string().optional().describe("An optional specific topic for the words, like 'verbs' or 'food'."),
    existingWords: zod_1.z.array(zod_1.z.string()).describe("A list of Japanese words that are already in the deck to avoid generating duplicates."),
    numWords: zod_1.z.number().int().min(1).max(100).describe("The number of words to generate."),
    wordBank: zod_1.z.array(WordSchema).optional().describe("An optional bank of words to select from, used for JLPT decks.")
});
exports.WordGenerationOutputSchema = zod_1.z.object({
    words: zod_1.z.array(WordSchema)
});
// Schemas for AI Sentence Generation
exports.DifficultySchema = zod_1.z.enum(['Basic', 'Advanced']);
const VocabularyWordSchema = zod_1.z.object({
    japanese: zod_1.z.string(),
    reading: zod_1.z.string(),
    meaning: zod_1.z.string(),
});
exports.SentenceGenerationInputSchema = zod_1.z.object({
    word: VocabularyWordSchema.describe("The word to create a sentence for."),
    difficulty: exports.DifficultySchema.describe("The desired difficulty level for the sentence."),
});
exports.SentenceGenerationOutputSchema = zod_1.z.object({
    sentence: zod_1.z.string().describe("The generated example sentence in Japanese."),
    reading: zod_1.z.string().describe("The reading of the sentence in hiragana."),
    translation: zod_1.z.string().describe("The English translation of the sentence."),
});
// Schemas for AI Quiz Generation
const GrammarLessonSchema = zod_1.z.object({
    title: zod_1.z.string(),
    level: zod_1.z.enum(["N5", "N4"]),
    explanation: zod_1.z.string(),
    exampleSentences: zod_1.z.array(zod_1.z.object({
        japanese: zod_1.z.string(),
        reading: zod_1.z.string(),
        meaning: zod_1.z.string(),
    })),
});
const VocabularyWordForQuizSchema = zod_1.z.object({
    japanese: zod_1.z.string(),
    reading: zod_1.z.string(),
    meaning: zod_1.z.string(),
});
exports.QuizGenerationInputSchema = zod_1.z.object({
    lessons: zod_1.z.array(GrammarLessonSchema).describe("A list of grammar lessons to base the quiz on."),
    numQuestions: zod_1.z.number().int().min(1).max(100).describe("The number of questions to generate for the quiz."),
    deckName: zod_1.z.string().optional().describe("The name of the user-selected vocabulary deck."),
    vocabularyWords: zod_1.z.array(VocabularyWordForQuizSchema).optional().describe("A list of vocabulary words from the selected deck to bias the quiz questions towards."),
});
const QuizQuestionSchema = zod_1.z.object({
    question: zod_1.z.string().describe("The question text."),
    questionReading: zod_1.z.string().optional().describe("The hiragana reading for the question text, if applicable."),
    options: zod_1.z.array(zod_1.z.string()).length(4).describe("An array of four possible answers."),
    optionsReading: zod_1.z.array(zod_1.z.string()).length(4).optional().describe("The hiragana readings for the options, if applicable."),
    correctAnswer: zod_1.z.string().describe("The correct answer from the options array."),
    explanation: zod_1.z.string().describe("An explanation of why the correct answer is right."),
    explanationReading: zod_1.z.string().optional().describe("The hiragana reading for the explanation text, if applicable."),
});
exports.QuizGenerationOutputSchema = zod_1.z.object({
    questions: zod_1.z.array(QuizQuestionSchema)
});
