
'use server';
/**
 * @fileOverview An AI-powered flow to generate new vocabulary words for a given topic.
 *
 * - generateWords - A function that suggests new Japanese vocabulary words.
 */

import { ai } from '@/ai/genkit';
import { 
  WordGenerationInputSchema, 
  WordGenerationOutputSchema,
  type WordGenerationInput,
  type WordGenerationOutput
} from '@/lib/types';


const generateWordsPrompt = ai.definePrompt({
  name: 'generateWordsPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: WordGenerationInputSchema },
  output: { schema: WordGenerationOutputSchema },
  prompt: `You are an expert Japanese language teacher creating a vocabulary list for a student.
The student is creating a flashcard deck with the title: "{{deckName}}".

Your task is to generate relevant Japanese vocabulary words related to this topic.

The student's deck already contains the following words. You MUST NOT generate any of these words.
Existing words:
{{#each existingWords}}
- {{this}}
{{/each}}

For each new, unique vocabulary word, provide the standard Japanese writing (with Kanji), the reading in hiragana, and the English meaning.

VERY IMPORTANT: Generate exactly {{numWords}} words. Do not generate more or less than this amount.
`,
});

const generateWordsFlow = ai.defineFlow(
  {
    name: 'generateWordsFlow',
    inputSchema: WordGenerationInputSchema,
    outputSchema: WordGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await generateWordsPrompt(input);
    if (!output) {
      throw new Error('No output from word generation flow');
    }
    // Enforce the exact number of words requested, as the AI might generate slightly more or less.
    const trimmedWords = output.words.slice(0, input.numWords);
    return { words: trimmedWords };
  }
);

export async function generateWords(input: WordGenerationInput): Promise<WordGenerationOutput> {
  return generateWordsFlow(input);
}
