import { invokeTool } from "./mcpClient";
import { getUserPrompt, getSystemPrompt } from "../constants/prompts";

export function sanitizeInput(input: string): string {
  if (!input.trim()) return "";

  return input
    .replace(/\r\n/g, "\n") // normalize line endings
    .replace(/\t/g, " ") // tabs → spaces
    .replace(/ {2,}/g, " ") // collapse multiple spaces
    .split("\n")
    .map((line) => line.trimStart()) // ← remove leading indentation per line
    .join("\n")
    .trim(); // final cleanup
}

export async function sendToAgent(
  prDescription: string,
  gitDiff: string,
  notes: string
): Promise<string> {
  const userPrompt = getUserPrompt(prDescription, gitDiff, notes);
  const systemPrompt = getSystemPrompt();
  const reply = await invokeTool("generate_pr", systemPrompt, userPrompt);
  return reply;
}
