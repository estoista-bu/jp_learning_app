import { PrismaClient } from '@prisma/client';
import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs/promises';


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Paths to word files
// const wordPaths = [
//   '../../src/data/n1-words.ts',
//   '../../src/data/n2-words.ts',
//   '../../src/data/n3-words.ts',
//   '../../src/data/n4-words.ts',
//   '../../src/data/n5-words.ts',
// ];
const wordPaths = [
  '../../build-data/n1-words.js',
  '../../build-data/n2-words.js',
  '../../build-data/n3-words.js',
  '../../build-data/n4-words.js',
  '../../build-data/n5-words.js',
];

async function loadWords() {
  const allWords = [];

  for (const relPath of wordPaths) {
    const absPath = path.resolve(import.meta.dirname, relPath); // 👈 NOTE: __dirname won't work in ESM
    const fileUrl = pathToFileURL(absPath).href;
    const mod = await import(fileUrl);
    const wordsArray = Object.values(mod).find((val) => Array.isArray(val));
    if (!wordsArray) {
      console.warn(`⚠️ No array export found in: ${relPath}`);
      continue;
    }
    allWords.push(...wordsArray);
  }

  return allWords;
}

const defaultDecks = [
  { id: "1", name: "Greetings", description: "Essential phrases for everyday interactions.", category: "user", isPublic: true },
  { id: "2", name: "Food", description: "Vocabulary for ordering at restaurants and talking about food.", category: "user", isPublic: true },
  { id: "3", name: "Travel", description: "Words and phrases for navigating Japan.", category: "user", isPublic: true },
  { id: "jlpt-n5", name: "JLPT N5 Vocabulary", description: "Core vocabulary for the N5 level.", category: "jlpt", isPublic: true },
  { id: "jlpt-n4", name: "JLPT N4 Vocabulary", description: "Essential vocabulary for the N4 level.", category: "jlpt", isPublic: true },
  { id: "jlpt-n3", name: "JLPT N3 Vocabulary", description: "A comprehensive list of JLPT N3 vocabulary words.", category: "jlpt", isPublic: true },
  { id: "jlpt-n2", name: "JLPT N2 Vocabulary", description: "A comprehensive list of JLPT N2 vocabulary words.", category: "jlpt", isPublic: true },
  { id: "jlpt-n1", name: "JLPT N1 Vocabulary", description: "A comprehensive list of JLPT N1 vocabulary words.", category: "jlpt", isPublic: true },
  { id: "hiragana", name: "Hiragana", description: "The basic Japanese phonetic script.", category: "kana", isPublic: true },
  { id: "katakana", name: "Katakana", description: "Phonetic script for foreign words.", category: "kana", isPublic: true },
];

async function main() {
  console.log('⛩️  Starting seed...');

  const systemUser = await prisma.user.upsert({
    where: { email: 'system@japanesemastery.app' },
    update: {},
    create: {
      email: 'system@japanesemastery.app',
      username: 'system',
      password: 'not-accessible',
      role: 'ADMIN',
    },
  });

  const decks: Record<string, any> = {};
  for (const deck of defaultDecks) {
    const created = await prisma.deck.upsert({
      where: { id: deck.id },
      update: {},
      create: {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        isPublic: deck.isPublic,
        category: deck.category,
        userId: systemUser.id,
      },
    });
    decks[deck.id] = created;
    console.log(`📘 Ensured deck: ${deck.name}`);
  }

  const allWords = await loadWords();

  for (const word of allWords) {
    const jlptLevel = word.jlpt;
    if (!jlptLevel) continue;

    const deckId = `jlpt-${jlptLevel.toLowerCase()}`;

    const createdWord = await prisma.word.upsert({
      where: { id: word.id },
      update: {
        japanese: word.japanese,
        reading: word.reading,
        meaning: word.meaning,
        jlptLevel: word.jlpt,
      },
      create: {
        id: word.id,
        japanese: word.japanese,
        reading: word.reading,
        meaning: word.meaning,
        jlptLevel: word.jlpt,
      },
    });

    await prisma.deckWord.upsert({
      where: {
        deckId_wordId: {
          deckId,
          wordId: createdWord.id,
        },
      },
      update: {},
      create: {
        deckId,
        wordId: createdWord.id,
      },
    });

    console.log(`🌸 Imported: ${word.japanese} (${word.reading})`);
  }

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error('🔥 Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
