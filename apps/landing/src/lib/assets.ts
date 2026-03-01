/**
 * Asset mapping for landing page graphics
 * Shared assets from @hackthe6ix/assets, local assets from src/assets/
 */

import {
  grass1,
  grass1Shadow,
  logo,
  shroom1,
  shroom2,
} from '@hackthe6ix/assets';
import butterflies from '../assets/butterflies.svg';
import caveRight from '../assets/cave-right.svg';

// Left cliff shapes
import cliffLeftExtrawide from '../assets/cliff-left-extrawide.svg';
import cliffLeftWide from '../assets/cliff-left-wide.svg';
import cliffLeft from '../assets/cliff-left.svg';

// Right cliff shapes
import cliffRight1 from '../assets/cliff-right-1.svg';
import cliffRight2 from '../assets/cliff-right-2.svg';
import cliffRight3 from '../assets/cliff-right-3.svg';
import cloudLeft from '../assets/cloud-left.svg';
import cloudRight from '../assets/cloud-right.svg';
import cnTower from '../assets/cn-tower.svg';

// Top Leaves
import leafbase from '../assets/leaf-base.svg';
import lightLeft1 from '../assets/light-left-1.svg';
import lightLeft2 from '../assets/light-left-2.svg';
import lightRight from '../assets/light-right.svg';
import mistLeft from '../assets/mist-left.svg';
import mistRight from '../assets/mist-right.svg';
// Night overlay
import nightColorOverlay from '../assets/night-color-overlay.svg';
import spotlight from '../assets/spotlight-large.svg';
// Trees
import tree1 from '../assets/tree-1.svg';
import tree2 from '../assets/tree-2.svg';

export const assets = {
  // Main SVG assets
  cnTower,
  mistLeft,
  mistRight,

  cloudLeft,
  cloudRight,
  lightLeft1,
  lightLeft2,
  lightRight,

  spotlight,

  nightColorOverlay,

  // Left cliff shapes
  cliffLeft,
  cliffLeftWide,
  cliffLeftExtrawide,

  // Right cliff shapes
  cliffRight1,
  cliffRight2,
  cliffRight3,
  caveRight,

  // Trees
  tree1,
  tree2,

  // Top Leaves
  leafbase,
  butterflies,

  // Shared assets
  logo,
  grass1Shadow,
  grass1,
  shroom1,
  shroom2,
} as const;

// Helper function to get asset path
export function getAssetPath(key: keyof typeof assets): string {
  return assets[key];
}
