"use server";

import { suggestLayoutImprovements } from "@/ai/flows/personal-assistance";
import { z } from "zod";

const inputSchema = z.object({
  existingContent: z.string(),
});

export async function getLayoutSuggestionsAction(input: {
  existingContent: string;
}) {
  try {
    const validatedInput = inputSchema.parse(input);
    const result = await suggestLayoutImprovements({
      screenSize: "desktop", // The builder is optimized for desktop
      existingContent: validatedInput.existingContent,
    });
    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}
