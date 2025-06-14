import * as React from "react";
import { AspectRatio as ShadcnAspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/** Props for CoreAspectRatio component */
export interface CoreAspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {}

/** Core AspectRatio component */
const AspectRatio = React.forwardRef<
  React.ElementRef<typeof ShadcnAspectRatio>,
  CoreAspectRatioProps
>(({ className, ...props }, ref) => (
  <ShadcnAspectRatio
    ref={ref}
    className={cn("core-aspect-ratio", className)}
    {...props}
  />
));
AspectRatio.displayName = "CoreAspectRatio";

export { AspectRatio };