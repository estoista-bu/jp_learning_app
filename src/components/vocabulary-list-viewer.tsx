
"use client";

import type { VocabularyWord, WordMasteryStats } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ClickableReading } from "./clickable-reading";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface VocabularyListViewerProps {
  words: VocabularyWord[];
  onEdit: (word: VocabularyWord) => void;
  onRemove: (id: string) => void;
  onSelectWord: (word: VocabularyWord) => void;
  masteryStats: Record<string, WordMasteryStats>;
  masteryThreshold: number;
}

export function VocabularyListViewer({ words, onEdit, onRemove, onSelectWord, masteryStats, masteryThreshold }: VocabularyListViewerProps) {
  const [deletingWord, setDeletingWord] = useState<VocabularyWord | null>(null);

  const weightedAndSortedWords = useMemo(() => {
    const weighted = words.map(word => {
      const stats = masteryStats[word.id] || { correct: 0, incorrect: 0, weight: 1 };
      return { ...word, weight: stats.weight ?? 1 };
    });
    return weighted.sort((a, b) => b.weight - a.weight);
  }, [words, masteryStats]);

  const getWeightCategory = (weight: number): { label: 'Low' | 'Moderate' | 'High'; className: string } => {
    if (weight >= 100) {
      return { label: 'High', className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' };
    }
    if (weight >= 10) {
      return { label: 'Moderate', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' };
    }
    return { label: 'Low', className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' };
  };

  const handleConfirmRemove = (id: string) => {
    onRemove(id);
    setDeletingWord(null);
  };

  return (
    <>
      <ScrollArea className="flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Japanese</TableHead>
              <TableHead>Meaning</TableHead>
              <TableHead className="w-[100px]">Weight</TableHead>
              <TableHead className="w-[80px] text-center">
                 <Star className="h-4 w-4 inline-block" />
              </TableHead>
              <TableHead className="text-right w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weightedAndSortedWords.map((word) => {
              const isMastered = (masteryStats[word.id]?.correct || 0) >= masteryThreshold;
              const weightCategory = getWeightCategory(word.weight);
              return (
              <TableRow key={word.id} onClick={() => onSelectWord(word)} className="cursor-pointer">
                <TableCell className="font-medium">
                  <ClickableReading japanese={word.japanese} reading={word.reading} />
                </TableCell>
                <TableCell>{word.meaning}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("border-transparent", weightCategory.className)}>
                    {weightCategory.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {isMastered && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 inline-block" />}
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(word)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeletingWord(word)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </ScrollArea>

      <AlertDialog open={!!deletingWord} onOpenChange={() => setDeletingWord(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the word
              <span className="font-semibold text-foreground"> {deletingWord?.japanese}</span> from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleConfirmRemove(deletingWord!.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
