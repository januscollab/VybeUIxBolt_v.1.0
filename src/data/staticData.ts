
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  component_count: number;
  is_experimental: boolean;
  sort_order?: number;
}

export interface Component {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  status: 'stable' | 'review' | 'deprecated' | 'backlog';
  is_experimental: boolean;
  sort_order?: number;
  figma_url?: string;
  storybook_url?: string;
  variants?: Variant[];
  documentation?: Documentation[];
}

export interface Variant {
  id: string;
  name: string;
  code_example: string;
  props?: { [key: string]: string };
}

export interface Documentation {
  id: string;
  title: string;
  content: string;
  section: string;
}

export const STATIC_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Foundations',
    slug: 'foundations',
    description: 'Core design system foundations including colors, typography, spacing, and visual hierarchy.',
    component_count: 6,
    is_experimental: false,
    sort_order: 1
  },
  {
    id: '2', 
    name: 'Core UI',
    slug: 'core-ui',
    description: 'Essential interface components for building consistent user experiences.',
    component_count: 8,
    is_experimental: false,
    sort_order: 2
  },
  {
    id: '3',
    name: 'Navigation',
    slug: 'navigation', 
    description: 'Navigation patterns and wayfinding components for intuitive user journeys.',
    component_count: 9,
    is_experimental: false,
    sort_order: 3
  },
  {
    id: '4',
    name: 'Content & Layout',
    slug: 'content-layout',
    description: 'Layout components and content organization patterns for structured interfaces.',
    component_count: 8,
    is_experimental: false,
    sort_order: 4
  },
  {
    id: '5',
    name: 'Forms',
    slug: 'forms',
    description: 'Form components and input patterns for data collection and user interaction.',
    component_count: 12,
    is_experimental: false,
    sort_order: 5
  },
  {
    id: '6',
    name: 'Feedback',
    slug: 'feedback',
    description: 'User feedback components including notifications, alerts, and status indicators.',
    component_count: 9,
    is_experimental: false,
    sort_order: 6
  },
  {
    id: '7',
    name: 'Experimental',
    slug: 'experimental',
    description: 'Cutting-edge components and experimental patterns pushing the boundaries of design.',
    component_count: 2,
    is_experimental: true,
    sort_order: 7
  }
];

