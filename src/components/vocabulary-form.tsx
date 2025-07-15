
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  japanese: z.string().min(1, "Japanese word is required."),
  reading: z.string().min(1, "Reading is required."),
  meaning: z.string().min(1, "Meaning is required."),
});

type VocabularyFormData = Omit<VocabularyWord, "id">;

interface VocabularyFormProps {
  onSaveWord: (data: VocabularyFormData, id?: string) => void;
  wordToEdit: VocabularyWord | null;
}

export function VocabularyForm({ onSaveWord, wordToEdit }: VocabularyFormProps) {
  const { toast } = useToast();
  const form = useForm<VocabularyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      japanese: "",
      reading: "",
      meaning: "",
    },
  });

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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="japanese"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Japanese Word (Kanji, etc.)</FormLabel>
              <FormControl>
                <Input placeholder="例えば: 日本語" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
