import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpacingSystemComponent() {
  const spacingScale = [
    { name: "0", value: "0px", class: "p-0", token: "--spacing-0", usage: "No spacing" },
    { name: "1", value: "2px", class: "p-0.5", token: "--spacing-1", usage: "Minimal spacing" },
    { name: "2", value: "4px", class: "p-1", token: "--spacing-2", usage: "Very tight spacing" },
    { name: "3", value: "8px", class: "p-2", token: "--spacing-3", usage: "Tight spacing" },
    { name: "4", value: "12px", class: "p-3", token: "--spacing-4", usage: "Small spacing" },
    { name: "5", value: "16px", class: "p-4", token: "--spacing-5", usage: "Base spacing unit" },
    { name: "6", value: "20px", class: "p-5", token: "--spacing-6", usage: "Medium spacing" },
    { name: "7", value: "24px", class: "p-6", token: "--spacing-7", usage: "Large spacing" },
    { name: "8", value: "32px", class: "p-8", token: "--spacing-8", usage: "Extra large spacing" },
    { name: "9", value: "40px", class: "p-10", token: "--spacing-9", usage: "Section spacing" },
    { name: "10", value: "48px", class: "p-12", token: "--spacing-10", usage: "Layout spacing" },
    { name: "11", value: "64px", class: "p-16", token: "--spacing-11", usage: "Large layout spacing" },
    { name: "12", value: "80px", class: "p-20", token: "--spacing-12", usage: "Extra large layout" },
    { name: "13", value: "96px", class: "p-24", token: "--spacing-13", usage: "Major section spacing" },
    { name: "14", value: "128px", class: "p-32", token: "--spacing-14", usage: "Page-level spacing" },
  ];

  const spacingTypes = [
    {
      name: "Padding",
      description: "Internal spacing within components",
      examples: [
        { class: "p-4", description: "All sides padding" },
        { class: "px-4", description: "Horizontal padding" },
        { class: "py-4", description: "Vertical padding" },
        { class: "pt-4", description: "Top padding" },
        { class: "pr-4", description: "Right padding" },
        { class: "pb-4", description: "Bottom padding" },
        { class: "pl-4", description: "Left padding" },
      ]
    },
    {
      name: "Margin",
      description: "External spacing between components",
      examples: [
        { class: "m-4", description: "All sides margin" },
        { class: "mx-4", description: "Horizontal margin" },
        { class: "my-4", description: "Vertical margin" },
        { class: "mt-4", description: "Top margin" },
        { class: "mr-4", description: "Right margin" },
        { class: "mb-4", description: "Bottom margin" },
        { class: "ml-4", description: "Left margin" },
      ]
    },
    {
      name: "Gap",
      description: "Spacing in flexbox and grid layouts",
      examples: [
        { class: "gap-4", description: "All directions gap" },
        { class: "gap-x-4", description: "Horizontal gap" },
        { class: "gap-y-4", description: "Vertical gap" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Spacing System</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Consistent spacing scale and layout primitives that create rhythm and hierarchy in your designs.
        </p>
      </div>

      {/* Spacing Scale */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Spacing Scale</h2>
        <div className="space-y-3">
          {spacingScale.map((spacing) => (
            <Card key={spacing.name} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Visual Example */}
                  <div className="flex items-center justify-center">
                    <div className="bg-muted rounded flex items-center justify-center min-h-[60px]">
                      <div 
                        className="bg-primary rounded"
                        style={{ width: spacing.value, height: spacing.value, minWidth: '4px', minHeight: '4px' }}
                      />
                    </div>
                  </div>
                  
                  {/* Name & Value */}
                  <div>
                    <div className="font-medium">{spacing.name}</div>
                    <div className="text-sm text-muted-foreground">{spacing.value}</div>
                  </div>
                  
                  {/* Class */}
                  <div>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{spacing.class}</code>
                  </div>
                  
                  {/* Usage */}
                  <div className="text-sm text-muted-foreground">
                    {spacing.usage}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Spacing Types */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Spacing Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spacingTypes.map((type) => (
            <Card key={type.name}>
              <CardHeader>
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {type.examples.map((example, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <code className="bg-muted px-2 py-1 rounded text-sm">{example.class}</code>
                    <span className="text-sm text-muted-foreground">{example.description}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Layout Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Layout Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Card with Standard Spacing</CardTitle>
              <CardDescription>Using p-6 for internal spacing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-6 rounded">
                <div className="bg-background p-4 rounded space-y-3">
                  <div className="h-4 bg-primary/20 rounded"></div>
                  <div className="h-3 bg-primary/10 rounded w-3/4"></div>
                  <div className="h-3 bg-primary/10 rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stack with Gap</CardTitle>
              <CardDescription>Using gap-4 for consistent spacing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-6 rounded">
                <div className="flex flex-col gap-4">
                  <div className="h-8 bg-primary/20 rounded"></div>
                  <div className="h-8 bg-primary/20 rounded"></div>
                  <div className="h-8 bg-primary/20 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Guidelines</CardTitle>
          <CardDescription>Best practices for consistent spacing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use the spacing scale consistently</li>
                <li>• Start with 16px (spacing-5) as your base unit</li>
                <li>• Use larger spacing for major sections</li>
                <li>• Maintain consistent spacing between similar elements</li>
                <li>• Use gap for flex and grid layouts</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Common Patterns</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Cards: p-6 for internal spacing</li>
                <li>• Sections: mb-8 or mb-12 between sections</li>
                <li>• Lists: gap-4 or gap-6 for list items</li>
                <li>• Forms: gap-4 between form fields</li>
                <li>• Buttons: px-4 py-2 for standard buttons</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}