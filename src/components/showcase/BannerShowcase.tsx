
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Info, AlertTriangle, CheckCircle, AlertCircle, Code } from "lucide-react";
import { CodeModal } from "@/components/ui/code-modal";

export default function BannerShowcase() {
  const basicBannerCode = `<Alert className="border-l-4 border-l-primary">
  <Info className="h-4 w-4" />
  <AlertDescription>
    This is an informational banner message.
  </AlertDescription>
</Alert>`;

  const warningBannerCode = `<Alert variant="destructive" className="border-l-4 border-l-warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertDescription>
    This is a warning banner with important information.
  </AlertDescription>
</Alert>`;

  const successBannerCode = `<Alert className="border-l-4 border-l-success bg-success/10">
  <CheckCircle className="h-4 w-4 text-success" />
  <AlertDescription className="text-success">
    Success! Your action was completed successfully.
  </AlertDescription>
</Alert>`;

  const dismissibleBannerCode = `const [showBanner, setShowBanner] = useState(true);

{showBanner && (
  <Alert className="border-l-4 border-l-primary">
    <Info className="h-4 w-4" />
    <AlertDescription className="flex items-center justify-between">
      <span>This banner can be dismissed by the user.</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowBanner(false)}
        className="ml-2 h-auto p-1"
      >
        <X className="h-4 w-4" />
      </Button>
    </AlertDescription>
  </Alert>
)}`;

  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Banner</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Display important announcements, alerts, and system messages with various styles and dismiss options.
        </p>
      </div>

      {/* Basic Banner */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Basic Banner</CardTitle>
              <CardDescription>Simple informational banner</CardDescription>
            </div>
            <CodeModal title="Basic Banner" code={basicBannerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="border-l-4 border-l-primary">
            <Info className="h-4 w-4" />
            <AlertDescription>
              This is an informational banner message.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Warning Banner */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Warning Banner</CardTitle>
              <CardDescription>Banner for warnings and important notices</CardDescription>
            </div>
            <CodeModal title="Warning Banner" code={warningBannerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="border-l-4 border-l-warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This is a warning banner with important information.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Success Banner */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Success Banner</CardTitle>
              <CardDescription>Banner for successful actions</CardDescription>
            </div>
            <CodeModal title="Success Banner" code={successBannerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="border-l-4 border-l-success bg-success/10">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">
              Success! Your action was completed successfully.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Dismissible Banner */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Dismissible Banner</CardTitle>
              <CardDescription>Banner that users can dismiss</CardDescription>
            </div>
            <CodeModal title="Dismissible Banner" code={dismissibleBannerCode}>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-4 w-4" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showBanner && (
            <Alert className="border-l-4 border-l-primary">
              <Info className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>This banner can be dismissed by the user.</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBanner(false)}
                  className="ml-2 h-auto p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          )}
          {!showBanner && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Banner dismissed.</span>
              <Button variant="outline" size="sm" onClick={() => setShowBanner(true)}>
                Show again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
