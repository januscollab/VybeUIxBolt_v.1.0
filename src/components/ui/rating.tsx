import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  allowHalf?: boolean;
  className?: string;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ 
    value = 0, 
    onChange, 
    max = 5, 
    size = 'md',
    readOnly = false,
    allowHalf = false,
    className 
  }, ref) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    const handleClick = (starValue: number) => {
      if (readOnly || !onChange) return;
      onChange(starValue);
    };

    const handleMouseEnter = (starValue: number) => {
      if (readOnly) return;
      setHoverValue(starValue);
    };

    const handleMouseLeave = () => {
      if (readOnly) return;
      setHoverValue(null);
    };

    const getStarFill = (starIndex: number) => {
      const currentValue = hoverValue ?? value;
      
      if (allowHalf) {
        if (currentValue >= starIndex) return 'full';
        if (currentValue >= starIndex - 0.5) return 'half';
        return 'empty';
      } else {
        return currentValue >= starIndex ? 'full' : 'empty';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1",
          !readOnly && "cursor-pointer",
          className
        )}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const fill = getStarFill(starValue);
          
          return (
            <div
              key={index}
              className="relative"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
            >
              {/* Background star */}
              <Star
                className={cn(
                  sizeClasses[size],
                  "text-muted-foreground/30",
                  !readOnly && "hover:text-muted-foreground/50 transition-colors"
                )}
              />
              
              {/* Filled star */}
              {fill !== 'empty' && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute top-0 left-0 text-yellow-400 fill-yellow-400",
                    fill === 'half' && "clip-path-half"
                  )}
                  style={
                    fill === 'half' 
                      ? { clipPath: 'inset(0 50% 0 0)' }
                      : undefined
                  }
                />
              )}
            </div>
          );
        })}
        
        {/* Value display */}
        <span className="ml-2 text-sm text-muted-foreground">
          {value.toFixed(allowHalf ? 1 : 0)} / {max}
        </span>
      </div>
    );
  }
);

Rating.displayName = "Rating";