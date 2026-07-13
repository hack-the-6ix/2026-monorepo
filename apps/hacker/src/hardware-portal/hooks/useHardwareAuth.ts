'use client';

import { useHacker } from '@/context/HackerContext';
import { getPortalRole, type PortalRole } from '../lib/permissions';

export interface HardwareAuth {
  role: PortalRole;
  loading: boolean;
}

/**
 * Bridges the dashboard's HackerContext to the hardware portal's permission
 * model. Replaces the old stubbed AuthContext (VITE_DEV_ADMIN) — the portal
 * role is derived from the HT6 profile (isAdmin / roles / checked-in status).
 */
export function useHardwareAuth(): HardwareAuth {
  const { profile, hackerRole, loading } = useHacker();
  return {
    role: getPortalRole(profile, hackerRole),
    loading,
  };
}
