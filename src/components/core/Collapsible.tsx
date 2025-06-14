import * as React from "react";
import {
  Collapsible as ShadcnCollapsible,
  CollapsibleContent as ShadcnCollapsibleContent,
  CollapsibleTrigger as ShadcnCollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/** Props for CoreCollapsible component */
export type CoreCollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;
/** Props for CoreCollapsibleContent component */
export type CoreCollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;
/** Props for CoreCollapsibleTrigger component */
export type CoreCollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;

/** Core Collapsible root component */
const Collapsible = (props: CoreCollapsibleProps) => <ShadcnCollapsible {...props} />;
Collapsible.displayName = "CoreCollapsible";

/** Core CollapsibleTrigger component */
const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnCollapsibleTrigger>,
  CoreCollapsibleTriggerProps
>(({ className, ...props }, ref) => (
  <ShadcnCollapsibleTrigger
    ref={ref}
    className={cn("core-collapsible-trigger", className)}
    {...props}
  />
));
CollapsibleTrigger.displayName = ShadcnCollapsibleTrigger.displayName;

/** Core CollapsibleContent component */
const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof ShadcnCollapsibleContent>,
  CoreCollapsibleContentProps
>(({ className, ...props }, ref) => (
  <ShadcnCollapsibleContent
    ref={ref}
    className={cn("core-collapsible-content", className)}
    {...props}
  />
));
CollapsibleContent.displayName = ShadcnCollapsibleContent.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };