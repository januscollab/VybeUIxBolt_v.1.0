import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Check, 
  ChevronDown, 
  Search, 
  X, 
  Globe, 
  Users, 
  Building, 
  Copy, 
  Figma, 
  FileCode,
  ChevronsUpDown
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const countries = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "jp", label: "Japan", flag: "🇯🇵" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "br", label: "Brazil", flag: "🇧🇷" },
  { value: "in", label: "India", flag: "🇮🇳" },
  { value: "cn", label: "China", flag: "🇨🇳" },
];

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "gatsby", label: "Gatsby" },
  { value: "astro", label: "Astro" },
];

export default function SelectDropdownShowcase() {
  const [singleValue, setSingleValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchableOpen, setSearchableOpen] = useState(false);
  const [searchableValue, setSearchableValue] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const toggleMultiValue = (value: string) => {
    setMultiValue(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const codeExamples = {
    basic: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`,
    searchable: `<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="justify-between"
    >
      {value
        ? frameworks.find((framework) => framework.value === value)?.label
        : "Select framework..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandInput placeholder="Search framework..." />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandGroup>
        {frameworks.map((framework) => (
          <CommandItem
            key={framework.value}
            value={framework.value}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue)
              setOpen(false)
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === framework.value ? "opacity-100" : "opacity-0"
              )}
            />
            {framework.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>`,
    multiSelect: `// Multi-select implementation with checkboxes
const [selectedValues, setSelectedValues] = useState([]);

const toggleValue = (value) => {
  setSelectedValues(prev => 
    prev.includes(value) 
      ? prev.filter(item => item !== value)
      : [...prev, value]
  );
};`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Select Dropdown</h1>
            <p className="text-lg text-muted-foreground">
              Flexible dropdown components for single and multi-selection with search capabilities.
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
          <Badge variant="outline">Core UI</Badge>
          <Badge variant="outline">Accessible</Badge>
        </div>
      </div>

      {/* Basic Select */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Select</CardTitle>
          <CardDescription>
            Standard dropdown select with predefined options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Default Select</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                  <SelectItem value="option4">Option 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>With Icons</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Web Development
                    </div>
                  </SelectItem>
                  <SelectItem value="mobile">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Mobile Apps
                    </div>
                  </SelectItem>
                  <SelectItem value="consulting">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Consulting
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Controlled Select</Label>
              <Select value={singleValue} onValueChange={setSingleValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              {singleValue && (
                <p className="text-sm text-muted-foreground">
                  Selected: {singleValue}
                </p>
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

      {/* Searchable Select */}
      <Card>
        <CardHeader>
          <CardTitle>Searchable Select</CardTitle>
          <CardDescription>
            Dropdown with search functionality using Command component.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Framework Selection</Label>
              <Popover open={searchableOpen} onOpenChange={setSearchableOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchableOpen}
                    className="w-full justify-between"
                  >
                    {searchableValue
                      ? frameworks.find((framework) => framework.value === searchableValue)?.label
                      : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setSearchableValue(currentValue === searchableValue ? "" : currentValue);
                              setSearchableOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                searchableValue === framework.value ? "opacity-100" : "opacity-0"
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

            <div className="space-y-2">
              <Label>Country Selection</Label>
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className="w-full justify-between"
                  >
                    {countryValue ? (
                      <div className="flex items-center gap-2">
                        <span>{countries.find(c => c.value === countryValue)?.flag}</span>
                        <span>{countries.find(c => c.value === countryValue)?.label}</span>
                      </div>
                    ) : (
                      "Select country..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <ScrollArea className="h-72">
                          {countries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.value}
                              onSelect={(currentValue) => {
                                setCountryValue(currentValue === countryValue ? "" : currentValue);
                                setCountryOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  countryValue === country.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span className="mr-2">{country.flag}</span>
                              {country.label}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Searchable Select Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.searchable)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.searchable}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Multi-Select */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Select</CardTitle>
          <CardDescription>
            Select multiple options with checkboxes and tag display.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Technologies (Multi-Select)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {multiValue.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {multiValue.map((value) => (
                          <Badge key={value} variant="secondary" className="mr-1">
                            {frameworks.find(f => f.value === value)?.label}
                            <button
                              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  toggleMultiValue(value);
                                }
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onClick={() => toggleMultiValue(value)}
                            >
                              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Select technologies...</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search technologies..." />
                    <CommandEmpty>No technology found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            onSelect={() => toggleMultiValue(framework.value)}
                          >
                            <Checkbox
                              checked={multiValue.includes(framework.value)}
                              className="mr-2"
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {multiValue.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Selected {multiValue.length} technolog{multiValue.length === 1 ? 'y' : 'ies'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Multi-Select Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.multiSelect)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.multiSelect}</code>
          </pre>
        </CardContent>
      </Card>

      {/* States & Variations */}
      <Card>
        <CardHeader>
          <CardTitle>States & Variations</CardTitle>
          <CardDescription>
            Different states and styling variations of select components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Default</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Disabled</Label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Disabled select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Error State</Label>
              <Select>
                <SelectTrigger className="border-destructive focus:ring-destructive">
                  <SelectValue placeholder="Error state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-destructive">Please select an option</p>
            </div>

            <div className="space-y-2">
              <Label>Success State</Label>
              <Select defaultValue="1">
                <SelectTrigger className="border-green-500 focus:ring-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Valid Option</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-green-600">Selection confirmed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Features */}
      <Card>
        <CardHeader>
          <CardTitle>Integration & Features</CardTitle>
          <CardDescription>
            Advanced features and integration capabilities with Supabase and Tailwind.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Supabase Integration</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Dynamic options from database tables</li>
                <li>• Real-time option updates via subscriptions</li>
                <li>• Form validation with database schemas</li>
                <li>• User role-based option filtering</li>
                <li>• Automatic option caching and optimization</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Tailwind Features</h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Responsive design patterns built-in</li>
                <li>• Design token integration for theming</li>
                <li>• Dark mode support with semantic tokens</li>
                <li>• Custom styling with utility classes</li>
                <li>• Consistent spacing and typography</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Accessibility Features</h4>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Full keyboard navigation support</li>
              <li>• Screen reader optimized with ARIA labels</li>
              <li>• Focus management and visual indicators</li>
              <li>• High contrast mode compatibility</li>
              <li>• Reduced motion support for animations</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing select dropdowns in your applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Do's</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, descriptive option labels</li>
                <li>• Provide search for lists with 7+ options</li>
                <li>• Use appropriate placeholder text</li>
                <li>• Group related options logically</li>
                <li>• Implement proper error states</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Don'ts</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Don't use dropdowns for binary choices</li>
                <li>• Avoid extremely long option lists without search</li>
                <li>• Don't use ambiguous or unclear labels</li>
                <li>• Avoid dropdowns when radio buttons are better</li>
                <li>• Don't hide critical information in dropdowns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}