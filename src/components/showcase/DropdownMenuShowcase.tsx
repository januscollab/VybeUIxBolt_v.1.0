import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Copy, Figma, FileCode, MoreHorizontal, User, Settings, LogOut, Download, Share, Edit, Trash2, ChevronRight, Plus, Mail, MessageSquare, Users, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function DropdownMenuShowcase() {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [position, setPosition] = useState("bottom");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      <span>Profile</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      <span>Settings</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    withShortcuts: `<DropdownMenuItem>
  <User className="mr-2 h-4 w-4" />
  <span>Profile</span>
  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
</DropdownMenuItem>
<DropdownMenuItem>
  <Settings className="mr-2 h-4 w-4" />
  <span>Settings</span>
  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
</DropdownMenuItem>`,
    checkbox: `<DropdownMenuCheckboxItem
  checked={bookmarksChecked}
  onCheckedChange={setBookmarksChecked}
>
  Show Bookmarks Bar
</DropdownMenuCheckboxItem>
<DropdownMenuCheckboxItem
  checked={urlsChecked}
  onCheckedChange={setUrlsChecked}
>
  Show Full URLs
</DropdownMenuCheckboxItem>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Dropdown Menu</h1>
            <p className="text-lg text-muted-foreground">
              Contextual menu component with rich content and interactive elements.
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
          <Badge variant="outline">Menu</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Basic Dropdown */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Dropdown Menu</CardTitle>
          <CardDescription>
            Simple dropdown menu with actions and separators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/* With Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle>Menu with Shortcuts</CardTitle>
          <CardDescription>
            Dropdown menu items with keyboard shortcuts displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Menu with Shortcuts</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New File</span>
                    <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    <span>Share</span>
                    <DropdownMenuShortcut>⌘⇧S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Shortcuts Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withShortcuts)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withShortcuts}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Checkboxes and Radio */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Menu Items</CardTitle>
          <CardDescription>
            Dropdown menu with checkboxes and radio button groups.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">View Options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={bookmarksChecked}
                    onCheckedChange={setBookmarksChecked}
                  >
                    Show Bookmarks Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={urlsChecked}
                    onCheckedChange={setUrlsChecked}
                  >
                    Show Full URLs
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Checkbox Items Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.checkbox)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.checkbox}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Nested Submenus */}
      <Card>
        <CardHeader>
          <CardTitle>Nested Submenus</CardTitle>
          <CardDescription>
            Complex dropdown menu with nested submenus and categories.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Advanced Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Communication</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <span>Send Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Message Templates</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Message History</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Team</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <span>Invite Members</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Team Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span>Manage Roles</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Schedule Meeting</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context Menu Style */}
      <Card>
        <CardHeader>
          <CardTitle>Context Menu Actions</CardTitle>
          <CardDescription>
            Dropdown menu styled as context menu with action buttons.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Actions
                    <ChevronRight className="ml-2 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[160px]">
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for dropdown menu design and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation (↑↓ arrows)</li>
                <li>• Focus management and trapping</li>
                <li>• Customizable positioning</li>
                <li>• Nested submenu support</li>
                <li>• Touch-friendly on mobile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Group related actions together</li>
                <li>• Use separators for visual organization</li>
                <li>• Show keyboard shortcuts when applicable</li>
                <li>• Handle disabled states clearly</li>
                <li>• Consider menu positioning on small screens</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}