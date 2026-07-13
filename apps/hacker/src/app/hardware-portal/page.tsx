'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { NoAccess } from '@/hardware-portal/components/NoAccess';
import { PageSpinner } from '@/hardware-portal/components/Spinner';
import { useHardwareAuth } from '@/hardware-portal/hooks/useHardwareAuth';
import { portalHome } from '@/hardware-portal/lib/permissions';

/** Sends the user to the right portal view based on their HT6 role. */
export default function HardwarePortalIndex() {
  const { role, loading } = useHardwareAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || role === 'none') return;
    router.replace(portalHome(role));
  }, [loading, role, router]);

  if (!loading && role === 'none') return <NoAccess />;
  return <PageSpinner />;
}
