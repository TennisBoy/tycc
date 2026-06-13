import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TestProviders } from "@/test/utils/providers";

describe("scaffold smoke tests", () => {
  it("TestProviders renders children without error", () => {
    const { getByText } = render(
      <TestProviders>
        <span>hello world</span>
      </TestProviders>,
    );
    expect(getByText("hello world")).toBeInTheDocument();
  });
});
