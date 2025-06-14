import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode, Globe, User, Palette, Bell, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SelectShowcase() {
  const [framework, setFramework] = useState("");
  const [timezone, setTimezone] = useState("");
  const [theme, setTheme] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "next", label: "Next.js" },
    { value: "nuxt", label: "Nuxt.js" },
  ];

  const timezones = [
    { value: "utc", label: "UTC (Coordinated Universal Time)" },
    { value: "est", label: "EST (Eastern Standard Time)" },
    { value: "pst", label: "PST (Pacific Standard Time)" },
    { value: "gmt", label: "GMT (Greenwich Mean Time)" },
    { value: "cet", label: "CET (Central European Time)" },
    { value: "jst", label: "JST (Japan Standard Time)" },
  ];

  const codeExamples = {
    basic: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
  </SelectContent>
</Select>`,
    controlled: `const [value, setValue] = useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`,
    withLabel: `<div className="space-y-2">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue.js</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
    </SelectContent>
  </Select>
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Select</h1>
            <p className="text-lg text-muted-foreground">
              Dropdown selection component with searchable options and custom styling.
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
          <Badge variant="outline">Form</Badge>
          <Badge variant="outline">Dropdown</Badge>
        </div>
      </div>

      {/* Basic Select */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Select</CardTitle>
          <CardDescription>
            Simple select dropdown with placeholder and basic options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-sm mx-auto space-y-4">
              
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">🍎 Apple</SelectItem>
                  <SelectItem value="banana">🍌 Banana</SelectItem>
                  <SelectItem value="cherry">🍒 Cherry</SelectItem>
                  <SelectItem value="grape">🍇 Grape</SelectItem>
                  <SelectItem value="orange">🍊 Orange</SelectItem>
                  <SelectItem value="strawberry">🍓 Strawberry</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Low Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      Medium Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      High Priority
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

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

      {/* Controlled Select */}
      <Card>
        <CardHeader>
          <CardTitle>Controlled Select</CardTitle>
          <CardDescription>
            Select component with controlled state and change handlers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-sm mx-auto space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="framework-select">Preferred Framework</Label>
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger id="framework-select">
                    <SelectValue placeholder="Choose a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((fw) => (
                      <SelectItem key={fw.value} value={fw.value}>
                        {fw.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {framework && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {frameworks.find(f => f.value === framework)?.label}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone-select">Time Zone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone-select">
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Controlled Select Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.controlled)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.controlled}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Select with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Select with Icons</CardTitle>
          <CardDescription>
            Enhanced select options with icons and custom content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-sm mx-auto space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="theme-select">Theme Preference</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme-select">
                    <SelectValue placeholder="Choose a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white border border-gray-300" />
                        Light Theme
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-900" />
                        Dark Theme
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-white to-gray-900 border border-gray-300" />
                        System Theme
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-select">Service Type</Label>
                <Select>
                  <SelectTrigger id="service-select">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">Web Development</div>
                          <div className="text-xs text-muted-foreground">Full-stack web applications</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="mobile">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="font-medium">Mobile Development</div>
                          <div className="text-xs text-muted-foreground">iOS and Android apps</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="design">
                      <div className="flex items-center gap-3">
                        <Palette className="h-4 w-4 text-purple-500" />
                        <div>
                          <div className="font-medium">UI/UX Design</div>
                          <div className="text-xs text-muted-foreground">User interface design</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Form Integration</CardTitle>
          <CardDescription>
            Select components integrated in a complete form layout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-type">Notification Type</Label>
                  <Select>
                    <SelectTrigger id="notification-type">
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          All Notifications
                        </div>
                      </SelectItem>
                      <SelectItem value="important">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Important Only
                        </div>
                      </SelectItem>
                      <SelectItem value="none">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          None
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="How often?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Delivery Method</Label>
                  <Select>
                    <SelectTrigger id="method">
                      <SelectValue placeholder="How should we notify you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">📧 Email</SelectItem>
                      <SelectItem value="sms">📱 SMS</SelectItem>
                      <SelectItem value="push">🔔 Push Notification</SelectItem>
                      <SelectItem value="slack">💬 Slack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">With Label Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withLabel)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withLabel}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for select components and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation (↑↓ arrows)</li>
                <li>• Search and filter options</li>
                <li>• Custom option content</li>
                <li>• Controlled and uncontrolled modes</li>
                <li>• Accessible ARIA attributes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, descriptive labels</li>
                <li>• Provide helpful placeholder text</li>
                <li>• Group related options</li>
                <li>• Handle disabled states gracefully</li>
                <li>• Consider mobile touch targets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}