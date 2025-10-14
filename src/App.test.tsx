import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Static UI", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/PR Agent/i)).toBeInTheDocument();
  });

  test("shows both columns", () => {
    render(<App />);
    const inputHeader = screen.getByText(/Your Input/i);
    const outputHeader = screen.getByText(/Agent Output/i);
    expect(inputHeader).toBeInTheDocument();
    expect(outputHeader).toBeInTheDocument();
  });

  test("textarea and button are present", () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/Paste ticket description/i);
    const button = screen.getByRole("button", {
      name: /Generate PR Description/i,
    });
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
