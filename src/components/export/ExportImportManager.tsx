import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, FileJson, Code, Palette, AlertCircle, CheckCircle } from "lucide-react";
import { useComponents, useCategories } from "@/hooks/useDesignSystem";
import { useToast } from "@/hooks/use-toast";

interface ExportOptions {
  format: 'json' | 'css' | 'figma-tokens' | 'storybook';
  includeCategories: boolean;
  includeComponents: boolean;
  includeTokens: boolean;
  includeDocumentation: boolean;
}

export function ExportImportManager() {
  const { data: components } = useComponents();
  const { data: categories } = useCategories();
  const { toast } = useToast();
  
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'json',
    includeCategories: true,
    includeComponents: true,
    includeTokens: true,
    includeDocumentation: true
  });
  
  const [importData, setImportData] = useState("");
  const [validationResults, setValidationResults] = useState<{
    valid: boolean;
    errors: string[];
    warnings: string[];
    stats?: {
      categories: number;
      components: number;
      tokens: number;
    };
  } | null>(null);

  const generateExportData = () => {
    const exportData: any = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      metadata: {
        totalCategories: categories?.length || 0,
        totalComponents: components?.length || 0,
      }
    };

    if (exportOptions.includeCategories) {
      exportData.categories = categories?.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        sortOrder: cat.sort_order
      }));
    }

    if (exportOptions.includeComponents) {
      exportData.components = components?.map(comp => ({
        id: comp.id,
        name: comp.name,
        slug: comp.slug,
        description: comp.description,
        categoryId: comp.category_id,
        status: comp.status,
        isExperimental: comp.is_experimental,
        figmaUrl: comp.figma_url,
        sortOrder: comp.sort_order
      }));
    }

    // Mock design tokens for export
    if (exportOptions.includeTokens) {
      exportData.designTokens = {
        colors: {
          primary: "hsl(16 100% 50%)",
          secondary: "hsl(210 40% 96.1%)",
          accent: "hsl(16 100% 50%)",
          background: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)"
        },
        typography: {
          fontFamily: "Inter",
          fontSize: {
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem"
          }
        },
        spacing: {
          xs: "0.25rem",
          sm: "0.5rem",
          md: "1rem",
          lg: "1.5rem",
          xl: "2rem"
        }
      };
    }

    return exportData;
  };

  const formatForExport = (data: any) => {
    switch (exportOptions.format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      
      case 'css':
        // Convert to CSS custom properties
        let css = ':root {\n';
        if (data.designTokens?.colors) {
          Object.entries(data.designTokens.colors).forEach(([key, value]) => {
            css += `  --color-${key}: ${value};\n`;
          });
        }
        if (data.designTokens?.spacing) {
          Object.entries(data.designTokens.spacing).forEach(([key, value]) => {
            css += `  --spacing-${key}: ${value};\n`;
          });
        }
        css += '}';
        return css;
      
      case 'figma-tokens':
        // Format for Figma Tokens plugin
        return JSON.stringify({
          colors: data.designTokens?.colors || {},
          typography: data.designTokens?.typography || {},
          spacing: data.designTokens?.spacing || {}
        }, null, 2);
      
      case 'storybook':
        // Format for Storybook integration
        return `export const designTokens = ${JSON.stringify(data.designTokens, null, 2)};

export const components = ${JSON.stringify(data.components, null, 2)};`;
      
      default:
        return JSON.stringify(data, null, 2);
    }
  };

  const handleExport = () => {
    try {
      const data = generateExportData();
      const formattedData = formatForExport(data);
      
      const fileExtension = exportOptions.format === 'css' ? 'css' : 
                           exportOptions.format === 'storybook' ? 'js' : 'json';
      const fileName = `design-system-export.${fileExtension}`;
      
      const blob = new Blob([formattedData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: `Design system exported as ${fileName}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your design system",
        variant: "destructive"
      });
    }
  };

  const validateImportData = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      const errors: string[] = [];
      const warnings: string[] = [];
      
      // Basic structure validation
      if (!parsed.version) {
        warnings.push("No version specified");
      }
      
      if (!parsed.categories && !parsed.components && !parsed.designTokens) {
        errors.push("No valid data found");
      }
      
      // Component validation
      if (parsed.components) {
        parsed.components.forEach((comp: any, index: number) => {
          if (!comp.name || !comp.slug) {
            errors.push(`Component at index ${index} missing required fields`);
          }
        });
      }
      
      const stats = {
        categories: parsed.categories?.length || 0,
        components: parsed.components?.length || 0,
        tokens: Object.keys(parsed.designTokens || {}).length
      };
      
      setValidationResults({
        valid: errors.length === 0,
        errors,
        warnings,
        stats
      });
      
    } catch (error) {
      setValidationResults({
        valid: false,
        errors: ["Invalid JSON format"],
        warnings: []
      });
    }
  };

  const handleImport = () => {
    if (!validationResults?.valid) {
      toast({
        title: "Import failed",
        description: "Please fix validation errors first",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call your import API
    toast({
      title: "Import successful",
      description: "Design system data imported successfully",
    });
    
    setImportData("");
    setValidationResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Export & Import Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="export" className="space-y-4">
            <TabsList>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="format">Export Format</Label>
                    <Select 
                      value={exportOptions.format} 
                      onValueChange={(value: any) => setExportOptions(prev => ({ ...prev, format: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="css">CSS Variables</SelectItem>
                        <SelectItem value="figma-tokens">Figma Tokens</SelectItem>
                        <SelectItem value="storybook">Storybook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Include in Export</Label>
                    <div className="space-y-2">
                      {[
                        { key: 'includeCategories', label: 'Categories' },
                        { key: 'includeComponents', label: 'Components' },
                        { key: 'includeTokens', label: 'Design Tokens' },
                        { key: 'includeDocumentation', label: 'Documentation' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={key}
                            checked={exportOptions[key as keyof ExportOptions] as boolean}
                            onChange={(e) => setExportOptions(prev => ({ 
                              ...prev, 
                              [key]: e.target.checked 
                            }))}
                          />
                          <Label htmlFor={key}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Export Preview</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Categories:</span>
                      <Badge variant="outline">{categories?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Components:</span>
                      <Badge variant="outline">{components?.length || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Format:</span>
                      <Badge>{exportOptions.format.toUpperCase()}</Badge>
                    </div>
                  </div>
                  <Button onClick={handleExport} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Design System
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="import" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="import-data">Import Data (JSON)</Label>
                  <Textarea
                    id="import-data"
                    placeholder="Paste your design system JSON data here..."
                    value={importData}
                    onChange={(e) => {
                      setImportData(e.target.value);
                      if (e.target.value) {
                        validateImportData(e.target.value);
                      } else {
                        setValidationResults(null);
                      }
                    }}
                    rows={8}
                  />
                </div>

                {validationResults && (
                  <div className="space-y-2">
                    {validationResults.valid ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Validation successful! Ready to import{' '}
                          {validationResults.stats?.categories} categories,{' '}
                          {validationResults.stats?.components} components, and{' '}
                          {validationResults.stats?.tokens} design tokens.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Validation failed: {validationResults.errors.join(', ')}
                        </AlertDescription>
                      </Alert>
                    )}

                    {validationResults.warnings.length > 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Warnings: {validationResults.warnings.join(', ')}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <Button 
                  onClick={handleImport} 
                  disabled={!validationResults?.valid}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Design System
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}