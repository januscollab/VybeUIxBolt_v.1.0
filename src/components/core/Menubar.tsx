import * as React from "react";
import {
  Menubar as ShadcnMenubar,
  MenubarCheckboxItem as ShadcnMenubarCheckboxItem,
  MenubarContent as ShadcnMenubarContent,
  MenubarItem as ShadcnMenubarItem,
  MenubarLabel as ShadcnMenubarLabel,
  MenubarMenu as ShadcnMenubarMenu,
  MenubarRadioGroup as ShadcnMenubarRadioGroup,
  MenubarRadioItem as ShadcnMenubarRadioItem,
  MenubarSeparator as ShadcnMenubarSeparator,
  MenubarShortcut as ShadcnMenubarShortcut,
  MenubarSub as ShadcnMenubarSub,
  MenubarSubContent as ShadcnMenubarSubContent,
  MenubarSubTrigger as ShadcnMenubarSubTrigger,
  MenubarTrigger as ShadcnMenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

/** Props for CoreMenubar component */
export type CoreMenubarProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>;
/** Props for CoreMenubarTrigger component */
export type CoreMenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>;
/** Props for CoreMenubarContent component */
export type CoreMenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>;

/** Core Menubar root component */
const Menubar = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubar>,
  CoreMenubarProps
>(({ className, ...props }, ref) => (
  <ShadcnMenubar
    ref={ref}
    className={cn("core-menubar", className)}
    {...props}
  />
));
Menubar.displayName = ShadcnMenubar.displayName;

/** Core MenubarTrigger component */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarTrigger>,
  CoreMenubarTriggerProps
>(({ className, ...props }, ref) => (
  <ShadcnMenubarTrigger
    ref={ref}
    className={cn("core-menubar-trigger", className)}
    {...props}
  />
));
MenubarTrigger.displayName = ShadcnMenubarTrigger.displayName;

/** Core MenubarContent component */
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarContent>,
  CoreMenubarContentProps
>(({ className, ...props }, ref) => (
  <ShadcnMenubarContent
    ref={ref}
    className={cn("core-menubar-content", className)}
    {...props}
  />
));
MenubarContent.displayName = ShadcnMenubarContent.displayName;

// Re-export remaining components
const MenubarMenu = ShadcnMenubarMenu;
const MenubarItem = ShadcnMenubarItem;
const MenubarSeparator = ShadcnMenubarSeparator;
const MenubarLabel = ShadcnMenubarLabel;
const MenubarCheckboxItem = ShadcnMenubarCheckboxItem;
const MenubarRadioGroup = ShadcnMenubarRadioGroup;
const MenubarRadioItem = ShadcnMenubarRadioItem;
const MenubarShortcut = ShadcnMenubarShortcut;
const MenubarSub = ShadcnMenubarSub;
const MenubarSubContent = ShadcnMenubarSubContent;
const MenubarSubTrigger = ShadcnMenubarSubTrigger;

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
};