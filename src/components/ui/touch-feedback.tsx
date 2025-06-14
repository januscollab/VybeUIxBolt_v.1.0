import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'scale' | 'opacity' | 'ripple';
  intensity?: 'light' | 'medium' | 'strong';
}

export const TouchFeedback = React.forwardRef<HTMLDivElement, TouchFeedbackProps>(
  ({ 
    children, 
    className, 
    disabled = false,
    variant = 'scale',
    intensity = 'medium'
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<{ id: string; x: number; y: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const intensityClasses = {
      light: {
        scale: 'active:scale-[0.98]',
        opacity: 'active:opacity-90'
      },
      medium: {
        scale: 'active:scale-95',
        opacity: 'active:opacity-80'
      },
      strong: {
        scale: 'active:scale-90',
        opacity: 'active:opacity-70'
      }
    };

    const createRipple = (event: React.MouseEvent | React.TouchEvent) => {
      if (disabled || variant !== 'ripple') return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const newRipple = {
        id: `ripple-${Date.now()}-${Math.random()}`,
        x,
        y
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    const handlePointerDown = (event: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      
      setIsPressed(true);
      createRipple(event);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    const handlePointerLeave = () => {
      setIsPressed(false);
    };

    // Clean up ripples on unmount
    useEffect(() => {
      return () => {
        setRipples([]);
      };
    }, []);

    const getVariantClasses = () => {
      if (disabled) return '';
      
      switch (variant) {
        case 'scale':
          return cn(
            'transition-transform duration-100 ease-out',
            intensityClasses[intensity].scale
          );
        case 'opacity':
          return cn(
            'transition-opacity duration-100 ease-out',
            intensityClasses[intensity].opacity
          );
        case 'ripple':
          return 'relative overflow-hidden';
        default:
          return '';
      }
    };

    return (
      <div
        ref={ref || containerRef}
        className={cn(
          'select-none',
          getVariantClasses(),
          className
        )}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerLeave}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
        onTouchCancel={handlePointerLeave}
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {children}
        
        {/* Ripple Effect */}
        {variant === 'ripple' && ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-current opacity-30 pointer-events-none animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              animationDuration: '600ms',
              animationFillMode: 'forwards'
            }}
          />
        ))}
      </div>
    );
  }
);

TouchFeedback.displayName = "TouchFeedback";