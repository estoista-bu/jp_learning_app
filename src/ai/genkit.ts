import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

let aiInstance: any = null;

export function initializeAI() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  
  console.log('Environment variables:', {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Not set',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? 'Set' : 'Not set'
  });

  // Use the hardcoded key if environment variables are not set
  const finalApiKey = apiKey || 'AIzaSyDYgC0e6fQ1k7Qj-KeFls9eOFURM8q9Ev8';

  if (!aiInstance) {
    aiInstance = genkit({
      plugins: [
        googleAI({ apiKey: finalApiKey }),
      ],
    });
  }

  return aiInstance;
}

export const ai = initializeAI();
