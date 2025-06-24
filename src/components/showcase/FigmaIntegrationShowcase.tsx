
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Figma, Download, Upload, RefreshCw, ExternalLink, Info } from 'lucide-react';

export function FigmaIntegrationShowcase() {
  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Figma className="h-5 w-5" />
            Figma Integration
          </CardTitle>
          <CardDescription>
            Connect your design system to Figma for seamless design-to-code workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This is a demo of Figma integration features. In a real implementation, this would connect to the Figma API.
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Figma className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Figma Connection</p>
                <p className="text-sm text-muted-foreground">Demo mode - not connected</p>
              </div>
            </div>
            <Badge variant="secondary">Demo</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Setup</CardTitle>
          <CardDescription>
            Configure your Figma integration settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="figma-token">Figma Personal Access Token</Label>
            <Input
              id="figma-token"
              type="password"
              placeholder="Enter your Figma token..."
              disabled
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="figma-file">Figma File URL</Label>
            <Input
              id="figma-file"
              placeholder="https://www.figma.com/file/..."
              disabled
            />
          </div>
          
          <Button disabled className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Connect to Figma (Demo)
          </Button>
        </CardContent>
      </Card>

      {/* Sync Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Import from Figma
            </CardTitle>
            <CardDescription>
              Import design tokens and components from Figma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Color Styles</span>
                <Badge variant="outline">24 found</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Text Styles</span>
                <Badge variant="outline">12 found</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Components</span>
                <Badge variant="outline">8 found</Badge>
              </div>
            </div>
            
            <Button disabled className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Import Selected (Demo)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Export to Figma
            </CardTitle>
            <CardDescription>
              Export your design tokens back to Figma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Color Palette</span>
                <Badge variant="outline">Ready</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Typography Scale</span>
                <Badge variant="outline">Ready</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Component Library</span>
                <Badge variant="outline">Ready</Badge>
              </div>
            </div>
            
            <Button disabled className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Export to Figma (Demo)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest sync activity between your design system and Figma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded">
              <div className="p-1 bg-muted rounded">
                <Download className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Demo: Color tokens imported</p>
                <p className="text-xs text-muted-foreground">Would sync 24 color styles from Figma</p>
              </div>
              <Button variant="ghost" size="sm" disabled>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded">
              <div className="p-1 bg-muted rounded">
                <Upload className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Demo: Typography updated</p>
                <p className="text-xs text-muted-foreground">Would export text styles to Figma</p>
              </div>
              <Button variant="ghost" size="sm" disabled>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
