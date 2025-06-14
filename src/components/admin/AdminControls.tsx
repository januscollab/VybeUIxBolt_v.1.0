import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Palette, Type, Image } from 'lucide-react';
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