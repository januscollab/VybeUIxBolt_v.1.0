
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useFontManager } from "@/hooks/useFontManager";

export default function TypographyScaleComponent() {
  const { 
    primaryFont, 
    secondaryFont, 
    updatePrimaryFont, 
    updateSecondaryFont, 
    resetToDefaults, 
    availableFonts 
  } = useFontManager();

  const typographyScale = [
    { name: "Display Large", class: "text-6xl", size: "3.75rem", lineHeight: "1", weight: "font-bold", font: "font-primary", usage: "Hero headings for major impact", example: "Beautiful Design Systems Made Simple" },
    { name: "Display Medium", class: "text-5xl", size: "3rem", lineHeight: "1.1", weight: "font-bold", font: "font-primary", usage: "Large section headers", example: "Connect your entire tech stack" },
    { name: "Display Small", class: "text-4xl", size: "2.25rem", lineHeight: "1.2", weight: "font-bold", font: "font-primary", usage: "Page titles and major headings", example: "Streamlined component library" },
    { name: "Heading 1", class: "text-3xl", size: "1.875rem", lineHeight: "1.25", weight: "font-bold", font: "font-primary", usage: "Main section headings", example: "Get started with VybeUI" },
    { name: "Heading 2", class: "text-2xl", size: "1.5rem", lineHeight: "1.3", weight: "font-semibold", font: "font-primary", usage: "Sub-section headings", example: "Popular workflow templates" },
    { name: "Heading 3", class: "text-xl", size: "1.25rem", lineHeight: "1.4", weight: "font-semibold", font: "font-primary", usage: "Card titles and smaller headings", example: "Email to Slack notifications" },
    { name: "Heading 4", class: "text-lg", size: "1.125rem", lineHeight: "1.5", weight: "font-medium", font: "font-primary", usage: "Minor headings and labels", example: "Trigger: When someone subscribes" },
    { name: "Body Large", class: "text-lg", size: "1.125rem", lineHeight: "1.6", weight: "font-normal", font: "font-secondary", usage: "Introductory text and highlights", example: "Beautiful, accessible components for modern web applications. VybeUI provides a comprehensive design system to accelerate your development workflow." },
    { name: "Body", class: "text-base", size: "1rem", lineHeight: "1.6", weight: "font-normal", font: "font-secondary", usage: "Default body text", example: "Build stunning interfaces with our complete component library. Trusted by developers worldwide to create consistent, accessible user experiences." },
    { name: "Body Small", class: "text-sm", size: "0.875rem", lineHeight: "1.5", weight: "font-normal", font: "font-secondary", usage: "Secondary text, captions, metadata", example: "Last updated: 2 hours ago • Created by John Smith" },
    { name: "Caption", class: "text-xs", size: "0.75rem", lineHeight: "1.4", weight: "font-normal", font: "font-secondary", usage: "Fine print, helper text, timestamps", example: "By connecting your account, you agree to our Terms of Service" },
  ];

  const getFontStyle = (fontType: string) => {
    if (fontType === "font-primary") {
      return { fontFamily: `var(--font-primary)` };
    }
    return { fontFamily: `var(--font-secondary)` };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Typography Scale</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Font families, sizes, and typographic hierarchy designed for clarity and consistency across all interfaces.
        </p>
      </div>

      {/* Font Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Font Selection</CardTitle>
          <CardDescription>
            Choose your primary and secondary fonts to customize the entire design system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Font (Headings)</label>
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
              <p className="text-xs text-muted-foreground">Used for headings and emphasis</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary Font (Body Text)</label>
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
              <p className="text-xs text-muted-foreground">Used for body text and interface elements</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Current: <span className="font-medium">{primaryFont}</span> + <span className="font-medium">{secondaryFont}</span>
            </div>
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Typography Scale */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Live Type Scale Preview</h2>
        <div className="space-y-4">
          {typographyScale.map((type) => (
            <Card key={type.name} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  {/* Example */}
                  <div className="lg:col-span-2">
                    <div 
                      className={`${type.class} ${type.weight}`}
                      style={getFontStyle(type.font)}
                    >
                      {type.example}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1" style={getFontStyle("font-secondary")}>
                      {type.usage}
                    </p>
                  </div>
                  
                  {/* Specifications */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <code className="bg-muted px-2 py-1 rounded">{type.size}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class:</span>
                      <code className="bg-muted px-2 py-1 rounded">{type.class}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <code className="bg-muted px-2 py-1 rounded">{type.weight}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Font:</span>
                      <code className="bg-muted px-2 py-1 rounded">
                        {type.font === "font-primary" ? primaryFont : secondaryFont}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Guidelines</CardTitle>
          <CardDescription>Best practices for typography in our design system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use heading hierarchy to structure content</li>
                <li>• Maintain consistent line spacing</li>
                <li>• Limit line length to 45-75 characters</li>
                <li>• Use sufficient contrast for readability</li>
                <li>• Test across different screen sizes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Minimum 16px font size for body text</li>
                <li>• 4.5:1 contrast ratio for normal text</li>
                <li>• 3:1 contrast ratio for large text (18px+)</li>
                <li>• Support browser zoom up to 200%</li>
                <li>• Don't rely on font styling alone for meaning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
