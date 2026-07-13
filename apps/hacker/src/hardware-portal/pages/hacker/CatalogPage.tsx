'use client';

import { useMemo, useState } from 'react';

import { userApi } from '../../api/user.api';
import { Spinner } from '../../components/Spinner';
import { useCartCountdown } from '../../hooks/useCartCountdown';
import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import type { Item } from '../../types';

type SortOption = 'name' | 'quantity-asc' | 'quantity-desc';

interface AvailabilityFilters {
  available: boolean;
  notAvailable: boolean;
}

function SearchIcon({ className = 'h-5 w-5' }: { className?: string }) {
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

function ItemThumb({ item, size = 100 }: { item: Item; size?: number }) {
  if (item.imageUrl) {
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

interface FiltersSidebarProps {
  filters: AvailabilityFilters;
  onChange: (next: AvailabilityFilters) => void;
}

interface FilterCheckboxProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

function FilterCheckbox({ checked, label, onToggle }: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-body text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="peer sr-only"
      />
      <span
        className={`grid h-[18px] w-[18px] place-items-center rounded-checkbox border border-ink transition-colors ${
          checked ? 'bg-brand' : 'bg-white'
        }`}
        aria-hidden
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="m5 12 4 4 10-10" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

function FiltersSidebar({ filters, onChange }: FiltersSidebarProps) {
  return (
    <aside className="sticky top-header-bar w-sidebar shrink-0 self-start card-panel">
      <div className="border-b-2 border-slate-line bg-slate-soft px-7 py-6">
        <h2 className="text-table-header font-bold tracking-tight text-ink">
          FILTERS
        </h2>
      </div>

      <div className="px-7 py-6">
        <p className="mb-3 text-body font-bold text-ink">AVAILABLE</p>
        <div className="flex flex-col gap-2">
          <FilterCheckbox
            checked={filters.available}
            label="Available"
            onToggle={() =>
              onChange({ ...filters, available: !filters.available })
            }
          />
          <FilterCheckbox
            checked={filters.notAvailable}
            label="Not Available"
            onToggle={() =>
              onChange({ ...filters, notAvailable: !filters.notAvailable })
            }
          />
        </div>
      </div>
    </aside>
  );
}

export function CatalogPage() {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery('user-items', userApi.getItems);
  const { data: currentOrder } = useQuery(
    'user-current-order',
    userApi.getCurrentOrder,
  );
  const cartCountdown = useCartCountdown(
    currentOrder?.state === 'RESERVED' ? currentOrder.createdAt : null,
  );
  const hasReservedCart =
    currentOrder?.state === 'RESERVED' && cartCountdown !== 'Expired';

  const cartQtyMap = useMemo(
    () =>
      new Map(
        hasReservedCart ?
          (currentOrder?.orderItems.map((oi) => [oi.itemId, oi.quantity]) ?? [])
        : [],
      ),
    [hasReservedCart, currentOrder?.orderItems],
  );

  const reserveMutation = useMutation(
    (payload: { itemId: number; quantity: number }[]) =>
      userApi.reserveOrder(payload),
    { invalidateKeys: [/^user-/] },
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

  const handleAddToCart = async (itemId: number) => {
    try {
      if (hasReservedCart) {
        await addToReservationMutation.mutate({ itemId, quantity: 1 });
      } else {
        await reserveMutation.mutate([{ itemId, quantity: 1 }]);
      }
    } catch {
      // errors surfaced via mutation state
    }
  };

  const handleRemoveFromCart = async (itemId: number) => {
    try {
      await removeFromReservationMutation.mutate({ itemId, quantity: 1 });
    } catch {
      // errors surfaced via mutation state
    }
  };

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('name');
  const [filters, setFilters] = useState<AvailabilityFilters>({
    available: true,
    notAvailable: true,
  });

  const filteredItems = useMemo(() => {
    if (!items) return [];

    let result = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    const both = filters.available && filters.notAvailable;
    const neither = !filters.available && !filters.notAvailable;
    if (!both && !neither) {
      result = result.filter((item) => {
        const avail = item.availableQuantity ?? item.initialQuantity;
        const isAvailable = avail > 0;
        return filters.available ? isAvailable : !isAvailable;
      });
    }

    switch (sort) {
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'quantity-asc':
        result = [...result].sort(
          (a, b) =>
            (a.availableQuantity ?? a.initialQuantity) -
            (b.availableQuantity ?? b.initialQuantity),
        );
        break;
      case 'quantity-desc':
        result = [...result].sort(
          (a, b) =>
            (b.availableQuantity ?? b.initialQuantity) -
            (a.availableQuantity ?? a.initialQuantity),
        );
        break;
    }

    return result;
  }, [items, search, sort, filters]);

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
        Failed to load items. Please try again.
      </div>
    );
  }

  return (
    <div className="flex items-start gap-6">
      <FiltersSidebar filters={filters} onChange={setFilters} />

      <section className="min-w-0 flex-1 [overflow:clip] rounded-card border-2 border-slate-line bg-white">
        <div className="sticky top-header-bar z-10">
          <div className="flex flex-col gap-3 border-b-2 border-slate-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-[520px]">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-line bg-white py-2.5 pl-12 pr-4 text-sm text-ink placeholder:text-ink-mute focus:border-brand focus:outline-none"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border-2 border-slate-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none"
            >
              <option value="name">Sort: Name</option>
              <option value="quantity-desc">Sort: Stock High to Low</option>
              <option value="quantity-asc">Sort: Stock Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_150px_150px_140px] border-b-2 border-slate-line bg-slate-soft">
            <div className="flex items-center px-7 py-col-y">
              <p className="text-table-header font-bold tracking-tight text-ink">
                ITEM NAME
              </p>
            </div>
            <div className="flex items-center justify-center border-l-2 border-slate-line px-4 py-col-y">
              <p className="text-table-header font-bold tracking-tight text-ink">
                ITEM
              </p>
            </div>
            <div className="flex items-center border-l-2 border-slate-line px-7 py-col-y">
              <p className="text-table-header font-bold tracking-tight text-ink">
                AVAILABLE
              </p>
            </div>
            <div className="flex items-center justify-center border-l-2 border-slate-line px-4 py-col-y">
              <p className="text-table-header font-bold tracking-tight text-ink">
                ADD TO CART
              </p>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ?
          <div className="px-7 py-12 text-center text-sm text-ink-mute">
            {search ? 'No items match your search.' : 'No items available.'}
          </div>
        : <div className="divide-y-2 divide-slate-line">
            {filteredItems.map((item) => {
              const available = item.availableQuantity ?? item.initialQuantity;
              const total = item.initialQuantity;
              const isLoading =
                reserveMutation.isLoading ||
                addToReservationMutation.isLoading ||
                removeFromReservationMutation.isLoading;
              const cartQty = cartQtyMap.get(item.id) ?? 0;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[minmax(0,1fr)_150px_150px_140px]"
                >
                  <div className="flex h-row-item items-center px-7">
                    <p className="truncate text-body text-ink">{item.name}</p>
                  </div>
                  <div className="flex h-row-item items-center justify-center border-l-2 border-slate-line">
                    <ItemThumb item={item} />
                  </div>
                  <div className="flex h-row-item items-center border-l-2 border-slate-line px-7">
                    <p className="text-body text-ink">
                      {available}/{total}
                    </p>
                  </div>
                  <div className="flex h-row-item items-center justify-center gap-1.5 border-l-2 border-slate-line bg-slate-soft">
                    <button
                      type="button"
                      disabled={cartQty === 0 || isLoading}
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="grid h-7 w-7 place-items-center rounded-md border border-brand text-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Remove one ${item.name} from cart`}
                    >
                      <MinusIcon />
                    </button>
                    <span className="w-5 text-center text-body text-brand">
                      {cartQty}
                    </span>
                    <button
                      type="button"
                      disabled={available === 0 || isLoading}
                      onClick={() => handleAddToCart(item.id)}
                      className="grid h-7 w-7 place-items-center rounded-md border border-brand text-brand hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Add one ${item.name} to cart`}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </section>
    </div>
  );
}
