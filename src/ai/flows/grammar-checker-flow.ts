
'use server';
/**
 * @fileOverview An AI flow for checking Japanese grammar.
 *
 * - checkGrammar - A function that analyzes Japanese text for grammatical errors.
 * - GrammarCheckInput - The input type for the checkGrammar function.
 * - GrammarCheckOutput - The return type for the checkGrammar function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GrammarCheckInputSchema = z.object({
  text: z.string().describe('The Japanese text to be checked.'),
});
export type GrammarCheckInput = z.infer<typeof GrammarCheckInputSchema>;

const MistakeSchema = z.object({
  original: z.string().describe('The incorrect part of the text.'),
  correction: z.string().describe('The suggested correction for the mistake.'),
  explanation: z
    .string()
    .describe(
      'A clear and concise explanation of the grammatical error and why the correction is appropriate.'
    ),
});

const GrammarCheckOutputSchema = z.object({
  isCorrect: z
    .boolean()
    .describe('Whether or not the original text is grammatically correct.'),
  correctedText: z
    .string()
    .describe('The fully corrected version of the Japanese text.'),
  mistakes: z
    .array(MistakeSchema)
    .describe('An array of mistakes found in the text. This should be empty if the text is correct.'),
});
export type GrammarCheckOutput = z.infer<typeof GrammarCheckOutputSchema>;

export async function checkGrammar(
  input: GrammarCheckInput
): Promise<GrammarCheckOutput> {
  return grammarCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarCheckPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: { schema: GrammarCheckInputSchema },
  output: { schema: GrammarCheckOutputSchema },
  prompt: `You are an expert Japanese language teacher specializing in grammar. Analyze the provided Japanese text for any grammatical errors.

Your task is to:
1. Determine if the text is grammatically correct.
2. If it is correct, set 'isCorrect' to true and return the original text in 'correctedText' with an empty 'mistakes' array.
3. If there are errors, set 'isCorrect' to false.
4. Provide a fully corrected version of the text in the 'correctedText' field.
5. For each distinct error, create an object in the 'mistakes' array. Each object must contain the original incorrect phrase, the suggested correction, and a simple, clear explanation of the error. Focus on common mistakes like particle usage, verb conjugation, and politeness levels.

Analyze the following text:
"{{{text}}}"
`,
});

const grammarCheckFlow = ai.defineFlow(
  {
    name: 'grammarCheckFlow',
    inputSchema: GrammarCheckInputSchema,
    outputSchema: GrammarCheckOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('No output from grammar check flow');
    }
    return output;
  }
);
