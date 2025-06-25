import React, { createContext, useContext, useState, useEffect } from 'react';

interface FontProvider {
  id: string;
  name: string;
  type: 'google' | 'bunny' | 'local' | 'system';
  baseUrl?: string;
}

interface DesignSystemContextType {
  colorPalette: Record<string, string>;
  typography: Record<string, any>;
  brandName: string;
  logoUrl: string;
  backgrounds: Record<string, string>;
  fontProvider: FontProvider;
  availableFontProviders: FontProvider[];
  updateColorPalette: (colors: Record<string, string>) => void;
  updateTypography: (typography: Record<string, any>) => void;
  updateBranding: (branding: { brandName: string; logoUrl: string }) => void;
  updateBackgrounds: (backgrounds: Record<string, string>) => void;
  updateFontProvider: (provider: FontProvider) => void;
  exportSettings: () => string;
  importSettings: (jsonString: string) => boolean;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

const DEFAULT_COLOR_PALETTE = {
  primary: "#FF4A00",
  secondary: "#6b7280",
  accent: "#FF4A00",
  neutral: "#64748b",
  background: "#ffffff",
  text: "#1e293b",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  orange: "#FF4A00"
};

const DEFAULT_TYPOGRAPHY = {
  primary: { 
    family: "Poppins", 
    weights: ["400", "500", "600", "700"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    bunnyFontUrl: "https://fonts.bunny.net/css?family=poppins:400,500,600,700"
  },
  secondary: { 
    family: "Inter", 
    weights: ["400", "500"],
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
    bunnyFontUrl: "https://fonts.bunny.net/css?family=inter:400,500"
  }
};

const DEFAULT_BACKGROUNDS = {
  light: "#FFFFFF",
  neutral: "#F8F9FA", 
  cool: "#F8FAFC"
};

const FONT_PROVIDERS: FontProvider[] = [
  {
    id: 'google',
    name: 'Google Fonts',
    type: 'google',
    baseUrl: 'https://fonts.googleapis.com/css2'
  },
  {
    id: 'bunny',
    name: 'Bunny Fonts (Privacy-focused)',
    type: 'bunny',
    baseUrl: 'https://fonts.bunny.net/css'
  },
  {
    id: 'local',
    name: 'Local Fonts',
    type: 'local'
  },
  {
    id: 'system',
    name: 'System Fonts',
    type: 'system'
  }
];

export function LocalDesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [colorPalette, setColorPalette] = useState<Record<string, string>>(DEFAULT_COLOR_PALETTE);
  const [typography, setTypography] = useState<Record<string, any>>(DEFAULT_TYPOGRAPHY);
  const [brandName, setBrandName] = useState('VybeUI');
  const [logoUrl, setLogoUrl] = useState('');
  const [backgrounds, setBackgrounds] = useState<Record<string, string>>(DEFAULT_BACKGROUNDS);
  const [fontProvider, setFontProvider] = useState<FontProvider>(FONT_PROVIDERS[0]);

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
        setBackgrounds(settings.backgrounds || DEFAULT_BACKGROUNDS);
        setFontProvider(settings.fontProvider || FONT_PROVIDERS[0]);
      } catch (error) {
        console.error('Error loading design system settings:', error);
      }
    }
  }, []);

  // Apply design system changes to CSS variables
  useEffect(() => {
    applyDesignSystemToCSS();
  }, [colorPalette, typography, fontProvider]);

  const saveSettings = (updates: any) => {
    const settings = {
      colorPalette,
      typography,
      brandName,
      logoUrl,
      backgrounds,
      fontProvider,
      ...updates
    };
    localStorage.setItem('designSystemSettings', JSON.stringify(settings));
  };

  const applyDesignSystemToCSS = () => {
    const root = document.documentElement;
    
    // Apply color palette with design system tokens
    Object.entries(colorPalette).forEach(([key, value]) => {
      if (value) {
        const hslValue = hexToHSL(value);
        if (hslValue) {
          root.style.setProperty(`--${key}`, hslValue);
          
          // Ensure accent uses primary by default for VybeUI consistency
          if (key === 'primary' && !colorPalette.accent) {
            root.style.setProperty('--accent', hslValue);
          }
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

    // Load fonts based on provider
    loadFonts();
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

  const loadFonts = () => {
    // Remove existing font links
    const existingLinks = document.querySelectorAll('link[data-font-loader]');
    existingLinks.forEach(link => link.remove());

    const fontsToLoad = [];
    
    // Choose font URLs based on provider
    if (fontProvider.type === 'google') {
      if (typography.primary?.googleFontUrl) {
        fontsToLoad.push(typography.primary.googleFontUrl);
      }
      if (typography.secondary?.googleFontUrl) {
        fontsToLoad.push(typography.secondary.googleFontUrl);
      }
    } else if (fontProvider.type === 'bunny') {
      if (typography.primary?.bunnyFontUrl) {
        fontsToLoad.push(typography.primary.bunnyFontUrl);
      }
      if (typography.secondary?.bunnyFontUrl) {
        fontsToLoad.push(typography.secondary.bunnyFontUrl);
      }
    } else if (fontProvider.type === 'system') {
      // Use system fonts - no loading needed
      return;
    }

    // Load fonts with error handling
    fontsToLoad.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.setAttribute('data-font-loader', 'true');
      
      // Add error handling
      link.onerror = () => {
        console.warn(`Failed to load font from ${fontUrl}`);
        // Fallback to system fonts
        if (fontProvider.type !== 'system') {
          console.log('Falling back to system fonts');
        }
      };
      
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

  const updateBackgrounds = (bgs: Record<string, string>) => {
    setBackgrounds(bgs);
    saveSettings({ backgrounds: bgs });
  };

  const updateFontProvider = (provider: FontProvider) => {
    setFontProvider(provider);
    saveSettings({ fontProvider: provider });
    // Reload fonts immediately
    setTimeout(() => applyDesignSystemToCSS(), 100);
  };

  const exportSettings = () => {
    const settings = {
      colorPalette,
      typography,
      brandName,
      logoUrl,
      backgrounds,
      fontProvider,
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
      if (settings.backgrounds) setBackgrounds(settings.backgrounds);
      if (settings.fontProvider) setFontProvider(settings.fontProvider);
      
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
      backgrounds,
      fontProvider,
      availableFontProviders: FONT_PROVIDERS,
      updateColorPalette,
      updateTypography,
      updateBranding,
      updateBackgrounds,
      updateFontProvider,
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