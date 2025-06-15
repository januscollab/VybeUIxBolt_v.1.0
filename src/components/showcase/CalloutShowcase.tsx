import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, AlertCircleIcon, LightbulbIcon, BookOpenIcon } from 'lucide-react';

interface CalloutProps {
  variant: 'info' | 'warning' | 'success' | 'error' | 'tip' | 'note';
  title?: string;
  children: React.ReactNode;
}

function Callout({ variant, title, children }: CalloutProps) {
  const variants = {
    info: {
      bg: 'bg-blue-50 border-l-blue-500 dark:bg-blue-950/50',
      text: 'text-blue-900 dark:text-blue-100',
      icon: InfoIcon,
      iconColor: 'text-blue-500'
    },
    warning: {
      bg: 'bg-yellow-50 border-l-yellow-500 dark:bg-yellow-950/50',
      text: 'text-yellow-900 dark:text-yellow-100',
      icon: AlertTriangleIcon,
      iconColor: 'text-yellow-500'
    },
    success: {
      bg: 'bg-green-50 border-l-green-500 dark:bg-green-950/50',
      text: 'text-green-900 dark:text-green-100',
      icon: CheckCircleIcon,
      iconColor: 'text-green-500'
    },
    error: {
      bg: 'bg-red-50 border-l-red-500 dark:bg-red-950/50',
      text: 'text-red-900 dark:text-red-100',
      icon: AlertCircleIcon,
      iconColor: 'text-red-500'
    },
    tip: {
      bg: 'bg-purple-50 border-l-purple-500 dark:bg-purple-950/50',
      text: 'text-purple-900 dark:text-purple-100',
      icon: LightbulbIcon,
      iconColor: 'text-purple-500'
    },
    note: {
      bg: 'bg-gray-50 border-l-gray-500 dark:bg-gray-950/50',
      text: 'text-gray-900 dark:text-gray-100',
      icon: BookOpenIcon,
      iconColor: 'text-gray-500'
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
    <div className="space-y-6">
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