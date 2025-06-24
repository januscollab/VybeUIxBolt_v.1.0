
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';
import { toast } from '@/hooks/use-toast';

export function FrontendTypographyAdmin() {
  const { typography, updateTypography } = useLocalDesignSystem();
  const [localTypography, setLocalTypography] = useState(typography);
  const [googleFonts] = useState([
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro',
    'Raleway', 'Nunito', 'Poppins', 'Playfair Display', 'Merriweather',
    'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Space Mono'
  ]);

  useEffect(() => {
    setLocalTypography(typography);
  }, [typography]);

  const handleFontFamilyChange = (fontType: 'primary' | 'secondary', fontFamily: string) => {
    const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
    
    setLocalTypography(prev => ({
      ...prev,
      [fontType]: {
        ...prev[fontType],
        family: fontFamily,
        googleFontUrl: googleFontUrl,
        weights: ['400', '500', '600', '700']
      }
    }));
  };

  const handleWeightChange = (fontType: 'primary' | 'secondary', weights: string[]) => {
    setLocalTypography(prev => ({
      ...prev,
      [fontType]: {
        ...prev[fontType],
        weights: weights
      }
    }));
  };

  const handleSave = async () => {
    await updateTypography(localTypography);
    toast({
      title: "Typography Updated",
      description: "Typography settings have been updated successfully.",
    });
  };

  const fontWeights = [
    { value: '300', label: 'Light (300)' },
    { value: '400', label: 'Regular (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: '600', label: 'Semi Bold (600)' },
    { value: '700', label: 'Bold (700)' },
    { value: '800', label: 'Extra Bold (800)' },
    { value: '900', label: 'Black (900)' }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Primary Typography</CardTitle>
          <CardDescription>
            Main font used for headings and body text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select 
                value={localTypography.primary?.family || ''}
                onValueChange={(value) => handleFontFamilyChange('primary', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary font" />
                </SelectTrigger>
                <SelectContent>
                  {googleFonts.map(font => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Font Weights</Label>
              <div className="flex flex-wrap gap-2">
                {fontWeights.map(weight => (
                  <Badge
                    key={weight.value}
                    variant={localTypography.primary?.weights?.includes(weight.value) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const currentWeights = localTypography.primary?.weights || [];
                      const newWeights = currentWeights.includes(weight.value)
                        ? currentWeights.filter(w => w !== weight.value)
                        : [...currentWeights, weight.value];
                      handleWeightChange('primary', newWeights);
                    }}
                  >
                    {weight.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Font Preview */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <div 
              style={{ 
                fontFamily: localTypography.primary?.family || 'Inter',
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '8px'
              }}
            >
              Design System
            </div>
            <div 
              style={{ 
                fontFamily: localTypography.primary?.family || 'Inter',
                fontSize: '16px',
                fontWeight: '400'
              }}
            >
              This is how your primary typography will look in the design system. It includes headings, body text, and interface elements.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Secondary Typography</CardTitle>
          <CardDescription>
            Secondary font used for code, captions, and special elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select 
                value={localTypography.secondary?.family || ''}
                onValueChange={(value) => handleFontFamilyChange('secondary', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select secondary font" />
                </SelectTrigger>
                <SelectContent>
                  {googleFonts.map(font => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Font Weights</Label>
              <div className="flex flex-wrap gap-2">
                {fontWeights.map(weight => (
                  <Badge
                    key={weight.value}
                    variant={localTypography.secondary?.weights?.includes(weight.value) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const currentWeights = localTypography.secondary?.weights || [];
                      const newWeights = currentWeights.includes(weight.value)
                        ? currentWeights.filter(w => w !== weight.value)
                        : [...currentWeights, weight.value];
                      handleWeightChange('secondary', newWeights);
                    }}
                  >
                    {weight.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Font Preview */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <div 
              className="font-mono text-sm"
              style={{ 
                fontFamily: localTypography.secondary?.family ? `"${localTypography.secondary.family}", monospace` : 'JetBrains Mono, monospace',
                fontWeight: '500',
                marginBottom: '8px',
                lineHeight: '1.5'
              }}
            >
              const DesignSystem = () =&gt; &#123;
            </div>
            <div 
              className="font-mono text-sm"
              style={{ 
                fontFamily: localTypography.secondary?.family ? `"${localTypography.secondary.family}", monospace` : 'JetBrains Mono, monospace',
                fontWeight: '400',
                lineHeight: '1.5'
              }}
            >
              &nbsp;&nbsp;return &lt;div&gt;Secondary typography for code&lt;/div&gt;;
              <br />
              &#125;
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setLocalTypography(typography)}
        >
          Reset
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
