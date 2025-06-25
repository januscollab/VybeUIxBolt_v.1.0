import { useParams } from "react-router-dom";
import { useComponents, useCategories, useComponent } from "@/hooks/useStaticDesignSystem";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

// Import all showcase components
import AlertShowcase from '@/components/showcase/AlertShowcase';
import AvatarShowcase from '@/components/showcase/AvatarShowcase';
import BadgeShowcase from '@/components/showcase/BadgeShowcase';
import ButtonShowcase from '@/components/showcase/ButtonShowcase';
import CalendarShowcase from '@/components/showcase/CalendarShowcase';
import CardShowcase from '@/components/showcase/CardShowcase';
import CheckboxShowcase from '@/components/showcase/CheckboxShowcase';
import CollapsibleShowcase from '@/components/showcase/CollapsibleShowcase';
import DialogShowcase from '@/components/showcase/DialogShowcase';
import DividerShowcase from '@/components/showcase/DividerShowcase';
import DrawerShowcase from '@/components/showcase/DrawerShowcase';
import DropdownMenuShowcase from '@/components/showcase/DropdownMenuShowcase';
import EmptyStateShowcase from '@/components/showcase/EmptyStateShowcase';
import ErrorBoundaryShowcase from '@/components/showcase/ErrorBoundaryShowcase';
import FormShowcase from '@/components/showcase/FormShowcase';
import GridSystemShowcase from '@/components/showcase/GridSystemShowcase';
import InputShowcase from '@/components/showcase/InputShowcase';
import LabelShowcase from '@/components/showcase/LabelShowcase';
import PopoverShowcase from '@/components/showcase/PopoverShowcase';
import RadioGroupShowcase from '@/components/showcase/RadioGroupShowcase';
import SelectShowcase from '@/components/showcase/SelectShowcase';
import SheetShowcase from '@/components/showcase/SheetShowcase';
import SkeletonShowcase from '@/components/showcase/SkeletonShowcase';
import SliderShowcase from "@/components/showcase/SliderShowcase";
import TableShowcase from "@/components/showcase/TableShowcase";
import TabsShowcase from "@/components/showcase/TabsShowcase";
import TextareaShowcase from "@/components/showcase/TextareaShowcase";
import ToastShowcase from "@/components/showcase/ToastShowcase";
import ToggleShowcase from "@/components/showcase/ToggleShowcase";
import TooltipShowcase from "@/components/showcase/TooltipShowcase";
import AspectRatioShowcase from "@/components/showcase/AspectRatioShowcase";
import CodeBlockShowcase from "@/components/showcase/CodeBlockShowcase";
import CalloutShowcase from "@/components/showcase/CalloutShowcase";
import BannerShowcase from "@/components/showcase/BannerShowcase";
import NavigationMenuShowcase from "@/components/showcase/NavigationMenuShowcase";

// Import foundation components
import ColorPaletteComponent from '@/components/design-system/ColorPaletteComponent';
import TypographyScaleComponent from '@/components/design-system/TypographyScaleComponent';
import SpacingSystemComponent from '@/components/design-system/SpacingSystemComponent';
import ElevationShadowsComponent from '@/components/design-system/ElevationShadowsComponent';
import InteractiveColorPalette from '@/components/design-system/InteractiveColorPalette';

// Component map for dynamic rendering
const componentMap: Record<string, React.ComponentType> = {
  'alert': AlertShowcase,
  'avatar': AvatarShowcase,
  'badge': BadgeShowcase,
  'button': ButtonShowcase,
  'calendar': CalendarShowcase,
  'card': CardShowcase,
  'checkbox': CheckboxShowcase,
  'collapsible': CollapsibleShowcase,
  'dialog': DialogShowcase,
  'divider': DividerShowcase,
  'drawer': DrawerShowcase,
  'dropdown-menu': DropdownMenuShowcase,
  'empty-state': EmptyStateShowcase,
  'error-boundary': ErrorBoundaryShowcase,
  'form': FormShowcase,
  'grid-system': GridSystemShowcase,
  'input': InputShowcase,
  'label': LabelShowcase,
  'popover': PopoverShowcase,
  'radio-button': RadioGroupShowcase,
  'select-dropdown': SelectShowcase,
  'sheet': SheetShowcase,
  'skeleton': SkeletonShowcase,
  'slider': SliderShowcase,
  'table': TableShowcase,
  'tabs': TabsShowcase,
  'textarea': TextareaShowcase,
  'toast': ToastShowcase,
  'toggle': ToggleShowcase,
  'tooltip': TooltipShowcase,
  'aspect-ratio': AspectRatioShowcase,
  'code-block': CodeBlockShowcase,
  'callout': CalloutShowcase,
  'banner': BannerShowcase,
  'navigation-menu': NavigationMenuShowcase,
  
  // Foundation components
  'color-palette': ColorPaletteComponent,
  'typography-scale': TypographyScaleComponent,
  'spacing-system': SpacingSystemComponent,
  'elevation-shadows': ElevationShadowsComponent,
  'interactive-color-palette': InteractiveColorPalette,
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { data: categories } = useCategories();
  const { data: components, isLoading } = useComponents(slug);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const category = categories?.find(c => c.slug === slug);
  
  // Scroll to component if hash is present
  useEffect(() => {
    if (location.hash) {
      const componentId = location.hash.replace('#', '');
      const element = document.getElementById(componentId);
      if (element) {
        // Add a small delay to ensure the page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash, components]);
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <BreadcrumbNavigation />
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-6">
        <BreadcrumbNavigation />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground">Category not found</h1>
        </div>
      </div>
    );
  }
  
  // Group components by subcategories if needed
  const groupedComponents = components?.reduce((acc, component) => {
    // For now we're not using subcategories, but this structure allows for future expansion
    const group = 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

      <div className="space-y-2"> 
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{components?.length || 0} components</Badge>
          {category.slug === 'experimental' && (
            <Badge variant="outline" className="border-accent text-accent"> 
              Experimental
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-12" ref={contentRef}>
        {components && components.length > 0 ? (
          <>
            {/* Render each component directly on the page */}
            {components.map((component) => {
              const ComponentShowcase = componentMap[component.slug];
              
              if (!ComponentShowcase) {
                return (
                  <Card key={component.id} id={component.slug} className="scroll-mt-20">
                    <CardHeader>
                      <CardTitle>{component.name}</CardTitle>
                      <CardDescription>{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-12 flex items-center justify-center border rounded-lg bg-muted/20">
                        <p className="text-muted-foreground">Component showcase not available</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              
              return (
                <section key={component.id} id={component.slug} className="scroll-mt-20">
                  <Card className="border-t-4 border-t-primary">
                    <CardContent className="pt-6">
                      <ComponentShowcase />
                    </CardContent>
                  </Card>
                  <Separator className="my-12" />
                </section>
              );
            })}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              No components yet
            </h2>
            <p className="text-muted-foreground">
              Components for this category are coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* Original card-based implementation - kept for reference
{components && components.length > 0 ? (
        <div className="space-y-8">
          {/* Standard Components * /}
          {components.filter(c => !c.is_experimental).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.filter(c => !c.is_experimental).map((component) => (
                <Card key={component.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{component.name}</CardTitle>
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
                    
                    <Button asChild size="sm" className="w-full">
                      <Link to={`/component/${component.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No components yet
          </h2>
          <p className="text-muted-foreground">
            Components for this category are coming soon.
          </p>
        </div>
      )}
*/