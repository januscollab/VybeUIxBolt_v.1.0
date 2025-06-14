import * as React from "react";
import {
  ResizablePanelGroup as ShadcnResizablePanelGroup,
  ResizablePanel as ShadcnResizablePanel,
  ResizableHandle as ShadcnResizableHandle,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

/** Core ResizablePanelGroup component - simplified wrapper */
const ResizablePanelGroup = (props: any) => <ShadcnResizablePanelGroup {...props} />;
ResizablePanelGroup.displayName = "CoreResizablePanelGroup";

/** Core ResizablePanel component - simplified wrapper */
const ResizablePanel = (props: any) => <ShadcnResizablePanel {...props} />;
ResizablePanel.displayName = "CoreResizablePanel";

/** Core ResizableHandle component - simplified wrapper */  
const ResizableHandle = (props: any) => <ShadcnResizableHandle {...props} />;
ResizableHandle.displayName = "CoreResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };