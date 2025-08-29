"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  className?: string | { [key: string]: string | any }; // Make className optional
  asChild?: boolean;
}

function getFinalClasses(className?: string | { [key: string]: string | any }) {
  if (!className) return "";

  if (typeof className === "string") {
    return className;
  }

  if (typeof className === "object" && className !== null) {
    // Flatten object into an array of class names
    const flattenClasses = (
      obj: { [key: string]: any },
      prefix: string = ""
    ): string[] => {
      return Object.entries(obj).flatMap(([key, value]) => {
        const newPrefix = prefix ? `${prefix}${key}` : key;
        if (typeof value === "string") {
          return value
            .trim()
            .split(/\s+/)
            .map((cls) => `${newPrefix}${cls}`);
        }
        if (typeof value === "object" && value !== null) {
          return flattenClasses(value, newPrefix);
        }
        return [];
      });
    };

    return flattenClasses(className).join(" ").trim();
  }

  return "";
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const finalClassName = getFinalClasses(className);
    console.log("finalClassName", finalClassName);
    const Component = asChild ? Slot : "div";

    return (
      <Component
        data-slot="box"
        role="box"
        className={cn(finalClassName)}
        ref={ref}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export { Box };
