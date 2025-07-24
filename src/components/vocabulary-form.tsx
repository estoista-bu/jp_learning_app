
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { VocabularyWord, WordGenerationOutput } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Sparkles } from "lucide-react";
import { generateWords } from "@/ai/flows/generate-words-flow";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";

const formSchema = z.object({
  japanese: z.string().min(1, "Japanese word is required."),
  reading: z.string().min(1, "Reading is required."),
  meaning: z.string().min(1, "Meaning is required."),
});

type VocabularyFormData = Omit<VocabularyWord, "id" | "deckId">;

interface VocabularyFormProps {
  onSaveWords: (data: VocabularyFormData[], id?: string) => void;
  wordToEdit: VocabularyWord | null;
  deckId: string;
  deckName: string;
  existingWords: string[];
}

interface JishoResult {
  japanese: { word?: string; reading?: string }[];
  senses: { english_definitions: string[] }[];
  jlpt?: string[];
}

export function VocabularyForm({ onSaveWords, wordToEdit, deckId, deckName, existingWords }: VocabularyFormProps) {
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
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<WordGenerationOutput['words']>([]);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [numWordsToGenerate, setNumWordsToGenerate] = useState(5);
  const [autoAddWords, setAutoAddWords] = useState(false);


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
    onSaveWords([values], wordToEdit?.id);
    form.reset();
    setIsSuggestionsOpen(false);
    setAiSuggestions([]);
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
  
  const handleAiSuggestionClick = (word: { japanese: string; reading: string; meaning: string; }) => {
    form.setValue("japanese", word.japanese, { shouldValidate: true });
    form.setValue("reading", word.reading, { shouldValidate: true });
    form.setValue("meaning", word.meaning, { shouldValidate: true });
    setAiSuggestions([]);
  };
  
  const handleGenerateWords = async () => {
    setIsGenerateDialogOpen(false);
    setIsGenerating(true);
    setAiSuggestions([]);
    try {
        const result = await generateWords({ 
          deckName, 
          existingWords, 
          numWords: numWordsToGenerate 
        });

        if (autoAddWords) {
          onSaveWords(result.words);
        } else {
          setAiSuggestions(result.words);
        }

    } catch (error) {
        console.error("AI Word generation failed", error);
        toast({
            title: "Generation Failed",
            description: "Could not generate words. Please try again.",
            variant: "destructive"
        })
    } finally {
        setIsGenerating(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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

        {!wordToEdit && (
            <div className="space-y-2">
                 <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full"
                            disabled={isGenerating}
                        >
                             {isGenerating ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4 text-accent"/>
                            )}
                            Generate with AI
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Generate Words</DialogTitle>
                            <DialogDescription>
                                How many new words would you like to generate for the deck "{deckName}"?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                           <div>
                                <Label htmlFor="numWords">Number of words (1-100)</Label>
                                <Input
                                    id="numWords"
                                    type="text"
                                    inputMode="numeric"
                                    value={numWordsToGenerate}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        setNumWordsToGenerate(Math.max(1, Math.min(100, parseInt(value, 10) || 1)))
                                    }}
                                    className="mt-2"
                                />
                           </div>
                           <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="autoAdd" 
                                    checked={autoAddWords} 
                                    onCheckedChange={(checked) => setAutoAddWords(!!checked)}
                                />
                                <Label
                                    htmlFor="autoAdd"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Add to deck automatically
                                </Label>
                           </div>
                           <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300 [&>svg]:text-orange-600">
                             <AlertDescription className="text-xs">
                                AI can make mistakes, please confirm with external source if unsure.
                             </AlertDescription>
                           </Alert>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                               <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleGenerateWords}>
                                Generate
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                 </Dialog>

                {isGenerating && (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <p className="text-muted-foreground">Generating...</p>
                    </div>
                )}
                
                {aiSuggestions.length > 0 && (
                     <Card className="p-2">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 px-1">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                            {aiSuggestions.map((word, i) => (
                                <Button key={i} type="button" variant="secondary" size="sm" onClick={() => handleAiSuggestionClick(word)}>
                                    {word.japanese}
                                </Button>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        )}
        
        <Button
          type="submit"
          className="w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={form.formState.isSubmitting || isGenerating}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Word"}
        </Button>
      </form>
    </Form>
  );
}
