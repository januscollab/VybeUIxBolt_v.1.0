
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Palette, Eyedropper, Shuffle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AdvancedColorPickerShowcase() {
  const [selectedColor, setSelectedColor] = useState('#FF4A00');
  const [hue, setHue] = useState([16]);
  const [saturation, setSaturation] = useState([100]);
  const [lightness, setLightness] = useState([50]);
  const [opacity, setOpacity] = useState([100]);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 1/6) { r = c; g = x; b = 0; }
    else if (1/6 <= h && h < 1/3) { r = x; g = c; b = 0; }
    else if (1/3 <= h && h < 1/2) { r = 0; g = c; b = x; }
    else if (1/2 <= h && h < 2/3) { r = 0; g = x; b = c; }
    else if (2/3 <= h && h < 5/6) { r = x; g = 0; b = c; }
    else if (5/6 <= h && h < 1) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const updateColorFromHsl = () => {
    const newColor = hslToHex(hue[0], saturation[0], lightness[0]);
    setSelectedColor(newColor);
  };

  const generateRandomColor = () => {
    const newHue = Math.floor(Math.random() * 360);
    const newSat = Math.floor(Math.random() * 100) + 1;
    const newLight = Math.floor(Math.random() * 80) + 20;
    
    setHue([newHue]);
    setSaturation([newSat]);
    setLightness([newLight]);
    
    const newColor = hslToHex(newHue, newSat, newLight);
    setSelectedColor(newColor);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied to clipboard",
      description: `Color value ${value} copied successfully.`,
    });
  };

  React.useEffect(() => {
    updateColorFromHsl();
  }, [hue, saturation, lightness]);

  const colorVariants = [
    { name: 'Primary', value: selectedColor },
    { name: 'Light', value: hslToHex(hue[0], saturation[0], Math.min(lightness[0] + 20, 90)) },
    { name: 'Dark', value: hslToHex(hue[0], saturation[0], Math.max(lightness[0] - 20, 10)) },
    { name: 'Muted', value: hslToHex(hue[0], Math.max(saturation[0] - 30, 20), lightness[0]) },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Advanced Color Picker</h1>
          <Badge variant="secondary">Experimental</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Professional color picker with HSL controls, variants generation, and design token integration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Color Preview</CardTitle>
            <CardDescription>Live preview of your selected color</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className="w-full h-32 rounded-lg border border-border shadow-sm transition-all duration-300"
              style={{ backgroundColor: selectedColor }}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hex Code</Label>
                <div className="flex gap-2">
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
              
              <div className="space-y-2">
                <Label>HSL Values</Label>
                <div className="flex gap-2">
                  <Input 
                    value={`hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)`}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={generateRandomColor} variant="outline" className="w-full">
              <Shuffle className="h-4 w-4 mr-2" />
              Generate Random Color
            </Button>
          </CardContent>
        </Card>

        {/* HSL Controls */}
        <Card>
          <CardHeader>
            <CardTitle>HSL Controls</CardTitle>
            <CardDescription>Fine-tune your color with HSL sliders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Hue</Label>
                  <span className="text-sm text-muted-foreground">{hue[0]}°</span>
                </div>
                <Slider
                  value={hue}
                  onValueChange={setHue}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Saturation</Label>
                  <span className="text-sm text-muted-foreground">{saturation[0]}%</span>
                </div>
                <Slider
                  value={saturation}
                  onValueChange={setSaturation}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Lightness</Label>
                  <span className="text-sm text-muted-foreground">{lightness[0]}%</span>
                </div>
                <Slider
                  value={lightness}
                  onValueChange={setLightness}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Opacity</Label>
                  <span className="text-sm text-muted-foreground">{opacity[0]}%</span>
                </div>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Variants */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Color Variants</CardTitle>
            <CardDescription>Automatically generated color variations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorVariants.map((variant) => (
                <div key={variant.name} className="space-y-3">
                  <div 
                    className="w-full h-16 rounded-lg border border-border cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: variant.value }}
                    onClick={() => copyToClipboard(variant.value)}
                  />
                  <div className="text-center space-y-1">
                    <p className="font-medium text-sm">{variant.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{variant.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
