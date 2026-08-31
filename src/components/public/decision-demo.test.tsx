import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DecisionDemo } from "./decision-demo";

describe("DecisionDemo", () => {
  it("shows score, action, evidence, gap and official source", () => {
    render(<DecisionDemo />);

    expect(screen.getByText("86")).toBeInTheDocument();
    expect(screen.getByText(/Apply now/i)).toBeInTheDocument();
    expect(screen.getByText(/Documented ML/i)).toBeInTheDocument();
    expect(screen.getByText(/Production cloud evidence/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /official JD/i })).toHaveAttribute(
      "href",
      "https://careers.1001.ai/machine-learning-engineer",
    );
  });
});
