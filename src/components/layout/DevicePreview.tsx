import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function DevicePreview() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');

  const devices = [
    { type: 'desktop' as DeviceType, icon: Monitor, label: 'Desktop' },
    { type: 'tablet' as DeviceType, icon: Tablet, label: 'Tablet' },
    { type: 'mobile' as DeviceType, icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      {devices.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 px-3 gap-2",
            selectedDevice === type && "bg-background shadow-sm"
          )}
          onClick={() => setSelectedDevice(type)}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}