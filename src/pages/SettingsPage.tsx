
import { LocalColorPaletteAdmin } from '@/components/admin/LocalColorPaletteAdmin';
import { LocalTypographyAdmin } from '@/components/admin/LocalTypographyAdmin';
import { LocalBrandingAdmin } from '@/components/admin/LocalBrandingAdmin';
import { LocalExportImport } from '@/components/admin/LocalExportImport';
import { SmartSiteScanner } from '@/components/admin/SmartSiteScanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Design System Settings</h1>
        <p className="text-muted-foreground">
          Customize your design system colors, typography, and branding.
        </p>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <LocalColorPaletteAdmin />
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <LocalTypographyAdmin />
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <LocalBrandingAdmin />
        </TabsContent>

        <TabsContent value="scanner" className="space-y-6">
          <SmartSiteScanner />
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <LocalExportImport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
