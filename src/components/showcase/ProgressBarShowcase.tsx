import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, Figma, FileCode, Play, Pause, RotateCcw, Download, Upload, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function ProgressBarShowcase() {
  const [progress, setProgress] = useState(33);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimatedProgress(0);
    const interval = setInterval(() => {
      setAnimatedProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const resetAnimation = () => {
    setAnimatedProgress(0);
    setIsAnimating(false);
  };

  const codeExamples = {
    basic: `<Progress value={33} className="w-full" />`,
    withLabel: `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>{progress}%</span>
  </div>
  <Progress value={progress} className="w-full" />
</div>`,
    colors: `{/* Success */}
<Progress value={100} className="progress-success" />

{/* Warning */}
<Progress value={75} className="progress-warning" />

{/* Error */}
<Progress value={25} className="progress-error" />`,
    animated: `const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress(prev => prev >= 100 ? 0 : prev + 1);
  }, 100);
  return () => clearInterval(interval);
}, []);

<Progress value={progress} className="w-full" />`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Progress Bar</h1>
            <p className="text-lg text-muted-foreground">
              Visual indicator showing completion status of tasks, uploads, or any process with percentage feedback.
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
          <Badge variant="outline">Feedback</Badge>
          <Badge variant="outline">Supabase Ready</Badge>
        </div>
      </div>

      {/* Basic Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Progress Bar</CardTitle>
          <CardDescription>
            Standard progress bar implementation with various completion states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                    -10%
                  </Button>
                  <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                    +10%
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setProgress(0)}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Not Started</div>
                  <Progress value={0} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">In Progress</div>
                  <Progress value={45} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Completed</div>
                  <Progress value={100} className="w-full" />
                </div>
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

      {/* Progress with Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Progress with Labels & Context</CardTitle>
          <CardDescription>
            Enhanced progress bars with descriptive labels and contextual information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">File Upload</span>
                  <span className="text-muted-foreground">2.1 MB / 5.0 MB</span>
                </div>
                <Progress value={42} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading document.pdf</span>
                  <span>42%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Progress
                  </span>
                  <span className="text-muted-foreground">Complete</span>
                </div>
                <Progress value={100} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>application-v2.zip</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Done
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Installation Progress</span>
                  <span className="text-muted-foreground">Step 3 of 5</span>
                </div>
                <Progress value={60} className="w-full" />
                <div className="text-xs text-muted-foreground">
                  Installing dependencies and configuring environment...
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Labeled Progress Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withLabel)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withLabel}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Animated Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Animated Progress</CardTitle>
          <CardDescription>
            Dynamic progress bars with smooth animations and interactive controls.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Animated Demo</span>
                  <span>{animatedProgress}%</span>
                </div>
                <Progress value={animatedProgress} className="w-full" />
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    onClick={startAnimation}
                    disabled={isAnimating}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-3 w-3" />
                    Start
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={resetAnimation}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Loading Animation</div>
                <Progress value={75} className="w-full animate-pulse" />
                <div className="text-xs text-muted-foreground">
                  Indeterminate loading state with pulse animation
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Animation Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.animated)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.animated}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Progress Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Variants</CardTitle>
          <CardDescription>
            Different visual styles and states for various use cases and contexts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-medium text-green-700 dark:text-green-400">Success State</div>
                <Progress value={100} className="w-full [&>div]:bg-green-500" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Warning State</div>
                <Progress value={75} className="w-full [&>div]:bg-yellow-500" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-red-700 dark:text-red-400">Error State</div>
                <Progress value={25} className="w-full [&>div]:bg-red-500" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Small Size</div>
                <Progress value={60} className="w-full h-2" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Large Size</div>
                <Progress value={80} className="w-full h-4" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Variant Styles Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.colors)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.colors}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Progress bars integrated with Supabase for real-time progress tracking and file uploads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• File upload progress with Supabase Storage</li>
              <li>• Real-time task progress tracking</li>
              <li>• Batch operation progress monitoring</li>
              <li>• User progress persistence</li>
              <li>• Progress analytics and reporting</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Common Use Cases</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// Task completion</code>
              <code className="block">completion_percentage: integer</code>
              <code className="block">// File uploads</code>
              <code className="block">upload_progress: integer</code>
              <code className="block">// Course progress</code>
              <code className="block">lessons_completed: integer</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible progress bar components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA role="progressbar" with value attributes</li>
                <li>• Screen reader announcements for progress</li>
                <li>• Semantic HTML structure</li>
                <li>• High contrast support</li>
                <li>• Keyboard navigation compatibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Always provide percentage or step context</li>
                <li>• Use appropriate colors for different states</li>
                <li>• Include descriptive labels when needed</li>
                <li>• Consider animation performance</li>
                <li>• Provide completion feedback</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}