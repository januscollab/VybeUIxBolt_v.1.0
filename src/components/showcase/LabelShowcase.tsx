import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Figma, FileCode, User, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function LabelShowcase() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>`,
    required: `<Label htmlFor="password" className="text-sm font-medium">
  Password
  <span className="text-red-500 ml-1">*</span>
</Label>`,
    withDescription: `<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter username" />
  <p className="text-sm text-muted-foreground">
    This will be your public display name.
  </p>
</div>`,
    checkbox: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label 
    htmlFor="terms" 
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Accept terms and conditions
  </Label>
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Label</h1>
            <p className="text-lg text-muted-foreground">
              Accessible labels for form controls with proper associations and styling.
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
          <Badge variant="outline">Form</Badge>
          <Badge variant="outline">Accessibility</Badge>
        </div>
      </div>

      {/* Basic Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Labels</CardTitle>
          <CardDescription>
            Simple labels properly associated with form controls.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
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

      {/* Required Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Required Field Labels</CardTitle>
          <CardDescription>
            Labels with required indicators and validation states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="required-email" className="text-sm font-medium">
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input id="required-email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="required-password" className="text-sm font-medium">
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input 
                    id="required-password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="optional-company" className="text-sm font-medium text-muted-foreground">
                  Company Name
                  <span className="text-xs ml-1">(optional)</span>
                </Label>
                <Input id="optional-company" placeholder="Enter company name" />
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Required Fields Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.required)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.required}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Labels with Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Labels with Help Text</CardTitle>
          <CardDescription>
            Labels with additional descriptions and helper text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
                <p className="text-sm text-muted-foreground">
                  This will be your public display name. It can be your real name or a pseudonym.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself" 
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" type="url" placeholder="https://example.com" />
                <p className="text-sm text-muted-foreground">
                  Add links to your website, blog, or social media profiles.
                </p>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">With Description Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withDescription)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withDescription}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Checkbox Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox and Radio Labels</CardTitle>
          <CardDescription>
            Labels for checkboxes, radio buttons, and other form controls.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Preferences</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <Label 
                      htmlFor="newsletter" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subscribe to newsletter
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label 
                      htmlFor="marketing" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Receive marketing emails
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="updates" defaultChecked />
                    <Label 
                      htmlFor="updates" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Product updates and announcements
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  />
                  <Label 
                    htmlFor="terms" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary underline">terms and conditions</a>
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
                {!agreedToTerms && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    You must agree to the terms and conditions
                  </p>
                )}
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Checkbox Labels Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.checkbox)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.checkbox}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Complex Form */}
      <Card>
        <CardHeader>
          <CardTitle>Complex Form Layout</CardTitle>
          <CardDescription>
            Advanced form with grouped fields, icons, and validation states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="account-email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input id="account-email" type="email" placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-username" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input id="account-username" placeholder="Choose a username" />
                  <p className="text-xs text-muted-foreground">
                    Must be 3-20 characters, letters and numbers only
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input id="account-password" type="password" placeholder="Create a strong password" />
                  <p className="text-xs text-muted-foreground">
                    Must contain at least 8 characters with letters, numbers, and symbols
                  </p>
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
            Best practices for accessible and user-friendly labels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Always use htmlFor attribute</li>
                <li>• Provide clear, descriptive text</li>
                <li>• Use ARIA labels when needed</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Support screen readers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep labels concise and clear</li>
                <li>• Position labels consistently</li>
                <li>• Indicate required fields clearly</li>
                <li>• Provide helpful descriptions</li>
                <li>• Use appropriate typography</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}