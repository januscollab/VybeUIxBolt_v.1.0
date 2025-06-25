
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>
              Customize the appearance of your design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Theme customization options will be available here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component Preferences</CardTitle>
            <CardDescription>
              Configure default component behaviors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Component preference settings will be available here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
