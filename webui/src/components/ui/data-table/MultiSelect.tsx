import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as React from "react";

interface MultiSelectProps {
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
  selectedValues: string[];
  onFilterChange: (values: string[]) => void;
  disabled?: boolean;
}

const OptionItem = React.memo(
  ({
    option,
    isChecked,
    onToggle,
  }: {
    option: { label: string; value: string };
    isChecked: boolean;
    onToggle: () => void;
  }) => (
    <div
      className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded px-2 py-1.5"
      onClick={onToggle}
      role="menuitemcheckbox"
      aria-checked={isChecked}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <span className="text-sm">{option.label}</span>
    </div>
  ),
);
OptionItem.displayName = "OptionItem";

function MultiSelect({
  title,
  options,
  selectedValues,
  onFilterChange,
  disabled,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [localSelected, setLocalSelected] = React.useState(selectedValues);
  const [displayCount, setDisplayCount] = React.useState(20);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const allLabel = React.useMemo(() => `All ${title}`, [title]);

  React.useEffect(() => {
    if (disabled && selectedValues.length > 0) {
      onFilterChange([]);
    }
  }, [disabled, selectedValues, onFilterChange]);

  const optionsWithAll = React.useMemo(
    () => [{ label: allLabel, value: allLabel }, ...options],
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

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        setLocalSelected(selectedValues);
        setSearchQuery("");
        setDisplayCount(20);
        setOpen(true);
        return;
      }

      if (!isOpen) {
        onFilterChange(localSelected);
        setSearchQuery("");
        setDisplayCount(20);
      }
      setOpen(isOpen);
    },
    [localSelected, onFilterChange, selectedValues],
  );

  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      setDisplayCount((prev) => Math.min(prev + 20, filteredOptions.length));
    }
  }, [filteredOptions.length]);

  const handleToggle = React.useCallback(
    (optionValue: string) => {
      if (optionValue === allLabel) {
        setLocalSelected([]);
      } else {
        setLocalSelected((prev) => {
          if (prev.includes(optionValue)) {
            return prev.filter((value) => value !== optionValue);
          } else {
            return [...prev, optionValue];
          }
        });
      }
    },
    [allLabel],
  );

  const isOptionChecked = React.useCallback(
    (optionValue: string) => {
      return optionValue === allLabel
        ? localSelected.length === 0
        : localSelected.includes(optionValue);
    },
    [allLabel, localSelected],
  );

  const visibleSelection = open ? localSelected : selectedValues;

  const getDisplayValue = (values: string[]) => {
    if (values.length === 0) {
      return allLabel;
    } else if (values.length === 1) {
      const selectedOption = options.find((opt) => opt.value === values[0]);
      return selectedOption?.label || values[0];
    } else {
      return `${values.length} selected`;
    }
  };

  const displayValue = disabled ? allLabel : getDisplayValue(visibleSelection);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-10 w-full justify-between font-normal"
        >
          <span className={cn(visibleSelection.length === 0 && "text-muted-foreground")}>
            {displayValue}
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
        <div ref={scrollRef} onScroll={handleScroll} className="max-h-64 overflow-auto p-1">
          {filteredOptions.length === 0 ? (
            <div className="text-muted-foreground py-6 text-center text-sm">No results found.</div>
          ) : (
            <>
              {visibleOptions.map((option) => (
                <OptionItem
                  key={option.value}
                  option={option}
                  isChecked={isOptionChecked(option.value)}
                  onToggle={() => handleToggle(option.value)}
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

export default MultiSelect;
