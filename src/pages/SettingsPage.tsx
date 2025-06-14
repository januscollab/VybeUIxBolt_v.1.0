import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Figma, Download, Palette, Database, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure your design system preferences and integrations.
        </p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="export">Export/Import</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Figma className="h-5 w-5" />
                Figma Integration
                <Badge variant="outline">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>
                Automatically sync your design system with Figma. Create component libraries, 
                export design tokens, and maintain consistency across design and development.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Features (Planned)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Automatic Figma file creation with design system structure</li>
                  <li>• Component placeholder generation</li>
                  <li>• Design token export in Figma-compatible format</li>
                  <li>• Shareable URL collection and synchronization</li>
                  <li>• Two-way sync between DLS and Figma</li>
                </ul>
              </div>
              <Button disabled className="w-full">
                <Figma className="h-4 w-4 mr-2" />
                Connect Figma Account
                <Badge variant="secondary" className="ml-2">Sprint 6</Badge>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>
                Connect your design system to GitHub for version control and collaboration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href="https://github.com/januscollab/janus-design-system" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export & Import Tools
              </CardTitle>
              <CardDescription>
                Advanced tools for exporting your design system in various formats and importing external data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/analytics">
                  <Download className="h-4 w-4 mr-2" />
                  Access Export/Import Tools
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supported Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "JSON", desc: "Complete data export" },
                  { name: "CSS", desc: "CSS custom properties" },
                  { name: "Figma Tokens", desc: "Design tokens plugin" },
                  { name: "Storybook", desc: "Component stories" }
                ].map((format) => (
                  <div key={format.name} className="text-center p-4 border rounded-lg">
                    <div className="font-semibold">{format.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{format.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize the appearance of your design system interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Design Tokens</h4>
                <p className="text-sm text-muted-foreground">
                  All theming is handled through design tokens defined in your CSS variables.
                  Modify <code className="bg-muted px-1 py-0.5 rounded text-xs">index.css</code> and 
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">tailwind.config.ts</code> to customize colors, fonts, and spacing.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-semibold mb-2">Current Theme Variables</h5>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>--primary: 16 100% 50%</div>
                  <div>--secondary: 210 40% 96.1%</div>
                  <div>--accent: 16 100% 50%</div>
                  <div>--background: 0 0% 100%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
              <CardDescription>
                Manage your Supabase database and view system information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-muted-foreground">Tables</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">RLS Policies</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Functions</div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-semibold mb-2">Database Tables</h5>
                <ul className="text-sm space-y-1">
                  <li>• <code>categories</code> - Component categories</li>
                  <li>• <code>components</code> - Component definitions</li>
                  <li>• <code>component_variants</code> - Component variations</li>
                  <li>• <code>documentation</code> - Component documentation</li>
                  <li>• <code>design_tokens</code> - Design token definitions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;