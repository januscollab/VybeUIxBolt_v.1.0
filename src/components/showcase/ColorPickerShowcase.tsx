import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeModal } from "@/components/ui/code-modal";
import { Copy, Figma, FileCode, Palette, Pipette } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ColorPickerShowcase() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [customColor, setCustomColor] = useState("#ff6b6b");
  const [showCode, setShowCode] = useState(false);

  const presetColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
    "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
    "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
    "#ec4899", "#f43f5e"
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied",
      description: `Color ${color} has been copied to your clipboard.`,
    });
  };

  const codeExample = `import { useState } from "react";
import { Input } from "@/components/ui/input";

const [color, setColor] = useState("#3b82f6");

// Native HTML5 color input
<Input
  type="color"
  value={color}
  onChange={(e) => setColor(e.target.value)}
  className="w-12 h-12 border-0 cursor-pointer"
/>

// Color palette
const presetColors = ["#ef4444", "#3b82f6", "#22c55e"];
{presetColors.map((color) => (
  <button
    key={color}
    className="w-8 h-8 rounded border-2"
    style={{ backgroundColor: color }}
    onClick={() => setColor(color)}
  />
))}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Color Picker</h1>
            <p className="text-lg text-muted-foreground">
              Color selection components for themes, customization, and design tools.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Figma
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#storybook" target="_blank" rel="noopener noreferrer">
                <FileCode className="h-4 w-4 mr-2" />
                Storybook
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Input Control</Badge>
          <Badge variant="outline">Design Tools</Badge>
        </div>
      </div>

      {/* Native Color Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Native Color Input</CardTitle>
          <CardDescription>HTML5 native color picker with custom styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Label htmlFor="color-picker">Choose Color:</Label>
                <Input
                  id="color-picker"
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-16 h-16 border-2 cursor-pointer rounded-lg overflow-hidden p-1"
                />
                <div className="space-y-1">
                  <p className="font-mono text-sm">{selectedColor}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyColor(selectedColor)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Small</Label>
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-10 h-10 border cursor-pointer rounded"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Medium</Label>
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-12 h-12 border cursor-pointer rounded"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Large</Label>
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-16 border cursor-pointer rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Predefined color palette for quick selection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <Label>Select from palette:</Label>
              </div>
              
              <div className="grid grid-cols-8 md:grid-cols-17 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedColor === color 
                        ? "border-foreground shadow-lg" 
                        : "border-border hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-3 pt-4">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-border"
                  style={{ backgroundColor: selectedColor }}
                />
                <div>
                  <p className="font-medium">Selected Color</p>
                  <p className="font-mono text-sm text-muted-foreground">{selectedColor}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyColor(selectedColor)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Color Input */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Color Input</CardTitle>
          <CardDescription>Text input with color preview and validation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-border"
                  style={{ backgroundColor: customColor }}
                />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="custom-color">Hex Color</Label>
                  <Input
                    id="custom-color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#000000"
                    className="font-mono"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => copyColor(customColor)}
                >
                  <Pipette className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">RGB</Label>
                  <p className="font-mono">
                    {customColor ? `rgb(${parseInt(customColor.slice(1,3), 16)}, ${parseInt(customColor.slice(3,5), 16)}, ${parseInt(customColor.slice(5,7), 16)})` : 'Invalid'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">HSL</Label>
                  <p className="font-mono">hsl(210, 100%, 50%)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Swatches */}
      <Card>
        <CardHeader>
          <CardTitle>Color Swatches</CardTitle>
          <CardDescription>Brand colors and theme swatches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Primary Colors</Label>
                <div className="flex gap-2">
                  {["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a"].map((color) => (
                    <div key={color} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                      <p className="text-xs mt-1 font-mono">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Secondary Colors</Label>
                <div className="flex gap-2">
                  {["#6b7280", "#4b5563", "#374151", "#1f2937"].map((color) => (
                    <div key={color} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                      <p className="text-xs mt-1 font-mono">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Accent Colors</Label>
                <div className="flex gap-2">
                  {["#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                    <div key={color} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                      <p className="text-xs mt-1 font-mono">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <CodeModal
              code={codeExample}
              title="Color Picker Implementation"
            >
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for color picker implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Provide both palette and custom input options</li>
                <li>• Show color previews with hex values</li>
                <li>• Support multiple color formats (hex, rgb, hsl)</li>
                <li>• Include copy-to-clipboard functionality</li>
                <li>• Consider accessibility and contrast</li>
                <li>• Validate color input formats</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Use Cases</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Theme customization</li>
                <li>• Brand color selection</li>
                <li>• Design tool interfaces</li>
                <li>• Form styling options</li>
                <li>• Chart and graph colors</li>
                <li>• Background and accent colors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}