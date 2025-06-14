import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, Palette, History, Upload, RefreshCw } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { toast } from '@/hooks/use-toast';

interface ColorPaletteAdminProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ColorPaletteAdmin({ isOpen, onOpenChange }: ColorPaletteAdminProps) {
  const { colorPalette, updateColorPalette, saveVersion, loadVersion, versions, refreshVersions, activeVersion } = useDesignSystem();
  const [localColors, setLocalColors] = useState(colorPalette);
  const [versionName, setVersionName] = useState('');
  const [showVersionDialog, setShowVersionDialog] = useState(false);

  useEffect(() => {
    setLocalColors(colorPalette);
  }, [colorPalette]);

  const handleColorChange = (colorKey: string, value: string) => {
    setLocalColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const handleSave = async () => {
    await updateColorPalette(localColors);
    toast({
      title: "Colors Updated",
      description: "Color palette has been updated successfully.",
    });
  };

  const handleSaveVersion = async () => {
    if (!versionName.trim()) {
      toast({
        title: "Version Name Required",
        description: "Please enter a name for this version.",
        variant: "destructive"
      });
      return;
    }

    await saveVersion(versionName);
    setVersionName('');
    setShowVersionDialog(false);
    await refreshVersions();
    
    toast({
      title: "Version Saved",
      description: `Version "${versionName}" has been saved and is now active.`,
    });
  };

  const handleLoadVersion = async (versionId: string) => {
    await loadVersion(versionId);
    toast({
      title: "Version Loaded",
      description: "Design system version has been loaded successfully.",
    });
  };

  const colorDefinitions = [
    { key: 'primary', label: 'Primary', description: 'Main brand color' },
    { key: 'secondary', label: 'Secondary', description: 'Secondary brand color' },
    { key: 'success', label: 'Success', description: 'Success state color' },
    { key: 'warning', label: 'Warning', description: 'Warning state color' },
    { key: 'error', label: 'Error', description: 'Error state color' },
    { key: 'orange', label: 'Orange', description: 'Accent orange color' },
    { key: 'background', label: 'Background', description: 'Page background' },
    { key: 'foreground', label: 'Foreground', description: 'Text color' },
    { key: 'muted', label: 'Muted', description: 'Muted background' },
    { key: 'accent', label: 'Accent', description: 'Accent color' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            VybeUI Color Palette Administration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Version Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Version Management</CardTitle>
              <CardDescription>
                Save and manage color palette versions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  Active: {activeVersion?.version_name || 'Unknown'}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshVersions}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Load Previous Version</Label>
                  <Select onValueChange={handleLoadVersion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version to load" />
                    </SelectTrigger>
                    <SelectContent>
                      {versions.map(version => (
                        <SelectItem key={version.id} value={version.id}>
                          {version.version_name} ({new Date(version.created_at).toLocaleDateString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Save New Version</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Version name..."
                      value={versionName}
                      onChange={(e) => setVersionName(e.target.value)}
                    />
                    <Button onClick={handleSaveVersion}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Color Palette Editor</CardTitle>
              <CardDescription>
                Customize the VybeUI color palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {colorDefinitions.map(({ key, label, description }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id={key}
                        type="color"
                        value={localColors[key] || '#000000'}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={localColors[key] || ''}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setLocalColors(colorPalette)}
                >
                  Reset
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Apply Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Color Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Color Preview</CardTitle>
              <CardDescription>
                Preview how colors will look in the design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {colorDefinitions.map(({ key, label }) => (
                  <div key={key} className="text-center">
                    <div
                      className="w-full h-16 rounded-lg border mb-2"
                      style={{ backgroundColor: localColors[key] || '#000000' }}
                    />
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{localColors[key]}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}