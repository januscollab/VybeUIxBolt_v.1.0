import React from 'react';
import { useParams } from 'next/navigation';

import AlertShowcase from '@/components/showcase/AlertShowcase';
import AvatarShowcase from '@/components/showcase/AvatarShowcase';
import BadgeShowcase from '@/components/showcase/BadgeShowcase';
import ButtonShowcase from '@/components/showcase/ButtonShowcase';
import CalendarShowcase from '@/components/showcase/CalendarShowcase';
import CardShowcase from '@/components/showcase/CardShowcase';
import CheckboxShowcase from '@/components/showcase/CheckboxShowcase';
import CollapsibleShowcase from '@/components/showcase/CollapsibleShowcase';
import ComboboxShowcase from '@/components/showcase/ComboboxShowcase';
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
import LinkShowcase from '@/components/showcase/LinkShowcase';
import PopoverShowcase from '@/components/showcase/PopoverShowcase';
import RadioGroupShowcase from '@/components/showcase/RadioGroupShowcase';
import SelectShowcase from '@/components/showcase/SelectShowcase';
import SeparatorShowcase from '@/components/showcase/SeparatorShowcase';
import SheetShowcase from '@/components/showcase/SheetShowcase';
import SkeletonShowcase from '@/components/showcase/SkeletonShowcase';
import SliderShowcase from "@/components/showcase/SliderShowcase";
import SwitchShowcase from "@/components/showcase/SwitchShowcase";
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

// Import new experimental components
import AdvancedColorPickerShowcase from '@/components/showcase/experimental/AdvancedColorPickerShowcase';
import TypographyAnimatorShowcase from '@/components/showcase/experimental/TypographyAnimatorShowcase';
import MegaMenuShowcase from '@/components/showcase/experimental/MegaMenuShowcase';

export default function ComponentPage() {
  const { component } = useParams<{ component: string }>();

  const componentMap: Record<string, React.ComponentType> = {
    'alert': AlertShowcase,
    'avatar': AvatarShowcase,
    'badge': BadgeShowcase,
    'button': ButtonShowcase,
    'calendar': CalendarShowcase,
    'card': CardShowcase,
    'checkbox': CheckboxShowcase,
    'collapsible': CollapsibleShowcase,
    'combobox': ComboboxShowcase,
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
    'link': LinkShowcase,
    'popover': PopoverShowcase,
    'radio-group': RadioGroupShowcase,
    'select': SelectShowcase,
    'separator': SeparatorShowcase,
    'sheet': SheetShowcase,
    'skeleton': SkeletonShowcase,
    'slider': SliderShowcase,
    'switch': SwitchShowcase,
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
    
    // Add new experimental components
    'advanced-color-picker': AdvancedColorPickerShowcase,
    'typography-animator': TypographyAnimatorShowcase,
    'mega-menu': MegaMenuShowcase,
  };

  const Component = componentMap[component] || (() => <div>Component not found</div>);

  return (
    
      <Component />
    
  );
}
