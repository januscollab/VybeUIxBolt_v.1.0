
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Palette } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";

export default function InteractiveColorPalette() {
  const { colorPalette, updateColorPalette } = useLocalDesignSystem();
  const [selectedColor, setSelectedColor] = useState<{name: string, value: string} | null>(null);
  const [colorValue, setColorValue] = useState("");

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
        description: `${selectedColor.name} has been updated to ${colorValue}`,
      });
      setSelectedColor(null);
    }
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
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Interactive Color Palette</h1>
          <Badge variant="default">Interactive</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Click any color to edit it and see live changes across the entire design system.
        </p>
      </div>

      {/* Color Groups */}
      <div className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color) => (
                <Dialog key={color.name}>
                  <DialogTrigger asChild>
                    <Card 
                      className="group hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleColorClick(color.name, color.hex)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{color.name}</CardTitle>
                          <div 
                            className={`h-6 w-6 rounded border border-border ${color.css}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.value}
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
                        {/* Color swatch */}
                        <div 
                          className="h-16 w-full rounded border border-border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Palette className="h-3 w-3" />
                          Click to edit
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit {selectedColor?.name} Color</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Color Value</label>
                        <input
                          type="color"
                          value={colorValue}
                          onChange={(e) => setColorValue(e.target.value)}
                          className="w-full h-20 rounded border border-border cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hex Value</label>
                        <input
                          type="text"
                          value={colorValue}
                          onChange={(e) => setColorValue(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary"
                          placeholder="#FF4A00"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setSelectedColor(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleColorUpdate}>
                          Update Color
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Color Editing</CardTitle>
          <CardDescription>How to use the interactive color system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-success">Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Click any color to open the editor</li>
                <li>• Use color picker or enter hex values</li>
                <li>• See live preview across the design system</li>
                <li>• Changes are automatically saved</li>
                <li>• Export/import color configurations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Maintain sufficient contrast ratios</li>
                <li>• Test colors in both light and dark modes</li>
                <li>• Keep brand consistency in mind</li>
                <li>• Use semantic color meanings appropriately</li>
                <li>• Test accessibility with screen readers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
