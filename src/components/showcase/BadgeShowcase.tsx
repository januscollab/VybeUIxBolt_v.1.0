import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Shield, 
  Crown,
  Copy,
  Figma,
  FileCode
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function BadgeShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
    withIcons: `<Badge variant="default" className="gap-1">
  <CheckCircle className="h-3 w-3" />
  Verified
</Badge>`,
    status: `<Badge variant="outline" className="border-green-500 text-green-600">
  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
  Active
</Badge>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Badge</h1>
            <p className="text-lg text-muted-foreground">
              Compact elements for displaying status, categories, or short pieces of information.
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
          <Badge variant="outline">Core UI</Badge>
          <Badge variant="outline">Accessible</Badge>
        </div>
      </div>

      {/* Basic Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Variants</CardTitle>
          <CardDescription>
            Standard badge variants for different contexts and visual hierarchy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
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

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status Badges</CardTitle>
          <CardDescription>
            Badges with status indicators and contextual colors for system states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Success States</p>
              <div className="space-y-2">
                <Badge variant="outline" className="border-green-500 text-green-600 w-fit">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Active
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600 w-fit">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600 w-fit">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Warning States</p>
              <div className="space-y-2">
                <Badge variant="outline" className="border-yellow-500 text-yellow-600 w-fit">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                  Pending
                </Badge>
                <Badge variant="outline" className="border-yellow-500 text-yellow-600 w-fit">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Warning
                </Badge>
                <Badge variant="outline" className="border-yellow-500 text-yellow-600 w-fit">
                  <Clock className="h-3 w-3 mr-1" />
                  In Review
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Error States</p>
              <div className="space-y-2">
                <Badge variant="outline" className="border-red-500 text-red-600 w-fit">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                  Offline
                </Badge>
                <Badge variant="outline" className="border-red-500 text-red-600 w-fit">
                  <XCircle className="h-3 w-3 mr-1" />
                  Failed
                </Badge>
                <Badge variant="destructive" className="w-fit">
                  Critical
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Info States</p>
              <div className="space-y-2">
                <Badge variant="outline" className="border-blue-500 text-blue-600 w-fit">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  Info
                </Badge>
                <Badge variant="secondary" className="w-fit">
                  <Zap className="h-3 w-3 mr-1" />
                  New
                </Badge>
                <Badge variant="outline" className="border-purple-500 text-purple-600 w-fit">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Status Badge Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.status)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.status}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Content Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Content & Categories</CardTitle>
          <CardDescription>
            Badges for content categorization, tags, and metadata display.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Technology Tags</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Supabase</Badge>
                <Badge variant="secondary">Next.js</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Priority Levels</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive">High Priority</Badge>
                <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                  Medium Priority
                </Badge>
                <Badge variant="secondary">Low Priority</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Content Types</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Blog Post</Badge>
                <Badge variant="outline">Tutorial</Badge>
                <Badge variant="outline">Documentation</Badge>
                <Badge variant="outline">Video</Badge>
                <Badge variant="outline">Podcast</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Badges</CardTitle>
          <CardDescription>
            Badges used in interactive contexts like user profiles and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* User Profile Example */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">John Doe</h4>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-600">
                    <Crown className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Software Engineer</p>
              </div>
            </div>

            {/* Notification Example */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">System Update Available</h4>
                    <Badge variant="outline" className="border-blue-500 text-blue-600">
                      <Zap className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Version 2.1.0 is now available with new features and improvements.
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Example */}
            <div className="p-4 border rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Customer Review</h4>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    5.0
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Excellent product quality and fast delivery!"
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing badges effectively in your applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Do's</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use consistent colors for similar meanings</li>
                <li>• Keep badge text short and descriptive</li>
                <li>• Group related badges logically</li>
                <li>• Use semantic colors for status indicators</li>
                <li>• Ensure sufficient color contrast</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Don'ts</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Don't overuse badges in a single view</li>
                <li>• Avoid using badges for long text content</li>
                <li>• Don't mix different badge styles inconsistently</li>
                <li>• Avoid unclear or ambiguous badge labels</li>
                <li>• Don't use badges as primary call-to-action buttons</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Integration & Customization</CardTitle>
          <CardDescription>
            How badges integrate with Supabase, Tailwind, and Storybook.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Supabase Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Dynamic badge content from database fields</li>
              <li>• Real-time status updates via Supabase subscriptions</li>
              <li>• User role and permission badges</li>
              <li>• Content categorization and tagging</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Tailwind Customization</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Custom badge variants via Tailwind classes</li>
              <li>• Responsive badge sizing and positioning</li>
              <li>• Design token integration for consistent theming</li>
              <li>• Dark mode support with semantic color tokens</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}