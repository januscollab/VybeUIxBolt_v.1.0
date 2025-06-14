import * as React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbEllipsis as ShadcnBreadcrumbEllipsis,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink as ShadcnBreadcrumbLink,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

/** Props for CoreBreadcrumb component */
export interface CoreBreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {}

/** Core Breadcrumb component */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  CoreBreadcrumbProps
>(({ className, ...props }, ref) => (
  <ShadcnBreadcrumb
    ref={ref}
    className={cn("core-breadcrumb", className)}
    {...props}
  />
));
Breadcrumb.displayName = "CoreBreadcrumb";

/** Props for CoreBreadcrumbList component */
export interface CoreBreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {}

/** Core BreadcrumbList component */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  CoreBreadcrumbListProps
>(({ className, ...props }, ref) => (
  <ShadcnBreadcrumbList
    ref={ref}
    className={cn("core-breadcrumb-list", className)}
    {...props}
  />
));
BreadcrumbList.displayName = "CoreBreadcrumbList";

/** Props for CoreBreadcrumbItem component */
export interface CoreBreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {}

/** Core BreadcrumbItem component */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  CoreBreadcrumbItemProps
>(({ className, ...props }, ref) => (
  <ShadcnBreadcrumbItem
    ref={ref}
    className={cn("core-breadcrumb-item", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "CoreBreadcrumbItem";

/** Props for CoreBreadcrumbLink component */
export interface CoreBreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

/** Core BreadcrumbLink component */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  CoreBreadcrumbLinkProps
>(({ className, ...props }, ref) => (
  <ShadcnBreadcrumbLink
    ref={ref}
    className={cn("core-breadcrumb-link", className)}
    {...props}
  />
));
BreadcrumbLink.displayName = "CoreBreadcrumbLink";

/** Props for CoreBreadcrumbPage component */
export interface CoreBreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {}

/** Core BreadcrumbPage component */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  CoreBreadcrumbPageProps
>(({ className, ...props }, ref) => (
  <ShadcnBreadcrumbPage
    ref={ref}
    className={cn("core-breadcrumb-page", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "CoreBreadcrumbPage";

// Re-export remaining components
const BreadcrumbSeparator = ShadcnBreadcrumbSeparator;
const BreadcrumbEllipsis = ShadcnBreadcrumbEllipsis;

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};