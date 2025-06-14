import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function RadioButtonShowcase() {
  const [basicValue, setBasicValue] = useState("option-1");
  const [planValue, setPlanValue] = useState("pro");
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const basicRadioCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-1" id="option-1" />
    <Label htmlFor="option-1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-2" id="option-2" />
    <Label htmlFor="option-2">Option 2</Label>
  </div>
</RadioGroup>`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Radio Button</h1>
            <p className="text-lg text-muted-foreground">
              Single-selection inputs for mutually exclusive options.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              <FileCode className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
            <Button variant="outline" size="sm">
              <Figma className="h-4 w-4 mr-2" />
              Open in Figma
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Form</Badge>
          <Badge variant="outline">Input</Badge>
          <Badge variant="outline">Selection</Badge>
        </div>
      </div>

      {/* Basic Radio Group */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Radio Group</CardTitle>
          <CardDescription>
            Simple radio button group for single selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg">
            <RadioGroup value={basicValue} onValueChange={setBasicValue}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">Option 3</Label>
              </div>
            </RadioGroup>
          </div>

          {showCode && (
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{basicRadioCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(basicRadioCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Plan Example */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plan Selection</CardTitle>
          <CardDescription>
            Enhanced radio buttons with additional content and styling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={planValue} onValueChange={setPlanValue} className="space-y-4">
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="basic" id="basic" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="basic" className="text-base font-semibold cursor-pointer">
                    Basic Plan
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Perfect for individuals getting started
                  </p>
                  <p className="text-lg font-bold mt-2">$9/month</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="pro" id="pro" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="pro" className="text-base font-semibold cursor-pointer">
                    Pro Plan
                    <Badge variant="secondary" className="ml-2">Most Popular</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    For growing teams and businesses
                  </p>
                  <p className="text-lg font-bold mt-2">$29/month</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="enterprise" className="text-base font-semibold cursor-pointer">
                    Enterprise Plan
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Advanced features for large organizations
                  </p>
                  <p className="text-lg font-bold mt-2">$99/month</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Different Layouts */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Variations</CardTitle>
          <CardDescription>
            Different arrangements and styling options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Horizontal Layout */}
            <div className="space-y-3">
              <h4 className="font-semibold">Horizontal Layout</h4>
              <RadioGroup defaultValue="small" className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="size-small" />
                  <Label htmlFor="size-small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="size-medium" />
                  <Label htmlFor="size-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="size-large" />
                  <Label htmlFor="size-large">Large</Label>
                </div>
              </RadioGroup>
            </div>

            {/* With Descriptions */}
            <div className="space-y-3">
              <h4 className="font-semibold">With Descriptions</h4>
              <RadioGroup defaultValue="public">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="public" id="public" className="mt-1" />
                  <div>
                    <Label htmlFor="public" className="font-medium">Public</Label>
                    <p className="text-sm text-muted-foreground">Anyone can view this item</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="private" id="private" className="mt-1" />
                  <div>
                    <Label htmlFor="private" className="font-medium">Private</Label>
                    <p className="text-sm text-muted-foreground">Only you can view this item</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* States */}
      <Card>
        <CardHeader>
          <CardTitle>Radio Button States</CardTitle>
          <CardDescription>
            Different states including disabled options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Default</h4>
              <RadioGroup defaultValue="enabled">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enabled" id="enabled" />
                  <Label htmlFor="enabled">Enabled Option</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unselected" id="unselected" />
                  <Label htmlFor="unselected">Unselected Option</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Disabled</h4>
              <RadioGroup defaultValue="disabled-selected">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disabled-selected" id="disabled-selected" disabled />
                  <Label htmlFor="disabled-selected" className="text-muted-foreground">Disabled Selected</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disabled-unselected" id="disabled-unselected" disabled />
                  <Label htmlFor="disabled-unselected" className="text-muted-foreground">Disabled Unselected</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Mixed States</h4>
              <RadioGroup defaultValue="available">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="available" />
                  <Label htmlFor="available">Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unavailable" id="unavailable" disabled />
                  <Label htmlFor="unavailable" className="text-muted-foreground">Unavailable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coming-soon" id="coming-soon" disabled />
                  <Label htmlFor="coming-soon" className="text-muted-foreground">Coming Soon</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}