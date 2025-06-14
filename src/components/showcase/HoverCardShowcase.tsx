import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Figma, FileCode, User, MapPin, Calendar, Github, Twitter, ExternalLink, Star, GitFork, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function HoverCardShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2">
          <Calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    userProfile: `<HoverCard>
  <HoverCardTrigger className="cursor-pointer">
    <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src="/avatars/01.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">John Doe</span>
    </div>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    <UserProfileCard user={user} />
  </HoverCardContent>
</HoverCard>`,
    repository: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-primary hover:underline">
      shadcn/ui
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold">shadcn/ui</h4>
        <p className="text-sm text-muted-foreground">
          Beautifully designed components built with Radix UI and Tailwind CSS.
        </p>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center">
          <Star className="mr-1 h-3 w-3" />
          45.2k
        </div>
        <div className="flex items-center">
          <GitFork className="mr-1 h-3 w-3" />
          4.1k
        </div>
        <div className="flex items-center">
          <Eye className="mr-1 h-3 w-3" />
          421
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`
  };

  const teamMembers = [
    {
      name: "Sarah Wilson",
      role: "Product Designer",
      avatar: "/placeholder.svg",
      initials: "SW",
      location: "San Francisco, CA",
      joined: "March 2023",
      projects: 12,
      contributions: 156
    },
    {
      name: "Alex Chen",
      role: "Frontend Developer", 
      avatar: "/placeholder.svg",
      initials: "AC",
      location: "New York, NY",
      joined: "January 2023",
      projects: 8,
      contributions: 234
    },
    {
      name: "Maria Garcia",
      role: "UX Researcher",
      avatar: "/placeholder.svg", 
      initials: "MG",
      location: "Austin, TX",
      joined: "June 2023",
      projects: 6,
      contributions: 89
    }
  ];

  const repositories = [
    {
      name: "react-components",
      description: "A collection of reusable React components",
      language: "TypeScript",
      stars: 1234,
      forks: 89,
      watchers: 45,
      updated: "2 hours ago"
    },
    {
      name: "design-system",
      description: "Complete design system with tokens and guidelines", 
      language: "CSS",
      stars: 567,
      forks: 23,
      watchers: 12,
      updated: "1 day ago"
    },
    {
      name: "ui-library",
      description: "Modern UI library built with Tailwind CSS",
      language: "JavaScript", 
      stars: 890,
      forks: 45,
      watchers: 28,
      updated: "3 days ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Hover Card</h1>
            <p className="text-lg text-muted-foreground">
              Rich hover preview cards for displaying additional information on hover.
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
          <Badge variant="outline">Overlay</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Basic Hover Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Hover Card</CardTitle>
          <CardDescription>
            Simple hover card with profile information and metadata.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Hover over the link below to see the hover card
              </p>
              <div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className="text-lg">@nextjs</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarFallback>NX</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm text-muted-foreground">
                          The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                          <Calendar className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-xs text-muted-foreground">
                            Joined December 2021
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
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

      {/* Team Member Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Team Member Profiles</CardTitle>
          <CardDescription>
            Rich hover cards for team member profiles with detailed information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-center mb-4">Our Team (hover to see profiles)</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {teamMembers.map((member, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger className="cursor-pointer">
                      <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="text-sm font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 flex-1">
                            <h4 className="text-sm font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-3 w-3" />
                            {member.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-3 w-3" />
                            Joined {member.joined}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <div className="text-center">
                            <div className="font-medium">{member.projects}</div>
                            <div className="text-muted-foreground">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{member.contributions}</div>
                            <div className="text-muted-foreground">Contributions</div>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">User Profile Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.userProfile)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.userProfile}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Repository Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Repository Information</CardTitle>
          <CardDescription>
            Hover cards for repository links with stats and metadata.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-center mb-4">Popular Repositories</h4>
              <div className="space-y-2">
                {repositories.map((repo, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <a href="#" className="text-primary hover:underline font-medium">
                          {repo.name}
                        </a>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                              <Github className="h-4 w-4" />
                              {repo.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {repo.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                              {repo.language}
                            </div>
                            <div className="flex items-center">
                              <Star className="mr-1 h-3 w-3" />
                              {repo.stars}
                            </div>
                            <div className="flex items-center">
                              <GitFork className="mr-1 h-3 w-3" />
                              {repo.forks}
                            </div>
                            <div className="flex items-center">
                              <Eye className="mr-1 h-3 w-3" />
                              {repo.watchers}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Updated {repo.updated}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-7">
                              <Star className="h-3 w-3 mr-1" />
                              Star
                            </Button>
                            <Button size="sm" variant="outline" className="h-7">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <span className="text-xs text-muted-foreground">{repo.language}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Repository Card Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.repository)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.repository}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for hover card design and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Hover and focus trigger support</li>
                <li>• Customizable delay and positioning</li>
                <li>• Portal rendering for z-index control</li>
                <li>• Keyboard navigation support</li>
                <li>• Mobile-friendly touch behavior</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep content concise and relevant</li>
                <li>• Use appropriate hover delays (500ms)</li>
                <li>• Ensure mobile accessibility</li>
                <li>• Test with keyboard navigation</li>
                <li>• Consider loading states for dynamic content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}