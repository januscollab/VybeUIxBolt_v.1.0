import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useCategories, useComponents } from "@/hooks/useDesignSystem";
import { toast } from "@/hooks/use-toast";

export default function FigmaExport() {
  const [exportData, setExportData] = useState("");
  const { data: categories } = useCategories();
  const { data: allComponents } = useComponents();

  const generateFigmaStructure = () => {
    if (!categories || !allComponents) return;

    const structure = {
      projectName: "Design Language System (DLS)",
      version: "1.0.0",
      exportDate: new Date().toISOString(),
      categories: categories.map(category => ({
        name: category.name,
        description: category.description,
        slug: category.slug,
        components: allComponents
          .filter(comp => comp.category_id === category.id)
          .map(comp => ({
            name: comp.name,
            description: comp.description,
            status: comp.status,
            isExperimental: comp.is_experimental,
            slug: comp.slug,
            figmaUrl: comp.figma_url || "TO_BE_ADDED",
            storybookUrl: comp.storybook_url || "TO_BE_ADDED"
          }))
      }))
    };

    setExportData(JSON.stringify(structure, null, 2));
  };

  const generateCSV = () => {
    if (!categories || !allComponents) return "";

    const csvData = [
      ["Category", "Component Name", "Description", "Status", "Experimental", "Slug", "Figma URL", "Storybook URL"]
    ];

    categories.forEach(category => {
      const categoryComponents = allComponents.filter(comp => comp.category_id === category.id);
      categoryComponents.forEach(comp => {
        csvData.push([
          category.name,
          comp.name,
          comp.description || "",
          comp.status,
          comp.is_experimental ? "Yes" : "No",
          comp.slug,
          comp.figma_url || "TO_BE_ADDED",
          comp.storybook_url || "TO_BE_ADDED"
        ]);
      });
    });

    return csvData.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
  };

  const generateFigmaPageStructure = () => {
    if (!categories || !allComponents) return "";

    let structure = `📋 FIGMA FILE STRUCTURE FOR DLS
===============================================

🎨 File Name: "DLS - Design Language System"

📑 PAGES TO CREATE:
==================

`;

    categories.forEach((category, index) => {
      const categoryComponents = allComponents.filter(comp => comp.category_id === category.id);
      structure += `${index + 1}. 📄 ${category.name}
   Description: ${category.description}
   Components (${categoryComponents.length}):
`;
      
      categoryComponents.forEach(comp => {
        const statusEmoji = comp.status === 'stable' ? '✅' : comp.status === 'review' ? '🔄' : '🚧';
        const expEmoji = comp.is_experimental ? '🧪' : '';
        structure += `   • ${statusEmoji} ${comp.name} ${expEmoji}
     ${comp.description}
`;
      });
      structure += "\n";
    });

    structure += `
🎯 RECOMMENDED FIGMA SETUP:
==========================

1. Create main file: "DLS - Design Language System"
2. Set up the following pages (in order):
   • 🏠 Cover & Overview
   • 🎨 Design Tokens (Colors, Typography, Spacing)
   • 📚 All component pages listed above
   • 📖 Documentation & Guidelines

3. For each component:
   • Create main component in "light mode"
   • Add variants for different states (hover, active, disabled)
   • Add dark mode variants if needed
   • Use Auto Layout for responsive behavior
   • Add component descriptions

4. Design Token Setup:
   • Create color styles for all brand colors
   • Set up text styles for typography scale
   • Define effect styles for shadows/elevation
   • Create grid styles for spacing system

5. Component Naming Convention:
   • Use "DLS/" prefix for all components
   • Format: "DLS/CategoryName/ComponentName"
   • Example: "DLS/Core UI/Button"

📋 NEXT STEPS:
=============
1. Copy this structure to your Figma file
2. Create the pages and components
3. Generate shareable Figma URLs for each component
4. Update the database with the new Figma URLs using the provided update function
`;

    return structure;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard.",
    });
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Figma Export Tool</h1>
            <p className="text-lg text-muted-foreground">
              Export your design system structure to set up Figma manually.
            </p>
          </div>
          <Button onClick={generateFigmaStructure}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Export Data
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Export Tool</Badge>
          <Badge variant="outline">Figma Integration</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{categories?.length || 0}</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{allComponents?.length || 0}</div>
            <p className="text-sm text-muted-foreground">Components</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {allComponents?.filter(c => c.status === 'stable').length || 0}
            </div>
            <p className="text-sm text-muted-foreground">Stable Components</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Formats</CardTitle>
          <CardDescription>
            Choose the format that works best for your Figma setup workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="structure" className="space-y-4">
            <TabsList>
              <TabsTrigger value="structure">Figma Structure</TabsTrigger>
              <TabsTrigger value="json">JSON Data</TabsTrigger>
              <TabsTrigger value="csv">CSV Spreadsheet</TabsTrigger>
            </TabsList>

            <TabsContent value="structure" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Figma File Structure Guide</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateFigmaPageStructure())}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(generateFigmaPageStructure(), 'figma-structure.txt', 'text/plain')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={generateFigmaPageStructure()}
                  readOnly
                  className="min-h-[400px] font-mono text-xs"
                  placeholder="Click 'Generate Export Data' to see the structure..."
                />
              </div>
            </TabsContent>

            <TabsContent value="json" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">JSON Component Data</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(exportData)}
                      disabled={!exportData}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(exportData, 'dls-components.json', 'application/json')}
                      disabled={!exportData}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={exportData}
                  readOnly
                  className="min-h-[400px] font-mono text-xs"
                  placeholder="Click 'Generate Export Data' to see the JSON..."
                />
              </div>
            </TabsContent>

            <TabsContent value="csv" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">CSV Spreadsheet</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateCSV())}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(generateCSV(), 'dls-components.csv', 'text/csv')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={generateCSV()}
                  readOnly
                  className="min-h-[400px] font-mono text-xs"
                  placeholder="CSV data will appear here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Figma Setup Instructions</CardTitle>
          <CardDescription>
            Step-by-step guide to set up your Figma design system file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Export Structure</h4>
                <p className="text-sm text-muted-foreground">
                  Use the "Figma Structure" tab above to get the complete file structure and setup guide.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Create Figma File</h4>
                <p className="text-sm text-muted-foreground">
                  Create a new Figma file called "DLS - Design Language System" and set up the page structure.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Build Components</h4>
                <p className="text-sm text-muted-foreground">
                  Create Figma components for each item in the structure, starting with foundational elements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</div>
              <div>
                <h4 className="font-medium">Get Shareable Links</h4>
                <p className="text-sm text-muted-foreground">
                  For each component, get the shareable Figma URL and update your database.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Figma
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}