'use server';

/**
 * @fileOverview Generates a theme variation based on the current theme configurations using GenAI.
 *
 * - generateTheme - A function that generates a theme variation.
 * - GenerateThemeInput - The input type for the generateTheme function.
 * - GenerateThemeOutput - The return type for the generateTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThemeInputSchema = z.object({
  baseColor: z.string().describe('The base color of the theme (e.g., #F0FAF4).'),
  primaryColor: z.string().describe('The primary color of the theme (e.g., #77DD77).'),
  accentColor: z.string().describe('The accent color of the theme (e.g., #90EE90).'),
  font: z.string().describe('The font to use for the theme (e.g., PT Sans).'),
  layout: z.string().describe('The layout style for the theme (e.g., responsive).'),
  iconography: z.string().describe('The iconography style for the theme (e.g., clear and concise icons).'),
  animation: z.string().describe('The animation style for the theme (e.g., subtle transitions).'),
});
export type GenerateThemeInput = z.infer<typeof GenerateThemeInputSchema>;

const GenerateThemeOutputSchema = z.object({
  themeVariation: z.string().describe('A string containing the generated theme variation in CSS format.'),
});
export type GenerateThemeOutput = z.infer<typeof GenerateThemeOutputSchema>;

export async function generateTheme(input: GenerateThemeInput): Promise<GenerateThemeOutput> {
  return generateThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThemePrompt',
  input: {schema: GenerateThemeInputSchema},
  output: {schema: GenerateThemeOutputSchema},
  prompt: `You are a skilled UI/UX designer. Generate a CSS theme variation based on the following configurations:\n\nBase Color: {{{baseColor}}}\nPrimary Color: {{{primaryColor}}}\nAccent Color: {{{accentColor}}}\nFont: {{{font}}}\nLayout: {{{layout}}}\nIconography: {{{iconography}}}\nAnimation: {{{animation}}}\n\nReturn the theme variation as a CSS string. Consider modern design principles and user experience best practices. Try to keep the response short. Focus on colors, typography and animations.\n`,
});

const generateThemeFlow = ai.defineFlow(
  {
    name: 'generateThemeFlow',
    inputSchema: GenerateThemeInputSchema,
    outputSchema: GenerateThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
