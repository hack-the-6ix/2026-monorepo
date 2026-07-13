'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { userApi } from '../api/user.api';
import { useCart } from '../context/CartContext';
import { useHardwareAuth } from '../hooks/useHardwareAuth';
import { useQuery } from '../hooks/useQuery';
import { portalHome } from '../lib/permissions';
import { CartModal } from './CartModal';

const HACKER_HOME = '/hardware-portal/hacker';
const HACKER_ORDERS = '/hardware-portal/hacker/orders';
const ADMIN_HOME = '/hardware-portal/admin';
const ADMIN_SUMMARY = '/hardware-portal/admin/summary';

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
 * Ported from the Vite app's Layout. Provides the hardware portal's own header
 * chrome (logo, role-based nav, cart). The nav and CartModal adapt to the
 * viewer's PortalRole: admin → Inventory + Summary; staff → Summary only;
 * requester → Catalog/My-Orders toggle + Cart.
 */
export function PortalShell({ children }: { children: ReactNode }) {
  const { role } = useHardwareAuth();
  const { open: openCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';
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

  const onMyOrders = pathname === HACKER_ORDERS;
  const homeHref = role === 'none' ? '/hardware-portal' : portalHome(role);

  const navClass = (active: boolean) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      active ?
        'bg-brand text-brand-fg'
      : 'border border-brand text-brand hover:bg-brand/10'
    }`;

  return (
    <div className="min-h-screen bg-slate-strip">
      <header className="sticky top-0 z-30 border-b border-slate-line bg-white">
        <div className="mx-auto flex h-header-bar max-w-page-max items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            href={homeHref}
            className="flex items-center gap-4 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Go to home"
          >
            <img
              src="/hardware-logo.svg"
              alt=""
              aria-hidden
              className="h-[50px] w-auto"
            />
            <h1 className="text-[1.25rem] font-semibold tracking-tight text-brand">
              HT6 HARDWARE CHECKOUT
            </h1>
          </Link>

          {(isAdmin || isStaff) && (
            <nav className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  href={ADMIN_HOME}
                  className={navClass(pathname === ADMIN_HOME)}
                >
                  Inventory
                </Link>
              )}
              <Link
                href={ADMIN_SUMMARY}
                className={navClass(pathname === ADMIN_SUMMARY)}
              >
                Summary
              </Link>
            </nav>
          )}

          {isRequester && (
            <nav className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  router.push(onMyOrders ? HACKER_HOME : HACKER_ORDERS)
                }
                className="btn-brand-outline"
              >
                {onMyOrders ? 'Catalog' : 'My Orders'}
              </button>

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

              <div
                aria-hidden
                className="grid h-[52px] w-[52px] place-items-center rounded-full bg-gradient-to-br from-slate-line to-ink-mute text-sm font-semibold text-white shadow-sm"
              >
                HT
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-page-max px-6 py-10 sm:px-10 lg:px-16">
        {children}
      </main>

      {isRequester && <CartModal />}
    </div>
  );
}
