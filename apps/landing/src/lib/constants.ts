/**
 * Landing page content constants
 * Centralized text content for easy updates and maintainability
 */

import type { LayoutTier } from './hooks';

export const EVENT_INFO = {
  date: 'July 17-19, 2026',
  location: 'Bahen Centre',
  format: 'In\u2011Person',
} as const;

export const HERO_CONTENT = {
  title: 'Hack the 6ix',
  subtitlePrefix: 'Tumble down the rabbit hole and ',
  subtitleHighlight: 'create',
} as const;

export const FORM_CONTENT = {
  description:
    'Applications open soon! Sign up to receive the latest updates in your inbox.',
  placeholder: 'name@email.com',
  buttonText: 'Sign Up',
} as const;

export const META = {
  title: 'Hack the 6ix 2026',
  description: "Toronto's largest summer hackathon",
} as const;

/**
 * Night overlay opacity (0-100 scale)
 * 0 = fully transparent, 100 = fully opaque
 */
export const NIGHT_OVERLAY_OPACITY = 0;

/**
 * Per-tier layout positions extracted from Figma designs.
 * Each tier defines base positions for elements that reposition at breakpoints.
 * Left-anchored elements still stretch via widthToFixedGap within a tier.
 */
interface TierLayout {
  minWidth: number;
  lowerLeft: {
    left: number;
    top: number;
    height: number;
    innerTopOffset: number;
    innerHeight: number;
    minWidth: number;
    gapFromRight: number;
    widthRatio?: number;
  };
  cnTower: { gapFromCliffRight: number; top: number };
  shroom2: { rightOffsetFromCliff: number; topOffset: number };
  cloudLeft: { maxInnerWidth: number };
}

export const LAYOUT_TIERS: Record<LayoutTier, TierLayout> = {
  '4:3': {
    minWidth: 1440,
    lowerLeft: {
      left: -2.66,
      top: 696.56,
      height: 722.82,
      innerTopOffset: 40.32,
      innerHeight: 673.5,
      minWidth: 1107,
      gapFromRight: 336.5,
    },
    cnTower: { gapFromCliffRight: 203, top: 636.77 },
    shroom2: { rightOffsetFromCliff: 42, topOffset: 162.32 },
    cloudLeft: { maxInnerWidth: 1903 },
  },
  '16:9': {
    minWidth: 1920,
    lowerLeft: {
      left: -4,
      top: 688.52,
      height: 795.48,
      innerTopOffset: 29.57,
      innerHeight: 765.91,
      minWidth: 1568,
      gapFromRight: 352,
      widthRatio: 1568 / 1920,
    },
    cnTower: { gapFromCliffRight: 210.86, top: 636.77 },
    shroom2: { rightOffsetFromCliff: 33.5, topOffset: 188.37 },
    cloudLeft: { maxInnerWidth: 1903 },
  },
  ultrawide: {
    minWidth: 2560,
    lowerLeft: {
      left: -4,
      top: 670.52,
      height: 844.48,
      innerTopOffset: 29.57,
      innerHeight: 814.91,
      minWidth: 2212,
      gapFromRight: 348,
      widthRatio: 2212 / 2560,
    },
    cnTower: { gapFromCliffRight: 293.83, top: 636.77 },
    shroom2: { rightOffsetFromCliff: 33.5, topOffset: 206.37 },
    cloudLeft: { maxInnerWidth: 1903 },
  },
} as const;
