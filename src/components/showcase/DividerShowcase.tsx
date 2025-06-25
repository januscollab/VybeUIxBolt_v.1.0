
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Figma } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function DividerShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExample = `<div className="space-y-4">
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Divider</h1>
            <p className="text-lg text-muted-foreground">
              Visually or semantically separates content.
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
          <Badge variant="outline">Layout</Badge>
        </div>
      </div>

      {/* Basic Divider */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Divider</CardTitle>
          <CardDescription>
            Simple horizontal and vertical separators for content organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <p className="text-sm">Content section one</p>
              <Separator />
              <p className="text-sm">Content section two</p>
              <Separator />
              <p className="text-sm">Content section three</p>
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
    </div>
  );
}
