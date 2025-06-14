import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Figma, FileCode, Check, X, AlertTriangle, Info, Heart, Settings } from "lucide-react";
import { toast } from "sonner";
import { toast as useToast } from "@/hooks/use-toast";

export default function SonnerShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    useToast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { toast } from "sonner";

// Basic toast
toast("Hello world");

// Success toast
toast.success("Profile updated");

// Error toast
toast.error("Something went wrong");

// Warning toast
toast.warning("Please check your input");

// Info toast
toast.info("New update available");`,
    advanced: `// Toast with description
toast("Event created", {
  description: "Your event has been scheduled for tomorrow",
});

// Toast with action
toast("Email sent", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
});

// Toast with custom duration
toast("Auto-save enabled", {
  duration: 5000,
});

// Promise toast
const myPromise = () => new Promise((resolve) => setTimeout(resolve, 2000));

toast.promise(myPromise, {
  loading: 'Loading...',
  success: 'Data loaded',
  error: 'Error occurred',
});`,
    custom: `// Custom toast with JSX
toast.custom((t) => (
  <div className="flex items-center gap-2 p-4 bg-white border rounded-lg shadow-lg">
    <Heart className="h-5 w-5 text-red-500" />
    <div>
      <div className="font-medium">Thank you!</div>
      <div className="text-sm text-gray-500">Your feedback means a lot</div>
    </div>
    <button onClick={() => toast.dismiss(t)}>×</button>
  </div>
));`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sonner Toast</h1>
            <p className="text-lg text-muted-foreground">
              Beautiful toast notifications with rich features and smooth animations.
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
          <Badge variant="outline">Toast</Badge>
        </div>
      </div>

      {/* Basic Toasts */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Toast Types</CardTitle>
          <CardDescription>
            Simple toast notifications for different message types.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => toast("Hello world!")}
                className="h-auto py-3 flex flex-col items-center gap-2"
              >
                <Info className="h-5 w-5" />
                <span className="text-sm">Default</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => toast.success("Operation completed successfully!")}
                className="h-auto py-3 flex flex-col items-center gap-2"
              >
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm">Success</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => toast.error("Something went wrong. Please try again.")}
                className="h-auto py-3 flex flex-col items-center gap-2"
              >
                <X className="h-5 w-5 text-red-600" />
                <span className="text-sm">Error</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => toast.warning("Please check your input before proceeding.")}
                className="h-auto py-3 flex flex-col items-center gap-2"
              >
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-sm">Warning</span>
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
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>
            Toast notifications with descriptions, actions, and custom durations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <Button
                variant="outline"
                onClick={() => 
                  toast("Event has been created", {
                    description: "Your meeting is scheduled for tomorrow at 2:00 PM",
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">With Description</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Toast with additional context
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  toast("Email has been sent", {
                    action: {
                      label: "Undo",
                      onClick: () => toast("Email sending cancelled"),
                    },
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">With Action</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Interactive toast with button
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  toast("Auto-save has been enabled", {
                    duration: 10000,
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">Custom Duration</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Toast visible for 10 seconds
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const myPromise = () => new Promise((resolve, reject) => 
                    setTimeout(() => Math.random() > 0.5 ? resolve("success") : reject("error"), 2000)
                  );

                  toast.promise(myPromise, {
                    loading: 'Processing your request...',
                    success: 'Request completed successfully!',
                    error: 'Failed to process request',
                  });
                }}
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">Promise Toast</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Shows loading, success, or error
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

      {/* Custom Toasts */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Toast Examples</CardTitle>
          <CardDescription>
            Themed and custom-styled toast notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <Button
                variant="outline"
                onClick={() => 
                  toast.custom((t) => (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
                      <Heart className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">Thank you!</div>
                        <div className="text-sm opacity-90">Your feedback means a lot</div>
                      </div>
                      <button 
                        onClick={() => toast.dismiss(t)}
                        className="text-white hover:bg-white/20 rounded p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">Custom JSX</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Fully customized toast
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  toast("Settings updated", {
                    description: "Your preferences have been saved",
                    icon: <Settings className="h-4 w-4" />,
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">With Icon</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Toast with custom icon
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={() => 
                  toast("Rich content", {
                    description: "This toast has multiple features enabled",
                    action: {
                      label: "View",
                      onClick: () => toast("Viewing details..."),
                    },
                    duration: 5000,
                  })
                }
                className="h-auto p-4 flex flex-col items-start text-left"
              >
                <div className="font-medium">Rich Toast</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Multiple features combined
                </div>
              </Button>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Custom Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.custom)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.custom}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Control Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Toast Control Actions</CardTitle>
          <CardDescription>
            Programmatically control toast behavior and lifecycle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <Button
                variant="outline"
                onClick={() => {
                  for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                      toast(`Message ${i + 1}`, {
                        description: `This is notification number ${i + 1}`,
                      });
                    }, i * 200);
                  }
                }}
              >
                Show Multiple
              </Button>

              <Button
                variant="outline"
                onClick={() => toast.dismiss()}
              >
                Dismiss All
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const id = toast.loading("Processing...", {
                    duration: Infinity,
                  });
                  
                  setTimeout(() => {
                    toast.success("Completed!", { id });
                  }, 3000);
                }}
              >
                Loading → Success
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  toast("Persistent message", {
                    duration: Infinity,
                    action: {
                      label: "Dismiss",
                      onClick: () => toast.dismiss(),
                    },
                  });
                }}
              >
                Persistent Toast
              </Button>

            </div>
          </div>
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
                <li>• Multiple toast types</li>
                <li>• Promise integration</li>
                <li>• Custom JSX content</li>
                <li>• Action buttons</li>
                <li>• Programmatic control</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep messages concise</li>
                <li>• Use appropriate types</li>
                <li>• Provide clear actions</li>
                <li>• Consider duration</li>
                <li>• Avoid notification spam</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}