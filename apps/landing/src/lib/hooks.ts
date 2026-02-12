'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Design dimensions for the landing page
 */
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1080;

/**
 * Hook to calculate viewport scale factors for responsive scaling
 * 
 * - vScale: Scales down when viewport height < 1080px (for vertical fitting)
 * - hScale: Proportional horizontal scale based on viewport width / 1440
 * - Provides helper functions to scale widths and positions
 */
export function useViewportScale() {
  const [dimensions, setDimensions] = useState({ width: DESIGN_WIDTH, height: DESIGN_HEIGHT });

  const calculateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  useEffect(() => {
    // Initial calculation
    setDimensions(calculateDimensions());

    // Recalculate on resize
    const handleResize = () => {
      setDimensions(calculateDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDimensions]);

  // Vertical scale - only scale down when viewport is shorter than design height
  const vScale = Math.min(1, dimensions.height / DESIGN_HEIGHT);
  
  // Horizontal scale - proportional to viewport width
  const hScale = dimensions.width / DESIGN_WIDTH;

  return {
    vScale,
    hScale,
    viewportWidth: dimensions.width,
    viewportHeight: dimensions.height,
    
    // Helper functions for scaling
    scaleWidth: (px: number) => px * hScale,
    scaleLeft: (px: number) => px * hScale,
    
    /**
     * Calculate width to maintain fixed gap from right edge
     * @param baseLeft - left position at 1440px (can be negative)
     * @param gapFromRight - fixed gap from right edge in px (e.g., 336.5)
     * @returns width that maintains the fixed gap at any viewport width
     */
    widthToFixedGap: (baseLeft: number, gapFromRight: number) => {
      // Container right edge = viewportWidth - gapFromRight
      // Container width = rightEdge - left = (viewportWidth - gapFromRight) - baseLeft
      return dimensions.width - gapFromRight - baseLeft;
    },
    
    // Transform style to apply to root container (vertical scaling only)
    transformStyle: {
      transform: vScale < 1 ? `scale(${vScale})` : undefined,
      transformOrigin: 'top left',
      width: vScale < 1 ? `${100 / vScale}%` : '100%',
      height: vScale < 1 ? `${DESIGN_HEIGHT}px` : '100%',
      minHeight: `${DESIGN_HEIGHT}px`,
    } as React.CSSProperties,
    
    // Whether vertical scaling is active
    isScaled: vScale < 1,
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
