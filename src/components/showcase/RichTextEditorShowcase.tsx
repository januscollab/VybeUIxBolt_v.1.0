
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { CodeModal } from '@/components/ui/code-modal';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

export default function RichTextEditorShowcase() {
  const [content, setContent] = useState('<p>Start typing your content here...</p>');
  const [readOnlyContent] = useState('<p><strong>This is read-only content</strong> with <em>formatting</em> and <u>styles</u>.</p>');

  const code = `import { RichTextEditor } from '@/components/ui/rich-text-editor';

function Example() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Rich Text Editor</h1>
            <p className="text-lg text-muted-foreground">
              A WYSIWYG editor for rich text content with formatting controls.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">New</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Basic Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Basic Rich Text Editor</CardTitle>
              <CardDescription>
                Editor with basic formatting controls (Bold, Italic, Underline, Lists)
              </CardDescription>
            </div>
            <CodeModal code={code} title="Rich Text Editor Example">
              <Button variant="ghost" size="sm">
                <Code className="h-4 w-4" />
              </Button>
            </CodeModal>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start typing your content here..."
          />
        </CardContent>
      </Card>

      {/* Read-only Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Read-only View</CardTitle>
          <CardDescription>
            Display formatted content without editing capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={readOnlyContent}
            readOnly
          />
        </CardContent>
      </Card>
    </div>
  );
}
