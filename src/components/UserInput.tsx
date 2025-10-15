import { Status } from "../App";
import { useState } from "react";

interface UserInputProps {
  handleUserSubmit: (
    prDescription: string,
    gitDiff: string,
    notes: string
  ) => Promise<void>;
  status: Status;
}

export default function UserInput({
  handleUserSubmit,
  status,
}: UserInputProps) {
  const [prDescription, setPrDescription] = useState<string>("");
  const [gitDiff, setGitDiff] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  return (
    <>
      <h2 className="subtitle is-5">Your Input</h2>
      <div className="user-inputs">
        <div className="field">
          <textarea
            name="pr-description"
            id="pr-description"
            className={`textarea ${
              status === Status.CLIENT_ERROR ? "is-danger" : ""
            }`}
            placeholder="Paste ticket description here."
            onChange={(e) => setPrDescription(e.target.value)}
            disabled={status === Status.PENDING}
            rows={10}
          ></textarea>
        </div>
        <div className="field">
          <textarea
            name="git-diff"
            id="git-diff"
            className={`textarea ${
              status === Status.CLIENT_ERROR ? "is-danger" : ""
            }`}
            placeholder="Paste git diff here."
            onChange={(e) => setGitDiff(e.target.value)}
            disabled={status === Status.PENDING}
            rows={7}
          ></textarea>
        </div>
        <div className="field">
          <textarea
            name="notes"
            id="notes"
            className={`textarea ${
              status === Status.CLIENT_ERROR ? "is-danger" : ""
            }`}
            placeholder="Paste notes here."
            onChange={(e) => setNotes(e.target.value)}
            disabled={status === Status.PENDING}
            rows={3}
          ></textarea>
        </div>
      </div>

      <button
        className={`button is-link is-fullwidth mt-3 ${
          status === Status.PENDING ? "is-loading" : ""
        }`}
        onClick={() => handleUserSubmit(prDescription, gitDiff, notes)}
        disabled={status === Status.PENDING}
      >
        Generate PR Description
      </button>
    </>
  );
}
