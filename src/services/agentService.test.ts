import { describe, test, expect } from "vitest";
import { sanitizeInput } from "./agentService";

describe("agentService", () => {
  describe("sanitizeInput()", () => {
    test("cleans up ticket descriptions with extra spaces and newlines", () => {
      const raw = `
      Implement login page

      This PR adds login UI
        and fixes   spacing issues.
    `;
      const cleaned = sanitizeInput(raw);
      expect(cleaned).toBe(
        `Implement login page

This PR adds login UI
and fixes spacing issues.`
      );
    });

    test("flattens multi-line git diff content without removing code", () => {
      const diff = `
      diff --git a/app.js b/app.js
      + const  a   =  1;
      -const   b=2;
    `;
      const cleaned = sanitizeInput(diff);
      expect(cleaned).toBe(
        `diff --git a/app.js b/app.js
+ const a = 1;
-const b=2;`
      );
    });

    test("handles messy notes with tabs, newlines, and indentation", () => {
      const notes = `
        TODO:\tRefactor component
        - \t   Move logic to hooks
        - Add tests
    `;
      const cleaned = sanitizeInput(notes);
      expect(cleaned).toBe(
        `TODO: Refactor component
- Move logic to hooks
- Add tests`
      );
    });

    test("returns empty string if input is only whitespace", () => {
      expect(sanitizeInput("     \n\t ")).toBe("");
    });

    test("handles complex, multi-paragraph ticket with bullet points and markdown-like formatting", () => {
      const raw = `
      **Feature:** Add dark mode support

      As a user, I want to toggle between light and dark themes
      so that I can reduce eye strain in low-light conditions.

      **Acceptance Criteria:**
      - Add a "Theme" option in user settings
      - Persist theme preference in localStorage
      - Update global styles to reflect selected theme

      **Notes:**
      - Requires updates in themeContext.tsx
      - QA to verify colors against design tokens
  `;

      const cleaned = sanitizeInput(raw);

      // Expect no double spaces, tabs converted, no trimming of paragraphs
      expect(cleaned).toBe(
        `**Feature:** Add dark mode support

As a user, I want to toggle between light and dark themes
so that I can reduce eye strain in low-light conditions.

**Acceptance Criteria:**
- Add a "Theme" option in user settings
- Persist theme preference in localStorage
- Update global styles to reflect selected theme

**Notes:**
- Requires updates in themeContext.tsx
- QA to verify colors against design tokens`
      );
    });
  });
});
