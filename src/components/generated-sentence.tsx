
'use client';

import { Loader2 } from 'lucide-react';
import type { SentenceGenerationOutput } from '@/lib/types';
import { ClickableReading } from './clickable-reading';

interface GeneratedSentenceProps {
  sentence: SentenceGenerationOutput | null;
  isLoading: boolean;
}

export function GeneratedSentence({ sentence, isLoading }: GeneratedSentenceProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-2 text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span>Generating...</span>
      </div>
    );
  }

  if (!sentence) {
    return (
        <p className="text-xs text-center text-muted-foreground p-2">
          Generate an example sentence
        </p>
    );
  }

  return (
    <div className="text-center p-2 space-y-1 animate-in fade-in">
      <p className="font-semibold text-lg">
        <ClickableReading
            japanese={sentence.sentence}
            reading={sentence.reading}
        />
      </p>
      <p className="text-sm text-muted-foreground italic">
        {sentence.translation}
      </p>
    </div>
  );
}
