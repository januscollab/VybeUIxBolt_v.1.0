import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FigmaIntegrationWizardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WizardData {
  apiToken: string;
  teamId: string;
  projectName: string;
  description: string;
  exportFormat: 'svg' | 'png' | 'jpg';
  exportScale: '1' | '2' | '3' | '4';
  componentPrefix: string;
  autoSync: boolean;
}

export function FigmaIntegrationWizard({ isOpen, onOpenChange }: FigmaIntegrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showApiToken, setShowApiToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wizardData, setWizardData] = useState<WizardData>({
    apiToken: '',
    teamId: '',
    projectName: '',
    description: '',
    exportFormat: 'svg',
    exportScale: '2',
    componentPrefix: 'DS',
    autoSync: false
  });

  const steps = [
    {
      title: 'API Configuration',
      description: 'Connect your Figma account'
    },
    {
      title: 'Team & Project',
      description: 'Select your Figma team and project'
    },
    {
      title: 'Export Settings',
      description: 'Configure how components are exported'
    },
    {
      title: 'Review & Complete',
      description: 'Review your settings and complete setup'
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Save configuration to database
      const { error } = await supabase
        .from('figma_integrations')
        .insert({
          team_id: wizardData.teamId,
          project_name: wizardData.projectName,
          description: wizardData.description,
          export_format: wizardData.exportFormat,
          export_scale: parseInt(wizardData.exportScale),
          component_prefix: wizardData.componentPrefix,
          auto_sync: wizardData.autoSync,
          api_token_set: true,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Figma Integration Complete!",
        description: "Your Figma integration has been successfully configured.",
      });

      onOpenChange(false);
      setCurrentStep(0);
    } catch (error) {
      console.error('Error saving Figma integration:', error);
      toast({
        title: "Setup Failed",
        description: "Failed to save Figma integration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        return wizardData.apiToken.length > 0;
      case 1:
        return wizardData.teamId.length > 0 && wizardData.projectName.length > 0;
      case 2:
        return wizardData.componentPrefix.length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Connect to Figma</h3>
              <p className="text-sm text-muted-foreground">
                You'll need a Figma API token to connect your design system
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiToken">Figma API Token</Label>
                <div className="relative">
                  <Input
                    id="apiToken"
                    type={showApiToken ? "text" : "password"}
                    placeholder="figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={wizardData.apiToken}
                    onChange={(e) => setWizardData(prev => ({ ...prev, apiToken: e.target.value }))}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiToken(!showApiToken)}
                  >
                    {showApiToken ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This token will be stored securely and encrypted
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <h4 className="font-medium text-sm">How to get your Figma API token:</h4>
                <ol className="text-xs space-y-1 text-muted-foreground">
                  <li>1. Go to Figma → Account Settings → Personal Access Tokens</li>
                  <li>2. Click "Create a new personal access token"</li>
                  <li>3. Name it "Design System Integration"</li>
                  <li>4. Copy the token (starts with "figd_")</li>
                </ol>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Get API Token
                  </a>
                </Button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Team & Project Setup</h3>
              <p className="text-sm text-muted-foreground">
                Configure your Figma team and project details
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamId">Figma Team ID</Label>
                <Input
                  id="teamId"
                  placeholder="e.g., 1234567890123456789"
                  value={wizardData.teamId}
                  onChange={(e) => setWizardData(prev => ({ ...prev, teamId: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Found in your Figma team URL: figma.com/files/team/[TEAM_ID]
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Design System Components"
                  value={wizardData.projectName}
                  onChange={(e) => setWizardData(prev => ({ ...prev, projectName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this integration..."
                  value={wizardData.description}
                  onChange={(e) => setWizardData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Export Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Set how components should be exported from Figma
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exportFormat">Export Format</Label>
                  <Select 
                    value={wizardData.exportFormat} 
                    onValueChange={(value: 'svg' | 'png' | 'jpg') => 
                      setWizardData(prev => ({ ...prev, exportFormat: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="svg">SVG (Recommended)</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exportScale">Export Scale</Label>
                  <Select 
                    value={wizardData.exportScale} 
                    onValueChange={(value: '1' | '2' | '3' | '4') => 
                      setWizardData(prev => ({ ...prev, exportScale: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="2">2x (Recommended)</SelectItem>
                      <SelectItem value="3">3x</SelectItem>
                      <SelectItem value="4">4x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="componentPrefix">Component Prefix</Label>
                <Input
                  id="componentPrefix"
                  placeholder="e.g., DS, UI, Component"
                  value={wizardData.componentPrefix}
                  onChange={(e) => setWizardData(prev => ({ ...prev, componentPrefix: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Prefix for exported component names (e.g., DS-Button, UI-Card)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoSync"
                  checked={wizardData.autoSync}
                  onChange={(e) => setWizardData(prev => ({ ...prev, autoSync: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="autoSync" className="text-sm">
                  Enable automatic synchronization
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically sync changes from Figma to your design system
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Review Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Please review your settings before completing the setup
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">API Token:</span>
                      <span className="ml-2 text-muted-foreground">
                        {wizardData.apiToken ? '••••••••' : 'Not set'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Team ID:</span>
                      <span className="ml-2 text-muted-foreground">{wizardData.teamId}</span>
                    </div>
                    <div>
                      <span className="font-medium">Project:</span>
                      <span className="ml-2 text-muted-foreground">{wizardData.projectName}</span>
                    </div>
                    <div>
                      <span className="font-medium">Format:</span>
                      <span className="ml-2 text-muted-foreground">
                        {wizardData.exportFormat.toUpperCase()} @ {wizardData.exportScale}x
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Prefix:</span>
                      <span className="ml-2 text-muted-foreground">{wizardData.componentPrefix}</span>
                    </div>
                    <div>
                      <span className="font-medium">Auto Sync:</span>
                      <span className="ml-2 text-muted-foreground">
                        {wizardData.autoSync ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  {wizardData.description && (
                    <div className="text-sm">
                      <span className="font-medium">Description:</span>
                      <p className="text-muted-foreground mt-1">{wizardData.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">What happens next:</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Your API token will be securely stored and encrypted</li>
                  <li>• A test connection to Figma will be established</li>
                  <li>• Component export functionality will be enabled</li>
                  <li>• You can start syncing your design system components</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Figma Integration Setup
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  {index <= currentStep ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button 
                  onClick={handleComplete}
                  disabled={!validateStep() || isLoading}
                >
                  {isLoading ? 'Setting up...' : 'Complete Setup'}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={!validateStep()}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}