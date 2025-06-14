import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function RadioGroupShowcase() {
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

  const codeExample = `<RadioGroup value={value} onValueChange={setValue}>
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
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Radio Group</h1>
            <p className="text-lg text-muted-foreground">
              A set of checkable buttons where only one can be selected at a time.
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

      {/* Basic Radio Group */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Radio Group</CardTitle>
          <CardDescription>Standard radio group with multiple options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="font-medium">Choose an option:</h4>
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-4" id="option-4" disabled />
                  <Label htmlFor="option-4" className="text-muted-foreground">Option 4 (disabled)</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground">Selected: {basicValue}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? "Hide" : "Show"} Code
              </Button>
              {showCode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(codeExample)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>
          </div>
          {showCode && (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Pricing Plans Example */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans Selection</CardTitle>
          <CardDescription>Radio group with enhanced styling for plan selection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <RadioGroup value={planValue} onValueChange={setPlanValue} className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-background/50 transition-colors">
                <RadioGroupItem value="free" id="free" />
                <div className="flex-1">
                  <Label htmlFor="free" className="text-base font-medium cursor-pointer">Free Plan</Label>
                  <p className="text-sm text-muted-foreground">Basic features for personal use</p>
                  <p className="text-lg font-semibold">$0/month</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-background/50 transition-colors">
                <RadioGroupItem value="pro" id="pro" />
                <div className="flex-1">
                  <Label htmlFor="pro" className="text-base font-medium cursor-pointer">Pro Plan</Label>
                  <p className="text-sm text-muted-foreground">Advanced features for professionals</p>
                  <p className="text-lg font-semibold">$19/month</p>
                </div>
                <Badge>Popular</Badge>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-background/50 transition-colors">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <div className="flex-1">
                  <Label htmlFor="enterprise" className="text-base font-medium cursor-pointer">Enterprise Plan</Label>
                  <p className="text-sm text-muted-foreground">Full features for large teams</p>
                  <p className="text-lg font-semibold">$99/month</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Horizontal Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Horizontal Layout</CardTitle>
          <CardDescription>Radio group arranged horizontally for compact layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="font-medium">Select size:</h4>
              <RadioGroup defaultValue="medium" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for radio group implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use clear, descriptive labels</li>
                <li>• Provide a default selection when appropriate</li>
                <li>• Arrange options in logical order</li>
                <li>• Use consistent spacing and alignment</li>
                <li>• Consider horizontal layout for few options</li>
                <li>• Include helper text for complex choices</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">When to Use</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Mutually exclusive options (only one choice)</li>
                <li>• 2-7 options (use select for more)</li>
                <li>• All options should be visible</li>
                <li>• User needs to compare options</li>
                <li>• Settings and preferences</li>
                <li>• Form inputs requiring single selection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}