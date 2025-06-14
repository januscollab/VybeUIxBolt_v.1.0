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
  const [activeModal, setActiveModal] = useState<'colors' | 'typography' | 'branding' | null>(null);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-background border rounded-lg shadow-lg p-2 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveModal('branding')}
            className="w-full justify-start"
          >
            <Image className="h-4 w-4 mr-2" />
            Branding
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveModal('colors')}
            className="w-full justify-start"
          >
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveModal('typography')}
            className="w-full justify-start"
          >
            <Type className="h-4 w-4 mr-2" />
            Typography
          </Button>
        </div>
      </div>

      <BrandingAdmin
        isOpen={activeModal === 'branding'}
        onOpenChange={(open) => setActiveModal(open ? 'branding' : null)}
      />

      <ColorPaletteAdmin
        isOpen={activeModal === 'colors'}
        onOpenChange={(open) => setActiveModal(open ? 'colors' : null)}
      />

      <TypographyAdmin
        isOpen={activeModal === 'typography'}
        onOpenChange={(open) => setActiveModal(open ? 'typography' : null)}
      />
    </>
  );
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