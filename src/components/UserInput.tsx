import "./styles.css";

export default function UserInput() {
  return (
    <>
      <h2 className="subtitle is-5">Your Input</h2>
      <textarea
        name="userInput"
        id="userInput"
        className="textarea"
        placeholder="Paste ticket description, diff, and notes..."
      ></textarea>
      <button className="button islink is-fullwidth mt-3">
        Generate PR Description
      </button>
    </>
  );
}
