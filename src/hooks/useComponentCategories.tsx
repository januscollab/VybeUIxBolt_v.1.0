import { useMemo } from "react";

export function useComponentCategories() {
  return [
    {
      id: 'foundation',
      name: 'Foundation',
      description: 'Core design tokens and foundational elements',
      components: [
        { id: 'colors', name: 'Colors' },
        { id: 'typography', name: 'Typography' },
        { id: 'shadows', name: 'Shadows' },
        { id: 'spacing', name: 'Spacing' },
        { id: 'borders', name: 'Borders' },
        
        // Add new experimental foundation components
        { id: 'advanced-color-picker', name: 'Advanced Color Picker', isExperimental: true },
        { id: 'typography-animator', name: 'Typography Animator', isExperimental: true },
      ]
    },
    {
      id: 'core-ui',
      name: 'Core UI',
      description: 'Essential interface components',
      components: [
        { id: 'button', name: 'Button' },
        { id: 'badge', name: 'Badge' },
        { id: 'card', name: 'Card' },
        { id: 'alert', name: 'Alert' },
        { id: 'code-block', name: 'Code Block' },
        { id: 'callout', name: 'Callout' },
        { id: 'banner', name: 'Banner' },
        { id: 'empty-state', name: 'Empty State' },
        { id: 'error-boundary', name: 'Error Boundary' },
      ]
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Navigation and menu components',
      components: [
        { id: 'breadcrumb', name: 'Breadcrumb' },
        { id: 'tabs', name: 'Tabs' },
        { id: 'pagination', name: 'Pagination' },
        
        // Add new experimental navigation components
        { id: 'mega-menu', name: 'Mega Menu', isExperimental: true },
      ]
    },
    {
      id: 'forms',
      name: 'Forms & Input',
      description: 'Form controls and input elements',
      components: [
        { id: 'input', name: 'Input' },
        { id: 'textarea', name: 'Textarea' },
        { id: 'select', name: 'Select' },
        { id: 'checkbox', name: 'Checkbox' },
        { id: 'radio', name: 'Radio' },
        { id: 'switch', name: 'Switch' },
        { id: 'form', name: 'Form' },
      ]
    },
    {
      id: 'layout',
      name: 'Layout & Structure',
      description: 'Layout and structural components',
      components: [
        { id: 'grid-system', name: 'Grid System' },
        { id: 'aspect-ratio', name: 'Aspect Ratio' },
        { id: 'container', name: 'Container' },
        { id: 'divider', name: 'Divider' },
      ]
    },
    {
      id: 'experimental',
      name: 'Experimental',
      description: 'Cutting-edge experimental components',
      components: [
        
      ]
    }
  ];
}