export const STATIC_COMPONENTS: Component[] = [
  // Foundations (6 components)
  {
    id: '1',
    name: 'Color Palette',
    slug: 'color-palette',
    description: 'Primary, secondary, and accent colors with variations for different states.',
    category_id: '1',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '2',
    name: 'Typography Scale',
    slug: 'typography-scale',
    description: 'Font families, sizes, and typographic hierarchy for consistent text styles.',
    category_id: '1',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '3',
    name: 'Spacing System',
    slug: 'spacing-system',
    description: 'Consistent spacing values for margins, padding, and layout elements.',
    category_id: '1',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '4',
    name: 'Elevation & Shadows',
    slug: 'elevation-shadows',
    description: 'Shadow styles for creating depth and visual hierarchy.',
    category_id: '1',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '5',
    name: 'Icon System',
    slug: 'icon-system',
    description: 'Consistent icon set with guidelines for usage and implementation.',
    category_id: '1',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '6',
    name: 'Interaction States',
    slug: 'interaction-states',
    description: 'Visual styles for hover, focus, active, and disabled states.',
    category_id: '1',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  
  // Core UI Components (8 components)
  {
    id: '7',
    name: 'Button',
    slug: 'button',
    description: 'Interactive button component with multiple variants, sizes, and states.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '11',
    name: 'Badge',
    slug: 'badge',
    description: 'Status and label badges with various styles and colors.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '18',
    name: 'Avatar',
    slug: 'avatar',
    description: 'User avatar component with fallbacks and status indicators.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '20',
    name: 'Slider',
    slug: 'slider',
    description: 'Range slider component for numeric value selection.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '34',
    name: 'Code Block',
    slug: 'code-block',
    description: 'Formatted code display with syntax highlighting.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '38',
    name: 'Context Menu',
    slug: 'context-menu',
    description: 'Menu that appears on right-click or long-press.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '28',
    name: 'Tooltip',
    slug: 'tooltip',
    description: 'Contextual tooltips with positioning and animations.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '29',
    name: 'Popover',
    slug: 'popover',
    description: 'Floating content container with positioning controls.',
    category_id: '2',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },

  // Navigation Components (9 components)
  {
    id: '46',
    name: 'Navigation Menu',
    slug: 'navigation-menu',
    description: 'Hierarchical navigation with dropdown menus and links.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '47',
    name: 'Pagination',
    slug: 'pagination',
    description: 'Page navigation for long lists and content sets.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '48',
    name: 'Tabs',
    slug: 'tabs',
    description: 'Tabbed interface for organizing content into sections.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '26',
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    description: 'Navigation breadcrumb trail for hierarchical content.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '22',
    name: 'Sidebar',
    slug: 'sidebar',
    description: 'Collapsible sidebar navigation with menu items.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '23',
    name: 'Command Menu',
    slug: 'command-menu',
    description: 'Command palette for quick actions and navigation.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '25',
    name: 'AI Palette',
    slug: 'ai-command-palette',
    description: 'AI-powered command palette with intelligent suggestions.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '21',
    name: 'Search Bar',
    slug: 'search-bar',
    description: 'Search input with autocomplete and filtering capabilities.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '24',
    name: 'Steps Stepper',
    slug: 'steps-stepper',
    description: 'Multi-step process indicator with progress tracking.',
    category_id: '3',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },

  // Content & Layout Components (8 components)
  {
    id: '49',
    name: 'Table',
    slug: 'table',
    description: 'Data table component with sorting, filtering, and pagination.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '12',
    name: 'Card',
    slug: 'card',
    description: 'Content card component with headers, actions, and flexible layouts.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '37',
    name: 'Container',
    slug: 'container',
    description: 'Layout container for consistent content alignment and spacing.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '44',
    name: 'Grid System',
    slug: 'grid-system',
    description: 'Responsive grid layouts built with CSS Grid.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '45',
    name: 'Flexbox',
    slug: 'flexbox',
    description: 'Utilities for creating flexible and responsive layouts with Flexbox.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '30',
    name: 'List',
    slug: 'list',
    description: 'Structured list component with various item types.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '31',
    name: 'Divider',
    slug: 'divider',
    description: 'Visual divider to separate content sections.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '43',
    name: 'Timeline',
    slug: 'timeline',
    description: 'Component to display a series of events in chronological order.',
    category_id: '4',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },

  // Form Components (12 components)
  {
    id: '8',
    name: 'Input Field',
    slug: 'input',
    description: 'Text input component with validation, labels, and various input types.',
    category_id: '5', 
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '13',
    name: 'Form',
    slug: 'form',
    description: 'Form wrapper component with validation and submission handling.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '14',
    name: 'Form Field',
    slug: 'form-field',
    description: 'Structured form field with label, input, and error handling.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '17',
    name: 'Textarea',
    slug: 'textarea',
    description: 'Multi-line text input with auto-resize and character counting.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '15',
    name: 'Checkbox',
    slug: 'checkbox',
    description: 'Checkbox input with custom styling and validation.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '32',
    name: 'Radio Button',
    slug: 'radio-button',
    description: 'Radio button for single choice selection.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '16',
    name: 'Switch Toggle',
    slug: 'switch-toggle',
    description: 'Toggle switch component for binary choices.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '9',
    name: 'Select Dropdown',
    slug: 'select-dropdown',
    description: 'Dropdown selection component with search and multi-select capabilities.',
    category_id: '5',
    status: 'stable', 
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '10',
    name: 'Multi Select',
    slug: 'multi-select',
    description: 'Multi-selection dropdown with tags and filtering capabilities.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '42',
    name: 'Date Picker',
    slug: 'date-picker',
    description: 'Calendar-based date selection component.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '35',
    name: 'Phone Input',
    slug: 'phone-input',
    description: 'International phone number input with country code selection.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '41',
    name: 'File Upload',
    slug: 'file-upload',
    description: 'Component for uploading files with progress tracking.',
    category_id: '5',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },

  // Feedback Components (9 components)
  {
    id: '50',
    name: 'Alert',
    slug: 'alert',
    description: 'Notification banner for important messages and status updates.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '51',
    name: 'Toast Notification',
    slug: 'toast',
    description: 'Non-intrusive notification for brief status updates and messages.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '40',
    name: 'Modal Dialog',
    slug: 'modal-dialog',
    description: 'Overlay window for focused interactions and notifications.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '33',
    name: 'Loading Spinner',
    slug: 'loading-spinner',
    description: 'Animated spinner to indicate loading states with various sizes and variants.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '19',
    name: 'Progress Bar',
    slug: 'progress-bar',
    description: 'Linear progress indicator with various styles, sizes, and animations.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '36',
    name: 'Banner',
    slug: 'banner',
    description: 'Promotional banner with customizable content and actions.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '39',
    name: 'Empty State',
    slug: 'empty-state',
    description: 'Visual representation for empty data sets or missing content.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '52',
    name: 'Skeleton',
    slug: 'skeleton',
    description: 'Placeholder UI for indicating loading state.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },
  {
    id: '27',
    name: 'Accordion',
    slug: 'accordion',
    description: 'Vertically stacked sections of content that can be expanded or collapsed.',
    category_id: '6',
    status: 'stable',
    is_experimental: false,
    variants: [],
    documentation: []
  },

  // Experimental Components (2 components)
  {
    id: '53',
    name: 'Workflow Builder',
    slug: 'workflow-builder',
    description: 'Visual interface for creating and managing automated workflows.',
    category_id: '7',
    status: 'review',
    is_experimental: true,
    variants: [],
    documentation: []
  },
  {
    id: '54',
    name: 'Collaboration Panel',
    slug: 'collaboration-panel',
    description: 'Real-time collaboration interface with user presence and activity tracking.',
    category_id: '7',
    status: 'backlog',
    is_experimental: true,
    variants: [],
    documentation: []
  },
];

export const searchComponents = (query: string) => {
  const searchTerm = query.toLowerCase();
  return STATIC_COMPONENTS.filter(component => {
    const nameMatch = component.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = component.description.toLowerCase().includes(searchTerm);
    return nameMatch || descriptionMatch;
  });
};

// Export aliases for backward compatibility
export const categories = STATIC_CATEGORIES;
export const components = STATIC_COMPONENTS;
