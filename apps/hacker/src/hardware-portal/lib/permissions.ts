import { type HackerRole, seasonCode, type UserProfile } from '@/actions';

/**
 * The hardware portal's access tiers, derived from the HT6 profile.
 *
 * Precedence: admin > staff > requester > none.
 *  - admin      → HT6 organizer (an `admin` role on the profile): inventory CRUD + fulfilment
 *  - staff      → sponsor: view all orders (read-only; fulfilment is admin-only)
 *  - requester  → volunteer or checked-in hacker: browse / reserve / checkout
 *  - none       → everyone else (non-checked-in hacker, mentor, no role): denied
 *
 * Mirrors the backend_use_web tiers (admin→ADMIN, sponsor→READADMIN,
 * volunteer/hacker→USER); the checked-in gate is additionally enforced here
 * (and, for hackers, server-side).
 */
export type PortalRole = 'admin' | 'staff' | 'requester' | 'none';

// UserProfile.roles is typed `unknown[]` in actions.ts, so narrow each entry
// the same way getHackerRole (src/actions.ts) does.
function hasSeasonRole(
  profile: UserProfile,
  type: 'volunteer' | 'sponsor',
): boolean {
  return profile.roles.some((r) => {
    if (typeof r !== 'object' || r === null) return false;
    const role = r as { type?: unknown; seasonCode?: unknown };
    return role.type === type && role.seasonCode === seasonCode;
  });
}

function hasAdminRole(profile: UserProfile): boolean {
  return profile.roles.some((r) => {
    if (typeof r !== 'object' || r === null) return false;
    return (r as { type?: unknown }).type === 'admin';
  });
}

export function getPortalRole(
  profile: UserProfile | null,
  hackerRole: HackerRole | null,
): PortalRole {
  if (!profile) return 'none';
  if (hasAdminRole(profile)) return 'admin';
  if (hasSeasonRole(profile, 'sponsor')) return 'staff';
  // Volunteers get the checkout view like hackers (backend maps them to USER).
  if (hasSeasonRole(profile, 'volunteer')) return 'requester';
  // Must read the RAW hacker status — HackerContext's status map collapses
  // 'checked-in' into 'rsvped', which would hide the checked-in gate.
  if (hackerRole?.status === 'checked-in') return 'requester';
  return 'none';
}

/**
 * The portal's sub-views, selected within the dashboard tab via the `?hp=`
 * query param (the portal no longer has its own routes).
 */
export type PortalView = 'catalog' | 'orders' | 'items' | 'summary';

/** The dashboard tab id the portal is mounted under (`/?tab=…`). */
export const HARDWARE_PORTAL_TAB = 'event-hardware-portal';

/** Href for a portal sub-view within the dashboard tab. */
export function portalViewHref(view: PortalView): string {
  return `/?tab=${HARDWARE_PORTAL_TAB}&hp=${view}`;
}

/** The view each role lands on by default (null → no portal access). */
export function portalDefaultView(role: PortalRole): PortalView | null {
  switch (role) {
    case 'admin':
      return 'items';
    case 'staff':
      return 'summary';
    case 'requester':
      return 'catalog';
    default:
      return null;
  }
}

/** Which sub-views a given role is allowed to see. */
export function portalViewsForRole(role: PortalRole): PortalView[] {
  switch (role) {
    case 'admin':
      return ['items', 'summary'];
    case 'staff':
      return ['summary'];
    case 'requester':
      return ['catalog', 'orders'];
    default:
      return [];
  }
}
