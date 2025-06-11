import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Home, ChevronRight, Settings, User, Bell, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavigationShowcase() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Navigation Components</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Navigation components for wayfinding, page hierarchy, and user guidance.
        </p>
      </div>

      {/* Breadcrumbs */}
      <Card>
        <CardHeader>
          <CardTitle>Breadcrumbs</CardTitle>
          <CardDescription>Show users their current location within a site hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Basic Breadcrumb</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Navigation</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Breadcrumb with Icons</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Breadcrumb with Ellipsis</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Navigation</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs Navigation</CardTitle>
          <CardDescription>Organize content into separate views</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Horizontal Tabs</h4>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Overview Content</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Main dashboard overview with key metrics and summaries.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Analytics Content</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Detailed analytics and performance metrics.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="reports" className="mt-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Reports Content</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Generated reports and data exports.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="notifications" className="mt-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Notifications Content</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Notification settings and preferences.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
          <CardDescription>Navigate through multiple pages of content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Basic Pagination</h4>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">10</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Simple Pagination</h4>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 py-2 text-sm">Page 2 of 10</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Navigation</CardTitle>
          <CardDescription>Responsive navigation patterns for mobile devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Mobile Menu</h4>
              <div className="border rounded-lg p-4 max-w-sm mx-auto">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">App Name</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Mobile Menu Content */}
                {mobileMenuOpen && (
                  <div className="space-y-2 border-t pt-4">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Bottom Navigation</h4>
              <div className="border rounded-lg p-4 max-w-sm mx-auto">
                <div className="grid grid-cols-4 gap-2">
                  <Button 
                    variant={activeTab === "home" ? "default" : "ghost"} 
                    size="sm" 
                    className="flex flex-col gap-1 h-auto py-2"
                    onClick={() => setActiveTab("home")}
                  >
                    <Home className="h-4 w-4" />
                    <span className="text-xs">Home</span>
                  </Button>
                  <Button 
                    variant={activeTab === "search" ? "default" : "ghost"} 
                    size="sm" 
                    className="flex flex-col gap-1 h-auto py-2"
                    onClick={() => setActiveTab("search")}
                  >
                    <Search className="h-4 w-4" />
                    <span className="text-xs">Search</span>
                  </Button>
                  <Button 
                    variant={activeTab === "notifications" ? "default" : "ghost"} 
                    size="sm" 
                    className="flex flex-col gap-1 h-auto py-2"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-4 w-4" />
                    <span className="text-xs">Alerts</span>
                  </Button>
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    size="sm" 
                    className="flex flex-col gap-1 h-auto py-2"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4" />
                    <span className="text-xs">Profile</span>
                  </Button>
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
            <h4 className="font-medium">Basic Breadcrumb</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Tabs Navigation</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
  <TabsContent value="analytics">
    Analytics content
  </TabsContent>
</Tabs>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Pagination</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}