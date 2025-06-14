import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

interface GuidelineSection {
  title: string;
  description: string;
  examples: Array<{
    do: string;
    dont: string;
  }>;
  status: 'required' | 'recommended' | 'optional';
}

const guidelines: GuidelineSection[] = [
  {
    title: 'Color Usage',
    description: 'Consistent color application across components',
    status: 'required',
    examples: [
      {
        do: 'Use semantic color tokens (primary, success, warning, error)',
        dont: 'Use hardcoded hex values or random colors'
      },
      {
        do: 'Maintain 4.5:1 contrast ratio for text',
        dont: 'Use low contrast color combinations'
      }
    ]
  },
  {
    title: 'Typography',
    description: 'Proper text hierarchy and readability',
    status: 'required',
    examples: [
      {
        do: 'Use consistent font sizes from the type scale',
        dont: 'Mix random font sizes throughout the interface'
      },
      {
        do: 'Maintain proper line height (1.4-1.6 for body text)',
        dont: 'Use cramped or overly spaced line heights'
      }
    ]
  },
  {
    title: 'Spacing',
    description: 'Consistent spacing patterns for visual harmony',
    status: 'required',
    examples: [
      {
        do: 'Use multiples of 4px (8px, 16px, 24px, 32px)',
        dont: 'Use arbitrary spacing values like 13px or 27px'
      },
      {
        do: 'Apply consistent padding within similar components',
        dont: 'Mix different padding values in the same component type'
      }
    ]
  },
  {
    title: 'Interactive States',
    description: 'Clear feedback for user interactions',
    status: 'recommended',
    examples: [
      {
        do: 'Provide hover, focus, and active states for all interactive elements',
        dont: 'Leave buttons or links without visual feedback'
      },
      {
        do: 'Use consistent transition durations (150-300ms)',
        dont: 'Mix slow and fast animations randomly'
      }
    ]
  },
  {
    title: 'Component Composition',
    description: 'Building interfaces with reusable components',
    status: 'recommended',
    examples: [
      {
        do: 'Compose complex interfaces from simple, reusable components',
        dont: 'Create monolithic components that are hard to maintain'
      },
      {
        do: 'Follow the single responsibility principle',
        dont: 'Mix multiple concerns in a single component'
      }
    ]
  }
];

export default function ComponentUsageGuidelinesShowcase() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'required':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'recommended':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'optional':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      required: 'destructive',
      recommended: 'secondary',
      optional: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Component Usage Guidelines</h1>
            <p className="text-lg text-muted-foreground">
              Best practices and standards for implementing design system components.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Documentation</Badge>
          <Badge variant="outline">Guidelines</Badge>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Design System Principles</CardTitle>
          <CardDescription>
            Core principles that guide component usage and implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Consistency</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Maintain visual and functional consistency across all components and interfaces.
              </p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Accessibility</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ensure all components are accessible to users with diverse abilities and needs.
              </p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Scalability</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Design components that can grow and adapt with your product requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      {guidelines.map((guideline, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(guideline.status)}
                  {guideline.title}
                </CardTitle>
                <CardDescription>{guideline.description}</CardDescription>
              </div>
              {getStatusBadge(guideline.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {guideline.examples.map((example, exampleIndex) => (
                <div key={exampleIndex} className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200 text-sm">Do</p>
                      <p className="text-sm text-green-700 dark:text-green-300">{example.do}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200 text-sm">Don't</p>
                      <p className="text-sm text-red-700 dark:text-red-300">{example.dont}</p>
                    </div>
                  </div>
                  
                  {exampleIndex < guideline.examples.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference Checklist</CardTitle>
          <CardDescription>
            Essential checks before implementing any component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Before Implementation</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Check existing components for similar functionality</li>
                <li>• Review design tokens for colors, spacing, and typography</li>
                <li>• Validate accessibility requirements</li>
                <li>• Consider responsive behavior</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">After Implementation</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Test with keyboard navigation</li>
                <li>• Verify color contrast ratios</li>
                <li>• Test on different screen sizes</li>
                <li>• Document any new patterns or variations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}