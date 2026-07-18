'use client';

import { useEffect, useState } from 'react';

import { HttpError } from '../api/client';
import { userApi } from '../api/user.api';
import { useCart } from '../context/CartContext';
import { useCartCountdown } from '../hooks/useCartCountdown';
import { useMutation } from '../hooks/useMutation';
import { useQuery } from '../hooks/useQuery';
import type { Item } from '../types';

function CloseIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

function MinusIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M6 12h12" />
    </svg>
  );
}

function PlusIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}

function ItemThumb({
  item,
  size = 100,
}: {
  item: Item | undefined;
  size?: number;
}) {
  if (item?.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt={item.name}
        className="rounded-md object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-md bg-slate-line/60"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}

export function CartModal() {
  const { isOpen, close } = useCart();

  const { data: items } = useQuery('user-items', userApi.getItems);
  const [currentOrderPoll, setCurrentOrderPoll] = useState(0);
  const { data: currentOrder } = useQuery(
    'user-current-order',
    userApi.getCurrentOrder,
    { pollInterval: currentOrderPoll },
  );

  const cartCountdown = useCartCountdown(
    currentOrder?.state === 'RESERVED' ? currentOrder.createdAt : null,
  );
  // Existence + cancelability follow server truth; only checkout is gated on the
  // client-side hold timer, so an expired-but-still-RESERVED cart is never stuck.
  const isReserved = currentOrder?.state === 'RESERVED';

  const itemsById = new Map<number, Item>(
    (items ?? []).map((it) => [it.id, it]),
  );

  // The cart *is* the RESERVED order. Prefer the live catalog entry over `oi.item`,
  // a snapshot embedded in the order payload whose availableQuantity is optional and
  // may be absent or stale — the +/- stock caps below depend on it being current.
  const rows =
    isReserved && currentOrder ?
      currentOrder.orderItems.map((oi) => ({
        itemId: oi.itemId,
        qty: oi.quantity,
        item: itemsById.get(oi.itemId) ?? oi.item,
      }))
    : [];
  const isEmpty = rows.length === 0;

  // Emptiness gates checkout too: '-' can now take every line to zero, leaving an
  // empty-but-still-RESERVED order that would otherwise submit nothing.
  const canCheckout = isReserved && cartCountdown !== 'Expired' && !isEmpty;

  // Poll the current order only while a reservation exists, so a still-RESERVED
  // order that outlives the client countdown converges to server truth (and the
  // modal recovers) instead of relying on a single one-shot refetch.
  useEffect(() => {
    setCurrentOrderPoll(isReserved ? 15_000 : 0);
  }, [isReserved]);

  const checkoutMutation = useMutation(() => userApi.checkoutCart(), {
    invalidateKeys: [/^user-/],
    onSuccess: () => close(),
  });

  const cancelMutation = useMutation(
    (orderId: number) => userApi.cancelOrder(orderId),
    {
      invalidateKeys: [/^user-/],
      onSuccess: () => close(),
    },
  );

  const addToReservationMutation = useMutation(
    ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      userApi.addToReservation(itemId, quantity),
    { invalidateKeys: [/^user-/] },
  );

  const removeFromReservationMutation = useMutation(
    ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      userApi.removeFromReservation(itemId, quantity),
    { invalidateKeys: [/^user-/] },
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  if (!isOpen) return null;

  // Quantity edits go straight to the reservation; the server owns the quantity and
  // the refetch triggered by invalidateKeys brings the new truth back.
  const isMutating =
    addToReservationMutation.isLoading ||
    removeFromReservationMutation.isLoading ||
    checkoutMutation.isLoading ||
    cancelMutation.isLoading;

  const handleIncrement = async (itemId: number) => {
    try {
      await addToReservationMutation.mutate({ itemId, quantity: 1 });
    } catch {
      // surfaced via error state
    }
  };

  const handleDecrement = async (itemId: number) => {
    try {
      await removeFromReservationMutation.mutate({ itemId, quantity: 1 });
    } catch {
      // surfaced via error state
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutMutation.mutate(undefined);
    } catch {
      // surfaced via error state
    }
  };

  const handleCancel = async () => {
    if (!currentOrder) return;
    try {
      await cancelMutation.mutate(currentOrder.id);
    } catch {
      // surfaced via error state
    }
  };

  // A rejected +/- would otherwise be an invisible no-op, since the row quantity
  // just re-renders from unchanged server state.
  const actionError =
    checkoutMutation.error ||
    cancelMutation.error ||
    addToReservationMutation.error ||
    removeFromReservationMutation.error;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cart"
      onClick={close}
    >
      <div
        className="relative w-full max-w-[527px] overflow-hidden rounded-card border-2 border-slate-line bg-slate-soft shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 rounded-md p-1 text-ink hover:bg-slate-line/40"
          aria-label="Close cart"
        >
          <CloseIcon />
        </button>

        <div className="px-6 pb-6 pt-9">
          <h2 className="text-center text-page-title font-bold text-brand">
            Cart
          </h2>

          {isReserved && cartCountdown === 'Expired' && (
            <p className="mt-1 text-center text-sm text-hw-red-700">
              Reservation expired — cancel to release your cart.
            </p>
          )}
          {isReserved && cartCountdown && cartCountdown !== 'Expired' && (
            <p className="mt-1 text-center text-sm text-hw-amber-600">
              Reserved cart — expires in{' '}
              <span className="font-mono font-semibold">{cartCountdown}</span>
            </p>
          )}

          <div className="mt-4 card-panel">
            <div className="grid grid-cols-[minmax(0,1fr)_118px] border-b-2 border-slate-line bg-slate-strip">
              <div className="flex items-center px-5 py-col-y">
                <p className="hw-col-header font-bold tracking-tight text-ink">
                  ITEM NAME
                </p>
              </div>
              <div className="flex items-center border-l-2 border-slate-line px-5 py-col-y">
                <p className="hw-col-header font-bold tracking-tight text-ink">
                  ITEM
                </p>
              </div>
            </div>

            {isEmpty ?
              <div className="grid place-items-center px-6 py-12 text-center text-sm text-ink-mute">
                Your cart is empty.
                <br />
                Add items from the catalog to get started.
              </div>
            : <div className="max-h-[440px] divide-y-2 divide-slate-line overflow-y-auto">
                {rows.map(({ itemId, qty, item }) => {
                  // Remaining stock, not this row's quantity: the two are separate
                  // axes, so '+' is capped on stock running out rather than on
                  // qty reaching it (matches CatalogPage).
                  const available =
                    item.currentQuantity ?? item.initialQuantity;
                  return (
                    <div
                      key={itemId}
                      className="grid grid-cols-[minmax(0,1fr)_118px] items-center"
                    >
                      <div className="flex min-h-row items-center justify-between gap-3 px-6 py-4">
                        <p className="hw-truncate hw-cell-text text-ink">
                          {item.name}
                        </p>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            disabled={!isReserved || qty === 0 || isMutating}
                            onClick={() => handleDecrement(itemId)}
                            className="grid h-7 w-7 place-items-center rounded-md border border-brand text-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Remove one ${item.name} from cart`}
                          >
                            <MinusIcon />
                          </button>
                          <span className="w-5 text-center hw-cell-text text-brand">
                            {qty}
                          </span>
                          <button
                            type="button"
                            disabled={
                              !isReserved || available === 0 || isMutating
                            }
                            onClick={() => handleIncrement(itemId)}
                            className="grid h-7 w-7 place-items-center rounded-md border border-brand text-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Add one ${item.name} to cart`}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                      </div>
                      <div className="flex min-h-row items-center justify-center border-l-2 border-slate-line">
                        <ItemThumb item={item} />
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          </div>

          {actionError && (
            <div className="mt-3 rounded-md bg-hw-red-50 p-3 text-sm text-hw-red-700">
              {actionError instanceof HttpError ?
                actionError.message
              : 'Something went wrong. Please try again.'}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isReserved || isMutating}
              className="btn-danger-outline"
            >
              {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel Cart'}
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!canCheckout || isMutating}
              className="btn-brand"
            >
              {checkoutMutation.isLoading ? 'Submitting...' : 'Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
