import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Copy, Figma, FileCode, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Image, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ToggleGroupShowcase() {
  const [alignment, setAlignment] = useState("center");
  const [formatting, setFormatting] = useState<string[]>([]);
  const [view, setView] = useState("list");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const [value, setValue] = useState("center");

<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
    multiple: `// Multiple selection
const [value, setValue] = useState<string[]>([]);

<ToggleGroup type="multiple" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
    sizes: `// Different sizes
<ToggleGroup type="single" size="sm">
  <ToggleGroupItem value="option1">Small</ToggleGroupItem>
  <ToggleGroupItem value="option2">Small</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="single" size="lg">
  <ToggleGroupItem value="option1">Large</ToggleGroupItem>
  <ToggleGroupItem value="option2">Large</ToggleGroupItem>
</ToggleGroup>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Toggle Group</h1>
            <p className="text-lg text-muted-foreground">
              Grouped toggle buttons for single or multiple selection with icons and text.
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
          <Badge variant="outline">Input</Badge>
          <Badge variant="outline">Selection</Badge>
        </div>
      </div>

      {/* Single Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Single Selection</CardTitle>
          <CardDescription>
            Toggle group allowing only one selection at a time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">Text Alignment</h4>
                <ToggleGroup 
                  type="single" 
                  value={alignment} 
                  onValueChange={(value) => {
                    if (value) setAlignment(value);
                  }}
                >
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-xs text-muted-foreground">
                  Selected: {alignment}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">View Mode</h4>
                <ToggleGroup 
                  type="single" 
                  value={view} 
                  onValueChange={(value) => {
                    if (value) setView(value);
                  }}
                >
                  <ToggleGroupItem value="list">List</ToggleGroupItem>
                  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
                  <ToggleGroupItem value="card">Card</ToggleGroupItem>
                </ToggleGroup>
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

      {/* Multiple Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Selection</CardTitle>
          <CardDescription>
            Toggle group allowing multiple selections simultaneously.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">Text Formatting</h4>
                <ToggleGroup 
                  type="multiple" 
                  value={formatting} 
                  onValueChange={setFormatting}
                >
                  <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-xs text-muted-foreground">
                  Selected: {formatting.length > 0 ? formatting.join(", ") : "none"}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">Content Types</h4>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="text">
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </ToggleGroupItem>
                  <ToggleGroupItem value="image">
                    <Image className="h-4 w-4 mr-2" />
                    Image
                  </ToggleGroupItem>
                  <ToggleGroupItem value="video">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Multiple Selection Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.multiple)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.multiple}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Different Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Different Sizes</CardTitle>
          <CardDescription>
            Toggle groups in various sizes for different use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-8">
              
              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">Small Size</h4>
                <ToggleGroup type="single" size="sm">
                  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">Default Size</h4>
                <ToggleGroup type="single">
                  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <h4 className="text-sm font-medium">Large Size</h4>
                <ToggleGroup type="single" size="lg">
                  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                </ToggleGroup>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Sizes Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.sizes)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.sizes}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for toggle groups and user interaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Single or multiple selection</li>
                <li>• Keyboard navigation</li>
                <li>• Icon and text support</li>
                <li>• Multiple size variants</li>
                <li>• Accessible labels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, descriptive labels</li>
                <li>• Group related options together</li>
                <li>• Provide appropriate default states</li>
                <li>• Use icons for better recognition</li>
                <li>• Consider mobile touch targets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}