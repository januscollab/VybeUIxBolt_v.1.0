
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeModal } from "@/components/ui/code-modal";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart, Download, Plus, Trash2, Settings, ExternalLink, Sparkles, Upload, Info, ArrowRight, Check } from "lucide-react";

export default function ButtonShowcase() {
  const [fabOpen, setFabOpen] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleProgressUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 showcase-component">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Button Components</h1>
            <Badge variant="default">Stable</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Interactive button components with various styles, sizes, and states for user actions.
          </p>
        </div>

        {/* Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Different visual styles for various use cases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Button className="w-full">Default</Button>
                <code className="text-xs bg-muted p-1 rounded">default</code>
              </div>
              <div className="space-y-2">
                <Button variant="destructive" className="w-full">Destructive</Button>
                <code className="text-xs bg-muted p-1 rounded">destructive</code>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">Outline</Button>
                <code className="text-xs bg-muted p-1 rounded">outline</code>
              </div>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full">Secondary</Button>
                <code className="text-xs bg-muted p-1 rounded">secondary</code>
              </div>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full">Ghost</Button>
                <code className="text-xs bg-muted p-1 rounded">ghost</code>
              </div>
              <div className="space-y-2">
                <Button variant="link" className="w-full">Link</Button>
                <code className="text-xs bg-muted p-1 rounded">link</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>Different sizes for various contexts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="space-y-2">
                <Button size="sm">Small</Button>
                <div><code className="text-xs bg-muted p-1 rounded">sm</code></div>
              </div>
              <div className="space-y-2">
                <Button size="default">Default</Button>
                <div><code className="text-xs bg-muted p-1 rounded">default</code></div>
              </div>
              <div className="space-y-2">
                <Button size="lg">Large</Button>
                <div><code className="text-xs bg-muted p-1 rounded">lg</code></div>
              </div>
              <div className="space-y-2">
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <div><code className="text-xs bg-muted p-1 rounded">icon</code></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* With Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons with Icons</CardTitle>
            <CardDescription>Combining icons with text for better UX</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="secondary" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader>
            <CardTitle>Button States</CardTitle>
            <CardDescription>Different interaction states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Button className="w-full">Normal</Button>
                <p className="text-xs text-muted-foreground">Default state</p>
              </div>
              <div className="space-y-2">
                <Button disabled className="w-full">Disabled</Button>
                <p className="text-xs text-muted-foreground">Disabled state</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Loading...
                </Button>
                <p className="text-xs text-muted-foreground">Loading state</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experimental Section */}
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Experimental Button Components
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Experimental
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Modern, interactive button variants designed to inspire and showcase advanced interaction patterns
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Floating Action Button */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                Floating Action Button
                <Badge variant="outline" className="text-xs">Experimental</Badge>
              </h4>
              <div className="relative h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="relative">
                  <Button
                    size="icon"
                    className={`rounded-full h-14 w-14 shadow-lg transition-all duration-300 hover:scale-110 ${
                      fabOpen ? 'rotate-45' : ''
                    }`}
                    onClick={() => setFabOpen(!fabOpen)}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                  
                  {/* Expanding Menu */}
                  <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 space-y-2 transition-all duration-300 ${
                    fabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" className="rounded-full shadow-lg hover:scale-110 transition-transform">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload File</TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:scale-110 transition-transform">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add to Favorites</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Animated floating action button with expanding menu options and smooth hover effects.
              </p>
            </div>

            {/* Interactive Card Button */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                Interactive Card Button
                <Badge variant="outline" className="text-xs">Experimental</Badge>
              </h4>
              <div className="relative">
                <div className={`border rounded-lg transition-all duration-500 hover:shadow-lg ${
                  cardExpanded ? 'bg-primary/5 border-primary/20' : 'bg-background hover:bg-muted/30'
                }`}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-between p-6 h-auto transition-all duration-300 ${
                      cardExpanded ? 'rounded-b-none' : ''
                    }`}
                    onClick={() => setCardExpanded(!cardExpanded)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Advanced Features</div>
                        <div className="text-sm text-muted-foreground">Click to explore</div>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${
                      cardExpanded ? 'rotate-90' : ''
                    }`} />
                  </Button>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${
                    cardExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-6 pt-0 space-y-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        This button transforms into an expandable content area with smooth animations
                        and contextual information display.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Learn More</Button>
                        <Button size="sm">Get Started</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Button that expands into a content card with smooth animations and contextual actions.
              </p>
            </div>

            {/* Smart Tooltip Button */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                Smart Tooltip Button
                <Badge variant="outline" className="text-xs">Experimental</Badge>
              </h4>
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="relative group">
                      <Info className="mr-2 h-4 w-4" />
                      Hover for Context
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <div className="space-y-2">
                      <div className="font-semibold">Contextual Information</div>
                      <p className="text-sm">This smart tooltip provides relevant context and suggestions based on user behavior and current application state.</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3" />
                        AI-powered suggestions
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="relative group">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Smart Action
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <div className="space-y-2">
                      <div className="font-semibold">Intelligent Action</div>
                      <p className="text-sm">This button adapts its functionality based on context and provides smart recommendations.</p>
                      <Button size="sm" className="w-full mt-2">
                        Execute Smart Action
                      </Button>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-muted-foreground">
                Buttons with AI-powered contextual tooltips that provide relevant information and actions.
              </p>
            </div>

            {/* Animated Progress Button */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                Animated Progress Button
                <Badge variant="outline" className="text-xs">Experimental</Badge>
              </h4>
              <div className="space-y-4">
                <div className="relative">
                  <Button
                    onClick={handleProgressUpload}
                    disabled={isUploading}
                    className={`w-full relative overflow-hidden transition-all duration-300 ${
                      uploadProgress === 100 ? 'bg-success hover:bg-success/90' : ''
                    }`}
                  >
                    <div className={`absolute inset-0 bg-primary/20 transition-all duration-300 ${
                      isUploading ? 'animate-pulse' : ''
                    }`} style={{ width: `${uploadProgress}%` }} />
                    
                    <div className="relative flex items-center justify-center gap-2">
                      {uploadProgress === 100 ? (
                        <>
                          <Check className="h-4 w-4" />
                          Upload Complete
                        </>
                      ) : isUploading ? (
                        <>
                          <Upload className="h-4 w-4 animate-bounce" />
                          Uploading... {uploadProgress}%
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Start Upload
                        </>
                      )}
                    </div>
                  </Button>
                  
                  {isUploading && (
                    <div className="mt-2">
                      <Progress value={uploadProgress} className="h-1" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Sparkles className="mr-2 h-4 w-4" />
                    Shimmer Effect
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
                    <Heart className="mr-2 h-4 w-4 relative z-10" />
                    Pulse Effect
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Buttons with integrated progress indicators, particle effects, and advanced animation patterns.
              </p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CodeModal
                code={`<Button>Click me</Button>`}
                title="Basic Button"
              >
                <Button variant="outline" className="w-full">
                  Basic Button Code
                </Button>
              </CodeModal>
              
              <CodeModal
                code={`<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>`}
                title="Button with Icon"
              >
                <Button variant="outline" className="w-full">
                  Button with Icon Code
                </Button>
              </CodeModal>
              
              <CodeModal
                code={`<Button variant="outline" size="lg">
  Large Outline Button
</Button>`}
                title="Variant and Size"
              >
                <Button variant="outline" className="w-full">
                  Variant & Size Code
                </Button>
              </CodeModal>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
