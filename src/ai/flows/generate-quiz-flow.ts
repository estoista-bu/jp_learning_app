
'use server';
/**
 * @fileOverview An AI flow to generate a grammar quiz based on provided lessons.
 *
 * - generateQuiz - A function that creates a custom quiz.
 */

import { ai } from '@/ai/genkit';
import { 
  QuizGenerationInputSchema, 
  QuizGenerationOutputSchema,
  type QuizGenerationInput,
  type QuizGenerationOutput
} from '@/lib/types';


const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: QuizGenerationInputSchema },
  output: { schema: QuizGenerationOutputSchema },
  prompt: `You are an expert Japanese language teacher designing a multiple-choice quiz.
The quiz should be based *only* on the content of the following grammar lessons.

Do not create questions about topics not present in these lessons.

{{#each lessons}}
Lesson Title: {{this.title}}
Explanation: {{this.explanation}}
Examples:
{{#each this.exampleSentences}}
- {{this.japanese}} ({{this.meaning}})
{{/each}}
---
{{/each}}

Your task is to generate a quiz with exactly {{numQuestions}} questions.
For each question:
1.  Create a clear multiple-choice question that tests a concept from the provided lessons.
2.  Provide four distinct options.
3.  Provide Japanese readings for the question and options if they contain Kanji.
4.  Mark the correct answer.
5.  Write a concise explanation for why the answer is correct, referencing the rule from the lessons.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: QuizGenerationInputSchema,
    outputSchema: QuizGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuizPrompt(input);
    if (!output) {
      throw new Error('No output from quiz generation flow');
    }
    return output;
  }
);

export async function generateQuiz(input: QuizGenerationInput): Promise<QuizGenerationOutput> {
  return generateQuizFlow(input);
}
