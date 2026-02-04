/**
 * Asset mapping for landing page graphics
 * All assets are located in packages/assets/
 * Using relative imports until @hackthe6ix/assets package is properly linked
 */

// Main SVG assets
import logo from '../../../../packages/assets/Logo.svg';
import butterflies from '../../../../packages/assets/butterflies.svg';
import cnTowerBg from '../../../../packages/assets/cn-tower-bg.svg';
import spotlight from '../../../../packages/assets/spotlight.svg';

// Ellipses
import ellipse1 from '../../../../packages/assets/ellipse-1.svg';
import ellipse2 from '../../../../packages/assets/ellipse-2.svg';

// Vectors
import vector82 from '../../../../packages/assets/vector-82.svg';
import vector259 from '../../../../packages/assets/vector-259.svg';

// Union shapes
import union from '../../../../packages/assets/union.svg';
import union1 from '../../../../packages/assets/union-1.svg';

// Groups
import group14 from '../../../../packages/assets/group-14.svg';
import group55 from '../../../../packages/assets/group-55.svg';
import group56 from '../../../../packages/assets/group-56.svg';
import group57 from '../../../../packages/assets/group-57.svg';
import group71 from '../../../../packages/assets/group-71.svg';
import group73 from '../../../../packages/assets/group-73.svg';
import group74 from '../../../../packages/assets/group-74.svg';
import group103 from '../../../../packages/assets/group-103.svg';
import group104 from '../../../../packages/assets/group-104.svg';
import group112 from '../../../../packages/assets/group-112.svg';
import group116 from '../../../../packages/assets/group-116.svg';
import group117 from '../../../../packages/assets/group-117.svg';
import group120 from '../../../../packages/assets/group-120.svg';
import group499 from '../../../../packages/assets/group-499.svg';

// Organic assets (PNG)
import grass1 from '../../../../packages/assets/organic/grass_1.png';
import shroom1 from '../../../../packages/assets/organic/shroom_1.png';
import shroom2 from '../../../../packages/assets/organic/shroom_2.png';

export const assets = {
  // Main assets
  logo,
  butterflies,
  cnTowerBg,
  spotlight,
  
  // Ellipses
  ellipse1,
  ellipse2,
  
  // Vectors
  vector82,
  vector259,
  
  // Union shapes
  union,
  union1,
  
  // Groups
  group14,
  group55,
  group56,
  group57,
  group71,
  group73,
  group74,
  group103,
  group104,
  group112,
  group116,
  group117,
  group120,
  group499,
  
  // Organic assets
  grass1,
  shroom1,
  shroom2,
} as const;

// Helper function to get asset path
export function getAssetPath(key: keyof typeof assets): string {
  return assets[key];
}
