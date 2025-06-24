
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DesignSystemContextType {
  colorPalette: Record<string, string>;
  typography: Record<string, any>;
  brandName: string;
  logoUrl: string;
  updateColorPalette: (colors: Record<string, string>) => void;
  updateTypography: (typography: Record<string, any>) => void;
  updateBranding: (branding: { brandName: string; logoUrl: string }) => void;
  exportSettings: () => string;
  importSettings: (jsonString: string) => boolean;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

const DEFAULT_COLOR_PALETTE = {
  primary: "#3b82f6",
  secondary: "#6b7280",
  accent: "#06b6d4",
  neutral: "#64748b",
  background: "#ffffff",
  text: "#1e293b",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  orange: "#f97316"
};

const DEFAULT_TYPOGRAPHY = {
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
};

export function LocalDesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [colorPalette, setColorPalette] = useState<Record<string, string>>(DEFAULT_COLOR_PALETTE);
  const [typography, setTypography] = useState<Record<string, any>>(DEFAULT_TYPOGRAPHY);
  const [brandName, setBrandName] = useState('VybeUI');
  const [logoUrl, setLogoUrl] = useState('');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('designSystemSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setColorPalette(settings.colorPalette || DEFAULT_COLOR_PALETTE);
        setTypography(settings.typography || DEFAULT_TYPOGRAPHY);
        setBrandName(settings.brandName || 'VybeUI');
        setLogoUrl(settings.logoUrl || '');
      } catch (error) {
        console.error('Error loading design system settings:', error);
      }
    }
  }, []);

  // Apply design system changes to CSS variables
  useEffect(() => {
    applyDesignSystemToCSS();
  }, [colorPalette, typography]);

  const saveSettings = (updates: any) => {
    const settings = {
      colorPalette,
      typography,
      brandName,
      logoUrl,
      ...updates
    };
    localStorage.setItem('designSystemSettings', JSON.stringify(settings));
  };

  const applyDesignSystemToCSS = () => {
    const root = document.documentElement;
    
    // Apply color palette
    Object.entries(colorPalette).forEach(([key, value]) => {
      if (value) {
        const hslValue = hexToHSL(value);
        if (hslValue) {
          root.style.setProperty(`--${key}`, hslValue);
        }
      }
    });

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
    hex = hex.replace('#', '');
    
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

  const updateColorPalette = (colors: Record<string, string>) => {
    setColorPalette(colors);
    saveSettings({ colorPalette: colors });
  };

  const updateTypography = (typo: Record<string, any>) => {
    setTypography(typo);
    saveSettings({ typography: typo });
  };

  const updateBranding = (branding: { brandName: string; logoUrl: string }) => {
    setBrandName(branding.brandName);
    setLogoUrl(branding.logoUrl);
    saveSettings({ brandName: branding.brandName, logoUrl: branding.logoUrl });
  };

  const exportSettings = () => {
    const settings = {
      colorPalette,
      typography,
      brandName,
      logoUrl,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (jsonString: string): boolean => {
    try {
      const settings = JSON.parse(jsonString);
      
      if (settings.colorPalette) setColorPalette(settings.colorPalette);
      if (settings.typography) setTypography(settings.typography);
      if (settings.brandName) setBrandName(settings.brandName);
      if (settings.logoUrl) setLogoUrl(settings.logoUrl);
      
      saveSettings(settings);
      return true;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  };

  return (
    <DesignSystemContext.Provider value={{
      colorPalette,
      typography,
      brandName,
      logoUrl,
      updateColorPalette,
      updateTypography,
      updateBranding,
      exportSettings,
      importSettings
    }}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useLocalDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error('useLocalDesignSystem must be used within a LocalDesignSystemProvider');
  }
  return context;
}
