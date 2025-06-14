import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/core/Resizable";
import { Copy, Figma, FileCode, Grip, Layout, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ResizableShowcase() {
  const [collapsed, setCollapsed] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    horizontal: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/core/Resizable";

<ResizablePanelGroup direction="horizontal" className="w-full rounded-lg border">
  <ResizablePanel defaultSize={50} minSize={20}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Left Panel</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50} minSize={20}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Right Panel</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    vertical: `<ResizablePanelGroup direction="vertical" className="h-full rounded-lg border">
  <ResizablePanel defaultSize={25}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Top Panel</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Bottom Panel</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    nested: `<ResizablePanelGroup direction="horizontal" className="rounded-lg border">
  <ResizablePanel defaultSize={50} minSize={20}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top Left</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom Left</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50} minSize={20}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Right Panel</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Resizable</h1>
            <p className="text-lg text-muted-foreground">
              Resizable panel components for creating flexible layouts with draggable dividers.
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
          <Badge variant="outline">Layout</Badge>
          <Badge variant="outline">Panel</Badge>
        </div>
      </div>

      {/* Horizontal Resize */}
      <Card>
        <CardHeader>
          <CardTitle>Horizontal Resizable Panels</CardTitle>
          <CardDescription>
            Two horizontal panels with a draggable divider between them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg border h-48">
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-6 bg-background">
                  <div className="text-center">
                    <Layout className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="font-semibold">Left Panel</span>
                    <p className="text-sm text-muted-foreground mt-1">Drag the handle to resize</p>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-6 bg-muted/20">
                  <div className="text-center">
                    <Layout className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="font-semibold">Right Panel</span>
                    <p className="text-sm text-muted-foreground mt-1">Min width: 20%</p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Horizontal Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.horizontal)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.horizontal}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Vertical Resize */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Resizable Panels</CardTitle>
          <CardDescription>
            Vertical layout with resizable top and bottom panels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ResizablePanelGroup direction="vertical" className="h-64 rounded-lg border">
              <ResizablePanel defaultSize={25} minSize={15}>
                <div className="flex h-full items-center justify-center p-6 bg-background">
                  <div className="text-center">
                    <Maximize2 className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <span className="font-semibold">Top Panel</span>
                    <p className="text-sm text-muted-foreground mt-1">Header area</p>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75} minSize={30}>
                <div className="flex h-full items-center justify-center p-6 bg-muted/20">
                  <div className="text-center">
                    <Minimize2 className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <span className="font-semibold">Bottom Panel</span>
                    <p className="text-sm text-muted-foreground mt-1">Main content area</p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Vertical Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.vertical)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.vertical}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Nested Panels */}
      <Card>
        <CardHeader>
          <CardTitle>Nested Resizable Panels</CardTitle>
          <CardDescription>
            Complex layout with nested horizontal and vertical panels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ResizablePanelGroup direction="horizontal" className="h-64 rounded-lg border">
              <ResizablePanel defaultSize={50} minSize={20}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={50} minSize={20}>
                    <div className="flex h-full items-center justify-center p-6 bg-background">
                      <div className="text-center">
                        <Layout className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <span className="font-semibold">Top Left</span>
                        <p className="text-xs text-muted-foreground mt-1">Nested panel</p>
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} minSize={20}>
                    <div className="flex h-full items-center justify-center p-6 bg-muted/20">
                      <div className="text-center">
                        <Layout className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <span className="font-semibold">Bottom Left</span>
                        <p className="text-xs text-muted-foreground mt-1">Nested panel</p>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-6 bg-primary/10">
                  <div className="text-center">
                    <Grip className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="font-semibold">Right Panel</span>
                    <p className="text-sm text-muted-foreground mt-1">Full height panel</p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Nested Panels Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.nested)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.nested}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Collapsible Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Collapsible Panel</CardTitle>
          <CardDescription>
            Panel that can be collapsed to minimum size or expanded.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? <Maximize2 className="h-4 w-4 mr-1" /> : <Minimize2 className="h-4 w-4 mr-1" />}
                  {collapsed ? 'Expand' : 'Collapse'} Sidebar
                </Button>
              </div>
              
              <ResizablePanelGroup direction="horizontal" className="h-48 rounded-lg border">
                <ResizablePanel 
                  defaultSize={collapsed ? 0 : 25} 
                  minSize={0}
                  maxSize={50}
                  collapsible
                >
                  <div className="flex h-full items-center justify-center p-6 bg-background">
                    <div className="text-center">
                      <Layout className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <span className="font-semibold">Sidebar</span>
                      <p className="text-xs text-muted-foreground mt-1">Collapsible</p>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={collapsed ? 100 : 75}>
                  <div className="flex h-full items-center justify-center p-6 bg-muted/20">
                    <div className="text-center">
                      <Layout className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="font-semibold">Main Content</span>
                      <p className="text-sm text-muted-foreground mt-1">Responsive content area</p>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices and configuration options for resizable panels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Configuration Options</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <code>defaultSize</code>: Initial panel size percentage</li>
                <li>• <code>minSize</code>: Minimum allowed size</li>
                <li>• <code>maxSize</code>: Maximum allowed size</li>
                <li>• <code>collapsible</code>: Allow panel to collapse</li>
                <li>• <code>withHandle</code>: Show resize handle grip</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Set reasonable min/max sizes</li>
                <li>• Use handles for better UX</li>
                <li>• Consider responsive behavior</li>
                <li>• Persist layout state</li>
                <li>• Test on touch devices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}