
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CodeModal } from '@/components/ui/code-modal';
import { Bold, Italic, Underline, Link, List, ListOrdered, Quote, Code, Eye } from 'lucide-react';

export default function RichTextEditorShowcase() {
  const [content, setContent] = useState('Start typing your rich text content here...');
  const [activeTools, setActiveTools] = useState<string[]>([]);

  const toggleTool = (tool: string) => {
    setActiveTools(prev => 
      prev.includes(tool) 
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  const richTextEditorCode = `import { RichTextEditor } from '@/components/ui/rich-text-editor';

export function MyEditor() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
      tools={['bold', 'italic', 'underline', 'link', 'list']}
    />
  );
}`;

  const toolbarCode = `const toolbar = [
  { name: 'bold', icon: Bold, shortcut: 'Cmd+B' },
  { name: 'italic', icon: Italic, shortcut: 'Cmd+I' },
  { name: 'underline', icon: Underline, shortcut: 'Cmd+U' },
  { name: 'link', icon: Link, shortcut: 'Cmd+K' },
  { name: 'list', icon: List, shortcut: 'Cmd+Shift+8' },
  { name: 'orderedList', icon: ListOrdered, shortcut: 'Cmd+Shift+7' },
  { name: 'blockquote', icon: Quote, shortcut: 'Cmd+Shift+.' },
  { name: 'code', icon: Code, shortcut: 'Cmd+E' },
];`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Rich Text Editor</h1>
          <p className="text-lg text-muted-foreground">
            A powerful, customizable rich text editor with modern formatting tools.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Editor</Badge>
          <Badge variant="outline">WYSIWYG</Badge>
        </div>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Editor</CardTitle>
          <CardDescription>Interactive rich text editor with formatting toolbar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-1 p-2 border rounded-lg bg-muted/50">
            <Button 
              variant={activeTools.includes('bold') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeTools.includes('italic') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeTools.includes('underline') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button 
              variant={activeTools.includes('link') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('link')}
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeTools.includes('list') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeTools.includes('orderedList') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('orderedList')}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button 
              variant={activeTools.includes('quote') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('quote')}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeTools.includes('code') ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => toggleTool('code')}
            >
              <Code className="h-4 w-4" />
            </Button>
            <div className="ml-auto">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="border rounded-lg">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] border-0 resize-none focus:ring-0"
              placeholder="Start typing your content..."
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{content.length} characters</span>
            <span>{content.split(/\s+/).filter(word => word.length > 0).length} words</span>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
            <CardDescription>Simple rich text editor implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal code={richTextEditorCode} title="Rich Text Editor Usage">
              <Button variant="outline" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                View Code
              </Button>
            </CodeModal>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toolbar Configuration</CardTitle>
            <CardDescription>Customize toolbar tools and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal code={toolbarCode} title="Toolbar Configuration">
              <Button variant="outline" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                View Code
              </Button>
            </CodeModal>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Rich text editor capabilities and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Text Formatting</h4>
              <p className="text-sm text-muted-foreground">Bold, italic, underline, and more</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Lists & Structure</h4>
              <p className="text-sm text-muted-foreground">Ordered lists, bullet points, quotes</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Links & Media</h4>
              <p className="text-sm text-muted-foreground">Insert links and media content</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Keyboard Shortcuts</h4>
              <p className="text-sm text-muted-foreground">Efficient editing with shortcuts</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Custom Toolbar</h4>
              <p className="text-sm text-muted-foreground">Configurable toolbar options</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Live Preview</h4>
              <p className="text-sm text-muted-foreground">Real-time content preview</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
