import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Context for the accordion root
interface AccordionContextValue {
  type: "single" | "multiple";
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  type: "multiple",
  openItems: [],
  toggleItem: () => {},
});

// Context for each accordion item
interface AccordionItemContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  isOpen: false,
  toggle: () => {},
});

// Accordion root
interface AccordionProps {
  type: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

const Accordion = ({ type, defaultValue, className, children }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

// Accordion item
interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children }, ref) => {
    const { openItems, toggleItem } = React.useContext(AccordionContext);
    const isOpen = openItems.includes(value);
    const toggle = () => toggleItem(value);

    return (
      <AccordionItemContext.Provider value={{ isOpen, toggle }}>
        <div ref={ref} className={cn("border-b", className)}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

// Accordion trigger
const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen, toggle } = React.useContext(AccordionItemContext);

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion content
const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn("overflow-hidden text-sm", className)}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
