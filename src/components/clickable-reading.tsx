
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ClickableReadingProps {
  japanese: string;
  reading?: string;
  isBlock?: boolean;
}

export function ClickableReading({ japanese, reading, isBlock = true }: ClickableReadingProps) {
  // Don't make it clickable if there's no reading or if it's identical to the Japanese text
  // (which happens for Katakana or pure Hiragana phrases)
  if (!reading || japanese === reading) {
    return <span>{japanese}</span>;
  }
  
  const Wrapper = isBlock ? 'div' : 'span';

  return (
     <Wrapper className="inline">
        <Popover>
            <PopoverTrigger asChild>
                <span className="cursor-pointer border-b border-dashed border-primary/50 hover:border-primary">
                    {japanese}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <p className="text-sm font-semibold text-accent">{reading}</p>
            </PopoverContent>
        </Popover>
     </Wrapper>
  );
}
