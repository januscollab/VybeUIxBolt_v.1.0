import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Figma, FileCode, Bell, X, Check, AlertTriangle, Info, MessageSquare, Heart, Share } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "social";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  action?: string;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "social",
    title: "New follower",
    message: "Sarah Johnson started following you",
    timestamp: "2 minutes ago",
    read: false,
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    type: "success",
    title: "Payment successful",
    message: "Your subscription has been renewed for another month",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Storage almost full",
    message: "You're using 90% of your available storage space",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "New feature available",
    message: "Check out our new collaboration tools in the dashboard",
    timestamp: "1 day ago",
    read: true,
  },
];

export default function NotificationShowcase() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <Check className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error": return <X className="h-4 w-4 text-red-500" />;
      case "social": return <Heart className="h-4 w-4 text-pink-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const showToast = (type: "info" | "success" | "warning" | "error") => {
    const messages = {
      info: { title: "Information", description: "This is an informational message." },
      success: { title: "Success!", description: "Operation completed successfully." },
      warning: { title: "Warning", description: "Please review this important information." },
      error: { title: "Error", description: "Something went wrong. Please try again." },
    };

    toast(messages[type]);
  };

  const codeExample = `import { toast } from "@/hooks/use-toast";

// Basic toast
toast({
  title: "Success!",
  description: "Operation completed successfully.",
});

// Toast with action
toast({
  title: "File uploaded",
  description: "Your file has been uploaded successfully.",
  action: (
    <Button variant="outline" size="sm">
      View
    </Button>
  ),
});

// Notification item
<div className="flex items-start space-x-3 p-4 border rounded-lg">
  <Avatar className="h-8 w-8">
    <AvatarImage src={notification.avatar} />
    <AvatarFallback>{notification.title[0]}</AvatarFallback>
  </Avatar>
  <div className="flex-1 space-y-1">
    <p className="text-sm font-medium">{notification.title}</p>
    <p className="text-sm text-muted-foreground">{notification.message}</p>
    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
  </div>
</div>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-lg text-muted-foreground">
              Toast notifications, notification centers, and alert systems for user communication.
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
          <Badge variant="outline">User Feedback</Badge>
          <Badge variant="outline">Real-time</Badge>
        </div>
      </div>

      {/* Toast Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>Temporary messages that appear and disappear automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => showToast("info")} variant="outline" className="w-full">
                <Info className="h-4 w-4 mr-2" />
                Info Toast
              </Button>
              <Button onClick={() => showToast("success")} variant="outline" className="w-full">
                <Check className="h-4 w-4 mr-2" />
                Success Toast
              </Button>
              <Button onClick={() => showToast("warning")} variant="outline" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Warning Toast
              </Button>
              <Button onClick={() => showToast("error")} variant="outline" className="w-full">
                <X className="h-4 w-4 mr-2" />
                Error Toast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Center */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>Persistent notification list with interactive controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications ({notifications.filter(n => !n.read).length})
                </h4>
                <Button variant="ghost" size="sm">
                  Mark all as read
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                      notification.read ? 'bg-background/50' : 'bg-background border-primary/20'
                    }`}
                  >
                    {notification.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.title[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inline Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Inline Notifications</CardTitle>
          <CardDescription>Notifications embedded within content areas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              {/* Info Notification */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/20 dark:border-blue-800">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 dark:text-blue-100">New feature available</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    We've added new collaboration tools to help you work better with your team.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Learn more
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Success Notification */}
              <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950/20 dark:border-green-800">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 dark:text-green-100">Changes saved successfully</p>
                  <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                    Your profile has been updated and is now visible to other users.
                  </p>
                </div>
              </div>

              {/* Warning Notification */}
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-950/20 dark:border-yellow-800">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">Storage limit approaching</p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                    You're using 85% of your storage space. Consider upgrading your plan.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Upgrade plan
                    </Button>
                    <Button variant="ghost" size="sm">
                      Manage files
                    </Button>
                  </div>
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

      {/* Social Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Social Notifications</CardTitle>
          <CardDescription>Notifications for social interactions and activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 hover:bg-background/50 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Sarah Johnson</span> liked your post
                  </p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <Heart className="h-4 w-4 text-red-500" />
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-background/50 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Mike Rodriguez</span> commented on your post
                  </p>
                  <p className="text-xs text-muted-foreground">"Great work on the design!"</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-background/50 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Anna Lee</span> shared your article
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <Share className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for notification implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use appropriate urgency levels</li>
                <li>• Provide clear, actionable messages</li>
                <li>• Allow users to control notification preferences</li>
                <li>• Group related notifications together</li>
                <li>• Use consistent timing and positioning</li>
                <li>• Include relevant context and actions</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Considerations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Don't overload users with notifications</li>
                <li>• Respect user attention and focus</li>
                <li>• Consider accessibility and screen readers</li>
                <li>• Handle offline/online state changes</li>
                <li>• Implement proper error handling</li>
                <li>• Provide clear dismissal mechanisms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}