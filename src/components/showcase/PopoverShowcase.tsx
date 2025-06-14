import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Copy, Figma, FileCode, Settings, Calendar as CalendarIcon, User, HelpCircle, MessageSquare, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function PopoverShowcase() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="width">Width</Label>
        <Input id="width" defaultValue="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
    form: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Profile Settings</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <form className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium">Profile Information</h4>
        <p className="text-sm text-muted-foreground">
          Update your profile details.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  </PopoverContent>
</Popover>`,
    datePicker: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Popover</h1>
            <p className="text-lg text-muted-foreground">
              Displays rich content in a portal, triggered by a button click or hover.
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
          <Badge variant="outline">Overlay</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Basic Popover */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Popover</CardTitle>
          <CardDescription>
            Simple popover with content that appears when triggered.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="width">Width</Label>
                      <Input id="width" defaultValue="100%" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" defaultValue="25px" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Quick Settings</h4>
                    </div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Feedback
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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

      {/* Form Popover */}
      <Card>
        <CardHeader>
          <CardTitle>Form Popover</CardTitle>
          <CardDescription>
            Popover containing form elements for quick data entry.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Profile Settings</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <form className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Profile Information</h4>
                      <p className="text-sm text-muted-foreground">
                        Update your profile details.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell us about yourself" />
                    </div>
                    <Button type="submit">Save changes</Button>
                  </form>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Add Comment</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Add a comment</h4>
                      <p className="text-sm text-muted-foreground">
                        Share your thoughts about this item.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Textarea placeholder="Type your comment here..." />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Post comment</Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Form Popover Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.form)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.form}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Advanced Popovers */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Popovers</CardTitle>
          <CardDescription>
            Complex popovers with calendars, command menus, and rich interactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
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
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue);
                              setOpen(false);
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
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Date Picker Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.datePicker)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.datePicker}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible popover components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA attributes for screen reader support</li>
                <li>• Keyboard navigation (Tab, Escape, Enter)</li>
                <li>• Focus management and trap inside popover</li>
                <li>• Automatic positioning and collision detection</li>
                <li>• Click outside to close behavior</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use for interactive content and forms</li>
                <li>• Keep content organized and scannable</li>
                <li>• Provide clear close mechanisms</li>
                <li>• Consider mobile touch interactions</li>
                <li>• Use appropriate sizing for content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}