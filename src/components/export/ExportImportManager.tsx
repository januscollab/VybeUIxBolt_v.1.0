
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Upload, FileJson, Palette, Type, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";
import { toast } from "@/hooks/use-toast";

export function ExportImportManager() {
  const [exportData, setExportData] = useState("");
  const [importData, setImportData] = useState("");
  const [copied, setCopied] = useState(false);
  
  const {
    colorPalette,
    typography,
    brandName,
    logoUrl,
    exportSettings,
    importSettings
  } = useLocalDesignSystem();

  const handleExport = () => {
    const data = exportSettings();
    setExportData(JSON.stringify(data, null, 2));
    toast({
      title: "Settings Exported",
      description: "Your design system settings have been exported.",
    });
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importData);
      importSettings(parsed);
      toast({
        title: "Settings Imported",
        description: "Your design system settings have been imported successfully.",
      });
      setImportData("");
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid JSON format. Please check your data.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(exportData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Export data copied to clipboard.",
    });
  };

  const downloadJson = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vybeui-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Export & Import Design System Settings
          </CardTitle>
          <CardDescription>
            Export your current design system configuration or import settings from a backup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="export" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </TabsTrigger>
              <TabsTrigger value="import" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import
              </TabsTrigger>
            </TabsList>

            <TabsContent value="export" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current Brand</Label>
                    <div className="text-sm text-muted-foreground">{brandName || 'VybeUI'}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Settings Include</Label>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Palette className="h-3 w-3 mr-1" />
                        Colors
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Type className="h-3 w-3 mr-1" />
                        Typography
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleExport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Export Data
                </Button>
                
                {exportData && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Export Data</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="flex items-center gap-2"
                        >
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadJson}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={exportData}
                      readOnly
                      className="h-48 font-mono text-xs"
                      placeholder="Export data will appear here..."
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="import" className="space-y-4">
              <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription>
                  Importing will overwrite your current design system settings. Make sure to export your current settings first if you want to keep a backup.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="import-data">Import Data (JSON)</Label>
                <Textarea
                  id="import-data"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  className="h-48 font-mono text-xs"
                  placeholder="Paste your exported settings JSON here..."
                />
              </div>
              
              <Button 
                onClick={handleImport} 
                disabled={!importData.trim()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Settings
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
