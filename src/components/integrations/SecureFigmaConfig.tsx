import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Figma, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function SecureFigmaConfig() {
  const [hasCredentials, setHasCredentials] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Figma className="h-5 w-5" />
          Figma Integration
          <Badge variant={hasCredentials ? "default" : "secondary"}>
            {hasCredentials ? "Configured" : "Not Configured"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Configure your Figma integration settings for design system synchronization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            For security, Figma credentials are now stored using Supabase Secrets instead of the database.
            Please contact your administrator to configure Figma integration credentials.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Notice:</strong> The previous Figma configuration stored credentials in the database, 
            which has been removed for security reasons. Credentials should only be stored using secure secrets management.
          </AlertDescription>
        </Alert>
        
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Available Features (When Configured)</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Automatic Figma file creation with design system structure</li>
            <li>• Component placeholder generation</li>
            <li>• Design token export in Figma-compatible format</li>
            <li>• Shareable URL collection and synchronization</li>
            <li>• Design system sync and updates</li>
          </ul>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="https://www.figma.com/developers/api" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Figma API Docs
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}