"use server";

/**
 * @fileOverview This file defines a Genkit flow for suggesting layout improvements based on screen size and existing content.
 *
 * @exports suggestLayoutImprovements - An async function that takes layout information and screen size as input and returns AI-powered layout improvement suggestions.
 * @exports SuggestLayoutImprovementsInput - The input type for the suggestLayoutImprovements function.
 * @exports SuggestLayoutImprovementsOutput - The output type for the suggestLayoutImprovements function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SuggestLayoutImprovementsInputSchema = z.object({
  screenSize: z
    .string()
    .describe("The current screen size (e.g., mobile, tablet, desktop)."),
  existingContent: z
    .string()
    .describe(
      "A description of the existing layout content, including components used and their arrangement."
    ),
});
export type SuggestLayoutImprovementsInput = z.infer<
  typeof SuggestLayoutImprovementsInputSchema
>;

const SuggestLayoutImprovementsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      "An array of layout improvement suggestions for the given screen size and content."
    ),
});
export type SuggestLayoutImprovementsOutput = z.infer<
  typeof SuggestLayoutImprovementsOutputSchema
>;

export async function suggestLayoutImprovements(
  input: SuggestLayoutImprovementsInput
): Promise<SuggestLayoutImprovementsOutput> {
  return suggestLayoutImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: "suggestLayoutImprovementsPrompt",
  input: { schema: SuggestLayoutImprovementsInputSchema },
  output: { schema: SuggestLayoutImprovementsOutputSchema },
  prompt: `You are an AI Layout Assistant that helps users optimize their layouts for different screen sizes.
  Based on the current screen size and the existing content, provide a list of specific and actionable layout improvement suggestions.
  Screen Size: {{{screenSize}}}
  Existing Content: {{{existingContent}}}
  Suggestions:`, // Ensure the suggestions are clear and concise.
});

const suggestLayoutImprovementsFlow = ai.defineFlow(
  {
    name: "suggestLayoutImprovementsFlow",
    inputSchema: SuggestLayoutImprovementsInputSchema,
    outputSchema: SuggestLayoutImprovementsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
