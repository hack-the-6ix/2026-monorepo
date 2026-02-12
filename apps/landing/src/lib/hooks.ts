'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Design dimensions for the landing page
 */
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1080;

/**
 * Hook to calculate viewport scale factor for responsive scaling
 * 
 * - Scales down when viewport height < 1080px
 * - Width expands naturally (no horizontal scaling)
 * - Returns scale factor and CSS transform style
 */
export function useViewportScale() {
  const [scale, setScale] = useState(1);

  const calculateScale = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    
    const viewportHeight = window.innerHeight;
    // Only scale down when viewport is shorter than design height
    const newScale = Math.min(1, viewportHeight / DESIGN_HEIGHT);
    return newScale;
  }, []);

  useEffect(() => {
    // Initial calculation
    setScale(calculateScale());

    // Recalculate on resize
    const handleResize = () => {
      setScale(calculateScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateScale]);

  return {
    scale,
    // Transform style to apply to root container
    transformStyle: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      width: scale < 1 ? `${100 / scale}%` : '100%',
      height: scale < 1 ? `${DESIGN_HEIGHT}px` : '100%',
      minHeight: `${DESIGN_HEIGHT}px`,
    } as React.CSSProperties,
    // Whether scaling is active
    isScaled: scale < 1,
  };
}

/**
 * Hook to get current viewport dimensions
 */
export function useViewportSize() {
  const [size, setSize] = useState({ width: DESIGN_WIDTH, height: DESIGN_HEIGHT });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
