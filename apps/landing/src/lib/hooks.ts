'use client';

import { useCallback, useEffect, useState } from 'react';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1080;
const SMALL_SCREEN_CONTENT_HEIGHT = 1420; // bottom of cliff-lEfT.svg: 696.56 + 722.82 ≈ 1419.38

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

  const MAX_EFFECTIVE_WIDTH = 2560;
  const aspect = dimensions.width / dimensions.height;
  const isSmallScreen = aspect < 4 / 3;
  const isPortrait = aspect <= 0.75;
  const WIDE_ASPECT = 4 / 3;
  const NARROW_ASPECT = 3 / 4;
  const rideUpProgress = Math.max(
    0,
    Math.min(1, (WIDE_ASPECT - aspect) / (WIDE_ASPECT - NARROW_ASPECT)),
  );
  const contentHeight = Math.round(
    DESIGN_HEIGHT +
      rideUpProgress * (SMALL_SCREEN_CONTENT_HEIGHT - DESIGN_HEIGHT),
  );

  const smallScale = dimensions.width / DESIGN_WIDTH;

  const vScale = Math.max(
    dimensions.width / MAX_EFFECTIVE_WIDTH,
    Math.min(1, dimensions.height / DESIGN_HEIGHT),
  );
  const hScale = dimensions.width / DESIGN_WIDTH;

  const effectiveWidth =
    isSmallScreen ? DESIGN_WIDTH : dimensions.width / vScale;
  const layoutTier = getTier(effectiveWidth);

  const smallScreenStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: `${DESIGN_WIDTH}px`,
    height: `${contentHeight}px`,
    transform: `scale(${smallScale})`,
    transformOrigin: 'bottom left',
  };

  const topLayerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: `${DESIGN_WIDTH}px`,
    height: `${DESIGN_HEIGHT}px`,
    transform: `scale(${smallScale})`,
    transformOrigin: 'top left',
  };

  const normalStyle: React.CSSProperties = {
    transform: vScale !== 1 ? `scale(${vScale})` : undefined,
    transformOrigin: 'top left',
    width: vScale !== 1 ? `${100 / vScale}%` : '100%',
    height: vScale !== 1 ? `${DESIGN_HEIGHT}px` : '100%',
    minHeight: `${DESIGN_HEIGHT}px`,
  };

  return {
    vScale,
    hScale,
    viewportWidth: dimensions.width,
    viewportHeight: dimensions.height,
    effectiveWidth,
    layoutTier,
    isSmallScreen,
    isPortrait,
    smallScale,
    topLayerStyle,

    scaleWidth: (px: number) => px * hScale,
    scaleLeft: (px: number) => px * hScale,

    /**
     * Calculate width to maintain fixed gap from right edge.
     * Uses the effective content width (accounts for vScale transform).
     */
    widthToFixedGap: (baseLeft: number, gapFromRight: number) => {
      return effectiveWidth - gapFromRight - baseLeft;
    },

    transformStyle: isSmallScreen ? smallScreenStyle : normalStyle,

    isScaled: isSmallScreen || vScale !== 1,
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
