import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Heart, Star, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function InteractionStatesComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const stateCategories = [
    {
      name: "Base States",
      description: "Default, hover, focus, and active states for all interactive elements",
      examples: [
        {
          title: "Button States",
          component: (
            <div className="space-y-3">
              <Button className="w-full">Default State</Button>
              <Button className="w-full hover:bg-primary/90">Hover State</Button>
              <Button className="w-full focus:ring-2 focus:ring-primary/20">Focus State</Button>
              <Button className="w-full active:scale-95">Active State</Button>
            </div>
          )
        },
        {
          title: "Input States",
          component: (
            <div className="space-y-3">
              <Input placeholder="Default input" />
              <Input placeholder="Focused input" className="ring-2 ring-primary/20" />
              <Input placeholder="Error input" className="border-destructive focus:border-destructive" />
              <Input placeholder="Disabled input" disabled />
            </div>
          )
        }
      ]
    },
    {
      name: "Loading States",
      description: "Various loading patterns for different UI contexts",
      examples: [
        {
          title: "Button Loading",
          component: (
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Start Process'
                )}
              </Button>
              <Progress value={isLoading ? undefined : 0} className="w-full" />
            </div>
          )
        },
        {
          title: "Skeleton Loading",
          component: (
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </div>
              </div>
              <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
          )
        }
      ]
    },
    {
      name: "Toggle States",
      description: "On/off states for switches, checkboxes, and toggles",
      examples: [
        {
          title: "Interactive Controls",
          component: (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <RadioGroup defaultValue="option-one" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option 2</Label>
                </div>
              </RadioGroup>
            </div>
          )
        },
        {
          title: "Custom Toggles",
          component: (
            <div className="space-y-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={() => setIsLiked(!isLiked)}
                className="w-full"
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star 
                      className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                ))}
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: "Media States",
      description: "Play, pause, and media control states",
      examples: [
        {
          title: "Media Controls",
          component: (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="flex-1">
                  <Progress value={isPlaying ? 65 : 0} className="w-full" />
                </div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {isPlaying ? 'Now Playing' : 'Paused'} • {isMuted ? 'Muted' : 'Volume On'}
              </div>
            </div>
          )
        }
      ]
    },
    {
      name: "Validation States",
      description: "Success, error, and warning states for form validation",
      examples: [
        {
          title: "Form Validation",
          component: (
            <div className="space-y-3">
              <div>
                <Input 
                  placeholder="Valid input" 
                  className="border-success focus:border-success focus:ring-success/20" 
                />
                <p className="text-sm text-success mt-1">✓ This field is valid</p>
              </div>
              <div>
                <Input 
                  placeholder="Warning input" 
                  className="border-warning focus:border-warning focus:ring-warning/20" 
                />
                <p className="text-sm text-warning mt-1">⚠ This field needs attention</p>
              </div>
              <div>
                <Input 
                  placeholder="Error input" 
                  className="border-destructive focus:border-destructive focus:ring-destructive/20" 
                />
                <p className="text-sm text-destructive mt-1">✗ This field has an error</p>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  const animationExamples = [
    {
      name: "Fade In",
      class: "animate-fade-in",
      description: "Smooth entrance animation"
    },
    {
      name: "Scale In",
      class: "animate-scale-in",
      description: "Pop-in effect for emphasis"
    },
    {
      name: "Slide In",
      class: "animate-slide-in-right",
      description: "Directional entrance"
    },
    {
      name: "Pulse",
      class: "animate-pulse",
      description: "Breathing effect for loading"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Interaction States</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to interactive states, transitions, and animations for creating responsive user experiences.
        </p>
      </div>

      {/* State Categories */}
      <Tabs defaultValue="base" className="space-y-6">
        <TabsList>
          <TabsTrigger value="base">Base States</TabsTrigger>
          <TabsTrigger value="loading">Loading</TabsTrigger>
          <TabsTrigger value="toggle">Toggles</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
        </TabsList>

        {stateCategories.map((category, index) => (
          <TabsContent key={category.name} value={['base', 'loading', 'toggle', 'media', 'validation'][index]} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.examples.map((example) => (
                  <Card key={example.title}>
                    <CardHeader>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {example.component}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}

        <TabsContent value="animations" className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Animation States</h2>
              <p className="text-muted-foreground">Smooth transitions and micro-interactions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {animationExamples.map((animation) => (
                <Card key={animation.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{animation.name}</CardTitle>
                    <CardDescription>{animation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-6 rounded flex justify-center items-center min-h-[100px]">
                      <div className={`bg-primary text-primary-foreground px-4 py-2 rounded ${animation.class}`}>
                        Sample Element
                      </div>
                    </div>
                    <code className="text-sm bg-muted px-2 py-1 rounded mt-2 block">
                      className="{animation.class}"
                    </code>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction Guidelines</CardTitle>
          <CardDescription>Best practices for consistent interactive experiences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Provide immediate visual feedback for interactions</li>
                <li>• Use consistent timing for animations (200-300ms)</li>
                <li>• Ensure all interactive elements have hover states</li>
                <li>• Make focus states clearly visible for accessibility</li>
                <li>• Use loading states for operations taking &gt;200ms</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Respect user preferences for reduced motion</li>
                <li>• Provide non-visual feedback (screen reader text)</li>
                <li>• Ensure interactive elements meet minimum size requirements</li>
                <li>• Use ARIA states for dynamic content</li>
                <li>• Test with keyboard navigation only</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}