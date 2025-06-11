import { Component } from "@/types/design-system";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Figma, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ExperimentalComponentCardProps {
  component: Component;
}

export function ExperimentalComponentCard({ component }: ExperimentalComponentCardProps) {
  const handleAccept = () => {
    // TODO: Implement accept logic - could save to local storage or user preferences
    toast({
      title: "Component Accepted",
      description: `${component.name} has been added to your accepted experimental components.`,
    });
  };

  const handleReject = () => {
    // TODO: Implement reject logic - could hide component or save preference
    toast({
      title: "Component Rejected",
      description: `${component.name} has been rejected and will be hidden.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="group hover:shadow-md transition-shadow border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <Badge variant="outline" className="text-xs border-orange-500 text-orange-600 bg-orange-100 dark:bg-orange-950">
                Experimental
              </Badge>
            </div>
            {component.description && (
              <CardDescription>{component.description}</CardDescription>
            )}
          </div>
          <Badge
            variant={
              component.status === 'stable' ? 'default' :
              component.status === 'review' ? 'secondary' :
              component.status === 'deprecated' ? 'destructive' :
              'outline'
            }
            className="text-xs"
          >
            {component.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {component.variants && component.variants.length > 0 && (
            <span>{component.variants.length} variants</span>
          )}
        </div>
        
        {/* Experimental CTA Section */}
        <div className="bg-orange-100 dark:bg-orange-950/40 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Try this experimental feature
              </h4>
              <p className="text-xs text-orange-600 dark:text-orange-300">
                This component is in early development. Help us improve by testing it.
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="h-8 w-8 p-0 border-orange-300 text-orange-600 hover:bg-orange-200 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-900"
              >
                <X className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="h-8 w-8 p-0 bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                <Check className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link to={`/component/${component.slug}`}>
              View Details
            </Link>
          </Button>
          
          <div className="flex gap-1">
            {component.figma_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={component.figma_url} target="_blank" rel="noopener noreferrer">
                  <Figma className="h-4 w-4" />
                </a>
              </Button>
            )}
            {component.storybook_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={component.storybook_url} target="_blank" rel="noopener noreferrer">
                  <FileCode className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}