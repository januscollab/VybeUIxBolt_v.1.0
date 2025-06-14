import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Copy, Figma, FileCode, User, MessageSquare, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ScrollAreaShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const longText = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  const messages = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    user: `User ${i + 1}`,
    message: `This is message number ${i + 1}. Lorem ipsum dolor sit amet consectetur.`,
    timestamp: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`
  }));

  const codeExamples = {
    basic: `import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <div key={tag} className="text-sm">
        {tag}
      </div>
    ))}
  </div>
</ScrollArea>`,
    horizontal: `<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {images.map((image) => (
      <figure key={image} className="shrink-0">
        <div className="overflow-hidden rounded-md">
          <img
            src={image}
            alt="Photo"
            className="aspect-[3/4] h-fit w-fit object-cover"
            width={300}
            height={400}
          />
        </div>
      </figure>
    ))}
  </div>
</ScrollArea>`,
    chat: `<ScrollArea className="h-96 w-full rounded-md border p-4">
  {messages.map((message) => (
    <div key={message.id} className="mb-4">
      <div className="flex items-center space-x-2">
        <h4 className="text-sm font-semibold">{message.user}</h4>
        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
      </div>
      <p className="text-sm text-muted-foreground">{message.content}</p>
    </div>
  ))}
</ScrollArea>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Scroll Area</h1>
            <p className="text-lg text-muted-foreground">
              Customizable scrollable area with styled scrollbars for content overflow.
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
          <Badge variant="outline">Scroll</Badge>
        </div>
      </div>

      {/* Basic Scroll Area */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Scroll Area</CardTitle>
          <CardDescription>
            Simple vertical scroll area with a list of items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <ScrollArea className="h-72 w-48 rounded-md border">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">Items</h4>
                  {longText.map((item, index) => (
                    <div key={index}>
                      <div className="text-sm py-1">{item}</div>
                      {index < longText.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
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

      {/* Horizontal Scroll */}
      <Card>
        <CardHeader>
          <CardTitle>Horizontal Scroll Area</CardTitle>
          <CardDescription>
            Horizontal scrolling area for wide content like image galleries.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ScrollArea className="w-96 whitespace-nowrap rounded-md border mx-auto">
              <div className="flex w-max space-x-4 p-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <figure key={i} className="shrink-0">
                    <div className="overflow-hidden rounded-md bg-muted">
                      <div className="aspect-[3/4] h-fit w-32 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                        <Star className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <figcaption className="pt-2 text-xs text-muted-foreground text-center">
                      Image {i + 1}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Horizontal Scroll Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.horizontal)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.horizontal}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Chat Interface Scroll</CardTitle>
          <CardDescription>
            Scroll area optimized for chat interfaces with message history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <ScrollArea className="h-96 w-full rounded-md border p-4 bg-background">
                {messages.map((message, index) => (
                  <div key={message.id} className="mb-4 last:mb-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <h4 className="text-sm font-semibold">{message.user}</h4>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <div className="ml-8">
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MessageSquare className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Reply</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Forward</span>
                      </div>
                    </div>
                    {index < messages.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Chat Scroll Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.chat)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.chat}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for scroll area usage and performance optimization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Custom styled scrollbars</li>
                <li>• Cross-browser compatibility</li>
                <li>• Horizontal and vertical scrolling</li>
                <li>• Touch-friendly on mobile</li>
                <li>• Keyboard navigation support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Set explicit height/width</li>
                <li>• Use virtualization for large lists</li>
                <li>• Consider scroll position persistence</li>
                <li>• Provide scroll indicators when needed</li>
                <li>• Test on different devices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}