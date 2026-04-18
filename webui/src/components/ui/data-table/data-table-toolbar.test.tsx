import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataTableToolbar } from "./data-table-toolbar";

// Minimal wrapper — toolbar only needs rowSelectionCount at minimum
function renderToolbar(props: Partial<React.ComponentProps<typeof DataTableToolbar>> = {}) {
  return render(<DataTableToolbar rowSelectionCount={0} totalCount={0} {...props} />);
}

describe("DataTableToolbar", () => {
  it("renders without crashing", () => {
    renderToolbar({ onSearchByChange: vi.fn() });
    expect(screen.getByPlaceholderText("Search in results...")).toBeInTheDocument();
  });

  describe("optional sections", () => {
    it("hides Filters button when filters prop is not provided", () => {
      renderToolbar(); // no filters prop
      expect(screen.queryByRole("button", { name: /filters/i })).not.toBeInTheDocument();
    });

    it("shows Filters button when filters prop is provided", () => {
      renderToolbar({ filters: <div>Filter UI</div> });
      expect(screen.getByRole("button", { name: /filters/i })).toBeInTheDocument();
    });

    it("hides view mode toggle when onViewModeChange is not provided", () => {
      renderToolbar(); // no onViewModeChange
      expect(screen.queryByRole("button", { name: /list/i })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /table/i })).not.toBeInTheDocument();
    });

    it("shows view mode toggle when onViewModeChange is provided", () => {
      renderToolbar({ onViewModeChange: vi.fn(), viewMode: "table" });
      expect(screen.getByRole("button", { name: "List view" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Table view" })).toBeInTheDocument();
    });
  });

  describe("filter badge", () => {
    const activeFilters = [
      {
        name: "BrandId",
        title: "Brand",
        appliedFilters: [{ value: "1", name: "Acme" }],
      },
    ];

    it("shows badge count on Filters button when filters are active, even when panel is collapsed", () => {
      renderToolbar({
        filters: <div>Filter UI</div>,
        activeFilters,
      });
      // Panel starts collapsed — badge should still be visible on the button
      const filtersButton = screen.getByRole("button", { name: /filters/i });
      expect(within(filtersButton).getByText("1")).toBeInTheDocument();
    });
  });

  describe("bulkActions", () => {
    it("shows selection count when no rows selected", () => {
      renderToolbar({ rowSelectionCount: 0, totalCount: 42 });
      expect(screen.getByText(/0 selected in 42/)).toBeInTheDocument();
    });

    it("shows selection count when bulkActions not provided, even with rows selected", () => {
      renderToolbar({ rowSelectionCount: 3, totalCount: 42 });
      expect(screen.getByText(/3 selected in 42/)).toBeInTheDocument();
    });

    it("shows bulkActions slot instead of count when rows are selected", () => {
      renderToolbar({
        rowSelectionCount: 3,
        totalCount: 42,
        bulkActions: <button>Delete 3</button>,
      });
      expect(screen.getByRole("button", { name: "Delete 3" })).toBeInTheDocument();
      expect(screen.queryByText(/selected in/)).not.toBeInTheDocument();
    });

    it("hides bulkActions when no rows selected", () => {
      renderToolbar({
        rowSelectionCount: 0,
        totalCount: 42,
        bulkActions: <button>Delete</button>,
      });
      expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
      expect(screen.getByText(/0 selected in 42/)).toBeInTheDocument();
    });
  });
});
