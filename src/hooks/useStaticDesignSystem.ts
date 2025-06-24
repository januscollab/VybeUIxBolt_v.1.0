
import { useState, useEffect } from 'react';
import { categories, components, type Category, type Component } from '@/data/staticData';

// Hook for categories
export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for realistic behavior
    const timer = setTimeout(() => {
      setData(categories.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}

// Hook for components (all or by category)
export function useComponents(categorySlug?: string) {
  const [data, setData] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredComponents = components;
      
      if (categorySlug) {
        const category = categories.find(c => c.slug === categorySlug);
        if (category) {
          filteredComponents = components.filter(c => c.category_id === category.id);
        }
      }
      
      setData(filteredComponents.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [categorySlug]);

  return { data, isLoading };
}

// Hook for single component
export function useComponent(slug: string) {
  const [data, setData] = useState<Component | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const component = components.find(c => c.slug === slug);
      setData(component || null);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  return { data, isLoading };
}

// Hook for design system settings (using local storage)
export function useDesignSystem() {
  const { 
    colorPalette, 
    typography, 
    brandName, 
    logoUrl,
    activeVersion,
    versions,
    updateColorPalette,
    updateTypography,
    updateBranding,
    saveVersion,
    loadVersion,
    refreshVersions,
    exportSettings,
    importSettings
  } = useLocalDesignSystem();

  return {
    colorPalette,
    typography,
    brandName,
    logoUrl,
    activeVersion,
    versions,
    updateColorPalette,
    updateTypography,
    updateBranding,
    saveVersion,
    loadVersion,
    refreshVersions,
    exportSettings,
    importSettings
  };
}

// Re-export the local design system hook
import { useLocalDesignSystem } from './useLocalDesignSystem';
export { useLocalDesignSystem };
