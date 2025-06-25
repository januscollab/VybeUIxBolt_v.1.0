
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Palette, Undo, Edit, Monitor } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";

export default function ColorPaletteComponent() {
  const { colorPalette, updateColorPalette, backgrounds, updateBackgrounds } = useLocalDesignSystem();
  const [isLiveEditEnabled, setIsLiveEditEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState<{name: string, value: string, key: string} | null>(null);
  const [colorValue, setColorValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `Color value ${text} has been copied to your clipboard.`,
    });
  };

  const handleColorClick = (name: string, value: string, key: string) => {
    if (!isLiveEditEnabled) return;
    
    setSelectedColor({ name, value, key });
    setColorValue(value);
    setIsDialogOpen(true);
  };

  const handleColorUpdate = () => {
    if (selectedColor) {
      const updatedPalette = {
        ...colorPalette,
        [selectedColor.key]: colorValue
      };
      updateColorPalette(updatedPalette);
      
      // Update CSS variables immediately
      const root = document.documentElement;
      const hslValue = hexToHSL(colorValue);
      if (hslValue) {
        root.style.setProperty(`--${selectedColor.key}`, hslValue);
      }
      
      toast({
        title: "Color updated",
        description: `${selectedColor.name} has been updated to ${colorValue}. Changes are now live!`,
      });
      setIsDialogOpen(false);
      setSelectedColor(null);
    }
  };

  const hexToHSL = (hex: string): string | null => {
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
  };

  const resetToDefault = () => {
    const defaultColors = {
      primary: "#FF4A00",
      secondary: "#6b7280",
      accent: "#06b6d4",
      neutral: "#64748b",
      background: "#ffffff",
      text: "#1e293b",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      orange: "#FF4A00"
    };
    updateColorPalette(defaultColors);
    toast({
      title: "Colors reset",
      description: "All colors have been reset to default values.",
    });
  };

  const backgroundOptions = [
    { name: "Clean White", value: "#FFFFFF", description: "Pure white background for maximum clarity" },
    { name: "Warm Gray", value: "#F8F9FA", description: "Subtle warm gray for reduced eye strain" },
    { name: "Cool Blue", value: "#F8FAFC", description: "Cool blue-tinted background for focus" }
  ];

  const applyBackground = (bgColor: string) => {
    document.body.style.backgroundColor = bgColor;
    toast({
      title: "Background applied",
      description: `Background color has been changed to ${bgColor}`,
    });
  };

  const colorGroups = [
    {
      name: "Primary Colors",
      colors: [
        { name: "Primary", value: "hsl(16, 100%, 50%)", hex: colorPalette.primary || "#FF4A00", css: "bg-primary", key: "primary", description: "Main brand color" },
        { name: "Earth", value: "hsl(225, 25%, 15%)", hex: "#2A3441", css: "bg-earth", key: "earth", description: "Deep earth tone" },
        { name: "Cream", value: "hsl(45, 25%, 95%)", hex: "#F8F6F3", css: "bg-cream", key: "cream", description: "Warm neutral" },
        { name: "Almost White", value: "hsl(210, 20%, 98%)", hex: "#FBFCFC", css: "bg-almost-white", key: "almost-white", description: "Clean background" },
      ]
    },
    {
      name: "Text Colors",
      colors: [
        { name: "Foreground", value: "hsl(225, 15%, 20%)", hex: colorPalette.text || "#2B3544", css: "text-foreground", key: "text", description: "Primary text" },
        { name: "Muted", value: "hsl(225, 8%, 60%)", hex: "#8B9299", css: "text-muted-foreground", key: "muted", description: "Secondary text" },
        { name: "Primary Text", value: "hsl(16, 100%, 50%)", hex: colorPalette.primary || "#FF4A00", css: "text-primary", key: "primary", description: "Brand text" },
      ]
    },
    {
      name: "Semantic Colors",
      colors: [
        { name: "Success", value: "hsl(142, 71%, 45%)", hex: colorPalette.success || "#22C55E", css: "bg-success", key: "success", description: "Success states" },
        { name: "Warning", value: "hsl(38, 92%, 50%)", hex: colorPalette.warning || "#F59E0B", css: "bg-warning", key: "warning", description: "Warning states" },
        { name: "Error", value: "hsl(0, 70%, 50%)", hex: colorPalette.error || "#EF4444", css: "bg-destructive", key: "error", description: "Error states" },
      ]
    },
    {
      name: "Neutral Colors",
      colors: [
        { name: "Background", value: "hsl(0, 0%, 100%)", hex: colorPalette.background || "#FFFFFF", css: "bg-background", key: "background", description: "Page backgrounds" },
        { name: "Secondary", value: "hsl(210, 20%, 96%)", hex: colorPalette.secondary || "#F1F3F4", css: "bg-secondary", key: "secondary", description: "Secondary elements" },
        { name: "Border", value: "hsl(214, 20%, 88%)", hex: "#D1D9E0", css: "bg-border", key: "border", description: "Borders and dividers" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Live Edit Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Color Palette</h1>
            <Badge variant="default">Foundation</Badge>
            {isLiveEditEnabled && (
              <Badge variant="outline" className="border-primary text-primary animate-pulse">
                Live Edit Active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Live Edit</span>
              <Switch
                checked={isLiveEditEnabled}
                onCheckedChange={setIsLiveEditEnabled}
              />
            </div>
            <Button variant="outline" onClick={resetToDefault} className="gap-2">
              <Undo className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          Compact color system with live editing capabilities.
          {isLiveEditEnabled && " Click any color to edit it and see instant changes."}
        </p>
      </div>

      {/* Backgrounds Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Background Options
          </CardTitle>
          <CardDescription>Choose from predefined background colors for your interface</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {backgroundOptions.map((bg) => (
              <div 
                key={bg.name}
                className="group cursor-pointer border rounded-lg p-4 hover:shadow-md transition-all"
                onClick={() => applyBackground(bg.value)}
              >
                <div className="space-y-3">
                  <div 
                    className="h-16 w-full rounded border shadow-inner"
                    style={{ backgroundColor: bg.value }}
                  />
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{bg.name}</h4>
                    <p className="text-xs text-muted-foreground">{bg.description}</p>
                    <div className="flex items-center justify-between">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{bg.value}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(bg.value);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compact Color Groups */}
      <div className="space-y-6">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-3">
            <h2 className="text-lg font-semibold">{group.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {group.colors.map((color) => (
                <Card 
                  key={color.name} 
                  className={`group transition-all duration-200 hover:shadow-md ${
                    isLiveEditEnabled 
                      ? 'cursor-pointer hover:border-primary' 
                      : ''
                  }`}
                  onClick={() => handleColorClick(color.name, color.hex, color.key)}
                >
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium truncate flex-1">{color.name}</h4>
                      {isLiveEditEnabled && (
                        <Edit className="h-3 w-3 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                      )}
                    </div>
                    <div 
                      className="h-12 w-full rounded border border-border transition-all duration-200 group-hover:shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <code className="bg-muted px-1.5 py-0.5 rounded font-mono">{color.hex}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(color.hex);
                          }}
                        >
                          <Copy className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{color.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Color Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div 
                className="h-5 w-5 rounded border border-border"
                style={{ backgroundColor: colorValue }}
              />
              Edit {selectedColor?.name} Color
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Live Color Preview</label>
              <div 
                className="w-full h-24 rounded-lg border border-border shadow-inner"
                style={{ backgroundColor: colorValue }}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Color Picker</label>
              <input
                type="color"
                value={colorValue}
                onChange={(e) => setColorValue(e.target.value)}
                className="w-full h-12 rounded-lg border border-border cursor-pointer"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Hex Value</label>
              <input
                type="text"
                value={colorValue}
                onChange={(e) => setColorValue(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-mono"
                placeholder="#FF4A00"
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleColorUpdate} className="gap-2">
                <Palette className="h-4 w-4" />
                Apply Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for using our compact color system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-success">Enhanced Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Compact tiles for efficient browsing</li>
                <li>• Live hex code editing with instant preview</li>
                <li>• Background options for quick theming</li>
                <li>• Copy-to-clipboard for all color values</li>
                <li>• Real-time CSS variable updates</li>
                <li>• Mobile-responsive grid layout</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use Live Edit to experiment safely</li>
                <li>• Test background options for readability</li>
                <li>• Maintain contrast ratios (4.5:1 minimum)</li>
                <li>• Copy CSS classes for consistency</li>
                <li>• Use semantic colors appropriately</li>
                <li>• Reset to defaults when needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
