import * as React from "react";
import {
  Carousel as ShadcnCarousel,
  CarouselContent as ShadcnCarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselNext as ShadcnCarouselNext,
  CarouselPrevious as ShadcnCarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/** Props for CoreCarousel component */
export interface CoreCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

/** Core Carousel component */
const Carousel = React.forwardRef<
  HTMLDivElement,
  CoreCarouselProps
>(({ className, ...props }, ref) => (
  <ShadcnCarousel
    ref={ref}
    className={cn("core-carousel", className)}
    {...props}
  />
));
Carousel.displayName = "CoreCarousel";

/** Props for CoreCarouselContent component */
export interface CoreCarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Core CarouselContent component */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CoreCarouselContentProps
>(({ className, ...props }, ref) => (
  <ShadcnCarouselContent
    ref={ref}
    className={cn("core-carousel-content", className)}
    {...props}
  />
));
CarouselContent.displayName = "CoreCarouselContent";

/** Props for CoreCarouselItem component */
export interface CoreCarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Core CarouselItem component */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  CoreCarouselItemProps
>(({ className, ...props }, ref) => (
  <ShadcnCarouselItem
    ref={ref}
    className={cn("core-carousel-item", className)}
    {...props}
  />
));
CarouselItem.displayName = "CoreCarouselItem";

// Re-export the control components
const CarouselPrevious = ShadcnCarouselPrevious;
const CarouselNext = ShadcnCarouselNext;

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};