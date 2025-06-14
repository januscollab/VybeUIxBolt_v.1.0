import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Info, XCircle, Terminal, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";

export default function AlertShowcase() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Alert Component</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Contextual feedback messages with various severity levels for user notifications and system status.
        </p>
      </div>

      {/* Basic Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Alerts</CardTitle>
          <CardDescription>Standard alert variants with different severity levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert. Use it to provide helpful context or additional information to users.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please check your input and try again. If the problem persists, contact support.
            </AlertDescription>
          </Alert>

          <Alert className="border-yellow-500 text-yellow-800 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This action cannot be undone. Please review your changes before proceeding.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-500 text-green-800 bg-green-50 dark:bg-green-950 dark:text-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully! You can now continue with your workflow.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Alert Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Variants</CardTitle>
          <CardDescription>Different styles and use cases for alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500 text-blue-800 bg-blue-50 dark:bg-blue-950 dark:text-blue-200">
            <Terminal className="h-4 w-4" />
            <AlertTitle>System Update</AlertTitle>
            <AlertDescription>
              A new system update is available. The update will be installed during the next maintenance window.
            </AlertDescription>
          </Alert>

          <Alert className="border-purple-500 text-purple-800 bg-purple-50 dark:bg-purple-950 dark:text-purple-200">
            <Zap className="h-4 w-4" />
            <AlertTitle>New Feature</AlertTitle>
            <AlertDescription>
              Introducing dark mode! Toggle between light and dark themes in your settings panel.
            </AlertDescription>
          </Alert>

          <Alert className="border-orange-500 text-orange-800 bg-orange-50 dark:bg-orange-950 dark:text-orange-200">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Pro Tip</AlertTitle>
            <AlertDescription>
              Use keyboard shortcuts to navigate faster. Press "?" to see all available shortcuts.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Interactive Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Alerts</CardTitle>
          <CardDescription>Alerts with actions and dismissible functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Storage Almost Full</AlertTitle>
            <AlertDescription className="mt-2 mb-3">
              You are using 85% of your storage space. Consider upgrading your plan or removing unused files.
            </AlertDescription>
            <div className="flex gap-2">
              <Button size="sm">Upgrade Plan</Button>
              <Button size="sm" variant="outline">Manage Files</Button>
            </div>
          </Alert>

          <Alert className="border-green-500 text-green-800 bg-green-50 dark:bg-green-950 dark:text-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Backup Completed</AlertTitle>
            <AlertDescription className="mt-2 mb-3">
              Your data has been successfully backed up to the cloud. Next backup is scheduled for tomorrow.
            </AlertDescription>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm" variant="outline">Schedule Settings</Button>
            </div>
          </Alert>

          {showDismissible && (
            <Alert className="border-yellow-500 text-yellow-800 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-200">
              <AlertTriangle className="h-4 w-4" />
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <AlertTitle>Maintenance Scheduled</AlertTitle>
                  <AlertDescription className="mt-2">
                    System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM UTC. 
                    Some features may be temporarily unavailable.
                  </AlertDescription>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDismissible(false)}
                  className="ml-2 h-6 w-6 p-0 text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </Button>
              </div>
            </Alert>
          )}

          {!showDismissible && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDismissible(true)}
            >
              Show Dismissible Alert
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Compact Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Alerts</CardTitle>
          <CardDescription>Minimal alerts for space-constrained layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert className="py-2">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Profile updated successfully
            </AlertDescription>
          </Alert>

          <Alert variant="destructive" className="py-2">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Invalid email format
            </AlertDescription>
          </Alert>

          <Alert className="py-2 border-yellow-500 text-yellow-800 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Password expires in 3 days
            </AlertDescription>
          </Alert>

          <Alert className="py-2 border-blue-500 text-blue-800 bg-blue-50 dark:bg-blue-950 dark:text-blue-200">
            <Info className="h-4 w-4" />
            <AlertDescription>
              2 new messages in your inbox
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for alert implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use appropriate severity levels</li>
                <li>• Keep messages clear and concise</li>
                <li>• Provide actionable next steps</li>
                <li>• Position alerts contextually</li>
                <li>• Use consistent iconography</li>
                <li>• Test color contrast ratios</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">When to Use</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• System status updates</li>
                <li>• Form validation errors</li>
                <li>• Success confirmations</li>
                <li>• Warning notifications</li>
                <li>• Important announcements</li>
                <li>• Context-sensitive help</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}