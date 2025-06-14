import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Copy, Figma, FileCode, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, Link, Image, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Heart, Star, Bookmark, ThumbsUp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ToggleShowcase() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [formatting, setFormatting] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(true);
  const [visibility, setVisibility] = useState("visible");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

const [isBold, setIsBold] = useState(false);

<Toggle pressed={isBold} onPressedChange={setIsBold}>
  <Bold className="h-4 w-4" />
</Toggle>`,
    group: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

<ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
  <ToggleGroupItem value="left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
    multiple: `<ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
  <ToggleGroupItem value="bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Toggle</h1>
            <p className="text-lg text-muted-foreground">
              Toggle buttons for binary states and toggle groups for multiple selections.
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
          <Badge variant="outline">Interactive</Badge>
          <Badge variant="outline">Selection</Badge>
        </div>
      </div>

      {/* Basic Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Toggle</CardTitle>
          <CardDescription>
            Simple toggle buttons for binary on/off states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <Toggle pressed={isBold} onPressedChange={setIsBold}>
                  <Bold className="h-4 w-4" />
                </Toggle>
                <span className="text-xs text-muted-foreground">Bold</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Toggle pressed={isItalic} onPressedChange={setIsItalic}>
                  <Italic className="h-4 w-4" />
                </Toggle>
                <span className="text-xs text-muted-foreground">Italic</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Toggle pressed={isBookmarked} onPressedChange={setIsBookmarked}>
                  <Bookmark className="h-4 w-4" />
                </Toggle>
                <span className="text-xs text-muted-foreground">Bookmark</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Toggle pressed={isLiked} onPressedChange={setIsLiked}>
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Toggle>
                <span className="text-xs text-muted-foreground">Like</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                States: Bold: {isBold ? 'On' : 'Off'}, Italic: {isItalic ? 'On' : 'Off'}, 
                Bookmarked: {isBookmarked ? 'Yes' : 'No'}, Liked: {isLiked ? 'Yes' : 'No'}
              </p>
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

      {/* Toggle Group - Single */}
      <Card>
        <CardHeader>
          <CardTitle>Toggle Group - Single Selection</CardTitle>
          <CardDescription>
            Toggle group allowing only one selection at a time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              {/* Text Alignment */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Text Alignment</h4>
                <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-xs text-muted-foreground">Selected: {alignment || 'None'}</p>
              </div>

              {/* Visibility */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Visibility</h4>
                <ToggleGroup type="single" value={visibility} onValueChange={setVisibility}>
                  <ToggleGroupItem value="visible" aria-label="Visible">
                    <Eye className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="hidden" aria-label="Hidden">
                    <EyeOff className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-xs text-muted-foreground">Visibility: {visibility}</p>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Single Group Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.group)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.group}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Toggle Group - Multiple */}
      <Card>
        <CardHeader>
          <CardTitle>Toggle Group - Multiple Selection</CardTitle>
          <CardDescription>
            Toggle group allowing multiple selections simultaneously.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              {/* Text Formatting */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Text Formatting</h4>
                <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
                  <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="code" aria-label="Code">
                    <Code className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-xs text-muted-foreground">
                  Active: {formatting.length > 0 ? formatting.join(', ') : 'None'}
                </p>
              </div>

              {/* Editor Tools */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Editor Tools</h4>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="list" aria-label="Bullet list">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="ordered" aria-label="Numbered list">
                    <ListOrdered className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="quote" aria-label="Quote">
                    <Quote className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="link" aria-label="Link">
                    <Link className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="image" aria-label="Image">
                    <Image className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Multiple Group Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.multiple)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.multiple}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Media Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Media Controls</CardTitle>
          <CardDescription>
            Toggle buttons for media player controls and states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              {/* Playback Controls */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Playback Controls</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Toggle 
                    pressed={isPlaying} 
                    onPressedChange={setIsPlaying}
                    size="lg"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Toggle>
                  <Button variant="outline" size="icon">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <div className="mx-2 h-6 w-px bg-border" />
                  <Toggle pressed={volume} onPressedChange={setVolume}>
                    {volume ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Toggle>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isPlaying ? 'Playing' : 'Paused'} • Volume {volume ? 'On' : 'Off'}
                </p>
              </div>

              {/* Toolbar Actions */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Toolbar Actions</h4>
                <div className="flex items-center gap-1">
                  <Toggle size="sm">
                    <Star className="h-3 w-3" />
                  </Toggle>
                  <Toggle size="sm">
                    <Heart className="h-3 w-3" />
                  </Toggle>
                  <Toggle size="sm">
                    <Bookmark className="h-3 w-3" />
                  </Toggle>
                  <div className="mx-1 h-4 w-px bg-border" />
                  <Toggle size="sm">
                    <ThumbsUp className="h-3 w-3" />
                  </Toggle>
                </div>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toggle Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Toggle Variants</CardTitle>
          <CardDescription>
            Different sizes and styles of toggle components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              {/* Sizes */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Sizes</h4>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Toggle size="sm" pressed>
                      <Bold className="h-3 w-3" />
                    </Toggle>
                    <span className="text-xs text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Toggle size="default" pressed>
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <span className="text-xs text-muted-foreground">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Toggle size="lg" pressed>
                      <Bold className="h-5 w-5" />
                    </Toggle>
                    <span className="text-xs text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>

              {/* Variants */}
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-sm font-medium">Variants</h4>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Toggle variant="default" pressed>
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <span className="text-xs text-muted-foreground">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Toggle variant="outline" pressed>
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <span className="text-xs text-muted-foreground">Outline</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for toggle components and user interactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation support</li>
                <li>• Single and multiple selection modes</li>
                <li>• Customizable sizes and variants</li>
                <li>• Accessible ARIA attributes</li>
                <li>• Smooth state transitions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, recognizable icons</li>
                <li>• Provide immediate visual feedback</li>
                <li>• Group related toggles together</li>
                <li>• Consider default states carefully</li>
                <li>• Test with keyboard navigation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}