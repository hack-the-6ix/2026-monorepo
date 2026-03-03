'use client';

import { useEffect, useRef, useState } from 'react';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1080;
const SMALL_SCREEN_CONTENT_HEIGHT = 1420; // bottom of cliff-lEfT.svg: 696.56 + 722.82 ≈ 1419.38

/**
 * Minimum milliseconds between dimension-state updates.
 * Prevents rapid re-render cascades when ResizeObserver fires repeatedly
 * during address-bar transitions or keyboard show/hide on mobile.
 */
const THROTTLE_MS = 100;

/** Style type that includes the non-standard `zoom` property. */
type ZoomStyle = React.CSSProperties & { zoom?: number };

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

/**
 * Get layout viewport dimensions.
 * Uses document.documentElement.clientWidth/clientHeight which reflect the
 * CSS layout viewport and remain stable under pinch-zoom (unlike
 * window.innerWidth/innerHeight which change with zoom level).
 */
function getViewportDimensions() {
  if (typeof document === 'undefined') {
    return { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
  }
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
}

/**
 * Shared hook: throttled viewport dimensions via ResizeObserver.
 *
 * A trailing-edge throttle (THROTTLE_MS) limits state updates to ~10/sec,
 * which is enough to keep the layout responsive while avoiding render storms
 * during rapid viewport changes (pinch-zoom, address-bar slide, keyboard).
 *
 * With CSS `zoom` on the mobile code-path the GPU texture is already
 * screen-sized, so re-renders during zoom are cheap — no freeze needed.
 */
function useThrottledDimensions() {
  const [dimensions, setDimensions] = useState({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  });

  const stateRef = useRef({
    dims: { width: DESIGN_WIDTH, height: DESIGN_HEIGHT },
    lastUpdate: 0,
    timerId: null as ReturnType<typeof setTimeout> | null,
  });

  useEffect(() => {
    const s = stateRef.current;

    /** Apply new dimensions only when they actually changed. */
    const tryApply = () => {
      const next = getViewportDimensions();
      if (next.width === s.dims.width && next.height === s.dims.height) return;
      s.dims = next;
      s.lastUpdate = Date.now();
      setDimensions(next);
    };

    // Sync real viewport immediately on mount (post-hydration).
    tryApply();

    /** Trailing-edge throttle: at most one update per THROTTLE_MS. */
    const scheduleUpdate = () => {
      if (s.timerId !== null) return; // update already queued
      const elapsed = Date.now() - s.lastUpdate;
      const delay = Math.max(0, THROTTLE_MS - elapsed);
      s.timerId = setTimeout(() => {
        s.timerId = null;
        tryApply();
      }, delay);
    };

    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(document.documentElement);

    return () => {
      ro.disconnect();
      if (s.timerId !== null) clearTimeout(s.timerId);
    };
  }, []);

  return dimensions;
}

export function useViewportScale() {
  const dimensions = useThrottledDimensions();

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

  /**
   * Mobile (small-screen) styles use CSS `zoom` instead of `transform: scale()`.
   *
   * Why: `transform: scale(0.26)` rasterises the full 1440×1420 px layout and
   * then shrinks the bitmap.  On a 3× DPR phone that produces a GPU texture of
   * ~4320×4260 px (~73 MB).  During pinch-zoom the browser must re-rasterise
   * at the new zoom level, temporarily doubling GPU memory, which crashes the
   * renderer tab on memory-constrained devices.
   *
   * `zoom: 0.26` tells the browser to lay out at the *zoomed* size directly
   * (≈375 px wide), so the GPU texture never exceeds the actual screen
   * resolution.  The visual result is identical because the anchor point
   * (bottom-left / top-left + position: fixed) is the same.
   *
   * Note: `zoom` does NOT create a containing block for `position: fixed`
   * descendants (unlike `transform`), so the night overlay's `.layer-overlay`
   * must use `position: absolute` instead — see globals.css.
   */
  const smallScreenStyle: ZoomStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: `${DESIGN_WIDTH}px`,
    height: `${contentHeight}px`,
    zoom: smallScale,
  };

  const topLayerStyle: ZoomStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: `${DESIGN_WIDTH}px`,
    height: `${DESIGN_HEIGHT}px`,
    zoom: smallScale,
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
 * Hook to get current viewport dimensions (throttled, gesture-aware).
 */
export function useViewportSize() {
  return useThrottledDimensions();
}
