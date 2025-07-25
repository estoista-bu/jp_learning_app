
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
  type WordGenerationOutput,
  type JishoResult
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

VERY IMPORTANT: Generate exactly {{numWords}} words. Do not generate more or less than this amount.
`,
});

// Helper function to call the Jisho API directly
async function searchJisho(keyword: string): Promise<JishoResult[]> {
  try {
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      console.error(`Jisho API request failed for "${keyword}" with status ${response.status}`);
      return [];
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Jisho API request failed for "${keyword}":`, error);
    return [];
  }
}

const generateWordsFlow = ai.defineFlow(
  {
    name: 'generateWordsFlow',
    inputSchema: WordGenerationInputSchema,
    outputSchema: WordGenerationOutputSchema,
  },
  async (input) => {
    const { deckName, numWords, existingWords } = input;
    const jlptMatch = deckName.match(/JLPT (N[1-5])/i);
    const jlptLevel = jlptMatch ? `jlpt-${jlptMatch[1].toLowerCase()}` : null;

    let wordsToGenerate = numWords;
    // If it's a JLPT deck, we need to generate more words initially to have enough to filter from.
    if (jlptLevel) {
        wordsToGenerate = Math.min(100, numWords * 5); // Ask for 5x more, max 100
    } else {
        wordsToGenerate = numWords + 15; // Standard buffer
    }

    let output: WordGenerationOutput | null = null;
    try {
        const result = await generateWordsPrompt({
            ...input,
            numWords: wordsToGenerate,
        });
        output = result.output;
    } catch (error) {
        console.error("AI word generation failed, returning empty list.", error);
        // Return an empty list of words if the AI fails.
        return { words: [] };
    }
    
    if (!output?.words) {
      throw new Error('No output from word generation flow');
    }
    
    // If it's not a JLPT deck, just trim and return
    if (!jlptLevel) {
        const trimmedWords = output.words.slice(0, numWords);
        return { words: trimmedWords };
    }

    // If it IS a JLPT deck, verify each word
    const verifiedWords: WordGenerationOutput['words'] = [];
    
    for (const word of output.words) {
      if (verifiedWords.length >= numWords) {
        break; // Stop once we have enough words
      }

      // Skip if the word already exists in the user's deck
      if(existingWords.includes(word.japanese)) {
        continue;
      }

      const results = await searchJisho(word.japanese);
      
      // Check if any of the Jisho results contain the correct JLPT tag
      const isCorrectLevel = results.some(result => 
        result.jlpt?.includes(jlptLevel)
      );

      if (isCorrectLevel) {
        verifiedWords.push({ ...word, jlpt: jlptMatch![1] });
      }
    }

    return { words: verifiedWords };
  }
);

export async function generateWords(input: WordGenerationInput): Promise<WordGenerationOutput> {
  return generateWordsFlow(input);
}
