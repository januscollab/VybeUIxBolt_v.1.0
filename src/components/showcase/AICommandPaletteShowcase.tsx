
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, Calculator, Calendar, CreditCard, Settings, User, 
  Smile, Plus, File, FolderOpen, Hash, BookOpen, Zap, 
  ChevronRight, Command as CommandIcon, Sparkles
} from "lucide-react";

export default function AICommandPaletteShowcase() {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const commands = [
    { id: "calendar", label: "Calendar", icon: Calendar, shortcut: "⌘C" },
    { id: "search", label: "Search Emoji", icon: Smile, shortcut: "⌘E" },
    { id: "calculator", label: "Calculator", icon: Calculator, shortcut: "⌘K" },
    { id: "settings", label: "Settings", icon: Settings, shortcut: "⌘," },
    { id: "profile", label: "Profile", icon: User, shortcut: "⌘P" },
    { id: "billing", label: "Billing", icon: CreditCard, shortcut: "⌘B" },
  ];

  const aiSuggestions = [
    "Create a new project dashboard",
    "Generate component documentation",
    "Optimize performance metrics", 
    "Design a user onboarding flow",
    "Implement dark mode toggle",
    "Add accessibility features"
  ];

  return (
    <div className="space-y-8 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">AI Command Palette</h1>
          <Badge variant="default">AI Enhanced</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Smart command interface with AI-powered suggestions and quick actions for enhanced productivity.
        </p>
      </div>

      {/* Basic Command Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Standard Command Palette</CardTitle>
          <CardDescription>
            Quick access to application features with keyboard shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                  <Search className="mr-2 h-4 w-4" />
                  Search commands...
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {commands.map((command) => (
                        <CommandItem key={command.id}>
                          <command.icon className="mr-2 h-4 w-4" />
                          <span>{command.label}</span>
                          <CommandShortcut>{command.shortcut}</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Tools">
                      <CommandItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create New</span>
                      </CommandItem>
                      <CommandItem>
                        <File className="mr-2 h-4 w-4" />
                        <span>New File</span>
                      </CommandItem>
                      <CommandItem>
                        <FolderOpen className="mr-2 h-4 w-4" />
                        <span>Open Folder</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* AI-Enhanced Command Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Enhanced Command Palette
          </CardTitle>
          <CardDescription>
            Intelligent suggestions and context-aware commands powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Dialog open={aiOpen} onOpenChange={setAiOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-muted-foreground bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  Ask AI or search commands...
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-primary/10 px-1.5 font-mono text-[10px] font-medium text-primary">
                    <span className="text-xs">⌘</span>⇧K
                  </kbd>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput 
                    placeholder="Ask AI to help or search commands..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <div className="text-center py-6">
                        <Sparkles className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No results found. Try asking AI for help!</p>
                      </div>
                    </CommandEmpty>
                    
                    {searchQuery && (
                      <CommandGroup heading="AI Suggestions">
                        <CommandItem className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="mr-2 h-4 w-4 text-accent" />
                            <span>Generate: "{searchQuery}"</span>
                          </div>
                          <Badge variant="outline" className="border-accent text-accent">AI</Badge>
                        </CommandItem>
                        <CommandItem>
                          <BookOpen className="mr-2 h-4 w-4 text-primary" />
                          <span>Explain: "{searchQuery}"</span>
                        </CommandItem>
                      </CommandGroup>
                    )}

                    <CommandGroup heading="Quick Actions">
                      {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                        <CommandItem key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Sparkles className="mr-2 h-4 w-4 text-accent" />
                            <span>{suggestion}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    <CommandSeparator />
                    
                    <CommandGroup heading="Commands">
                      {commands.map((command) => (
                        <CommandItem key={command.id}>
                          <command.icon className="mr-2 h-4 w-4" />
                          <span>{command.label}</span>
                          <CommandShortcut>{command.shortcut}</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>

            {/* AI Context Panel */}
            <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">AI Assistant Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    The AI can help you create components, generate code, explain concepts, or guide you through complex tasks.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Zap className="mr-1 h-3 w-3" />
                      Quick Start
                    </Button>
                    <Button size="sm" variant="ghost">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Interactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Interactions</CardTitle>
          <CardDescription>
            Your latest AI-powered commands and suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-accent/10 p-1.5">
                    <CommandIcon className="h-3 w-3 text-accent" />
                  </div>
                  <span className="text-sm">{suggestion}</span>
                </div>
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
          <CardDescription>
            How to integrate AI-enhanced command palettes in your applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Key Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Intelligent command suggestions</li>
                <li>• Context-aware AI responses</li>
                <li>• Natural language processing</li>
                <li>• Quick action shortcuts</li>
                <li>• Learning user preferences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Use Cases</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Code generation assistance</li>
                <li>• Documentation creation</li>
                <li>• Project setup automation</li>
                <li>• Design system guidance</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
