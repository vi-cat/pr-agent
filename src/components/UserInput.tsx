import "./styles.css";
import { useState } from "react";

interface UserInputProps {
  handleUserSubmit: (input: string) => void;
}

export default function UserInput({ handleUserSubmit }: UserInputProps) {
  const [value, setValue] = useState("");

  return (
    <>
      <h2 className="subtitle is-5">Your Input</h2>
      <textarea
        name="userInput"
        id="userInput"
        className="textarea"
        placeholder="Paste ticket description, diff, and notes..."
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button
        className="button is-link is-fullwidth mt-3"
        onClick={() => handleUserSubmit(value)}
      >
        Generate PR Description
      </button>
    </>
  );
}
