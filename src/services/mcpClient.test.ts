import { test, expect } from "vitest";
import { invokeTool } from "./mcpClient";

describe("mcpClient", () => {
  test.skip("Hugging Face API responds to generate_pr", async () => {
    const reply = await invokeTool(
      "generate_pr",
      "Write a PR summary",
      "Hello World"
    );
    console.log("Response:", reply);
    expect(typeof reply).toBe("string");
    expect(reply.length).toBeGreaterThan(0);
  }, 60000); // ⏱️ 60 seconds timeout
});
