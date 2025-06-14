import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Copy, Figma, FileCode, Play, Image as ImageIcon, Video, Music, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AspectRatioShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { AspectRatio } from "@/components/ui/aspect-ratio";

<div className="w-[450px]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/placeholder.svg"
      alt="Image"
      className="rounded-md object-cover"
    />
  </AspectRatio>
</div>`,
    video: `<div className="w-full max-w-md">
  <AspectRatio ratio={16 / 9} className="bg-muted">
    <video
      controls
      className="h-full w-full rounded-md object-cover"
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>
  </AspectRatio>
</div>`,
    grid: `<div className="grid grid-cols-2 gap-4">
  {items.map((item) => (
    <AspectRatio key={item.id} ratio={1} className="bg-muted">
      <img
        src={item.image}
        alt={item.title}
        className="rounded-md object-cover"
      />
    </AspectRatio>
  ))}
</div>`
  };

  const commonRatios = [
    { ratio: 16/9, label: "16:9", description: "Video, landscape" },
    { ratio: 4/3, label: "4:3", description: "Traditional photo" },
    { ratio: 1, label: "1:1", description: "Square, social media" },
    { ratio: 3/2, label: "3:2", description: "Standard photo" },
    { ratio: 21/9, label: "21:9", description: "Ultra-wide" },
    { ratio: 9/16, label: "9:16", description: "Vertical, mobile" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Aspect Ratio</h1>
            <p className="text-lg text-muted-foreground">
              Display content in a specific aspect ratio with responsive behavior.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Figma
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#storybook" target="_blank" rel="noopener noreferrer">
                <FileCode className="h-4 w-4 mr-2" />
                Storybook
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Layout</Badge>
          <Badge variant="outline">Responsive</Badge>
        </div>
      </div>

      {/* Basic Aspect Ratio */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Aspect Ratio</CardTitle>
          <CardDescription>
            Simple 16:9 aspect ratio container for images and media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">16:9 Aspect Ratio</p>
                    <p className="text-xs text-muted-foreground">Perfect for video content</p>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.basic)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.basic}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Common Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>Common Aspect Ratios</CardTitle>
          <CardDescription>
            Popular aspect ratios for different types of content and use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {commonRatios.map((item, index) => (
                <div key={index} className="space-y-2">
                  <AspectRatio ratio={item.ratio} className="bg-muted rounded-md overflow-hidden">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <div className="text-center">
                        <div className="text-lg font-bold">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Media Content Examples</CardTitle>
          <CardDescription>
            Aspect ratios applied to different types of media content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Video Player */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Video Player (16:9)</h4>
                <AspectRatio ratio={16 / 9} className="bg-black rounded-md overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center text-white">
                      <Play className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Video Content</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs">LIVE</span>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* Square Image */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Profile Image (1:1)</h4>
                <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-sm font-medium">Square Image</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* Music Player */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Album Cover (1:1)</h4>
                <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <div className="text-center">
                      <Music className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium">Album Art</p>
                      <p className="text-xs text-muted-foreground">Perfect square</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* Document Preview */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Document (3:4)</h4>
                <AspectRatio ratio={3/4} className="bg-muted rounded-md overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500/20 to-red-500/20">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-2 text-orange-600" />
                      <p className="text-sm font-medium">Document</p>
                      <p className="text-xs text-muted-foreground">Portrait format</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Video Player Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.video)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.video}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Grid Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Grid Layout</CardTitle>
          <CardDescription>
            Using aspect ratios in grid layouts for consistent item sizes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <AspectRatio key={i} ratio={1} className="bg-muted rounded-md overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-1"></div>
                      <p className="text-xs font-medium">Item {i + 1}</p>
                    </div>
                  </div>
                </AspectRatio>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Grid Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.grid)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.grid}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for using aspect ratios effectively.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Use Cases</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Video players and embeds</li>
                <li>• Image galleries and thumbnails</li>
                <li>• Card layouts and previews</li>
                <li>• Social media content</li>
                <li>• Product images and catalogs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Choose ratios based on content type</li>
                <li>• Use consistent ratios in grids</li>
                <li>• Consider responsive behavior</li>
                <li>• Optimize images for target ratio</li>
                <li>• Test across different screen sizes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}