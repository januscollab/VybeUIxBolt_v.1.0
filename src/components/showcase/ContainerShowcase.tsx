
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { CodeModal } from "@/components/ui/code-modal";

export default function ContainerShowcase() {
  const basicContainerCode = `<div className="container mx-auto px-4">
  <h2 className="text-2xl font-bold mb-4">Container Content</h2>
  <p>This content is contained within a responsive container.</p>
</div>`;

  const fluidContainerCode = `<div className="w-full px-4">
  <h2 className="text-2xl font-bold mb-4">Fluid Container</h2>
  <p>This container takes the full width of its parent.</p>
</div>`;

  const constrainedContainerCode = `<div className="max-w-4xl mx-auto px-4">
  <h2 className="text-2xl font-bold mb-4">Constrained Container</h2>
  <p>This container has a maximum width constraint.</p>
</div>`;

  const sectionContainerCode = `<section className="py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Section Container</h2>
      <p className="text-lg text-muted-foreground">
        Perfect for page sections with centered content.
      </p>
    </div>
  </div>
</section>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Container</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Responsive layout containers that provide consistent spacing and maximum widths across different screen sizes.
        </p>
      </div>

      {/* Basic Container */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Basic Container</CardTitle>
              <CardDescription>Standard container with responsive max-width</CardDescription>
            </div>
            <CodeModal title="Basic Container" code={basicContainerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
            <div className="container mx-auto px-4 bg-muted/50 rounded p-4">
              <h2 className="text-2xl font-bold mb-4">Container Content</h2>
              <p>This content is contained within a responsive container.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fluid Container */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fluid Container</CardTitle>
              <CardDescription>Full-width container that spans the entire viewport</CardDescription>
            </div>
            <CodeModal title="Fluid Container" code={fluidContainerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
            <div className="w-full px-4 bg-muted/50 rounded p-4">
              <h2 className="text-2xl font-bold mb-4">Fluid Container</h2>
              <p>This container takes the full width of its parent.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Constrained Container */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Constrained Container</CardTitle>
              <CardDescription>Container with a specific maximum width</CardDescription>
            </div>
            <CodeModal title="Constrained Container" code={constrainedContainerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
            <div className="max-w-4xl mx-auto px-4 bg-muted/50 rounded p-4">
              <h2 className="text-2xl font-bold mb-4">Constrained Container</h2>
              <p>This container has a maximum width constraint.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Container */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Section Container</CardTitle>
              <CardDescription>Container designed for page sections</CardDescription>
            </div>
            <CodeModal title="Section Container" code={sectionContainerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <section className="py-16 bg-muted/20">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Section Container</h2>
                  <p className="text-lg text-muted-foreground">
                    Perfect for page sections with centered content.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      {/* Container Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Container Sizes</CardTitle>
          <CardDescription>Different container breakpoints and their max-widths</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="font-mono text-sm">sm (640px)</span>
                <span className="text-sm text-muted-foreground">Mobile and small tablets</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="font-mono text-sm">md (768px)</span>
                <span className="text-sm text-muted-foreground">Tablets</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="font-mono text-sm">lg (1024px)</span>
                <span className="text-sm text-muted-foreground">Small desktops</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="font-mono text-sm">xl (1280px)</span>
                <span className="text-sm text-muted-foreground">Large desktops</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="font-mono text-sm">2xl (1536px)</span>
                <span className="text-sm text-muted-foreground">Extra large screens</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
