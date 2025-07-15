import type { VocabularyWord } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flashcard } from "@/components/flashcard";

interface VocabularyCarouselProps {
  words: VocabularyWord[];
  onRemoveWord: (id: string) => void;
}

export function VocabularyCarousel({ words, onRemoveWord }: VocabularyCarouselProps) {
  if (words.length === 0) {
    return null;
  }
  
  return (
    <Carousel 
      className="w-full h-full flex items-center justify-center"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="-ml-1">
        {words.map((word) => (
          <CarouselItem key={word.id} className="pl-1">
            <div className="p-4 md:p-6 h-full flex items-center justify-center">
              <Flashcard
                word={word}
                onRemove={() => onRemoveWord(word.id)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
