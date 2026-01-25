/**
 * Asset mapping for landing page graphics
 * Source assets are in packages/assets/
 * Next.js serves from public/assets, so assets should be:
 * - Symlinked: public/assets -> packages/assets (recommended for dev)
 * - Or copied during build
 */

// Asset paths - Next.js serves from /assets (public/assets folder)
const ASSETS_BASE = '/assets';

export const assets = {
  logo: `${ASSETS_BASE}/Logo.svg`,
  vector259: `${ASSETS_BASE}/vector-259.svg`,
  vector82: `${ASSETS_BASE}/vector-82.svg`,
  group499: `${ASSETS_BASE}/group-499.svg`,
  cnTowerBg: `${ASSETS_BASE}/cn-tower-bg.svg`,
  spotlight: `${ASSETS_BASE}/spotlight.svg`,
  group112: `${ASSETS_BASE}/group-112.svg`,
  group55: `${ASSETS_BASE}/group-55.svg`,
  group56: `${ASSETS_BASE}/group-56.svg`,
  group57: `${ASSETS_BASE}/group-57.svg`,
  ellipse1: `${ASSETS_BASE}/ellipse-1.svg`,
  ellipse2: `${ASSETS_BASE}/ellipse-2.svg`,
  group73: `${ASSETS_BASE}/group-73.svg`,
  group74: `${ASSETS_BASE}/group-74.svg`,
  union: `${ASSETS_BASE}/union.svg`,
  union1: `${ASSETS_BASE}/union-1.svg`,
  group14: `${ASSETS_BASE}/group-14.svg`,
  group71: `${ASSETS_BASE}/group-71.svg`,
  group116: `${ASSETS_BASE}/group-116.svg`,
  group103: `${ASSETS_BASE}/group-103.svg`,
  group104: `${ASSETS_BASE}/group-104.svg`,
  group117: `${ASSETS_BASE}/group-117.svg`,
  group120: `${ASSETS_BASE}/group-120.svg`,
  butterflies: `${ASSETS_BASE}/butterflies.svg`,
  expandIcon: `${ASSETS_BASE}/expand-icon.svg`, // May not exist yet
} as const;

// Helper function to get asset path
export function getAssetPath(key: keyof typeof assets): string {
  return assets[key];
}
