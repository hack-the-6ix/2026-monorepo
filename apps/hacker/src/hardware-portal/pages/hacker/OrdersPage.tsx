'use client';

import { useState } from 'react';
import Link from 'next/link';

import { HttpError } from '../../api/client';
import { userApi } from '../../api/user.api';
import { Spinner } from '../../components/Spinner';
import { StatusBadge } from '../../components/StatusBadge';
import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import { portalViewHref } from '../../lib/permissions';
import type { Order } from '../../types';

const VISIBLE_STATES = ['PENDING', 'READY', 'PICKED_UP', 'RETURNED'] as const;

function formatCheckedOutTimestamp(iso: string) {
  const d = new Date(iso);
  const dateLine = d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const timeLine = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return { dateLine, timeLine };
}

function TimestampCell({ iso }: { iso: string }) {
  const { dateLine, timeLine } = formatCheckedOutTimestamp(iso);
  return (
    <div className="hw-cell-text leading-5 text-ink">
      <p className="whitespace-nowrap">{dateLine}</p>
      <p className="whitespace-nowrap">{timeLine}</p>
    </div>
  );
}

interface CheckedOutCellProps {
  order: Order;
  onCancel: (orderId: number) => void;
  isCancelling: boolean;
}

function CheckedOutCell({
  order,
  onCancel,
  isCancelling,
}: CheckedOutCellProps) {
  if (order.state === 'PENDING' || order.state === 'READY') {
    return (
      <button
        type="button"
        onClick={() => onCancel(order.id)}
        disabled={isCancelling}
        className="btn-danger-outline whitespace-nowrap"
      >
        {isCancelling ? 'Cancelling...' : 'Cancel Order'}
      </button>
    );
  }
  if (order.state === 'PICKED_UP') {
    return order.pickedUpAt ?
        <TimestampCell iso={order.pickedUpAt} />
      : <span className="text-sm text-ink-mute">—</span>;
  }
  if (order.state === 'RETURNED') {
    return order.updatedAt ?
        <TimestampCell iso={order.updatedAt} />
      : <span className="text-sm text-ink-mute">—</span>;
  }
  return <span className="text-sm text-ink-mute">—</span>;
}

export function OrdersPage() {
  const {
    data: pastOrders,
    isLoading,
    error,
    refetch,
  } = useQuery('user-past-orders', userApi.getPastOrders);

  const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);

  const cancelMutation = useMutation(
    (orderId: number) => userApi.cancelOrder(orderId),
    { invalidateKeys: [/^user-/] },
  );

  const visibleOrders: Order[] = (pastOrders ?? []).filter((o) =>
    (VISIBLE_STATES as readonly string[]).includes(o.state),
  );

  const confirmCancel = async () => {
    if (cancelOrderId == null) return;
    try {
      await cancelMutation.mutate(cancelOrderId);
    } catch {
      // surfaced via mutation error state
    } finally {
      setCancelOrderId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-hw-red-50 p-4 text-center text-hw-red-700">
        Failed to load orders.
        <button
          onClick={refetch}
          className="ml-2 font-medium underline hover:text-hw-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="card-panel">
      <div className="border-b-2 border-slate-line py-7">
        <h1 className="text-center text-page-title font-bold text-brand">
          My Orders
        </h1>
      </div>

      {cancelMutation.error && (
        <div className="border-b-2 border-slate-line bg-hw-red-50 px-7 py-3 text-sm text-hw-red-700">
          {cancelMutation.error instanceof HttpError ?
            cancelMutation.error.message
          : 'Failed to cancel order. Please try again.'}
        </div>
      )}

      {visibleOrders.length === 0 ?
        <div className="px-7 py-16 text-center">
          <p className="text-ink">You haven&apos;t placed any orders yet.</p>
          <Link
            href={portalViewHref('catalog')}
            className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Browse the catalog to add items to your cart
          </Link>
        </div>
      : <div className="overflow-x-auto">
          <table className="w-full min-w-[740px] table-fixed border-collapse">
            <thead className="bg-slate-soft">
              <tr className="border-b-2 border-slate-line">
                <th className="w-[16%] border-r-2 border-slate-line px-7 py-col-y text-left hw-col-header font-bold tracking-tight text-ink">
                  ORDER NUMBER
                </th>
                <th className="w-[40%] border-r-2 border-slate-line px-5 py-col-y text-center hw-col-header font-bold tracking-tight text-ink">
                  ITEMS
                </th>
                <th className="w-[18%] border-r-2 border-slate-line px-7 py-col-y text-left hw-col-header font-bold tracking-tight text-ink">
                  ORDER STATUS
                </th>
                <th className="w-[190px] px-7 py-col-y text-left hw-col-header font-bold tracking-tight text-ink">
                  CHECKED OUT
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b-2 border-slate-line last:border-b-0"
                >
                  <td className="hw-cell-text border-r-2 border-slate-line px-7 align-middle text-ink">
                    #{order.orderNumber ?? order.id}
                  </td>
                  <td className="border-r-2 border-slate-line py-3 align-top">
                    {order.orderItems.map((oi, idx) => (
                      <div
                        key={oi.id}
                        className={`flex items-center justify-between px-7 py-2 ${
                          idx % 2 === 1 ? 'bg-slate-soft' : 'bg-white'
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {oi.item.imageUrl ?
                            <img
                              src={oi.item.imageUrl}
                              alt={oi.item.name}
                              className="h-9 w-9 flex-shrink-0 rounded-md object-cover"
                            />
                          : <div className="h-9 w-9 flex-shrink-0 rounded-md bg-slate-line" />
                          }
                          <span className="hw-wrap hw-cell-text font-medium text-ink">
                            {oi.item.name}
                          </span>
                        </div>
                        <span className="hw-cell-text ml-3 flex-shrink-0 text-ink-soft">
                          Units: {oi.quantity}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="whitespace-nowrap border-r-2 border-slate-line px-4 align-middle">
                    <StatusBadge status={order.state} />
                  </td>
                  <td className="px-7 align-middle">
                    <CheckedOutCell
                      order={order}
                      onCancel={setCancelOrderId}
                      isCancelling={cancelMutation.isLoading}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      {cancelOrderId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-card bg-white p-8 shadow-xl">
            <h2 className="mb-2 text-page-title font-semibold text-ink">
              Cancel this order?
            </h2>
            <p className="mb-6 text-body text-ink-soft">
              Are you sure you want to cancel this order? This can&apos;t be
              undone.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setCancelOrderId(null);
                  cancelMutation.reset();
                }}
                disabled={cancelMutation.isLoading}
                className="btn-brand-outline disabled:opacity-50"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancel}
                disabled={cancelMutation.isLoading}
                className="btn-danger disabled:opacity-50"
              >
                {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
