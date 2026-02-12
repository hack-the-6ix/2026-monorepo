/**
 * Asset mapping for landing page graphics
 * All assets are located in packages/assets/
 * Using relative imports until @hackthe6ix/assets package is properly linked
 */

// Main SVG assets
// BG
import cnTowerBg from '../assets/cn-tower-bg.svg';
import cnTower from '../assets/cn-tower.svg';
import mistLeft from '../assets/mist-left.svg';
import mistRight from '../assets/mist-right.svg';

import bgGraphics from '../assets/bg-graphics.svg';
import cloudLeft from '../assets/cloud-left-1.svg';
import cloudRight from '../assets/cloud-right-1.svg';
import lightLeft1 from '../assets/test-light.svg';
import lightLeft2 from '../assets/light-left-2.svg';
import lightRight from '../assets/light-right.svg';
import spotlight from '../assets/spotlight.svg';

// Night overlay
import nightColorOverlay from '../assets/night-color-overlay.svg';

// Left cliff shapes
import cliffLeft1 from '../assets/cliff-left-1.svg';
import cliffLeft2 from '../assets/cliff-left-2.svg';
import cliffLeft3 from '../assets/cliff-left-3.svg';

// Right cliff shapes
import cliffRight1 from '../assets/cliff-right-1.svg';
import cliffRight2 from '../assets/cliff-right-2.svg';
import cliffRight3 from '../assets/cliff-right-3.svg';
import caveRight from '../assets/cave-right.svg';

// Trees
import tree1 from '../assets/tree-1.svg';
import tree2 from '../assets/tree-2.svg';

// Top Leaves
import leafbase from '../assets/leaf-base.svg';
import butterflies from '../assets/butterflies.svg';

// Unused for teaser, needed for final landing page
import group116 from '../assets/group-116.svg';
import vector82 from '../assets/vector-82.svg';
import vector259 from '../assets/vector-259.svg';

// Shared assets
import logo from '../../../../packages/assets/Logo.svg';
import grass1Shadow from '../../../../packages/assets/grass-1-shadow.svg';
import grass1 from '../../../../packages/assets/grass-1.svg';

import shroom1 from '../../../../packages/assets/organic/mushroom-1.svg';
import shroom2 from '../../../../packages/assets/organic/mushroom-2.svg';

export const assets = {
  // Main SVG assets
  cnTowerBg,
  cnTower,
  mistLeft,
  mistRight,

  bgGraphics,
  cloudLeft,
  cloudRight,
  lightLeft1,
  lightLeft2,
  lightRight,

  spotlight,

  nightColorOverlay,

  // Left cliff shapes
  cliffLeft1,
  cliffLeft2,
  cliffLeft3,

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

  // Unused for teaser, needed for final landing page
  group116,
  vector82,
  vector259,

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
