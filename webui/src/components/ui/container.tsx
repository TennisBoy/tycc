import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      default: "max-w-7xl px-4 sm:px-6 lg:px-8",
      sm: "max-w-3xl px-4",
      md: "max-w-5xl px-4 sm:px-6",
      lg: "max-w-7xl px-4 sm:px-6 lg:px-8",
      xl: "max-w-[90rem] px-4 sm:px-6 lg:px-8",
      full: "max-w-none px-4 sm:px-6 lg:px-8",
    },
    padded: {
      true: "py-8",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    padded: false,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export function Container({ className, size, padded, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size, padded }), className)} {...props} />;
}
