import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Copy, Figma, FileCode, Home, Settings, Users, BarChart3, Mail, Calendar, Search, Bell, User, LogOut, ChevronRight, Folder, File } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SidebarShowcase() {
  const [collapsed, setCollapsed] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const menuItems = [
    { title: "Dashboard", icon: Home, url: "#" },
    { title: "Analytics", icon: BarChart3, url: "#" },
    { title: "Users", icon: Users, url: "#" },
    { title: "Messages", icon: Mail, url: "#" },
    { title: "Calendar", icon: Calendar, url: "#" },
    { title: "Settings", icon: Settings, url: "#" }
  ];

  const codeExamples = {
    basic: `<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <main>
    <SidebarTrigger />
    {children}
  </main>
</SidebarProvider>`,
    withGroups: `<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Main</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Home />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
  <SidebarGroup>
    <SidebarGroupLabel>Settings</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Settings />
            <span>Preferences</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>`,
    collapsible: `const [collapsed, setCollapsed] = useState(false);

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenuButton
        onClick={() => setCollapsed(!collapsed)}
        className="w-full"
      >
        <span>App Name</span>
        <ChevronRight className={collapsed ? "rotate-0" : "rotate-90"} />
      </SidebarMenuButton>
    </SidebarHeader>
    <SidebarContent>
      {/* Menu items */}
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sidebar</h1>
            <p className="text-lg text-muted-foreground">
              Collapsible navigation sidebar with organized menu groups and responsive behavior.
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
          <Badge variant="outline">Navigation</Badge>
          <Badge variant="outline">Layout</Badge>
        </div>
      </div>

      {/* Basic Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Sidebar</CardTitle>
          <CardDescription>
            Standard navigation sidebar with menu items and proper grouping.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex h-96 w-full">
              <SidebarProvider>
                <div className="flex w-full">
                  <Sidebar className="border-r">
                    <SidebarHeader className="p-4">
                      <h3 className="font-semibold">Demo App</h3>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {menuItems.slice(0, 4).map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <a href={item.url}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                      <SidebarGroup>
                        <SidebarGroupLabel>Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {menuItems.slice(4).map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <a href={item.url}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4">
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <User className="h-4 w-4" />
                            <span>John Doe</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarFooter>
                  </Sidebar>
                  <main className="flex-1 p-6 bg-background">
                    <SidebarTrigger />
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold mb-2">Main Content</h2>
                      <p className="text-muted-foreground">
                        This is the main content area. Click the trigger button to toggle the sidebar.
                      </p>
                    </div>
                  </main>
                </div>
              </SidebarProvider>
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

      {/* Sidebar with Sub-navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Sidebar with Sub-navigation</CardTitle>
          <CardDescription>
            Advanced sidebar with nested navigation and file tree structure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex h-96 w-full">
              <SidebarProvider>
                <div className="flex w-full">
                  <Sidebar className="border-r">
                    <SidebarHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Folder className="h-5 w-5" />
                        <h3 className="font-semibold">Project Explorer</h3>
                      </div>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <Search className="h-4 w-4" />
                                <span>Search Files</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <Bell className="h-4 w-4" />
                                <span>Notifications</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                      <SidebarGroup>
                        <SidebarGroupLabel>File Tree</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <ChevronRight className="h-4 w-4" />
                                <Folder className="h-4 w-4" />
                                <span>src</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem className="ml-4">
                              <SidebarMenuButton>
                                <File className="h-4 w-4" />
                                <span>App.tsx</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem className="ml-4">
                              <SidebarMenuButton>
                                <File className="h-4 w-4" />
                                <span>index.css</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <ChevronRight className="h-4 w-4" />
                                <Folder className="h-4 w-4" />
                                <span>components</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4 border-t">
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarFooter>
                  </Sidebar>
                  <main className="flex-1 p-6 bg-background">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">File Editor</h2>
                      <div className="bg-muted/50 p-4 rounded border h-48 overflow-auto">
                        <pre className="text-sm">
{`import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;`}
                        </pre>
                      </div>
                    </div>
                  </main>
                </div>
              </SidebarProvider>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Grouped Sidebar Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withGroups)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withGroups}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Mobile Responsive */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Responsive Sidebar</CardTitle>
          <CardDescription>
            Adaptive sidebar that transforms into an overlay on mobile devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <h4 className="font-medium text-info mb-2">Responsive Behavior</h4>
                <ul className="text-sm text-info/80 space-y-1">
                  <li>• Desktop: Persistent sidebar with collapse toggle</li>
                  <li>• Tablet: Auto-collapse with overlay option</li>
                  <li>• Mobile: Hidden by default, slide-out overlay</li>
                  <li>• Touch gestures: Swipe to open/close</li>
                </ul>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <h4 className="font-medium text-warning mb-2">Implementation Notes</h4>
                <ul className="text-sm text-warning/80 space-y-1">
                  <li>• Use SidebarProvider at app root level</li>
                  <li>• Configure breakpoints in tailwind.config.ts</li>
                  <li>• Handle keyboard navigation (Tab, Escape)</li>
                  <li>• Preserve scroll position on toggle</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Collapsible Sidebar Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.collapsible)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.collapsible}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Sidebar with dynamic navigation based on user roles and real-time updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Role-based navigation menu generation</li>
              <li>• User preferences for sidebar state</li>
              <li>• Real-time notifications and badges</li>
              <li>• Dynamic menu items from database</li>
              <li>• Permission-based menu filtering</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Navigation Patterns</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// Menu items table</code>
              <code className="block">navigation_items: id, title, url, icon, role_required</code>
              <code className="block">// User preferences</code>
              <code className="block">user_preferences: sidebar_collapsed, theme, layout</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible sidebar navigation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA landmarks and navigation roles</li>
                <li>• Keyboard navigation (Tab, Arrow keys)</li>
                <li>• Focus trapping in overlay mode</li>
                <li>• Screen reader announcements</li>
                <li>• Skip links for main content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide clear visual hierarchy</li>
                <li>• Use consistent icon and text pairing</li>
                <li>• Implement responsive breakpoints</li>
                <li>• Preserve user's preferred state</li>
                <li>• Ensure touch targets are 44px minimum</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}