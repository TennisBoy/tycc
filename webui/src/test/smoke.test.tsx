import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { cn } from "@/lib/utils";
import { TestProviders } from "@/test/utils/providers";

describe("scaffold smoke tests", () => {
  it("cn merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("cn handles tailwind conflicts (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("TestProviders renders children without error", () => {
    const { getByText } = render(
      <TestProviders>
        <span>hello world</span>
      </TestProviders>,
    );
    expect(getByText("hello world")).toBeInTheDocument();
  });
});
