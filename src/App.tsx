import UserInput from "./components/UserInput";
import AgentOutput from "./components/AgentOutput";
import { sanitizeInput, sendToAgent } from "./services/agentService";
import { useCallback, useState } from "react";

function App() {
  const [agentResponse, setAgentResponse] = useState("");

  const handleUserSubmit = useCallback(async (value: string) => {
    if (!value) return;
    try {
      const sanitizedInput = sanitizeInput(value);
      const result = await sendToAgent(sanitizedInput);
      setAgentResponse(result);
    } catch (err) {
      console.error(err);
      setAgentResponse("❌ Failed to generate PR description.");
    }
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">PR Agent</h1>
        <div className="columns">
          <div className="column is-half">
            <UserInput handleUserSubmit={handleUserSubmit} />
          </div>

          <div className="column is-half">
            <AgentOutput value={agentResponse} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
