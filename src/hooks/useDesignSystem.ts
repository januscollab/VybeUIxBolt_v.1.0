import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category, Component, DesignToken } from '@/types/design-system';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Category[];
    },
  });
};

export const useComponents = (categorySlug?: string) => {
  return useQuery({
    queryKey: ['components', categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('components')
        .select(`
          *,
          variants:component_variants(*),
          documentation(*)
        `);
      
      if (categorySlug) {
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();
        
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }
      
      const { data, error } = await query.order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Component[];
    },
  });
};

export const useDesignTokens = (tokenType?: 'color' | 'typography' | 'spacing' | 'shadow' | 'radius' | 'motion') => {
  return useQuery({
    queryKey: ['design-tokens', tokenType],
    queryFn: async () => {
      let query = supabase
        .from('design_tokens')
        .select('*');
      
      if (tokenType) {
        query = query.eq('token_type', tokenType);
      }
      
      const { data, error } = await query.order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as DesignToken[];
    },
  });
};

export const useComponent = (slug: string) => {
  return useQuery({
    queryKey: ['component', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('components')
        .select(`
          *,
          variants:component_variants(*),
          documentation(*)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Component;
    },
  });
};

// Re-export the main useDesignSystem hook from the tsx file
export { useDesignSystem } from './useDesignSystem.tsx';