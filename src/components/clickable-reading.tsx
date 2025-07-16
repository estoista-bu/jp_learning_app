
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

export function ClickableReading({ japanese, reading, isBlock = false }: ClickableReadingProps) {
  // If no specific reading is provided, use the Japanese text itself.
  // This makes pure Hiragana and Katakana phrases clickable for consistency.
  const readingText = reading || japanese;

  const Wrapper = isBlock ? 'div' : 'span';

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
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
