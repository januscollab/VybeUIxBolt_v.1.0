
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, Check, AlertCircle, Image, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FileUploadShowcase() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    size: string;
    type: string;
    status: 'success' | 'error';
  }>>([]);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles(prev => [...prev, {
            name: "document.pdf",
            size: "2.5 MB",
            type: "application/pdf",
            status: 'success'
          }]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">File Upload</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Drag and drop file upload components with progress tracking and validation.
        </p>
      </div>

      {/* Basic File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Basic File Upload</CardTitle>
          <CardDescription>Simple drag and drop file uploader</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer group">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4 group-hover:text-muted-foreground/80" />
            <h3 className="text-lg font-semibold mb-2">Drop files here to upload</h3>
            <p className="text-muted-foreground mb-4">
              or click to browse your computer
            </p>
            <Button variant="outline">
              Choose Files
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supports JPG, PNG, PDF up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File Upload with Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Upload with Progress</CardTitle>
          <CardDescription>File upload with progress indicator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium mb-2">Upload your files</p>
            <Button onClick={handleFileUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Select Files"}
            </Button>
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading document.pdf</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Multiple File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple File Management</CardTitle>
          <CardDescription>Upload and manage multiple files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium mb-2">Drop multiple files here</p>
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Files</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'success' ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Upload with Validation */}
      <Card>
        <CardHeader>
          <CardTitle>Upload with Validation</CardTitle>
          <CardDescription>File validation and error handling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium mb-2">Upload images only</p>
            <Button variant="outline" size="sm">
              Select Images
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG, GIF up to 5MB each
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              File "document.pdf" was rejected. Only image files are allowed.
            </AlertDescription>
          </Alert>

          <Alert className="border-success/20 bg-success/5">
            <Check className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">
              Successfully uploaded 3 images.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Compact File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Upload</CardTitle>
          <CardDescription>Space-efficient file upload component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 border border-dashed rounded-lg">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Drag files here or</p>
              <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
            </div>
            <Button size="sm" variant="outline">
              Browse
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
          <CardDescription>Best practices for file upload components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Clearly indicate accepted file types</li>
                <li>• Show file size limits</li>
                <li>• Provide visual upload progress</li>
                <li>• Allow drag and drop interaction</li>
                <li>• Include file preview when possible</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Error Handling</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Validate file types and sizes</li>
                <li>• Show clear error messages</li>
                <li>• Allow users to remove files</li>
                <li>• Handle network failures gracefully</li>
                <li>• Provide retry mechanisms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
