import "./styles.css";

export default function AgentOutput() {
  return (
    <>
      <h2 className="subtitle is-5">Agent Output</h2>
      <textarea
        name="agentOutput"
        id="agentOutput"
        className="textarea"
        placeholder="The LLM's output will be here..."
        readOnly
      ></textarea>
    </>
  );
}
