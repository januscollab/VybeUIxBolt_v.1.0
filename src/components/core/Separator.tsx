import * as React from "react";
import { Separator as ShadcnSeparator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

/** Props for CoreSeparator component */
export interface CoreSeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

/** Core Separator component */
const Separator = React.forwardRef<
  React.ElementRef<typeof ShadcnSeparator>,
  CoreSeparatorProps
>(({ className, ...props }, ref) => (
  <ShadcnSeparator
    ref={ref}
    className={cn("core-separator", className)}
    {...props}
  />
));
Separator.displayName = "CoreSeparator";

export { Separator };