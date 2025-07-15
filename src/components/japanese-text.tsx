
import type { JapaneseText as JapaneseTextType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JapaneseTextProps {
  text: JapaneseTextType;
  showFurigana?: boolean;
  className?: string;
}

export function JapaneseText({ text, showFurigana = false, className }: JapaneseTextProps) {
  return (
    <span className={cn("inline-flex flex-wrap items-end leading-loose", className)}>
      {text.map((segment, index) => {
        if (segment.furigana && showFurigana) {
          return (
            <ruby key={index} className="inline-flex flex-col-reverse text-center mx-[1px]">
              <rt className="text-xs text-muted-foreground select-none opacity-80 leading-none -mt-1">{segment.furigana}</rt>
              {segment.text}
            </ruby>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
}
