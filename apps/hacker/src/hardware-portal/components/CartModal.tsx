'use client';

import { useEffect } from 'react';

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
  const { selected, setQuantity, remove, isOpen, close } = useCart();

  const { data: items } = useQuery('user-items', userApi.getItems);
  const { data: currentOrder, refetch: refetchCurrentOrder } = useQuery(
    'user-current-order',
    userApi.getCurrentOrder,
  );

  const cartCountdown = useCartCountdown(
    currentOrder?.state === 'RESERVED' ? currentOrder.createdAt : null,
  );
  const hasReservedCart =
    currentOrder?.state === 'RESERVED' && cartCountdown !== 'Expired';

  useEffect(() => {
    if (cartCountdown === 'Expired') refetchCurrentOrder();
  }, [cartCountdown, refetchCurrentOrder]);

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

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const itemsById = new Map<number, Item>(
    (items ?? []).map((it) => [it.id, it]),
  );

  const localRows = Array.from(selected.entries()).map(([itemId, qty]) => ({
    itemId,
    qty,
    item: itemsById.get(itemId),
  }));

  const reservedRows =
    hasReservedCart && currentOrder ?
      currentOrder.orderItems.map((oi) => ({
        itemId: oi.itemId,
        qty: oi.quantity,
        item: oi.item,
      }))
    : [];

  const rows = hasReservedCart ? reservedRows : localRows;
  const isEmpty = rows.length === 0;

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

  const checkoutError = checkoutMutation.error;
  const cancelError = cancelMutation.error;

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

          {hasReservedCart && cartCountdown && (
            <p className="mt-1 text-center text-sm text-amber-600">
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
                  const max =
                    item?.availableQuantity ?? item?.initialQuantity ?? qty;
                  return (
                    <div
                      key={itemId}
                      className="grid grid-cols-[minmax(0,1fr)_118px] items-center"
                    >
                      <div className="flex min-h-row items-center justify-between gap-3 px-6 py-4">
                        <p className="hw-truncate hw-cell-text text-ink">
                          {item?.name ?? `Item #${itemId}`}
                        </p>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            disabled={hasReservedCart}
                            onClick={() =>
                              qty <= 1 ?
                                remove(itemId)
                              : setQuantity(itemId, qty - 1, max)
                            }
                            className="grid h-7 w-7 place-items-center rounded-md border border-brand text-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon />
                          </button>
                          <span className="w-5 text-center hw-cell-text text-brand">
                            {qty}
                          </span>
                          <button
                            type="button"
                            disabled={hasReservedCart || qty >= max}
                            onClick={() => setQuantity(itemId, qty + 1, max)}
                            className="grid h-7 w-7 place-items-center rounded-md border border-brand text-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Increase quantity"
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

          {(checkoutError || cancelError) && (
            <div className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {(checkoutError || cancelError) instanceof HttpError ?
                (checkoutError || cancelError)!.message
              : 'Something went wrong. Please try again.'}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={
                !hasReservedCart ||
                cancelMutation.isLoading ||
                checkoutMutation.isLoading
              }
              className="btn-danger-outline"
            >
              {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel Cart'}
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={
                !hasReservedCart ||
                checkoutMutation.isLoading ||
                cancelMutation.isLoading
              }
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
