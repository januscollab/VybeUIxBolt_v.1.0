import * as React from "react";
import {
  HoverCard as ShadcnHoverCard,
  HoverCardContent as ShadcnHoverCardContent,
  HoverCardTrigger as ShadcnHoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

/** Props for CoreHoverCard component */
export type CoreHoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;
/** Props for CoreHoverCardContent component */
export type CoreHoverCardContentProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>;
/** Props for CoreHoverCardTrigger component */
export type CoreHoverCardTriggerProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>;

/** Core HoverCard root component */
const HoverCard = (props: CoreHoverCardProps) => <ShadcnHoverCard {...props} />;
HoverCard.displayName = "CoreHoverCard";

/** Core HoverCardTrigger component */
const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnHoverCardTrigger>,
  CoreHoverCardTriggerProps
>(({ className, ...props }, ref) => (
  <ShadcnHoverCardTrigger
    ref={ref}
    className={cn("core-hover-card-trigger", className)}
    {...props}
  />
));
HoverCardTrigger.displayName = ShadcnHoverCardTrigger.displayName;

/** Core HoverCardContent component */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof ShadcnHoverCardContent>,
  CoreHoverCardContentProps
>(({ className, ...props }, ref) => (
  <ShadcnHoverCardContent
    ref={ref}
    className={cn("core-hover-card-content", className)}
    {...props}
  />
));
HoverCardContent.displayName = ShadcnHoverCardContent.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };