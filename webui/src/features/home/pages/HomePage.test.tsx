import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestProviders } from "@/test/utils/providers";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the scan-first TYCC hero and quick actions", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(
      screen.getByRole("heading", { name: "Ride Toronto Together." }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Check Calendar" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "About TYCC" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Past Routes/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Connect/ }).length).toBeGreaterThan(0);
    expect(screen.queryByText("Audience")).not.toBeInTheDocument();
    expect(screen.queryByText("Focus")).not.toBeInTheDocument();
    expect(screen.queryByText("Scan speed")).not.toBeInTheDocument();
  });

  it("renders an Ontario-style empty month calendar by default", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.getByRole("heading", { name: "Calendar of rides" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Month" })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("May 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous month" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next month" })).toBeInTheDocument();
    expect(screen.getByText("No rides match these filters")).toBeInTheDocument();
  });

  it("renders a no-login review form", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
    expect(screen.getByLabelText("Your review")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit review" })).toBeInTheDocument();
  });

  it("keeps the about section user-facing instead of internal planning copy", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.getByText("Mission")).toBeInTheDocument();
    expect(screen.getByText("Vision")).toBeInTheDocument();
    expect(screen.queryByText("How the site should work")).not.toBeInTheDocument();
    expect(screen.queryByText("Tone")).not.toBeInTheDocument();
    expect(screen.getByText("Inclusive")).toBeInTheDocument();
  });
});
