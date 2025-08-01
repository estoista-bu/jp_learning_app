import { NextResponse } from 'next/server';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Gemini or Google API key is missing in server environment");
}

const ai = genkit({
  plugins: [
    googleAI({ apiKey }),
  ],
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sentence, level } = body;
    
    const prompt = `Generate a Japanese sentence at JLPT ${level} level that is similar to: "${sentence}". Return a JSON object with: japanese (the sentence in Japanese), reading (hiragana reading), translation (English translation), and notes (any relevant grammar points).`;

    const result = await ai.generate(prompt);
    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error('Sentence generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate sentence' },
      { status: 500 }
    );
  }
}
