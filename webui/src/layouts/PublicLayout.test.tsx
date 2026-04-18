import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestProviders } from "@/test/utils/providers";
import PublicLayout from "./PublicLayout";

describe("PublicLayout", () => {
  it("uses icon-only social links in the header and footer", () => {
    render(<PublicLayout />, { wrapper: TestProviders });

    expect(screen.getAllByRole("link", { name: "Instagram" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Discord" }).length).toBeGreaterThan(0);
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
    expect(screen.queryByText("Discord")).not.toBeInTheDocument();
  });
});
