const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get all words in a deck
router.get('/:deckId/words', async (req, res) => {
  try {
    const { deckId } = req.params;

    const words = await prisma.word.findMany({
      where: {
        decks: {
          some: {
            deckId: deckId
          }
        }
      }
    });

    res.json({ data: words });
  } catch (error) {
    console.error('Error fetching deck words:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add words to a deck
router.post('/:deckId/words', async (req, res) => {
  try {
    const { deckId } = req.params;
    const { words } = req.body;

    const createdWords = [];

    for (const word of words) {
      // Create or update the word
      const createdWord = await prisma.word.upsert({
        where: { id: word.id || 'new-' + Math.random().toString(36).substr(2, 9) },
        update: {
          japanese: word.japanese || "",
          reading: word.reading || "",
          meaning: word.meaning || "",

        },
        create: {
          japanese: word.japanese || "",
          reading: word.reading || "",
          meaning: word.meaning || "",

          japanese: word.japanese || "",
        },
      });

      // Create relationship with deck
      await prisma.deckWord.create({
        data: {
          deckId: deckId,
          wordId: createdWord.id
        }
      });

      createdWords.push(createdWord);
    }

    res.status(201).json({ 
      message: 'Words added successfully',
      data: createdWords
    });

  } catch (error) {
    console.error('Error adding words to deck:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// GET /api/decks?userId=abc123
// GET /decks?userId=abc123
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const decks = await prisma.deck.findMany({
      where: { userId: userId.toString() },
    });
    res.json({ data: decks });
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST /api/decks
// router.post('/', async (req, res) => {
//   const { name, description, userId } = req.body;

//   if (!name || !userId) {
//     return res.status(400).json({ error: 'Missing required fields: userId and name' });
//   }

//   try {
//     const deck = await prisma.deck.create({
//       data: {
//         name,
//         description,
//         user: {
//           connect: { id: userId }
//         }
//       }
//     });

//     res.status(201).json(deck);
//   } catch (err) {
//     console.error('Failed to create deck:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// });



router.post('/', async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: 'Missing required fields: userId and name' });
    }

    const newDeck = await prisma.deck.create({
      data: {
        name,
        description,
        user: { connect: { id: userId } }
      }
    });

    res.status(201).json({ message: 'Deck created', data: newDeck });
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/decks/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.deck.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('Failed to delete deck:', error);
    res.status(500).json({ error: 'Failed to delete deck' });
  }
});


module.exports = router;
