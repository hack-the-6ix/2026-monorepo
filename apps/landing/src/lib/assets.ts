/**
 * Asset mapping for landing page graphics
 * All assets are located in packages/assets/
 * Assets are imported directly as static imports (handled by webpack)
 */

// Import assets directly from packages/assets
// These will be processed by webpack and bundled appropriately
import logo from '../../../../packages/assets/Logo.svg';
import vector259 from '../../../../packages/assets/vector-259.svg';
import vector82 from '../../../../packages/assets/vector-82.svg';
import group499 from '../../../../packages/assets/group-499.svg';
import cnTowerBg from '../../../../packages/assets/cn-tower-bg.svg';
import spotlight from '../../../../packages/assets/spotlight.svg';
import group112 from '../../../../packages/assets/group-112.svg';
import group55 from '../../../../packages/assets/group-55.svg';
import group56 from '../../../../packages/assets/group-56.svg';
import group57 from '../../../../packages/assets/group-57.svg';
import ellipse1 from '../../../../packages/assets/ellipse-1.svg';
import ellipse2 from '../../../../packages/assets/ellipse-2.svg';
import group73 from '../../../../packages/assets/group-73.svg';
import group74 from '../../../../packages/assets/group-74.svg';
import union from '../../../../packages/assets/union.svg';
import union1 from '../../../../packages/assets/union-1.svg';
import group14 from '../../../../packages/assets/group-14.svg';
import group71 from '../../../../packages/assets/group-71.svg';
import group116 from '../../../../packages/assets/group-116.svg';
import group103 from '../../../../packages/assets/group-103.svg';
import group104 from '../../../../packages/assets/group-104.svg';
import group117 from '../../../../packages/assets/group-117.svg';
import group120 from '../../../../packages/assets/group-120.svg';
import butterflies from '../../../../packages/assets/butterflies.svg';

export const assets = {
  logo,
  vector259,
  vector82,
  group499,
  cnTowerBg,
  spotlight,
  group112,
  group55,
  group56,
  group57,
  ellipse1,
  ellipse2,
  group73,
  group74,
  union,
  union1,
  group14,
  group71,
  group116,
  group103,
  group104,
  group117,
  group120,
  butterflies,
  expandIcon: '', // Will use inline SVG for expand icon
} as const;

// Helper function to get asset path
export function getAssetPath(key: keyof typeof assets): string {
  return assets[key];
}
