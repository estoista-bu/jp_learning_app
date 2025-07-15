
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
import type { Deck } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(1, "Deck name is required."),
});

type DeckFormData = Omit<Deck, "id">;

interface DeckFormProps {
  onSaveDeck: (data: DeckFormData, id?: string) => void;
  deckToEdit: Deck | null;
}

export function DeckForm({ onSaveDeck, deckToEdit }: DeckFormProps) {
  const { toast } = useToast();
  const form = useForm<DeckFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (deckToEdit) {
      form.reset(deckToEdit);
    } else {
      form.reset({
        name: "",
      });
    }
  }, [deckToEdit, form]);

  function onSubmit(values: DeckFormData) {
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

    