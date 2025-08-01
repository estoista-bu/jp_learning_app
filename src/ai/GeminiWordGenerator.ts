import { GoogleGenerativeAI } from '@google/generative-ai';

interface WordEntry {
  japanese: string;
  reading: string;
  meaning: string;
}

export interface GenerateWordsParams {
  deckName: string;
  deckTopic?: string;
  level?: string;
  count: number;
  existingWords: string[];
  wordBank?: Array<{ japanese: string; reading: string; meaning: string; }>;
}

export class GeminiWordGenerator {
  private model: any;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  private buildPrompt(params: GenerateWordsParams): string {
    const { deckName, deckTopic, level, count, existingWords, wordBank } = params;
    const topic = deckTopic || deckName;

    if (wordBank?.length) {
      return `System: You are a Japanese vocabulary generation API. Output a JSON array only.

Input: Generate ${count} Japanese words from word bank related to "${topic}".
Word Bank: ${JSON.stringify(wordBank.slice(0, 10))}
Exclude: ${JSON.stringify(existingWords)}

Example: [{"japanese":"漢字","reading":"かんじ","meaning":"kanji"}]

Rules:
1. Output JSON array only
2. Use word bank only
3. No extra text`;
    } else if (level) {
      return `System: You are a Japanese vocabulary generation API. Output a JSON array only.

Input: Generate ${count} JLPT ${level} words related to "${topic}".
Exclude: ${JSON.stringify(existingWords)}

Example: [{"japanese":"漢字","reading":"かんじ","meaning":"kanji"}]

Rules:
1. Output JSON array only
2. Match JLPT ${level}
3. No extra text`;
    } else {
      return `System: You are a Japanese vocabulary generation API. Output a JSON array only.

Input: Generate ${count} Japanese words related to "${topic}".
Exclude: ${JSON.stringify(existingWords)}

Example: [{"japanese":"漢字","reading":"かんじ","meaning":"kanji"}]

Rules:
1. Output JSON array only
2. No extra text`;
    }
  }

  private async extractJsonArray(text: string): Promise<WordEntry[]> {
    // Try to find a JSON array in the text
    const match = text.match(/\[\s*{[^]*}\s*\]/);
    if (!match) {
      throw new Error('No JSON array found in response');
    }

    try {
      const parsed = JSON.parse(match[0]);
      if (!Array.isArray(parsed)) {
        throw new Error('Parsed result is not an array');
      }
      return parsed;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      throw new Error('Invalid JSON format in response');
    }
  }

  async generateWords(params: GenerateWordsParams): Promise<WordEntry[]> {
    const prompt = this.buildPrompt(params);
    
    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          stopSequences: ["\n\n"]
        },
      });

      const response = await result.response;
      const text = response.text();
      console.log('Raw response:', text);

      const words = await this.extractJsonArray(text);
      console.log('Extracted words:', words);

      // Validate words
      const validatedWords = words.filter((word): word is WordEntry =>
        word &&
        typeof word === 'object' &&
        typeof word.japanese === 'string' &&
        typeof word.reading === 'string' &&
        typeof word.meaning === 'string'
      );

      if (validatedWords.length === 0) {
        throw new Error('No valid words found in response');
      }

      return validatedWords;
    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }
}
