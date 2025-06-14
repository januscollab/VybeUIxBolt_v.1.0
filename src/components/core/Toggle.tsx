import * as React from "react";
import { Toggle as ShadcnToggle } from "@/components/ui/toggle";
import { ToggleGroup as ShadcnToggleGroup, ToggleGroupItem as ShadcnToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

/** Props for CoreToggle component */
export interface CoreToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {}

/** Core Toggle component */
const Toggle = React.forwardRef<
  React.ElementRef<typeof ShadcnToggle>,
  CoreToggleProps
>(({ className, ...props }, ref) => (
  <ShadcnToggle
    ref={ref}
    className={cn("core-toggle", className)}
    {...props}
  />
));
Toggle.displayName = "CoreToggle";

/** Props for CoreToggleGroup component */
export interface CoreToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

/** Core ToggleGroup component */
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroup>,
  CoreToggleGroupProps
>(({ className, ...props }, ref) => (
  <ShadcnToggleGroup
    ref={ref}
    className={cn("core-toggle-group", className)}
    {...props}
  />
));
ToggleGroup.displayName = "CoreToggleGroup";

/** Props for CoreToggleGroupItem component */
export interface CoreToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {}

/** Core ToggleGroupItem component */
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroupItem>,
  CoreToggleGroupItemProps
>(({ className, ...props }, ref) => (
  <ShadcnToggleGroupItem
    ref={ref}
    className={cn("core-toggle-group-item", className)}
    {...props}
  />
));
ToggleGroupItem.displayName = "CoreToggleGroupItem";

export { Toggle, ToggleGroup, ToggleGroupItem };