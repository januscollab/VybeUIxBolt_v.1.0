
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GridSystemShowcase() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Grid System</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Responsive grid layouts built with CSS Grid and Tailwind CSS for structured content organization.
        </p>
      </div>

      {/* Basic Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Grid Layout</CardTitle>
          <CardDescription>Simple responsive grid with equal columns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                <div className="text-sm font-medium">Grid Item {i + 1}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Grid Layout</CardTitle>
          <CardDescription>Complex grid with spanning and different sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:col-span-2 lg:col-span-3">
              <div className="text-sm font-medium text-blue-900">Hero Section</div>
              <div className="text-xs text-blue-700 mt-1">Spans 3 columns</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:col-span-2 lg:col-span-2">
              <div className="text-sm font-medium text-green-900">Content</div>
              <div className="text-xs text-green-700 mt-1">Spans 2 columns</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 lg:col-span-1">
              <div className="text-sm font-medium text-purple-900">Sidebar</div>
              <div className="text-xs text-purple-700 mt-1">1 column</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 md:col-span-4 lg:col-span-6">
              <div className="text-sm font-medium text-orange-900">Footer</div>
              <div className="text-xs text-orange-700 mt-1">Full width</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Named Grid Areas</CardTitle>
          <CardDescription>Layout using named grid template areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 min-h-[300px]" style={{
            gridTemplateAreas: `
              "header header header"
              "sidebar main aside"
              "footer footer footer"
            `,
            gridTemplateColumns: "200px 1fr 150px",
            gridTemplateRows: "auto 1fr auto"
          }}>
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 flex items-center justify-center" style={{ gridArea: "header" }}>
              <span className="font-medium">Header</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-center" style={{ gridArea: "sidebar" }}>
              <span className="font-medium text-blue-900">Sidebar</span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center" style={{ gridArea: "main" }}>
              <span className="font-medium text-green-900">Main Content</span>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-center" style={{ gridArea: "aside" }}>
              <span className="font-medium text-purple-900">Aside</span>
            </div>
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 flex items-center justify-center" style={{ gridArea: "footer" }}>
              <span className="font-medium">Footer</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Grid Breakpoints</CardTitle>
          <CardDescription>Grid adapts to different screen sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-3 text-center">
                  <div className="text-xs font-medium text-indigo-900">{i + 1}</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Mobile: 1 column</p>
              <p>• Small: 2 columns</p>
              <p>• Medium: 3 columns</p>
              <p>• Large: 4 columns</p>
              <p>• Extra Large: 6 columns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Grid Guidelines</CardTitle>
          <CardDescription>Best practices for grid layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use consistent gap spacing</li>
                <li>• Plan for mobile-first responsive design</li>
                <li>• Consider content hierarchy</li>
                <li>• Use semantic grid areas when appropriate</li>
                <li>• Test across different screen sizes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Common Patterns</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 12-column system for complex layouts</li>
                <li>• Card grids for content displays</li>
                <li>• Sidebar + main content layouts</li>
                <li>• Dashboard grid arrangements</li>
                <li>• Image gallery grids</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
