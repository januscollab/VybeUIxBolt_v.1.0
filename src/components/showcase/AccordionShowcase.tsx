import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Figma, FileCode, Plus, Minus, ChevronRight, ChevronDown, CreditCard, User, Settings, Mail, ShieldCheck, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AccordionShowcase() {
  const [expanded, setExpanded] = useState<string[]>(["item-1"]);
  const [customExpanded, setCustomExpanded] = useState<string[]>(["payment"]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other components.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    multiple: `import { useState } from "react";

const [expanded, setExpanded] = useState<string[]>(["item-1"]);

<Accordion 
  type="multiple" 
  value={expanded} 
  onValueChange={setExpanded}
>
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      This item starts expanded.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      Multiple items can be open at once.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    custom: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1" className="border rounded-md mb-2 px-4">
    <AccordionTrigger className="py-3">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4" />
        <span>Payment Methods</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="pb-3">
      Manage your payment methods and billing details.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Accordion</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Vertically stacked sections of content that can be expanded or collapsed to reveal information.
        </p>
      </div>

      {/* Basic Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Accordion</CardTitle>
          <CardDescription>Simple accordion with single item expansion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern for accordions and includes
                    proper keyboard navigation, focus management, and ARIA attributes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match the other components in
                    the design system. The styles can be easily customized using Tailwind CSS.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                    The animation uses CSS transitions for smooth open and close effects.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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

      {/* Multiple Expansion */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Expansion</CardTitle>
          <CardDescription>Accordion that allows multiple items to be expanded simultaneously</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <Accordion 
                type="multiple" 
                value={expanded} 
                onValueChange={setExpanded}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>First Item</AccordionTrigger>
                  <AccordionContent>
                    This item starts expanded. In a multiple accordion, users can expand
                    multiple items at once, which is useful for comparing information or
                    when items are not mutually exclusive.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Second Item</AccordionTrigger>
                  <AccordionContent>
                    Multiple items can be open at once. This is useful for FAQ sections,
                    settings panels, or any content where users might want to see multiple
                    sections at the same time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Third Item</AccordionTrigger>
                  <AccordionContent>
                    The state is controlled externally, allowing for programmatic control
                    of which items are expanded. This enables features like "Expand All"
                    or "Collapse All" buttons.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setExpanded(["item-1", "item-2", "item-3"])}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Expand All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setExpanded([])}
                >
                  <Minus className="h-4 w-4 mr-1" />
                  Collapse All
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Multiple Expansion Code</h4>
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

      {/* Custom Styled Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styled Accordion</CardTitle>
          <CardDescription>Customized accordions with icons and enhanced styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <Accordion 
                type="multiple" 
                value={customExpanded} 
                onValueChange={setCustomExpanded}
                className="space-y-3"
              >
                <AccordionItem value="payment" className="border rounded-md px-4 shadow-sm bg-background">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span>Payment Methods</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Manage your payment methods and billing details.</p>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs">VISA</div>
                          <span>•••• 4242</span>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Payment Method
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account" className="border rounded-md px-4 shadow-sm bg-background">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>Account Settings</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Update your account information and preferences.</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Email</span>
                          <span className="text-muted-foreground">user@example.com</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Password</span>
                          <Button variant="ghost" size="sm" className="h-7 px-2">Change</Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security" className="border rounded-md px-4 shadow-sm bg-background">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>Security</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Manage your security settings and preferences.</p>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>Two-factor authentication</span>
                        </div>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Custom Styled Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.custom)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.custom}</code>
          </pre>
        </CardContent>
      </Card>

      {/* FAQ Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>FAQ Accordion</CardTitle>
          <CardDescription>Common pattern for frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To reset your password, click on the "Forgot Password" link on the login page.
                      You'll receive an email with instructions to create a new password.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-2">
                  <AccordionTrigger>
                    Can I change my subscription plan?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, you can change your subscription plan at any time. Go to Account Settings &gt; 
                      Subscription and select "Change Plan" to see available options.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-3">
                  <AccordionTrigger>
                    How do I cancel my account?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To cancel your account, go to Account Settings &gt; General and scroll to the
                      bottom where you'll find the "Cancel Account" option. Please note that this action
                      cannot be undone.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-4">
                  <AccordionTrigger>
                    Is there a mobile app available?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we have mobile apps for both iOS and Android. You can download them from
                      the App Store or Google Play Store by searching for "VybeUI".
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Icon Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Icon Accordion</CardTitle>
          <CardDescription>Accordion with custom expand/collapse icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[1, 2, 3].map((item) => (
                  <AccordionItem key={item} value={`custom-${item}`} className="border-b border-border">
                    <div className="flex">
                      <div className="flex-1 py-4">
                        <AccordionTrigger className="hover:no-underline py-0 [&>svg]:hidden">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">Section {item}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Click to expand</span>
                              <div className="data-[state=open]:rotate-90 transition-transform duration-200">
                                <ChevronRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                      </div>
                    </div>
                    <AccordionContent>
                      <div className="pb-4 pt-0 text-muted-foreground">
                        This accordion uses custom expand/collapse icons and styling.
                        You can customize the appearance to match your design requirements.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>Best practices for using accordions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use for organizing related content into sections</li>
                <li>• Keep accordion headers short and descriptive</li>
                <li>• Consider whether single or multiple expansion is appropriate</li>
                <li>• Use icons to enhance understanding</li>
                <li>• Ensure sufficient contrast for interactive elements</li>
                <li>• Consider the default state (expanded or collapsed)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Ensure keyboard navigation (Tab, Enter, Space)</li>
                <li>• Use proper ARIA attributes</li>
                <li>• Provide visual focus indicators</li>
                <li>• Announce state changes to screen readers</li>
                <li>• Consider motion preferences for animations</li>
                <li>• Test with screen readers and keyboard navigation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}