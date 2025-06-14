import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, ZoomIn, ZoomOut, Layers } from 'lucide-react';

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    description?: string;
  }>;
  height?: string;
  className?: string;
}

export const Map = React.forwardRef<HTMLDivElement, MapProps>(
  ({ center = [51.505, -0.09], zoom = 13, markers = [], height = "400px", className }, ref) => {
    const [currentZoom, setCurrentZoom] = useState(zoom);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulated map functionality (would integrate with real map service)
    const handleZoomIn = () => setCurrentZoom(Math.min(currentZoom + 1, 18));
    const handleZoomOut = () => setCurrentZoom(Math.max(currentZoom - 1, 1));

    return (
      <div ref={ref} className={`relative border border-border rounded-lg overflow-hidden ${className}`}>
        {/* Map Container */}
        <div 
          className="bg-muted/20 flex items-center justify-center relative"
          style={{ height }}
        >
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900" />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute border-l border-muted-foreground" style={{ left: `${i * 10}%`, height: '100%' }} />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="absolute border-t border-muted-foreground" style={{ top: `${i * 16.67}%`, width: '100%' }} />
            ))}
          </div>

          {/* Markers */}
          {markers.map((marker, index) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
              style={{
                left: `${50 + (index - markers.length/2) * 10}%`,
                top: `${60 + (index % 2) * 20}%`
              }}
            >
              <MapPin className="h-8 w-8 text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <div className="font-medium text-sm">{marker.title}</div>
                {marker.description && (
                  <div className="text-xs text-muted-foreground">{marker.description}</div>
                )}
              </div>
            </div>
          ))}

          {/* Center Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background/90 backdrop-blur"
            />
            <Button size="sm" className="bg-background/90 backdrop-blur">
              Search
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomIn}
            className="bg-background/90 backdrop-blur"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomOut}
            className="bg-background/90 backdrop-blur"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-background/90 backdrop-blur"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-4 left-4 px-2 py-1 bg-background/90 backdrop-blur border border-border rounded text-sm">
          Zoom: {currentZoom}
        </div>
      </div>
    );
  }
);

Map.displayName = "Map";