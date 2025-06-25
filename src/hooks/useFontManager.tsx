
import { useState, useEffect } from 'react';

interface FontOption {
  name: string;
  value: string;
  weights: number[];
}

export const GOOGLE_FONTS: FontOption[] = [
  { name: 'Poppins', value: 'Poppins', weights: [300, 400, 500, 600, 700] },
  { name: 'Inter', value: 'Inter', weights: [300, 400, 500, 600, 700] },
  { name: 'Roboto', value: 'Roboto', weights: [300, 400, 500, 700] },
  { name: 'Open Sans', value: 'Open Sans', weights: [300, 400, 600, 700] },
  { name: 'Lato', value: 'Lato', weights: [300, 400, 700] },
  { name: 'Montserrat', value: 'Montserrat', weights: [300, 400, 500, 600, 700] },
  { name: 'Nunito', value: 'Nunito', weights: [300, 400, 600, 700] },
  { name: 'Source Sans Pro', value: 'Source Sans Pro', weights: [300, 400, 600, 700] },
  { name: 'Ubuntu', value: 'Ubuntu', weights: [300, 400, 500, 700] },
  { name: 'Raleway', value: 'Raleway', weights: [300, 400, 500, 600, 700] }
];

export function useFontManager() {
  const [primaryFont, setPrimaryFont] = useState('Poppins');
  const [secondaryFont, setSecondaryFont] = useState('Inter');
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set(['Poppins', 'Inter']));

  useEffect(() => {
    const savedPrimary = localStorage.getItem('design-system-primary-font');
    const savedSecondary = localStorage.getItem('design-system-secondary-font');
    
    if (savedPrimary) setPrimaryFont(savedPrimary);
    if (savedSecondary) setSecondaryFont(savedSecondary);
  }, []);

  const loadGoogleFont = async (fontName: string) => {
    if (loadedFonts.has(fontName)) return;

    const fontOption = GOOGLE_FONTS.find(f => f.value === fontName);
    if (!fontOption) return;

    const weights = fontOption.weights.join(',');
    const fontFamily = fontName.replace(/\s+/g, '+');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weights}&display=swap`;

    // Create and append link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);

    // Wait for font to load
    await new Promise((resolve) => {
      link.onload = resolve;
      link.onerror = resolve; // Continue even if font fails to load
    });

    setLoadedFonts(prev => new Set([...prev, fontName]));
  };

  const updatePrimaryFont = async (fontName: string) => {
    await loadGoogleFont(fontName);
    setPrimaryFont(fontName);
    localStorage.setItem('design-system-primary-font', fontName);
    
    // Update CSS variable
    document.documentElement.style.setProperty('--font-primary', `"${fontName}", system-ui, sans-serif`);
  };

  const updateSecondaryFont = async (fontName: string) => {
    await loadGoogleFont(fontName);
    setSecondaryFont(fontName);
    localStorage.setItem('design-system-secondary-font', fontName);
    
    // Update CSS variable
    document.documentElement.style.setProperty('--font-secondary', `"${fontName}", monospace`);
  };

  const resetToDefaults = () => {
    setPrimaryFont('Poppins');
    setSecondaryFont('Inter');
    localStorage.removeItem('design-system-primary-font');
    localStorage.removeItem('design-system-secondary-font');
    
    // Reset CSS variables
    document.documentElement.style.setProperty('--font-primary', '"Poppins", system-ui, sans-serif');
    document.documentElement.style.setProperty('--font-secondary', '"Inter", monospace');
  };

  return {
    primaryFont,
    secondaryFont,
    updatePrimaryFont,
    updateSecondaryFont,
    resetToDefaults,
    availableFonts: GOOGLE_FONTS
  };
}
