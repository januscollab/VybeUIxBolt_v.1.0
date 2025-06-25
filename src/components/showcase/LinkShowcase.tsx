
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Figma, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function LinkShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExample = `<a 
  href="https://example.com" 
  className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
>
  Visit our website
</a>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Link</h1>
            <p className="text-lg text-muted-foreground">
              Navigation links with consistent styling and accessibility.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Figma
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Navigation</Badge>
        </div>
      </div>

      {/* Basic Links */}
      <Card>
        <CardHeader>
          <CardTitle>Link Variants</CardTitle>
          <CardDescription>
            Different link styles for various use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-6">
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  Primary Link
                </a>
                
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  Subtle Link
                </a>
                
                <a 
                  href="#" 
                  className="text-destructive hover:text-destructive/80 underline-offset-4 hover:underline"
                >
                  Destructive Link
                </a>
                
                <a 
                  href="#" 
                  className="text-foreground hover:text-primary underline-offset-4 hover:underline font-medium"
                >
                  Bold Link
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExample)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExample}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Link with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Links with Icons</CardTitle>
          <CardDescription>
            Links enhanced with icons for better context.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  External Link
                </a>
                
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  Continue Reading
                  <ArrowRight className="h-4 w-4" />
                </a>
                
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Live Documentation
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
