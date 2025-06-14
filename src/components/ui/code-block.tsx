import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Check, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
  copyable?: boolean;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ 
    code, 
    language = 'javascript', 
    filename, 
    showLineNumbers = false,
    className,
    copyable = true 
  }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Code has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Could not copy code to clipboard.",
          variant: "destructive",
        });
      }
    };

    const lines = code.split('\n');

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border bg-muted font-mono text-sm",
          className
        )}
      >
        {/* Header */}
        {(filename || copyable) && (
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
            {filename && (
              <span className="text-sm font-medium text-muted-foreground">
                {filename}
              </span>
            )}
            {copyable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre className="p-4">
            <code className={`language-${language}`}>
              {showLineNumbers ? (
                <div className="flex">
                  <div className="flex flex-col text-muted-foreground/60 select-none pr-4 border-r border-border mr-4">
                    {lines.map((_, index) => (
                      <span key={index} className="leading-6">
                        {index + 1}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1">
                    {lines.map((line, index) => (
                      <div key={index} className="leading-6">
                        {line || '\u00A0'}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                code
              )}
            </code>
          </pre>
        </div>

        {/* Language Badge */}
        {language && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-background border rounded text-xs text-muted-foreground">
            {language}
          </div>
        )}
      </div>
    );
  }
);

CodeBlock.displayName = "CodeBlock";