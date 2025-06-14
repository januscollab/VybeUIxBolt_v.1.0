import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Figma, FileCode, User, MessageSquare, Calendar, Image as ImageIcon, Music, Video, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function SkeletonShowcase() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoading(false), 3000);
    const timer2 = setTimeout(() => setIsLoading2(false), 4000);
    const timer3 = setTimeout(() => setIsLoading3(false), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const codeExamples = {
    basic: `import { Skeleton } from "@/components/ui/skeleton";

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
    card: `<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
    list: `{Array.from({ length: 5 }).map((_, i) => (
  <div key={i} className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
))}`
  };

  const articles = [
    {
      title: "Getting Started with React",
      excerpt: "Learn the fundamentals of React and build your first component.",
      author: "John Doe",
      date: "Dec 15, 2023",
      readTime: "5 min read"
    },
    {
      title: "Advanced TypeScript Patterns",
      excerpt: "Explore advanced TypeScript patterns for better code organization.",
      author: "Jane Smith", 
      date: "Dec 14, 2023",
      readTime: "8 min read"
    },
    {
      title: "Building Responsive UIs",
      excerpt: "Master responsive design principles for modern web applications.",
      author: "Mike Johnson",
      date: "Dec 13, 2023", 
      readTime: "6 min read"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Skeleton</h1>
            <p className="text-lg text-muted-foreground">
              Loading placeholders that mimic the content structure while data is being fetched.
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
          <Badge variant="outline">Loading</Badge>
          <Badge variant="outline">Placeholder</Badge>
        </div>
      </div>

      {/* Basic Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Skeleton</CardTitle>
          <CardDescription>
            Simple skeleton components for text and circular avatars.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              {/* Profile Skeleton */}
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>

              {/* Text Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>

              {/* Button Skeleton */}
              <div className="flex space-x-2">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[80px]" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>

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

      {/* Card Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Card Skeleton</CardTitle>
          <CardDescription>
            Skeleton for card layouts with image and content placeholders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Card Skeleton Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.card)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.card}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading State Transitions</CardTitle>
          <CardDescription>
            Skeleton components that transition to real content after loading.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              
              {/* Profile Loading */}
              <div>
                <h4 className="text-sm font-medium mb-3">User Profile</h4>
                {isLoading ? (
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Sarah Wilson</h4>
                      <p className="text-sm text-muted-foreground">Product Designer</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Loading */}
              <div>
                <h4 className="text-sm font-medium mb-3">Latest Message</h4>
                {isLoading2 ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-3 w-[100px]" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      <p className="text-sm">Hey! I just finished reviewing the design mockups. They look fantastic! 🎉</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Calendar Loading */}
              <div>
                <h4 className="text-sm font-medium mb-3">Upcoming Event</h4>
                {isLoading3 ? (
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-[180px]" />
                      <Skeleton className="h-3 w-[120px]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Design Team Standup</p>
                      <p className="text-xs text-muted-foreground">Today at 2:00 PM</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={() => {
                setIsLoading(true);
                setIsLoading2(true);
                setIsLoading3(true);
                setTimeout(() => setIsLoading(false), 2000);
                setTimeout(() => setIsLoading2(false), 3000);
                setTimeout(() => setIsLoading3(false), 4000);
              }}
            >
              Reload Loading States
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Article List */}
      <Card>
        <CardHeader>
          <CardTitle>Article List Skeleton</CardTitle>
          <CardDescription>
            Complex skeleton pattern for article listings and blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              {articles.map((article, index) => (
                <div key={index} className="flex space-x-4 pb-4 border-b last:border-b-0">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">List Skeleton Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.list)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.list}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Media Skeletons */}
      <Card>
        <CardHeader>
          <CardTitle>Media Content Skeletons</CardTitle>
          <CardDescription>
            Specialized skeleton patterns for different types of media content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Image Gallery */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-center">Image Gallery</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-md" />
                  ))}
                </div>
              </div>

              {/* Video Player */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-center">Video Player</h4>
                <Skeleton className="aspect-video rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>

              {/* Music Player */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-center">Music Player</h4>
                <Skeleton className="aspect-square rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </div>

              {/* Document */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-center">Document</h4>
                <Skeleton className="aspect-[3/4] rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
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
            Best practices for skeleton loading states and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Design Principles</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Match content structure and proportions</li>
                <li>• Use consistent spacing and alignment</li>
                <li>• Implement smooth loading animations</li>
                <li>• Consider accessibility and reduced motion</li>
                <li>• Test with real data variations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep loading times reasonable (&lt; 3s)</li>
                <li>• Provide fallback for slow connections</li>
                <li>• Use progressive loading when possible</li>
                <li>• Maintain visual hierarchy</li>
                <li>• Avoid overly long skeleton lists</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}