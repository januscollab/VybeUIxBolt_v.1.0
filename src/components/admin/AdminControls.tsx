
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Palette, Type, Image, Building2 } from 'lucide-react';
import { FrontendColorPaletteAdmin } from '@/components/admin/FrontendColorPaletteAdmin';
import { FrontendTypographyAdmin } from '@/components/admin/FrontendTypographyAdmin';
import { FrontendBrandingAdmin } from '@/components/admin/FrontendBrandingAdmin';

export function AdminControls() {
  // Since we removed authentication, admin controls are always available
  return null;
}

export function ColorPaletteControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Palette Management
        </CardTitle>
        <CardDescription>
          Customize your design system colors and create color palette versions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FrontendColorPaletteAdmin />
      </CardContent>
    </Card>
  );
}

export function TypographyControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Typography Management
        </CardTitle>
        <CardDescription>
          Configure fonts, upload custom fonts, and manage typography scales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FrontendTypographyAdmin />
      </CardContent>
    </Card>
  );
}

export function BrandingControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Brand Management
        </CardTitle>
        <CardDescription>
          Upload your logo, set brand name, and customize brand assets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FrontendBrandingAdmin />
      </CardContent>
    </Card>
  );
}
