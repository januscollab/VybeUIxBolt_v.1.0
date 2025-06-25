import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, Figma, FileCode, Download, Upload, RefreshCw, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function ProgressBarShowcase() {
  const [progress, setProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [taskProgress, setTaskProgress] = useState(0);
  const [isTaskRunning, setIsTaskRunning] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  // Simulate progress for the basic example
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate download progress
  const simulateDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Download complete",
            description: "Your file has been downloaded successfully.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Simulate upload progress
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload complete",
            description: "Your file has been uploaded successfully.",
          });
          return 100;
        }
        return prev + 4;
      });
    }, 150);
  };

  // Simulate task progress
  const simulateTask = () => {
    setIsTaskRunning(true);
    setTaskProgress(0);
    const interval = setInterval(() => {
      setTaskProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTaskRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const codeExamples = {
    basic: `import { Progress } from "@/components/ui/progress";

<Progress value={66} />`,
    variants: `<Progress value={75} variant="default" className="mb-2" />
<Progress value={75} variant="success" className="mb-2" />
<Progress value={75} variant="destructive" className="mb-2" />
<Progress value={75} variant="warning" />`,
    sizes: `<Progress value={50} size="sm" className="mb-2" />
<Progress value={50} size="default" className="mb-2" />
<Progress value={50} size="lg" />`,
    animated: `import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(timer);
        return 100;
      }
      return prev + 10;
    });
  }, 500);
  return () => clearInterval(timer);
}, []);

<Progress value={progress} />
<div className="text-sm text-muted-foreground mt-2">
  {progress}%
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Progress Bar</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Visual indicators for displaying progress of tasks, operations, and processes.
        </p>
      </div>

      {/* Basic Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Progress Bar</CardTitle>
          <CardDescription>Standard progress indicator with percentage value</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-4">
              <Progress value={progress} />
              <div className="text-sm text-center text-muted-foreground">
                {progress}% Complete
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

      {/* Progress Bar Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Bar Variants</CardTitle>
          <CardDescription>Different styles for various contexts and states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Default</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} variant="default" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-success">Success</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} variant="success" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-destructive">Error</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} variant="destructive" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-warning">Warning</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} variant="warning" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Variants Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.variants)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.variants}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Progress Bar Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Bar Sizes</CardTitle>
          <CardDescription>Different height options for various UI contexts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Small</span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <Progress value={50} size="sm" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Default</span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <Progress value={50} size="default" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Large</span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <Progress value={50} size="lg" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Sizes Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.sizes)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.sizes}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Interactive Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Progress Bars</CardTitle>
          <CardDescription>Progress bars with real-time updates and actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-8">
              {/* Download Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="font-medium">Downloading File</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{downloadProgress}%</span>
                </div>
                <Progress value={downloadProgress} />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {downloadProgress < 100 ? 'Downloading...' : 'Complete!'}
                  </span>
                  <Button 
                    size="sm" 
                    onClick={simulateDownload}
                    disabled={downloadProgress > 0 && downloadProgress < 100}
                  >
                    {downloadProgress === 100 ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Restart
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        {downloadProgress > 0 ? 'Downloading...' : 'Start Download'}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Upload Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="font-medium">Uploading Image</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} variant={uploadProgress === 100 ? "success" : "default"} />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {uploadProgress === 100 ? (
                      <span className="flex items-center text-success">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Upload complete
                      </span>
                    ) : (
                      uploadProgress > 0 ? `${Math.round(uploadProgress * 12.3 / 100)} MB of 12.3 MB` : 'Ready to upload'
                    )}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={simulateUpload}
                    disabled={uploadProgress > 0 && uploadProgress < 100}
                  >
                    {uploadProgress === 100 ? 'Upload Another' : 'Upload'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
          <CardDescription>Progress indicators for task completion and processes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {taskProgress < 100 ? (
                      <Clock className="h-4 w-4 text-primary" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                    <span className="font-medium">
                      {taskProgress < 100 ? 'Processing Data' : 'Task Complete'}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{taskProgress}%</span>
                </div>
                
                <Progress 
                  value={taskProgress} 
                  variant={taskProgress === 100 ? "success" : taskProgress < 30 ? "warning" : "default"}
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    {taskProgress === 0 && <span>Ready</span>}
                    {taskProgress > 0 && taskProgress < 30 && (
                      <span className="flex items-center text-warning">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Initializing
                      </span>
                    )}
                    {taskProgress >= 30 && taskProgress < 100 && <span>Processing...</span>}
                    {taskProgress === 100 && (
                      <span className="flex items-center text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm"
                    onClick={simulateTask}
                    disabled={isTaskRunning}
                  >
                    {taskProgress === 100 ? 'Run Again' : isTaskRunning ? 'Running...' : 'Start Task'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Animated Progress Code</h4>
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

      {/* Indeterminate Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Indeterminate Progress</CardTitle>
          <CardDescription>Progress indicators for unknown completion times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Indeterminate Progress</span>
                </div>
                <Progress 
                  className="animate-pulse" 
                  value={30} 
                  indicatorClassName="animate-[progress-loading_2s_ease-in-out_infinite]"
                />
                <style jsx>{`
                  @keyframes progress-loading {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(-10%); }
                    100% { transform: translateX(-100%); }
                  }
                `}</style>
                <p className="text-sm text-muted-foreground">
                  Used when the completion time is unknown or cannot be estimated.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>Best practices for using progress indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use for operations that take more than 1 second</li>
                <li>• Show percentage when progress can be measured</li>
                <li>• Use indeterminate progress for unknown durations</li>
                <li>• Provide context about what's happening</li>
                <li>• Use appropriate semantic colors</li>
                <li>• Consider adding cancel options for long operations</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Include ARIA attributes for screen readers</li>
                <li>• Announce progress updates to screen readers</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Provide text alternatives for visual indicators</li>
                <li>• Consider users with motion sensitivity</li>
                <li>• Test with keyboard navigation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}