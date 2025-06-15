import React, { Component, ReactNode, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-8">
          <AlertTriangleIcon className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
            An error occurred while rendering this component. Please try refreshing the page.
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
          >
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyComponent({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Intentional error for demo purposes');
  }
  return <div className="p-4 bg-green-50 rounded text-green-800">Component loaded successfully!</div>;
}

export default function ErrorBoundaryShowcase() {
  const [triggerError, setTriggerError] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Error Boundary</CardTitle>
          <CardDescription>
            Graceful error handling with recovery options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertDescription>
              Error boundaries catch JavaScript errors anywhere in the component tree and display a fallback UI instead of crashing the entire application.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={() => setTriggerError(false)}
                variant={!triggerError ? "default" : "outline"}
              >
                Show working component
              </Button>
              <Button 
                onClick={() => setTriggerError(true)}
                variant={triggerError ? "destructive" : "outline"}
              >
                Trigger error
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3">Component Output:</h4>
              <ErrorBoundary>
                <BuggyComponent shouldCrash={triggerError} />
              </ErrorBoundary>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Custom Error Fallback</h4>
            <ErrorBoundary
              fallback={
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />
                  <AlertDescription>
                    Custom error message: The component failed to load. Please contact support if this issue persists.
                  </AlertDescription>
                </Alert>
              }
            >
              <BuggyComponent shouldCrash={triggerError} />
            </ErrorBoundary>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}