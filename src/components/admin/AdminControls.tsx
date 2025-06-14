import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Palette, Type, Image, Building2 } from 'lucide-react';
import { ColorPaletteAdmin } from '@/components/admin/ColorPaletteAdmin';
import { TypographyAdmin } from '@/components/admin/TypographyAdmin';
import { BrandingAdmin } from '@/components/admin/BrandingAdmin';
import { useDesignSystem } from '@/hooks/useDesignSystem';

export function AdminControls() {
  const { isAdmin } = useDesignSystem();

  if (!isAdmin) {
    return null;
  }

  // Remove the floating nav - it's no longer needed since we have inline admin panels
  return null;
}

export function ColorPaletteControls() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          <Button onClick={() => setIsOpen(true)} className="w-full">
            <Palette className="h-4 w-4 mr-2" />
            Open Color Palette Editor
          </Button>
        </CardContent>
      </Card>
      <ColorPaletteAdmin isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export function TypographyControls() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          <Button onClick={() => setIsOpen(true)} className="w-full">
            <Type className="h-4 w-4 mr-2" />
            Open Typography Editor
          </Button>
        </CardContent>
      </Card>
      <TypographyAdmin isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export function BrandingControls() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          <Button onClick={() => setIsOpen(true)} className="w-full">
            <Building2 className="h-4 w-4 mr-2" />
            Open Brand Editor
          </Button>
        </CardContent>
      </Card>
      <BrandingAdmin isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}