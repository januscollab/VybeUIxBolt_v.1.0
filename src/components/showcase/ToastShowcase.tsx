import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Figma, FileCode, CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";

export default function ToastShowcase() {
  const { toast: showToast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Basic toast
toast({
  title: "Scheduled: Catch up",
  description: "Friday, February 10, 2023 at 5:57 PM",
});

// Success toast
toast({
  title: "Success!",
  description: "Your changes have been saved.",
});

// Error toast
toast({
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
  variant: "destructive",
});`,
    advanced: `// Toast with action
toast({
  title: "Undo changes?",
  description: "This will revert your recent changes.",
  action: (
    <ToastAction altText="Undo">Undo</ToastAction>
  ),
});

// Auto-dismiss toast
toast({
  title: "Auto-dismiss",
  description: "This toast will disappear automatically",
  duration: 3000,
});`,
    variants: `// Different variants
toast({
  title: "Default toast",
  description: "This is a default toast message",
});

toast({
  title: "Destructive toast",
  description: "This indicates an error or warning",
  variant: "destructive",
});`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Toast</h1>
            <p className="text-lg text-muted-foreground">
              Accessible toast notifications with customizable styling and actions.
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
          <Badge variant="outline">Notification</Badge>
          <Badge variant="outline">Feedback</Badge>
        </div>
      </div>

      {/* Basic Toasts */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Toast Notifications</CardTitle>
          <CardDescription>
            Simple toast messages for different scenarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <Button
                variant="outline"
                onClick={() => 
                  showToast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span className="font-medium">Default Toast</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Basic information message
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  showToast({
                    title: "Success!",
                    description: "Your changes have been saved successfully.",
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Success Message</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Positive feedback to user
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  showToast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    variant: "destructive",
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium">Error Toast</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Error or warning message
                </div>
              </Button>

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

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Toast Features</CardTitle>
          <CardDescription>
            Toasts with actions, custom durations, and rich content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <Button
                variant="outline"
                onClick={() => 
                  showToast({
                    title: "File uploaded successfully",
                    description: "Your document has been processed and saved.",
                    duration: 5000,
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">Custom Duration</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Toast visible for 5 seconds
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  showToast({
                    title: "Update available",
                    description: "A new version of the app is ready to install.",
                    duration: 10000,
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">Persistent Toast</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Longer duration message
                </div>
              </Button>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Advanced Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.advanced)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.advanced}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for toast notifications and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Multiple toast variants</li>
                <li>• Custom duration control</li>
                <li>• Action buttons support</li>
                <li>• Accessible to screen readers</li>
                <li>• Automatic stacking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep messages concise</li>
                <li>• Use appropriate variants</li>
                <li>• Consider timing carefully</li>
                <li>• Provide clear actions</li>
                <li>• Avoid notification spam</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}