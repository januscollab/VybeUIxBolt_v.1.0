import { useParams } from "react-router-dom";
import { useComponents, useCategories } from "@/hooks/useStaticDesignSystem";
import { BreadcrumbNavigation } from "@/components/navigation/BreadcrumbNavigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import design system components
import ColorPaletteComponent from "@/components/design-system/ColorPaletteComponent";
import TypographyScaleComponent from "@/components/design-system/TypographyScaleComponent";
import SpacingSystemComponent from "@/components/design-system/SpacingSystemComponent";
import ElevationShadowsComponent from "@/components/design-system/ElevationShadowsComponent";
import IconSystemComponent from "@/components/design-system/IconSystemComponent";
import InteractionStatesComponent from "@/components/design-system/InteractionStatesComponent";
import InteractiveColorPalette from "@/components/design-system/InteractiveColorPalette";
import EnhancedTypographyComponent from "@/components/design-system/EnhancedTypographyComponent";

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
import BreadcrumbShowcase from "@/components/showcase/BreadcrumbShowcase";
import AccordionShowcase from "@/components/showcase/AccordionShowcase";
import TooltipShowcase from "@/components/showcase/TooltipShowcase";
import PopoverShowcase from "@/components/showcase/PopoverShowcase";
import ListShowcase from "@/components/showcase/ListShowcase";
import DividerShowcase from "@/components/showcase/DividerShowcase";
import RadioButtonShowcase from "@/components/showcase/RadioButtonShowcase";
import LoadingSpinnerShowcase from "@/components/showcase/LoadingSpinnerShowcase";
import CodeBlockShowcase from "@/components/showcase/CodeBlockShowcase";
import PhoneInputShowcase from "@/components/showcase/PhoneInputShowcase";
import BannerShowcase from "@/components/showcase/BannerShowcase";
import ContainerShowcase from "@/components/showcase/ContainerShowcase";
import ContextMenuShowcase from "@/components/showcase/ContextMenuShowcase";
import EmptyStateShowcase from "@/components/showcase/EmptyStateShowcase";
import ModalShowcase from "@/components/showcase/ModalShowcase";
import FileUploadShowcase from "@/components/showcase/FileUploadShowcase";
import DatePickerShowcase from "@/components/showcase/DatePickerShowcase";
import MultiSelectShowcase from "@/components/showcase/MultiSelectShowcase";
import TimelineShowcase from "@/components/showcase/TimelineShowcase";
import GridSystemShowcase from "@/components/showcase/GridSystemShowcase";
import FlexboxShowcase from "@/components/showcase/FlexboxShowcase";
import ColorPickerShowcase from "@/components/showcase/ColorPickerShowcase";

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: allComponents, isLoading } = useComponents();
  const { data: categories } = useCategories();
  
  const component = allComponents?.find(c => c.slug === slug);
  const category = component ? categories?.find(cat => cat.id === component.category_id) : null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <BreadcrumbNavigation />
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="space-y-6">
        <BreadcrumbNavigation />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground">Component not found</h1>
        </div>
      </div>
    );
  }

  // Map component slugs to their showcase components
  const getShowcaseComponent = () => {
    const showcaseMap: Record<string, React.ComponentType> = {
      'button': ButtonShowcase,
      'input': InputShowcase,
      'card': CardShowcase,
      'form': FormShowcase,
      'navigation': NavigationShowcase,
      'table': TableShowcase,
      'feedback': FeedbackShowcase,
      'form-field': FormFieldShowcase,
      'badge': BadgeShowcase,
      'select-dropdown': SelectDropdownShowcase,
      'checkbox': CheckboxShowcase,
      'switch-toggle': SwitchToggleShowcase,
      'textarea': TextareaShowcase,
      'avatar': AvatarShowcase,
      'progress-bar': ProgressBarShowcase,
      'slider': SliderShowcase,
      'search-bar': SearchBarShowcase,
      'sidebar': SidebarShowcase,
      'command-menu': CommandMenuShowcase,
      'steps-stepper': StepsStepperShowcase,
      'ai-command-palette': AICommandPaletteShowcase,
      'breadcrumb': BreadcrumbShowcase,
      'accordion': AccordionShowcase,
      'tooltip': TooltipShowcase,
      'popover': PopoverShowcase,
      'list': ListShowcase,
      'divider': DividerShowcase,
      'radio-button': RadioButtonShowcase,
      'loading-spinner': LoadingSpinnerShowcase,
      'code-block': CodeBlockShowcase,
      'phone-input': PhoneInputShowcase,
      'banner': BannerShowcase,
      'container': ContainerShowcase,
      'context-menu': ContextMenuShowcase,
      'empty-state': EmptyStateShowcase,
      'modal': ModalShowcase,
      'file-upload': FileUploadShowcase,
      'date-picker': DatePickerShowcase,
      'multi-select': MultiSelectShowcase,
      'timeline': TimelineShowcase,
      'grid-system': GridSystemShowcase,
      'flexbox': FlexboxShowcase,
      'color-picker': ColorPickerShowcase,
      // Design system components
      'color-palette': ColorPaletteComponent,
      'interactive-color-palette': InteractiveColorPalette,
      'typography-scale': TypographyScaleComponent,
      'enhanced-typography': EnhancedTypographyComponent,
      'spacing-system': SpacingSystemComponent,
      'elevation-shadows': ElevationShadowsComponent,
      'icon-system': IconSystemComponent,
      'interaction-states': InteractionStatesComponent,
      // Experimental components
      'workflow-builder': WorkflowBuilderComponent,
      'collaboration-panel': CollaborationPanelComponent,
    };

    return showcaseMap[component.slug];
  };

  const ShowcaseComponent = getShowcaseComponent();

  // If we have a custom showcase component, render it
  if (ShowcaseComponent) {
    return (
      <div className="space-y-6">
        <BreadcrumbNavigation />
        <ShowcaseComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BreadcrumbNavigation />
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{component.name}</h1>
            {component.description && (
              <p className="text-lg text-muted-foreground">{component.description}</p>
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
            <Badge variant="outline" className="bg-accent/10 text-accent">
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
