import { useParams } from "react-router-dom";
import { useComponent } from "@/hooks/useDesignSystem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, FileCode, Figma, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import design system components
import ColorPaletteComponent from "@/components/design-system/ColorPaletteComponent";
import TypographyScaleComponent from "@/components/design-system/TypographyScaleComponent";
import SpacingSystemComponent from "@/components/design-system/SpacingSystemComponent";
import ElevationShadowsComponent from "@/components/design-system/ElevationShadowsComponent";
import IconSystemComponent from "@/components/design-system/IconSystemComponent";
import InteractionStatesComponent from "@/components/design-system/InteractionStatesComponent";

// Import experimental components
import WorkflowBuilderComponent from "@/components/experimental/WorkflowBuilderComponent";
import CollaborationPanelComponent from "@/components/experimental/CollaborationPanelComponent";

// Import showcase components
import ButtonShowcase from "@/components/showcase/ButtonShowcase";
import InputShowcase from "@/components/showcase/InputShowcase";
import CardShowcase from "@/components/showcase/CardShowcase";
import FormShowcase from "@/components/showcase/FormShowcase";
import NavigationShowcase from "@/components/showcase/NavigationShowcase";
import TableShowcase from "@/components/showcase/TableShowcase";
import FeedbackShowcase from "@/components/showcase/FeedbackShowcase";
import FormFieldShowcase from "@/components/showcase/FormFieldShowcase";
import BadgeShowcase from "@/components/showcase/BadgeShowcase";
import SelectDropdownShowcase from "@/components/showcase/SelectDropdownShowcase";
import CheckboxShowcase from "@/components/showcase/CheckboxShowcase";
import SwitchToggleShowcase from "@/components/showcase/SwitchToggleShowcase";
import TextareaShowcase from "@/components/showcase/TextareaShowcase";
import AvatarShowcase from "@/components/showcase/AvatarShowcase";
import ProgressBarShowcase from "@/components/showcase/ProgressBarShowcase";
import SliderShowcase from "@/components/showcase/SliderShowcase";
import SearchBarShowcase from "@/components/showcase/SearchBarShowcase";
import SidebarShowcase from "@/components/showcase/SidebarShowcase";
import CommandMenuShowcase from "@/components/showcase/CommandMenuShowcase";
import StepsStepperShowcase from "@/components/showcase/StepsStepperShowcase";
import AICommandPaletteShowcase from "@/components/showcase/AICommandPaletteShowcase";

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: component, isLoading } = useComponent(slug!);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  // Render specific design system components
  const renderComponentContent = () => {
    switch (component?.slug) {
      // Foundations
      case 'color-palette':
        return <ColorPaletteComponent />;
      case 'typography-scale':
        return <TypographyScaleComponent />;
      case 'spacing-system':
        return <SpacingSystemComponent />;
      case 'elevation-shadows':
        return <ElevationShadowsComponent />;
      case 'icon-system':
      case 'icons':
        return <IconSystemComponent />;
      case 'interaction-states':
        return <InteractionStatesComponent />;
      
      // Experimental
      case 'workflow-builder':
        return <WorkflowBuilderComponent />;
      case 'collaboration-panel':
        return <CollaborationPanelComponent />;
      
      // Core UI Components
      case 'button':
        return <ButtonShowcase />;
      case 'input':
      case 'input-field':
        return <InputShowcase />;
      case 'select-dropdown':
        return <SelectDropdownShowcase />;
      case 'badge':
        return <BadgeShowcase />;
      case 'card':
        return <CardShowcase />;
      case 'form':
      case 'form-wrapper':
        return <FormShowcase />;
      case 'form-field':
        return <FormFieldShowcase />;
      case 'checkbox':
        return <CheckboxShowcase />;
      case 'switch-toggle':
      case 'switch':
        return <SwitchToggleShowcase />;
      case 'textarea':
        return <TextareaShowcase />;
      case 'avatar':
        return <AvatarShowcase />;
      case 'progress-bar':
      case 'progress':
        return <ProgressBarShowcase />;
      case 'slider':
        return <SliderShowcase />;
      case 'search-bar':
      case 'search':
        return <SearchBarShowcase />;
      case 'sidebar':
        return <SidebarShowcase />;
      case 'command-menu':
        return <CommandMenuShowcase />;
      case 'steps-stepper':
      case 'stepper':
        return <StepsStepperShowcase />;
      case 'ai-command-palette':
        return <AICommandPaletteShowcase />;
      
      // Navigation
      case 'navigation':
      case 'navigation-menu':
      case 'breadcrumb':
      case 'pagination':
      case 'tabs':
        return <NavigationShowcase />;
      
      // Content & Layout
      case 'table':
      case 'data-table':
        return <TableShowcase />;
      
      // Feedback & Messaging
      case 'alert':
      case 'toast':
      case 'toast-notification':
      case 'progress':
      case 'progress-bar':
      case 'skeleton':
        return <FeedbackShowcase />;
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-muted animate-pulse rounded" />
        <div className="h-96 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!component) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-muted-foreground">Component not found</h1>
      </div>
    );
  }

  // If we have a custom component, render it
  const customComponent = renderComponentContent();
  if (customComponent) {
    return customComponent;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{component.name}</h1>
            {component.description && (
              <p className="text-lg text-muted-foreground">{component.description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {component.figma_url && (
              <Button variant="outline" asChild>
                <a href={component.figma_url} target="_blank" rel="noopener noreferrer">
                  <Figma className="h-4 w-4 mr-2" />
                  Figma
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
            {component.storybook_url && (
              <Button variant="outline" asChild>
                <a href={component.storybook_url} target="_blank" rel="noopener noreferrer">
                  <FileCode className="h-4 w-4 mr-2" />
                  Storybook
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant={
              component.status === 'stable' ? 'default' :
              component.status === 'review' ? 'secondary' :
              component.status === 'deprecated' ? 'destructive' :
              'outline'
            }
          >
            {component.status}
          </Badge>
          {component.is_experimental && (
            <Badge variant="outline" className="border-orange-500 text-orange-600">
              Experimental
            </Badge>
          )}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {component.variants && component.variants.length > 0 && (
            <TabsTrigger value="variants">Variants ({component.variants.length})</TabsTrigger>
          )}
          {component.documentation && component.documentation.length > 0 && (
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Information</CardTitle>
              <CardDescription>
                Basic information about this component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Status</h4>
                  <p className="text-sm text-muted-foreground capitalize">{component.status}</p>
                </div>
                <div>
                  <h4 className="font-medium">Type</h4>
                  <p className="text-sm text-muted-foreground">
                    {component.is_experimental ? 'Experimental' : 'Standard'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Created</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(component.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Last Updated</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(component.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {component.variants && component.variants.length > 0 && (
          <TabsContent value="variants" className="space-y-6">
            <div className="grid gap-6">
              {component.variants.map((variant) => (
                <Card key={variant.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{variant.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {variant.code_example && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Code Example</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(variant.code_example!)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{variant.code_example}</code>
                        </pre>
                      </div>
                    )}
                    
                    {variant.props && Object.keys(variant.props).length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Props</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{JSON.stringify(variant.props, null, 2)}</code>
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {component.documentation && component.documentation.length > 0 && (
          <TabsContent value="documentation" className="space-y-6">
            <div className="grid gap-6">
              {component.documentation.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {doc.section}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}