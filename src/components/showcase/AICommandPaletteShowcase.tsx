
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles, Search, Zap, Brain, Code, Palette, Settings, FileText, User, Calendar } from "lucide-react";

export default function AICommandPaletteShowcase() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const aiSuggestions = [
    { icon: Zap, label: "Quick Actions", description: "AI-suggested actions based on context", category: "Smart" },
    { icon: Brain, label: "Generate Content", description: "Create content using AI assistance", category: "AI" },
    { icon: Code, label: "Code Assistant", description: "Get help with code and development", category: "AI" },
    { icon: Palette, label: "Design Helper", description: "AI-powered design suggestions", category: "AI" },
    { icon: FileText, label: "Document Analysis", description: "Analyze and summarize documents", category: "AI" },
    { icon: Search, label: "Smart Search", description: "Enhanced search with AI understanding", category: "Smart" },
    { icon: Settings, label: "Auto Configure", description: "Intelligent system configuration", category: "Smart" },
    { icon: User, label: "User Insights", description: "AI-driven user behavior analysis", category: "Analytics" },
    { icon: Calendar, label: "Schedule Optimization", description: "AI-powered scheduling suggestions", category: "Smart" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">AI Palette</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          AI-powered command palette with intelligent suggestions and contextual actions.
        </p>
      </div>

      {/* Basic AI Palette */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Enhanced Command Palette</CardTitle>
          <CardDescription>Intelligent command interface with AI-powered suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Search with AI assistance...</span>
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Ask AI or search commands..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <div className="flex flex-col items-center gap-2 py-6">
                        <Brain className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          AI is thinking... Try describing what you want to do
                        </p>
                      </div>
                    </CommandEmpty>
                    
                    <CommandGroup heading="AI Suggestions">
                      {aiSuggestions
                        .filter(item => 
                          searchValue === "" || 
                          item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <CommandItem key={index} className="flex items-center gap-3 p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <item.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Features</CardTitle>
          <CardDescription>Intelligent capabilities that enhance user productivity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Brain,
                title: "Natural Language Processing",
                description: "Understand commands in plain English",
                example: '"Create a new project with React and TypeScript"'
              },
              {
                icon: Zap,
                title: "Contextual Suggestions",
                description: "Smart suggestions based on current context",
                example: "Suggests relevant actions for current page"
              },
              {
                icon: Search,
                title: "Semantic Search",
                description: "Find items by meaning, not just keywords",
                example: "Search 'dark theme' finds appearance settings"
              },
              {
                icon: Sparkles,
                title: "Predictive Actions",
                description: "Anticipate user needs and suggest actions",
                example: "Suggests common next steps in workflows"
              }
            ].map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{feature.example}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Patterns</CardTitle>
          <CardDescription>Different ways to integrate AI palette functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Global Shortcut</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Accessible from anywhere in the application with keyboard shortcut
              </p>
              <div className="flex items-center gap-2">
                <Input placeholder="Press Cmd+K to open AI Palette" className="flex-1" readOnly />
                <Badge variant="outline">⌘K</Badge>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Contextual Integration</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Embedded within specific workflows and interfaces
              </p>
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="mr-2 h-4 w-4" />
                Ask AI for help with this task
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Smart Autocomplete</h4>
              <p className="text-sm text-muted-foreground mb-3">
                AI-enhanced input fields with intelligent suggestions
              </p>
              <div className="relative">
                <Input placeholder="Type your request..." />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Brain className="h-4 w-4 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>AI Palette Guidelines</CardTitle>
          <CardDescription>Best practices for AI-enhanced command interfaces</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Provide clear visual indicators for AI features</li>
                <li>• Make AI suggestions contextually relevant</li>
                <li>• Offer both AI and traditional search options</li>
                <li>• Ensure graceful fallbacks when AI is unavailable</li>
                <li>• Use progressive disclosure for complex AI features</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">User Experience</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Keep response times under 200ms for suggestions</li>
                <li>• Provide feedback during AI processing</li>
                <li>• Allow users to correct AI interpretations</li>
                <li>• Learn from user interactions and preferences</li>
                <li>• Maintain user privacy and data security</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
