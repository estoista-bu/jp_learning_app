import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Return all words in a deck (flattened to word data only)
export async function GET(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const deckId = params.deckId;

  if (!deckId) {
    return NextResponse.json({ error: "Deck ID is required" }, { status: 400 });
  }

  try {
    console.log("[API] Fetching words for deck:", deckId);

    const deckWords = await db.deckWord.findMany({
      where: { deckId },
      include: { word: true },
    });

    console.log("[API] deckWords:", deckWords);

    const words = deckWords.map((entry) => ({
      id: entry.word.id,
      japanese: entry.word.japanese,
      reading: entry.word.reading,
      meaning: entry.word.meaning,
      jlptLevel: entry.word.jlptLevel,
      type: entry.word.type,
    }));

    console.log("[API] Flattened + cleaned words:", words);

    return NextResponse.json({ data: words });
  } catch (err: any) {
  console.error("🔥 Error in GET /words route:", err?.message, err?.stack);
  return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}


// POST: Add words to a deck (creates word if new)
export async function POST(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const deckId = params.deckId;
  const { words } = await req.json();

  if (!deckId || !Array.isArray(words)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    for (const word of words) {
      // Check if the word already exists by japanese + meaning
      let existing = await db.word.findFirst({
        where: {
          japanese: word.japanese,
          meaning: word.meaning,
        },
      });

      if (!existing) {
        existing = await db.word.create({
          data: {
            japanese: word.japanese,
            reading: word.reading ?? "",
            meaning: word.meaning,
            jlptLevel: word.jlptLevel ?? null,
            type: word.type ?? null,
          },
        });
      }

      // Check if the word is already linked to the deck
      const existingLink = await db.deckWord.findFirst({
        where: {
          deckId,
          wordId: existing.id,
        },
      });

      if (!existingLink) {
        await db.deckWord.create({
          data: {
            deckId,
            wordId: existing.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error adding words to deck:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
