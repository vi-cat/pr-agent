import UserInput from "./components/UserInput";
import AgentOutput from "./components/AgentOutput";
import { sanitizeInput, sendToAgent } from "./services/agentService";
import { useCallback, useState } from "react";

export const Status = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
  CLIENT_ERROR: "CLIENT_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface UserData {
  prDescription: string;
  gitDiff: string;
  notes: string;
}

function App() {
  const [agentResponse, setAgentResponse] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const handleUserSubmit = useCallback(
    async (prDescription: string, gitDiff: string, notes: string) => {
      if (!prDescription) return;

      try {
        setStatus(Status.PENDING);
        prDescription = sanitizeInput(prDescription);
        gitDiff = sanitizeInput(gitDiff);
        notes = sanitizeInput(notes);
      } catch (err) {
        console.error(err);
        setAgentResponse(
          "❌ Failed to generate PR description. Please review your inputs and try again."
        );
        setStatus(Status.CLIENT_ERROR);
      }

      try {
        const result = await sendToAgent(prDescription, gitDiff, notes);
        setAgentResponse(result);
        setStatus(Status.COMPLETE);
      } catch (err) {
        console.error(err);
        setAgentResponse(
          "❌ Failed to generate PR description. Please try again."
        );
        setStatus(Status.SERVER_ERROR);
      }
    },
    []
  );

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">PR Agent</h1>
        <div className="columns">
          <div className="column is-half">
            <UserInput handleUserSubmit={handleUserSubmit} status={status} />
          </div>

          <div className="column is-half">
            <AgentOutput value={agentResponse} status={status} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
