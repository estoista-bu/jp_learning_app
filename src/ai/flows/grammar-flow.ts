
'use server';
/**
 * @fileOverview A flow for generating Japanese grammar lessons.
 *
 * - generateGrammarLesson - A function that creates a grammar lesson.
 * - GrammarLessonInput - The input type for the generateGrammarLesson function.
 * - GrammarLessonOutput - The return type for the generateGrammarLesson function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GrammarLessonInputSchema = z.object({
  topic: z.string().describe("The grammar topic for the lesson. Can be 'Beginner', 'Intermediate', 'Advanced', or a specific topic like 'Particles' or 'Verb Conjugation'."),
  vocabulary: z.array(z.string()).optional().describe("An optional list of vocabulary words to try and incorporate into the lesson's example sentences."),
});
export type GrammarLessonInput = z.infer<typeof GrammarLessonInputSchema>;

const GrammarLessonOutputSchema = z.object({
  title: z.string().describe("The title of the grammar lesson."),
  explanation: z.string().describe("A clear and concise explanation of the grammar point, written in simple English."),
  exampleSentences: z.array(z.object({
      japanese: z.string().describe("An example sentence in Japanese demonstrating the grammar point."),
      reading: z.string().describe("The hiragana/katakana reading of the Japanese sentence."),
      meaning: z.string().describe("The English translation of the sentence."),
  })).describe("At least 3-5 example sentences."),
});
export type GrammarLessonOutput = z.infer<typeof GrammarLessonOutputSchema>;


const prompt = ai.definePrompt({
  name: 'grammarLessonPrompt',
  input: { schema: GrammarLessonInputSchema },
  output: { schema: GrammarLessonOutputSchema },
  prompt: `You are an expert Japanese language teacher. Create a concise grammar lesson based on the provided topic.

The lesson should be easy to understand for an English-speaking learner.

Topic: {{{topic}}}

{{#if vocabulary}}
Please try to use some of the following vocabulary words in your example sentences:
{{#each vocabulary}}
- {{{this}}}
{{/each}}
{{else}}
Use common, basic Japanese vocabulary for the example sentences (e.g., JLPT N5/N4 level).
{{/if}}

Structure your response according to the output schema: provide a title, a clear explanation, and several example sentences with readings and meanings.
`,
});

const generateGrammarLessonFlow = ai.defineFlow(
  {
    name: 'generateGrammarLessonFlow',
    inputSchema: GrammarLessonInputSchema,
    outputSchema: GrammarLessonOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);


export async function generateGrammarLesson(input: GrammarLessonInput): Promise<GrammarLessonOutput> {
    return generateGrammarLessonFlow(input);
}
