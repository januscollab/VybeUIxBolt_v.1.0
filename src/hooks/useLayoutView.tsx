
import { useState, useEffect } from 'react';

type ViewMode = 'design-system' | 'full-width';

export function useLayoutView() {
  const [viewMode, setViewMode] = useState<ViewMode>('design-system');

  useEffect(() => {
    const saved = localStorage.getItem('layout-view-mode');
    if (saved === 'design-system' || saved === 'full-width') {
      setViewMode(saved);
    }
  }, []);

  const toggleViewMode = () => {
    const newMode = viewMode === 'design-system' ? 'full-width' : 'design-system';
    setViewMode(newMode);
    localStorage.setItem('layout-view-mode', newMode);
  };

  const isDesignSystemView = viewMode === 'design-system';

  return {
    viewMode,
    isDesignSystemView,
    toggleViewMode
  };
}
