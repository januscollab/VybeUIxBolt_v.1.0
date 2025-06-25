
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Type, Download, Globe, HardDrive, Monitor } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";

export default function EnhancedTypographyComponent() {
  const { 
    typography, 
    fontProvider, 
    availableFontProviders, 
    updateTypography, 
    updateFontProvider 
  } = useLocalDesignSystem();
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `Font information has been copied to your clipboard.`,
    });
  };

  const handleProviderChange = (providerId: string) => {
    const provider = availableFontProviders.find(p => p.id === providerId);
    if (provider) {
      updateFontProvider(provider);
      toast({
        title: "Font provider changed",
        description: `Now using ${provider.name} for font loading.`,
      });
    }
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'google': return <Globe className="h-4 w-4" />;
      case 'bunny': return <Globe className="h-4 w-4" />;
      case 'local': return <HardDrive className="h-4 w-4" />;
      case 'system': return <Monitor className="h-4 w-4" />;
      default: return <Type className="h-4 w-4" />;
    }
  };

  const getProviderBadgeColor = (type: string) => {
    switch (type) {
      case 'google': return 'default';
      case 'bunny': return 'secondary';
      case 'local': return 'outline';
      case 'system': return 'destructive';
      default: return 'outline';
    }
  };

  const popularFonts = [
    { name: 'Inter', category: 'Sans-serif', description: 'Modern, readable, versatile' },
    { name: 'Roboto', category: 'Sans-serif', description: 'Google\'s flagship font' },
    { name: 'Open Sans', category: 'Sans-serif', description: 'Humanist, friendly' },
    { name: 'Lato', category: 'Sans-serif', description: 'Warm, approachable' },
    { name: 'Montserrat', category: 'Sans-serif', description: 'Geometric, urban' },
    { name: 'Playfair Display', category: 'Serif', description: 'Elegant, high contrast' },
    { name: 'Source Sans Pro', category: 'Sans-serif', description: 'Adobe\'s first open source font' },
    { name: 'Nunito', category: 'Sans-serif', description: 'Rounded, friendly' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Font Provider Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Typography System</h1>
            <Badge variant="default">Enhanced</Badge>
            <Badge variant={getProviderBadgeColor(fontProvider.type)} className="gap-1">
              {getProviderIcon(fontProvider.type)}
              {fontProvider.name}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={fontProvider.id} onValueChange={handleProviderChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableFontProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center gap-2">
                      {getProviderIcon(provider.type)}
                      {provider.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          Complete typography system with multiple font providers and enhanced loading capabilities.
        </p>
      </div>

      {/* Font Provider Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getProviderIcon(fontProvider.type)}
            Current Font Provider: {fontProvider.name}
          </CardTitle>
          <CardDescription>
            {fontProvider.type === 'google' && 'Loading fonts from Google Fonts CDN - extensive library, may have privacy implications'}
            {fontProvider.type === 'bunny' && 'Privacy-focused alternative to Google Fonts - GDPR compliant, same fonts'}
            {fontProvider.type === 'local' && 'Fonts hosted locally - best performance, requires manual font management'}
            {fontProvider.type === 'system' && 'Using system fonts - fastest loading, limited selection'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Advantages</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {fontProvider.type === 'google' && (
                  <>
                    <li>• Largest font library available</li>
                    <li>• Automatic optimization</li>
                    <li>• Global CDN distribution</li>
                  </>
                )}
                {fontProvider.type === 'bunny' && (
                  <>
                    <li>• Privacy-focused (no tracking)</li>
                    <li>• GDPR compliant</li>
                    <li>• Same fonts as Google</li>
                  </>
                )}
                {fontProvider.type === 'local' && (
                  <>
                    <li>• Best performance</li>
                    <li>• No external dependencies</li>
                    <li>• Complete privacy</li>
                  </>
                )}
                {fontProvider.type === 'system' && (
                  <>
                    <li>• Instant loading</li>
                    <li>• No bandwidth usage</li>
                    <li>• Perfect accessibility</li>
                  </>
                )}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Considerations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {fontProvider.type === 'google' && (
                  <>
                    <li>• Privacy implications</li>
                    <li>• External dependency</li>
                    <li>• Potential blocking in some regions</li>
                  </>
                )}
                {fontProvider.type === 'bunny' && (
                  <>
                    <li>• Smaller CDN network</li>
                    <li>• Newer service</li>
                    <li>• Same external dependency</li>
                  </>
                )}
                {fontProvider.type === 'local' && (
                  <>
                    <li>• Manual font management</li>
                    <li>• Larger bundle size</li>
                    <li>• License considerations</li>
                  </>
                )}
                {fontProvider.type === 'system' && (
                  <>
                    <li>• Limited font selection</li>
                    <li>• Platform-dependent appearance</li>
                    <li>• Less design control</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Primary Font</CardTitle>
            <CardDescription>{typography.primary?.family || 'Poppins'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2" style={{ fontFamily: typography.primary?.family || 'Poppins' }}>
              <h1 className="text-3xl font-bold">The quick brown fox</h1>
              <h2 className="text-2xl font-semibold">jumps over the lazy dog</h2>
              <h3 className="text-xl font-medium">ABCDEFGHIJKLMNOPQRSTUVWXYZ</h3>
              <p className="text-base">abcdefghijklmnopqrstuvwxyz 1234567890</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`font-family: "${typography.primary?.family || 'Poppins'}"`)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy CSS
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Secondary Font</CardTitle>
            <CardDescription>{typography.secondary?.family || 'Inter'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2" style={{ fontFamily: typography.secondary?.family || 'Inter' }}>
              <h1 className="text-3xl font-bold">The quick brown fox</h1>
              <h2 className="text-2xl font-semibold">jumps over the lazy dog</h2>
              <h3 className="text-xl font-medium">ABCDEFGHIJKLMNOPQRSTUVWXYZ</h3>
              <p className="text-base">abcdefghijklmnopqrstuvwxyz 1234567890</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`font-family: "${typography.secondary?.family || 'Inter'}"`)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy CSS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Fonts Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Popular Font Options
          </CardTitle>
          <CardDescription>
            Popular fonts that work well with {fontProvider.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularFonts.map((font) => (
              <div
                key={font.name}
                className="p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => {
                  // You could implement font switching here
                  toast({
                    title: "Font preview",
                    description: `${font.name} - ${font.description}`,
                  });
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{font.name}</h4>
                    <Badge variant="outline" className="text-xs">{font.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{font.description}</p>
                  <div className="text-lg" style={{ fontFamily: font.name, fontWeight: 500 }}>
                    Sample Text
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>Complete type scale with Tailwind CSS classes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { size: 'text-xs', label: 'Extra Small', px: '12px' },
            { size: 'text-sm', label: 'Small', px: '14px' },
            { size: 'text-base', label: 'Base', px: '16px' },
            { size: 'text-lg', label: 'Large', px: '18px' },
            { size: 'text-xl', label: 'Extra Large', px: '20px' },
            { size: 'text-2xl', label: '2X Large', px: '24px' },
            { size: 'text-3xl', label: '3X Large', px: '30px' },
            { size: 'text-4xl', label: '4X Large', px: '36px' }
          ].map((scale) => (
            <div key={scale.size} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`${scale.size} font-medium`}>
                  Sample Text
                </div>
                <div className="text-sm text-muted-foreground">
                  {scale.label} ({scale.px})
                </div>
              </div>
              <div className="flex gap-2">
                <code className="text-xs bg-muted px-2 py-1 rounded">{scale.size}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard(scale.size)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Typography Features</CardTitle>
          <CardDescription>Advanced typography system capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Font Provider Options</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Google Fonts:</strong> Largest library, automatic optimization</li>
                <li>• <strong>Bunny Fonts:</strong> Privacy-focused, GDPR compliant</li>
                <li>• <strong>Local Fonts:</strong> Best performance, no external deps</li>
                <li>• <strong>System Fonts:</strong> Instant loading, native feel</li>
                <li>• Automatic fallbacks and error handling</li>
                <li>• Real-time provider switching</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-primary">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Choose provider based on privacy needs</li>
                <li>• Test font loading across devices</li>
                <li>• Consider local hosting for production</li>
                <li>• Use system fonts for maximum compatibility</li>
                <li>• Preload critical fonts for performance</li>
                <li>• Always specify fallback fonts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
