import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Figma, Download, Palette, ExternalLink, BookOpen, Shield, Type, Building2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminRole } from "@/hooks/useAdminRole";
import { ColorPaletteControls, TypographyControls, BrandingControls } from "@/components/admin/AdminControls";
import { ColorPaletteAdmin } from "@/components/admin/ColorPaletteAdmin";
import { TypographyAdmin } from "@/components/admin/TypographyAdmin";
import { BrandingAdmin } from "@/components/admin/BrandingAdmin";
import { UserInvitations } from "@/components/admin/UserInvitations";
import { FigmaConfig } from "@/components/integrations/FigmaConfig";

const SettingsPage = () => {
  const { isAdmin, loading } = useAdminRole();

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

      <Tabs defaultValue={isAdmin ? "design-system" : "integrations"} className="space-y-6">
        <TabsList>
          {isAdmin && (
            <>
              <TabsTrigger value="design-system">
                <Shield className="h-4 w-4 mr-2" />
                Design System
              </TabsTrigger>
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="h-4 w-4 mr-2" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="branding">
                <Building2 className="h-4 w-4 mr-2" />
                Branding
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="export">Import/Export</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {isAdmin && (
          <>
            <TabsContent value="design-system" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Design System Administration
                    <Badge variant="destructive">Admin Only</Badge>
                  </CardTitle>
                  <CardDescription>
                    Manage your design system versions, rollback changes, and configure advanced settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">1</div>
                      <div className="text-sm text-muted-foreground">Active Version</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Saved Versions</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">127</div>
                      <div className="text-sm text-muted-foreground">Components</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Quick Actions</h5>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm">Create Version</Button>
                      <Button size="sm" variant="outline">Export System</Button>
                      <Button size="sm" variant="outline">Import Backup</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <UserInvitations />
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Palette className="h-6 w-6" />
                    VybeUI Color Palette Administration
                    <Badge variant="destructive">Admin Only</Badge>
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Customize your design system colors and create color palette versions.
                  </p>
                </div>
                <ColorPaletteAdmin isOpen={true} onOpenChange={() => {}} />
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Type className="h-6 w-6" />
                    VybeUI Typography Administration
                    <Badge variant="destructive">Admin Only</Badge>
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Configure fonts, upload custom fonts, and manage typography scales.
                  </p>
                </div>
                <TypographyAdmin isOpen={true} onOpenChange={() => {}} />
              </div>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Building2 className="h-6 w-6" />
                    VybeUI Brand Administration
                    <Badge variant="destructive">Admin Only</Badge>
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Upload your logo, set brand name, and customize brand assets.
                  </p>
                </div>
                <BrandingAdmin isOpen={true} onOpenChange={() => {}} />
              </div>
            </TabsContent>
          </>
        )}

        <TabsContent value="integrations" className="space-y-4">
          <FigmaConfig />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Storybook Integration
                <Badge variant="outline">Not Configured</Badge>
              </CardTitle>
              <CardDescription>
                Generate and maintain Storybook stories for all your components automatically. 
                Perfect for component documentation and testing in isolation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Features (Available)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Automatic story generation for all components</li>
                  <li>• Component props documentation</li>
                  <li>• Interactive controls and knobs</li>
                  <li>• Design token integration</li>
                  <li>• Export stories for existing Storybook setups</li>
                </ul>
              </div>
              <Button disabled className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Configure Storybook Integration
                <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
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
                Import & Export
              </CardTitle>
              <CardDescription>
                Simple tools for importing and exporting your design system data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Export Design System
                  <span className="text-xs text-muted-foreground">Download as JSON</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Import Design System
                  <span className="text-xs text-muted-foreground">Upload JSON file</span>
                </Button>
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
      </Tabs>
    </div>
  );
};

export default SettingsPage;