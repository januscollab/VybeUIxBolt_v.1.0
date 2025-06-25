import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeModal } from "@/components/ui/code-modal";
import { cn } from "@/lib/utils";
import { 
  Heart, 
  Download, 
  Share, 
  Plus, 
  ShoppingCart, 
  Send,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

export default function ButtonShowcase() {
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAsyncAction = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const basicExample = `import { Button } from "@/components/ui/button";

export function BasicButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`;

  const sizesExample = `import { Button } from "@/components/ui/button";

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`;

  const withIconsExample = `import { Button } from "@/components/ui/button";
import { Download, Share, Plus } from "lucide-react";

export function ButtonsWithIcons() {
  return (
    <div className="flex gap-2">
      <Button>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="outline">
        <Share className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}`;

  const experimentalExample = `import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Target, Sparkles, Zap, CheckCircle, HelpCircle, Plus } from "lucide-react";

export function ExperimentalButtons() {
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAsyncAction = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        onClick={() => console.log('FAB clicked')}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Interactive Card Button */}
      <Button
        variant="outline"
        className="group relative overflow-hidden border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
        onClick={() => setLiked(!liked)}
      >
        <Heart 
          className={cn(
            "mr-2 h-4 w-4 transition-all duration-300",
            liked ? "text-destructive fill-current scale-110" : "text-muted-foreground group-hover:text-primary"
          )} 
        />
        {liked ? "Liked!" : "Like"}
      </Button>

      {/* Smart Tooltip Button */}
      <Button
        variant="ghost"
        className="group relative hover:bg-accent/10 transition-all duration-200"
      >
        <HelpCircle className="mr-2 h-4 w-4" />
        Help
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          Get support
        </div>
      </Button>

      {/* Animated Progress Button */}
      <Button
        className="relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300"
        onClick={handleAsyncAction}
        disabled={isProcessing}
      >
        <div 
          className="absolute inset-0 bg-success/20 transition-all duration-200"
          style={{ width: \`\${progress}%\` }}
        />
        <span className="relative flex items-center">
          {isProcessing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Processing...
            </>
          ) : progress === 100 ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete!
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Start Process
            </>
          )}
        </span>
      </Button>
    </div>
  );
}`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Button Component</h1>
          <p className="text-lg text-muted-foreground">
            Interactive button component with multiple variants, sizes, and states for user actions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Interactive</Badge>
          <Badge variant="outline">Accessible</Badge>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          {/* Basic Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <CardDescription>Different button styles for various contexts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
              <CardDescription>Different button sizes for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Buttons enhanced with icons for better visual communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="secondary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
                <Button variant="ghost">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card>
            <CardHeader>
              <CardTitle>States</CardTitle>
              <CardDescription>Different interaction states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button className="opacity-75 cursor-wait">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Loading
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Import and use the Button component</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="Basic Button Example" code={basicExample}>
                <Button variant="outline">
                  View Basic Example
                </Button>
              </CodeModal>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
              <CardDescription>Available size variations</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="Button Sizes" code={sizesExample}>
                <Button variant="outline">
                  View Size Examples
                </Button>
              </CodeModal>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Icons</CardTitle>
              <CardDescription>Adding icons to buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="Buttons with Icons" code={withIconsExample}>
                <Button variant="outline">
                  View Icon Examples
                </Button>
              </CodeModal>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experimental" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Experimental</Badge>
              <span className="text-sm text-muted-foreground">
                These components are in active development and may change
              </span>
            </div>
          </div>

          {/* Floating Action Button */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Floating Action Button
                <Badge variant="secondary">Experimental</Badge>
              </CardTitle>
              <CardDescription>
                A prominent floating button for primary actions, positioned fixed on screen
              </CardDescription>
            </CardHeader>
            <CardContent className="relative min-h-[120px]">
              <div className="absolute bottom-4 right-4">
                <Button
                  className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 border-2 border-background"
                  onClick={() => console.log('FAB clicked')}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Floating Action Button positioned in bottom-right corner
              </p>
            </CardContent>
          </Card>

          {/* Interactive Card Button */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Interactive Card Button
                <Badge variant="secondary">Experimental</Badge>
              </CardTitle>
              <CardDescription>
                Button with enhanced visual feedback and state transitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 min-w-[140px]"
                onClick={() => setLiked(!liked)}
              >
                <Heart 
                  className={cn(
                    "mr-2 h-5 w-5 transition-all duration-300",
                    liked 
                      ? "text-destructive fill-current scale-110" 
                      : "text-muted-foreground group-hover:text-primary"
                  )}
                />
                {liked ? "Liked!" : "Like This"}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* Smart Tooltip Button */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Smart Tooltip Button
                <Badge variant="secondary">Experimental</Badge>
              </CardTitle>
              <CardDescription>
                Button with built-in contextual tooltip on hover
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                size="lg"
                className="group relative hover:bg-accent/10 transition-all duration-200"
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                Need Help?
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border shadow-lg">
                  Click to get support
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Animated Progress Button */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Animated Progress Button
                <Badge variant="secondary">Experimental</Badge>
              </CardTitle>
              <CardDescription>
                Button that shows progress feedback during async operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                size="lg"
                className="relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300 min-w-[160px]"
                onClick={handleAsyncAction}
                disabled={isProcessing}
              >
                <div 
                  className="absolute inset-0 bg-success/20 transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
                <span className="relative flex items-center">
                  {isProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Processing...
                    </>
                  ) : progress === 100 ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete!
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start Process
                    </>
                  )}
                </span>
              </Button>
              <div className="text-sm text-muted-foreground">
                Progress: {progress}%
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Experimental Code Examples</CardTitle>
              <CardDescription>Implementation code for experimental button variants</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="Experimental Button Examples" code={experimentalExample}>
                <Button variant="outline">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Experimental Code
                </Button>
              </CodeModal>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
