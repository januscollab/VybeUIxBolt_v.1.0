import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Copy, Figma, FileCode, Sparkles, Bot, Search, Zap, Star, Brain, MessageSquare, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function AICommandPaletteShowcase() {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setAiOpen((open) => !open);
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

  const aiSuggestions = [
    { 
      category: "Quick Actions", 
      items: [
        { title: "Generate component", description: "Create a new React component", icon: Sparkles },
        { title: "Optimize performance", description: "Analyze and improve app performance", icon: Zap },
        { title: "Fix accessibility", description: "Scan and fix accessibility issues", icon: Star },
        { title: "Generate tests", description: "Create unit tests for components", icon: Brain }
      ]
    },
    {
      category: "AI Assistance",
      items: [
        { title: "Explain this code", description: "Get AI explanation of selected code", icon: MessageSquare },
        { title: "Refactor component", description: "AI-powered code refactoring", icon: Wand2 },
        { title: "Generate documentation", description: "Auto-generate component docs", icon: Bot },
        { title: "Code review", description: "AI code review and suggestions", icon: Search }
      ]
    }
  ];

  const handleAIQuery = (selectedQuery: string) => {
    setQuery(selectedQuery);
    setIsThinking(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsThinking(false);
      toast({
        title: "AI Assistant",
        description: `Processing: ${selectedQuery}`,
      });
      setAiOpen(false);
    }, 2000);
  };

  const codeExamples = {
    basic: `const [aiOpen, setAiOpen] = useState(false);
const [isThinking, setIsThinking] = useState(false);

<CommandDialog open={aiOpen} onOpenChange={setAiOpen}>
  <CommandInput 
    placeholder="Ask AI anything about your code..." 
    value={query}
    onValueChange={setQuery}
  />
  <CommandList>
    {isThinking ? (
      <div className="flex items-center justify-center p-8">
        <Bot className="h-6 w-6 animate-spin mr-2" />
        <span>AI is thinking...</span>
      </div>
    ) : (
      <>
        <CommandEmpty>Ask AI for help with your code!</CommandEmpty>
        <CommandGroup heading="AI Suggestions">
          <CommandItem onSelect={() => handleAIQuery("Generate component")}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate component
          </CommandItem>
        </CommandGroup>
      </>
    )}
  </CommandList>
</CommandDialog>`,
    withCategories: `const aiSuggestions = [
  {
    category: "Quick Actions",
    items: [
      { title: "Generate component", icon: Sparkles },
      { title: "Fix accessibility", icon: Star }
    ]
  }
];

{aiSuggestions.map((section) => (
  <CommandGroup key={section.category} heading={section.category}>
    {section.items.map((item) => (
      <CommandItem 
        key={item.title}
        onSelect={() => handleAIQuery(item.title)}
      >
        <item.icon className="mr-2 h-4 w-4" />
        <div className="flex flex-col">
          <span>{item.title}</span>
          <span className="text-xs text-muted-foreground">
            {item.description}
          </span>
        </div>
      </CommandItem>
    ))}
  </CommandGroup>
))}`,
    keyboard: `useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setAiOpen((open) => !open);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">AI Command Palette</h1>
            <p className="text-lg text-muted-foreground">
              Intelligent command interface powered by AI for automated code generation and assistance.
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
          <Badge variant="default">Experimental</Badge>
          <Badge variant="outline">AI-Powered</Badge>
          <Badge variant="outline">Navigation</Badge>
        </div>
      </div>

      {/* AI Command Interface */}
      <Card>
        <CardHeader>
          <CardTitle>AI Command Interface</CardTitle>
          <CardDescription>
            Smart command palette with AI-powered suggestions and natural language processing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg font-medium">
                <Bot className="h-6 w-6 text-primary" />
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>J
                </kbd>{" "}
                for AI assistance
              </div>
              <Button onClick={() => setAiOpen(true)} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Open AI Command Palette
              </Button>
              
              <CommandDialog open={aiOpen} onOpenChange={setAiOpen}>
                <CommandInput 
                  placeholder="Ask AI anything about your code..." 
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                  {isThinking ? (
                    <div className="flex items-center justify-center p-8">
                      <Bot className="h-6 w-6 animate-spin mr-2 text-primary" />
                      <span>AI is thinking...</span>
                    </div>
                  ) : (
                    <>
                      <CommandEmpty>
                        <div className="text-center p-6">
                          <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Ask AI for help with your code!
                          </p>
                        </div>
                      </CommandEmpty>
                      {aiSuggestions.map((section) => (
                        <div key={section.category}>
                          <CommandGroup heading={section.category}>
                            {section.items.map((item) => (
                              <CommandItem 
                                key={item.title}
                                onSelect={() => handleAIQuery(item.title)}
                                className="flex items-start gap-3 p-3"
                              >
                                <item.icon className="h-4 w-4 mt-0.5 text-primary" />
                                <div className="flex flex-col">
                                  <span className="font-medium">{item.title}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {item.description}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                        </div>
                      ))}
                    </>
                  )}
                </CommandList>
              </CommandDialog>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">AI Command Code</h4>
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

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Features</CardTitle>
          <CardDescription>
            Advanced AI capabilities integrated into the command palette experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Code Generation</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Generate React components from descriptions</li>
                <li>• Create TypeScript interfaces and types</li>
                <li>• Generate test files and mock data</li>
                <li>• Auto-complete code patterns</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Code Analysis</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Performance optimization suggestions</li>
                <li>• Accessibility audit and fixes</li>
                <li>• Code quality improvements</li>
                <li>• Security vulnerability detection</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Natural Language</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Ask questions in plain English</li>
                <li>• Get explanations of complex code</li>
                <li>• Request specific modifications</li>
                <li>• Contextual help and documentation</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Smart Refactoring</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Intelligent code restructuring</li>
                <li>• Design pattern implementation</li>
                <li>• Code style standardization</li>
                <li>• Legacy code modernization</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <h4 className="font-medium">AI Categories Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withCategories)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withCategories}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Integration Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Examples</CardTitle>
          <CardDescription>
            Real-world examples of AI command palette integration patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Component Generation</h4>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                "Create a user profile card with avatar, name, and social links"
              </p>
              <div className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                <div>→ Generates React component with TypeScript</div>
                <div>→ Includes proper styling and responsive design</div>
                <div>→ Adds accessibility attributes</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Performance Optimization</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                "Optimize this component for better performance"
              </p>
              <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <div>→ Adds React.memo for pure components</div>
                <div>→ Implements useCallback for functions</div>
                <div>→ Suggests code splitting opportunities</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Accessibility Audit</h4>
              <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                "Check and fix accessibility issues in my form"
              </p>
              <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                <div>→ Adds proper ARIA labels and roles</div>
                <div>→ Implements keyboard navigation</div>
                <div>→ Ensures color contrast compliance</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Keyboard Shortcuts Code</h4>
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

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            AI command palette with cloud processing and user session management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">AI Processing</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Edge Functions for AI model integration</li>
              <li>• User query history and learning</li>
              <li>• Custom AI training on user codebase</li>
              <li>• Real-time collaboration with AI assistance</li>
              <li>• Usage analytics and optimization</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Data Patterns</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// AI interactions</code>
              <code className="block">ai_queries: user_id, query, response, timestamp</code>
              <code className="block">// Generated code</code>
              <code className="block">generated_code: query_id, component_name, code, metadata</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible AI command interfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Screen reader support for AI responses</li>
                <li>• Keyboard shortcuts for AI functions</li>
                <li>• Progress indicators for AI processing</li>
                <li>• Clear error handling and feedback</li>
                <li>• Voice input compatibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide clear AI capability descriptions</li>
                <li>• Show AI processing states visually</li>
                <li>• Allow users to review AI suggestions</li>
                <li>• Implement undo/redo for AI actions</li>
                <li>• Respect user privacy and data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}