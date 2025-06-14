import * as React from "react";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";

/** Props for CoreSlider component */
export interface CoreSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

/** Core Slider component */
const Slider = React.forwardRef<
  React.ElementRef<typeof ShadcnSlider>,
  CoreSliderProps
>(({ className, ...props }, ref) => (
  <ShadcnSlider
    ref={ref}
    className={cn("core-slider", className)}
    {...props}
  />
));
Slider.displayName = "CoreSlider";

export { Slider };