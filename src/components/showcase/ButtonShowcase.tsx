import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Plus, Trash2, Settings, ExternalLink } from "lucide-react";

export default function ButtonShowcase() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Button Components</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Interactive button components with various styles, sizes, and states for user actions.
        </p>
      </div>

      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>Different visual styles for various use cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Button className="w-full">Default</Button>
              <code className="text-xs bg-muted p-1 rounded">default</code>
            </div>
            <div className="space-y-2">
              <Button variant="destructive" className="w-full">Destructive</Button>
              <code className="text-xs bg-muted p-1 rounded">destructive</code>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">Outline</Button>
              <code className="text-xs bg-muted p-1 rounded">outline</code>
            </div>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full">Secondary</Button>
              <code className="text-xs bg-muted p-1 rounded">secondary</code>
            </div>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full">Ghost</Button>
              <code className="text-xs bg-muted p-1 rounded">ghost</code>
            </div>
            <div className="space-y-2">
              <Button variant="link" className="w-full">Link</Button>
              <code className="text-xs bg-muted p-1 rounded">link</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>Different sizes for various contexts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="space-y-2">
              <Button size="sm">Small</Button>
              <div><code className="text-xs bg-muted p-1 rounded">sm</code></div>
            </div>
            <div className="space-y-2">
              <Button size="default">Default</Button>
              <div><code className="text-xs bg-muted p-1 rounded">default</code></div>
            </div>
            <div className="space-y-2">
              <Button size="lg">Large</Button>
              <div><code className="text-xs bg-muted p-1 rounded">lg</code></div>
            </div>
            <div className="space-y-2">
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
              <div><code className="text-xs bg-muted p-1 rounded">icon</code></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* With Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons with Icons</CardTitle>
          <CardDescription>Combining icons with text for better UX</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="secondary" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* States */}
      <Card>
        <CardHeader>
          <CardTitle>Button States</CardTitle>
          <CardDescription>Different interaction states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Button className="w-full">Normal</Button>
              <p className="text-xs text-muted-foreground">Default state</p>
            </div>
            <div className="space-y-2">
              <Button disabled className="w-full">Disabled</Button>
              <p className="text-xs text-muted-foreground">Disabled state</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Loading...
              </Button>
              <p className="text-xs text-muted-foreground">Loading state</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Implementation examples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Basic Button</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Button>Click me</Button>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Button with Icon</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Variant and Size</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Button variant="outline" size="lg">
  Large Outline Button
</Button>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}