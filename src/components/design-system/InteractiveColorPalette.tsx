
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Palette, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";

export default function InteractiveColorPalette() {
  const { colorPalette, updateColorPalette } = useLocalDesignSystem();
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
        description: `${selectedColor.name} has been updated to ${colorValue}. Changes are now live across the design system!`,
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
        { name: "Orange", value: colorPalette.orange || "#FF4A00", hex: colorPalette.orange || "#FF4A00", css: "bg-orange", description: "VybeUI signature orange accent color" },
        { name: "Primary", value: colorPalette.primary || "#FF4A00", hex: colorPalette.primary || "#FF4A00", css: "bg-primary", description: "Main brand color" },
      ]
    },
    {
      name: "Semantic Colors",
      colors: [
        { name: "Success", value: colorPalette.success || "#22C55E", hex: colorPalette.success || "#22C55E", css: "bg-success", description: "Success states" },
        { name: "Warning", value: colorPalette.warning || "#F59E0B", hex: colorPalette.warning || "#F59E0B", css: "bg-warning", description: "Warning states" },
        { name: "Error", value: colorPalette.error || "#EF4444", hex: colorPalette.error || "#EF4444", css: "bg-destructive", description: "Error states" },
      ]
    },
    {
      name: "Neutral Colors",
      colors: [
        { name: "Background", value: colorPalette.background || "#FFFFFF", hex: colorPalette.background || "#FFFFFF", css: "bg-background", description: "Page background" },
        { name: "Text", value: colorPalette.text || "#2B3544", hex: colorPalette.text || "#2B3544", css: "bg-foreground", description: "Primary text" },
        { name: "Secondary", value: colorPalette.secondary || "#6b7280", hex: colorPalette.secondary || "#6b7280", css: "bg-secondary", description: "Secondary elements" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Reset Button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Interactive Color Palette</h1>
            <Badge variant="default">Live Editing</Badge>
          </div>
          <Button variant="outline" onClick={resetToDefault} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Default
          </Button>
        </div>
        <p className="text-lg text-muted-foreground">
          Click any color to edit it and see live changes across the entire design system. Changes are automatically applied and saved.
        </p>
      </div>

      {/* Live Preview Banner */}
      <Card className="border-primary bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-primary rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">Live Preview Active</p>
            <p className="text-sm text-muted-foreground">Color changes are instantly applied across all components</p>
          </div>
        </CardContent>
      </Card>

      {/* Color Groups */}
      <div className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color) => (
                <Card 
                  key={color.name}
                  className="group hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary"
                  onClick={() => handleColorClick(color.name, color.hex)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{color.name}</CardTitle>
                      <div 
                        className="h-8 w-8 rounded-lg border-2 border-border shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        title={`Click to edit ${color.name}`}
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
                    {/* Enhanced Color swatch with hover effect */}
                    <div 
                      className="h-20 w-full rounded-lg border border-border shadow-inner transition-all duration-200 group-hover:shadow-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Palette className="h-3 w-3" />
                      Click to edit and see live changes
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Color Editor Dialog */}
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

      {/* Enhanced Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Live Color System Features</CardTitle>
          <CardDescription>Advanced color editing and real-time preview capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Interactive Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Click any color card to open the editor</li>
                <li>• Use color picker or enter hex values directly</li>
                <li>• See instant preview in the editor dialog</li>
                <li>• Changes apply immediately across the entire system</li>
                <li>• All changes are automatically saved to localStorage</li>
                <li>• Reset all colors to default with one click</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-primary">Design Guidelines</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Maintain WCAG AA contrast ratios (4.5:1)</li>
                <li>• Test colors in both light and dark modes</li>
                <li>• Keep brand consistency with orange primary</li>
                <li>• Use semantic meanings appropriately</li>
                <li>• Consider colorblind accessibility</li>
                <li>• Preview on different screen types</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
