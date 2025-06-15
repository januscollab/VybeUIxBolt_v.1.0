import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContainerShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Container</CardTitle>
          <CardDescription>
            Layout container with responsive width constraints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fluid Container */}
          <div>
            <h4 className="text-sm font-medium mb-2">Fluid Container</h4>
            <div className="w-full bg-muted p-4 rounded-md">
              <div className="bg-primary/10 p-4 rounded text-center">
                Full width container
              </div>
            </div>
          </div>

          {/* Fixed Width Container */}
          <div>
            <h4 className="text-sm font-medium mb-2">Fixed Width Container</h4>
            <div className="w-full bg-muted p-4 rounded-md">
              <div className="max-w-md mx-auto bg-primary/10 p-4 rounded text-center">
                Max width container (md)
              </div>
            </div>
          </div>

          {/* Responsive Container */}
          <div>
            <h4 className="text-sm font-medium mb-2">Responsive Container</h4>
            <div className="w-full bg-muted p-4 rounded-md">
              <div className="container mx-auto bg-primary/10 p-4 rounded text-center">
                Responsive container with breakpoints
              </div>
            </div>
          </div>

          {/* Constrained Container */}
          <div>
            <h4 className="text-sm font-medium mb-2">Constrained Container</h4>
            <div className="w-full bg-muted p-4 rounded-md">
              <div className="max-w-2xl mx-auto bg-primary/10 p-4 rounded text-center">
                Content-constrained container (2xl)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}