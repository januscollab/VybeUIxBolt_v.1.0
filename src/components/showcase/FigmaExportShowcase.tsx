import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CodeModal } from '@/components/ui/code-modal';
import { Download, ExternalLink, Figma, FileDown, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function FigmaExportShowcase() {
  const [exportData, setExportData] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const designTokens = {
        colors: {
          primary: '#3b82f6',
          secondary: '#6b7280',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        },
        typography: {
          fontFamily: {
            primary: 'Inter',
            secondary: 'JetBrains Mono'
          },
          fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px'
          }
        },
        spacing: {
          xs: '4px',
          sm: '8px',
          md: '16px',
          lg: '24px',
          xl: '32px'
        }
      };
      
      setExportData(JSON.stringify(designTokens, null, 2));
      setIsExporting(false);
      
      toast({
        title: "Export Complete",
        description: "Design tokens have been exported successfully.",
      });
    }, 2000);
  };

  const downloadJSON = () => {
    if (!exportData) return;
    
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vybeui-design-tokens.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Design tokens JSON file has been downloaded.",
    });
  };

  const copyToClipboard = () => {
    if (!exportData) return;
    
    navigator.clipboard.writeText(exportData);
    toast({
      title: "Copied to clipboard",
      description: "Design tokens have been copied to your clipboard.",
    });
  };

  const figmaPluginCode = `// VybeUI Figma Plugin Integration
const designTokens = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981'
  },
  typography: {
    fontFamily: {
      primary: 'Inter',
      secondary: 'JetBrains Mono'
    }
  }
};

// Apply colors to Figma styles
Object.entries(designTokens.colors).forEach(([name, hex]) => {
  const rgb = hexToRgb(hex);
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [{
    type: 'SOLID',
    color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 }
  }];
});`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Figma Export</h1>
            <p className="text-lg text-muted-foreground">
              Export design system data and structure for Figma integration.
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
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Export Tool</Badge>
        </div>
      </div>

      {/* Export Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Export Design Tokens</CardTitle>
          <CardDescription>Generate JSON data compatible with Figma plugins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button 
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export Tokens
                </>
              )}
            </Button>
            
            {exportData && (
              <>
                <Button variant="outline" onClick={downloadJSON}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </>
            )}
          </div>

          {exportData && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" />
                Export completed successfully
              </div>
              
              <div className="space-y-2">
                <Label>Exported Design Tokens</Label>
                <Textarea
                  value={exportData}
                  readOnly
                  className="font-mono text-xs"
                  rows={10}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Code Integration</CardTitle>
          <CardDescription>Example code for Figma plugin integration</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeModal
            code={figmaPluginCode}
            title="Figma Plugin Integration"
          >
            <Button variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              View Plugin Code
            </Button>
          </CodeModal>
        </CardContent>
      </Card>
    </div>
  );
}