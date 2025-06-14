import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ColorPaletteComponent() {
  const colorGroups = [
    {
      name: "Brand Colors",
      colors: [
        { name: "Orange", value: "hsl(16, 100%, 50%)", css: "bg-orange", description: "Vibrant orange accent color" },
        { name: "Earth", value: "hsl(25, 12%, 14%)", css: "bg-earth", description: "Deep earth tone for contrast" },
        { name: "Cream", value: "hsl(43, 47%, 89%)", css: "bg-cream", description: "Warm neutral background" },
        { name: "Almost White", value: "hsl(210, 20%, 98%)", css: "bg-almost-white", description: "Subtle off-white tone" },
      ]
    },
    {
      name: "Primary Colors",
      colors: [
        { name: "Primary", value: "hsl(16, 100%, 50%)", css: "bg-primary", description: "Main brand color" },
        { name: "Primary Foreground", value: "hsl(210, 40%, 98%)", css: "bg-primary-foreground", description: "Text on primary background" },
      ]
    },
    {
      name: "Secondary Colors", 
      colors: [
        { name: "Secondary", value: "hsl(210, 40%, 96%)", css: "bg-secondary", description: "Secondary brand color" },
        { name: "Secondary Foreground", value: "hsl(222, 47%, 11%)", css: "bg-secondary-foreground", description: "Text on secondary background" },
      ]
    },
    {
      name: "Semantic Colors",
      colors: [
        { name: "Success", value: "hsl(160, 92%, 44%)", css: "bg-success", description: "Success states" },
        { name: "Warning", value: "hsl(49, 100%, 62%)", css: "bg-warning", description: "Warning states" },
        { name: "Destructive", value: "hsl(356, 77%, 58%)", css: "bg-destructive", description: "Error states" },
        { name: "Info", value: "hsl(196, 82%, 39%)", css: "bg-info", description: "Information states" },
      ]
    },
    {
      name: "Neutral Colors",
      colors: [
        { name: "Background", value: "hsl(0, 0%, 100%)", css: "bg-background", description: "Page background" },
        { name: "Foreground", value: "hsl(222, 84%, 5%)", css: "bg-foreground", description: "Primary text" },
        { name: "Muted", value: "hsl(210, 40%, 96%)", css: "bg-muted", description: "Subtle background" },
        { name: "Muted Foreground", value: "hsl(215, 16%, 47%)", css: "bg-muted-foreground", description: "Subtle text" },
        { name: "Border", value: "hsl(214, 32%, 91%)", css: "bg-border", description: "Default borders" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Color Palette</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Complete color system with brand, semantic, and neutral colors designed for accessibility and consistency.
        </p>
      </div>

      {/* Color Groups */}
      <div className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color) => (
                <Card key={color.name} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{color.name}</CardTitle>
                      <div 
                        className={`h-6 w-6 rounded border border-border ${color.css}`}
                        title={color.value}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription>{color.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">HSL:</span>
                        <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{color.value}</code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">CSS:</span>
                        <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{color.css}</code>
                      </div>
                    </div>
                    {/* Color swatch */}
                    <div className={`h-16 w-full rounded ${color.css} border border-border`} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for using our color system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-success">Do</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use semantic colors for their intended purpose</li>
                <li>• Maintain sufficient contrast ratios (4.5:1 minimum)</li>
                <li>• Use CSS custom properties for theming</li>
                <li>• Test colors in both light and dark modes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-destructive">Don't</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use hardcoded color values</li>
                <li>• Mix semantic meanings (e.g., red for success)</li>
                <li>• Rely solely on color to convey information</li>
                <li>• Use too many colors in a single interface</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}