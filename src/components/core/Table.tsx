import * as React from "react";
import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCaption as ShadcnTableCaption,
  TableCell as ShadcnTableCell,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/** Props for CoreTable component */
export interface CoreTableProps extends React.HTMLAttributes<HTMLTableElement> {}

/** Core Table component */
const Table = React.forwardRef<
  HTMLTableElement,
  CoreTableProps
>(({ className, ...props }, ref) => (
  <ShadcnTable
    ref={ref}
    className={cn("core-table", className)}
    {...props}
  />
));
Table.displayName = "CoreTable";

/** Props for CoreTableHeader component */
export interface CoreTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Core TableHeader component */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  CoreTableHeaderProps
>(({ className, ...props }, ref) => (
  <ShadcnTableHeader
    ref={ref}
    className={cn("core-table-header", className)}
    {...props}
  />
));
TableHeader.displayName = "CoreTableHeader";

/** Props for CoreTableBody component */
export interface CoreTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Core TableBody component */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  CoreTableBodyProps
>(({ className, ...props }, ref) => (
  <ShadcnTableBody
    ref={ref}
    className={cn("core-table-body", className)}
    {...props}
  />
));
TableBody.displayName = "CoreTableBody";

/** Props for CoreTableFooter component */
export interface CoreTableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Core TableFooter component */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  CoreTableFooterProps
>(({ className, ...props }, ref) => (
  <ShadcnTableFooter
    ref={ref}
    className={cn("core-table-footer", className)}
    {...props}
  />
));
TableFooter.displayName = "CoreTableFooter";

/** Props for CoreTableRow component */
export interface CoreTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

/** Core TableRow component */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  CoreTableRowProps
>(({ className, ...props }, ref) => (
  <ShadcnTableRow
    ref={ref}
    className={cn("core-table-row", className)}
    {...props}
  />
));
TableRow.displayName = "CoreTableRow";

/** Props for CoreTableHead component */
export interface CoreTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

/** Core TableHead component */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  CoreTableHeadProps
>(({ className, ...props }, ref) => (
  <ShadcnTableHead
    ref={ref}
    className={cn("core-table-head", className)}
    {...props}
  />
));
TableHead.displayName = "CoreTableHead";

/** Props for CoreTableCell component */
export interface CoreTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

/** Core TableCell component */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  CoreTableCellProps
>(({ className, ...props }, ref) => (
  <ShadcnTableCell
    ref={ref}
    className={cn("core-table-cell", className)}
    {...props}
  />
));
TableCell.displayName = "CoreTableCell";

/** Props for CoreTableCaption component */
export interface CoreTableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

/** Core TableCaption component */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  CoreTableCaptionProps
>(({ className, ...props }, ref) => (
  <ShadcnTableCaption
    ref={ref}
    className={cn("core-table-caption", className)}
    {...props}
  />
));
TableCaption.displayName = "CoreTableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};