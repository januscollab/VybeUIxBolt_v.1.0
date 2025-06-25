
import { useState, useEffect } from 'react';

interface FontOption {
  name: string;
  value: string;
  weights: number[];
  category: string;
}

// Comprehensive list of Google Fonts (popular selection)
export const GOOGLE_FONTS: FontOption[] = [
  // Sans Serif
  { name: 'Poppins', value: 'Poppins', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Inter', value: 'Inter', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Roboto', value: 'Roboto', weights: [100, 300, 400, 500, 700, 900], category: 'sans-serif' },
  { name: 'Open Sans', value: 'Open Sans', weights: [300, 400, 500, 600, 700, 800], category: 'sans-serif' },
  { name: 'Lato', value: 'Lato', weights: [100, 300, 400, 700, 900], category: 'sans-serif' },
  { name: 'Montserrat', value: 'Montserrat', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Nunito', value: 'Nunito', weights: [200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro', weights: [200, 300, 400, 600, 700, 900], category: 'sans-serif' },
  { name: 'Ubuntu', value: 'Ubuntu', weights: [300, 400, 500, 700], category: 'sans-serif' },
  { name: 'Raleway', value: 'Raleway', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Nunito Sans', value: 'Nunito Sans', weights: [200, 300, 400, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Work Sans', value: 'Work Sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'Fira Sans', value: 'Fira Sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'sans-serif' },
  { name: 'DM Sans', value: 'DM Sans', weights: [400, 500, 700], category: 'sans-serif' },
  { name: 'Manrope', value: 'Manrope', weights: [200, 300, 400, 500, 600, 700, 800], category: 'sans-serif' },
  
  // Serif
  { name: 'Playfair Display', value: 'Playfair Display', weights: [400, 500, 600, 700, 800, 900], category: 'serif' },
  { name: 'Merriweather', value: 'Merriweather', weights: [300, 400, 700, 900], category: 'serif' },
  { name: 'Crimson Text', value: 'Crimson Text', weights: [400, 600, 700], category: 'serif' },
  { name: 'Lora', value: 'Lora', weights: [400, 500, 600, 700], category: 'serif' },
  { name: 'Source Serif Pro', value: 'Source Serif Pro', weights: [200, 300, 400, 600, 700, 900], category: 'serif' },
  { name: 'Libre Baskerville', value: 'Libre Baskerville', weights: [400, 700], category: 'serif' },
  { name: 'EB Garamond', value: 'EB Garamond', weights: [400, 500, 600, 700, 800], category: 'serif' },
  { name: 'Cormorant Garamond', value: 'Cormorant Garamond', weights: [300, 400, 500, 600, 700], category: 'serif' },
  
  // Monospace
  { name: 'Fira Code', value: 'Fira Code', weights: [300, 400, 500, 600, 700], category: 'monospace' },
  { name: 'JetBrains Mono', value: 'JetBrains Mono', weights: [100, 200, 300, 400, 500, 600, 700, 800], category: 'monospace' },
  { name: 'Source Code Pro', value: 'Source Code Pro', weights: [200, 300, 400, 500, 600, 700, 900], category: 'monospace' },
  { name: 'Space Mono', value: 'Space Mono', weights: [400, 700], category: 'monospace' },
  { name: 'Roboto Mono', value: 'Roboto Mono', weights: [100, 200, 300, 400, 500, 600, 700], category: 'monospace' },
  
  // Display
  { name: 'Oswald', value: 'Oswald', weights: [200, 300, 400, 500, 600, 700], category: 'display' },
  { name: 'Dancing Script', value: 'Dancing Script', weights: [400, 500, 600, 700], category: 'handwriting' },
  { name: 'Pacifico', value: 'Pacifico', weights: [400], category: 'handwriting' },
  { name: 'Comfortaa', value: 'Comfortaa', weights: [300, 400, 500, 600, 700], category: 'display' },
  { name: 'Righteous', value: 'Righteous', weights: [400], category: 'display' },
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

    const weights = fontOption.weights.join(';');
    const fontFamily = fontName.replace(/\s+/g, '+');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:ital,wght@0,${weights};1,${weights}&display=swap`;

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
