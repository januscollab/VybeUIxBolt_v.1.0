import * as React from "react";
import { Toggle as ShadcnToggle } from "@/components/ui/toggle";
import { ToggleGroup as ShadcnToggleGroup, ToggleGroupItem as ShadcnToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

/** Core Toggle component */
const Toggle = React.forwardRef<any, any>(({ className, ...props }, ref) => (
  <ShadcnToggle ref={ref} className={cn("core-toggle", className)} {...props} />
));
Toggle.displayName = "CoreToggle";

/** Core ToggleGroup component - simplified wrapper */
const ToggleGroup = (props: any) => <ShadcnToggleGroup {...props} />;
ToggleGroup.displayName = "CoreToggleGroup";

/** Core ToggleGroupItem component - simplified wrapper */
const ToggleGroupItem = (props: any) => <ShadcnToggleGroupItem {...props} />;
ToggleGroupItem.displayName = "CoreToggleGroupItem";

export { Toggle, ToggleGroup, ToggleGroupItem };