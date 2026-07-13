import type { ReactNode } from 'react';

import { PortalShell } from '@/hardware-portal/components/PortalShell';
import { CartProvider } from '@/hardware-portal/context/CartContext';

export default function HardwarePortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartProvider>
      <PortalShell>{children}</PortalShell>
    </CartProvider>
  );
}
