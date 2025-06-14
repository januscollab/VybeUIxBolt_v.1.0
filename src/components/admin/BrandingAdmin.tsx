import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, Upload, Image, X, RefreshCw } from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BrandingAdminProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrandingAdmin({ isOpen, onOpenChange }: BrandingAdminProps) {
  const { activeVersion, updateBranding } = useDesignSystem();
  const [brandName, setBrandName] = useState(activeVersion?.brand_name || 'VybeUI');
  const [logoUrl, setLogoUrl] = useState(activeVersion?.logo_url || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (PNG, JPG, SVG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('brand-assets')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(fileName);

      setLogoUrl(publicUrl);

      toast({
        title: "Logo Uploaded",
        description: "Your logo has been uploaded successfully",
      });

    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateBranding({
        brandName,
        logoUrl
      });

      toast({
        title: "Branding Updated",
        description: "Your brand settings have been saved successfully",
      });

    } catch (error) {
      console.error('Error saving branding:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save branding changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeLogo = () => {
    setLogoUrl('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Brand Customization
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Brand Name */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brand Name</CardTitle>
              <CardDescription>
                The name that appears throughout your design system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Design System Name</Label>
                <Input
                  id="brand-name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter your design system name"
                />
              </div>

              {/* Brand Name Preview */}
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="text-xl font-bold mb-2">{brandName || 'Your Design System'}</h3>
                <p className="text-sm text-muted-foreground">
                  This is how your brand name will appear in headers and titles throughout the design system.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logo</CardTitle>
              <CardDescription>
                Upload your logo to personalize the design system header
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Current Logo Display */}
              {logoUrl && (
                <div className="relative inline-block">
                  <img 
                    src={logoUrl} 
                    alt="Brand Logo" 
                    className="h-16 w-auto max-w-[200px] object-contain border rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={removeLogo}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                
                <div className="text-center space-y-3">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Upload your logo</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, SVG up to 2MB
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Logo Guidelines */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Logo Guidelines:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Recommended size: 200px wide maximum</li>
                  <li>Transparent background (PNG) works best</li>
                  <li>Will be displayed in headers and navigation</li>
                  <li>Horizontal logos work better than square logos</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Brand Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brand Preview</CardTitle>
              <CardDescription>
                See how your branding will look in the design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-background">
                <div className="flex items-center gap-3 mb-4">
                  {logoUrl && (
                    <img 
                      src={logoUrl} 
                      alt="Logo" 
                      className="h-8 w-auto max-w-[120px] object-contain"
                    />
                  )}
                  <h2 className="text-lg font-semibold">
                    {brandName || 'Your Design System'}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Beautiful, accessible components for modern web applications.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setBrandName(activeVersion?.brand_name || 'VybeUI');
                setLogoUrl(activeVersion?.logo_url || '');
              }}
            >
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}