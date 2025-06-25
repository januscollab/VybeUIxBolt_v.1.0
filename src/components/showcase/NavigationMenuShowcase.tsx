import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Copy, Figma, FileCode, ChevronDown, ChevronRight, Home, Settings, User, FileText, LayoutDashboard, Package, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function NavigationMenuShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/"
              >
                <div className="mb-2 mt-4 text-lg font-medium">
                  Documentation
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Learn how to integrate our components in your app.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/primitives/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <ListItem href="/docs/primitives/alert-dialog" title="Alert Dialog">
            A modal dialog that interrupts the user with important content.
          </ListItem>
          <ListItem href="/docs/primitives/hover-card" title="Hover Card">
            For sighted users to preview content available behind a link.
          </ListItem>
          <ListItem href="/docs/primitives/progress" title="Progress">
            Displays an indicator showing the completion progress of a task.
          </ListItem>
          <ListItem href="/docs/primitives/scroll-area" title="Scroll Area">
            Visually or semantically separates content.
          </ListItem>
          <ListItem href="/docs/primitives/tabs" title="Tabs">
            A set of layered sections of content—known as tab panels.
          </ListItem>
          <ListItem href="/docs/primitives/tooltip" title="Tooltip">
            A popup that displays information related to an element.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link to="/docs" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Documentation
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    responsive: `<NavigationMenu className="hidden md:flex">
  <NavigationMenuList>
    {/* Desktop navigation items */}
  </NavigationMenuList>
</NavigationMenu>

{/* Mobile navigation */}
<div className="md:hidden">
  <MobileMenu />
</div>`,
    customStyles: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
        Custom Styled
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 bg-primary/5 border-primary/20">
          {/* Content items */}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Navigation Menu</h1>
            <p className="text-lg text-muted-foreground">
              A responsive navigation component with dropdowns, mega menus, and mobile adaptations.
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
          <Badge variant="outline">Responsive</Badge>
        </div>
      </div>

      {/* Basic Navigation Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Navigation Menu</CardTitle>
          <CardDescription>
            Standard navigation menu with dropdowns and links.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Documentation
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Learn how to integrate our components in your app.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem href="/docs/primitives/typography" title="Typography">
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/docs/primitives/alert-dialog" title="Alert Dialog">
                        A modal dialog that interrupts the user with important content.
                      </ListItem>
                      <ListItem href="/docs/primitives/hover-card" title="Hover Card">
                        For sighted users to preview content available behind a link.
                      </ListItem>
                      <ListItem href="/docs/primitives/progress" title="Progress">
                        Displays an indicator showing the completion progress of a task.
                      </ListItem>
                      <ListItem href="/docs/primitives/scroll-area" title="Scroll Area">
                        Visually or semantically separates content.
                      </ListItem>
                      <ListItem href="/docs/primitives/tabs" title="Tabs">
                        A set of layered sections of content—known as tab panels.
                      </ListItem>
                      <ListItem href="/docs/primitives/tooltip" title="Tooltip">
                        A popup that displays information related to an element.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/docs" className={navigationMenuTriggerStyle()}>
                    Documentation
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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

      {/* Horizontal Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Horizontal Navigation</CardTitle>
          <CardDescription>
            Simple horizontal navigation bar with icons and active states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "bg-accent text-accent-foreground")}>
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/profile" className={navigationMenuTriggerStyle()}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/settings" className={navigationMenuTriggerStyle()}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </CardContent>
      </Card>

      {/* Mega Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Mega Menu</CardTitle>
          <CardDescription>
            Expanded dropdown with rich content and multiple columns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Package className="h-4 w-4 mr-2" />
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Software</h3>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                                <Layers className="h-4 w-4" />
                                Design System
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard Platform
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Documentation
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Services</h3>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Consulting</a>
                            </li>
                            <li>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Implementation</a>
                            </li>
                            <li>
                              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Training</a>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium mb-2">Featured</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Discover our latest product release with enhanced features.
                          </p>
                          <Button size="sm">Learn More</Button>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {solutions.map((solution) => (
                        <ListItem
                          key={solution.title}
                          href={solution.href}
                          title={solution.title}
                        >
                          {solution.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {resources.map((resource) => (
                        <ListItem
                          key={resource.title}
                          href={resource.href}
                          title={resource.title}
                        >
                          {resource.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Responsive Navigation Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.responsive)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.responsive}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Custom Styled Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styled Navigation</CardTitle>
          <CardDescription>
            Navigation menu with custom styling and branding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-primary/5 border-primary/20">
                      <ListItem 
                        href="/products/design-system" 
                        title="Design System"
                        className="hover:bg-primary/10"
                      >
                        A complete design system for building consistent interfaces.
                      </ListItem>
                      <ListItem 
                        href="/products/components" 
                        title="Component Library"
                        className="hover:bg-primary/10"
                      >
                        Pre-built components for rapid development.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-secondary/5 border-secondary/20">
                      <ListItem 
                        href="/services/consulting" 
                        title="Consulting"
                        className="hover:bg-secondary/10"
                      >
                        Expert advice on design system implementation.
                      </ListItem>
                      <ListItem 
                        href="/services/training" 
                        title="Training"
                        className="hover:bg-secondary/10"
                      >
                        Workshops and courses for your team.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className={cn(navigationMenuTriggerStyle(), "bg-accent text-accent-foreground hover:bg-accent/90")}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Custom Styled Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.customStyles)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.customStyles}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for navigation menu design and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation support</li>
                <li>• Responsive design for mobile and desktop</li>
                <li>• Dropdown menus with rich content</li>
                <li>• Active state indicators</li>
                <li>• Accessible ARIA attributes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep navigation structure simple and intuitive</li>
                <li>• Use clear, descriptive labels</li>
                <li>• Provide visual feedback for active and hover states</li>
                <li>• Consider mobile navigation patterns</li>
                <li>• Test with keyboard and screen readers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

// Sample data for the mega menu
const solutions = [
  {
    title: "Enterprise",
    description: "Solutions for large organizations with complex needs.",
    href: "/solutions/enterprise",
  },
  {
    title: "Small Business",
    description: "Tailored solutions for growing businesses.",
    href: "/solutions/small-business",
  },
  {
    title: "Startups",
    description: "Fast implementation for early-stage companies.",
    href: "/solutions/startups",
  },
  {
    title: "Education",
    description: "Special offerings for educational institutions.",
    href: "/solutions/education",
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references.",
    href: "/resources/documentation",
  },
  {
    title: "Blog",
    description: "Latest news, tips, and best practices.",
    href: "/resources/blog",
  },
  {
    title: "Community",
    description: "Join our community of developers and designers.",
    href: "/resources/community",
  },
  {
    title: "Support",
    description: "Get help from our support team.",
    href: "/resources/support",
  },
];