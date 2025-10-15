# PR Agent (MCP Client Demo)

## Overview

PR Agent is a Vite + React + TypeScript application demonstrating a lightweight **Model Context Protocol (MCP)** client that interacts with a **Large Language Model (LLM)** via the Hugging Face API to generate Pull Request descriptions. It was built as a **3-hour take-home challenge** to demonstrate architecture design, LLM integration, and clear engineering practices.

**Tech Stack:** React + Vite + TypeScript + Bulma + Vitest

---

## Quick Start / Setup

**Requirements:** Node.js 18+ and npm.

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your Hugging Face API token:
   ```
   VITE_HF_TOKEN=your_huggingface_api_token_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` to use the app.

---

## Architecture Overview

The app simulates a simple MCP client pipeline entirely in the frontend:

- **React UI**: Collects user input (ticket, diff, and notes) and displays LLM-generated PR descriptions.
- **Agent Service**: Sanitizes and validates user input, constructs the system prompt, and manages loading and error states.
- **MCP Client**: Sends structured prompts to the Hugging Face Zephyr model and handles its response.

Data flow:  
`User Input → Agent Service (Prompt Construction) → MCP Client → LLM → Response Rendered`

---

## How It Works

1. The user pastes the ticket description, git diff, and/or notes into the text box.
2. The **Agent Service** sanitizes input and builds the structured prompt.
3. The **MCP Client** calls the Hugging Face API using Zephyr-7B to generate a Markdown PR description.
4. The formatted response is displayed in the interface.

---

## Testing

The project uses **Vitest** and **React Testing Library** to validate:
- Component rendering and user interactions.
- Input sanitization logic and edge cases (e.g., empty or malformed input).
- API call structure (mocked network layer).

**Failure Scenarios Tested:**
- Empty or invalid input (handled gracefully).
- API timeouts or non-200 responses (user feedback displayed).
- Sanitization errors or undefined model responses (fallback messages provided).

**Future Testing Improvements:**
- Add integration tests with mocked MCP responses.
- Expand coverage for async error handling and user feedback.

---

## Security Considerations

- **API Token Handling:** Tokens are stored in `.env` and never exposed in the codebase.
- **XSS Protection:** User inputs are sanitized before being rendered or sent to the LLM. Additional sanitization layers could further reduce XSS risk across all components.
- **Network Security:** HTTPS enforced via the Hugging Face API.
- **Future Hardening:**
  - Move the LLM call server-side to hide tokens completely.
  - Implement rate limiting or abuse detection if exposed publicly.

---

## Performance & Scalability

- **Asynchronous Design:** API requests are handled via async/await to keep the UI responsive.
- **Lightweight Architecture:** Entirely static frontend; no backend dependencies.
- **Scaling Considerations:**
  - Could integrate streaming responses for large outputs.
  - Introduce caching or result persistence for repeated prompts.

---

## Caveats & Gotchas

- The app is stateless — it does not persist previous generations or conversation context.
- Free-tier Hugging Face API introduces latency and rate limits.
- Browser-side key storage (via `.env`) is insecure for production and should be proxied.

---

## Future Improvements

**Technical Enhancements**
- Replace direct API calls with a proper MCP backend.
- Add support for multiple LLM providers (OpenAI, Anthropic, local models).
- Stream model output for real-time feedback.
- Implement in-memory caching and retry logic.

**Developer Experience**
- Add lint-staged hooks for code quality.
- Improve input validation and better error surface in the UI.

**User Experience**
- Add persistent PR history.
- Display model latency metrics and response confidence.
- Sanitize user inputs immediately upon paste to improve UX and reduce unnecessary reprocessing when submitting.

---

## License / Acknowledgements

Powered by the [Hugging Face API](https://huggingface.co/docs/api-inference/index).  
Built as part of a coding assessment demonstrating practical use of MCP client design principles.
