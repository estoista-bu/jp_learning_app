
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { VocabularyWord } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  japanese: z.string().min(1, "Japanese word is required."),
  reading: z.string().min(1, "Reading is required."),
  meaning: z.string().min(1, "Meaning is required."),
});

type VocabularyFormData = Omit<VocabularyWord, "id" | "deckId">;

interface VocabularyFormProps {
  onSaveWord: (data: VocabularyFormData, id?: string) => void;
  wordToEdit: VocabularyWord | null;
  deckId: string;
}

interface JishoResult {
  japanese: { word?: string; reading?: string }[];
  senses: { english_definitions: string[] }[];
}

export function VocabularyForm({ onSaveWord, wordToEdit, deckId }: VocabularyFormProps) {
  const { toast } = useToast();
  const form = useForm<VocabularyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      japanese: "",
      reading: "",
      meaning: "",
    },
  });

  const [suggestions, setSuggestions] = useState<JishoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const japaneseValue = useWatch({ control: form.control, name: 'japanese' });

  const fetchSuggestions = useCallback(async (keyword: string) => {
    if (keyword.length < 1) {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jisho?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      if (data.data) {
        setSuggestions(data.data);
        setIsSuggestionsOpen(true);
      } else {
        setSuggestions([]);
        setIsSuggestionsOpen(false);
      }
    } catch (error) {
      console.error("Failed to fetch Jisho suggestions", error);
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (wordToEdit || !japaneseValue) {
      setIsSuggestionsOpen(false);
      return;
    };
    
    const handler = setTimeout(() => {
      fetchSuggestions(japaneseValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [japaneseValue, fetchSuggestions, wordToEdit]);

  useEffect(() => {
    if (wordToEdit) {
      form.reset(wordToEdit);
    } else {
      form.reset({
        japanese: "",
        reading: "",
        meaning: "",
      });
    }
  }, [wordToEdit, form]);

  function onSubmit(values: VocabularyFormData) {
    onSaveWord(values, wordToEdit?.id);
    toast({
      title: "Success!",
      description: `The word "${values.japanese}" has been ${wordToEdit ? 'updated' : 'added'}.`,
    });
    form.reset();
    setIsSuggestionsOpen(false);
  }

  const handleSuggestionClick = (result: JishoResult) => {
    const japanese = result.japanese[0]?.word || result.japanese[0]?.reading || "";
    const reading = result.japanese[0]?.reading || "";
    const meaning = result.senses[0]?.english_definitions.join(', ') || "";
    form.setValue("japanese", japanese, { shouldValidate: true });
    form.setValue("reading", reading, { shouldValidate: true });
    form.setValue("meaning", meaning, { shouldValidate: true });
    setIsSuggestionsOpen(false);
    setSuggestions([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="relative">
          <FormField
            control={form.control}
            name="japanese"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Japanese Word (Kanji, etc.)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="例えば: 日本語" 
                    {...field} 
                    autoComplete="off"
                    onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 150)}
                    onFocus={() => { if(suggestions.length > 0) setIsSuggestionsOpen(true) }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSuggestionsOpen && (
            <Card className="absolute z-10 w-full mt-1 bg-background shadow-lg max-h-60 overflow-y-auto">
              <ScrollArea className="h-full">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(result);
                      }}
                    >
                      <p className="font-semibold">{result.japanese[0]?.word || result.japanese[0]?.reading}</p>
                      <p className="text-sm text-muted-foreground">{result.senses[0]?.english_definitions.join(', ')}</p>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">No results found.</p>
                )}
              </ScrollArea>
            </Card>
          )}
        </div>
        <FormField
          control={form.control}
          name="reading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reading (Hiragana/Katakana)</FormLabel>
              <FormControl>
                <Input placeholder="例えば: にほんご" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meaning"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meaning</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Japanese language" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Word"}
        </Button>
      </form>
    </Form>
  );
}
