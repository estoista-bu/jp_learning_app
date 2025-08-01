
'use server';
/**
 * @fileOverview An AI flow to generate an example sentence for a given vocabulary word.
 *
 * - generateSentence - A function that creates a contextual sentence.
 */

import { 
  SentenceGenerationInputSchema, 
  SentenceGenerationOutputSchema,
  type SentenceGenerationInput,
  type SentenceGenerationOutput
} from '@/lib/types';

export async function generateSentence(input: SentenceGenerationInput): Promise<SentenceGenerationOutput> {
  const response = await fetch('/api/ai/generate-sentence', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sentence: input.word.japanese,
      level: input.difficulty
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate sentence');
  }

  const result = await response.json();
  return result.data;
}
