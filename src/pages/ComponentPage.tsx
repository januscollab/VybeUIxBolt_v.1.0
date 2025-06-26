import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComponent } from '@/hooks/useStaticDesignSystem';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
import NavigationMenuShowcase from "@/components/showcase/NavigationMenuShowcase";
// Import foundation components
import ColorPaletteComponent from '@/components/design-system/ColorPaletteComponent';
import TypographyScaleComponent from '@/components/design-system/TypographyScaleComponent';
import SpacingSystemComponent from '@/components/design-system/SpacingSystemComponent';
import ElevationShadowsComponent from '@/components/design-system/ElevationShadowsComponent';
import InteractiveColorPalette from '@/components/design-system/InteractiveColorPalette';

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: component, isLoading } = useComponent(slug || '');

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
    'radio-group': RadioGroupShowcase,
    'select': SelectShowcase,
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
    'navigation-menu': NavigationMenuShowcase,
        
    // Add foundation components
    'color-palette': ColorPaletteComponent,
    'typography-scale': TypographyScaleComponent,
    'spacing-system': SpacingSystemComponent,
    'elevation-shadows': ElevationShadowsComponent,
    'interactive-color-palette': InteractiveColorPalette,
  };

  const Component = componentMap[slug || ''] || (() => <div>Component not found</div>);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="h-[500px] bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!component) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground">Component not found</h1>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <Card className="border-t-4 border-t-primary">
        <CardContent className="pt-6">
          <Component />
        </CardContent>
      </Card>
    </div>
  );
}