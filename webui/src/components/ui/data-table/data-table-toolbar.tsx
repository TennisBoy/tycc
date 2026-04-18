import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import SortingSelector, { type SortingState, type OnChangeFn } from "./sorting-selector";
import type { ActiveFilter, IHasKeyValue } from "@/types/common";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps {
  searchBy?: string;
  onSearchByChange?: (value: string) => void;
  rowSelectionCount?: number;
  onSortingChange?: OnChangeFn<SortingState>;
  sortingOptions?: IHasKeyValue[];
  filters?: React.ReactNode;
  activeFilters?: ActiveFilter[];
  onApplyFilters?: () => void;
  onClearFilters?: () => void;
  totalCount?: number;
  defaultSortByIds?: string[];
  defaultSortOrder?: "asc" | "desc";
  viewMode?: "list" | "table";
  onViewModeChange?: (mode: "list" | "table") => void;
  bulkActions?: React.ReactNode;
}

export function DataTableToolbar({
  searchBy = "",
  onSearchByChange,
  rowSelectionCount = undefined,
  onSortingChange,
  sortingOptions,
  filters,
  activeFilters,
  onApplyFilters,
  onClearFilters,
  totalCount = 0,
  defaultSortByIds,
  defaultSortOrder,
  viewMode = "table",
  onViewModeChange,
  bulkActions,
}: DataTableToolbarProps) {
  const [filterCollapsed, setFilterCollapsed] = React.useState<boolean>(true);
  const [isFilterPinned, setIsFilterPinned] = useState<boolean>(false);

  const activeFilterCount = React.useMemo(() => {
    return activeFilters?.filter((filter) => filter.appliedFilters.length > 0).length ?? 0;
  }, [activeFilters]);
  const filterSummary = React.useMemo(() => {
    if (!activeFilters?.length) return undefined;
    const summaries = activeFilters.reduce<string[]>((acc, filter) => {
      if (filter.appliedFilters?.length) {
        const count = filter.appliedFilters.length;
        const value = count === 1 ? filter.appliedFilters[0].name : `${count} selected`;
        acc.push(`${filter.title}: ${value}`);
      }
      return acc;
    }, []);
    return summaries.length > 0 ? summaries.join(" | ") : undefined;
  }, [activeFilters]);
  const showBulkActions = (rowSelectionCount ?? 0) > 0 && Boolean(bulkActions);
  return (
    <>
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          {onSearchByChange && (
            <div className="relative w-64 rounded-md border">
              <Icons.Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <SearchInput
                placeholder="Search in results..."
                value={searchBy}
                onChange={(value) => onSearchByChange(String(value))}
              />
            </div>
          )}
          {showBulkActions ? (
            <div className="flex items-center gap-2">{bulkActions}</div>
          ) : rowSelectionCount !== undefined ? (
            <div className="text-sm text-gray-600">
              {rowSelectionCount} selected in {totalCount}
              {totalCount === 1 ? " result" : " results"}
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {filters && filterCollapsed && filterSummary !== undefined && (
            <div className="flex items-center gap-2">
              <span className="max-w-xs truncate text-xs text-gray-500">{filterSummary}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600"
                    onClick={() => onClearFilters?.()}
                  >
                    <Icons.X className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear Filters</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
          {filters && (
            <Button
              variant="outline"
              size="sm"
              className={`h-8 ${!filterCollapsed && filterSummary !== undefined ? "border-blue-200 bg-blue-50 text-blue-600" : ""}`}
              onClick={() => setFilterCollapsed(!filterCollapsed)}
            >
              <Icons.Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 rounded-full bg-blue-600 px-1.5 py-0.5 text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          )}
          {sortingOptions && onSortingChange && (
            <SortingSelector
              options={sortingOptions}
              onSortingChange={onSortingChange}
              defaultSortByIds={defaultSortByIds}
              defaultSortOrder={defaultSortOrder}
            />
          )}
          {onViewModeChange && (
            <div className="flex overflow-hidden rounded-lg border border-gray-200">
              <Button
                aria-label="List view"
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange("list")}
                className={`h-8 rounded-none px-3 ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icons.List className="h-4 w-4" />
              </Button>
              <Button
                aria-label="Table view"
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange("table")}
                className={`h-8 rounded-none px-3 ${
                  viewMode === "table"
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icons.Table className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {filters && !filterCollapsed && (
        <div className="relative space-y-3 border-b border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filters}
              <div className="flex items-end gap-3 lg:col-span-3">
                <Button
                  size="sm"
                  className="h-10 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    if (!isFilterPinned) {
                      setFilterCollapsed(true);
                    }
                    onApplyFilters?.();
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-10"
                  onClick={() => onClearFilters?.()}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterPinned(!isFilterPinned)}
                className={cn(
                  "absolute top-2 right-2 h-6 w-6 p-0",
                  isFilterPinned
                    ? "text-blue-600 hover:text-blue-700"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                <Icons.Pin className={cn("h-4 w-4", isFilterPinned && "fill-current")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isFilterPinned ? "Unpin filter panel" : "Pin filter panel"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
}

function SearchInput({
  value: initialValue,
  onChange,
  debounceMs = 800,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounceMs?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  const lastNotifiedValueRef = useRef(initialValue);
  useLayoutEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (value === lastNotifiedValueRef.current) return;
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      lastNotifiedValueRef.current = value;
      onChangeRef.current(value);
    }, debounceMs);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [value, debounceMs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      onChangeRef.current(value);
    }
  };

  const handleBlur = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    onChangeRef.current(value);
  };

  return (
    <Input
      {...props}
      className="pl-9"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
}
