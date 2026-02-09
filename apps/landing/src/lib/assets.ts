/**
 * Asset mapping for landing page graphics
 * All assets are located in packages/assets/
 * Using relative imports until @hackthe6ix/assets package is properly linked
 */

// Main SVG assets
import butterflies from '../../../../packages/assets/butterflies.svg';
import cnTowerBg from '../assets/cn-tower-bg.svg';
// Ellipses
import ellipse1 from '../assets/ellipse-1.svg';
import ellipse2 from '../assets/ellipse-2.svg';
// Groups
import shroom1 from '../../../../packages/assets/organic/mushroom-1.svg';
import shroom2 from '../../../../packages/assets/organic/mushroom-2.svg';

import leaf1 from '../assets/leaf-1.svg';
import leaf2 from '../assets/leaf-2.svg';
import leaf3 from '../assets/leaf-3.svg';
import leafbase from '../assets/leaf-base.svg';

import group73 from '../assets/group-73.svg';
import group74 from '../assets/group-74.svg';
import group103 from '../../../../packages/assets/group-103.svg';
import group104 from '../../../../packages/assets/group-104.svg';
import group112 from '../../../../packages/assets/group-112.svg';
import group116 from '../../../../packages/assets/group-116.svg';
import group117 from '../../../../packages/assets/group-117.svg';
import group120 from '../assets/group-120.svg';
import bgGraphics from '../assets/bg-graphics.svg';
import logo from '../../../../packages/assets/Logo.svg';
import spotlight from '../assets/spotlight.svg';
// Union shapes
import union from '../assets/union.svg';
import union1 from '../assets/union-1.svg';
// Vectors
import vector82 from '../../../../packages/assets/vector-82.svg';
import vector259 from '../../../../packages/assets/vector-259.svg';

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
  shroom1,
  shroom2,
  leaf1,
  leaf2,
  leaf3,
  leafbase,
  group73,
  group74,
  group103,
  group104,
  group112,
  group116,
  group117,
  group120,
  bgGraphics,
} as const;

// Helper function to get asset path
export function getAssetPath(key: keyof typeof assets): string {
  return assets[key];
}
