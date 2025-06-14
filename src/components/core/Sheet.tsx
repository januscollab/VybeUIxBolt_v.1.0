import * as React from "react";
import {
  Sheet as ShadcnSheet,
  SheetClose as ShadcnSheetClose,
  SheetContent as ShadcnSheetContent,
  SheetDescription as ShadcnSheetDescription,
  SheetFooter as ShadcnSheetFooter,
  SheetHeader as ShadcnSheetHeader,
  SheetTitle as ShadcnSheetTitle,
  SheetTrigger as ShadcnSheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import * as SheetPrimitive from "@radix-ui/react-dialog";

/** Props for CoreSheet component */
export type CoreSheetProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;
/** Props for CoreSheetContent component */
export type CoreSheetContentProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  side?: "top" | "bottom" | "left" | "right";
};

/** Core Sheet root component */
const Sheet = (props: CoreSheetProps) => <ShadcnSheet {...props} />;
Sheet.displayName = "CoreSheet";

/** Core SheetTrigger component */
const SheetTrigger = ShadcnSheetTrigger;
SheetTrigger.displayName = "CoreSheetTrigger";

/** Core SheetClose component */
const SheetClose = ShadcnSheetClose;
SheetClose.displayName = "CoreSheetClose";

/** Core SheetContent component */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetContent>,
  CoreSheetContentProps
>(({ className, ...props }, ref) => (
  <ShadcnSheetContent
    ref={ref}
    className={cn("core-sheet-content", className)}
    {...props}
  />
));
SheetContent.displayName = ShadcnSheetContent.displayName;

/** Core SheetHeader component */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadcnSheetHeader className={cn("core-sheet-header", className)} {...props} />
);
SheetHeader.displayName = "CoreSheetHeader";

/** Core SheetFooter component */
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadcnSheetFooter className={cn("core-sheet-footer", className)} {...props} />
);
SheetFooter.displayName = "CoreSheetFooter";

/** Core SheetTitle component */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetTitle>,
  React.ComponentPropsWithoutRef<typeof ShadcnSheetTitle>
>(({ className, ...props }, ref) => (
  <ShadcnSheetTitle
    ref={ref}
    className={cn("core-sheet-title", className)}
    {...props}
  />
));
SheetTitle.displayName = ShadcnSheetTitle.displayName;

/** Core SheetDescription component */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetDescription>,
  React.ComponentPropsWithoutRef<typeof ShadcnSheetDescription>
>(({ className, ...props }, ref) => (
  <ShadcnSheetDescription
    ref={ref}
    className={cn("core-sheet-description", className)}
    {...props}
  />
));
SheetDescription.displayName = ShadcnSheetDescription.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};