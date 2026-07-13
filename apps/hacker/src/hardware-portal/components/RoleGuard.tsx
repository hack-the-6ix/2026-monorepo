'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useHardwareAuth } from '../hooks/useHardwareAuth';
import { portalHome, type PortalRole } from '../lib/permissions';
import { NoAccess } from './NoAccess';
import { PageSpinner } from './Spinner';

interface RoleGuardProps {
  allow: PortalRole[];
  children: ReactNode;
}

/**
 * Gates a portal page to the given roles. Authentication itself is handled
 * upstream (middleware + HT6); this enforces role-based access:
 *  - 'none'          → NoAccess screen
 *  - allowed         → render
 *  - other real role → redirect to that role's home
 */
export function RoleGuard({ allow, children }: RoleGuardProps) {
  const { role, loading } = useHardwareAuth();
  const router = useRouter();

  const allowed = allow.includes(role);

  useEffect(() => {
    if (loading || allowed || role === 'none') return;
    router.replace(portalHome(role));
  }, [loading, allowed, role, router]);

  if (loading) return <PageSpinner />;
  if (role === 'none') return <NoAccess />;
  if (!allowed) return <PageSpinner />;
  return <>{children}</>;
}
