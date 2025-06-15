import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  GitBranch, 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { toast } from '@/hooks/use-toast';

export function VersionManager() {
  const { 
    versions, 
    activeVersion, 
    saveVersion, 
    loadVersion, 
    refreshVersions,
    isAdmin 
  } = useDesignSystem();
  
  const [newVersionName, setNewVersionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdmin) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Admin access required to manage design system versions.
        </AlertDescription>
      </Alert>
    );
  }

  const handleCreateVersion = async () => {
    if (!newVersionName.trim()) {
      toast({
        title: "Version name required",
        description: "Please enter a name for the new version",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      await saveVersion(newVersionName.trim());
      setNewVersionName('');
      await refreshVersions();
      
      toast({
        title: "Version created",
        description: `Design system version "${newVersionName}" has been saved`
      });
    } catch (error) {
      toast({
        title: "Failed to create version",
        description: "There was an error saving the version",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleLoadVersion = async (versionId: string, versionName: string) => {
    setIsLoading(true);
    try {
      await loadVersion(versionId);
      await refreshVersions();
      
      toast({
        title: "Version loaded",
        description: `Switched to design system version "${versionName}"`
      });
    } catch (error) {
      toast({
        title: "Failed to load version",
        description: "There was an error loading the version",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Version Management
          <Badge variant="outline">
            {versions.length} Version{versions.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
        <CardDescription>
          Create, manage, and switch between different versions of your design system. 
          Each version captures the current state of colors, typography, and branding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Active Version */}
        {activeVersion && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Currently Active Version
              </h4>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="space-y-1 text-sm">
              <div className="font-medium">{activeVersion.version_name}</div>
              <div className="text-muted-foreground">
                Created {formatDate(activeVersion.created_at)}
              </div>
            </div>
          </div>
        )}

        {/* Create New Version */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <h4 className="font-semibold">Create New Version</h4>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="version-name" className="sr-only">Version Name</Label>
              <Input
                id="version-name"
                placeholder="Enter version name (e.g., 'Brand Refresh 2024')"
                value={newVersionName}
                onChange={(e) => setNewVersionName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateVersion()}
                disabled={isCreating}
              />
            </div>
            <Button 
              onClick={handleCreateVersion}
              disabled={isCreating || !newVersionName.trim()}
            >
              {isCreating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This will save your current design system settings as a new version that you can restore later.
          </p>
        </div>

        <Separator />

        {/* Version History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Version History
            </h4>
            <Button variant="outline" size="sm" onClick={refreshVersions}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {versions.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground">
              <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No versions saved yet</p>
              <p className="text-sm">Create your first version to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version) => (
                <div 
                  key={version.id}
                  className={`p-4 border rounded-lg ${
                    version.is_active 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{version.version_name}</span>
                        {version.is_active && (
                          <Badge variant="default">Current</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Created {formatDate(version.created_at)}
                        {version.brand_name && (
                          <span className="ml-2">• Brand: {version.brand_name}</span>
                        )}
                      </div>
                    </div>
                    
                    {!version.is_active && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Restore
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Restore Version</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to restore "{version.version_name}"? 
                              This will replace your current design system settings.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {}}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={() => handleLoadVersion(version.id, version.version_name)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                                  Restoring...
                                </>
                              ) : (
                                <>
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Restore Version
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Export/Import */}
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-semibold">Backup & Restore</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Download className="h-5 w-5 mb-1" />
              Export Current
              <span className="text-xs text-muted-foreground">Download JSON backup</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Upload className="h-5 w-5 mb-1" />
              Import Backup
              <span className="text-xs text-muted-foreground">Restore from file</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}