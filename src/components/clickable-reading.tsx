
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as wanakana from 'wanakana';

interface ClickableReadingProps {
  japanese: string;
  reading?: string;
  isBlock?: boolean;
}

export function ClickableReading({ japanese, reading, isBlock = false }: ClickableReadingProps) {
  // If no specific reading is provided, use the Japanese text itself.
  // This makes pure Hiragana and Katakana phrases clickable for consistency.
  const readingText = reading || japanese;

  const Wrapper = isBlock ? 'div' : 'span';

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  // Only make the text clickable if it contains Kana.
  const containsKana = wanakana.isHiragana(japanese) || wanakana.isKatakana(japanese) || wanakana.isKanji(wanakana.stripOkurigana(japanese, { leading: true }));
  
  if (!containsKana) {
    return <Wrapper className="inline">{japanese}</Wrapper>;
  }


  return (
     <Wrapper className="inline" onClick={stopPropagation}>
        <Popover>
            <PopoverTrigger asChild>
                <span className="cursor-pointer hover:text-primary">
                    {japanese}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <p className="text-sm font-semibold text-accent">{readingText}</p>
            </PopoverContent>
        </Popover>
     </Wrapper>
  );
}
