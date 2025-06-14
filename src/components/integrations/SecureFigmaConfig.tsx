import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, ExternalLink, Trash2, Edit } from 'lucide-react';
import { FigmaIntegrationWizard } from './FigmaIntegrationWizard';
import { supabase } from '@/integrations/supabase/client';
import { useAdminRole } from '@/hooks/useAdminRole';
import { toast } from '@/hooks/use-toast';

interface FigmaIntegration {
  id: string;
  team_id: string;
  project_name: string;
  description: string;
  export_format: string;
  export_scale: number;
  component_prefix: string;
  auto_sync: boolean;
  api_token_set: boolean;
  is_active: boolean;
  created_at: string;
}

export function SecureFigmaConfig() {
  const { isAdmin } = useAdminRole();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [integrations, setIntegrations] = useState<FigmaIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (isAdmin) {
      loadIntegrations();
    }
  }, [isAdmin]);

  const loadIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('figma_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Error loading Figma integrations:', error);
      setIntegrations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteIntegration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('figma_integrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Integration Deleted",
        description: "Figma integration has been removed successfully.",
      });

      await loadIntegrations();
    } catch (error) {
      console.error('Error deleting integration:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete Figma integration. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isConfigured = integrations.length > 0;
  const activeIntegration = integrations.find(i => i.is_active);
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Figma Integration
            <Badge variant={isConfigured ? "default" : "outline"}>
              {isConfigured ? "Configured" : "Not Configured"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Connect your design system to Figma for seamless component synchronization. 
            Export components, maintain design tokens, and keep your Figma library in sync.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Automatic component export from Figma</li>
              <li>• Design token synchronization</li>
              <li>• Component documentation generation</li>
              <li>• Real-time design system updates</li>
              <li>• Team collaboration tools</li>
              <li>• Version control integration</li>
            </ul>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Figma Professional or Organization plan</li>
              <li>• Admin access to your Figma team</li>
              <li>• Personal access token from Figma</li>
            </ul>
          </div>

          {isConfigured && activeIntegration ? (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Integration Active: {activeIntegration.project_name}
                    </h4>
                    <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <p>Team ID: {activeIntegration.team_id}</p>
                      <p>Export: {activeIntegration.export_format.toUpperCase()} @ {activeIntegration.export_scale}x</p>
                      <p>Prefix: {activeIntegration.component_prefix}</p>
                      <p>Auto Sync: {activeIntegration.auto_sync ? 'Enabled' : 'Disabled'}</p>
                      {activeIntegration.description && (
                        <p>Description: {activeIntegration.description}</p>
                      )}
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsWizardOpen(true)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteIntegration(activeIntegration.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {isAdmin ? (
                <Button 
                  className="w-full" 
                  onClick={() => setIsWizardOpen(true)}
                  disabled={isLoading}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {isLoading ? 'Loading...' : 'Setup Figma Integration'}
                </Button>
              ) : (
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Admin access required to configure Figma integration
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild>
                  <a href="https://www.figma.com/developers/api" target="_blank" rel="noopener noreferrer">
                    API Documentation
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens" target="_blank" rel="noopener noreferrer">
                    Get API Token
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <FigmaIntegrationWizard 
        isOpen={isWizardOpen} 
        onOpenChange={(open) => {
          setIsWizardOpen(open);
          if (!open) {
            loadIntegrations(); // Refresh data when wizard closes
          }
        }} 
      />
    </>
  );
}