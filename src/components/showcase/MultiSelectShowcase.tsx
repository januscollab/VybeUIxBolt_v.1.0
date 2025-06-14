import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Figma, FileCode, X, Search, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Option {
  id: string;
  label: string;
  value: string;
}

const skillOptions: Option[] = [
  { id: "1", label: "JavaScript", value: "javascript" },
  { id: "2", label: "TypeScript", value: "typescript" },
  { id: "3", label: "React", value: "react" },
  { id: "4", label: "Vue.js", value: "vue" },
  { id: "5", label: "Angular", value: "angular" },
  { id: "6", label: "Node.js", value: "nodejs" },
  { id: "7", label: "Python", value: "python" },
  { id: "8", label: "Go", value: "go" },
  { id: "9", label: "Rust", value: "rust" },
  { id: "10", label: "Java", value: "java" },
];

const categoryOptions: Option[] = [
  { id: "1", label: "Technology", value: "technology" },
  { id: "2", label: "Design", value: "design" },
  { id: "3", label: "Marketing", value: "marketing" },
  { id: "4", label: "Business", value: "business" },
  { id: "5", label: "Finance", value: "finance" },
];

export default function MultiSelectShowcase() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["javascript", "react"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const toggleSkill = (value: string) => {
    setSelectedSkills(prev => 
      prev.includes(value) 
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  const removeSkill = (value: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== value));
  };

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev => 
      prev.includes(value) 
        ? prev.filter(c => c !== value)
        : [...prev, value]
    );
  };

  const filteredOptions = skillOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedLabels = (values: string[], options: Option[]) => {
    return values.map(value => 
      options.find(opt => opt.value === value)?.label || value
    );
  };

  const codeExample = `const [selected, setSelected] = useState<string[]>([]);

const toggle = (value: string) => {
  setSelected(prev => 
    prev.includes(value) 
      ? prev.filter(s => s !== value)
      : [...prev, value]
  );
};

// Checkbox List
{options.map((option) => (
  <div key={option.id} className="flex items-center space-x-2">
    <Checkbox 
      checked={selected.includes(option.value)}
      onCheckedChange={() => toggle(option.value)}
    />
    <label>{option.label}</label>
  </div>
))}

// Selected Tags
{selected.map((value) => (
  <Badge key={value} variant="secondary">
    {getLabel(value)}
    <X onClick={() => remove(value)} />
  </Badge>
))}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Multi-Select</h1>
            <p className="text-lg text-muted-foreground">
              Select multiple options from a list with search, tags, and various interaction patterns.
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
          <Badge variant="outline">Form Control</Badge>
          <Badge variant="outline">Searchable</Badge>
        </div>
      </div>

      {/* Checkbox List Multi-Select */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox List Multi-Select</CardTitle>
          <CardDescription>Select multiple options using checkboxes with tag display</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="font-medium">Select your skills:</h4>
              
              {/* Selected Tags */}
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {getSelectedLabels(selectedSkills, skillOptions).map((label, index) => (
                    <Badge key={selectedSkills[index]} variant="secondary" className="gap-1">
                      {label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeSkill(selectedSkills[index])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Options List */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={selectedSkills.includes(option.value)}
                      onCheckedChange={() => toggleSkill(option.value)}
                      id={option.id}
                    />
                    <label htmlFor={option.id} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Searchable Multi-Select */}
      <Card>
        <CardHeader>
          <CardTitle>Searchable Multi-Select</CardTitle>
          <CardDescription>Multi-select with search functionality and dropdown interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="font-medium">Search and select skills:</h4>
              
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  className="pl-9"
                />
              </div>

              {/* Dropdown Options */}
              {isOpen && (
                <div className="border rounded-lg bg-background shadow-lg max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2 p-3 hover:bg-muted cursor-pointer"
                        onClick={() => toggleSkill(option.value)}
                      >
                        <div className="w-4 h-4 border rounded flex items-center justify-center">
                          {selectedSkills.includes(option.value) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-muted-foreground">
                      No skills found
                    </div>
                  )}
                </div>
              )}

              {/* Selected Count */}
              <p className="text-sm text-muted-foreground">
                {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Multi-Select */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Multi-Select</CardTitle>
          <CardDescription>Space-efficient multi-select for smaller interfaces</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="font-medium">Categories:</h4>
              
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedCategories.includes(option.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCategory(option.value)}
                    className="h-8"
                  >
                    {selectedCategories.includes(option.value) && (
                      <Check className="h-3 w-3 mr-1" />
                    )}
                    {option.label}
                  </Button>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Selected: {getSelectedLabels(selectedCategories, categoryOptions).join(", ")}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? "Hide" : "Show"} Code
              </Button>
              {showCode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(codeExample)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>
          </div>
          {showCode && (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Advanced Multi-Select */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Multi-Select</CardTitle>
          <CardDescription>Feature-rich multi-select with select all, clear all, and grouping</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Advanced Skills Selection:</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSkills(skillOptions.map(o => o.value))}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSkills([])}
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Groups */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">Frontend</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pl-4">
                    {skillOptions.filter(o => ["javascript", "typescript", "react", "vue", "angular"].includes(o.value)).map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={selectedSkills.includes(option.value)}
                          onCheckedChange={() => toggleSkill(option.value)}
                          id={`advanced-${option.id}`}
                        />
                        <label htmlFor={`advanced-${option.id}`} className="text-sm cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">Backend</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pl-4">
                    {skillOptions.filter(o => ["nodejs", "python", "go", "rust", "java"].includes(o.value)).map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={selectedSkills.includes(option.value)}
                          onCheckedChange={() => toggleSkill(option.value)}
                          id={`backend-${option.id}`}
                        />
                        <label htmlFor={`backend-${option.id}`} className="text-sm cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  {selectedSkills.length} of {skillOptions.length} skills selected
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
          <CardDescription>Best practices for multi-select implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Show selected count for awareness</li>
                <li>• Provide search for large option lists</li>
                <li>• Use clear visual indicators for selection</li>
                <li>• Allow easy removal of selections</li>
                <li>• Group related options logically</li>
                <li>• Implement select all/clear all for convenience</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">When to Use</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• User needs to select multiple items</li>
                <li>• Options are not mutually exclusive</li>
                <li>• Large lists that benefit from search</li>
                <li>• Tags, categories, or skills selection</li>
                <li>• Filtering and preference settings</li>
                <li>• When showing all options is beneficial</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}