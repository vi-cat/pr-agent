import { Status } from "../App";
import "./AgentOutput.css";

type AgentOutputProps = {
  value: string;
  status: Status;
};

export default function AgentOutput({ value, status }: AgentOutputProps) {
  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <>
      <h2 className="subtitle is-5">Agent Output</h2>
      <div className="agent-output">
        <textarea
          name="agentOutput"
          id="agentOutput"
          className={`textarea agent-output ${
            status === Status.SERVER_ERROR ? "is-danger" : ""
          }`}
          placeholder="Nothing yet. Generate a PR description to see it here."
          value={value}
          rows={23}
          readOnly
        />
        {status === Status.COMPLETE && (
          <button className="button is-info btn-copy" onClick={copyOutput}>
            Copy
          </button>
        )}
      </div>
    </>
  );
}
