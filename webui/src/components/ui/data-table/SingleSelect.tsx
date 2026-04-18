import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SingleSelectProps {
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const OptionItem = React.memo(
  ({
    option,
    isSelected,
    onSelect,
  }: {
    option: { label: string; value: string };
    isSelected: boolean;
    onSelect: () => void;
  }) => (
    <div
      className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded px-2 py-1.5"
      onClick={onSelect}
      role="option"
      aria-selected={isSelected}
    >
      <Icons.Check className={cn("h-4 w-4 shrink-0", isSelected ? "opacity-100" : "opacity-0")} />
      <span className="text-sm">{option.label}</span>
    </div>
  ),
);
OptionItem.displayName = "OptionItem";

function SingleSelect({
  title,
  options,
  selectedValue,
  onValueChange,
  placeholder,
  disabled,
  className,
}: SingleSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [displayCount, setDisplayCount] = React.useState(20);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const allLabel = React.useMemo(() => `All ${title}`, [title]);
  const placeholderText = placeholder ?? allLabel;

  React.useEffect(() => {
    if (disabled && selectedValue) {
      onValueChange("");
    }
  }, [disabled, selectedValue, onValueChange]);

  const optionsWithAll = React.useMemo(
    () => [{ label: allLabel, value: "" }, ...options],
    [allLabel, options],
  );

  const filteredOptions = React.useMemo(
    () =>
      optionsWithAll.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [optionsWithAll, searchQuery],
  );

  const visibleOptions = React.useMemo(
    () => filteredOptions.slice(0, displayCount),
    [filteredOptions, displayCount],
  );

  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      setDisplayCount((prev) => Math.min(prev + 20, filteredOptions.length));
    }
  }, [filteredOptions.length]);

  const handleSelect = React.useCallback(
    (value: string) => {
      onValueChange(value);
      setOpen(false);
    },
    [onValueChange],
  );

  const handleOpenChange = React.useCallback((isOpen: boolean) => {
    if (isOpen) {
      setSearchQuery("");
      setDisplayCount(20);
    }
    setOpen(isOpen);
  }, []);

  const displayValue = disabled
    ? undefined
    : selectedValue
      ? (options.find((opt) => opt.value === selectedValue)?.label ?? selectedValue)
      : undefined;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between font-normal", className)}
        >
          <span className={cn(!displayValue && "text-muted-foreground")}>
            {displayValue ?? placeholderText}
          </span>
          <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <div className="border-b p-2">
          <div className="relative">
            <Icons.Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder={`Search ${title}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayCount(20);
              }}
              className="h-9 pl-8 text-sm"
              autoFocus
            />
          </div>
        </div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-64 overflow-auto p-1"
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <div className="text-muted-foreground py-6 text-center text-sm">No results found.</div>
          ) : (
            <>
              {visibleOptions.map((option) => (
                <OptionItem
                  key={option.value || "__all__"}
                  option={option}
                  isSelected={option.value === selectedValue}
                  onSelect={() => handleSelect(option.value)}
                />
              ))}
              {displayCount < filteredOptions.length && (
                <div className="text-muted-foreground py-2 text-center text-xs">
                  Showing {displayCount} of {filteredOptions.length}
                </div>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SingleSelect;
