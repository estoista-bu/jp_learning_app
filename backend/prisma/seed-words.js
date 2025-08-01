    // const { PrismaClient } = require('@prisma/client');
    // const words = require('../data/words');

    // const prisma = new PrismaClient();

    // async function main() {
    //   console.log('Start seeding words...');

    //   const allWords = words;

    //   // Create system user if it doesn't exist
    //   const systemUser = await prisma.user.upsert({
    //     where: { email: 'system@japanesemastery.app' },
    //     update: {},
    //     create: {
    //       email: 'system@japanesemastery.app',
    //       username: 'system',
    //       password: 'not-accessible',
    //       role: 'ADMIN',
    //     },
    //   });

    //   // Create JLPT decks if they don't exist
    //   const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    //   const decks = {};

    //   for (const level of jlptLevels) {
    //     const deck = await prisma.deck.upsert({
    //       where: { id: `jlpt-${level.toLowerCase()}` },
    //       update: {},
    //       create: {
    //         id: `jlpt-${level.toLowerCase()}`,
    //         name: `JLPT ${level} Vocabulary`,
    //         description: `Core vocabulary for the ${level} level.`,
    //         category: 'jlpt',
    //         isPublic: true,
    //         userId: systemUser.id
    //       }
    //     });
    //     decks[level] = deck;
    //     console.log(`Created/Updated deck: JLPT ${level}`);
    //   }

    //   // Import words and create deck relationships
    //   for (const word of allWords) {
    //     const jlptLevel = word.jlpt;
    //     if (!jlptLevel) continue;

    //     // Create or update word
    //     const createdWord = await prisma.word.upsert({
    //       where: { id: word.id },
    //       update: {
    //         japanese: word.japanese,
    //         reading: word.reading,
    //         meaning: word.meaning,
    //         jlptLevel: word.jlpt,
    //       },
    //       create: {
    //         id: word.id,
    //         japanese: word.japanese,
    //         reading: word.reading,
    //         meaning: word.meaning,
    //         jlptLevel: word.jlpt,
    //       },
    //     });

    //     // Create relationship with deck
    //     await prisma.deckWord.upsert({
    //       where: {
    //         deckId_wordId: {
    //           deckId: decks[jlptLevel].id,
    //           wordId: createdWord.id
    //         }
    //       },
    //       update: {},
    //       create: {
    //         deckId: decks[jlptLevel].id,
    //         wordId: createdWord.id
    //       }
    //     });

    //     console.log(`Imported word: ${word.japanese} (${word.reading})`);
    //   }

    //   console.log('Seeding completed.');
    // }

    // main()
    //   .catch((e) => {
    //     console.error(e);
    //     process.exit(1);
    //   })
    //   .finally(async () => {
    //     await prisma.$disconnect();
    //   });


