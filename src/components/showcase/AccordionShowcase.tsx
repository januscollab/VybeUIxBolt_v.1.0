import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CodeModal } from "@/components/ui/code-modal";
import { Copy, Figma, FileCode, Star, Users, Settings, HelpCircle } from "lucide-react";

export default function AccordionShowcase() {

  const codeExamples = {
    basic: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other components aesthetic.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    multiple: `<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
    <AccordionContent>
      Yes! This accordion allows multiple items to be open simultaneously.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How does it work?</AccordionTrigger>
    <AccordionContent>
      Set type="multiple" to allow multiple panels to be expanded at once.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    withIcons: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="features">
    <AccordionTrigger>
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4" />
        Features
      </div>
    </AccordionTrigger>
    <AccordionContent>
      Our platform includes advanced analytics, real-time collaboration, 
      and enterprise-grade security features.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Accordion</h1>
            <p className="text-lg text-muted-foreground">
              A vertically stacked set of interactive headings that each reveal a section of content.
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
          <Badge variant="outline">Content</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Basic Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Accordion</CardTitle>
          <CardDescription>
            Single collapsible accordion with one item open at a time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern and includes proper keyboard navigation, 
                  screen reader support, and focus management.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other components' aesthetic. 
                  You can customize it further with CSS or by using the built-in variant props.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. The accordion includes smooth open and close animations using CSS transitions 
                  and transforms for a polished user experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <CodeModal code={codeExamples.basic} title="Basic Accordion Code">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Multiple Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Open Items</CardTitle>
          <CardDescription>
            Accordion that allows multiple items to be expanded simultaneously.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
                <AccordionContent>
                  Yes! This accordion allows multiple items to be open simultaneously. 
                  This is useful for comparing information or when users need to reference 
                  multiple sections at once.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                  Set type="multiple" to allow multiple panels to be expanded at once. 
                  Users can open and close any combination of items independently.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>When should I use this?</AccordionTrigger>
                <AccordionContent>
                  Use multiple accordions when the content sections are independent and 
                  users might need to compare information across different sections.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Multiple Accordion Code</h4>
            <CodeModal code={codeExamples.multiple} title="Multiple Accordion Code">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Accordion with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Accordion with Icons</CardTitle>
          <CardDescription>
            Enhanced accordion with icons and rich content for better visual hierarchy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="features">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Features
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Our platform includes advanced analytics, real-time collaboration, 
                  enterprise-grade security features, custom integrations, and 24/7 support 
                  to help your team succeed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="team">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team Management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Manage your team with role-based permissions, invite unlimited members, 
                  track activity logs, and set up automated workflows for seamless collaboration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="settings">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configuration
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Customize your workspace with themes, configure integrations, set up 
                  notifications, and manage security settings to match your organization's needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="support">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Support & Help
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Access our comprehensive documentation, video tutorials, community forums, 
                  and direct support channels. We're here to help you succeed every step of the way.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Accordion with Icons Code</h4>
            <CodeModal code={codeExamples.withIcons} title="Accordion with Icons Code">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                View Code
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible accordion components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA attributes for screen reader support</li>
                <li>• Keyboard navigation (Space, Enter, Tab)</li>
                <li>• Focus management and visible focus indicators</li>
                <li>• Proper heading structure and semantics</li>
                <li>• State announcements for expanded/collapsed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, descriptive trigger text</li>
                <li>• Keep content concise and scannable</li>
                <li>• Consider single vs. multiple open behavior</li>
                <li>• Provide visual hierarchy with proper spacing</li>
                <li>• Use icons to enhance meaning, not decoration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}