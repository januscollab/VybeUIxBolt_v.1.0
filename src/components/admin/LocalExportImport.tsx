
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';

export function LocalExportImport() {
  const { exportSettings, importSettings } = useLocalDesignSystem();
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    try {
      const settings = exportSettings();
      const blob = new Blob([settings], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `design-system-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export complete",
        description: "Your design system settings have been downloaded"
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export design system settings",
        variant: "destructive"
      });
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      setIsImporting(true);
      
      try {
        const text = await file.text();
        const success = importSettings(text);
        
        if (success) {
          toast({
            title: "Import successful",
            description: "Your design system settings have been restored"
          });
        } else {
          toast({
            title: "Import failed",
            description: "Invalid file format or corrupted data",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Failed to read the file",
          variant: "destructive"
        });
      } finally {
        setIsImporting(false);
      }
    };
    
    input.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Import & Export
        </CardTitle>
        <CardDescription>
          Backup and restore your design system settings using JSON files.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={handleExport} className="h-20 flex-col">
            <Download className="h-6 w-6 mb-2" />
            Export Design System
            <span className="text-xs text-muted-foreground">Download as JSON</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleImport}
            disabled={isImporting}
            className="h-20 flex-col"
          >
            <Upload className="h-6 w-6 mb-2" />
            {isImporting ? 'Importing...' : 'Import Design System'}
            <span className="text-xs text-muted-foreground">Upload JSON file</span>
          </Button>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">What's included:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Color palette configuration</li>
            <li>• Typography settings and fonts</li>
            <li>• Brand name and logo URL</li>
            <li>• Export timestamp and version</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
