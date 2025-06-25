
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "gatsby", label: "Gatsby" },
  { value: "remix", label: "Remix" }
];

const skills = [
  "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js", 
  "Python", "Java", "C++", "Go", "Rust", "PHP", "Ruby", "Swift"
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", 
  "France", "Japan", "Brazil", "India", "China", "Mexico", "Italy"
];

export default function MultiSelectShowcase() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFramework = (value: string) => {
    setSelectedFrameworks(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(item => item !== skill)
        : [...prev, skill]
    );
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(item => item !== skill));
  };

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Multi Select</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Multiple option selection components with search, filtering, and tag-based interfaces.
        </p>
      </div>

      {/* Command-based Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle>Command Multi Select</CardTitle>
          <CardDescription>Multi-select with search using Command component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Frameworks</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedFrameworks.length > 0
                      ? `${selectedFrameworks.length} selected`
                      : "Select frameworks..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search frameworks..." />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={() => toggleFramework(framework.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedFrameworks.includes(framework.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            {selectedFrameworks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFrameworks.map(value => {
                  const framework = frameworks.find(f => f.value === value);
                  return (
                    <Badge key={value} variant="secondary" className="gap-1">
                      {framework?.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => toggleFramework(value)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Checkbox Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Multi Select</CardTitle>
          <CardDescription>Multi-select using checkboxes with search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Skills</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-3">
                {filteredSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => toggleSkill(skill)}
                    />
                    <Label htmlFor={skill} className="text-sm font-normal cursor-pointer">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedSkills.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Selected Skills ({selectedSkills.length})</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(skill => (
                    <Badge key={skill} variant="outline" className="gap-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tag-based Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle>Tag-based Multi Select</CardTitle>
          <CardDescription>Interactive tag input with suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Add Countries</Label>
              <div className="border rounded-lg p-2 min-h-[42px] flex flex-wrap gap-1 items-center">
                {selectedCountries.map(country => (
                  <Badge key={country} variant="secondary" className="gap-1">
                    {country}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => setSelectedCountries(prev => prev.filter(c => c !== country))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                <Input
                  className="border-0 shadow-none focus-visible:ring-0 px-1 flex-1 min-w-[120px]"
                  placeholder="Type to add countries..."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Suggestions</div>
              <div className="flex flex-wrap gap-2">
                {countries
                  .filter(country => !selectedCountries.includes(country))
                  .slice(0, 6)
                  .map(country => (
                    <Button
                      key={country}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCountries(prev => [...prev, country])}
                    >
                      + {country}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grouped Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle>Grouped Multi Select</CardTitle>
          <CardDescription>Multi-select with grouped options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Technologies</Label>
              <div className="border rounded-lg divide-y">
                <div className="p-3">
                  <div className="text-sm font-medium mb-2">Frontend</div>
                  <div className="space-y-2">
                    {["React", "Vue.js", "Angular", "Svelte"].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Checkbox id={tech} />
                        <Label htmlFor={tech} className="text-sm font-normal cursor-pointer">
                          {tech}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="text-sm font-medium mb-2">Backend</div>
                  <div className="space-y-2">
                    {["Node.js", "Python", "Java", "Go"].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Checkbox id={tech} />
                        <Label htmlFor={tech} className="text-sm font-normal cursor-pointer">
                          {tech}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="text-sm font-medium mb-2">Database</div>
                  <div className="space-y-2">
                    {["PostgreSQL", "MongoDB", "Redis", "MySQL"].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Checkbox id={tech} />
                        <Label htmlFor={tech} className="text-sm font-normal cursor-pointer">
                          {tech}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Multi Select</CardTitle>
          <CardDescription>Space-efficient multi-select for limited space</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categories</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between text-sm">
                    {selectedFrameworks.length > 0 ? (
                      <span>{selectedFrameworks.length} selected</span>
                    ) : (
                      <span className="text-muted-foreground">Select categories</span>
                    )}
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2">
                  <div className="space-y-1">
                    {frameworks.slice(0, 5).map((framework) => (
                      <div key={framework.value} className="flex items-center space-x-2 p-1">
                        <Checkbox
                          id={`compact-${framework.value}`}
                          checked={selectedFrameworks.includes(framework.value)}
                          onCheckedChange={() => toggleFramework(framework.value)}
                        />
                        <Label htmlFor={`compact-${framework.value}`} className="text-sm font-normal cursor-pointer">
                          {framework.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-1">
                {["Active", "Pending", "Completed"].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Multi Select Guidelines</CardTitle>
          <CardDescription>Best practices for multiple selection components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Provide search/filter functionality</li>
                <li>• Show selected count in trigger</li>
                <li>• Allow easy removal of selections</li>
                <li>• Group related options logically</li>
                <li>• Use appropriate selection limits</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">UX Considerations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Consider dropdown vs inline display</li>
                <li>• Provide bulk select/deselect options</li>
                <li>• Use progressive disclosure for large lists</li>
                <li>• Support keyboard navigation</li>
                <li>• Validate selection requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
