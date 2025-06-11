import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal, Loader2, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function FeedbackShowcase() {
  const [progress, setProgress] = useState(13);
  const [loadingStates, setLoadingStates] = useState({
    button: false,
    data: false,
    form: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (type: "default" | "destructive") => {
    if (type === "destructive") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const toggleLoading = (key: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [key]: !prev[key] }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Feedback Components</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Components for providing user feedback including alerts, notifications, progress indicators, and loading states.
        </p>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Contextual feedback messages for user actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert. Use it to provide helpful information to users.
              </AlertDescription>
            </Alert>

            <Alert className="border-green-500/50 text-green-700 [&>svg]:text-green-600">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully. The system has been updated.
              </AlertDescription>
            </Alert>

            <Alert className="border-orange-500/50 text-orange-700 [&>svg]:text-orange-600">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review your settings. Some configurations may need attention.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please check your input and try again.
              </AlertDescription>
            </Alert>

            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>System Update</AlertTitle>
              <AlertDescription>
                A new version is available. 
                <Button variant="link" className="p-0 h-auto font-normal underline ml-1">
                  Update now
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Toast Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>Temporary notifications that appear at the edge of the screen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => showToast("default")}>
                Show Success Toast
              </Button>
              <Button variant="destructive" onClick={() => showToast("destructive")}>
                Show Error Toast
              </Button>
              <Button 
                variant="outline" 
                onClick={() => toast({
                  title: "Custom Toast",
                  description: (
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      You have 3 new notifications
                    </div>
                  ),
                })}
              >
                Show Custom Toast
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Click the buttons above to see toast notifications in action. They will appear in the bottom right corner.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Indicators</CardTitle>
          <CardDescription>Show progress for ongoing operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                <span>Installation Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sync Progress</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Indeterminate Progress</span>
                <span>Loading...</span>
              </div>
              <Progress value={undefined} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>Indicate when content is being loaded or processed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-medium">Loading Buttons</h4>
              <div className="flex gap-4 flex-wrap">
                <Button 
                  disabled={loadingStates.button}
                  onClick={() => toggleLoading("button")}
                >
                  {loadingStates.button ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Click to Load"
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  disabled={loadingStates.form}
                  onClick={() => toggleLoading("form")}
                >
                  {loadingStates.form ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Skeleton Loading</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Loading Card</h4>
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[200px] w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status Indicators</CardTitle>
          <CardDescription>Visual indicators for different states and statuses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Status Badges</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="default">Active</Badge>
                <Badge variant="secondary">Pending</Badge>
                <Badge variant="destructive">Failed</Badge>
                <Badge variant="outline">Draft</Badge>
                <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                <Badge className="bg-orange-500 hover:bg-orange-600">Warning</Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Status with Icons</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
                <Badge className="bg-orange-500 hover:bg-orange-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Warning
                </Badge>
                <Badge variant="destructive">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Error
                </Badge>
                <Badge variant="outline">
                  <Info className="h-3 w-3 mr-1" />
                  Info
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Connection Status</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Connecting</span>
                </div>
              </div>
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
            <h4 className="font-medium">Alert Component</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Toast Notification</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { toast } from "@/hooks/use-toast"

toast({
  title: "Success",
  description: "Your changes have been saved.",
})

// Error toast
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong.",
})`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Loading Button</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </>
  ) : (
    "Click me"
  )}
</Button>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}