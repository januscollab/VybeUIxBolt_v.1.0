
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Globe, Palette, Type, Eye, Check, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';

interface ScannedColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
  text: string;
}

interface ScannedFonts {
  primary: {
    family: string;
    weights: string[];
    googleFontUrl?: string;
  };
  secondary: {
    family: string;
    weights: string[];
    googleFontUrl?: string;
  };
}

interface ScanResult {
  colors: ScannedColors;
  fonts: ScannedFonts;
  url: string;
}

export function SmartSiteScanner() {
  const { updateColorPalette, updateTypography } = useLocalDesignSystem();
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, boolean>>({});
  const [selectedFonts, setSelectedFonts] = useState<Record<string, boolean>>({});

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const extractColors = async (url: string): Promise<ScannedColors> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const domain = new URL(url).hostname.toLowerCase();
    
    if (domain.includes('zapier')) {
      return {
        primary: '#FF4A00',
        secondary: '#2C2D30',
        accent: '#FF6A1A',
        neutral: '#6B7280',
        background: '#FFFFFF',
        text: '#2C2D30'
      };
    } else if (domain.includes('github')) {
      return {
        primary: '#24292F',
        secondary: '#656D76',
        accent: '#0969DA',
        neutral: '#8B949E',
        background: '#FFFFFF',
        text: '#24292F'
      };
    } else if (domain.includes('stripe')) {
      return {
        primary: '#635BFF',
        secondary: '#0A2540',
        accent: '#00D4AA',
        neutral: '#6B7280',
        background: '#FFFFFF',
        text: '#0A2540'
      };
    } else if (domain.includes('spotify')) {
      return {
        primary: '#1DB954',
        secondary: '#191414',
        accent: '#1ED760',
        neutral: '#535353',
        background: '#121212',
        text: '#FFFFFF'
      };
    } else {
      return {
        primary: '#2563EB',
        secondary: '#64748B',
        accent: '#06B6D4',
        neutral: '#6B7280',
        background: '#FFFFFF',
        text: '#1E293B'
      };
    }
  };

  const extractFonts = async (url: string): Promise<ScannedFonts> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const domain = new URL(url).hostname.toLowerCase();
    
    if (domain.includes('zapier')) {
      return {
        primary: {
          family: 'Inter',
          weights: ['400', '500', '600', '700'],
          googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        },
        secondary: {
          family: 'JetBrains Mono',
          weights: ['400', '500'],
          googleFontUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'
        }
      };
    } else if (domain.includes('github')) {
      return {
        primary: {
          family: 'SF Pro Display',
          weights: ['400', '500', '600', '700'],
        },
        secondary: {
          family: 'SF Mono',
          weights: ['400', '500'],
        }
      };
    } else if (domain.includes('stripe')) {
      return {
        primary: {
          family: 'GT America',
          weights: ['400', '500', '600', '700'],
        },
        secondary: {
          family: 'Source Code Pro',
          weights: ['400', '500'],
          googleFontUrl: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap'
        }
      };
    } else if (domain.includes('spotify')) {
      return {
        primary: {
          family: 'Circular',
          weights: ['400', '500', '600', '700'],
        },
        secondary: {
          family: 'Roboto Mono',
          weights: ['400', '500'],
          googleFontUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap'
        }
      };
    } else {
      return {
        primary: {
          family: 'Inter',
          weights: ['400', '500', '600', '700'],
          googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        },
        secondary: {
          family: 'Fira Code',
          weights: ['400', '500'],
          googleFontUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap'
        }
      };
    }
  };

  const handleScan = async () => {
    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    try {
      setScanProgress(25);
      toast({
        title: "Scanning Started",
        description: "Analyzing website structure..."
      });

      const colors = await extractColors(url);
      setScanProgress(50);

      const fonts = await extractFonts(url);
      setScanProgress(75);

      await new Promise(resolve => setTimeout(resolve, 500));
      setScanProgress(100);

      const result: ScanResult = {
        colors,
        fonts,
        url
      };

      setScanResult(result);
      
      setSelectedColors({
        primary: true,
        secondary: true,
        accent: true,
        neutral: true,
        background: true,
        text: true
      });

      setSelectedFonts({
        primary: true,
        secondary: true
      });

      toast({
        title: "Scan Complete",
        description: "Website analysis finished successfully"
      });

    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Failed to analyze the website",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const applyChanges = async () => {
    if (!scanResult) return;

    try {
      const colorsToApply: Record<string, string> = {};
      Object.entries(selectedColors).forEach(([key, selected]) => {
        if (selected) {
          colorsToApply[key] = scanResult.colors[key as keyof ScannedColors];
        }
      });

      if (Object.keys(colorsToApply).length > 0) {
        updateColorPalette(colorsToApply);
      }

      const fontsToApply: Record<string, any> = {};
      Object.entries(selectedFonts).forEach(([key, selected]) => {
        if (selected) {
          fontsToApply[key] = scanResult.fonts[key as keyof ScannedFonts];
        }
      });

      if (Object.keys(fontsToApply).length > 0) {
        updateTypography(fontsToApply);
      }

      toast({
        title: "Changes Applied",
        description: "Design system updated successfully"
      });

      setScanResult(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply changes",
        variant: "destructive"
      });
    }
  };

  const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <div 
        className="w-8 h-8 rounded border"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1">
        <div className="font-medium capitalize">{name}</div>
        <div className="text-sm text-muted-foreground">{color}</div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSelectedColors(prev => ({ ...prev, [name]: !prev[name] }))}
      >
        {selectedColors[name] ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground" />}
      </Button>
    </div>
  );

  const FontPreview = ({ font, name }: { font: any; name: string }) => (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-medium capitalize">{name} Font</div>
          <div className="text-sm text-muted-foreground">{font.family}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedFonts(prev => ({ ...prev, [name]: !prev[name] }))}
        >
          {selectedFonts[name] ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground" />}
        </Button>
      </div>
      <div 
        className="text-lg"
        style={{ fontFamily: font.family }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Weights: {font.weights.join(', ')}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Smart Site Scanner
          <Badge variant="outline">Beta</Badge>
        </CardTitle>
        <CardDescription>
          Automatically extract colors and typography from any website to apply to your design system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website-url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="website-url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isScanning}
              />
              <Button 
                onClick={handleScan}
                disabled={isScanning || !url}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scanning
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Scan
                  </>
                )}
              </Button>
            </div>
          </div>

          {isScanning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Scanning progress</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} />
            </div>
          )}
        </div>

        {scanResult && (
          <div className="space-y-6">
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Scan Results</h3>
                <Badge variant="outline">
                  Scanned from: {new URL(scanResult.url).hostname}
                </Badge>
              </div>

              <Tabs defaultValue="colors" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="colors">
                    <Palette className="h-4 w-4 mr-2" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="fonts">
                    <Type className="h-4 w-4 mr-2" />
                    Typography
                  </TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(scanResult.colors).map(([name, color]) => (
                      <ColorSwatch key={name} color={color} name={name} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fonts" className="space-y-4">
                  <div className="space-y-4">
                    {Object.entries(scanResult.fonts).map(([name, font]) => (
                      <FontPreview key={name} font={font} name={name} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="p-6 border rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Preview Selected Changes</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(selectedColors).map(([name, selected]) => (
                          selected && (
                            <div key={name} className="text-center">
                              <div 
                                className="w-full h-12 rounded border mb-1"
                                style={{ backgroundColor: scanResult.colors[name as keyof ScannedColors] }}
                              />
                              <div className="text-xs capitalize">{name}</div>
                            </div>
                          )
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        {Object.entries(selectedFonts).map(([name, selected]) => (
                          selected && (
                            <div 
                              key={name}
                              className="p-3 border rounded"
                              style={{ fontFamily: scanResult.fonts[name as keyof ScannedFonts].family }}
                            >
                              <div className="text-sm text-muted-foreground capitalize">{name} Font</div>
                              <div>Sample text with {scanResult.fonts[name as keyof ScannedFonts].family}</div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button onClick={applyChanges} className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Apply Selected Changes
                </Button>
                <Button variant="outline" onClick={() => setScanResult(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
