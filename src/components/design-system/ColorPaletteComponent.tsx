
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Palette, undo, edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";

export default function ColorPaletteComponent() {
  const { colorPalette, updateColorPalette } = useLocalDesignSystem();
  const [isLiveEditEnabled, setIsLiveEditEnabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState<{name: string, value: string} | null>(null);
  const [colorValue, setColorValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `Color value ${text} has been copied to your clipboard.`,
    });
  };

  const handleColorClick = (name: string, value: string) => {
    if (!isLiveEditEnabled) return;
    
    setSelectedColor({ name, value });
    setColorValue(value);
    setIsDialogOpen(true);
  };

  const handleColorUpdate = () => {
    if (selectedColor) {
      const updatedPalette = {
        ...colorPalette,
        [selectedColor.name.toLowerCase()]: colorValue
      };
      updateColorPalette(updatedPalette);
      toast({
        title: "Color updated",
        description: `${selectedColor.name} has been updated to ${colorValue}. Changes are now live!`,
      });
      setIsDialogOpen(false);
      setSelectedColor(null);
    }
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

  const colorGroups = [
    {
      name: "Brand Colors",
      colors: [
        { name: "Orange", value: "hsl(16, 100%, 50%)", hex: colorPalette.orange || "#FF4A00", css: "bg-orange", description: "VybeUI signature orange accent color" },
        { name: "Earth", value: "hsl(225, 25%, 15%)", hex: "#2A3441", css: "bg-earth", description: "Deep earth tone for contrast" },
        { name: "Cream", value: "hsl(45, 25%, 95%)", hex: "#F8F6F3", css: "bg-cream", description: "Warm neutral background" },
        { name: "Almost White", value: "hsl(210, 20%, 98%)", hex: "#FBFCFC", css: "bg-almost-white", description: "Subtle off-white tone" },
      ]
    },
    {
      name: "Primary Colors",
      colors: [
        { name: "Primary", value: "hsl(16, 100%, 50%)", hex: colorPalette.primary || "#FF4A00", css: "bg-primary", description: "Main brand color" },
        { name: "Primary Foreground", value: "hsl(0, 0%, 100%)", hex: "#FFFFFF", css: "bg-primary-foreground", description: "Text on primary background" },
      ]
    },
    {
      name: "Secondary Colors", 
      colors: [
        { name: "Secondary", value: "hsl(210, 20%, 96%)", hex: colorPalette.secondary || "#F1F3F4", css: "bg-secondary", description: "Secondary brand color" },
        { name: "Secondary Foreground", value: "hsl(225, 15%, 20%)", hex: "#2B3544", css: "bg-secondary-foreground", description: "Text on secondary background" },
      ]
    },
    {
      name: "Semantic Colors",
      colors: [
        { name: "Success", value: "hsl(142, 71%, 45%)", hex: colorPalette.success || "#22C55E", css: "bg-success", description: "Success states" },
        { name: "Warning", value: "hsl(38, 92%, 50%)", hex: colorPalette.warning || "#F59E0B", css: "bg-warning", description: "Warning states" },
        { name: "Destructive", value: "hsl(0, 70%, 50%)", hex: colorPalette.error || "#EF4444", css: "bg-destructive", description: "Error states" },
        { name: "Info", value: "hsl(200, 95%, 40%)", hex: "#0EA5E9", css: "bg-info", description: "Information states" },
      ]
    },
    {
      name: "Neutral Colors",
      colors: [
        { name: "Background", value: "hsl(0, 0%, 100%)", hex: colorPalette.background || "#FFFFFF", css: "bg-background", description: "Page background" },
        { name: "Foreground", value: "hsl(225, 15%, 20%)", hex: colorPalette.text || "#2B3544", css: "bg-foreground", description: "Primary text" },
        { name: "Muted", value: "hsl(210, 20%, 96%)", hex: "#F1F3F4", css: "bg-muted", description: "Subtle background" },
        { name: "Muted Foreground", value: "hsl(225, 8%, 60%)", hex: "#8B9299", css: "bg-muted-foreground", description: "Subtle text" },
        { name: "Border", value: "hsl(214, 20%, 88%)", hex: "#D1D9E0", css: "bg-border", description: "Default borders" },
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
              <undo className="h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          Complete color system with brand, semantic, and neutral colors designed for accessibility and consistency.
          {isLiveEditEnabled && " Click any color to edit it and see live changes across the entire design system."}
        </p>
      </div>

      {/* Color Groups */}
      <div className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color) => (
                <Card 
                  key={color.name} 
                  className={`group transition-all duration-200 ${
                    isLiveEditEnabled 
                      ? 'hover:shadow-md cursor-pointer hover:border-primary' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleColorClick(color.name, color.hex)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {color.name}
                        {isLiveEditEnabled && (
                          <edit className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                        )}
                      </CardTitle>
                      <div 
                        className="h-6 w-6 rounded border border-border shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        title={isLiveEditEnabled ? `Click to edit ${color.name}` : color.value}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription>{color.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">HEX:</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{color.hex}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.hex);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">HSL:</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{color.value}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.value);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">CSS:</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{color.css}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.css);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* Enhanced Color swatch with interaction hint */}
                    <div 
                      className={`h-16 w-full rounded border border-border transition-all duration-200 ${
                        isLiveEditEnabled 
                          ? 'shadow-inner group-hover:shadow-md cursor-pointer' 
                          : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    {isLiveEditEnabled && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Palette className="h-3 w-3" />
                        Click to edit and see live changes
                      </div>
                    )}
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
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
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
          <CardDescription>Best practices for using our color system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-success">Do</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use semantic colors for their intended purpose</li>
                <li>• Maintain sufficient contrast ratios (4.5:1 minimum)</li>
                <li>• Use CSS custom properties for theming</li>
                <li>• Test colors in both light and dark modes</li>
                <li>• Copy hex values for consistent implementation</li>
                {isLiveEditEnabled && <li>• Use Live Edit to experiment safely with revert option</li>}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-destructive">Don't</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use hardcoded color values</li>
                <li>• Mix semantic meanings (e.g., red for success)</li>
                <li>• Rely solely on color to convey information</li>
                <li>• Use too many colors in a single interface</li>
                <li>• Modify the VybeUI orange without approval</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
