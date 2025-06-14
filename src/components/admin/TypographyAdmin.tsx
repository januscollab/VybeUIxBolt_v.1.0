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
    try {
      const { data, error } = await supabase
        .from('custom_fonts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCustomFonts(data || []);
    } catch (error) {
      console.error('Error loading custom fonts:', error);
      setCustomFonts([]);
    }
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
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      // Validate file type
      const validFormats = ['.woff', '.woff2', '.ttf', '.otf'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!validFormats.includes(fileExtension)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported font format. Use WOFF, WOFF2, TTF, or OTF.`,
          variant: "destructive"
        });
        continue;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 2MB. Please use a smaller file.`,
          variant: "destructive"
        });
        continue;
      }

      try {
        // Create unique filename
        const fileName = `${Date.now()}-${file.name}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('custom-fonts')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('custom-fonts')
          .getPublicUrl(fileName);

        // Extract font name without extension
        const fontName = file.name.replace(/\.[^/.]+$/, "");
        const fontFamily = fontName.replace(/[^a-zA-Z0-9\s]/g, '').trim();

        // Save font metadata to database
        const { error: dbError } = await supabase
          .from('custom_fonts')
          .insert({
            font_name: fontName,
            font_family: fontFamily,
            file_url: publicUrl,
            file_format: fileExtension.substring(1),
            uploaded_by: (await supabase.auth.getUser()).data.user?.id
          });

        if (dbError) throw dbError;

        toast({
          title: "Font Uploaded",
          description: `${fontName} has been uploaded successfully`,
        });

      } catch (error) {
        console.error('Error uploading font:', error);
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive"
        });
      }
    }

    // Reload custom fonts
    await loadCustomFonts();
    
    // Clear the input
    event.target.value = '';
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

  const content = (
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
                   {customFonts.map(font => (
                     <SelectItem key={font.id} value={font.font_family}>
                       <span style={{ fontFamily: font.font_family }}>{font.font_name} (Custom)</span>
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
                   {customFonts.map(font => (
                     <SelectItem key={font.id} value={font.font_family}>
                       <span style={{ fontFamily: font.font_family }}>{font.font_name} (Custom)</span>
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
            <pre 
              className="text-sm"
              style={{ 
                fontFamily: localTypography.secondary?.family || 'JetBrains Mono, monospace',
                fontWeight: '500',
                marginBottom: '8px'
              }}
            >
              {`const VybeUI = () => {`}
            </pre>
            <pre 
              className="text-sm"
              style={{ 
                fontFamily: localTypography.secondary?.family || 'JetBrains Mono, monospace',
                fontWeight: '400'
              }}
            >
              {`  return <div>Secondary typography for code</div>;\n}`}
            </pre>
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
                     <Button 
                       variant="ghost" 
                       size="sm"
                       onClick={async () => {
                         try {
                           // Delete from storage
                           const fileName = font.file_url.split('/').pop();
                           if (fileName) {
                             await supabase.storage
                               .from('custom-fonts')
                               .remove([fileName]);
                           }
                           
                           // Delete from database
                           await supabase
                             .from('custom_fonts')
                             .delete()
                             .eq('id', font.id);
                           
                           await loadCustomFonts();
                           
                           toast({
                             title: "Font Deleted",
                             description: `${font.font_name} has been deleted successfully`,
                           });
                         } catch (error) {
                           console.error('Error deleting font:', error);
                           toast({
                             title: "Delete Failed",
                             description: "Failed to delete font. Please try again.",
                             variant: "destructive"
                           });
                         }
                       }}
                     >
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
  );

  // If not using as inline (modal mode), wrap in Dialog
  if (!isOpen) {
    return (
      <Dialog open={false} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              VybeUI Typography Administration
            </DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
}