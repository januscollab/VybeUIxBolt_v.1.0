
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Star, 
  GitCommit, 
  MessageSquare,
  Calendar,
  Trophy,
  Zap,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const projectTimeline = [
  {
    id: 1,
    title: "Project Kickoff",
    description: "Initial meeting with stakeholders and project planning",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "completed",
    icon: CheckCircle,
    iconColor: "text-success",
    details: "Defined project scope, timeline, and deliverables"
  },
  {
    id: 2,
    title: "Design Phase",
    description: "UI/UX design and wireframing",
    date: "2024-01-22",
    time: "2:00 PM",
    status: "completed",
    icon: Star,
    iconColor: "text-warning",
    details: "Created mockups and prototypes for user testing"
  },
  {
    id: 3,
    title: "Development Sprint 1",
    description: "Frontend component implementation",
    date: "2024-02-01",
    time: "9:00 AM",
    status: "in-progress",
    icon: Clock,
    iconColor: "text-info",
    details: "Building core components and basic functionality"
  },
  {
    id: 4,
    title: "Code Review",
    description: "Team review and quality assurance",
    date: "2024-02-15",
    time: "11:00 AM",
    status: "pending",
    icon: GitCommit,
    iconColor: "text-muted-foreground",
    details: "Security audit and code quality assessment"
  },
  {
    id: 5,
    title: "Launch Preparation",
    description: "Final testing and deployment setup",
    date: "2024-02-28",
    time: "3:00 PM",
    status: "pending",
    icon: AlertCircle,
    iconColor: "text-muted-foreground",
    details: "Production environment setup and monitoring"
  }
];

const activityFeed = [
  {
    id: 1,
    user: "John Doe",
    action: "commented on",
    target: "Design System Review",
    time: "2 hours ago",
    avatar: "/placeholder.svg",
    icon: MessageSquare,
    iconColor: "text-blue-500"
  },
  {
    id: 2,
    user: "Sarah Wilson",
    action: "completed",
    target: "Typography Component",
    time: "4 hours ago",
    avatar: "/placeholder.svg",
    icon: CheckCircle,
    iconColor: "text-green-500"
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "started working on",
    target: "Button Variants",
    time: "6 hours ago",
    avatar: "/placeholder.svg",
    icon: Clock,
    iconColor: "text-orange-500"
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "created",
    target: "Color Palette Documentation",
    time: "1 day ago",
    avatar: "/placeholder.svg",
    icon: Star,
    iconColor: "text-purple-500"
  }
];

const milestones = [
  {
    id: 1,
    title: "MVP Release",
    date: "Q1 2024",
    status: "completed",
    achievements: ["Core components", "Basic documentation", "Initial deployment"]
  },
  {
    id: 2,
    title: "Beta Launch",
    date: "Q2 2024",
    status: "in-progress",
    achievements: ["User testing", "Feedback integration", "Performance optimization"]
  },
  {
    id: 3,
    title: "Public Release",
    date: "Q3 2024",
    status: "planned",
    achievements: ["Full documentation", "Marketing launch", "Community support"]
  }
];

export default function TimelineShowcase() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Timeline</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Chronological display of events, milestones, and activities with various layouts and styles.
        </p>
      </div>

      {/* Vertical Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Vertical timeline showing project milestones and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {projectTimeline.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="relative flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className={cn(
                      "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background",
                      event.status === 'completed' ? "border-success bg-success/10" :
                      event.status === 'in-progress' ? "border-info bg-info/10" :
                      "border-border bg-muted"
                    )}>
                      <Icon className={cn("h-5 w-5", event.iconColor)} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold">{event.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          {event.date} • {event.time}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{event.details}</p>
                      
                      <div className="mt-2">
                        <Badge 
                          variant={
                            event.status === 'completed' ? 'default' :
                            event.status === 'in-progress' ? 'secondary' :
                            'outline'
                          }
                          className="text-xs"
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Timeline showing user activities and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityFeed.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-4 w-4", activity.iconColor)} />
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Horizontal Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Milestone Timeline</CardTitle>
          <CardDescription>Horizontal timeline showing major milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-6 left-8 right-8 h-0.5 bg-border"></div>
            
            <div className="flex justify-between relative">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex flex-col items-center text-center max-w-[200px]">
                  {/* Milestone dot */}
                  <div className={cn(
                    "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background mb-4",
                    milestone.status === 'completed' ? "border-success bg-success text-success-foreground" :
                    milestone.status === 'in-progress' ? "border-info bg-info text-info-foreground" :
                    "border-border bg-muted"
                  )}>
                    {milestone.status === 'completed' ? (
                      <Trophy className="h-5 w-5" />
                    ) : milestone.status === 'in-progress' ? (
                      <Zap className="h-5 w-5" />
                    ) : (
                      <Calendar className="h-5 w-5" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">{milestone.title}</h3>
                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                    <div className="space-y-1">
                      {milestone.achievements.map((achievement, i) => (
                        <div key={i} className="text-xs text-muted-foreground">
                          • {achievement}
                        </div>
                      ))}
                    </div>
                    <Badge 
                      variant={
                        milestone.status === 'completed' ? 'default' :
                        milestone.status === 'in-progress' ? 'secondary' :
                        'outline'
                      }
                      className="text-xs"
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Timeline</CardTitle>
          <CardDescription>Space-efficient timeline for dense information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "9:00 AM", event: "Daily standup meeting", status: "completed" },
              { time: "10:30 AM", event: "Code review session", status: "completed" },
              { time: "2:00 PM", event: "Design sync meeting", status: "in-progress" },
              { time: "4:00 PM", event: "Sprint planning", status: "pending" },
              { time: "5:30 PM", event: "Team retrospective", status: "pending" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  item.status === 'completed' ? "bg-success" :
                  item.status === 'in-progress' ? "bg-info" :
                  "bg-border"
                )} />
                <div className="text-xs text-muted-foreground min-w-[60px]">
                  {item.time}
                </div>
                <div className="text-sm flex-1">{item.event}</div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    item.status === 'completed' && "border-success text-success",
                    item.status === 'in-progress' && "border-info text-info"
                  )}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Timeline</CardTitle>
          <CardDescription>Timeline with expandable details and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {[
                {
                  title: "Design System Launch",
                  description: "Official launch of the VybeUI design system",
                  date: "Today",
                  expandable: true
                },
                {
                  title: "Component Library Update",
                  description: "Added 15 new components to the library",
                  date: "2 days ago",
                  expandable: true
                },
                {
                  title: "Documentation Overhaul",
                  description: "Complete rewrite of component documentation",
                  date: "1 week ago",
                  expandable: false
                }
              ].map((event, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {event.date}
                      </div>
                    </div>
                    
                    {event.expandable && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="ghost">
                          Share
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Guidelines</CardTitle>
          <CardDescription>Best practices for timeline components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use consistent visual hierarchy</li>
                <li>• Include clear time indicators</li>
                <li>• Provide status and progress context</li>
                <li>• Use appropriate icons for events</li>
                <li>• Consider responsive behavior</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Layout Options</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Vertical for detailed narratives</li>
                <li>• Horizontal for milestones</li>
                <li>• Compact for dense information</li>
                <li>• Interactive for user engagement</li>
                <li>• Activity feeds for real-time updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
