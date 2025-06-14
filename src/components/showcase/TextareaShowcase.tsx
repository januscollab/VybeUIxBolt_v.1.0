import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Figma, FileCode, MessageSquare, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function TextareaShowcase() {
  const [basicText, setBasicText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const maxLength = 280;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const handleCharacterCount = (value: string) => {
    setCharacterCount(value.length);
    setCommentText(value);
  };

  const codeExamples = {
    basic: `<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea 
    id="message"
    placeholder="Type your message here..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
</div>`,
    withValidation: `<div className="space-y-2">
  <Label htmlFor="description">Description</Label>
  <Textarea 
    id="description"
    className={error ? "border-destructive" : "border-input"}
    placeholder="Enter description..."
  />
  {error && (
    <p className="text-sm text-destructive flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      This field is required
    </p>
  )}
</div>`,
    withCounter: `const [text, setText] = useState("");
const maxLength = 280;

<div className="space-y-2">
  <Label htmlFor="comment">Comment</Label>
  <Textarea 
    id="comment"
    placeholder="Share your thoughts..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    maxLength={maxLength}
  />
  <div className="text-sm text-muted-foreground text-right">
    {text.length}/{maxLength}
  </div>
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Textarea</h1>
            <p className="text-lg text-muted-foreground">
              Multi-line text input control for longer content with auto-resizing and validation support.
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
          <Badge variant="outline">Form Control</Badge>
          <Badge variant="outline">Supabase Ready</Badge>
        </div>
      </div>

      {/* Basic Textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Textarea</CardTitle>
          <CardDescription>
            Standard textarea implementation with controlled state and proper labeling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="basic-textarea">Basic Message</Label>
              <Textarea 
                id="basic-textarea"
                placeholder="Type your message here..."
                value={basicText}
                onChange={(e) => setBasicText(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="large-textarea">Large Textarea</Label>
              <Textarea 
                id="large-textarea"
                placeholder="Type a longer message..."
                className="min-h-[150px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description-textarea">Product Description</Label>
            <Textarea 
              id="description-textarea"
              placeholder="Describe your product in detail..."
              className="min-h-[120px]"
            />
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

      {/* Validation States */}
      <Card>
        <CardHeader>
          <CardTitle>Validation States</CardTitle>
          <CardDescription>
            Textarea components with different validation states and error handling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="default-textarea">Default State</Label>
              <Textarea 
                id="default-textarea"
                placeholder="Normal textarea..."
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">Helper text goes here</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-textarea">Error State</Label>
              <Textarea 
                id="error-textarea"
                placeholder="Invalid input..."
                className="border-destructive focus-visible:ring-destructive min-h-[100px]"
              />
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                This field is required
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="success-textarea">Success State</Label>
              <Textarea 
                id="success-textarea"
                placeholder="Valid input..."
                className="border-green-500 focus-visible:ring-green-500 min-h-[100px]"
                defaultValue="Great content!"
              />
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Looks good!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Validation Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withValidation)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withValidation}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>
            Enhanced textarea with character counting, auto-resize, and special formatting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Character Counter */}
            <div className="space-y-2">
              <Label htmlFor="comment-textarea" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comment with Counter
              </Label>
              <Textarea 
                id="comment-textarea"
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => handleCharacterCount(e.target.value)}
                maxLength={maxLength}
                className="min-h-[120px]"
              />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Be respectful and constructive</span>
                <span className={`${characterCount > maxLength * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {characterCount}/{maxLength}
                </span>
              </div>
            </div>

            {/* Auto-resize */}
            <div className="space-y-2">
              <Label htmlFor="notes-textarea" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Auto-expanding Notes
              </Label>
              <Textarea 
                id="notes-textarea"
                placeholder="Start typing your notes... This textarea will expand as you type more content."
                className="min-h-[120px] max-h-[300px] resize-none"
              />
              <p className="text-sm text-muted-foreground">
                Automatically expands up to 300px height
              </p>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-2">
            <Label htmlFor="readonly-textarea">Read-only Content</Label>
            <Textarea 
              id="readonly-textarea"
              value="This is read-only content that cannot be edited. It's useful for displaying information that users should see but not modify."
              readOnly
              className="min-h-[100px] bg-muted"
            />
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Character Counter Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withCounter)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withCounter}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Textarea components integrated with Supabase for content management and auto-save.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Text/VARCHAR column mapping for content</li>
              <li>• Auto-save functionality with debouncing</li>
              <li>• Draft state management</li>
              <li>• Version history tracking</li>
              <li>• Real-time collaborative editing</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Common Use Cases</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// Blog posts</code>
              <code className="block">content: text</code>
              <code className="block">// User comments</code>
              <code className="block">comment_text: text</code>
              <code className="block">// Form descriptions</code>
              <code className="block">description: text</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible textarea components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Proper label association with htmlFor</li>
                <li>• ARIA descriptions for validation messages</li>
                <li>• Keyboard navigation support</li>
                <li>• Screen reader compatibility</li>
                <li>• Resize handle accessibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide clear placeholder text</li>
                <li>• Set appropriate minimum heights</li>
                <li>• Include character limits when needed</li>
                <li>• Offer formatting guidelines</li>
                <li>• Implement auto-save for long content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}