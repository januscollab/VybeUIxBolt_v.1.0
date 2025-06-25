
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BadgeShowcase() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Badge</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Display badges and status indicators.
        </p>
      </div>

      {/* Basic Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Variants</CardTitle>
          <CardDescription>
            Different badge styles for various use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status Indicators</CardTitle>
          <CardDescription>
            Common status badges for different states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-[100px]">Project Status:</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-[100px]">Build Status:</span>
              <Badge variant="warning">In Progress</Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-[100px]">Deployment:</span>
              <Badge variant="destructive">Failed</Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-[100px]">Version:</span>
              <Badge variant="outline">v1.2.3</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Badges</CardTitle>
          <CardDescription>
            Small badges for counts and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="relative">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm">📧</span>
              </div>
              <Badge variant="destructive" className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full p-0 text-xs flex items-center justify-center">
                3
              </Badge>
            </div>
            
            <div className="relative">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm">🔔</span>
              </div>
              <Badge variant="default" className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full p-0 text-xs flex items-center justify-center">
                12
              </Badge>
            </div>
            
            <div className="relative">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm">💬</span>
              </div>
              <Badge variant="success" className="absolute -top-2 -right-2 min-w-[20px] h-5 rounded-full p-0 text-xs flex items-center justify-center">
                •
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Examples</CardTitle>
          <CardDescription>
            Badges in real-world scenarios with proper semantic colors.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">User Profile</h4>
              <div className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">John Doe</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <Badge variant="accent">Premium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Verification</span>
                  <Badge variant="success">Verified</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Task Management</h4>
              <div className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Design System Update</span>
                  <Badge variant="warning">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bug Fix #123</span>
                  <Badge variant="success">Completed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security Audit</span>
                  <Badge variant="destructive">Blocked</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
