# PR Agent (MCP Client Demo)

## Overview

PR Agent is a Vite + React + TypeScript application demonstrating an MCP (Model Context Protocol) client that interacts directly with a Large Language Model (LLM) via the Hugging Face API to generate Pull Request descriptions. This project was built as a 3-hour take-home challenge to demonstrate understanding of MCP client design and LLM-driven automation.

**Tech Stack:** React + Vite + TypeScript + Bulma + Vitest

## Quick Start / Setup

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

## Architecture Overview

In this demo, both the Agent Service and MCP Client are implemented in the frontend to simulate the structure of a real agent pipeline.

- **React UI**: Provides the user interface for inputting code diffs or PR details and displaying the generated PR description.
- **Agent Service**: Processes and sanitizes user input, constructs prompts, and orchestrates communication between the UI and the MCP client.
- **MCP Client**: Handles direct communication with the Hugging Face LLM API, sending prompts and receiving generated content.

## How It Works

1. The user pastes the ticket description, code changes and/or personal notes into the "Your Input" textbox of the UI and clicks the action button.
2. The **agentService** sanitizes the input and builds a prompt tailored for the LLM.
3. The prompt is passed to the **mcpClient**, which sends it to the Hugging Face API.
4. The LLM generates a markdown-formatted Pull Request description.
5. The generated description is returned and displayed in the UI for the user.

## Testing

The project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing. Current tests focus on rendering components and snapshot testing to verify UI consistency.

## Considerations

- **Security**: API tokens are stored in environment variables and never exposed publicly.
- **Performance**: API calls are asynchronous; UI shows loading states to handle latency.
- **Failure Handling**: Basic error handling is implemented for API failures, with user feedback.

## Caveats & Gotchas

- The app is stateless; no persistence of conversation or generated data.
- Using the free-tier Hugging Face API may introduce latency and rate limits.
- No caching or retry logic is currently implemented.

## Future Improvements

**Technical**
- Integrate a real MCP agent with multiple tools.
- Implement streaming and conversation memory.

**UX**
- Sidebar for past conversations and history.
- Improved Bulma styling and progress feedback.

**Integration**
- Connect to GitHub and ticketing APIs.

## License / Acknowledgements

Powered by the [Hugging Face API](https://huggingface.co/docs/api-inference/index).
