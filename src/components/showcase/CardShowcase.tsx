import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Share, MessageCircle, MoreHorizontal, Star, Calendar, MapPin, Clock } from "lucide-react";

export default function CardShowcase() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Card Components</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Flexible card components for organizing content with headers, content areas, and actions.
        </p>
      </div>

      {/* Basic Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Card Layouts</CardTitle>
          <CardDescription>Different card structures for various content types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Simple Card */}
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>Basic card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a simple card component with just a header and content area.
                </p>
              </CardContent>
            </Card>

            {/* Card with Footer */}
            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Card including a footer section</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card includes a footer section for actions or additional information.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            {/* Content Only Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Content Only</h3>
                  <p className="text-sm text-muted-foreground">
                    Sometimes you just need content without a formal header structure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Cards</CardTitle>
          <CardDescription>Cards with user interactions and actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Media Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">@johndoe</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Just shipped a new feature! Really excited about how this turned out. 
                  Thanks to the amazing team for making this possible. 🚀
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  24
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  8
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>

            {/* Product Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Product Image</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Product Name</h3>
                      <Badge variant="secondary">New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      High-quality product with amazing features and great value.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">$299</p>
                      <p className="text-sm text-muted-foreground line-through">$399</p>
                    </div>
                    <Button>Add to Cart</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Stats & Metrics Cards</CardTitle>
          <CardDescription>Cards for displaying key metrics and statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">$45,231</p>
                    <p className="text-xs text-green-600">+20.1% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">New Users</p>
                    <p className="text-2xl font-bold">2,345</p>
                    <p className="text-xs text-green-600">+15.3% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-xs text-red-600">-2.4% from last hour</p>
                  </div>
                  <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Locations</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Across 3 countries</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Implementation examples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Basic Card</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Stats Card</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<Card>
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Metric</p>
        <p className="text-2xl font-bold">$45,231</p>
        <p className="text-xs text-green-600">+20.1% from last month</p>
      </div>
      <Icon className="h-6 w-6" />
    </div>
  </CardContent>
</Card>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}