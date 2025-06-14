import * as React from "react";
import {
  ScrollArea as ShadcnScrollArea,
  ScrollBar as ShadcnScrollBar,
} from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

/** Props for CoreScrollArea component */
export interface CoreScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {}

/** Core ScrollArea component */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollArea>,
  CoreScrollAreaProps
>(({ className, ...props }, ref) => (
  <ShadcnScrollArea
    ref={ref}
    className={cn("core-scroll-area", className)}
    {...props}
  />
));
ScrollArea.displayName = "CoreScrollArea";

/** Props for CoreScrollBar component */
export interface CoreScrollBarProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {}

/** Core ScrollBar component */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollBar>,
  CoreScrollBarProps
>(({ className, ...props }, ref) => (
  <ShadcnScrollBar
    ref={ref}
    className={cn("core-scroll-bar", className)}
    {...props}
  />
));
ScrollBar.displayName = "CoreScrollBar";

export { ScrollArea, ScrollBar };