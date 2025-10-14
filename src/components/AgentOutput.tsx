import "./styles.css";

type AgentOutputProps = {
  value: string;
};

export default function AgentOutput({ value }: AgentOutputProps) {
  return (
    <>
      <h2 className="subtitle is-5">Agent Output</h2>
      <textarea
        name="agentOutput"
        id="agentOutput"
        className="textarea"
        placeholder="Nothing yet. Generate a PR description to see it here."
        value={value}
        readOnly
      />
    </>
  );
}
