import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { supabase } from '@/integrations/supabase/client';
import { Download, ExternalLink, Figma, FileDown, Palette, Type, Layout } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useDesignSystem } from '@/hooks/useDesignSystem';

export default function FigmaIntegrationShowcase() {
  const [isCreating, setIsCreating] = useState(false);
  const [figmaFileUrl, setFigmaFileUrl] = useState('');
  const { colorPalette, typography, brandName } = useDesignSystem();

  const createFigmaFile = async () => {
    setIsCreating(true);
    
    try {
      // Call edge function to create Figma file
      const { data, error } = await supabase.functions.invoke('create-figma-file', {
        body: {
          name: `${brandName} Design System`,
          colorPalette,
          typography,
          components: [
            'Button', 'Input', 'Card', 'Modal', 'Navigation',
            'Form', 'Table', 'Chart', 'Alert', 'Badge'
          ]
        }
      });

      if (error) throw error;
      
      setFigmaFileUrl(data.fileUrl);
      toast({
        title: "Figma file created!",
        description: "Your design system has been generated in Figma.",
      });
    } catch (error) {
      console.error('Error creating Figma file:', error);
      toast({
        title: "Error",
        description: "Failed to create Figma file. Please check your Figma API token.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const designTokensJson = {
    version: "1.0.0",
    name: brandName,
    colors: colorPalette,
    typography: typography,
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px"
    },
    borderRadius: {
      none: "0px",
      sm: "2px",
      md: "4px",
      lg: "8px",
      xl: "12px",
      "2xl": "16px",
      full: "9999px"
    }
  };

  const figmaPluginCode = `// Figma Plugin - Apply Design Tokens
const designTokens = ${JSON.stringify(designTokensJson, null, 2)};

// Apply color styles
Object.entries(designTokens.colors).forEach(([name, hex]) => {
  const rgb = hexToRgb(hex);
  const style = figma.createPaintStyle();
  style.name = \`\${designTokens.name}/\${name}\`;
  style.paints = [{
    type: 'SOLID',
    color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 }
  }];
});

// Apply text styles
Object.entries(designTokens.typography).forEach(([name, config]) => {
  const style = figma.createTextStyle();
  style.name = \`\${designTokens.name}/\${name}\`;
  style.fontName = { family: config.family, style: "Regular" };
  style.fontSize = parseInt(config.size) || 16;
});

function hexToRgb(hex) {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Figma Integration</h1>
            <p className="text-lg text-muted-foreground">
              Complete Figma workflow integration for design system management.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/community/plugin/figma-tokens" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Plugin
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Complete</Badge>
          <Badge variant="outline">Integration</Badge>
        </div>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create File</TabsTrigger>
          <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
          <TabsTrigger value="plugin">Plugin Code</TabsTrigger>
          <TabsTrigger value="sync">Auto Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Figma File Creation</CardTitle>
              <CardDescription>
                Generate a complete Figma file with your design system structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                  <Palette className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Color Styles</h3>
                    <p className="text-sm text-muted-foreground">Auto-generated from palette</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                  <Type className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Text Styles</h3>
                    <p className="text-sm text-muted-foreground">Typography system applied</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                  <Layout className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Components</h3>
                    <p className="text-sm text-muted-foreground">All UI components created</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={createFigmaFile}
                  disabled={isCreating}
                  className="w-full"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Figma File...
                    </>
                  ) : (
                    <>
                      <Figma className="h-4 w-4 mr-2" />
                      Create Design System File
                    </>
                  )}
                </Button>

                {figmaFileUrl && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">Figma File Created!</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">Your design system is ready in Figma</p>
                      </div>
                      <Button variant="outline" asChild>
                        <a href={figmaFileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Figma
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Design Tokens Export</CardTitle>
              <CardDescription>
                JSON format compatible with Figma plugins and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={JSON.stringify(designTokensJson, null, 2)}
                language="json"
                filename="design-tokens.json"
                showLineNumbers
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plugin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Figma Plugin Integration</CardTitle>
              <CardDescription>
                Complete plugin code for applying design tokens in Figma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={figmaPluginCode}
                language="javascript"
                filename="figma-plugin.js"
                showLineNumbers
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Synchronization</CardTitle>
              <CardDescription>
                Keep your design system in sync between code and Figma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Real-time Updates</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Changes to design tokens automatically sync to Figma files
                  </p>
                  <Badge variant="outline">Webhook Triggered</Badge>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Version Control</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Track changes and maintain design system versions
                  </p>
                  <Badge variant="outline">Git Integration</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Setup Required</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  To enable automatic sync, configure your Figma API token in the project settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}