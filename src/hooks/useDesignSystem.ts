
// Static data for the design system components and categories
import { Category, Component, DesignToken } from '@/types/design-system';

// Mock data for categories
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Core Components',
    description: 'Essential UI components',
    slug: 'core',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Form Elements',
    description: 'Form inputs and controls',
    slug: 'forms',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Navigation',
    description: 'Navigation and menu components',
    slug: 'navigation',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Data Display',
    description: 'Components for displaying data',
    slug: 'data-display',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Feedback',
    description: 'User feedback components',
    slug: 'feedback',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Mock data for components
const mockComponents: Component[] = [
  {
    id: '1',
    name: 'Button',
    description: 'Interactive button component',
    slug: 'button',
    category_id: '1',
    status: 'published' as any,
    is_experimental: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    figma_url: null,
    storybook_url: null,
    variants: [],
    documentation: []
  },
  {
    id: '2',
    name: 'Input',
    description: 'Text input component',
    slug: 'input',
    category_id: '2',
    status: 'published' as any,
    is_experimental: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    figma_url: null,
    storybook_url: null,
    variants: [],
    documentation: []
  }
];

// Mock data for design tokens
const mockDesignTokens: DesignToken[] = [
  {
    id: '1',
    name: 'Primary Color',
    description: 'Main brand color',
    token_type: 'color' as any,
    value: { hex: '#3b82f6' },
    category_id: null,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useCategories = () => {
  return {
    data: mockCategories,
    isLoading: false,
    error: null
  };
};

export const useComponents = (categorySlug?: string) => {
  let filteredComponents = mockComponents;
  
  if (categorySlug) {
    const category = mockCategories.find(cat => cat.slug === categorySlug);
    if (category) {
      filteredComponents = mockComponents.filter(comp => comp.category_id === category.id);
    }
  }
  
  return {
    data: filteredComponents,
    isLoading: false,
    error: null
  };
};

export const useDesignTokens = (tokenType?: 'color' | 'typography' | 'spacing' | 'shadow' | 'radius' | 'motion') => {
  let filteredTokens = mockDesignTokens;
  
  if (tokenType) {
    filteredTokens = mockDesignTokens.filter(token => token.token_type === tokenType);
  }
  
  return {
    data: filteredTokens,
    isLoading: false,
    error: null
  };
};

export const useComponent = (slug: string) => {
  const component = mockComponents.find(comp => comp.slug === slug);
  
  return {
    data: component,
    isLoading: false,
    error: component ? null : new Error('Component not found')
  };
};

// Re-export the main useDesignSystem hook from the local file
export { useLocalDesignSystem as useDesignSystem } from './useLocalDesignSystem';
