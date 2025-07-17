
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

Your task is to generate {{numWords}} relevant Japanese vocabulary words related to this topic.

IMPORTANT: The student's deck already contains the following words. Do NOT generate any of these words.
Existing words:
{{#each existingWords}}
- {{this}}
{{/each}}

Please provide {{numWords}} new, unique vocabulary words. For each word, provide the standard Japanese writing (with Kanji), the reading in hiragana, and the English meaning.
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
    return output;
  }
);

export async function generateWords(input: WordGenerationInput): Promise<WordGenerationOutput> {
  return generateWordsFlow(input);
}
