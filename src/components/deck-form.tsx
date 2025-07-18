
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Deck } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(1, "Deck name is required."),
  description: z.string().optional(),
});

type DeckFormData = Omit<Deck, "id" | "category" | "groupId">;

interface DeckFormProps {
  onSaveDeck: (data: DeckFormData, id?: string) => void;
  deckToEdit: Deck | null;
}

export function DeckForm({ onSaveDeck, deckToEdit }: DeckFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (deckToEdit) {
      form.reset({
        name: deckToEdit.name,
        description: deckToEdit.description || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [deckToEdit, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSaveDeck(values, deckToEdit?.id);
    toast({
      title: "Success!",
      description: `The deck "${values.name}" has been ${deckToEdit ? 'updated' : 'created'}.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deck Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Japanese Greetings" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="What is this deck about?" {...field} />
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
          {form.formState.isSubmitting ? "Saving..." : "Save Deck"}
        </Button>
      </form>
    </Form>
  );
}
