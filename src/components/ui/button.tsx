"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "mobile";
  asChild?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Minimalist button: square corners, no shadows, no scale effects.
 * Solid fills or thin 1px borders; quiet hover states only.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-none font-medium tracking-normal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
          {
            "bg-foreground text-background hover:bg-terracotta":
              variant === "default",
            "border border-foreground/40 bg-transparent text-foreground hover:border-terracotta hover:text-terracotta":
              variant === "outline",
            "bg-transparent text-foreground hover:bg-foreground/5":
              variant === "ghost",
            "text-foreground underline-offset-4 hover:underline p-0 h-auto":
              variant === "link",
            "h-11 px-6 text-sm": size === "default" && variant !== "link",
            "h-9 px-4 text-sm": size === "sm" && variant !== "link",
            "h-12 px-8 text-sm min-w-[180px]": size === "lg" && variant !== "link",
            "h-12 px-8 text-sm w-full sm:w-auto sm:min-w-[180px]":
              size === "mobile" && variant !== "link",
            "h-10 w-10": size === "icon",
            "w-full": fullWidth,
            "min-h-[44px] min-w-[44px]": size !== "icon" && variant !== "link",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
        ) : null}
        {props.children as React.ReactNode}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
