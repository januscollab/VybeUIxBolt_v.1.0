import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  variant?: 'default' | 'minimal';
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, className, variant = 'default' }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        {items.map((item, index) => (
          <div key={item.id} className="relative flex items-start group">
            {/* Timeline Line */}
            {index !== items.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-8 w-0.5 h-6 bg-border",
                  item.status === 'completed' && "bg-primary"
                )}
              />
            )}

            {/* Timeline Icon */}
            <div
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background",
                variant === 'minimal' && "w-6 h-6",
                item.status === 'completed' && "border-primary bg-primary text-primary-foreground",
                item.status === 'current' && "border-primary bg-background text-primary",
                item.status === 'upcoming' && "border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {item.icon ? (
                <div className="w-4 h-4">{item.icon}</div>
              ) : (
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    item.status === 'completed' && "bg-primary-foreground",
                    item.status === 'current' && "bg-primary",
                    item.status === 'upcoming' && "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>

            {/* Timeline Content */}
            <div className="flex-1 ml-4 pb-6">
              <div className="flex items-center justify-between">
                <h3
                  className={cn(
                    "font-medium",
                    item.status === 'upcoming' && "text-muted-foreground"
                  )}
                >
                  {item.title}
                </h3>
                {item.time && (
                  <time className="text-sm text-muted-foreground">
                    {item.time}
                  </time>
                )}
              </div>
              {item.description && (
                <p
                  className={cn(
                    "mt-1 text-sm text-muted-foreground",
                    variant === 'minimal' && "text-xs"
                  )}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";