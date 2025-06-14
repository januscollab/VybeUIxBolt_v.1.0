import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode, Bell, Wifi, Volume2, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SwitchToggleShowcase() {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [sound, setSound] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExample = `import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const [enabled, setEnabled] = useState(false);

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Switch & Toggle</h1>
            <p className="text-lg text-muted-foreground">
              Binary controls for enabling and disabling options or features.
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
          <Badge variant="outline">Binary State</Badge>
        </div>
      </div>

      {/* Basic Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Switch</CardTitle>
          <CardDescription>Standard switch component with on/off states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="basic-switch" 
                  checked={basicSwitch} 
                  onCheckedChange={setBasicSwitch}
                />
                <Label htmlFor="basic-switch">Enable feature</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="disabled-switch" disabled />
                <Label htmlFor="disabled-switch" className="text-muted-foreground">
                  Disabled switch
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="disabled-on" disabled checked />
                <Label htmlFor="disabled-on" className="text-muted-foreground">
                  Disabled (on)
                </Label>
              </div>
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

      {/* Settings Panel Example */}
      <Card>
        <CardHeader>
          <CardTitle>Settings Panel</CardTitle>
          <CardDescription>Common use case for switches in settings interfaces</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="notifications" className="text-base font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about important updates
                    </p>
                  </div>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {darkMode ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
                  <div>
                    <Label htmlFor="dark-mode" className="text-base font-medium">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="wifi" className="text-base font-medium">
                      Wi-Fi
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Connect to available networks
                    </p>
                  </div>
                </div>
                <Switch 
                  id="wifi" 
                  checked={wifi} 
                  onCheckedChange={setWifi}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="sound" className="text-base font-medium">
                      Sound Effects
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound effects for interactions
                    </p>
                  </div>
                </div>
                <Switch 
                  id="sound" 
                  checked={sound} 
                  onCheckedChange={setSound}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for switch implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use for binary on/off states</li>
                <li>• Provide immediate feedback</li>
                <li>• Use clear, descriptive labels</li>
                <li>• Consider the default state carefully</li>
                <li>• Group related switches logically</li>
                <li>• Include helper text for complex options</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">When to Use</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Settings and preferences</li>
                <li>• Feature toggles</li>
                <li>• Mode switching (dark/light)</li>
                <li>• Permission controls</li>
                <li>• Notification settings</li>
                <li>• Instant state changes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}