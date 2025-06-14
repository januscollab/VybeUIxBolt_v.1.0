import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Copy, Figma, FileCode, ChevronDown, ChevronRight, Plus, Settings, User, Mail, Calendar, FileText, Folder, Code } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function CollapsibleShowcase() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const codeExamples = {
    basic: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" className="flex w-full justify-between">
      <span>Can I use this in my project?</span>
      {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="space-y-2">
    <p className="text-sm text-muted-foreground">
      Yes. Free to use for personal and commercial projects.
    </p>
  </CollapsibleContent>
</Collapsible>`,
    multiple: `const [openSections, setOpenSections] = useState<string[]>([]);

const toggleSection = (section: string) => {
  setOpenSections(prev => 
    prev.includes(section) 
      ? prev.filter(s => s !== section)
      : [...prev, section]
  );
};

{sections.map((section) => (
  <Collapsible key={section.id} open={openSections.includes(section.id)}>
    <CollapsibleTrigger onClick={() => toggleSection(section.id)}>
      {section.title}
    </CollapsibleTrigger>
    <CollapsibleContent>
      {section.content}
    </CollapsibleContent>
  </Collapsible>
))}`,
    animated: `<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger className="group" asChild>
    <Button variant="outline" className="w-full justify-between">
      <span>Show repositories</span>
      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="space-y-2 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
    <div className="rounded-md border px-4 py-3 font-mono text-sm">
      @radix-ui/react-collapsible
    </div>
  </CollapsibleContent>
</Collapsible>`
  };

  const repositories = [
    "@radix-ui/react-collapsible",
    "@radix-ui/react-accordion", 
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-dialog"
  ];

  const fileStructure = [
    { type: 'folder', name: 'src', children: [
      { type: 'folder', name: 'components', children: [
        { type: 'file', name: 'Button.tsx' },
        { type: 'file', name: 'Card.tsx' },
        { type: 'file', name: 'Input.tsx' }
      ]},
      { type: 'folder', name: 'pages', children: [
        { type: 'file', name: 'Home.tsx' },
        { type: 'file', name: 'About.tsx' }
      ]},
      { type: 'file', name: 'App.tsx' },
      { type: 'file', name: 'main.tsx' }
    ]}
  ];

  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index} style={{ marginLeft: `${level * 16}px` }}>
        {item.type === 'folder' ? (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-1 hover:bg-muted rounded text-sm">
              <ChevronRight className="h-3 w-3 transition-transform data-[state=open]:rotate-90" />
              <Folder className="h-4 w-4 text-blue-500" />
              <span>{item.name}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {item.children && renderFileTree(item.children, level + 1)}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <div className="flex items-center gap-2 p-1 text-sm ml-5">
            <FileText className="h-4 w-4 text-gray-500" />
            <span>{item.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Collapsible</h1>
            <p className="text-lg text-muted-foreground">
              Interactive component for showing and hiding content with smooth animations.
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
          <Badge variant="outline">Interactive</Badge>
          <Badge variant="outline">Animation</Badge>
        </div>
      </div>

      {/* Basic Collapsible */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Collapsible</CardTitle>
          <CardDescription>
            Simple collapsible component with toggle functionality.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-4">
              <Collapsible open={isOpen1} onOpenChange={setIsOpen1}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between p-2">
                    <span className="text-sm font-medium">Can I use this in my project?</span>
                    {isOpen1 ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 px-2 pb-2">
                  <p className="text-sm text-muted-foreground">
                    Yes. Free to use for personal and commercial projects. No attribution required.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">Learn More</Button>
                    <Button size="sm">Get Started</Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
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

      {/* Animated Collapsible */}
      <Card>
        <CardHeader>
          <CardTitle>Animated Collapsible</CardTitle>
          <CardDescription>
            Collapsible with smooth animations and rotating chevron icon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <Collapsible open={isOpen2} onOpenChange={setIsOpen2}>
                <CollapsibleTrigger className="group" asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Show repositories ({repositories.length})
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {repositories.map((repo, index) => (
                    <div
                      key={index}
                      className="rounded-md border px-4 py-3 font-mono text-sm bg-background"
                    >
                      {repo}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Animated Code</h4>
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

      {/* File Tree Structure */}
      <Card>
        <CardHeader>
          <CardTitle>File Tree Structure</CardTitle>
          <CardDescription>
            Nested collapsible components for creating file tree interfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <div className="bg-background rounded border p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  Project Structure
                </h4>
                {renderFileTree(fileStructure)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Multiple Collapsibles Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.multiple)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.multiple}</code>
          </pre>
        </CardContent>
      </Card>

      {/* FAQ Style */}
      <Card>
        <CardHeader>
          <CardTitle>FAQ Style Collapsibles</CardTitle>
          <CardDescription>
            Multiple independent collapsible sections for FAQ interfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-2xl mx-auto space-y-2">
              {[
                {
                  id: 'installation',
                  question: 'How do I install this component?',
                  answer: 'You can install it using npm or yarn. Run "npm install @radix-ui/react-collapsible" and import the components you need.'
                },
                {
                  id: 'styling',
                  question: 'Can I customize the styling?',
                  answer: 'Yes, the component is unstyled by default. You can add your own CSS classes or use CSS-in-JS solutions to style it.'
                },
                {
                  id: 'accessibility',
                  question: 'Is this component accessible?',
                  answer: 'Yes, it follows WAI-ARIA patterns and supports keyboard navigation. It includes proper ARIA attributes for screen readers.'
                }
              ].map((faq) => (
                <Collapsible key={faq.id} open={openSections.includes(faq.id)}>
                  <CollapsibleTrigger 
                    onClick={() => toggleSection(faq.id)}
                    className="flex w-full items-center justify-between rounded-lg bg-background px-4 py-3 text-left hover:bg-muted"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <Plus className={`h-4 w-4 transition-transform ${openSections.includes(faq.id) ? 'rotate-45' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-3">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for collapsible components and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Smooth open/close animations</li>
                <li>• Keyboard navigation support</li>
                <li>• Customizable trigger elements</li>
                <li>• Controlled and uncontrolled modes</li>
                <li>• ARIA attributes for accessibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear trigger labels</li>
                <li>• Provide visual state indicators</li>
                <li>• Consider initial open state</li>
                <li>• Test with screen readers</li>
                <li>• Avoid nesting too deeply</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}