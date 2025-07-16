
"use client";

import { ClickableReading } from "./clickable-reading";
import { cn } from "@/lib/utils";

interface JapaneseTextProps {
  text: string;
  reading?: string;
  isBlock?: boolean;
}

export function JapaneseText({ text, reading, isBlock = false }: JapaneseTextProps) {
  // Regex to find Japanese parts of the text. This will match sequences of
  // Japanese characters, or sequences of non-Japanese characters.
  const regex = /([\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+|[^\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+)/g;
  const segments = text.match(regex) || [text];
  const japaneseRegex = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;

  const Wrapper = isBlock ? "div" : "span";

  return (
    <Wrapper className={cn(isBlock ? "block" : "inline")}>
      {segments.map((segment, index) => {
        if (japaneseRegex.test(segment)) {
          // If the segment contains Japanese, wrap it with ClickableReading.
          // The reading prop is passed for the entire phrase.
          return (
            <ClickableReading
              key={index}
              japanese={segment}
              reading={reading}
            />
          );
        } else {
          // If it's just English text, render it as a simple span.
          return <span key={index}>{segment}</span>;
        }
      })}
    </Wrapper>
  );
}
