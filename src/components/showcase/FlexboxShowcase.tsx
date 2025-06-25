
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FlexboxShowcase() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Flexbox Layouts</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Flexible box layouts for dynamic content arrangement and alignment using CSS Flexbox.
        </p>
      </div>

      {/* Basic Flex */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Flex Container</CardTitle>
          <CardDescription>Simple horizontal layout with flex items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 flex-1">
              <div className="text-sm font-medium text-blue-900">Flex Item 1</div>
              <div className="text-xs text-blue-700">flex-1</div>
            </div>
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 flex-1">
              <div className="text-sm font-medium text-green-900">Flex Item 2</div>
              <div className="text-xs text-green-700">flex-1</div>
            </div>
            <div className="bg-purple-100 border border-purple-200 rounded-lg p-4 flex-1">
              <div className="text-sm font-medium text-purple-900">Flex Item 3</div>
              <div className="text-xs text-purple-700">flex-1</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Justify Content */}
      <Card>
        <CardHeader>
          <CardTitle>Justify Content</CardTitle>
          <CardDescription>Horizontal alignment options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="text-sm font-medium">justify-start</div>
            <div className="flex justify-start gap-2 p-4 bg-slate-50 rounded-lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-blue-100 border border-blue-200 rounded-lg p-3 w-16 text-center text-xs font-medium text-blue-900">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm font-medium">justify-center</div>
            <div className="flex justify-center gap-2 p-4 bg-slate-50 rounded-lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-green-100 border border-green-200 rounded-lg p-3 w-16 text-center text-xs font-medium text-green-900">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">justify-between</div>
            <div className="flex justify-between gap-2 p-4 bg-slate-50 rounded-lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-purple-100 border border-purple-200 rounded-lg p-3 w-16 text-center text-xs font-medium text-purple-900">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Align Items */}
      <Card>
        <CardHeader>
          <CardTitle>Align Items</CardTitle>
          <CardDescription>Vertical alignment in flex containers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">items-start</div>
              <div className="flex items-start gap-2 p-4 bg-slate-50 rounded-lg h-24">
                <div className="bg-red-100 border border-red-200 rounded-lg p-2 text-xs font-medium text-red-900">A</div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-3 text-xs font-medium text-red-900">B</div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-4 text-xs font-medium text-red-900">C</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">items-center</div>
              <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-lg h-24">
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-2 text-xs font-medium text-yellow-900">A</div>
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 text-xs font-medium text-yellow-900">B</div>
                <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 text-xs font-medium text-yellow-900">C</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">items-end</div>
              <div className="flex items-end gap-2 p-4 bg-slate-50 rounded-lg h-24">
                <div className="bg-teal-100 border border-teal-200 rounded-lg p-2 text-xs font-medium text-teal-900">A</div>
                <div className="bg-teal-100 border border-teal-200 rounded-lg p-3 text-xs font-medium text-teal-900">B</div>
                <div className="bg-teal-100 border border-teal-200 rounded-lg p-4 text-xs font-medium text-teal-900">C</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flex Direction */}
      <Card>
        <CardHeader>
          <CardTitle>Flex Direction</CardTitle>
          <CardDescription>Control the direction of flex items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-sm font-medium">flex-col (Column)</div>
              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-lg">
                <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-3 text-center text-sm font-medium text-indigo-900">Item 1</div>
                <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-3 text-center text-sm font-medium text-indigo-900">Item 2</div>
                <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-3 text-center text-sm font-medium text-indigo-900">Item 3</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm font-medium">flex-row (Row)</div>
              <div className="flex flex-row gap-2 p-4 bg-slate-50 rounded-lg">
                <div className="bg-pink-100 border border-pink-200 rounded-lg p-3 flex-1 text-center text-sm font-medium text-pink-900">Item 1</div>
                <div className="bg-pink-100 border border-pink-200 rounded-lg p-3 flex-1 text-center text-sm font-medium text-pink-900">Item 2</div>
                <div className="bg-pink-100 border border-pink-200 rounded-lg p-3 flex-1 text-center text-sm font-medium text-pink-900">Item 3</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Common Flex Patterns</CardTitle>
          <CardDescription>Real-world flexbox usage examples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Pattern */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Header with Navigation</div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
                <div className="text-sm font-medium">Brand</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">Home</Button>
                <Button size="sm" variant="ghost">About</Button>
                <Button size="sm" variant="ghost">Contact</Button>
              </div>
            </div>
          </div>

          {/* Card Pattern */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Card with Actions</div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">Card Title</h3>
                  <p className="text-sm text-muted-foreground">Card description goes here</p>
                </div>
                <Button size="sm" variant="outline">Action</Button>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created 2 hours ago</span>
                <span>Updated now</span>
              </div>
            </div>
          </div>

          {/* Centered Content */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Centered Content</div>
            <div className="flex items-center justify-center p-12 bg-slate-50 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="font-medium mb-1">Empty State</h3>
                <p className="text-sm text-muted-foreground">No items to display</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Flexbox Guidelines</CardTitle>
          <CardDescription>Best practices for flexible layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">When to Use Flexbox</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Navigation bars and headers</li>
                <li>• Button groups and toolbars</li>
                <li>• Card layouts with dynamic content</li>
                <li>• Centering content vertically/horizontally</li>
                <li>• Equal height columns</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use flex-wrap for responsive behavior</li>
                <li>• Combine with CSS Grid for complex layouts</li>
                <li>• Consider flex-grow, flex-shrink, flex-basis</li>
                <li>• Test on different screen sizes</li>
                <li>• Use gap for consistent spacing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
