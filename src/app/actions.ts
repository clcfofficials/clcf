"use server";

import { generateTheme } from "@/ai/flows/generate-theme";

export async function generateNewTheme() {
  try {
    const input = {
      baseColor: "#F0FAF4",
      primaryColor: "#77DD77",
      accentColor: "#90EE90",
      font: "PT Sans",
      layout: "responsive",
      iconography: "clear and concise icons",
      animation: "subtle transitions",
    };
    const result = await generateTheme(input);
    return result.themeVariation;
  } catch (error) {
    console.error("Error generating theme:", error);
    return `/* Error generating theme. Please check server logs. */`;
  }
}
