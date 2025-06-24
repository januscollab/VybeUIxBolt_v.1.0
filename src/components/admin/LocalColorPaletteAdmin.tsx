
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';

export function LocalColorPaletteAdmin() {
  const { colorPalette, updateColorPalette } = useLocalDesignSystem();
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');

  const handleColorChange = (colorName: string, value: string) => {
    updateColorPalette({
      ...colorPalette,
      [colorName]: value
    });
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) {
      toast({
        title: "Color name required",
        description: "Please enter a name for the new color",
        variant: "destructive"
      });
      return;
    }

    if (colorPalette[newColorName]) {
      toast({
        title: "Color name exists",
        description: "A color with this name already exists",
        variant: "destructive"
      });
      return;
    }

    updateColorPalette({
      ...colorPalette,
      [newColorName]: newColorValue
    });

    setNewColorName('');
    setNewColorValue('#000000');
    
    toast({
      title: "Color added",
      description: `Color "${newColorName}" has been added to your palette`
    });
  };

  const handleRemoveColor = (colorName: string) => {
    const { [colorName]: removed, ...remaining } = colorPalette;
    updateColorPalette(remaining);
    
    toast({
      title: "Color removed",
      description: `Color "${colorName}" has been removed from your palette`
    });
  };

  const resetToDefaults = () => {
    const defaultPalette = {
      primary: "#3b82f6",
      secondary: "#6b7280",
      accent: "#06b6d4",
      neutral: "#64748b",
      background: "#ffffff",
      text: "#1e293b",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      orange: "#f97316"
    };
    
    updateColorPalette(defaultPalette);
    
    toast({
      title: "Colors reset",
      description: "Color palette has been reset to default values"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Palette Administration
        </CardTitle>
        <CardDescription>
          Customize your design system colors and manage your color palette.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(colorPalette).map(([name, value]) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={`color-${name}`} className="capitalize flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: value }}
                />
                {name}
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`color-${name}`}
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(name, e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  value={value}
                  onChange={(e) => handleColorChange(name, e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveColor(name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Color */}
        <div className="border-t pt-6 space-y-4">
          <h4 className="font-semibold">Add New Color</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Color name (e.g., accent-2)"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="color"
              value={newColorValue}
              onChange={(e) => setNewColorValue(e.target.value)}
              className="w-16 h-10 p-1 border rounded"
            />
            <Button onClick={handleAddColor}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="border-t pt-6">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
