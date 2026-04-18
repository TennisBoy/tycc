import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase()),
  );

  const displayValue =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? selected[0]
        : `${selected.length} selected`;

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSearch("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={label}
          className={cn("w-full justify-between font-normal", className)}
        >
          <span className={selected.length === 0 ? "text-gray-500" : ""}>
            {displayValue}
          </span>
          <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="border-b border-gray-200 p-2">
          <div className="relative">
            <Icons.Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={`Search ${label.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-7 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <div className="max-h-56 overflow-auto p-1">
          {selected.length > 0 && !search && (
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 text-left"
              onClick={() => onChange([])}
            >
              All {label}
            </button>
          )}
          {filtered.length > 0 ? (
            filtered.map((option) => (
              <button
                key={option}
                type="button"
                className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-100 text-left"
                onClick={() => toggle(option)}
              >
                <Checkbox
                  checked={selected.includes(option)}
                  onCheckedChange={() => toggle(option)}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={-1}
                />
                <span className="text-sm">{option}</span>
              </button>
            ))
          ) : (
            <div className="px-2 py-4 text-center text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
