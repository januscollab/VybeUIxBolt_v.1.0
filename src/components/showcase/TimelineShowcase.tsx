import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { CodeModal } from '@/components/ui/code-modal';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TimelineShowcase() {
  const projectTimeline: TimelineItem[] = [
    {
      id: '1',
      title: 'Project Kickoff',
      description: 'Initial planning and team setup completed',
      time: '2 weeks ago',
      status: 'completed',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Design Phase',
      description: 'UI/UX design and wireframes created',
      time: '1 week ago',
      status: 'completed',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Development Sprint 1',
      description: 'Core components and basic functionality',
      time: 'In progress',
      status: 'current',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: '4',
      title: 'Testing & QA',
      description: 'Comprehensive testing and bug fixes',
      time: 'Next week',
      status: 'upcoming',
      icon: <AlertCircle className="w-4 h-4" />
    },
    {
      id: '5',
      title: 'Production Deploy',
      description: 'Final deployment to production environment',
      time: 'In 2 weeks',
      status: 'upcoming'
    }
  ];

  const activityTimeline: TimelineItem[] = [
    {
      id: '1',
      title: 'User Registration',
      description: 'New user john@example.com signed up',
      time: '5 min ago',
      status: 'completed'
    },
    {
      id: '2',
      title: 'File Upload',
      description: 'Document.pdf uploaded successfully',
      time: '12 min ago',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Payment Processed',
      description: '$49.99 subscription payment received',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: '4',
      title: 'System Update',
      description: 'Security patches applied to server',
      time: '3 hours ago',
      status: 'completed'
    }
  ];

  const implementationCode = `import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { CheckCircle, Clock } from 'lucide-react';

function ProjectTimeline() {
  const items: TimelineItem[] = [
    {
      id: '1',
      title: 'Project Started',
      description: 'Initial setup and planning phase',
      time: '2 days ago',
      status: 'completed',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Development',
      description: 'Core features implementation',
      time: 'In progress',
      status: 'current',
      icon: <Clock className="w-4 h-4" />
    }
  ];

  return <Timeline items={items} />;
}`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Timeline</h1>
            <p className="text-lg text-muted-foreground">
              Display chronological events with status indicators and custom icons.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">New</Badge>
          <Badge variant="outline">Display</Badge>
        </div>
      </div>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>
            Track project milestones with different status states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline items={projectTimeline} />
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>
            Recent system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline items={activityTimeline} variant="minimal" />
        </CardContent>
      </Card>

      {/* Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
          <CardDescription>How to use the Timeline component</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeModal code={implementationCode} title="Timeline Example">
            <Button variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              View Code
            </Button>
          </CodeModal>
        </CardContent>
      </Card>
    </div>
  );
}