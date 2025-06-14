import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Figma, FileCode, Search, Filter, X, TrendingUp, Clock, User, Tag, Command } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SearchBarShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [recentSearches] = useState(["React components", "UI design", "Tailwind CSS"]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const codeExamples = {
    basic: `<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10"
  />
</div>`,
    withFilters: `const [filters, setFilters] = useState<string[]>([]);

<div className="space-y-2">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Search with filters..."
      className="pl-10 pr-10"
    />
    <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
      <Filter className="h-4 w-4" />
    </Button>
  </div>
  {filters.length > 0 && (
    <div className="flex flex-wrap gap-1">
      {filters.map((filter) => (
        <Badge key={filter} variant="secondary" className="text-xs">
          {filter}
          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter(filter)} />
        </Badge>
      ))}
    </div>
  )}
</div>`,
    advanced: `<div className="relative">
  <Command className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search or type a command..."
    className="pl-10 pr-20"
  />
  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      ⌘K
    </kbd>
  </div>
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Search Bar</h1>
            <p className="text-lg text-muted-foreground">
              Interactive search input with filtering, suggestions, and keyboard shortcuts.
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
          <Badge variant="outline">Input</Badge>
          <Badge variant="outline">Search</Badge>
        </div>
      </div>

      {/* Basic Search */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Search</CardTitle>
          <CardDescription>
            Simple search input with icon and placeholder text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Searching for: "{searchQuery}"
                </div>
              )}
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

      {/* Search with Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search with Filters</CardTitle>
          <CardDescription>
            Advanced search with filter tags and clear options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search with filters..."
                  value={searchQuery2}
                  onChange={(e) => setSearchQuery2(e.target.value)}
                  className="pl-10 pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => {/* Filter logic */}}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => addFilter("Components")}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Components
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => addFilter("Design")}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Design
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => addFilter("React")}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  React
                </Button>
              </div>

              {filters.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.map((filter) => (
                    <Badge key={filter} variant="secondary" className="text-xs">
                      {filter}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                        onClick={() => removeFilter(filter)} 
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filter Search Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withFilters)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withFilters}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Command Palette Style */}
      <Card>
        <CardHeader>
          <CardTitle>Command Palette Search</CardTitle>
          <CardDescription>
            Search with keyboard shortcuts and command-style interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <Command className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search or type a command..."
                  className="pl-10 pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    ⌘K
                  </kbd>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground font-medium">Recent searches</div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground font-medium">Trending</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer text-sm">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span>Button components</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer text-sm">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span>Form validation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Command Search Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.advanced)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.advanced}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for search functionality and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Search Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Real-time search results</li>
                <li>• Keyboard navigation (↑↓ arrows)</li>
                <li>• Search history and suggestions</li>
                <li>• Filter and category support</li>
                <li>• Keyboard shortcuts (⌘K, Escape)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Debounce API calls (300ms)</li>
                <li>• Show loading states</li>
                <li>• Highlight search matches</li>
                <li>• Provide clear no-results state</li>
                <li>• Support fuzzy search</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}