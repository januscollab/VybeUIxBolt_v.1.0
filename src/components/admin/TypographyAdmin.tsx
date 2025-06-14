import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, Type, Upload, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TypographyAdminProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TypographyAdmin({ isOpen, onOpenChange }: TypographyAdminProps) {
  const { typography, updateTypography, activeVersion } = useDesignSystem();
  const [localTypography, setLocalTypography] = useState(typography);
  const [googleFonts, setGoogleFonts] = useState<string[]>([]);
  const [customFonts, setCustomFonts] = useState<any[]>([]);

  useEffect(() => {
    setLocalTypography(typography);
    loadGoogleFonts();
    loadCustomFonts();
  }, [typography]);

  const loadGoogleFonts = () => {
    // Popular Google Fonts list
    const popularFonts = [
      'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro',
      'Raleway', 'Nunito', 'Poppins', 'Playfair Display', 'Merriweather',
      'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Space Mono'
    ];
    setGoogleFonts(popularFonts);
  };

  const loadCustomFonts = async () => {
    // Placeholder for custom fonts - will be available after types regenerate
    setCustomFonts([]);
  };

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // This would handle font file uploads
    // For now, we'll show a placeholder message
    toast({
      title: "Font Upload",
      description: "Font upload functionality would be implemented here.",
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            VybeUI Typography Administration
          </DialogTitle>
        </DialogHeader>

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
                  VybeUI Design System
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
                  style={{ 
                    fontFamily: localTypography.secondary?.family || 'JetBrains Mono',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}
                >
                  const VybeUI = () =&gt; &#123;
                </div>
                <div 
                  style={{ 
                    fontFamily: localTypography.secondary?.family || 'JetBrains Mono',
                    fontSize: '14px',
                    fontWeight: '400'
                  }}
                >
                  &nbsp;&nbsp;return &lt;div&gt;Secondary typography for code&lt;/div&gt;;
                  <br />
                  &#125;;
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Font Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Custom Font Upload</CardTitle>
              <CardDescription>
                Upload your own font files for use in the design system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload font files (.woff, .woff2, .ttf, .otf)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".woff,.woff2,.ttf,.otf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="font-upload"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="font-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </label>
                </Button>
              </div>

              {customFonts.length > 0 && (
                <div className="space-y-2">
                  <Label>Custom Fonts</Label>
                  <div className="grid gap-2">
                    {customFonts.map(font => (
                      <div key={font.id} className="flex items-center justify-between p-2 border rounded">
                        <span>{font.font_name}</span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
      </DialogContent>
    </Dialog>
  );
}