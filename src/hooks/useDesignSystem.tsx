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

      if (error) {
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
    // Placeholder - will implement when database types are ready
    setColorPalette({
      primary: "#007bff",
      secondary: "#6c757d",
      success: "#28a745",
      warning: "#ffc107",
      error: "#dc3545",
      orange: "#ff6b35"
    });
    setTypography({
      primary: { family: "Inter", weights: ["400", "500", "600", "700"] },
      secondary: { family: "JetBrains Mono", weights: ["400", "500"] }
    });
    setBrandName('VybeUI');
    setLogoUrl('');
  };

  const updateBranding = async (branding: { brandName: string; logoUrl: string }) => {
    setBrandName(branding.brandName);
    setLogoUrl(branding.logoUrl);
  };

  const loadVersions = async () => {
    setVersions([]);
  };

  const updateColorPalette = async (colors: Record<string, string>) => {
    setColorPalette(colors);
  };

  const updateTypography = async (typo: Record<string, any>) => {
    setTypography(typo);
  };

  const saveVersion = async (name: string) => {
    // Placeholder
  };

  const loadVersion = async (versionId: string) => {
    // Placeholder
  };

  const refreshVersions = async () => {
    // Placeholder
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