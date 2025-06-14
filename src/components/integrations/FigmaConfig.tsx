import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Figma, ExternalLink, Save, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function FigmaConfig() {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFigmaConfig();
  }, []);

  const loadFigmaConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('design_system_versions')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading Figma config:', error);
        return;
      }

      if (data && typeof data === 'object') {
        const figmaClientId = (data as any).figma_client_id || '';
        const figmaClientSecret = (data as any).figma_client_secret || '';
        setClientId(figmaClientId);
        setClientSecret(figmaClientSecret);
        setHasCredentials(!!(figmaClientId && figmaClientSecret));
      }
    } catch (error) {
      console.error('Error loading Figma config:', error);
    }
  };

  const saveFigmaConfig = async () => {
    if (!clientId.trim() || !clientSecret.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both Client ID and Client Secret",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // First, try to update existing active version
      const { data: existingVersion, error: fetchError } = await supabase
        .from('design_system_versions')
        .select('id')
        .eq('is_active', true)
        .single();

      if (existingVersion) {
        // Update existing version
        const { error: updateError } = await supabase
          .from('design_system_versions')
          .update({
            figma_client_id: clientId.trim(),
            figma_client_secret: clientSecret.trim(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingVersion.id);

        if (updateError) throw updateError;
      } else {
        // Create new version if none exists
        const user = await supabase.auth.getUser();
        const { error: insertError } = await supabase
          .from('design_system_versions')
          .insert({
            version_name: 'Default',
            color_palette: {},
            typography: {},
            figma_client_id: clientId.trim(),
            figma_client_secret: clientSecret.trim(),
            is_active: true,
            created_by: user.data.user?.id
          });

        if (insertError) throw insertError;
      }

      setHasCredentials(true);
      toast({
        title: "Figma Configuration Saved",
        description: "Your Figma credentials have been saved securely.",
      });

    } catch (error) {
      console.error('Error saving Figma config:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save Figma configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="figma-client-id">Figma Client ID</Label>
            <Input
              id="figma-client-id"
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter your Figma Client ID"
            />
            <p className="text-xs text-muted-foreground">
              Found in your Figma app settings under "API"
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="figma-client-secret">Figma Client Secret</Label>
            <div className="relative">
              <Input
                id="figma-client-secret"
                type={showSecret ? "text" : "password"}
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                placeholder="Enter your Figma Client Secret"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Keep this secure - never share your client secret
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Available Features</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Automatic Figma file creation with design system structure</li>
              <li>• Component placeholder generation</li>
              <li>• Design token export in Figma-compatible format</li>
              <li>• Shareable URL collection and synchronization</li>
              <li>• Design system sync and updates</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={saveFigmaConfig}
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/developers/api" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Figma API Docs
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}