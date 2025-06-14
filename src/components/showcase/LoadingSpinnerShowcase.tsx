import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner, LoadingSpinner } from "@/components/ui/spinner";
import { Copy, Figma, FileCode } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function LoadingSpinnerShowcase() {
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const basicSpinnerCode = `import { Spinner, LoadingSpinner } from "@/components/ui/spinner";

// Basic spinner
<Spinner />

// With size variants
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Loading spinner with text
<LoadingSpinner text="Loading..." />`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Loading Spinner</h1>
            <p className="text-lg text-muted-foreground">
              Animated loading indicators for better user experience during async operations.
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
          <Badge variant="default">Loading</Badge>
          <Badge variant="outline">Animation</Badge>
          <Badge variant="outline">Feedback</Badge>
        </div>
      </div>

      {/* Basic Spinner */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Spinner</CardTitle>
          <CardDescription>
            Simple animated loading indicator with size and variant options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-8 p-6 border rounded-lg">
            <div className="text-center">
              <Spinner size="sm" />
              <p className="text-xs mt-2 text-muted-foreground">Small</p>
            </div>
            <div className="text-center">
              <Spinner size="md" />
              <p className="text-xs mt-2 text-muted-foreground">Medium</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-xs mt-2 text-muted-foreground">Large</p>
            </div>
            <div className="text-center">
              <Spinner size="xl" />
              <p className="text-xs mt-2 text-muted-foreground">Extra Large</p>
            </div>
          </div>

          {showCode && (
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{basicSpinnerCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(basicSpinnerCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Spinner Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Spinner Variants</CardTitle>
          <CardDescription>
            Different visual styles for various contexts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-8 p-6 border rounded-lg">
            <div className="text-center">
              <Spinner variant="default" />
              <p className="text-xs mt-2 text-muted-foreground">Default</p>
            </div>
            <div className="text-center">
              <Spinner variant="secondary" />
              <p className="text-xs mt-2 text-muted-foreground">Secondary</p>
            </div>
            <div className="text-center bg-primary p-4 rounded">
              <Spinner variant="ghost" />
              <p className="text-xs mt-2 text-primary-foreground">Ghost</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Spinner with Text */}
      <Card>
        <CardHeader>
          <CardTitle>Loading Spinner with Text</CardTitle>
          <CardDescription>
            Enhanced loading indicator with descriptive text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg text-center">
              <LoadingSpinner text="Loading..." />
            </div>
            <div className="p-6 border rounded-lg text-center">
              <LoadingSpinner text="Processing your request..." size="lg" />
            </div>
            <div className="p-6 border rounded-lg text-center">
              <LoadingSpinner text="Please wait..." variant="secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Common Usage Patterns</CardTitle>
          <CardDescription>
            Real-world examples of loading spinners in action.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button Loading */}
            <div className="space-y-3">
              <h4 className="font-semibold">Button Loading States</h4>
              <div className="space-y-2">
                <Button disabled className="w-full">
                  <Spinner size="sm" className="mr-2" />
                  Processing...
                </Button>
                <Button variant="outline" disabled className="w-full">
                  <Spinner size="sm" variant="secondary" className="mr-2" />
                  Saving changes...
                </Button>
              </div>
            </div>

            {/* Page Loading */}
            <div className="space-y-3">
              <h4 className="font-semibold">Page Loading</h4>
              <div className="min-h-[120px] border rounded-lg flex items-center justify-center">
                <LoadingSpinner text="Loading content..." size="lg" />
              </div>
            </div>

            {/* Inline Loading */}
            <div className="space-y-3">
              <h4 className="font-semibold">Inline Loading</h4>
              <div className="p-4 border rounded-lg">
                <p className="text-sm">Fetching data <Spinner size="sm" className="inline ml-2" /></p>
              </div>
            </div>

            {/* Card Loading */}
            <div className="space-y-3">
              <h4 className="font-semibold">Card Loading State</h4>
              <Card>
                <CardContent className="p-6">
                  <LoadingSpinner text="Loading dashboard..." />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}