import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Code } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CodeModalProps {
  title: string;
  code: string;
  trigger?: React.ReactNode;
}

export function CodeModal({ title, code, trigger }: CodeModalProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Code className="h-4 w-4 mr-2" />
            View Code
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm border">
            <code>{code}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}