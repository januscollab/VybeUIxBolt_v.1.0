import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode, Settings, Moon, Sun, Bell, Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function SwitchToggleShowcase() {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [settings, setSettings] = useState({
    bluetooth: true,
    wifi: false,
    location: true,
    backup: false,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<div className="flex items-center space-x-2">
  <Switch 
    id="airplane-mode" 
    checked={checked}
    onCheckedChange={setChecked}
  />
  <Label htmlFor="airplane-mode">Airplane mode</Label>
</div>`,
    withIcon: `<div className="flex items-center space-x-2">
  <Switch 
    id="dark-mode" 
    checked={darkMode}
    onCheckedChange={setDarkMode}
  />
  <Label htmlFor="dark-mode" className="flex items-center gap-2">
    {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    Dark mode
  </Label>
</div>`,
    group: `const [settings, setSettings] = useState({
  bluetooth: true,
  wifi: false,
  location: true,
});

{Object.entries(settings).map(([key, value]) => (
  <div key={key} className="flex items-center justify-between">
    <Label htmlFor={key} className="capitalize">{key}</Label>
    <Switch 
      id={key}
      checked={value}
      onCheckedChange={(checked) => 
        setSettings(prev => ({ ...prev, [key]: checked }))
      }
    />
  </div>
))}`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Switch Toggle</h1>
            <p className="text-lg text-muted-foreground">
              Binary toggle control for enabling/disabling features with smooth animations and clear state indication.
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
          <Badge variant="outline">Supabase Ready</Badge>
        </div>
      </div>

      {/* Basic Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Switch</CardTitle>
          <CardDescription>
            Standard switch implementation with smooth toggle animation and accessibility support.
          </CardDescription>
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
                <Switch id="notifications-basic" defaultChecked />
                <Label htmlFor="notifications-basic">Push notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-switch" disabled />
                <Label htmlFor="disabled-switch" className="text-muted-foreground">
                  Disabled option
                </Label>
              </div>
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

      {/* Switch with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Switch with Icons & Visual Feedback</CardTitle>
          <CardDescription>
            Enhanced switches with icons and visual indicators that change based on state.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  Dark mode
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notifications" 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <Label htmlFor="notifications" className="flex items-center gap-2">
                  <Bell className={`h-4 w-4 ${notifications ? 'text-primary' : 'text-muted-foreground'}`} />
                  Push notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="wifi-switch" defaultChecked />
                <Label htmlFor="wifi-switch" className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  Wi-Fi connection
                </Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Icon Switch Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withIcon)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withIcon}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Settings Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Settings Panel</CardTitle>
          <CardDescription>
            Multiple switches arranged in a settings-style layout with organized grouping.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5" />
                <h4 className="font-medium">System Preferences</h4>
              </div>
              <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="capitalize font-medium">
                      {key === 'bluetooth' && 'Bluetooth'}
                      {key === 'wifi' && 'Wi-Fi'}
                      {key === 'location' && 'Location Services'}
                      {key === 'backup' && 'Auto Backup'}
                    </Label>
                    <Switch 
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Settings Group Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.group)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.group}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Switch components integrated with Supabase for real-time settings persistence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Boolean column mapping for switch states</li>
              <li>• User preferences table integration</li>
              <li>• Real-time sync across devices</li>
              <li>• Optimistic updates for instant feedback</li>
              <li>• Feature flag management support</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Common Patterns</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// User settings</code>
              <code className="block">dark_mode: boolean</code>
              <code className="block">notifications_enabled: boolean</code>
              <code className="block">// Feature toggles</code>
              <code className="block">beta_features: boolean</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible switch toggle components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA role="switch" with proper states</li>
                <li>• Keyboard navigation (Space/Enter to toggle)</li>
                <li>• Clear focus indicators</li>
                <li>• Screen reader state announcements</li>
                <li>• High contrast support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use for binary on/off settings</li>
                <li>• Provide immediate visual feedback</li>
                <li>• Keep labels clear and concise</li>
                <li>• Group related switches logically</li>
                <li>• Consider impact of default states</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}