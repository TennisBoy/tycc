import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { IHasKeyValue } from "@/types/common";

export type SortingState = {
  id: string;
  desc: boolean;
}[];

export type OnChangeFn<T> = (updaterOrValue: T | ((prev: T) => T)) => void;
import * as React from "react";

interface SortingSelectorProps<TData extends IHasKeyValue> {
  options: TData[];
  onSortingChange: (sorting: SortingState) => void;
  defaultSortByIds?: string[];
  defaultSortOrder?: "asc" | "desc";
}

const SortingSelector = <TData extends IHasKeyValue>({
  options,
  onSortingChange,
  defaultSortByIds,
  defaultSortOrder,
}: SortingSelectorProps<TData>) => {
  const [sortBy, setSortBy] = React.useState<TData[]>(() =>
    defaultSortByIds ? options.filter((o) => defaultSortByIds.includes(o.id ?? "")) : [],
  );
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">(defaultSortOrder ?? "desc");

  React.useEffect(() => {
    const sortingState: SortingState = sortBy
      .filter((o) => o.id !== undefined)
      .map((o) => ({
        id: o.id!,
        desc: sortOrder === "desc",
      }));

    onSortingChange(sortingState);
  }, [sortBy, sortOrder, onSortingChange]);

  const toggleOption = (option: TData) => {
    setSortBy((prev) =>
      prev.some((o) => o.id === option.id)
        ? prev.filter((o) => o.id !== option.id)
        : [...prev, option],
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-8 w-28 justify-between font-normal"
          >
            <span className="truncate capitalize">
              {sortBy.length === 0
                ? "None"
                : sortBy.length === 1
                  ? sortBy[0].name
                  : `${sortBy.length} fields`}
            </span>
            <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0" align="start">
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-100"
                onClick={() => toggleOption(option)}
              >
                <Checkbox checked={sortBy.some((o) => o.id === option.id)} />
                <span className="text-sm capitalize">{option.name}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
        className="h-8 px-2"
      >
        {sortOrder === "asc" ? (
          <Icons.ArrowUp className="h-4 w-4" />
        ) : (
          <Icons.ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default SortingSelector;
