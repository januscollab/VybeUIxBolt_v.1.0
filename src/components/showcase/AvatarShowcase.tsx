
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Figma, FileCode, User, Users, Crown, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AvatarShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<Avatar>
  <AvatarImage src="/avatars/01.png" alt="@username" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
    sizes: `{/* Different sizes */}
<Avatar className="h-8 w-8">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar className="h-12 w-12">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>MD</AvatarFallback>
</Avatar>

<Avatar className="h-16 w-16">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>`,
    withStatus: `<div className="relative">
  <Avatar>
    <AvatarImage src="/avatar.jpg" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 bg-success border-2 border-white rounded-full"></span>
</div>`,
    group: `<div className="flex -space-x-2">
  <Avatar className="border-2 border-white">
    <AvatarImage src="/avatar1.jpg" />
    <AvatarFallback>A1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-white">
    <AvatarImage src="/avatar2.jpg" />
    <AvatarFallback>A2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-white">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>`
  };

  const users = [
    { name: "Alice Johnson", initials: "AJ", image: "/placeholder.svg", status: "online" },
    { name: "Bob Smith", initials: "BS", image: null, status: "away" },
    { name: "Carol Davis", initials: "CD", image: "/placeholder.svg", status: "offline" },
    { name: "David Wilson", initials: "DW", image: null, status: "online" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Avatar</h1>
            <p className="text-lg text-muted-foreground">
              User profile image component with fallback initials and status indicators for identity representation.
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
          <Badge variant="outline">Display</Badge>
          <Badge variant="outline">Supabase Ready</Badge>
        </div>
      </div>

      {/* Basic Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Avatar</CardTitle>
          <CardDescription>
            Standard avatar implementation with image and fallback text support.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex items-center space-x-6">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="" alt="No Image" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground">CD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-secondary">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
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

      {/* Avatar Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar Sizes</CardTitle>
          <CardDescription>
            Different avatar sizes for various UI contexts and hierarchy levels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex items-center space-x-6">
              <div className="text-center space-y-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xs">XS</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Extra Small</p>
              </div>
              <div className="text-center space-y-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xs">SM</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Small</p>
              </div>
              <div className="text-center space-y-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div className="text-center space-y-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Large</p>
              </div>
              <div className="text-center space-y-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg">XL</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">Extra Large</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Size Variations Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.sizes)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.sizes}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Avatar with Status */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar with Status Indicators</CardTitle>
          <CardDescription>
            Avatars enhanced with status badges and role indicators for better user context.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {users.map((user, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="relative inline-block">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.image || undefined} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <span 
                      className={`absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full ${
                        user.status === 'online' ? 'bg-success' :
                        user.status === 'away' ? 'bg-warning' :
                        'bg-muted-foreground'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-medium">Special Role Avatars</h4>
              <div className="flex items-center space-x-6">
                <div className="text-center space-y-2">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-warning/20 text-warning">AD</AvatarFallback>
                    </Avatar>
                    <Crown className="absolute -top-1 -right-1 h-4 w-4 text-warning" />
                  </div>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary/20 text-primary">MD</AvatarFallback>
                    </Avatar>
                    <Star className="absolute -top-1 -right-1 h-4 w-4 text-primary fill-current" />
                  </div>
                  <p className="text-xs text-muted-foreground">Moderator</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Status Avatar Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withStatus)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withStatus}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Avatar Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar Groups</CardTitle>
          <CardDescription>
            Multiple avatars arranged in groups for teams, participants, or collaborators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Overlapping Group</h4>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-white">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white">
                    <AvatarFallback className="bg-muted text-muted-foreground">+5</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Spaced Group</h4>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>BM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground ml-2">and 12 others</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Team Members</h4>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="h-6 w-6 border border-white">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-xs">T{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">4 team members</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Avatar Group Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.group)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.group}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Avatar components integrated with Supabase for user profile management and image storage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2">Database Integration</h4>
            <ul className="text-sm text-primary/80 space-y-1">
              <li>• User profiles table with avatar URLs</li>
              <li>• Supabase Storage for image uploads</li>
              <li>• Automatic fallback to initials</li>
              <li>• Real-time avatar updates</li>
              <li>• CDN optimization for performance</li>
            </ul>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <h4 className="font-medium text-success mb-2">Storage Patterns</h4>
            <div className="text-sm text-success/80 space-y-1">
              <code className="block">// User profiles</code>
              <code className="block">avatar_url: text</code>
              <code className="block">first_name: text</code>
              <code className="block">last_name: text</code>
              <code className="block">// Storage bucket: avatars</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible avatar components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Proper alt text for profile images</li>
                <li>• Meaningful fallback initials</li>
                <li>• High contrast for text overlays</li>
                <li>• Screen reader friendly markup</li>
                <li>• Keyboard navigation support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use consistent sizing across contexts</li>
                <li>• Provide meaningful fallback text</li>
                <li>• Optimize images for web delivery</li>
                <li>• Consider status indicator clarity</li>
                <li>• Group related avatars logically</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
