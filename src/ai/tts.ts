
'use server';
/**
 * @fileOverview Text-to-Speech (TTS) flow using Genkit.
 *
 * - generateSpeech - A function that converts Japanese text to speech audio.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from 'genkit/plugins/googleai';
import { z } from 'zod';
import wav from 'wav';

if (process.env.NODE_ENV !== 'production') {
  const { genkitDev } = await import('genkit/dev');
  genkitDev({
    // To disable the Genkit dev UI, set this to false
    enabled: true,
  });
}

ai.use(googleAI({ apiVersion: 'v1' }));


const ttsFlow = ai.defineFlow(
  {
    name: 'ttsFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (text) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });
    if (!media) {
      throw new Error('No media returned from TTS model.');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavData = await toWav(audioBuffer);
    return `data:audio/wav;base64,${wavData}`;
  }
);


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

export async function generateSpeech(text: string): Promise<string> {
    return ttsFlow(text);
}
