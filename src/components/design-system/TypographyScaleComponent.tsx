import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TypographyScaleComponent() {
  const typographyScale = [
    { name: "Display Large", class: "text-6xl", size: "3.75rem", lineHeight: "1", weight: "font-bold", usage: "Hero headings, major display text" },
    { name: "Display Medium", class: "text-5xl", size: "3rem", lineHeight: "1.1", weight: "font-bold", usage: "Large headings, page titles" },
    { name: "Display Small", class: "text-4xl", size: "2.25rem", lineHeight: "1.2", weight: "font-bold", usage: "Section headings" },
    { name: "Heading 1", class: "text-3xl", size: "1.875rem", lineHeight: "1.25", weight: "font-bold", usage: "Main page headings" },
    { name: "Heading 2", class: "text-2xl", size: "1.5rem", lineHeight: "1.3", weight: "font-semibold", usage: "Major section headings" },
    { name: "Heading 3", class: "text-xl", size: "1.25rem", lineHeight: "1.4", weight: "font-semibold", usage: "Sub-section headings" },
    { name: "Heading 4", class: "text-lg", size: "1.125rem", lineHeight: "1.5", weight: "font-medium", usage: "Minor headings" },
    { name: "Body Large", class: "text-lg", size: "1.125rem", lineHeight: "1.6", weight: "font-normal", usage: "Large body text, introductions" },
    { name: "Body", class: "text-base", size: "1rem", lineHeight: "1.6", weight: "font-normal", usage: "Default body text" },
    { name: "Body Small", class: "text-sm", size: "0.875rem", lineHeight: "1.5", weight: "font-normal", usage: "Secondary text, captions" },
    { name: "Caption", class: "text-xs", size: "0.75rem", lineHeight: "1.4", weight: "font-normal", usage: "Fine print, metadata" },
  ];

  const fontFamilies = [
    {
      name: "Primary Font - Inter",
      description: "Used for body text and UI components",
      class: "font-sans",
      weights: ["400 (Regular)", "500 (Medium)", "600 (Semibold)", "700 (Bold)"],
      characteristics: "Highly legible, optimized for UI"
    },
    {
      name: "Display Font - Cal Sans", 
      description: "Used for headings and display text",
      class: "font-display",
      weights: ["400 (Regular)", "600 (Semibold)", "700 (Bold)"],
      characteristics: "Friendly, approachable, distinctive"
    }
  ];

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

      {/* Font Families */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Font Families</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fontFamilies.map((font) => (
            <Card key={font.name}>
              <CardHeader>
                <CardTitle className="text-lg">{font.name}</CardTitle>
                <CardDescription>{font.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`text-2xl ${font.class}`}>
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Available weights:</div>
                  <div className="text-sm text-muted-foreground">
                    {font.weights.join(" • ")}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {font.characteristics}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Type Scale</h2>
        <div className="space-y-4">
          {typographyScale.map((type) => (
            <Card key={type.name} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  {/* Example */}
                  <div className="lg:col-span-2">
                    <div className={`${type.class} ${type.weight}`}>
                      {type.name} Example
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{type.usage}</p>
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
                      <span className="text-muted-foreground">Line Height:</span>
                      <code className="bg-muted px-2 py-1 rounded">{type.lineHeight}</code>
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