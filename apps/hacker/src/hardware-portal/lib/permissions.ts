import { type HackerRole, seasonCode, type UserProfile } from '@/actions';

/**
 * The hardware portal's access tiers, derived from the HT6 profile.
 *
 * Precedence: admin > staff > requester > none.
 *  - admin      → HT6 organizer (profile.isAdmin): inventory CRUD + fulfilment
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

export function getPortalRole(
  profile: UserProfile | null,
  hackerRole: HackerRole | null,
): PortalRole {
  if (!profile) return 'none';
  if (profile.isAdmin) return 'admin';
  if (hasSeasonRole(profile, 'sponsor')) return 'staff';
  // Volunteers get the checkout view like hackers (backend maps them to USER).
  if (hasSeasonRole(profile, 'volunteer')) return 'requester';
  // Must read the RAW hacker status — HackerContext's status map collapses
  // 'checked-in' into 'rsvped', which would hide the checked-in gate.
  if (hackerRole?.status === 'checked-in') return 'requester';
  return 'none';
}

export function portalHome(role: PortalRole): string {
  switch (role) {
    case 'admin':
      return '/hardware-portal/admin';
    case 'staff':
      return '/hardware-portal/admin/summary';
    case 'requester':
      return '/hardware-portal/hacker';
    default:
      return '/hardware-portal';
  }
}
