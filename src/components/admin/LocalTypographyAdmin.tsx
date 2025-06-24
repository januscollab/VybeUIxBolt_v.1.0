
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Type } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';

const GOOGLE_FONTS = [
  { name: 'Inter', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  { name: 'Roboto', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap' },
  { name: 'Open Sans', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap' },
  { name: 'Lato', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&display=swap' },
  { name: 'Montserrat', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' },
  { name: 'Poppins', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
  { name: 'Source Sans Pro', url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;600;700&display=swap' },
  { name: 'JetBrains Mono', url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' },
  { name: 'Fira Code', url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap' },
  { name: 'Source Code Pro', url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap' }
];

export function LocalTypographyAdmin() {
  const { typography, updateTypography } = useLocalDesignSystem();
  const [customFontName, setCustomFontName] = useState('');
  const [customFontUrl, setCustomFontUrl] = useState('');

  const handleFontChange = (fontType: 'primary' | 'secondary', fontName: string) => {
    const googleFont = GOOGLE_FONTS.find(font => font.name === fontName);
    
    updateTypography({
      ...typography,
      [fontType]: {
        family: fontName,
        weights: fontType === 'primary' ? ['400', '500', '600', '700'] : ['400', '500'],
        googleFontUrl: googleFont?.url
      }
    });

    toast({
      title: "Font updated",
      description: `${fontType} font has been set to ${fontName}`
    });
  };

  const handleCustomFont = () => {
    if (!customFontName.trim() || !customFontUrl.trim()) {
      toast({
        title: "Font details required",
        description: "Please enter both font name and Google Fonts URL",
        variant: "destructive"
      });
      return;
    }

    updateTypography({
      ...typography,
      primary: {
        family: customFontName,
        weights: ['400', '500', '600', '700'],
        googleFontUrl: customFontUrl
      }
    });

    setCustomFontName('');
    setCustomFontUrl('');

    toast({
      title: "Custom font added",
      description: `Custom font "${customFontName}" has been set as primary font`
    });
  };

  const resetToDefaults = () => {
    const defaultTypography = {
      primary: { 
        family: "Inter", 
        weights: ["400", "500", "600", "700"],
        googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      },
      secondary: { 
        family: "JetBrains Mono", 
        weights: ["400", "500"],
        googleFontUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
      }
    };
    
    updateTypography(defaultTypography);
    
    toast({
      title: "Typography reset",
      description: "Typography has been reset to default values"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Typography Administration
        </CardTitle>
        <CardDescription>
          Configure fonts and manage typography scales for your design system.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Fonts Display */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Primary Font</h4>
            <div 
              className="text-2xl mb-2"
              style={{ fontFamily: typography.primary?.family }}
            >
              {typography.primary?.family || 'Not set'}
            </div>
            <p className="text-sm text-muted-foreground">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Secondary Font</h4>
            <div 
              className="text-lg font-mono mb-2"
              style={{ fontFamily: typography.secondary?.family }}
            >
              {typography.secondary?.family || 'Not set'}
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              const message = "Hello, World!";
            </p>
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-4">
          <h4 className="font-semibold">Select Fonts</h4>
          
          <div className="space-y-3">
            <Label>Primary Font (Headings & Body)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {GOOGLE_FONTS.filter(font => !font.name.includes('Mono')).map((font) => (
                <Button
                  key={font.name}
                  variant={typography.primary?.family === font.name ? "default" : "outline"}
                  onClick={() => handleFontChange('primary', font.name)}
                  className="text-left justify-start"
                >
                  {font.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Secondary Font (Code & Monospace)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {GOOGLE_FONTS.filter(font => font.name.includes('Mono') || font.name.includes('Code')).map((font) => (
                <Button
                  key={font.name}
                  variant={typography.secondary?.family === font.name ? "default" : "outline"}
                  onClick={() => handleFontChange('secondary', font.name)}
                  className="text-left justify-start"
                >
                  {font.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Font */}
        <div className="border-t pt-6 space-y-4">
          <h4 className="font-semibold">Add Custom Google Font</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="custom-font-name">Font Name</Label>
              <Input
                id="custom-font-name"
                placeholder="e.g., Playfair Display"
                value={customFontName}
                onChange={(e) => setCustomFontName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="custom-font-url">Google Fonts URL</Label>
              <Input
                id="custom-font-url"
                placeholder="https://fonts.googleapis.com/css2?family=..."
                value={customFontUrl}
                onChange={(e) => setCustomFontUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleCustomFont}>
              Add Custom Font
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
