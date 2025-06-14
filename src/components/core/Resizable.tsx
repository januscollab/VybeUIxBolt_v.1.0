import * as React from "react";
import {
  ResizablePanelGroup as ShadcnResizablePanelGroup,
  ResizablePanel as ShadcnResizablePanel,
  ResizableHandle as ShadcnResizableHandle,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

/** Props for CoreResizablePanelGroup component */
export interface CoreResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

/** Core ResizablePanelGroup component */
const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnResizablePanelGroup>,
  CoreResizablePanelGroupProps
>(({ className, ...props }, ref) => (
  <ShadcnResizablePanelGroup
    ref={ref}
    className={cn("core-resizable-panel-group", className)}
    {...props}
  />
));
ResizablePanelGroup.displayName = "CoreResizablePanelGroup";

/** Props for CoreResizablePanel component */
export interface CoreResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

/** Core ResizablePanel component */
const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  CoreResizablePanelProps
>(({ className, ...props }, ref) => (
  <ShadcnResizablePanel
    ref={ref}
    className={cn("core-resizable-panel", className)}
    {...props}
  />
));
ResizablePanel.displayName = "CoreResizablePanel";

/** Props for CoreResizableHandle component */
export interface CoreResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
}

/** Core ResizableHandle component */
const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  CoreResizableHandleProps
>(({ className, ...props }, ref) => (
  <ShadcnResizableHandle
    ref={ref}
    className={cn("core-resizable-handle", className)}
    {...props}
  />
));
ResizableHandle.displayName = "CoreResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };