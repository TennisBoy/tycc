import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "@/test/utils/providers";
import HomePage from "./HomePage";

describe("HomePage", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero with primary calls to action", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.getByRole("heading", { level: 1, name: /Ride with us\./ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Check the calendar/ }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Discord/ }).length).toBeGreaterThan(0);
  });

  it("keeps the month calendar and hides the next-ride block when no rides are upcoming", () => {
    // Pin the clock past every scheduled ride so getNextRide() returns null.
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date("2030-01-01T12:00:00"));

    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.getByRole("heading", { name: "Calendar of rides" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Our next ride is on the calendar." }),
    ).not.toBeInTheDocument();
  });

  it("shows real social-proof stats instead of invented copy", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.getByText("8M+")).toBeInTheDocument();
    expect(screen.getByText("~110")).toBeInTheDocument();
  });

  it("drops the old placeholder review form", () => {
    render(<HomePage />, { wrapper: TestProviders });

    expect(screen.queryByLabelText("Your review")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Submit review" })).not.toBeInTheDocument();
  });
});
