import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Check, ChevronDown, X, Search, User, Users, Building, 
  Globe, Calendar, Clock, Star, Filter, Plus, Minus 
} from "lucide-react";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
  description?: string;
  avatar?: string;
  badge?: string;
  category?: string;
}

const countries: Option[] = [
  { value: "us", label: "United States", description: "North America", badge: "🇺🇸" },
  { value: "uk", label: "United Kingdom", description: "Europe", badge: "🇬🇧" },
  { value: "ca", label: "Canada", description: "North America", badge: "🇨🇦" },
  { value: "de", label: "Germany", description: "Europe", badge: "🇩🇪" },
  { value: "fr", label: "France", description: "Europe", badge: "🇫🇷" },
  { value: "jp", label: "Japan", description: "Asia", badge: "🇯🇵" },
];

const users: Option[] = [
  { value: "john", label: "John Doe", description: "john@example.com", avatar: "/placeholder.svg", category: "Admin" },
  { value: "jane", label: "Jane Smith", description: "jane@example.com", avatar: "/placeholder.svg", category: "Editor" },
  { value: "bob", label: "Bob Johnson", description: "bob@example.com", avatar: "/placeholder.svg", category: "Viewer" },
  { value: "alice", label: "Alice Brown", description: "alice@example.com", avatar: "/placeholder.svg", category: "Admin" },
];

const skills = [
  "React", "TypeScript", "Node.js", "Python", "Java", "Go", "Rust", "Docker", 
  "Kubernetes", "AWS", "Azure", "GCP", "MongoDB", "PostgreSQL", "Redis"
];

