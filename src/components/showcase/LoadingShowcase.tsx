import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Figma, FileCode, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function LoadingShowcase() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const handleAsyncAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Action completed",
        description: "The async action has finished successfully.",
      });
    }, 2000);
  };

  const codeExample = `import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Spinner
<Loader2 className="h-4 w-4 animate-spin" />

// Loading Button
<Button disabled={loading}>
  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {loading ? "Loading..." : "Submit"}
</Button>

// Progress Bar
<Progress value={progress} className="w-full" />

// Skeleton
<Skeleton className="h-4 w-full" />`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Loading States</h1>
            <p className="text-lg text-muted-foreground">
              Various loading indicators and states for better user experience during async operations.
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
          <Badge variant="outline">UX Pattern</Badge>
          <Badge variant="outline">Async States</Badge>
        </div>
      </div>

      {/* Spinners */}
      <Card>
        <CardHeader>
          <CardTitle>Loading Spinners</CardTitle>
          <CardDescription>Various spinner animations for loading states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="text-sm font-medium">Default Spinner</p>
              </div>
              
              <div className="space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto" />
                <p className="text-sm font-medium">Refresh Spinner</p>
              </div>
              
              <div className="space-y-3">
                <div className="h-8 w-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Custom Spinner</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex space-x-1 mx-auto w-fit">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                </div>
                <p className="text-sm font-medium">Dots Spinner</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Loading Buttons</CardTitle>
          <CardDescription>Buttons with loading states and disabled interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={handleAsyncAction} disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Processing..." : "Start Process"}
              </Button>
              
              <Button variant="outline" disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </Button>
              
              <Button variant="secondary" disabled className="w-full">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Indicators</CardTitle>
          <CardDescription>Show progress for long-running operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Upload Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Installation</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="w-full" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Indeterminate</span>
                  <span>Processing...</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton Loading */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Loading</CardTitle>
          <CardDescription>Placeholder content while data is loading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              {/* Card Skeleton */}
              <div className="space-y-3">
                <h4 className="font-medium">Card Skeleton</h4>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-3 w-1/6" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
              
              {/* List Skeleton */}
              <div className="space-y-3">
                <h4 className="font-medium">List Skeleton</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 border rounded">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              </div>
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

      {/* Full Page Loading */}
      <Card>
        <CardHeader>
          <CardTitle>Full Page Loading</CardTitle>
          <CardDescription>Loading states for entire page or sections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="text-center space-y-4 py-12">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Loading...</p>
                  <p className="text-muted-foreground">Please wait while we fetch your data</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for loading state implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use skeleton loading for content placeholders</li>
                <li>• Show progress for operations over 5 seconds</li>
                <li>• Disable buttons during loading states</li>
                <li>• Provide meaningful loading messages</li>
                <li>• Use spinners for quick operations (under 3s)</li>
                <li>• Implement timeout handling</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Performance Tips</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Optimize animations for performance</li>
                <li>• Use CSS animations over JavaScript</li>
                <li>• Implement proper error boundaries</li>
                <li>• Consider perceived performance</li>
                <li>• Lazy load content when possible</li>
                <li>• Cache data to reduce loading times</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}