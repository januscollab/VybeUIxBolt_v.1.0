import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Copy, Figma, FileCode, Search, Calculator, Calendar, Settings, User, File, Folder, Plus, Command as CommandIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function CommandMenuShowcase() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const commands = [
    { title: "Calendar", icon: Calendar, shortcut: "⌘C" },
    { title: "Search Emoji", icon: Search, shortcut: "⌘E" },
    { title: "Calculator", icon: Calculator, shortcut: "⌘+" },
    { title: "Settings", icon: Settings, shortcut: "⌘," },
    { title: "Profile", icon: User, shortcut: "⌘P" }
  ];

  const codeExamples = {
    basic: `<Command>
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
    </CommandGroup>
  </CommandList>
</Command>`,
    dialog: `const [open, setOpen] = useState(false);

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

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
    withShortcuts: `<CommandGroup heading="Actions">
  <CommandItem>
    <Calendar className="mr-2 h-4 w-4" />
    <span>Calendar</span>
    <CommandShortcut>⌘C</CommandShortcut>
  </CommandItem>
  <CommandItem>
    <Search className="mr-2 h-4 w-4" />
    <span>Search</span>
    <CommandShortcut>⌘E</CommandShortcut>
  </CommandItem>
</CommandGroup>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Command Menu</h1>
            <p className="text-lg text-muted-foreground">
              Keyboard-driven command palette for quick navigation and actions with fuzzy search.
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
          <Badge variant="outline">Keyboard</Badge>
        </div>
      </div>

      {/* Basic Command Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Command Menu</CardTitle>
          <CardDescription>
            Standard command palette with search and grouped command items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <Command className="rounded-lg border shadow-md max-w-md mx-auto">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {commands.slice(0, 3).map((command) => (
                    <CommandItem key={command.title}>
                      <command.icon className="mr-2 h-4 w-4" />
                      <span>{command.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  {commands.slice(3).map((command) => (
                    <CommandItem key={command.title}>
                      <command.icon className="mr-2 h-4 w-4" />
                      <span>{command.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
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

      {/* Command Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Command Dialog</CardTitle>
          <CardDescription>
            Full-screen command palette triggered by keyboard shortcut (⌘K).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg font-medium">
                <CommandIcon className="h-5 w-5" />
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>{" "}
                to open command palette
              </div>
              <Button onClick={() => setDialogOpen(true)}>
                Or click to open manually
              </Button>
              
              <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Quick Actions">
                    <CommandItem>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create new file</span>
                      <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <Search className="mr-2 h-4 w-4" />
                      <span>Search files</span>
                      <CommandShortcut>⌘F</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Open settings</span>
                      <CommandShortcut>⌘,</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Recent Files">
                    <CommandItem>
                      <File className="mr-2 h-4 w-4" />
                      <span>App.tsx</span>
                    </CommandItem>
                    <CommandItem>
                      <File className="mr-2 h-4 w-4" />
                      <span>index.css</span>
                    </CommandItem>
                    <CommandItem>
                      <Folder className="mr-2 h-4 w-4" />
                      <span>components/</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Navigation">
                    <CommandItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Go to Calendar</span>
                      <CommandShortcut>G then C</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Go to Profile</span>
                      <CommandShortcut>G then P</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Command Dialog Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.dialog)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.dialog}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Command with Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle>Commands with Keyboard Shortcuts</CardTitle>
          <CardDescription>
            Enhanced command palette with visible keyboard shortcuts and categories.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <Command className="rounded-lg border shadow-md max-w-lg mx-auto">
              <CommandInput placeholder="Search commands..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="File Operations">
                  <CommandItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New File</span>
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Folder className="mr-2 h-4 w-4" />
                    <span>New Folder</span>
                    <CommandShortcut>⇧⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Find in Files</span>
                    <CommandShortcut>⇧⌘F</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                    <CommandShortcut>⌘1</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                    <CommandShortcut>⌘2</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="System">
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Preferences</span>
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                    <CommandShortcut>⌘U</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
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

      {/* Keyboard Shortcuts Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Shortcuts Reference</CardTitle>
          <CardDescription>
            Complete guide to command menu keyboard interactions and shortcuts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Navigation</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Open command palette</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘K</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Navigate up/down</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">↑↓</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Select item</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">Enter</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Close palette</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">Esc</kbd>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">New file</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘N</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Search files</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘F</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Settings</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘,</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm">Help</span>
                  <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘?</kbd>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Command menu with dynamic commands and user action tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Dynamic command generation from database</li>
              <li>• User command history and analytics</li>
              <li>• Role-based command filtering</li>
              <li>• Real-time command suggestions</li>
              <li>• Command usage tracking and optimization</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Command Patterns</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// Commands table</code>
              <code className="block">commands: id, name, action, shortcut, role_required</code>
              <code className="block">// Usage analytics</code>
              <code className="block">command_usage: command_id, user_id, timestamp</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible command menu interfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA combobox and listbox roles</li>
                <li>• Keyboard navigation and shortcuts</li>
                <li>• Screen reader announcements</li>
                <li>• Focus management and trapping</li>
                <li>• High contrast support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use consistent keyboard shortcuts</li>
                <li>• Provide fuzzy search capabilities</li>
                <li>• Group related commands logically</li>
                <li>• Show visual shortcuts in interface</li>
                <li>• Maintain command state across sessions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}