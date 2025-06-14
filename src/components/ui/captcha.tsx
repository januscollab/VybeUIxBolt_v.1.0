import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CaptchaProps {
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  className?: string;
  variant?: 'math' | 'text' | 'image';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const Captcha = React.forwardRef<HTMLDivElement, CaptchaProps>(
  ({ onVerify, onExpire, className, variant = 'math', difficulty = 'medium' }, ref) => {
    const [challenge, setChallenge] = useState('');
    const [answer, setAnswer] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [attempts, setAttempts] = useState(0);

    // Generate challenges based on variant and difficulty
    const generateChallenge = React.useCallback(() => {
      let newChallenge = '';
      let correctAnswer = '';

      switch (variant) {
        case 'math':
          const operators = difficulty === 'easy' ? ['+', '-'] : ['+', '-', '*'];
          const maxNum = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 50 : 100;
          
          const num1 = Math.floor(Math.random() * maxNum) + 1;
          const num2 = Math.floor(Math.random() * maxNum) + 1;
          const operator = operators[Math.floor(Math.random() * operators.length)];
          
          switch (operator) {
            case '+':
              correctAnswer = (num1 + num2).toString();
              break;
            case '-':
              correctAnswer = Math.max(num1 - num2, 0).toString();
              break;
            case '*':
              correctAnswer = (num1 * num2).toString();
              break;
          }
          
          newChallenge = `${num1} ${operator} ${num2} = ?`;
          break;
          
        case 'text':
          const words = ['HELLO', 'WORLD', 'SECURITY', 'VERIFY', 'ACCESS'];
          const selectedWord = words[Math.floor(Math.random() * words.length)];
          newChallenge = `Type: ${selectedWord}`;
          correctAnswer = selectedWord;
          break;
          
        case 'image':
          // Simplified image-based challenge
          const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          newChallenge = `Select all ${selectedColor} squares`;
          correctAnswer = selectedColor;
          break;
      }

      setChallenge(newChallenge);
      setAnswer(correctAnswer);
      setUserInput('');
      setIsVerified(false);
    }, [variant, difficulty]);

    React.useEffect(() => {
      generateChallenge();
    }, [generateChallenge]);

    const handleVerify = () => {
      const isCorrect = userInput.toLowerCase().trim() === answer.toLowerCase().trim();
      
      if (isCorrect) {
        setIsVerified(true);
        const token = `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        onVerify?.(token);
      } else {
        setAttempts(prev => prev + 1);
        if (attempts >= 2) {
          generateChallenge();
          setAttempts(0);
        }
      }
    };

    const handleRefresh = () => {
      generateChallenge();
      setAttempts(0);
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <div className="border border-border rounded-lg p-4 bg-muted/20">
          {/* Challenge Display */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-mono text-center flex-1">
              {variant === 'image' ? (
                <div className="grid grid-cols-3 gap-2 max-w-[120px] mx-auto">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-8 h-8 border border-border rounded cursor-pointer",
                        i % 3 === 0 && answer === 'RED' && "bg-red-200",
                        i % 3 === 1 && answer === 'BLUE' && "bg-blue-200",
                        i % 3 === 2 && answer === 'GREEN' && "bg-green-200",
                        i === 4 && answer === 'YELLOW' && "bg-yellow-200"
                      )}
                    />
                  ))}
                </div>
              ) : (
                challenge
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="ml-2"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label htmlFor="captcha-input">
              {variant === 'image' ? 'Enter the color you selected:' : 'Your answer:'}
            </Label>
            <div className="flex gap-2">
              <Input
                id="captcha-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={variant === 'math' ? 'Enter result' : 'Enter text'}
                disabled={isVerified}
                className={cn(
                  isVerified && "bg-green-50 border-green-200",
                  attempts > 0 && !isVerified && "border-red-200"
                )}
              />
              <Button
                onClick={handleVerify}
                disabled={!userInput.trim() || isVerified}
                variant={isVerified ? "default" : "outline"}
              >
                {isVerified ? 'Verified ✓' : 'Verify'}
              </Button>
            </div>
          </div>

          {/* Status Messages */}
          {attempts > 0 && !isVerified && (
            <p className="text-sm text-red-600 mt-2">
              Incorrect answer. {attempts === 1 ? 'Try again.' : 'Challenge refreshed.'}
            </p>
          )}
          
          {isVerified && (
            <p className="text-sm text-green-600 mt-2">
              Verification successful!
            </p>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          This helps protect against automated abuse.
        </div>
      </div>
    );
  }
);

Captcha.displayName = "Captcha";