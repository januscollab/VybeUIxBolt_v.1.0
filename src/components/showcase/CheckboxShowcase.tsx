
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode, Check, Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function CheckboxShowcase() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState<boolean | "indeterminate">("indeterminate");
  const [groupChecked, setGroupChecked] = useState({
    option1: true,
    option2: false,
    option3: true,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<div className="flex items-center space-x-2">
  <Checkbox 
    id="terms" 
    checked={checked}
    onCheckedChange={setChecked}
  />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
    indeterminate: `<div className="flex items-center space-x-2">
  <Checkbox 
    id="indeterminate" 
    checked={indeterminate}
    onCheckedChange={setIndeterminate}
  />
  <Label htmlFor="indeterminate">Select all items</Label>
</div>`,
    group: `const [selections, setSelections] = useState({
  option1: true,
  option2: false,
  option3: true,
});

<div className="space-y-2">
  {Object.entries(selections).map(([key, value]) => (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox 
        id={key}
        checked={value}
        onCheckedChange={(checked) => 
          setSelections(prev => ({ ...prev, [key]: checked }))
        }
      />
      <Label htmlFor={key}>Option {key.slice(-1)}</Label>
    </div>
  ))}
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Checkbox</h1>
            <p className="text-lg text-muted-foreground">
              Binary input control for selecting multiple options with support for indeterminate states.
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

      {/* Basic Checkbox */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Checkbox</CardTitle>
          <CardDescription>
            Standard checkbox implementation with controlled state management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="basic-checkbox" 
                  checked={basicChecked}
                  onCheckedChange={(checked) => setBasicChecked(checked === true)}
                />
                <Label htmlFor="basic-checkbox">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled" className="text-muted-foreground">Disabled option</Label>
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

      {/* Indeterminate State */}
      <Card>
        <CardHeader>
          <CardTitle>Indeterminate State</CardTitle>
          <CardDescription>
            Checkbox with three states: checked, unchecked, and indeterminate for parent-child relationships.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="select-all" 
                  checked={indeterminate}
                  onCheckedChange={setIndeterminate}
                />
                <Label htmlFor="select-all">Select all items</Label>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="item1" checked />
                  <Label htmlFor="item1">Item 1 (checked)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="item2" />
                  <Label htmlFor="item2">Item 2 (unchecked)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="item3" checked />
                  <Label htmlFor="item3">Item 3 (checked)</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Indeterminate Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.indeterminate)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.indeterminate}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Checkbox Group */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Groups</CardTitle>
          <CardDescription>
            Multiple checkbox components working together with shared state management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="font-medium">Select your preferences:</h4>
              <div className="space-y-3">
                {Object.entries(groupChecked).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => 
                        setGroupChecked(prev => ({ ...prev, [key]: checked === true }))
                      }
                    />
                    <Label htmlFor={key}>
                      {key === 'option1' && 'Email notifications'}
                      {key === 'option2' && 'SMS notifications'}
                      {key === 'option3' && 'Push notifications'}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Group Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.group)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.group}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Checkbox components integrated with Supabase for real-time data persistence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2">Database Integration</h4>
            <ul className="text-sm text-primary space-y-1">
              <li>• Boolean column mapping for checkbox states</li>
              <li>• Array column support for multi-select checkboxes</li>
              <li>• Real-time updates with Supabase subscriptions</li>
              <li>• Optimistic UI updates for better UX</li>
              <li>• Form validation with Supabase schemas</li>
            </ul>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <h4 className="font-medium text-success mb-2">Usage Patterns</h4>
            <div className="text-sm text-success space-y-1">
              <code className="block">// User preferences</code>
              <code className="block">user_preferences: boolean[]</code>
              <code className="block">// Feature flags</code>
              <code className="block">enabled_features: text[]</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible checkbox components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Proper ARIA labels and descriptions</li>
                <li>• Keyboard navigation support (Space to toggle)</li>
                <li>• Focus indicators and states</li>
                <li>• Screen reader announcements</li>
                <li>• High contrast mode support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, descriptive labels</li>
                <li>• Group related checkboxes logically</li>
                <li>• Provide visual feedback for state changes</li>
                <li>• Consider indeterminate state for hierarchies</li>
                <li>• Validate selections appropriately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
