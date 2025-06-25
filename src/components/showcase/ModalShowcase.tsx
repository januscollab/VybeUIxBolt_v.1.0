
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Brain, Loader2, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function ModalShowcase() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const simulateUpload = () => {
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

  const simulateAI = () => {
    setIsAnalyzing(true);
    setAiProgress(0);
    const interval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Modal & Dialog Variations</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Various modal patterns for different use cases including file uploads, AI processing, and user confirmations.
        </p>
      </div>

      {/* File Upload Modal */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload Modal</CardTitle>
          <CardDescription>Modal with progress tracking for file uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Files
                </DialogTitle>
                <DialogDescription>
                  Select files to upload to your project. Supported formats: JPG, PNG, PDF, DOC
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drag files here or click to browse</p>
                </div>
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </div>
              <DialogFooter className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={simulateUpload} disabled={isUploading}>
                  {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                  {isUploading ? 'Uploading...' : 'Choose Files'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* AI Analysis Modal */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Modal</CardTitle>
          <CardDescription>Modal for time-consuming AI operations with progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                Analyze with AI
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Analysis in Progress
                </DialogTitle>
                <DialogDescription>
                  Our AI is analyzing your content. This may take a few minutes.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-6">
                <div className="flex items-center justify-center">
                  {isAnalyzing ? (
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
                  ) : aiProgress === 100 ? (
                    <CheckCircle className="h-12 w-12 text-success" />
                  ) : (
                    <Brain className="h-12 w-12 text-purple-600" />
                  )}
                </div>
                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{aiProgress}%</span>
                    </div>
                    <Progress value={aiProgress} className="[&>div]:bg-purple-600" />
                    <p className="text-xs text-center text-muted-foreground">
                      Analyzing patterns and generating insights...
                    </p>
                  </div>
                )}
                {aiProgress === 100 && !isAnalyzing && (
                  <p className="text-center text-success text-sm">Analysis complete!</p>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={simulateAI} disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing...' : aiProgress === 100 ? 'View Results' : 'Start Analysis'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Quick Loading Modal */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Loading Modal</CardTitle>
          <CardDescription>Simple loading modal for short operations</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Loader2 className="h-4 w-4 mr-2" />
                Quick Action
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Processing your request...
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Form Modal */}
      <Card>
        <CardHeader>
          <CardTitle>Form Modal</CardTitle>
          <CardDescription>Modal containing a form with validation</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" placeholder="Enter project name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of your project" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template">Template</Label>
                  <select className="w-full p-2 border rounded-md" id="template">
                    <option>Blank Project</option>
                    <option>React Starter</option>
                    <option>Dashboard Template</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Confirmation Modals */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Modals</CardTitle>
          <CardDescription>Alert dialogs for destructive or important actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Item</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Delete Item
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the item and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Save Changes</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-info" />
                    Save Changes
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes. Would you like to save them before continuing?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Discard</AlertDialogCancel>
                  <AlertDialogAction>Save Changes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Modal Guidelines</CardTitle>
          <CardDescription>Best practices for modal design and usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use modals sparingly for focused tasks</li>
                <li>• Provide clear progress indicators</li>
                <li>• Always include a way to cancel/close</li>
                <li>• Keep content focused and concise</li>
                <li>• Use appropriate modal sizes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Trap focus within the modal</li>
                <li>• Support ESC key to close</li>
                <li>• Use proper ARIA labels</li>
                <li>• Provide clear action buttons</li>
                <li>• Test with screen readers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
