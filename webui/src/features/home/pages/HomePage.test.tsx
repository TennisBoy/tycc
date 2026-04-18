import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the TYCC hero content", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "Build confidence on every ride." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Toronto Youth Cycling Club")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Make each ride feel intentional from check-in to cooldown.",
      }),
    ).toBeInTheDocument();
  });
});
