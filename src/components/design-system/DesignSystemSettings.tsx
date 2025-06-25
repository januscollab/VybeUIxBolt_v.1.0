
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Type, RotateCcw, Monitor, Smartphone } from "lucide-react";
import { useFontManager } from "@/hooks/useFontManager";
import { useLayoutView } from "@/hooks/useLayoutView";
import { toast } from "@/hooks/use-toast";

export function DesignSystemSettings() {
  const {
    primaryFont,
    secondaryFont,
    updatePrimaryFont,
    updateSecondaryFont,
    resetToDefaults,
    availableFonts
  } = useFontManager();

  const { viewMode, isDesignSystemView, toggleViewMode } = useLayoutView();

  const handleResetFonts = () => {
    resetToDefaults();
    toast({
      title: "Fonts Reset",
      description: "Primary and secondary fonts have been reset to Poppins and Inter.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Layout Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Layout Settings
          </CardTitle>
          <CardDescription>
            Configure how your design system is displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>View Mode</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={isDesignSystemView ? "default" : "outline"}
                size="sm"
                onClick={toggleViewMode}
                className="flex items-center gap-2"
              >
                <Smartphone className="h-4 w-4" />
                Design System View (80%)
              </Button>
              <Button
                variant={!isDesignSystemView ? "default" : "outline"}
                size="sm"
                onClick={toggleViewMode}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                Full Width View (100%)
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {isDesignSystemView 
                ? "Components are displayed in an 80% width container to match real-world usage"
                : "Components are displayed at full width for detailed inspection"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Font Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Typography Settings
          </CardTitle>
          <CardDescription>
            Customize the fonts used throughout your design system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-font">Primary Font</Label>
              <Select value={primaryFont} onValueChange={updatePrimaryFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground" style={{ fontFamily: primaryFont }}>
                Preview: The quick brown fox jumps over the lazy dog
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-font">Secondary Font</Label>
              <Select value={secondaryFont} onValueChange={updateSecondaryFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground" style={{ fontFamily: secondaryFont }}>
                Preview: The quick brown fox jumps over the lazy dog
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Current Configuration</Label>
              <div className="flex gap-2">
                <Badge variant="secondary">Primary: {primaryFont}</Badge>
                <Badge variant="secondary">Secondary: {secondaryFont}</Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFonts}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
