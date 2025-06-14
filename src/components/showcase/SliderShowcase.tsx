import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode, Volume2, Sun, Settings, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SliderShowcase() {
  const [singleValue, setSingleValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [volume, setVolume] = useState([75]);
  const [brightness, setBrightness] = useState([60]);
  const [priceRange, setPriceRange] = useState([100, 500]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<Slider
  defaultValue={[50]}
  max={100}
  step={1}
  className="w-full"
  onValueChange={(value) => setValue(value)}
/>`,
    range: `<Slider
  defaultValue={[20, 80]}
  max={100}
  step={1}
  className="w-full"
  onValueChange={(value) => setRange(value)}
/>`,
    withLabel: `<div className="space-y-4">
  <div className="flex justify-between">
    <Label>Volume</Label>
    <span className="text-sm text-muted-foreground">{volume[0]}%</span>
  </div>
  <Slider
    value={volume}
    max={100}
    step={1}
    onValueChange={setVolume}
    className="w-full"
  />
</div>`,
    disabled: `<Slider
  defaultValue={[25]}
  max={100}
  step={1}
  disabled
  className="w-full"
/>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Slider</h1>
            <p className="text-lg text-muted-foreground">
              Interactive range input control for selecting values within a specified range with precise control.
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
          <Badge variant="outline">Form Control</Badge>
          <Badge variant="outline">Supabase Ready</Badge>
        </div>
      </div>

      {/* Basic Slider */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Slider</CardTitle>
          <CardDescription>
            Standard slider implementation with single value selection and customizable ranges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Single Value</Label>
                  <span className="text-sm text-muted-foreground">{singleValue[0]}</span>
                </div>
                <Slider
                  value={singleValue}
                  max={100}
                  step={1}
                  onValueChange={setSingleValue}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Default Slider</Label>
                  <span className="text-sm text-muted-foreground">25</span>
                </div>
                <Slider
                  defaultValue={[25]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Custom Steps</Label>
                  <span className="text-sm text-muted-foreground">50 (step: 10)</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.basic)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.basic}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Range Slider */}
      <Card>
        <CardHeader>
          <CardTitle>Range Slider</CardTitle>
          <CardDescription>
            Dual-handle slider for selecting a range of values with minimum and maximum constraints.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Range Selection</Label>
                  <span className="text-sm text-muted-foreground">
                    {rangeValue[0]} - {rangeValue[1]}
                  </span>
                </div>
                <Slider
                  value={rangeValue}
                  max={100}
                  step={1}
                  onValueChange={setRangeValue}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price Range
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  max={1000}
                  min={0}
                  step={25}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$1,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Range Slider Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.range)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.range}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Slider with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Slider with Icons & Context</CardTitle>
          <CardDescription>
            Enhanced sliders with visual icons and contextual information for better user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Volume
                  </Label>
                  <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-8">Max</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Brightness
                  </Label>
                  <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <Sun className="h-3 w-3 text-muted-foreground" />
                  <Slider
                    value={brightness}
                    max={100}
                    step={5}
                    onValueChange={setBrightness}
                    className="flex-1"
                  />
                  <Sun className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Disabled Setting
                  </Label>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  disabled
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  This setting is currently locked
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Icon Slider Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withLabel)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withLabel}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Slider States */}
      <Card>
        <CardHeader>
          <CardTitle>Slider States & Variants</CardTitle>
          <CardDescription>
            Different slider states including disabled, sizes, and orientation options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-8">
              <div className="space-y-4">
                <Label>Small Slider</Label>
                <Slider
                  defaultValue={[30]}
                  max={100}
                  step={1}
                  className="w-full h-1"
                />
              </div>

              <div className="space-y-4">
                <Label>Large Slider</Label>
                <Slider
                  defaultValue={[70]}
                  max={100}
                  step={1}
                  className="w-full h-3"
                />
              </div>

              <div className="space-y-4">
                <Label>Color Variant</Label>
                <Slider
                  defaultValue={[85]}
                  max={100}
                  step={1}
                  className="w-full [&>span[role=slider]]:bg-green-500 [&>[role=slider]]:border-green-500 [&>span[data-orientation=horizontal]]:bg-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Stepped Slider (5-step)</Label>
                  <Slider
                    defaultValue={[40]}
                    max={100}
                    step={20}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>20</span>
                    <span>40</span>
                    <span>60</span>
                    <span>80</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Fine Control (0.1 step)</Label>
                  <Slider
                    defaultValue={[5.5]}
                    max={10}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.0</span>
                    <span>5.0</span>
                    <span>10.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Disabled State Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.disabled)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.disabled}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Slider components integrated with Supabase for user preferences and settings persistence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Integer/float column mapping for slider values</li>
              <li>• User preferences and settings storage</li>
              <li>• Real-time value synchronization</li>
              <li>• Range filtering and search parameters</li>
              <li>• Configuration management</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Common Use Cases</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// User settings</code>
              <code className="block">volume_level: integer</code>
              <code className="block">brightness: integer</code>
              <code className="block">// Filter ranges</code>
              <code className="block">price_min: decimal</code>
              <code className="block">price_max: decimal</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible slider components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA role="slider" with proper attributes</li>
                <li>• Keyboard navigation (Arrow keys, Home, End)</li>
                <li>• Focus indicators and states</li>
                <li>• Screen reader value announcements</li>
                <li>• Touch and pointer device support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide clear labels and value indicators</li>
                <li>• Use appropriate step sizes for precision</li>
                <li>• Include min/max labels when helpful</li>
                <li>• Consider touch target size (44px min)</li>
                <li>• Provide immediate visual feedback</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}