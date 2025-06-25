
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Type } from 'lucide-react';

export default function TypographyAnimatorShowcase() {
  const [text, setText] = useState('Hello World');
  const [animation, setAnimation] = useState('typewriter');
  const [speed, setSpeed] = useState([100]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const animations = [
    { value: 'typewriter', label: 'Typewriter Effect' },
    { value: 'fade-in', label: 'Fade In Words' },
    { value: 'slide-up', label: 'Slide Up Letters' },
    { value: 'bounce', label: 'Bounce Effect' },
    { value: 'glow', label: 'Glow Pulse' },
    { value: 'rainbow', label: 'Rainbow Wave' }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    if (animation === 'typewriter') {
      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 101 - speed[0]);

      return () => clearInterval(timer);
    }
  }, [isPlaying, currentIndex, text, speed, animation]);

  const startAnimation = () => {
    setCurrentIndex(0);
    setDisplayText('');
    setIsPlaying(true);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setDisplayText('');
  };

  const renderAnimatedText = () => {
    const baseClasses = "text-4xl font-bold transition-all duration-300";
    
    switch (animation) {
      case 'typewriter':
        return (
          <div className={`${baseClasses} font-mono`}>
            {displayText}
            {isPlaying && <span className="animate-pulse">|</span>}
          </div>
        );
      
      case 'fade-in':
        return (
          <div className={baseClasses}>
            {text.split(' ').map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 transition-all duration-500 ${
                  isPlaying ? 'animate-fade-in' : ''
                }`}
                style={{
                  animationDelay: isPlaying ? `${index * 200}ms` : '0ms',
                  opacity: isPlaying ? 1 : 0.3
                }}
              >
                {word}
              </span>
            ))}
          </div>
        );
      
      case 'slide-up':
        return (
          <div className={baseClasses}>
            {text.split('').map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isPlaying ? `${index * 50}ms` : '0ms'
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        );
      
      case 'bounce':
        return (
          <div className={`${baseClasses} ${isPlaying ? 'animate-bounce' : ''}`}>
            {text}
          </div>
        );
      
      case 'glow':
        return (
          <div className={`${baseClasses} ${isPlaying ? 'animate-pulse text-primary drop-shadow-lg' : ''}`}>
            {text}
          </div>
        );
      
      case 'rainbow':
        return (
          <div className={baseClasses}>
            {text.split('').map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-1000 ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{
                  color: isPlaying ? `hsl(${(index * 30) % 360}, 70%, 50%)` : 'currentColor',
                  animationDelay: `${index * 100}ms`
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        );
      
      default:
        return <div className={baseClasses}>{text}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Typography Animator</h1>
          <Badge variant="secondary">Experimental</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Create engaging text animations with customizable effects and timing controls.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animation Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Animation Preview</CardTitle>
            <CardDescription>See your text animation in action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center min-h-[200px] border border-border rounded-lg bg-muted/30">
              {renderAnimatedText()}
            </div>
            
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button 
                onClick={startAnimation} 
                disabled={isPlaying}
                variant="default"
              >
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              <Button 
                onClick={stopAnimation} 
                disabled={!isPlaying}
                variant="outline"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button 
                onClick={resetAnimation}
                variant="outline"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Animation Controls</CardTitle>
            <CardDescription>Customize your text animation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Text Content</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text..."
              />
            </div>

            <div className="space-y-2">
              <Label>Animation Type</Label>
              <Select value={animation} onValueChange={setAnimation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animations.map((anim) => (
                    <SelectItem key={anim.value} value={anim.value}>
                      {anim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Animation Speed</Label>
                <span className="text-sm text-muted-foreground">{speed[0]}%</span>
              </div>
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={100}
                min={10}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Preview Styles</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Type className="h-3 w-3 mr-1" />
                  Primary
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Type className="h-3 w-3 mr-1" />
                  Secondary
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>See different text styles in action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg text-center space-y-2">
              <h3 className="font-semibold text-lg animate-fade-in">Hero Headlines</h3>
              <p className="text-sm text-muted-foreground">Perfect for landing pages</p>
            </div>
            <div className="p-4 border border-border rounded-lg text-center space-y-2">
              <h3 className="font-semibold text-lg">Loading States</h3>
              <p className="text-sm text-muted-foreground">Engaging loading indicators</p>
            </div>
            <div className="p-4 border border-border rounded-lg text-center space-y-2">
              <h3 className="font-semibold text-lg">Call to Actions</h3>
              <p className="text-sm text-muted-foreground">Animated CTAs that convert</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
