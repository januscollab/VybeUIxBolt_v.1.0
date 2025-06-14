import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface DesignSystemContextType {
  colorPalette: Record<string, string>;
  typography: Record<string, any>;
  brandName: string;
  logoUrl: string;
  isAdmin: boolean;
  versions: any[];
  activeVersion: any;
  updateColorPalette: (colors: Record<string, string>) => Promise<void>;
  updateTypography: (typography: Record<string, any>) => Promise<void>;
  updateBranding: (branding: { brandName: string; logoUrl: string }) => Promise<void>;
  saveVersion: (name: string) => Promise<void>;
  loadVersion: (versionId: string) => Promise<void>;
  refreshVersions: () => Promise<void>;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [colorPalette, setColorPalette] = useState<Record<string, string>>({});
  const [typography, setTypography] = useState<Record<string, any>>({});
  const [brandName, setBrandName] = useState('VybeUI');
  const [logoUrl, setLogoUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [activeVersion, setActiveVersion] = useState<any>(null);

  useEffect(() => {
    if (user) {
      checkAdminRole();
      loadActiveDesignSystem();
      loadVersions();
    }
  }, [user]);

  // Apply design system changes to CSS variables
  useEffect(() => {
    applyDesignSystemToCSS();
  }, [colorPalette, typography]);

  const applyDesignSystemToCSS = () => {
    const root = document.documentElement;
    
    // Apply color palette
    if (colorPalette.primary) {
      // Convert hex to HSL for CSS variables
      const primaryHSL = hexToHSL(colorPalette.primary);
      if (primaryHSL) {
        root.style.setProperty('--primary', primaryHSL);
      }
    }
    
    if (colorPalette.secondary) {
      const secondaryHSL = hexToHSL(colorPalette.secondary);
      if (secondaryHSL) {
        root.style.setProperty('--secondary', secondaryHSL);
      }
    }

    if (colorPalette.orange) {
      const orangeHSL = hexToHSL(colorPalette.orange);
      if (orangeHSL) {
        root.style.setProperty('--orange', orangeHSL);
      }
    }

    // Apply typography
    if (typography.primary?.family) {
      root.style.setProperty('--font-primary', typography.primary.family);
    }
    
    if (typography.secondary?.family) {
      root.style.setProperty('--font-secondary', typography.secondary.family);
    }

    // Load Google Fonts if needed
    loadGoogleFonts();
  };

  const hexToHSL = (hex: string): string | null => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
  };

  const loadGoogleFonts = () => {
    const existingLinks = document.querySelectorAll('link[data-font-loader]');
    existingLinks.forEach(link => link.remove());

    const fontsToLoad = [];
    
    if (typography.primary?.googleFontUrl) {
      fontsToLoad.push(typography.primary.googleFontUrl);
    }
    
    if (typography.secondary?.googleFontUrl) {
      fontsToLoad.push(typography.secondary.googleFontUrl);
    }

    fontsToLoad.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.setAttribute('data-font-loader', 'true');
      document.head.appendChild(link);
    });
  };

  const checkAdminRole = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    
    try {
      // Check if user has admin role in user_roles table
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        return;
      }

      // User is admin if they have the admin role OR if they are the master admin
      const isMasterAdmin = user.email === 'alan@januscollab.com';
      const hasAdminRole = !!data;
      
      setIsAdmin(isMasterAdmin || hasAdminRole);
      
      // If master admin doesn't have role in database yet, add it
      if (isMasterAdmin && !hasAdminRole) {
        await supabase
          .from('user_roles')
          .insert({ user_id: user.id, role: 'admin' })
          .select()
          .maybeSingle();
      }
      
    } catch (error) {
      console.error('Error in checkAdminRole:', error);
      setIsAdmin(false);
    }
  };

  const loadActiveDesignSystem = async () => {
    try {
      // Load the active design system version from database
      const { data, error } = await supabase
        .from('design_system_versions')
        .select('*')
        .eq('is_active', true)
        .single();
        
      if (error) {
        console.error('Error loading design system:', error);
        // Fallback to default values
        setColorPalette({
          primary: "#3b82f6",
          secondary: "#6b7280",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          orange: "#f97316"
        });
        setTypography({
          primary: { 
            family: "Inter", 
            weights: ["400", "500", "600", "700"],
            googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          },
          secondary: { 
            family: "JetBrains Mono", 
            weights: ["400", "500"],
            googleFontUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          }
        });
        setBrandName('VybeUI');
        setLogoUrl('');
        return;
      }
      
      if (data) {
        setActiveVersion(data);
        setColorPalette((data.color_palette as Record<string, string>) || {});
        setTypography((data.typography as Record<string, any>) || {});
        setBrandName(data.brand_name || 'VybeUI');
        setLogoUrl(data.logo_url || '');
      }
    } catch (error) {
      console.error('Error in loadActiveDesignSystem:', error);
    }
  };

  const updateBranding = async (branding: { brandName: string; logoUrl: string }) => {
    if (!isAdmin) throw new Error('Admin access required');
    
    try {
      // Update the active design system version
      const { error } = await supabase
        .from('design_system_versions')
        .update({
          brand_name: branding.brandName,
          logo_url: branding.logoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('is_active', true);
        
      if (error) throw error;
      
      setBrandName(branding.brandName);
      setLogoUrl(branding.logoUrl);
    } catch (error) {
      console.error('Error updating branding:', error);
      throw error;
    }
  };

  const loadVersions = async () => {
    if (!isAdmin) return;
    
    try {
      const { data, error } = await supabase
        .from('design_system_versions')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error('Error loading versions:', error);
    }
  };

  const updateColorPalette = async (colors: Record<string, string>) => {
    if (!isAdmin) throw new Error('Admin access required');
    
    try {
      const { error } = await supabase
        .from('design_system_versions')
        .update({
          color_palette: colors,
          updated_at: new Date().toISOString()
        })
        .eq('is_active', true);
        
      if (error) throw error;
      setColorPalette(colors);
    } catch (error) {
      console.error('Error updating color palette:', error);
      throw error;
    }
  };

  const updateTypography = async (typo: Record<string, any>) => {
    if (!isAdmin) throw new Error('Admin access required');
    
    try {
      const { error } = await supabase
        .from('design_system_versions')
        .update({
          typography: typo,
          updated_at: new Date().toISOString()
        })
        .eq('is_active', true);
        
      if (error) throw error;
      setTypography(typo);
    } catch (error) {
      console.error('Error updating typography:', error);
      throw error;
    }
  };

  const saveVersion = async (name: string) => {
    if (!isAdmin) throw new Error('Admin access required');
    
    try {
      // First, set all versions to inactive
      await supabase
        .from('design_system_versions')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');
        
      // Create new version with current settings
      const { error } = await supabase
        .from('design_system_versions')
        .insert({
          version_name: name,
          brand_name: brandName,
          logo_url: logoUrl,
          color_palette: colorPalette,
          typography: typography,
          is_active: true,
          created_by: user?.id
        });
        
      if (error) throw error;
    } catch (error) {
      console.error('Error saving version:', error);
      throw error;
    }
  };

  const loadVersion = async (versionId: string) => {
    if (!isAdmin) throw new Error('Admin access required');
    
    try {
      // Set all versions to inactive
      await supabase
        .from('design_system_versions')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');
        
      // Set selected version to active
      const { error } = await supabase
        .from('design_system_versions')
        .update({ is_active: true })
        .eq('id', versionId);
        
      if (error) throw error;
      
      // Reload the design system
      await loadActiveDesignSystem();
    } catch (error) {
      console.error('Error loading version:', error);
      throw error;
    }
  };

  const refreshVersions = async () => {
    await loadVersions();
  };

  return (
    <DesignSystemContext.Provider value={{
      colorPalette,
      typography,
      brandName,
      logoUrl,
      isAdmin,
      versions,
      activeVersion,
      updateColorPalette,
      updateTypography,
      updateBranding,
      saveVersion,
      loadVersion,
      refreshVersions
    }}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
}

// Export query hooks from the existing file
export { useCategories, useComponents, useComponent, useDesignTokens } from './useDesignSystem';