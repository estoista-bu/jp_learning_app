"use client";

import { useEffect, useState } from 'react';
import type { VocabularyWord } from "@/lib/types";
import { getDeckWords } from '@/lib/api';

interface Props {
  deckId: string;
  words?: VocabularyWord[];
  onWordSelect?: (word: VocabularyWord) => void;
}

export function DeckWordsViewer({ deckId, onWordSelect }: Props) {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await getDeckWords(deckId);
        if (response.error) {
          setError(response.error);
        } else {
          setWords(response.data || []);
        }
      } catch (err) {
        setError('Failed to fetch words');
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [deckId]);

  if (loading) return <div>Loading words...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!words.length) return <div>No words in this deck yet.</div>;

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th>Japanese</th>
            <th>Reading</th>
            <th>Meaning</th>
            {onWordSelect && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td>{word.japanese}</td>
              <td>{word.reading}</td>
              <td>{word.meaning}</td>
              {onWordSelect && (
                <td>
                  <button onClick={() => onWordSelect(word)}>Select</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
