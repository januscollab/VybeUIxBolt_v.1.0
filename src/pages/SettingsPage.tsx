
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Figma, Download, Palette, ExternalLink, BookOpen, Type, Building2, Upload, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { LocalColorPaletteAdmin } from "@/components/admin/LocalColorPaletteAdmin";
import { LocalTypographyAdmin } from "@/components/admin/LocalTypographyAdmin";
import { LocalBrandingAdmin } from "@/components/admin/LocalBrandingAdmin";
import { LocalExportImport } from "@/components/admin/LocalExportImport";
import { SmartSiteScanner } from "@/components/admin/SmartSiteScanner";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure your design system preferences and customize your brand.
        </p>
      </div>

      <Tabs defaultValue="design-system" className="space-y-6">
        <TabsList>
          <TabsTrigger value="design-system">
            <Palette className="h-4 w-4 mr-2" />
            Design System
          </TabsTrigger>
          <TabsTrigger value="scanner">
            <Globe className="h-4 w-4 mr-2" />
            Smart Scanner
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
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="export">Import/Export</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="design-system" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Design System Overview</h2>
            <p className="text-muted-foreground mb-6">
              This is a frontend-only design system that stores all settings in your browser's local storage. 
              All customizations are saved locally and can be exported/imported as needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Colors
                </CardTitle>
                <CardDescription>
                  Customize your color palette
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="#colors">Manage Colors</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Typography
                </CardTitle>
                <CardDescription>
                  Configure fonts and typography
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="#typography">Manage Fonts</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Branding
                </CardTitle>
                <CardDescription>
                  Set your brand identity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="#branding">Manage Brand</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scanner" className="space-y-4">
          <SmartSiteScanner />
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <LocalColorPaletteAdmin />
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <LocalTypographyAdmin />
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <LocalBrandingAdmin />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Figma className="h-5 w-5" />
                Figma Integration
                <Badge variant="outline">Not Available</Badge>
              </CardTitle>
              <CardDescription>
                Connect your design system to Figma for seamless component synchronization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Features (Requires Backend)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Automatic component export from Figma</li>
                  <li>• Design token synchronization</li>
                  <li>• Component documentation generation</li>
                  <li>• Real-time design system updates</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                Figma integration requires a backend service to securely store API tokens and handle synchronization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Storybook Integration
                <Badge variant="outline">Not Available</Badge>
              </CardTitle>
              <CardDescription>
                Generate and maintain Storybook stories for all your components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Storybook integration requires backend processing to generate stories and documentation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>
                Connect your design system to GitHub for version control.
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
          <LocalExportImport />
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
                  Colors and fonts are automatically applied when you update them in the design system.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-semibold mb-2">How it works</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Colors are converted to HSL and applied as CSS custom properties</p>
                  <p>• Google Fonts are dynamically loaded when typography changes</p>
                  <p>• All changes are saved to localStorage automatically</p>
                  <p>• Settings persist across browser sessions</p>
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
