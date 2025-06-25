export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
}

export interface Component {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id: string;
  status: 'draft' | 'review' | 'stable' | 'deprecated';
  is_experimental?: boolean;
  sort_order?: number;
  variants?: ComponentVariant[];
  documentation?: Documentation[];
  figma_url?: string;
  storybook_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  component_id: string;
  code_example?: string;
  props?: Record<string, any>;
  preview_url?: string;
  sort_order?: number;
}

export interface Documentation {
  id: string;
  title: string;
  content: string;
  section?: string;
  component_id?: string;
  sort_order?: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Foundations',
    slug: 'foundations',
    description: 'Core design tokens and foundational elements',
    sort_order: 1
  },
  {
    id: '2',
    name: 'Core UI',
    slug: 'core-ui',
    description: 'Essential user interface components',
    sort_order: 2
  },
  {
    id: '3',
    name: 'Navigation',
    slug: 'navigation',
    description: 'Navigation and wayfinding components',
    sort_order: 3
  },
  {
    id: '4',
    name: 'Content & Layout',
    slug: 'content-layout',
    description: 'Components for organizing and displaying content',
    sort_order: 4
  },
  {
    id: '5',
    name: 'Forms',
    slug: 'forms',
    description: 'Form controls and input components',
    sort_order: 5
  },
  {
    id: '6',
    name: 'Feedback & Messaging',
    slug: 'feedback',
    description: 'Components for user feedback and notifications',
    sort_order: 6
  },
  {
    id: '7',
    name: 'Rich Text Editor',
    slug: 'rich-text-editor',
    description: 'Advanced text editing components',
    sort_order: 7
  },
  {
    id: '8',
    name: 'Experimental',
    slug: 'experimental',
    description: 'Cutting-edge components in development',
    sort_order: 8
  }
];

