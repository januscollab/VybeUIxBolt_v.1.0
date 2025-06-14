import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Copy, Figma, FileCode, Search, Calculator, Calendar, CreditCard, Settings, User, Mail, MessageSquare, Plus, FileText, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function CommandMenuShowcase() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const codeExamples = {
    basic: `import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const [open, setOpen] = useState(false);

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <Mail className="mr-2 h-4 w-4" />
        <span>Mail</span>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
    keyboard: `useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };

  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);`,
    inline: `<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Command Menu</h1>
            <p className="text-lg text-muted-foreground">
              Fast, composable command menu for React applications with keyboard navigation.
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
          <Badge variant="outline">Command</Badge>
          <Badge variant="outline">Search</Badge>
        </div>
      </div>

      {/* Command Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Command Dialog</CardTitle>
          <CardDescription>
            Modal command menu triggered by keyboard shortcut (⌘K).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>{" "}
                to open the command menu
              </p>
              <Button onClick={() => setOpen(true)}>
                Open Command Menu
              </Button>
            </div>
          </div>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Dialog Code Example</h4>
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

      {/* Inline Command */}
      <Card>
        <CardHeader>
          <CardTitle>Inline Command Menu</CardTitle>
          <CardDescription>
            Command menu component embedded directly in the interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Quick Actions">
                    <CommandItem>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>New Document</span>
                      <div className="ml-auto text-xs text-muted-foreground">⌘N</div>
                    </CommandItem>
                    <CommandItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Open Recent</span>
                      <div className="ml-auto text-xs text-muted-foreground">⌘O</div>
                    </CommandItem>
                    <CommandItem>
                      <Search className="mr-2 h-4 w-4" />
                      <span>Find in Files</span>
                      <div className="ml-auto text-xs text-muted-foreground">⌘⇧F</div>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Communication">
                    <CommandItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Send Email</span>
                    </CommandItem>
                    <CommandItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Start Chat</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Tools">
                    <CommandItem>
                      <Calculator className="mr-2 h-4 w-4" />
                      <span>Calculator</span>
                    </CommandItem>
                    <CommandItem>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Web Search</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Inline Command Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.inline)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.inline}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Command Menu</CardTitle>
          <CardDescription>
            Command menu with sub-commands, recent items, and custom shortcuts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="text-center space-y-4">
              <Button onClick={() => setOpen2(true)} variant="outline">
                Open Advanced Command Menu
              </Button>
            </div>
          </div>

          <CommandDialog open={open2} onOpenChange={setOpen2}>
            <CommandInput placeholder="Search commands, files, and more..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Recent">
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>project-overview.md</span>
                  <div className="ml-auto text-xs text-muted-foreground">2 min ago</div>
                </CommandItem>
                <CommandItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>component-library.tsx</span>
                  <div className="ml-auto text-xs text-muted-foreground">1 hr ago</div>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Create">
                <CommandItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Component</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘⇧N</div>
                </CommandItem>
                <CommandItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Page</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘⇧P</div>
                </CommandItem>
                <CommandItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Folder</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘⇧F</div>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigate">
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Go to File</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘P</div>
                </CommandItem>
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Go to Symbol</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘⇧O</div>
                </CommandItem>
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Go to Line</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘G</div>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                  <div className="ml-auto text-xs text-muted-foreground">⌘,</div>
                </CommandItem>
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>User Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Keyboard Shortcuts Setup</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.keyboard)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.keyboard}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for command menu functionality and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Fuzzy search and filtering</li>
                <li>• Keyboard navigation (↑↓ arrows)</li>
                <li>• Command shortcuts display</li>
                <li>• Grouped command organization</li>
                <li>• Recent commands history</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use semantic command names</li>
                <li>• Show keyboard shortcuts</li>
                <li>• Group related commands</li>
                <li>• Provide command descriptions</li>
                <li>• Handle async command execution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}