import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Copy, Figma, FileCode, Menu, Settings, User, Mail, Bell, Search, Filter, X, Plus, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SheetShowcase() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New message received", time: "2 min ago", read: false },
    { id: 2, title: "System update available", time: "1 hour ago", read: true },
    { id: 3, title: "Weekly report ready", time: "3 hours ago", read: false },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    sides: `{/* Left Side */}
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

{/* Right Side */}
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Right</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    navigation: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon">
      <Menu className="h-4 w-4" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
    <nav className="flex flex-col space-y-2">
      <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </a>
      <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
        <User className="h-4 w-4" />
        <span>Profile</span>
      </a>
    </nav>
  </SheetContent>
</Sheet>`
  };

  const navigationItems = [
    { icon: User, label: "Profile", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: Mail, label: "Messages", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: Search, label: "Search", href: "#" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sheet</h1>
            <p className="text-lg text-muted-foreground">
              Sliding panel that appears from the edge of the screen for secondary content.
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
          <Badge variant="outline">Overlay</Badge>
          <Badge variant="outline">Mobile</Badge>
        </div>
      </div>

      {/* Basic Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Sheet</CardTitle>
          <CardDescription>
            Simple sheet with form content and action buttons.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you are done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sheet-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="sheet-name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sheet-username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="sheet-username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sheet-bio" className="text-right">
                        Bio
                      </Label>
                      <Textarea
                        id="sheet-bio"
                        placeholder="Tell us about yourself"
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
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

      {/* Different Sides */}
      <Card>
        <CardHeader>
          <CardTitle>Sheet Positions</CardTitle>
          <CardDescription>
            Sheets can slide in from different sides of the screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-wrap justify-center gap-4">
              
              {/* Left */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Left</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Left Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the left side.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Content slides in from the left edge of the screen.
                      Perfect for navigation menus and secondary content.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Right */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Right</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Right Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the right side.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Content slides in from the right edge of the screen.
                      Commonly used for forms and detailed views.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Top */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Top</Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Top Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the top.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Content slides down from the top of the screen.
                      Good for notifications and quick actions.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Bottom */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Bottom Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the bottom.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Content slides up from the bottom of the screen.
                      Popular on mobile for action sheets and menus.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Different Sides Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.sides)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.sides}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Navigation Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Sheet</CardTitle>
          <CardDescription>
            Mobile-friendly navigation menu using a sheet component.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                      Navigate through the application
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-2 mt-4">
                    {navigationItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Quick Actions</h4>
                    <Button className="w-full justify-start" variant="ghost">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New
                    </Button>
                    <Button className="w-full justify-start" variant="ghost">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter Results
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Navigation Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.navigation)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.navigation}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Notifications Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications Panel</CardTitle>
          <CardDescription>
            Complex sheet with scrollable content and interactive elements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {notifications.filter(n => !n.read).length}
                    </Badge>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>
                      Stay updated with your latest notifications
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-4 mt-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-muted/50'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => {
                                setNotifications(prev => prev.filter(n => n.id !== notification.id));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <div className="text-center py-8">
                          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">No notifications</p>
                        </div>
                      )}
                    </div>
                    <SheetFooter className="border-t pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                        className="w-full"
                      >
                        Mark all as read
                      </Button>
                    </SheetFooter>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for sheet design and mobile user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Swipe gestures on mobile</li>
                <li>• Backdrop click to close</li>
                <li>• Keyboard navigation support</li>
                <li>• Multiple slide directions</li>
                <li>• Customizable width/height</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use for secondary content</li>
                <li>• Provide clear close options</li>
                <li>• Consider mobile viewport</li>
                <li>• Keep content organized</li>
                <li>• Test swipe interactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}