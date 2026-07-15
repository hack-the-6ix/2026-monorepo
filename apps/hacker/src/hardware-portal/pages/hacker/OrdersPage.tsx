'use client';

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
    <div className="text-body leading-5 text-ink">
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
        className="btn-danger-outline"
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

  const cancelMutation = useMutation(
    (orderId: number) => userApi.cancelOrder(orderId),
    { invalidateKeys: [/^user-/] },
  );

  const visibleOrders: Order[] = (pastOrders ?? []).filter((o) =>
    (VISIBLE_STATES as readonly string[]).includes(o.state),
  );

  const handleCancel = async (orderId: number) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    try {
      await cancelMutation.mutate(orderId);
    } catch {
      // surfaced via mutation error state
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
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-700">
        Failed to load orders.
        <button
          onClick={refetch}
          className="ml-2 font-medium underline hover:text-red-800"
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
        <div className="border-b-2 border-slate-line bg-red-50 px-7 py-3 text-sm text-red-700">
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
      : <table className="w-full table-fixed border-collapse">
          <thead className="bg-slate-soft">
            <tr className="border-b-2 border-slate-line">
              <th className="w-[16%] border-r-2 border-slate-line px-7 py-col-y text-left text-table-header font-bold tracking-tight text-ink">
                ORDER NUMBER
              </th>
              <th className="w-[40%] border-r-2 border-slate-line px-5 py-col-y text-center text-table-header font-bold tracking-tight text-ink">
                ITEMS
              </th>
              <th className="w-[18%] border-r-2 border-slate-line px-7 py-col-y text-left text-table-header font-bold tracking-tight text-ink">
                ORDER STATUS
              </th>
              <th className="w-[21%] px-7 py-col-y text-left text-table-header font-bold tracking-tight text-ink">
                CHECKED OUT
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) =>
              order.orderItems.map((oi, idx) => (
                <tr
                  key={oi.id}
                  className="border-b-2 border-slate-line last:border-b-0"
                >
                  {idx === 0 && (
                    <td
                      rowSpan={order.orderItems.length}
                      className="border-r-2 border-slate-line px-7 align-middle text-body text-ink"
                    >
                      #{order.orderNumber ?? order.id}
                    </td>
                  )}
                  <td className="h-row border-r-2 border-slate-line px-7 align-middle text-body text-ink">
                    {oi.item.name}
                    {oi.quantity > 1 ? ` ×${oi.quantity}` : ''}
                  </td>
                  <td className="whitespace-nowrap border-r-2 border-slate-line px-4 align-middle">
                    <StatusBadge status={order.state} />
                  </td>
                  <td className="px-7 align-middle">
                    <CheckedOutCell
                      order={order}
                      onCancel={handleCancel}
                      isCancelling={cancelMutation.isLoading}
                    />
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      }
    </section>
  );
}
