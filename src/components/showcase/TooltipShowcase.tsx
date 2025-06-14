import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Figma, FileCode, Info, HelpCircle, Settings, Heart, Star, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function TooltipShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    positioning: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Top tooltip</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip positioned on top</p>
  </TooltipContent>
</Tooltip>`,
    rich: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Rich content</Button>
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <div className="space-y-2">
      <p className="font-medium">Feature Details</p>
      <p className="text-sm text-muted-foreground">
        This advanced feature includes analytics, 
        reporting, and custom configurations.
      </p>
    </div>
  </TooltipContent>
</Tooltip>`
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Tooltip</h1>
              <p className="text-lg text-muted-foreground">
                A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
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
            <Badge variant="outline">Overlay</Badge>
            <Badge variant="outline">Accessibility Ready</Badge>
          </div>
        </div>

        {/* Basic Tooltip */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Tooltip</CardTitle>
            <CardDescription>
              Simple tooltips that appear on hover or focus to provide additional context.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-muted/50">
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a basic tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Info className="h-4 w-4 mr-2" />
                      Information
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get more details about this feature</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help & Documentation</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open Settings</p>
                  </TooltipContent>
                </Tooltip>
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

        {/* Tooltip Positioning */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip Positioning</CardTitle>
            <CardDescription>
              Tooltips can be positioned on different sides of the trigger element.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-muted/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Top</Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Tooltip on top</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Right</Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Tooltip on right</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Tooltip on bottom</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Left</Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Tooltip on left</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-medium">Positioning Code</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(codeExamples.positioning)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExamples.positioning}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Rich Content Tooltips */}
        <Card>
          <CardHeader>
            <CardTitle>Rich Content Tooltips</CardTitle>
            <CardDescription>
              Tooltips with rich content including multiple elements and custom styling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-muted/50">
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Feature Info</Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-medium">Advanced Feature</p>
                      <p className="text-sm text-muted-foreground">
                        This feature includes analytics, reporting, and custom configurations 
                        to help you get the most out of your workflow.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Favorite
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>Add to favorites</span>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Rate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <div className="space-y-1">
                      <p className="font-medium">Rate this item</p>
                      <p className="text-sm text-muted-foreground">
                        Your rating helps improve recommendations
                      </p>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">Share</p>
                      <p className="text-xs text-muted-foreground">Ctrl+Shift+S</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-medium">Rich Content Code</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(codeExamples.rich)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExamples.rich}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Accessibility & Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility & Guidelines</CardTitle>
            <CardDescription>
              Best practices for implementing accessible tooltip components.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Accessibility Features</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• ARIA attributes for screen reader support</li>
                  <li>• Keyboard navigation (Tab, Escape)</li>
                  <li>• Focus and hover trigger support</li>
                  <li>• Automatic positioning and collision detection</li>
                  <li>• Proper dismiss behavior and timing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Keep tooltip content concise and helpful</li>
                  <li>• Use for non-essential supplementary information</li>
                  <li>• Avoid interactive content inside tooltips</li>
                  <li>• Ensure sufficient color contrast</li>
                  <li>• Consider mobile touch interactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}