'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { userApi } from '@/hardware-portal/api/user.api';
import { CartModal } from '@/hardware-portal/components/CartModal';
import { NoAccess } from '@/hardware-portal/components/NoAccess';
import { PageSpinner } from '@/hardware-portal/components/Spinner';
import { CartProvider, useCart } from '@/hardware-portal/context/CartContext';
import { useHardwareAuth } from '@/hardware-portal/hooks/useHardwareAuth';
import { useQuery } from '@/hardware-portal/hooks/useQuery';
import {
  portalDefaultView,
  type PortalRole,
  type PortalView,
  portalViewHref,
  portalViewsForRole,
} from '@/hardware-portal/lib/permissions';
import ItemsPage from '@/hardware-portal/pages/admin/ItemsPage';
import SummaryPage from '@/hardware-portal/pages/admin/SummaryPage';
import { CatalogPage } from '@/hardware-portal/pages/hacker/CatalogPage';
import { OrdersPage } from '@/hardware-portal/pages/hacker/OrdersPage';

const VIEW_LABEL: Record<PortalView, string> = {
  catalog: 'Catalog',
  orders: 'My Orders',
  items: 'Inventory',
  summary: 'Summary',
};

const VIEW_COMPONENT: Record<PortalView, React.ComponentType> = {
  catalog: CatalogPage,
  orders: OrdersPage,
  items: ItemsPage,
  summary: SummaryPage,
};

function CartIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

/**
 * In-tab replacement for the old route-based PortalShell header. Renders the
 * role-appropriate sub-view nav (as `?hp=` links so it stays inside the
 * dashboard tab) plus the requester's cart button.
 */
function PortalTabNav({
  role,
  activeView,
}: {
  role: PortalRole;
  activeView: PortalView;
}) {
  const { open: openCart } = useCart();
  const isRequester = role === 'requester';

  const { data: currentOrder } = useQuery(
    'user-current-order',
    userApi.getCurrentOrder,
    { enabled: isRequester },
  );

  const badgeCount =
    currentOrder?.state === 'RESERVED' ?
      currentOrder.orderItems.reduce((s, oi) => s + oi.quantity, 0)
    : 0;

  const navClass = (active: boolean) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      active ?
        'bg-brand text-brand-fg'
      : 'border border-brand text-brand hover:bg-brand/10'
    }`;

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <h2 className="text-[1.25rem] font-semibold tracking-tight text-brand">
        HT6 Hardware Checkout
      </h2>

      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-3">
          {portalViewsForRole(role).map((view) => (
            <Link
              key={view}
              href={portalViewHref(view)}
              className={navClass(view === activeView)}
            >
              {VIEW_LABEL[view]}
            </Link>
          ))}
        </nav>

        {isRequester && (
          <button
            type="button"
            onClick={openCart}
            className="btn-brand relative inline-flex items-center gap-2"
          >
            <CartIcon className="h-5 w-5" />
            Cart
            {badgeCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand">
                {badgeCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The hardware portal, rendered inline as a dashboard tab (under "Event").
 * Replaces the old separate `/hardware-portal` route tree + PortalShell: the
 * active sub-view comes from the `?hp=` query param, gated by the viewer's
 * portal role.
 */
function HardwarePortalTabInner() {
  const searchParams = useSearchParams();
  const { role, loading } = useHardwareAuth();

  if (loading) return <PageSpinner />;
  if (role === 'none') return <NoAccess />;

  const allowedViews = portalViewsForRole(role);
  const requested = searchParams.get('hp') as PortalView | null;
  const activeView =
    requested && allowedViews.includes(requested) ?
      requested
      // portalDefaultView is non-null here (role !== 'none').
    : (portalDefaultView(role) as PortalView);

  const ActiveView = VIEW_COMPONENT[activeView];
  const isRequester = role === 'requester';

  return (
    // Full-bleed light surface (the dashboard shell is dark) with the portal's
    // original centered content width, mirroring the removed PortalShell.
    <div className="min-h-screen bg-slate-strip">
      <div className="mx-auto max-w-page-max px-6 py-10 sm:px-10 lg:px-16">
        <PortalTabNav role={role} activeView={activeView} />
        <ActiveView />
      </div>
      {isRequester && <CartModal />}
    </div>
  );
}

export default function HardwarePortalTab() {
  return (
    <CartProvider>
      <HardwarePortalTabInner />
    </CartProvider>
  );
}