export default function AdvancedSelectShowcase() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchableOpen, setSearchableOpen] = useState(false);
  const [multiSelectOpen, setMultiSelectOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Advanced Select Components</h1>
          <Badge variant="default">Enhanced</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Advanced selection components with search, multi-select, custom rendering, and complex data handling.
        </p>
      </div>

      {/* Basic Enhanced Selects */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Basic Selects</CardTitle>
          <CardDescription>Standard selects with improved visual design and functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country">Country Selection</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country">
                    {selectedCountry && (
                      <div className="flex items-center gap-2">
                        <span>{countries.find(c => c.value === selectedCountry)?.badge}</span>
                        <span>{countries.find(c => c.value === selectedCountry)?.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <div className="flex items-center gap-2">
                        <span>{country.badge}</span>
                        <div>
                          <div>{country.label}</div>
                          <div className="text-xs text-muted-foreground">{country.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Low Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Medium Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>High Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-700 animate-pulse"></div>
                      <span>Urgent</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Searchable Select */}
      <Card>
        <CardHeader>
          <CardTitle>Searchable Select</CardTitle>
          <CardDescription>Select with search functionality using Command component</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Searchable Country Selection</Label>
            <Popover open={searchableOpen} onOpenChange={setSearchableOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={searchableOpen}
                  className="w-full justify-between"
                >
                  {selectedCountry
                    ? countries.find((country) => country.value === selectedCountry)?.label
                    : "Search countries..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search countries..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          key={country.value}
                          value={country.value}
                          onSelect={(currentValue) => {
                            setSelectedCountry(currentValue === selectedCountry ? "" : currentValue);
                            setSearchableOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedCountry === country.value ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <div className="flex items-center gap-2">
                            <span>{country.badge}</span>
                            <div>
                              <div>{country.label}</div>
                              <div className="text-xs text-muted-foreground">{country.description}</div>
                            </div>
                          </div>
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

      {/* Multi-Select */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Select Components</CardTitle>
          <CardDescription>Select multiple options with various display styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Team Members</Label>
              <Popover open={multiSelectOpen} onOpenChange={setMultiSelectOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={multiSelectOpen}
                    className="w-full justify-between min-h-10"
                  >
                    <div className="flex flex-wrap gap-1">
                      {selectedUsers.length === 0 ? (
                        <span className="text-muted-foreground">Select team members...</span>
                      ) : (
                        selectedUsers.map((userId) => {
                          const user = users.find(u => u.value === userId);
                          return user ? (
                            <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-xs">
                                  {user.label.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.label}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleUser(userId);
                                }}
                              />
                            </Badge>
                          ) : null;
                        })
                      )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search team members..." />
                    <CommandList>
                      <CommandEmpty>No member found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            key={user.value}
                            value={user.value}
                            onSelect={() => toggleUser(user.value)}
                          >
                            <Checkbox
                              checked={selectedUsers.includes(user.value)}
                              className="mr-2"
                            />
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-xs">
                                {user.label.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span>{user.label}</span>
                                <Badge variant="outline" className="text-xs">
                                  {user.category}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">{user.description}</div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Skills & Technologies</Label>
              <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={skillsOpen}
                    className="w-full justify-between min-h-10"
                  >
                    <div className="flex flex-wrap gap-1">
                      {selectedSkills.length === 0 ? (
                        <span className="text-muted-foreground">Select skills...</span>
                      ) : selectedSkills.length <= 3 ? (
                        selectedSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSkill(skill);
                              }}
                            />
                          </Badge>
                        ))
                      ) : (
                        <>
                          {selectedSkills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSkill(skill);
                                }}
                              />
                            </Badge>
                          ))}
                          <Badge variant="outline">
                            +{selectedSkills.length - 2} more
                          </Badge>
                        </>
                      )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search skills..." />
                    <CommandList>
                      <CommandEmpty>No skill found.</CommandEmpty>
                      <CommandGroup>
                        {skills.map((skill) => (
                          <CommandItem
                            key={skill}
                            value={skill}
                            onSelect={() => toggleSkill(skill)}
                          >
                            <Checkbox
                              checked={selectedSkills.includes(skill)}
                              className="mr-2"
                            />
                            {skill}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Styled Selects */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styled Selects</CardTitle>
          <CardDescription>Specialized selects for specific use cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Date Range Preset</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Today</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="week">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>This Week</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="month">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>This Month</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="quarter">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>This Quarter</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="year">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>This Year</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Organization Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-500" />
                      <div>
                        <div>Startup</div>
                        <div className="text-xs text-muted-foreground">1-50 employees</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="enterprise">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-500" />
                      <div>
                        <div>Enterprise</div>
                        <div className="text-xs text-muted-foreground">1000+ employees</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="government">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-green-500" />
                      <div>
                        <div>Government</div>
                        <div className="text-xs text-muted-foreground">Public sector</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter-style Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle>Filter-Style Selection</CardTitle>
          <CardDescription>Chip-based selection interface for filtering</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Filter by Categories</Label>
              <div className="flex flex-wrap gap-2">
                {["Frontend", "Backend", "DevOps", "Design", "Mobile", "Data"].map((category) => (
                  <Badge
                    key={category}
                    variant={selectedSkills.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(category)}
                  >
                    {category}
                    {selectedSkills.includes(category) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <div className="flex flex-wrap gap-2">
                {["Beginner", "Intermediate", "Advanced", "Expert"].map((level, index) => (
                  <Badge
                    key={level}
                    variant="outline"
                    className="cursor-pointer flex items-center gap-1"
                  >
                    <div className="flex">
                      {Array.from({ length: index + 1 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      {Array.from({ length: 4 - index - 1 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-muted-foreground" />
                      ))}
                    </div>
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Implementation examples for advanced select components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Searchable Select with Command</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox">
      {value || "Select option..."}
      <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-full p-0">
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No option found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={setValue}
            >
              <Check className={cn(
                "mr-2 h-4 w-4",
                value === option.value ? "opacity-100" : "opacity-0"
              )} />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Multi-Select with Badges</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`const MultiSelect = ({ options, value, onChange }) => {
  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="flex flex-wrap gap-1">
      {value.map(val => (
        <Badge key={val} variant="secondary">
          {options.find(o => o.value === val)?.label}
          <X className="h-3 w-3 ml-1 cursor-pointer" 
             onClick={() => toggleOption(val)} />
        </Badge>
      ))}
    </div>
  );
};`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}