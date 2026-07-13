'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The hardware portal lives at its own route (`/hardware-portal`) with its own
 * layout/sub-routes, so its dashboard-registry entry just forwards there. This
 * covers anyone landing on `/?tab=hardware-portal`; the Sidebar links straight
 * to `/hardware-portal`.
 */
export default function HardwarePortalRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/hardware-portal');
  }, [router]);
  return null;
}
