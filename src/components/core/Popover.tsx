import * as React from "react";
import {
  Popover as ShadcnPopover,
  PopoverContent as ShadcnPopoverContent,
  PopoverTrigger as ShadcnPopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";

/** Props for CorePopover component */
export type CorePopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
/** Props for CorePopoverContent component */
export type CorePopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;
/** Props for CorePopoverTrigger component */
export type CorePopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

/** Core Popover root component */
const Popover = (props: CorePopoverProps) => <ShadcnPopover {...props} />;
Popover.displayName = "CorePopover";

/** Core PopoverTrigger component */
const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnPopoverTrigger>,
  CorePopoverTriggerProps
>(({ className, ...props }, ref) => (
  <ShadcnPopoverTrigger
    ref={ref}
    className={cn("core-popover-trigger", className)}
    {...props}
  />
));
PopoverTrigger.displayName = ShadcnPopoverTrigger.displayName;

/** Core PopoverContent component */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof ShadcnPopoverContent>,
  CorePopoverContentProps
>(({ className, ...props }, ref) => (
  <ShadcnPopoverContent
    ref={ref}
    className={cn("core-popover-content", className)}
    {...props}
  />
));
PopoverContent.displayName = ShadcnPopoverContent.displayName;

export { Popover, PopoverTrigger, PopoverContent };