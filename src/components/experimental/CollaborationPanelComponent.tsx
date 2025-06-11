import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Users, MessageCircle, MousePointer2, Eye, Edit, Share2, 
  Clock, CheckCircle, AlertCircle, Send, AtSign, Smile,
  MoreHorizontal, Pin, Reply, Heart, Zap
} from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  cursor?: { x: number; y: number };
  role: 'editor' | 'viewer' | 'admin';
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  replies: Comment[];
  isResolved: boolean;
  position?: { x: number; y: number };
}

interface Activity {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: Date;
  type: 'edit' | 'comment' | 'share' | 'view';
}

export default function CollaborationPanelComponent() {
  const [activeUsers] = useState<User[]>([
    { id: '1', name: 'Sarah Chen', avatar: '/placeholder.svg', status: 'online', role: 'admin', cursor: { x: 45, y: 60 } },
    { id: '2', name: 'Mike Rodriguez', avatar: '/placeholder.svg', status: 'online', role: 'editor', cursor: { x: 70, y: 30 } },
    { id: '3', name: 'Emily Johnson', avatar: '/placeholder.svg', status: 'away', role: 'viewer' },
    { id: '4', name: 'David Kim', avatar: '/placeholder.svg', status: 'online', role: 'editor', cursor: { x: 25, y: 80 } },
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      user: activeUsers[0],
      content: 'The color scheme looks great! Should we make the CTA button more prominent?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      replies: [
        {
          id: '2',
          user: activeUsers[1],
          content: 'Good point! I\'ll increase the contrast and maybe add a subtle animation.',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          replies: [],
          isResolved: false
        }
      ],
      isResolved: false,
      position: { x: 45, y: 60 }
    },
    {
      id: '3',
      user: activeUsers[3],
      content: 'This workflow step needs clarification. What happens if the API call fails?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      replies: [],
      isResolved: false,
      position: { x: 70, y: 30 }
    }
  ]);

  const [activities] = useState<Activity[]>([
    { id: '1', user: activeUsers[0], action: 'edited', target: 'Button Component', timestamp: new Date(Date.now() - 1000 * 60 * 2), type: 'edit' },
    { id: '2', user: activeUsers[1], action: 'commented on', target: 'Color Palette', timestamp: new Date(Date.now() - 1000 * 60 * 5), type: 'comment' },
    { id: '3', user: activeUsers[2], action: 'viewed', target: 'Workflow Builder', timestamp: new Date(Date.now() - 1000 * 60 * 8), type: 'view' },
    { id: '4', user: activeUsers[3], action: 'shared', target: 'Design System', timestamp: new Date(Date.now() - 1000 * 60 * 12), type: 'share' },
  ]);

  const [newComment, setNewComment] = useState('');
  const [cursors, setCursors] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    // Simulate cursor movements
    const interval = setInterval(() => {
      const newCursors: Record<string, { x: number; y: number }> = {};
      activeUsers.forEach(user => {
        if (user.status === 'online' && user.cursor) {
          newCursors[user.id] = {
            x: user.cursor.x + (Math.random() - 0.5) * 5,
            y: user.cursor.y + (Math.random() - 0.5) * 5
          };
        }
      });
      setCursors(newCursors);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeUsers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      default: return 'bg-muted-foreground';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'edit': return Edit;
      case 'comment': return MessageCircle;
      case 'share': return Share2;
      case 'view': return Eye;
      default: return Clock;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Real-time Collaboration</h1>
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            Experimental
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Live collaboration panel with user presence, comments, and real-time activity tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Collaboration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="comments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Comments ({comments.length})
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="canvas" className="flex items-center gap-2">
                <MousePointer2 className="h-4 w-4" />
                Live Canvas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Team Comments
                  </CardTitle>
                  <CardDescription>
                    Discuss changes and provide feedback in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[400px] space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-3 pb-4 border-b border-border last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback>{comment.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{comment.user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {comment.user.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(comment.timestamp)}
                              </span>
                              {comment.position && (
                                <Badge variant="secondary" className="text-xs">
                                  <MousePointer2 className="h-3 w-3 mr-1" />
                                  Pinned
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                <Reply className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                <Heart className="h-3 w-3 mr-1" />
                                Like
                              </Button>
                              {!comment.isResolved && (
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="ml-11 flex items-start gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.user.avatar} />
                              <AvatarFallback>{reply.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-xs">{reply.user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </ScrollArea>
                  
                  {/* New Comment Input */}
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Live updates from your team members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {activities.map((activity) => {
                        const ActivityIcon = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={activity.user.avatar} />
                              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="text-sm">
                                <span className="font-medium">{activity.user.name}</span>
                                <span className="text-muted-foreground"> {activity.action} </span>
                                <span className="font-medium">{activity.target}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatTime(activity.timestamp)}
                              </div>
                            </div>
                            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="canvas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer2 className="h-5 w-5" />
                    Live Collaboration Canvas
                  </CardTitle>
                  <CardDescription>
                    See where your team members are working in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-muted/20 rounded-lg h-[400px] overflow-hidden">
                    {/* Simulated Canvas */}
                    <div className="absolute inset-4 bg-background rounded border border-dashed border-muted-foreground/20 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Zap className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Design System Canvas</p>
                        <p className="text-xs">Collaborative workspace</p>
                      </div>
                    </div>

                    {/* Live Cursors */}
                    {Object.entries(cursors).map(([userId, position]) => {
                      const user = activeUsers.find(u => u.id === userId);
                      if (!user || user.status !== 'online') return null;
                      
                      return (
                        <div
                          key={userId}
                          className="absolute pointer-events-none transition-all duration-200 ease-out"
                          style={{
                            left: `${Math.max(0, Math.min(95, position.x))}%`,
                            top: `${Math.max(0, Math.min(95, position.y))}%`,
                          }}
                        >
                          <MousePointer2 className="h-4 w-4 text-primary rotate-12" />
                          <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap ml-2 -mt-1">
                            {user.name}
                          </div>
                        </div>
                      );
                    })}

                    {/* Comment Pins */}
                    {comments.filter(c => c.position).map((comment) => (
                      <div
                        key={comment.id}
                        className="absolute"
                        style={{
                          left: `${comment.position!.x}%`,
                          top: `${comment.position!.y}%`,
                        }}
                      >
                        <div className="bg-warning text-warning-foreground rounded-full p-2 cursor-pointer hover:scale-110 transition-transform">
                          <MessageCircle className="h-3 w-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Users ({activeUsers.filter(u => u.status === 'online').length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {user.status}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Design System
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Pin className="h-4 w-4 mr-2" />
                Add Comment Pin
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AtSign className="h-4 w-4 mr-2" />
                Mention Someone
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Toggle View Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feature Info */}
      <Card>
        <CardHeader>
          <CardTitle>Collaboration Features</CardTitle>
          <CardDescription>Real-time collaboration capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Real-time Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Live cursor tracking and user presence</li>
                <li>• Real-time comments and annotations</li>
                <li>• Activity feed with instant updates</li>
                <li>• Collaborative editing with conflict resolution</li>
                <li>• Voice and video call integration</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Team Benefits</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Reduce feedback cycles and iteration time</li>
                <li>• Improve design consistency across teams</li>
                <li>• Enable async and sync collaboration modes</li>
                <li>• Track design decision history</li>
                <li>• Streamline approval workflows</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}