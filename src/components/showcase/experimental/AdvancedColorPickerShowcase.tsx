
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Figma, Palette, CircleDot } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdvancedColorPickerShowcase() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [hue, setHue] = useState([214]);
  const [saturation, setSaturation] = useState([83]);
  const [lightness, setLightness] = useState([53]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Color value has been copied to your clipboard.",
    });
  };

  const presetColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308",
    "#84cc16", "#22c55e", "#10b981", "#14b8a6",
    "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Advanced Color Picker</h1>
            <p className="text-lg text-muted-foreground">
              Professional color selection with multiple input methods and precise controls.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Figma
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning">Experimental</Badge>
          <Badge variant="outline">Color System</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Advanced Color Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Color Selection Interface</CardTitle>
          <CardDescription>
            Complete color picker with HSL controls, presets, and multiple format outputs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Preview */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Selected Color</Label>
                <div 
                  className="w-full h-32 rounded-lg border-2 border-border shadow-sm"
                  style={{ backgroundColor: selectedColor }}
                />
                <div className="flex items-center gap-2">
                  <Input 
                    value={selectedColor} 
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(selectedColor)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preset Colors */}
              <div className="space-y-3">
                <Label>Preset Colors</Label>
                <div className="grid grid-cols-8 gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <Tabs defaultValue="hsl" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hsl" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Hue: {hue[0]}°</Label>
                      <Slider
                        value={hue}
                        onValueChange={setHue}
                        max={360}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Saturation: {saturation[0]}%</Label>
                      <Slider
                        value={saturation}
                        onValueChange={setSaturation}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Lightness: {lightness[0]}%</Label>
                      <Slider
                        value={lightness}
                        onValueChange={setLightness}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rgb" className="space-y-4">
                  <p className="text-sm text-muted-foreground">RGB controls would be implemented here</p>
                </TabsContent>
              </Tabs>

              {/* Format Output */}
              <div className="space-y-3">
                <Label>Format Output</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">HEX</span>
                    <Input value={selectedColor} readOnly className="font-mono" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(selectedColor)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">HSL</span>
                    <Input value={`hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)`} readOnly className="font-mono" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(`hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)`)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
                <li>• Provide multiple color format outputs</li>
                <li>• Include preset color palettes</li>
                <li>• Show live preview of selected color</li>
                <li>• Support keyboard navigation</li>
                <li>• Validate color values on input</li>
                <li>• Consider accessibility contrast</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">When to Use</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Theme customization interfaces</li>
                <li>• Design tools and editors</li>
                <li>• Brand color selection</li>
                <li>• Chart and visualization tools</li>
                <li>• Advanced styling controls</li>
                <li>• Creative applications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
