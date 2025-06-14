import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copy, Figma, FileCode, User, Mail, Phone, MapPin, Calendar, Star, CheckCircle, Clock, AlertCircle, ChevronRight, MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ListShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<div className="space-y-4">
  <div className="flex items-center space-x-4">
    <Avatar>
      <AvatarImage src="/avatars/01.png" />
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">Olivia Martin</p>
      <p className="text-sm text-muted-foreground">m@example.com</p>
    </div>
  </div>
  <Separator />
  <div className="flex items-center space-x-4">
    <Avatar>
      <AvatarImage src="/avatars/02.png" />
      <AvatarFallback>JL</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">Jackson Lee</p>
      <p className="text-sm text-muted-foreground">p@example.com</p>
    </div>
  </div>
</div>`,
    interactive: `<div className="space-y-2">
  {items.map((item) => (
    <Button
      key={item.id}
      variant="ghost"
      className="w-full justify-start p-4 h-auto"
    >
      <div className="flex items-center space-x-4 w-full">
        <Avatar>
          <AvatarFallback>{item.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.email}</p>
        </div>
        <ChevronRight className="h-4 w-4" />
      </div>
    </Button>
  ))}
</div>`,
    status: `<div className="space-y-4">
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center space-x-3">
      <CheckCircle className="h-5 w-5 text-green-500" />
      <div>
        <p className="text-sm font-medium">Task completed</p>
        <p className="text-sm text-muted-foreground">Finished 2 hours ago</p>
      </div>
    </div>
    <Badge variant="secondary">Completed</Badge>
  </div>
</div>`
  };

  const contacts = [
    { id: 1, name: "Olivia Martin", email: "olivia@example.com", phone: "+1 234 567 8901", role: "Designer", initials: "OM" },
    { id: 2, name: "Jackson Lee", email: "jackson@example.com", phone: "+1 234 567 8902", role: "Developer", initials: "JL" },
    { id: 3, name: "Isabella Nguyen", email: "isabella@example.com", phone: "+1 234 567 8903", role: "Manager", initials: "IN" },
    { id: 4, name: "William Kim", email: "william@example.com", phone: "+1 234 567 8904", role: "Analyst", initials: "WK" },
  ];

  const tasks = [
    { id: 1, title: "Design new landing page", status: "completed", priority: "high", date: "2024-01-15" },
    { id: 2, title: "Review user feedback", status: "in-progress", priority: "medium", date: "2024-01-16" },
    { id: 3, title: "Update documentation", status: "pending", priority: "low", date: "2024-01-17" },
    { id: 4, title: "Fix critical bug", status: "urgent", priority: "high", date: "2024-01-14" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "urgent": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress": return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "urgent": return <Badge variant="destructive">Urgent</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">List</h1>
            <p className="text-lg text-muted-foreground">
              Display collections of related information in a structured, scannable format.
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
          <Badge variant="outline">Layout</Badge>
        </div>
      </div>

      {/* Basic List */}
      <Card>
        <CardHeader>
          <CardTitle>Basic List</CardTitle>
          <CardDescription>
            Simple list with avatars and basic information display.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              {contacts.slice(0, 3).map((contact, index) => (
                <div key={contact.id}>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{contact.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                    <Badge variant="outline">{contact.role}</Badge>
                  </div>
                  {index < 2 && <Separator className="my-4" />}
                </div>
              ))}
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

      {/* Interactive List */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive List</CardTitle>
          <CardDescription>
            Clickable list items with hover states and action indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              {contacts.map((contact) => (
                <Button
                  key={contact.id}
                  variant="ghost"
                  className="w-full justify-start p-4 h-auto"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <Avatar>
                      <AvatarFallback>{contact.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{contact.role}</Badge>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Interactive List Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.interactive)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.interactive}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Status List */}
      <Card>
        <CardHeader>
          <CardTitle>Status List</CardTitle>
          <CardDescription>
            List with status indicators, badges, and contextual information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        <Calendar className="inline h-3 w-3 mr-1" />
                        {task.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(task.status)}
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Status List Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.status)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.status}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Rich Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Rich Content List</CardTitle>
          <CardDescription>
            Complex list with multiple data points, actions, and detailed information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 border rounded-lg bg-background">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{contact.initials}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.role}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="h-3 w-3 mr-2" />
                            {contact.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-2" />
                            {contact.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible list components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Semantic HTML structure with proper roles</li>
                <li>• Keyboard navigation for interactive lists</li>
                <li>• Screen reader friendly content hierarchy</li>
                <li>• Focus indicators for actionable items</li>
                <li>• ARIA labels for status and context</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use consistent spacing and alignment</li>
                <li>• Provide clear visual hierarchy</li>
                <li>• Include relevant status indicators</li>
                <li>• Make interactive elements obvious</li>
                <li>• Consider mobile touch targets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}