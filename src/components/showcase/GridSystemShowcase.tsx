import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GridSystemShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grid System</CardTitle>
          <CardDescription>
            Responsive grid layout with flexible columns and gaps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Grid */}
          <div>
            <h4 className="text-sm font-medium mb-3">Basic 12-Column Grid</h4>
            <div className="grid grid-cols-12 gap-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-primary/10 p-2 rounded text-center text-xs">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Grid */}
          <div>
            <h4 className="text-sm font-medium mb-3">Responsive Grid</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-primary/10 p-4 rounded text-center">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Column Spans */}
          <div>
            <h4 className="text-sm font-medium mb-3">Column Spans</h4>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2 bg-primary/10 p-4 rounded text-center">
                span-2
              </div>
              <div className="col-span-4 bg-primary/10 p-4 rounded text-center">
                span-4
              </div>
              <div className="col-span-3 bg-primary/10 p-4 rounded text-center">
                span-3
              </div>
              <div className="col-span-3 bg-primary/10 p-4 rounded text-center">
                span-3
              </div>
              <div className="col-span-6 bg-primary/10 p-4 rounded text-center">
                span-6 (full width)
              </div>
            </div>
          </div>

          {/* Gap Variations */}
          <div>
            <h4 className="text-sm font-medium mb-3">Gap Variations</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">gap-2</p>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-center text-xs">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">gap-6</p>
                <div className="grid grid-cols-4 gap-6">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-center text-xs">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}