import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Figma, FileCode, Plus, Settings, User, Mail, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function DialogShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form submitted!",
      description: "Your message has been sent successfully.",
    });
    setIsOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const codeExamples = {
    basic: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    controlled: `const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button onClick={() => setOpen(true)}>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    confirmation: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Dialog</h1>
            <p className="text-lg text-muted-foreground">
              Modal dialogs for displaying content that requires user interaction.
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
          <Badge variant="outline">Modal</Badge>
          <Badge variant="outline">Overlay</Badge>
        </div>
      </div>

      {/* Basic Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Dialog</CardTitle>
          <CardDescription>
            Simple dialog with form fields and action buttons.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

      {/* Controlled Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Controlled Dialog</CardTitle>
          <CardDescription>
            Dialog with controlled open state and form handling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Item</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new item. All fields are required.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-name">Name</Label>
                        <Input
                          id="item-name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter item name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-email">Email</Label>
                        <Input
                          id="item-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-message">Message</Label>
                        <Textarea
                          id="item-message"
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Enter your message"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Item</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Controlled Dialog Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.controlled)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.controlled}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Confirmation Dialogs */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Dialogs</CardTitle>
          <CardDescription>
            Different types of confirmation dialogs for various actions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-wrap justify-center gap-4">
              
              {/* Delete Confirmation */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Info Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Info className="h-4 w-4 mr-2" />
                    Show Info
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Information
                    </DialogTitle>
                    <DialogDescription>
                      Here is some important information that you should know about.
                      This dialog provides additional context and details.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>Got it</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Success Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Success
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Operation Successful
                    </DialogTitle>
                    <DialogDescription>
                      Your operation has been completed successfully. All changes have been saved.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>Continue</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Confirmation Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.confirmation)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.confirmation}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Complex Dialog Example</CardTitle>
          <CardDescription>
            Advanced dialog with multiple sections and complex form layouts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Application Settings</DialogTitle>
                    <DialogDescription>
                      Configure your application preferences and settings.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Profile Settings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Tell us about yourself"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Notification Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="email-notifications" className="rounded" />
                          <Label htmlFor="email-notifications">Email notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="push-notifications" className="rounded" />
                          <Label htmlFor="push-notifications">Push notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sms-notifications" className="rounded" />
                          <Label htmlFor="sms-notifications">SMS notifications</Label>
                        </div>
                      </div>
                    </div>

                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Settings</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for dialog design and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation (Tab, Escape)</li>
                <li>• Focus trapping and management</li>
                <li>• Backdrop click to close</li>
                <li>• Controlled and uncontrolled modes</li>
                <li>• Portal rendering for z-index</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use clear, descriptive titles</li>
                <li>• Provide cancel/close options</li>
                <li>• Keep content focused and concise</li>
                <li>• Use appropriate sizing</li>
                <li>• Handle form validation gracefully</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}