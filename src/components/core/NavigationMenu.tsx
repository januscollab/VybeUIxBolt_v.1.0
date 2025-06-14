import * as React from "react";
import {
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuContent as ShadcnNavigationMenuContent,
  NavigationMenuIndicator as ShadcnNavigationMenuIndicator,
  NavigationMenuItem as ShadcnNavigationMenuItem,
  NavigationMenuLink as ShadcnNavigationMenuLink,
  NavigationMenuList as ShadcnNavigationMenuList,
  NavigationMenuTrigger as ShadcnNavigationMenuTrigger,
  NavigationMenuViewport as ShadcnNavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

/** Props for CoreNavigationMenu component */
export type CoreNavigationMenuProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>;
/** Props for CoreNavigationMenuList component */
export type CoreNavigationMenuListProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;
/** Props for CoreNavigationMenuItem component */
export type CoreNavigationMenuItemProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>;
/** Props for CoreNavigationMenuTrigger component */
export type CoreNavigationMenuTriggerProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>;
/** Props for CoreNavigationMenuContent component */
export type CoreNavigationMenuContentProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>;
/** Props for CoreNavigationMenuLink component */
export type CoreNavigationMenuLinkProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;

/** Core NavigationMenu root component */
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenu>,
  CoreNavigationMenuProps
>(({ className, ...props }, ref) => (
  <ShadcnNavigationMenu
    ref={ref}
    className={cn("core-navigation-menu", className)}
    {...props}
  />
));
NavigationMenu.displayName = ShadcnNavigationMenu.displayName;

/** Core NavigationMenuList component */
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuList>,
  CoreNavigationMenuListProps
>(({ className, ...props }, ref) => (
  <ShadcnNavigationMenuList
    ref={ref}
    className={cn("core-navigation-menu-list", className)}
    {...props}
  />
));
NavigationMenuList.displayName = ShadcnNavigationMenuList.displayName;

/** Core NavigationMenuItem component */
const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuItem>,
  CoreNavigationMenuItemProps
>(({ className, ...props }, ref) => (
  <ShadcnNavigationMenuItem
    ref={ref}
    className={cn("core-navigation-menu-item", className)}
    {...props}
  />
));
NavigationMenuItem.displayName = ShadcnNavigationMenuItem.displayName;

/** Core NavigationMenuTrigger component */
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuTrigger>,
  CoreNavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <ShadcnNavigationMenuTrigger
    ref={ref}
    className={cn("core-navigation-menu-trigger", className)}
    {...props}
  >
    {children}
  </ShadcnNavigationMenuTrigger>
));
NavigationMenuTrigger.displayName = ShadcnNavigationMenuTrigger.displayName;

/** Core NavigationMenuContent component */
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuContent>,
  CoreNavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <ShadcnNavigationMenuContent
    ref={ref}
    className={cn("core-navigation-menu-content", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = ShadcnNavigationMenuContent.displayName;

/** Core NavigationMenuLink component */
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuLink>,
  CoreNavigationMenuLinkProps
>(({ className, ...props }, ref) => (
  <ShadcnNavigationMenuLink
    ref={ref}
    className={cn("core-navigation-menu-link", className)}
    {...props}
  />
));
NavigationMenuLink.displayName = ShadcnNavigationMenuLink.displayName;

// Re-export additional components
const NavigationMenuIndicator = ShadcnNavigationMenuIndicator;
const NavigationMenuViewport = ShadcnNavigationMenuViewport;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};