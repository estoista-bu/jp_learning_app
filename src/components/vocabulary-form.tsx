"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const formSchema = z.object({
  japanese: z.string().min(1, "Japanese word is required."),
  reading: z.string().min(1, "Reading is required."),
  meaning: z.string().min(1, "Meaning is required."),
});

type VocabularyFormData = z.infer<typeof formSchema>;

interface VocabularyFormProps {
  onAddWord: (data: VocabularyFormData) => void;
}

export function VocabularyForm({ onAddWord }: VocabularyFormProps) {
  const { toast } = useToast();
  const form = useForm<VocabularyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      japanese: "",
      reading: "",
      meaning: "",
    },
  });

  function onSubmit(values: VocabularyFormData) {
    onAddWord(values);
    toast({
      title: "Success!",
      description: `The word "${values.japanese}" has been added to your vocabulary.`,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Add New Word</CardTitle>
        <CardDescription>
          Register a new Japanese word to your vocabulary list.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
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
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add Word
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
