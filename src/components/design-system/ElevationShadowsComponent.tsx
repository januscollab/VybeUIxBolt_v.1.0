import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ElevationShadowsComponent() {
  const shadowLevels = [
    {
      name: "None",
      value: "none",
      class: "shadow-none",
      usage: "Flat elements, disabled states",
      description: "No shadow applied"
    },
    {
      name: "Small",
      value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      class: "shadow-sm",
      usage: "Subtle depth, form inputs",
      description: "Very subtle shadow for minimal elevation"
    },
    {
      name: "Medium",
      value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      class: "shadow-md",
      usage: "Cards, buttons on hover",
      description: "Standard shadow for most elevated elements"
    },
    {
      name: "Large",
      value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      class: "shadow-lg",
      usage: "Modals, popovers, dropdowns",
      description: "Strong shadow for floating elements"
    },
    {
      name: "Extra Large",
      value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      class: "shadow-xl",
      usage: "Large modals, overlays",
      description: "Very strong shadow for prominent floating elements"
    },
    {
      name: "2X Large",
      value: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      class: "shadow-2xl",
      usage: "Hero sections, major overlays",
      description: "Maximum shadow for dramatic elevation"
    }
  ];

  const elevationExamples = [
    {
      title: "Button States",
      description: "Different shadow levels for interactive states",
      examples: [
        { state: "Default", class: "shadow-sm", content: "Button" },
        { state: "Hover", class: "shadow-md", content: "Button" },
        { state: "Active", class: "shadow-sm", content: "Button" },
      ]
    },
    {
      title: "Card Hierarchy",
      description: "Using shadows to establish visual hierarchy",
      examples: [
        { state: "Base Card", class: "shadow-sm", content: "Content" },
        { state: "Featured Card", class: "shadow-md", content: "Featured" },
        { state: "Selected Card", class: "shadow-lg", content: "Selected" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Elevation & Shadows</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Box shadows and elevation system to create depth and visual hierarchy in your interfaces.
        </p>
      </div>

      {/* Shadow Levels */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shadow Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shadowLevels.map((shadow) => (
            <Card key={shadow.name} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{shadow.name}</CardTitle>
                  <code className="bg-muted px-2 py-1 rounded text-xs">{shadow.class}</code>
                </div>
                <CardDescription>{shadow.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Shadow Example */}
                <div className="bg-muted/50 p-8 rounded flex items-center justify-center">
                  <div className={`bg-background p-6 rounded-lg ${shadow.class} border border-border`}>
                    <div className="w-16 h-16 bg-primary/20 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Usage:</span> {shadow.usage}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">CSS:</span>
                    <code className="bg-muted px-2 py-1 rounded ml-2 text-xs break-all">
                      {shadow.value}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Elevation Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Elevation Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {elevationExamples.map((example) => (
            <Card key={example.title}>
              <CardHeader>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-6 rounded space-y-4">
                  {example.examples.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.state}:</span>
                      <div className={`bg-primary text-primary-foreground px-4 py-2 rounded ${item.class} transition-shadow`}>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hover Effects</CardTitle>
              <CardDescription>Shadow changes on interaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-6 rounded flex justify-center">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded shadow-sm hover:shadow-lg transition-shadow duration-200">
                  Hover Me
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Focus States</CardTitle>
              <CardDescription>Enhanced shadows for focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-6 rounded flex justify-center">
                <input 
                  type="text" 
                  placeholder="Focus me"
                  className="px-4 py-2 rounded border border-border shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Floating Elements</CardTitle>
              <CardDescription>Strong shadows for overlays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-6 rounded flex justify-center relative">
                <div className="bg-background p-4 rounded shadow-xl border border-border">
                  <div className="text-sm font-medium">Floating Panel</div>
                  <div className="text-xs text-muted-foreground">Strong elevation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Shadow Guidelines</CardTitle>
          <CardDescription>Best practices for using shadows effectively</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use shadows consistently across similar components</li>
                <li>• Increase shadow intensity with interaction</li>
                <li>• Match shadow direction with your light source</li>
                <li>• Use subtle shadows for most interface elements</li>
                <li>• Reserve strong shadows for truly floating content</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Don't rely solely on shadows for hierarchy</li>
                <li>• Ensure sufficient contrast in shadow colors</li>
                <li>• Test shadows in high contrast mode</li>
                <li>• Consider user preferences for reduced motion</li>
                <li>• Provide alternative visual cues beyond elevation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}