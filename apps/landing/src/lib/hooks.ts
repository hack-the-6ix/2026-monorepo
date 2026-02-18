'use client';

import { useCallback, useEffect, useState } from 'react';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1080;

export type LayoutTier = '4:3' | '16:9' | 'ultrawide';

const TIER_THRESHOLDS: { tier: LayoutTier; minWidth: number }[] = [
  { tier: 'ultrawide', minWidth: 2560 },
  { tier: '16:9', minWidth: 1920 },
  { tier: '4:3', minWidth: 0 },
];

function getTier(width: number): LayoutTier {
  for (const { tier, minWidth } of TIER_THRESHOLDS) {
    if (width >= minWidth) return tier;
  }
  return '4:3';
}

export function useViewportScale() {
  const [dimensions, setDimensions] = useState({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  });

  const calculateDimensions = useCallback(() => {
    if (typeof window === 'undefined')
      return { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  useEffect(() => {
    setDimensions(calculateDimensions());

    const handleResize = () => {
      setDimensions(calculateDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDimensions]);

  const vScale = Math.min(1, dimensions.height / DESIGN_HEIGHT);
  const hScale = dimensions.width / DESIGN_WIDTH;
  const effectiveWidth =
    vScale < 1 ? dimensions.width / vScale : dimensions.width;
  const layoutTier = getTier(effectiveWidth);

  return {
    vScale,
    hScale,
    viewportWidth: dimensions.width,
    viewportHeight: dimensions.height,
    effectiveWidth,
    layoutTier,

    scaleWidth: (px: number) => px * hScale,
    scaleLeft: (px: number) => px * hScale,

    /**
     * Calculate width to maintain fixed gap from right edge.
     * Uses the effective content width (accounts for vScale transform).
     */
    widthToFixedGap: (baseLeft: number, gapFromRight: number) => {
      return effectiveWidth - gapFromRight - baseLeft;
    },

    transformStyle: {
      transform: vScale < 1 ? `scale(${vScale})` : undefined,
      transformOrigin: 'top left',
      width: vScale < 1 ? `${100 / vScale}%` : '100%',
      height: vScale < 1 ? `${DESIGN_HEIGHT}px` : '100%',
      minHeight: `${DESIGN_HEIGHT}px`,
    } as React.CSSProperties,

    isScaled: vScale < 1,
  };
}

/**
 * Hook to get current viewport dimensions
 */
export function useViewportSize() {
  const [size, setSize] = useState({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  });

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
