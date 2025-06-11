export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DesignToken {
  id: string;
  name: string;
  token_type: 'color' | 'typography' | 'spacing' | 'shadow' | 'radius' | 'motion';
  value: Record<string, any>;
  description: string | null;
  category_id: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  status: 'draft' | 'review' | 'stable' | 'deprecated';
  figma_url: string | null;
  storybook_url: string | null;
  is_experimental: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  variants?: ComponentVariant[];
  documentation?: Documentation[];
}

export interface ComponentVariant {
  id: string;
  component_id: string;
  name: string;
  props: Record<string, any>;
  code_example: string | null;
  preview_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Documentation {
  id: string;
  component_id: string;
  title: string;
  content: string;
  section: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}