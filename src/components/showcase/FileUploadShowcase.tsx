import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Copy, Figma, FileCode, Upload, File, X, Check, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";

export default function FileUploadShowcase() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    setFiles(prev => [...prev, ...fileList]);
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const codeExample = `const [files, setFiles] = useState<File[]>([]);
const [dragActive, setDragActive] = useState(false);

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setDragActive(false);
  if (e.dataTransfer.files) {
    setFiles(Array.from(e.dataTransfer.files));
  }
};

<div
  className={cn(
    "border-2 border-dashed rounded-lg p-6 text-center",
    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
  )}
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
>
  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
  <p>Drag and drop files here, or click to select</p>
</div>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">File Upload</h1>
            <p className="text-lg text-muted-foreground">
              Upload files with drag-and-drop support, progress indicators, and validation.
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
          <Badge variant="outline">File Handling</Badge>
          <Badge variant="outline">Supabase Storage</Badge>
        </div>
      </div>

      {/* Drag and Drop Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Drag and Drop Upload</CardTitle>
          <CardDescription>Upload files by dragging and dropping or clicking to select</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Drop files here to upload</p>
              <p className="text-muted-foreground mb-4">or click to browse</p>
              <Button variant="outline" size="sm">
                Select Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-medium">Uploaded Files:</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {uploadProgress === 100 ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="w-20">
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? "Hide" : "Show"} Code
              </Button>
              {showCode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(codeExample)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>
          </div>
          {showCode && (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Simple File Input */}
      <Card>
        <CardHeader>
          <CardTitle>Simple File Input</CardTitle>
          <CardDescription>Basic file input with custom styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Choose file</Label>
                <Input id="file-upload" type="file" className="mt-2" />
              </div>
              
              <div>
                <Label htmlFor="multiple-files">Choose multiple files</Label>
                <Input id="multiple-files" type="file" multiple className="mt-2" />
              </div>
              
              <div>
                <Label htmlFor="image-only">Images only</Label>
                <Input id="image-only" type="file" accept="image/*" className="mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Validation */}
      <Card>
        <CardHeader>
          <CardTitle>File Validation</CardTitle>
          <CardDescription>Upload with file type and size restrictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <p className="font-medium mb-2">Upload Documents</p>
                <p className="text-sm text-muted-foreground mb-3">
                  PDF, DOC, DOCX up to 10MB
                </p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
              
              <div className="flex items-start gap-3 p-3 border border-red-200 bg-red-50 rounded-lg dark:border-red-800 dark:bg-red-950/20">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">Invalid file type</p>
                  <p className="text-sm text-red-600 dark:text-red-300">Please upload a PDF, DOC, or DOCX file.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for file upload implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Provide clear file type restrictions</li>
                <li>• Show upload progress for large files</li>
                <li>• Allow multiple upload methods</li>
                <li>• Validate files on client and server</li>
                <li>• Provide meaningful error messages</li>
                <li>• Support drag and drop for better UX</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Considerations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Set appropriate file size limits</li>
                <li>• Handle upload failures gracefully</li>
                <li>• Provide preview for image uploads</li>
                <li>• Consider chunked uploads for large files</li>
                <li>• Implement virus scanning for security</li>
                <li>• Store files securely with proper access controls</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}