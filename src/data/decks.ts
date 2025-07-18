
import type { Deck } from "@/lib/types";

export const allDecks: Deck[] = [
  { id: "1", name: "Greetings", description: "Essential phrases for everyday interactions.", category: "user" },
  { id: "2", name: "Food", description: "Vocabulary for ordering at restaurants and talking about food.", category: "user" },
  { id: "3", name: "Travel", description: "Words and phrases for navigating Japan.", category: "user" },
  { id: "hiragana", name: "Hiragana", description: "The basic Japanese phonetic script.", category: "kana" },
  { id: "katakana", name: "Katakana", description: "Phonetic script for foreign words.", category: "kana" },
];
