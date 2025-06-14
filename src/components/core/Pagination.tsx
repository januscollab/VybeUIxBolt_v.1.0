import * as React from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent as ShadcnPaginationContent,
  PaginationEllipsis as ShadcnPaginationEllipsis,
  PaginationItem as ShadcnPaginationItem,
  PaginationLink as ShadcnPaginationLink,
  PaginationNext as ShadcnPaginationNext,
  PaginationPrevious as ShadcnPaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

/** Props for CorePagination component */
export interface CorePaginationProps extends React.ComponentPropsWithoutRef<"nav"> {}

/** Core Pagination component */
const Pagination = React.forwardRef<
  HTMLElement,
  CorePaginationProps
>(({ className, ...props }, ref) => (
  <ShadcnPagination
    ref={ref}
    className={cn("core-pagination", className)}
    {...props}
  />
));
Pagination.displayName = "CorePagination";

/** Props for CorePaginationContent component */
export interface CorePaginationContentProps extends React.ComponentPropsWithoutRef<"ul"> {}

/** Core PaginationContent component */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  CorePaginationContentProps
>(({ className, ...props }, ref) => (
  <ShadcnPaginationContent
    ref={ref}
    className={cn("core-pagination-content", className)}
    {...props}
  />
));
PaginationContent.displayName = "CorePaginationContent";

/** Props for CorePaginationLink component */
export interface CorePaginationLinkProps {
  page?: string | number;
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

/** Core PaginationLink component */
const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  CorePaginationLinkProps & React.ComponentPropsWithoutRef<"a">
>(({ className, ...props }, ref) => (
  <ShadcnPaginationLink
    ref={ref}
    className={cn("core-pagination-link", className)}
    {...props}
  />
));
PaginationLink.displayName = "CorePaginationLink";

// Re-export remaining components
const PaginationItem = ShadcnPaginationItem;
const PaginationPrevious = ShadcnPaginationPrevious;
const PaginationNext = ShadcnPaginationNext;
const PaginationEllipsis = ShadcnPaginationEllipsis;

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};