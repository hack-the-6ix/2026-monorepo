'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { adminApi } from '../../api/admin.api';
import { HttpError } from '../../api/client';
import { Spinner } from '../../components/Spinner';
import { useHardwareAuth } from '../../hooks/useHardwareAuth';
import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import type { Order, OrderState } from '../../types';

// ── Types ────────────────────────────────────────────────────────────────────

type SortCol = 'email' | 'items' | 'status' | 'timestamp';
type SortDir = 'asc' | 'desc';

const ALL_STATES: OrderState[] = [
  'PENDING',
  'READY',
  'PICKED_UP',
  'RESERVED',
  'RETURNED',
  'CANCELLED',
];

const COLUMN_DEFS: { key: SortCol | null; label: string }[] = [
  { key: 'email', label: 'HACKER EMAIL' },
  { key: 'items', label: 'ITEMS' },
  { key: 'status', label: 'STATUS' },
  { key: 'timestamp', label: 'TIMESTAMPS' },
  { key: null, label: 'ACTIONS' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const placedFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

function formatTimestamp(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  return placedFormatter.format(new Date(dateStr));
}

type StatusInfo = {
  label: string;
  isComplete: boolean;
  isTerminal: boolean;
  priority: number;
  // Mirrors the hue used for this state's badge on the hacker Orders page
  // (StatusBadge.tsx), so the two views read consistently.
  colorClassName: string;
};

function statusInfo(state: OrderState): StatusInfo {
  switch (state) {
    case 'PENDING':
      return {
        label: 'REQUESTED',
        isComplete: false,
        isTerminal: false,
        priority: 0,
        colorClassName: 'text-hw-orange-800',
      };
    case 'READY':
      return {
        label: 'PENDING...',
        isComplete: false,
        isTerminal: false,
        priority: 1,
        colorClassName: 'text-hw-blue-800',
      };
    case 'PICKED_UP':
      return {
        label: 'CHECKED OUT',
        isComplete: true,
        isTerminal: false,
        priority: 2,
        colorClassName: 'text-hw-green-800',
      };
    case 'RESERVED':
      return {
        label: 'RESERVED',
        isComplete: false,
        isTerminal: true,
        priority: 3,
        colorClassName: 'text-yellow-800',
      };
    case 'RETURNED':
      return {
        label: 'RETURNED',
        isComplete: false,
        isTerminal: true,
        priority: 4,
        colorClassName: 'text-hw-gray-800',
      };
    case 'CANCELLED':
      return {
        label: 'CANCELLED',
        isComplete: false,
        isTerminal: true,
        priority: 5,
        colorClassName: 'text-hw-red-800',
      };
    default:
      return {
        label: state,
        isComplete: false,
        isTerminal: true,
        priority: 6,
        colorClassName: 'text-ink',
      };
  }
}

function orderItemCount(order: Order): number {
  return order.orderItems.reduce((s, oi) => s + oi.quantity, 0);
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon({
  className = 'h-5 w-5 flex-shrink-0 text-ink-mute',
}: {
  className?: string;
}) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 flex-shrink-0 text-ink-soft"
      aria-hidden
    >
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11H7V9h10v2zm-3 4H7v-2h7v2zm3-6H7V7h10v2z" />
    </svg>
  );
}

function SortIndicator({
  col,
  activeCol,
  dir,
}: {
  col: SortCol;
  activeCol: SortCol;
  dir: SortDir;
}) {
  const isActive = col === activeCol;

  if (!isActive) {
    return (
      <svg
        viewBox="0 0 8 13"
        className="h-3.5 w-2.5 flex-shrink-0 text-ink-mute"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4 0 L8 5 L0 5 Z" />
        <path d="M4 13 L8 8 L0 8 Z" />
      </svg>
    );
  }
  if (dir === 'asc') {
    return (
      <svg
        viewBox="0 0 8 6"
        className="h-2.5 w-2.5 flex-shrink-0 text-brand"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4 0 L8 6 L0 6 Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 8 6"
      className="h-2.5 w-2.5 flex-shrink-0 text-brand"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 6 L8 0 L0 0 Z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SummaryPage() {
  const [page, setPage] = useState(1);
  const limit = 100;

  // search + filter
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState<Set<OrderState>>(
    new Set(ALL_STATES),
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // sort
  const [sortCol, setSortCol] = useState<SortCol>('status');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  // modals
  const [cancelModal, setCancelModal] = useState<Order | null>(null);

  // Fulfilment (change status / pickup) is admin-only on the backend
  // (requireAdmin); staff (sponsors, READADMIN) get a read-only summary.
  const { role } = useHardwareAuth();
  const canManage = role === 'admin';

  // ── Data ────────────────────────────────────────────────────────────────────

  const { data, isLoading, error, refetch } = useQuery(
    `admin-all-orders-${page}`,
    () => adminApi.getAllOrdersPaginated(page, limit),
  );

  const statusMutation = useMutation(
    ({ orderId, newState }: { orderId: number; newState: OrderState }) =>
      adminApi.changeOrderStatus(orderId, newState),
    { invalidateKeys: [/^admin-all-orders/], onSuccess: () => refetch() },
  );

  const pickupMutation = useMutation(
    ({ orderId }: { orderId: number }) => adminApi.orderPickedUp(orderId),
    { invalidateKeys: [/^admin-all-orders/], onSuccess: () => refetch() },
  );

  // ── Close filter popover on outside click ───────────────────────────────────

  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  // ── Derived list ─────────────────────────────────────────────────────────────

  const orders = useMemo(() => {
    if (!data?.orders) return [];

    return data.orders
      .filter((o) => stateFilter.has(o.state as OrderState))
      .filter((o) => {
        if (!searchQuery.trim()) return true;
        return (o.initiator?.email ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        let cmp = 0;
        switch (sortCol) {
          case 'email':
            cmp = (a.initiator?.email ?? '').localeCompare(
              b.initiator?.email ?? '',
            );
            break;
          case 'items':
            cmp = orderItemCount(a) - orderItemCount(b);
            break;
          case 'status':
            cmp =
              statusInfo(a.state as OrderState).priority -
              statusInfo(b.state as OrderState).priority;
            break;
          case 'timestamp':
            cmp =
              new Date(a.createdAt ?? 0).getTime() -
              new Date(b.createdAt ?? 0).getTime();
            break;
        }
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [data, searchQuery, stateFilter, sortCol, sortDir]);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const filterIsActive = stateFilter.size < ALL_STATES.length;

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleSortClick = (col: SortCol) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const toggleState = (state: OrderState) => {
    setStateFilter((prev) => {
      const next = new Set(prev);
      if (next.has(state)) {
        if (next.size === 1) return prev; // always keep at least one
        next.delete(state);
      } else {
        next.add(state);
      }
      return next;
    });
  };

  const handleReadyForPickup = async (order: Order) => {
    try {
      if (order.state === 'PENDING') {
        await statusMutation.mutate({ orderId: order.id, newState: 'READY' });
      } else if (order.state === 'READY') {
        await pickupMutation.mutate({ orderId: order.id });
      }
    } catch {
      // surfaced via mutation error state
    }
  };

  const handleMarkReturned = async (order: Order) => {
    try {
      await statusMutation.mutate({ orderId: order.id, newState: 'RETURNED' });
    } catch {
      // surfaced via mutation error state
    }
  };

  const handleCancel = async (order: Order) => {
    try {
      await statusMutation.mutate({ orderId: order.id, newState: 'CANCELLED' });
    } catch {
      // surfaced via mutation error state
    } finally {
      setCancelModal(null);
    }
  };

  // ── Early returns ─────────────────────────────────────────────────────────────

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
        Failed to load summary.
        <button
          onClick={() => refetch()}
          className="ml-2 font-medium underline hover:text-hw-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-8">
      {/* Page heading */}
      <div className="text-center">
        <h1 className="text-[2rem] font-semibold leading-10 text-ink">
          Summary Page
        </h1>
        <p className="mt-1 text-body text-ink-soft">
          An overview of what each hacker has requested/checked out.
        </p>
      </div>

      {/* Error banner */}
      {statusMutation.error && (
        <div className="rounded-lg bg-hw-red-50 p-3 text-body text-hw-red-700">
          {statusMutation.error instanceof HttpError ?
            statusMutation.error.message
          : 'Failed to update order status.'}
        </div>
      )}

      {/* Main card */}
      <div className="card-panel">
        {/* Search + filter toolbar */}
        <div className="flex items-center gap-3 bg-white p-5">
          <div className="relative max-w-[520px] flex-1">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-line bg-white py-2.5 pl-12 pr-4 text-sm text-ink placeholder:text-ink-mute focus:border-brand focus:outline-none"
            />
          </div>

          {/* Filter button + popover */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((o) => !o)}
              title="Filter by status"
              className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-lg border-2 transition-colors ${
                filterIsActive ?
                  'border-brand bg-[#f2fbf8] text-brand'
                : 'border-slate-line text-ink-soft hover:border-brand hover:text-brand'
              }`}
            >
              {/* funnel icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden
              >
                <line x1="3" y1="5" x2="21" y2="5" />
                <line x1="6" y1="10" x2="18" y2="10" />
                <line x1="9" y1="15" x2="15" y2="15" />
                <line x1="11" y1="20" x2="13" y2="20" />
              </svg>
            </button>

            {filterOpen && (
              <div className="absolute left-0 top-12 z-20 w-52 rounded-xl border-2 border-slate-line bg-white py-3 shadow-lg">
                <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wide text-ink-mute">
                  Filter by status
                </p>
                {ALL_STATES.map((state) => {
                  const { label } = statusInfo(state);
                  const checked = stateFilter.has(state);
                  return (
                    <label
                      key={state}
                      className="flex cursor-pointer items-center gap-3 px-4 py-2 text-body text-ink hover:bg-slate-soft"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleState(state)}
                        className="h-4 w-4 accent-brand"
                      />
                      {label}
                    </label>
                  );
                })}
                <div className="mt-2 border-t border-slate-line pt-2 px-4">
                  <button
                    onClick={() => setStateFilter(new Set(ALL_STATES))}
                    className="text-xs text-brand hover:underline"
                  >
                    Reset to all
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] table-fixed border-collapse [&_td:first-child]:border-l-0 [&_td:last-child]:border-r-0 [&_th:first-child]:border-l-0 [&_th:last-child]:border-r-0">
            <colgroup>
              <col style={{ width: '18%' }} />
              <col style={{ width: '28%' }} />
              <col style={{ width: '16%' }} />
              {/* Fixed px (not %) so the header label + sort icon never
                  shrink below their content width, regardless of table
                  width — a table-fixed percentage column has no per-column
                  minimum, which previously let this bleed into ACTIONS. */}
              <col style={{ width: '210px' }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                {COLUMN_DEFS.map(({ key, label }) => (
                  <th
                    key={label}
                    onClick={key ? () => handleSortClick(key) : undefined}
                    className={`hw-col-header border-2 border-slate-line bg-slate-soft px-7 py-col-y text-left font-bold text-ink ${
                      key ?
                        'cursor-pointer select-none hover:bg-slate-line'
                      : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {label}
                      {key && (
                        <SortIndicator
                          col={key}
                          activeCol={sortCol}
                          dir={sortDir}
                        />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ?
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-body text-ink-mute"
                  >
                    {searchQuery || filterIsActive ?
                      'No orders match your filters.'
                    : 'No orders yet.'}
                  </td>
                </tr>
              : orders.map((order) => {
                  const email = order.initiator?.email ?? 'Unknown';
                  const { label, isComplete, isTerminal, colorClassName } =
                    statusInfo(order.state as OrderState);
                  const isMutating =
                    statusMutation.isLoading || pickupMutation.isLoading;

                  return (
                    <tr key={order.id}>
                      {/* HACKER NAME */}
                      <td className="border-2 border-slate-line px-7 py-5 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <span className="hw-cell-text break-all font-semibold text-ink">
                            {email}
                          </span>
                          {order.notes && <NotesIcon />}
                        </div>
                      </td>

                      {/* ITEMS */}
                      <td className="border-2 border-slate-line py-3 align-top">
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

                      {/* STATUS */}
                      <td className="border-2 border-slate-line px-7 py-5 align-top">
                        <span
                          className={`hw-cell-text font-semibold ${colorClassName}`}
                        >
                          {label}
                        </span>
                      </td>

                      {/* TIMESTAMPS */}
                      <td className="border-2 border-slate-line px-7 py-5 align-top">
                        <div className="hw-cell-text flex flex-col gap-3 text-ink">
                          <p>
                            <span className="font-semibold">
                              ORDER PLACED:{' '}
                            </span>
                            {formatTimestamp(order.createdAt)}
                          </p>
                          {isComplete && (
                            <p>
                              <span className="font-semibold">
                                CHECKED OUT:{' '}
                              </span>
                              {formatTimestamp(order.pickedUpAt)}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="border-2 border-slate-line px-7 py-5 align-top">
                        <div className="flex flex-col items-stretch gap-3">
                          {!canManage ?
                            null
                          : isTerminal ?
                            null
                          : isComplete ?
                            <button
                              onClick={() => handleMarkReturned(order)}
                              disabled={isMutating}
                              className="rounded-lg border-2 border-slate-line bg-slate-soft px-3 py-3 hw-cell-text font-medium text-center break-words leading-tight text-ink hover:bg-slate-line disabled:opacity-50"
                            >
                              Mark Returned
                            </button>
                          : <>
                              <button
                                onClick={() => handleReadyForPickup(order)}
                                disabled={isMutating}
                                className="rounded-lg border-2 border-[#72d6be] bg-[#f2fbf8] px-3 py-3 hw-cell-text font-medium text-center break-words leading-tight text-[#208170] hover:bg-[#e0f6f1] disabled:opacity-50"
                              >
                                {order.state === 'READY' ?
                                  'Mark Picked Up'
                                : 'Mark Ready'}
                              </button>
                              <button
                                onClick={() => setCancelModal(order)}
                                disabled={isMutating}
                                className="rounded-lg border-2 border-[#ffa2a2] bg-[#fef2f2] px-3 py-3 hw-cell-text font-medium text-center break-words leading-tight text-[#e7000b] hover:bg-hw-red-100 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </>
                          }
                        </div>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-4 border-t-2 border-slate-line px-8 py-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-7 w-7 items-center justify-center rounded text-lg text-ink-mute hover:text-ink disabled:opacity-30"
            >
              ‹
            </button>
            <span className="text-body text-ink-soft">
              Page{' '}
              <span className="font-medium text-ink underline">{page}</span> of{' '}
              {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-7 w-7 items-center justify-center rounded text-lg text-ink-mute hover:text-ink disabled:opacity-30"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Cancel order confirmation modal */}
      {canManage && cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-card bg-white p-8 shadow-xl">
            <h2 className="mb-2 text-page-title font-semibold text-ink">
              Cancel this order?
            </h2>
            <p className="mb-6 text-body text-ink-soft">
              Are you sure you want to delete this order? Only do this if the
              order cannot be fulfilled due to quantity changes or if the user
              who placed the order requests cancellation.
            </p>

            {statusMutation.error && (
              <div className="mb-4 rounded-lg bg-hw-red-50 p-3 text-body text-hw-red-700">
                {statusMutation.error instanceof HttpError ?
                  statusMutation.error.message
                : 'Failed to cancel order.'}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setCancelModal(null);
                  statusMutation.reset();
                }}
                disabled={statusMutation.isLoading}
                className="btn-brand-outline disabled:opacity-50"
              >
                Go Back
              </button>
              <button
                onClick={() => handleCancel(cancelModal)}
                disabled={statusMutation.isLoading}
                className="btn-danger disabled:opacity-50"
              >
                {statusMutation.isLoading ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
