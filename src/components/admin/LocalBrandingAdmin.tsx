
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';

export function LocalBrandingAdmin() {
  const { brandName, logoUrl, updateBranding } = useLocalDesignSystem();
  const [localBrandName, setLocalBrandName] = useState(brandName);
  const [localLogoUrl, setLocalLogoUrl] = useState(logoUrl);

  const handleSave = () => {
    updateBranding({
      brandName: localBrandName,
      logoUrl: localLogoUrl
    });

    toast({
      title: "Branding updated",
      description: "Your brand settings have been saved successfully"
    });
  };

  const resetToDefaults = () => {
    setLocalBrandName('VybeUI');
    setLocalLogoUrl('');
    updateBranding({
      brandName: 'VybeUI',
      logoUrl: ''
    });

    toast({
      title: "Branding reset",
      description: "Brand settings have been reset to defaults"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Brand Administration
        </CardTitle>
        <CardDescription>
          Upload your logo, set brand name, and customize brand assets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand Name */}
        <div className="space-y-2">
          <Label htmlFor="brand-name">Brand Name</Label>
          <Input
            id="brand-name"
            value={localBrandName}
            onChange={(e) => setLocalBrandName(e.target.value)}
            placeholder="Enter your brand name"
          />
        </div>

        {/* Logo URL */}
        <div className="space-y-2">
          <Label htmlFor="logo-url">Logo URL</Label>
          <Input
            id="logo-url"
            value={localLogoUrl}
            onChange={(e) => setLocalLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.png"
          />
          <p className="text-xs text-muted-foreground">
            Use a publicly accessible URL for your logo (CDN, image hosting service, etc.)
          </p>
        </div>

        {/* Logo Preview */}
        {localLogoUrl && (
          <div className="space-y-2">
            <Label>Logo Preview</Label>
            <div className="p-4 border rounded-lg bg-muted">
              <img 
                src={localLogoUrl} 
                alt="Logo preview" 
                className="max-h-16 max-w-48 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Brand Preview */}
        <div className="space-y-2">
          <Label>Brand Preview</Label>
          <div className="p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3">
              {localLogoUrl && (
                <img 
                  src={localLogoUrl} 
                  alt="Brand logo" 
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="text-xl font-semibold">{localBrandName || 'Brand Name'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
