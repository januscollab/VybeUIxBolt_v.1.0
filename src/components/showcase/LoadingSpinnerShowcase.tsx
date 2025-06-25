import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Copy, Figma, FileCode, Loader, RefreshCw, Save, Send, UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function LoadingSpinnerShowcase() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 3000);
  };

  const simulateSaving = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const codeExamples = {
    basic: `import { Spinner } from "@/components/ui/spinner";

<Spinner />`,
    sizes: `<div className="flex items-center gap-4">
  <Spinner size="sm" />
  <Spinner size="default" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
    variants: `<div className="flex items-center gap-4">
  <Spinner variant="default" />
  <Spinner variant="secondary" />
  <Spinner variant="destructive" />
  <Spinner variant="success" />
  <Spinner variant="warning" />
</div>`,
    button: `import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

const [isLoading, setIsLoading] = useState(false);

<Button 
  onClick={() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }}
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Spinner size="sm" className="mr-2" />
      Loading...
    </>
  ) : (
    "Click me"
  )}
</Button>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Loading Spinner</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Visual loading indicators for asynchronous operations and content loading states.
        </p>
      </div>

      {/* Basic Spinners */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Spinners</CardTitle>
          <CardDescription>Simple loading spinners with different sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-8 p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-sm text-muted-foreground">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner />
              <span className="text-sm text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-sm text-muted-foreground">Large</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="xl" />
              <span className="text-sm text-muted-foreground">Extra Large</span>
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

      {/* Spinner Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Spinner Variants</CardTitle>
          <CardDescription>Different color variants for various contexts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-8 p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="default" />
              <span className="text-sm text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="secondary" />
              <span className="text-sm text-muted-foreground">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="destructive" />
              <span className="text-sm text-muted-foreground">Destructive</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="success" />
              <span className="text-sm text-muted-foreground">Success</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="warning" />
              <span className="text-sm text-muted-foreground">Warning</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Variants Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.variants)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.variants}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Button Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Button Integration</CardTitle>
          <CardDescription>Using spinners within buttons for loading states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-4 p-6 border rounded-lg bg-muted/50">
            <Button 
              onClick={simulateLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Loader className="h-4 w-4 mr-2" />
                  Load Data
                </>
              )}
            </Button>

            <Button 
              variant="outline"
              onClick={simulateUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Spinner size="sm" variant="secondary" className="mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>

            <Button 
              variant="secondary"
              onClick={simulateSaving}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Button Integration Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.button)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.button}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Advanced Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Usage</CardTitle>
          <CardDescription>Complex loading patterns and specialized use cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg bg-muted/50">
            {/* Card Loading State */}
            <div className="border rounded-lg p-4 bg-background">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Card Loading</h3>
                <Spinner size="sm" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>

            {/* Overlay Loading */}
            <div className="border rounded-lg p-4 bg-background relative">
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="lg" />
                  <span className="text-sm font-medium">Loading content...</span>
                </div>
              </div>
              <div className="space-y-4 blur-sm">
                <h3 className="text-lg font-medium">Content Title</h3>
                <p className="text-muted-foreground">This content is loading and blurred out until ready.</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Action</Button>
                  <Button variant="outline" size="sm" disabled>Cancel</Button>
                </div>
              </div>
            </div>

            {/* Inline Form Loading */}
            <div className="border rounded-lg p-4 bg-background">
              <h3 className="text-lg font-medium mb-4">Inline Form Loading</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 bg-muted rounded"></div>
                  <Spinner size="sm" />
                </div>
                <div className="h-10 bg-muted rounded"></div>
                <Button disabled className="w-full">
                  Submit
                </Button>
              </div>
            </div>

            {/* Send Message Loading */}
            <div className="border rounded-lg p-4 bg-background">
              <h3 className="text-lg font-medium mb-4">Message Sending</h3>
              <div className="space-y-4">
                <div className="h-24 bg-muted rounded"></div>
                <div className="flex justify-end">
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Message sent",
                        description: "Your message has been delivered successfully.",
                      });
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>Best practices for using loading spinners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use appropriate spinner sizes for the context</li>
                <li>• Show spinners for operations taking longer than 300ms</li>
                <li>• Provide context about what's loading when possible</li>
                <li>• Use semantic variants for different loading contexts</li>
                <li>• Consider skeleton loaders for content-heavy areas</li>
                <li>• Disable interactive elements during loading</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Include proper ARIA attributes (role="status")</li>
                <li>• Provide screen reader text ("Loading...")</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Consider users with motion sensitivity</li>
                <li>• Announce state changes to screen readers</li>
                <li>• Maintain focus during loading states</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}