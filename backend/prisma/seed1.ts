import { PrismaClient } from '@prisma/client';
import n1 from '../../src/data/n1-words';
import n2 from '../../src/data/n2-words';
import n3 from '../../src/data/n3-words';
import n4 from '../../src/data/n4-words';
import n5 from '../../src/data/n5-words';


const prisma = new PrismaClient();
const allWords = [...n1, ...n2, ...n3, ...n4, ...n5];

async function main() {
  console.log('Start seeding words...');

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

  const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const decks: Record<string, any> = {};

  for (const level of jlptLevels) {
    const deck = await prisma.deck.upsert({
      where: { id: `jlpt-${level.toLowerCase()}` },
      update: {},
      create: {
        id: `jlpt-${level.toLowerCase()}`,
        name: `JLPT ${level} Vocabulary`,
        description: `Core vocabulary for the ${level} level.`,
        category: 'jlpt',
        isPublic: true,
        userId: systemUser.id,
      },
    });
    decks[level] = deck;
    console.log(`Created/Updated deck: JLPT ${level}`);
  }

  for (const word of allWords) {
    const jlptLevel = word.jlpt;
    if (!jlptLevel) continue;

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
          deckId: decks[jlptLevel].id,
          wordId: createdWord.id,
        },
      },
      update: {},
      create: {
        deckId: decks[jlptLevel].id,
        wordId: createdWord.id,
      },
    });

    console.log(`Imported word: ${word.japanese} (${word.reading})`);
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
