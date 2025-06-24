
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, AlertCircleIcon, LightbulbIcon, BookOpenIcon } from 'lucide-react';

interface CalloutProps {
  variant: 'info' | 'warning' | 'success' | 'error' | 'tip' | 'note';
  title?: string;
  children: React.ReactNode;
}

function Callout({ variant, title, children }: CalloutProps) {
  const variants = {
    info: {
      bg: 'bg-primary/10 border-l-primary dark:bg-primary/20',
      text: 'text-primary-foreground dark:text-primary',
      icon: InfoIcon,
      iconColor: 'text-primary'
    },
    warning: {
      bg: 'bg-warning/10 border-l-warning dark:bg-warning/20',
      text: 'text-warning-foreground dark:text-warning',
      icon: AlertTriangleIcon,
      iconColor: 'text-warning'
    },
    success: {
      bg: 'bg-success/10 border-l-success dark:bg-success/20',
      text: 'text-success-foreground dark:text-success',
      icon: CheckCircleIcon,
      iconColor: 'text-success'
    },
    error: {
      bg: 'bg-destructive/10 border-l-destructive dark:bg-destructive/20',
      text: 'text-destructive-foreground dark:text-destructive',
      icon: AlertCircleIcon,
      iconColor: 'text-destructive'
    },
    tip: {
      bg: 'bg-accent/10 border-l-accent dark:bg-accent/20',
      text: 'text-accent-foreground dark:text-accent',
      icon: LightbulbIcon,
      iconColor: 'text-accent'
    },
    note: {
      bg: 'bg-muted border-l-muted-foreground dark:bg-muted/50',
      text: 'text-muted-foreground dark:text-foreground',
      icon: BookOpenIcon,
      iconColor: 'text-muted-foreground'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${config.bg} ${config.text}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function CalloutShowcase() {
  return (
    <div className="space-y-6 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Callout</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Highlighted content blocks for tips and warnings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Callout</CardTitle>
          <CardDescription>
            Highlighted content blocks for tips and warnings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Basic Callouts</h4>
            
            <Callout variant="info" title="Information">
              This is an informational callout that provides helpful context or additional details about a topic.
            </Callout>

            <Callout variant="warning" title="Warning">
              This action may have unintended consequences. Please review the documentation before proceeding.
            </Callout>

            <Callout variant="success" title="Success">
              Your changes have been saved successfully and are now live on your website.
            </Callout>

            <Callout variant="error" title="Error">
              Something went wrong while processing your request. Please try again or contact support if the issue persists.
            </Callout>

            <Callout variant="tip" title="Pro Tip">
              Use keyboard shortcuts Cmd+K (Mac) or Ctrl+K (Windows) to quickly access the command palette.
            </Callout>

            <Callout variant="note" title="Note">
              Remember to backup your data before making any major changes to your configuration.
            </Callout>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Callouts without Titles</h4>
            
            <Callout variant="info">
              You can also create callouts without titles for simpler messaging.
            </Callout>

            <Callout variant="warning">
              This feature is currently in beta and may not work as expected in all browsers.
            </Callout>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Rich Content Callouts</h4>
            
            <Callout variant="tip" title="Getting Started">
              <div className="space-y-2">
                <p>Welcome to VybeUI! Here are some quick tips to get you started:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Browse components in the sidebar</li>
                  <li>Copy code snippets with one click</li>
                  <li>Customize themes in the settings</li>
                  <li>Export your design system to Figma</li>
                </ul>
                <p className="font-medium">Happy building! 🚀</p>
              </div>
            </Callout>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
