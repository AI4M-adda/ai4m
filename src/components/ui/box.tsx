import { Slot } from "@radix-ui/react-slot";
import React, { useMemo } from "react";
import { cn } from "../../lib/utils";

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  className: string | { [key: string]: string | any };
  asChild?: boolean;
}

function getFinalClasses(className: string | { [key: string]: string | any }) {
  let finalClassName = "";
  if (typeof className === "string") {
    finalClassName = className;
  } else if (typeof className === "object" && className !== null) {
    function getClasses(obj: { [key: string]: string }, key: string = "") {
      Object.entries(obj).forEach(([prefix, classes]) => {
        const pre: string = `${key}${prefix}`;
        if (typeof classes === "string") {
          const classList = classes.trim().split(/\s+/);
          classList.forEach((cls) => {
            if (cls) {
              finalClassName += ` ${pre}${cls}`;
            }
          });
        } else if (typeof classes === "object" && classes !== null) {
          getClasses(classes, pre);
        }
      });
    }

    getClasses(className);

    finalClassName = finalClassName.trim();
  }
  return finalClassName;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const finalClassName = useMemo(() => {
      return getFinalClasses(className);
    }, [className]);
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
