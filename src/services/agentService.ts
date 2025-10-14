import { invokeTool } from "./mcpClient";

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

export async function sendToAgent(userText: string): Promise<string> {
  const clean = sanitizeInput(userText);
  if (!clean) {
    throw new Error("Empty input. Please provide details.");
  }

  const systemPrompt = `
You are a senior frontend engineer writing clear, concise, and professional Pull Request descriptions in Markdown.
Structure:
## Summary
## Changes
## Risks & Rollback
## Checklist
`.trim();

  const fullPrompt = `${systemPrompt}\n\nUser Input:\n${clean}`;

  try {
    const reply = await invokeTool("generate_pr", { text: fullPrompt });
    return reply;
  } catch (err) {
    console.error("Agent error:", err);
    return "❌ Error: Agent unavailable.";
  }
}