export const components: Component[] = [
  // Foundations
  {
    id: 'color-palette',
    name: 'Color Palette',
    slug: 'color-palette',
    description: 'Comprehensive color system with semantic tokens',
    category_id: '1',
    status: 'stable',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'typography-scale',
    name: 'Typography Scale',
    slug: 'typography-scale',
    description: 'Type hierarchy and typography system',
    category_id: '1',
    status: 'stable',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'spacing-system',
    name: 'Spacing System',
    slug: 'spacing-system',
    description: 'Consistent spacing scale and layout tokens',
    category_id: '1',
    status: 'stable',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'elevation-shadows',
    name: 'Elevation & Shadows',
    slug: 'elevation-shadows',
    description: 'Shadow system for depth and hierarchy',
    category_id: '1',
    status: 'stable',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'icon-system',
    name: 'Icon System',
    slug: 'icon-system',
    description: 'Comprehensive icon library and guidelines',
    category_id: '1',
    status: 'stable',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'interaction-states',
    name: 'Interaction States',
    slug: 'interaction-states',
    description: 'Hover, focus, and active state patterns',
    category_id: '1',
    status: 'stable',
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Core UI
  {
    id: 'button',
    name: 'Button',
    slug: 'button',
    description: 'Primary action component with multiple variants',
    category_id: '2',
    status: 'stable',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'input',
    name: 'Input',
    slug: 'input',
    description: 'Text input field with validation states',
    category_id: '2',
    status: 'stable',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'select-dropdown',
    name: 'Select Dropdown',
    slug: 'select-dropdown',
    description: 'Dropdown selection component',
    category_id: '2',
    status: 'stable',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'badge',
    name: 'Badge',
    slug: 'badge',
    description: 'Small status and labeling component',
    category_id: '2',
    status: 'stable',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'card',
    name: 'Card',
    slug: 'card',
    description: 'Container component for grouping content',
    category_id: '2',
    status: 'stable',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'avatar',
    name: 'Avatar',
    slug: 'avatar',
    description: 'User profile image or initials display',
    category_id: '2',
    status: 'stable',
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    slug: 'progress-bar',
    description: 'Visual progress indicator',
    category_id: '2',
    status: 'stable',
    sort_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'slider',
    name: 'Slider',
    slug: 'slider',
    description: 'Range input control',
    category_id: '2',
    status: 'stable',
    sort_order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    slug: 'checkbox',
    description: 'Boolean input control',
    category_id: '2',
    status: 'stable',
    sort_order: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'switch-toggle',
    name: 'Switch Toggle',
    slug: 'switch-toggle',
    description: 'On/off toggle control',
    category_id: '2',
    status: 'stable',
    sort_order: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'textarea',
    name: 'Textarea',
    slug: 'textarea',
    description: 'Multi-line text input',
    category_id: '2',
    status: 'stable',
    sort_order: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'radio-button',
    name: 'Radio Button',
    slug: 'radio-button',
    description: 'Single selection from multiple options',
    category_id: '2',
    status: 'stable',
    sort_order: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'loading-spinner',
    name: 'Loading Spinner',
    slug: 'loading-spinner',
    description: 'Loading state indicator',
    category_id: '2',
    status: 'stable',
    sort_order: 13,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    slug: 'tooltip',
    description: 'Contextual information overlay',
    category_id: '2',
    status: 'stable',
    sort_order: 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'popover',
    name: 'Popover',
    slug: 'popover',
    description: 'Floating content container',
    category_id: '2',
    status: 'stable',
    sort_order: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'accordion',
    name: 'Accordion',
    slug: 'accordion',
    description: 'Collapsible content sections',
    category_id: '2',
    status: 'stable',
    sort_order: 16,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'divider',
    name: 'Divider',
    slug: 'divider',
    description: 'Content separator',
    category_id: '2',
    status: 'stable',
    sort_order: 17,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'list',
    name: 'List',
    slug: 'list',
    description: 'Structured data display',
    category_id: '2',
    status: 'stable',
    sort_order: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Navigation
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    description: 'Navigation path indicator',
    category_id: '3',
    status: 'stable',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'navigation',
    name: 'Navigation Menu',
    slug: 'navigation',
    description: 'Main navigation component',
    category_id: '3',
    status: 'stable',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    slug: 'sidebar',
    description: 'Side navigation panel',
    category_id: '3',
    status: 'stable',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'command-menu',
    name: 'Command Menu',
    slug: 'command-menu',
    description: 'Keyboard-driven command interface',
    category_id: '3',
    status: 'stable',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'steps-stepper',
    name: 'Steps Stepper',
    slug: 'steps-stepper',
    description: 'Multi-step process indicator',
    category_id: '3',
    status: 'stable',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ai-command-palette',
    name: 'AI Command Palette',
    slug: 'ai-command-palette',
    description: 'AI-powered command interface',
    category_id: '3',
    status: 'stable',
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Content & Layout
  {
    id: 'table',
    name: 'Table',
    slug: 'table',
    description: 'Data table component',
    category_id: '4',
    status: 'stable',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'banner',
    name: 'Banner',
    slug: 'banner',
    description: 'Prominent announcement component',
    category_id: '4',
    status: 'stable',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'container',
    name: 'Container',
    slug: 'container',
    description: 'Layout container component',
    category_id: '4',
    status: 'stable',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Forms
  {
    id: 'form',
    name: 'Form',
    slug: 'form',
    description: 'Form wrapper and validation',
    category_id: '5',
    status: 'stable',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'form-field',
    name: 'Form Field',
    slug: 'form-field',
    description: 'Form field with label and validation',
    category_id: '5',
    status: 'stable',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'search-bar',
    name: 'Search Bar',
    slug: 'search-bar',
    description: 'Search input component',
    category_id: '5',
    status: 'stable',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'phone-input',
    name: 'Phone Input',
    slug: 'phone-input',
    description: 'International phone number input',
    category_id: '5',
    status: 'stable',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'code-block',
    name: 'Code Block',
    slug: 'code-block',
    description: 'Syntax-highlighted code display',
    category_id: '5',
    status: 'stable',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Feedback & Messaging
  {
    id: 'alert',
    name: 'Alert',
    slug: 'alert',
    description: 'Important message component',
    category_id: '6',
    status: 'stable',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'toast',
    name: 'Toast',
    slug: 'toast',
    description: 'Temporary notification',
    category_id: '6',
    status: 'stable',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Experimental
  {
    id: 'workflow-builder',
    name: 'Workflow Builder',
    slug: 'workflow-builder',
    description: 'Visual workflow creation tool',
    category_id: '8',
    status: 'draft',
    is_experimental: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'collaboration-panel',
    name: 'Collaboration Panel',
    slug: 'collaboration-panel',
    description: 'Real-time collaboration interface',
    category_id: '8',
    status: 'draft',
    is_experimental: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ai-command-palette-experimental',
    name: 'AI Command Palette',
    slug: 'ai-command-palette-experimental',
    description: 'Next-generation AI-powered command interface with advanced features',
    category_id: '8',
    status: 'draft',
    is_experimental: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cv-inspired',
    name: 'CV Inspired',
    slug: 'cv-inspired',
    description: 'Professional resume and portfolio components',
    category_id: '8',
    status: 'draft',
    is_experimental: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'component-analytics',
    name: 'Component Analytics',
    slug: 'component-analytics',
    description: 'Usage tracking and performance analytics for design system components',
    category_id: '8',
    status: 'draft',
    is_experimental: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'component-usage-guidelines',
    name: 'Component Usage Guidelines',
    slug: 'component-usage-guidelines',
    description: 'Interactive guidelines and best practices for component implementation',
    category_id: '8',
    status: 'draft',
    is_experimental: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
