import { Component } from "@/data/staticData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ExperimentalComponentCardProps {
  component: Component;
}

export function ExperimentalComponentCard({ component }: ExperimentalComponentCardProps) {
  const handleAccept = () => {
    toast({
      title: "Component Accepted",
      description: `${component.name} has been added to your accepted experimental components.`,
    });
  };

  const handleReject = () => {
    toast({
      title: "Component Rejected",
      description: `${component.name} has been rejected and will be hidden.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="group hover:shadow-md transition-shadow border-accent/20 bg-accent/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <Badge variant="outline" className="text-xs border-accent text-accent bg-accent/10">
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
        <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-accent">
                Try this experimental feature
              </h4>
              <p className="text-xs text-accent/80">
                This component is in early development. Help us improve by testing it.
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="h-8 w-8 p-0 border-accent/30 text-accent hover:bg-accent/20"
              >
                <X className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="h-8 w-8 p-0 bg-accent hover:bg-accent/80 text-accent-foreground"
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
        </div>
      </CardContent>
    </Card>
  );
}