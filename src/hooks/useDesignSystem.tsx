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
    if (!user) return;
    // Placeholder for admin check - will implement when types are ready
    setIsAdmin(false);
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