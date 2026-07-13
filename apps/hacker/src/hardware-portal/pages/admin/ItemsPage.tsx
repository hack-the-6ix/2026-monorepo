'use client';

import { useEffect, useMemo, useState } from 'react';

import { adminApi } from '../../api/admin.api';
import { HttpError } from '../../api/client';
import { Spinner } from '../../components/Spinner';
import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import type { Item } from '../../types';

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

interface ItemFormData {
  name: string;
  imageFile: File | null;
  initialQuantity: number;
}

interface ItemFormProps {
  title: string;
  data: ItemFormData;
  onChange: (data: ItemFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
  error: Error | null;
  submitLabel: string;
  existingImageUrl?: string | null;
}

function ItemForm({
  title,
  data,
  onChange,
  onSubmit,
  onCancel,
  isLoading,
  error,
  submitLabel,
  existingImageUrl,
}: ItemFormProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!data.imageFile) {
      setFilePreview(null);
      return;
    }
    const url = URL.createObjectURL(data.imageFile);
    setFilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [data.imageFile]);

  const previewSrc = filePreview ?? existingImageUrl ?? null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-card bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-page-title font-semibold text-ink">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="item-name"
              className="block text-body font-medium text-ink"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              required
              className="mt-1 block w-full rounded-lg border-2 border-slate-line px-3 py-2 text-body text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="item-image-file"
              className="block text-body font-medium text-ink"
            >
              Image{' '}
              <span className="text-ink-mute font-normal">(optional)</span>
            </label>
            {previewSrc && (
              <img
                src={previewSrc}
                alt="Preview"
                className="mt-2 h-20 w-20 rounded-full object-cover border-2 border-slate-line"
              />
            )}
            <input
              id="item-image-file"
              type="file"
              accept="image/*"
              onChange={(e) =>
                onChange({ ...data, imageFile: e.target.files?.[0] ?? null })
              }
              className="mt-2 block w-full text-body text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-slate-soft file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-ink hover:file:bg-slate-strip"
            />
            {existingImageUrl && !data.imageFile && (
              <p className="mt-1 text-xs text-ink-mute">
                Current image shown above. Select a new file to replace it.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="item-quantity"
              className="block text-body font-medium text-ink"
            >
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="item-quantity"
              type="number"
              min={0}
              value={data.initialQuantity}
              onChange={(e) =>
                onChange({ ...data, initialQuantity: Number(e.target.value) })
              }
              required
              className="mt-1 block w-full rounded-lg border-2 border-slate-line px-3 py-2 text-body text-ink focus:border-brand focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error instanceof HttpError ?
                error.message
              : 'Something went wrong. Please try again.'}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="rounded-lg border-2 border-slate-line px-5 py-2 text-body font-medium text-ink hover:bg-slate-strip disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !data.name.trim()}
              className="btn-brand"
            >
              {isLoading ? 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type SortOption = 'name-asc' | 'name-desc' | 'quantity-asc' | 'quantity-desc';

const EMPTY_FORM: ItemFormData = {
  name: '',
  imageFile: null,
  initialQuantity: 1,
};

export default function ItemsPage() {
  const {
    data: items,
    isLoading,
    error,
    refetch,
  } = useQuery('admin-items', adminApi.getItems);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('name-asc');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState<ItemFormData>(EMPTY_FORM);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editData, setEditData] = useState<ItemFormData>(EMPTY_FORM);

  const createMutation = useMutation(
    async (data: ItemFormData) => {
      let imageUrl: string | undefined;
      if (data.imageFile) {
        const result = await adminApi.uploadImage(data.imageFile);
        imageUrl = result.url;
      }
      return adminApi.createItem({
        name: data.name,
        imageUrl,
        initialQuantity: data.initialQuantity,
      });
    },
    {
      invalidateKeys: [/^admin-items/, /^user-items/],
      onSuccess: () => {
        setShowCreateModal(false);
        setCreateData(EMPTY_FORM);
        refetch();
      },
    },
  );

  const updateMutation = useMutation(
    async (
      data: ItemFormData & { id: number; existingImageUrl: string | null },
    ) => {
      let imageUrl: string | null | undefined;
      if (data.imageFile) {
        const result = await adminApi.uploadImage(data.imageFile);
        imageUrl = result.url;
      } else {
        imageUrl = data.existingImageUrl;
      }
      return adminApi.updateItem({
        id: data.id,
        name: data.name,
        imageUrl,
        initialQuantity: data.initialQuantity,
      });
    },
    {
      invalidateKeys: [/^admin-items/, /^user-items/],
      onSuccess: () => {
        setEditingItem(null);
        refetch();
      },
    },
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createData.name.trim()) return;
    try {
      await createMutation.mutate({
        ...createData,
        name: createData.name.trim(),
      });
    } catch {
      // error surfaced via mutation state
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editData.name.trim()) return;
    try {
      await updateMutation.mutate({
        ...editData,
        name: editData.name.trim(),
        id: editingItem.id,
        existingImageUrl: editingItem.imageUrl ?? null,
      });
    } catch {
      // error surfaced via mutation state
    }
  };

  const openEdit = (item: Item) => {
    setEditingItem(item);
    setEditData({
      name: item.name,
      imageFile: null,
      initialQuantity: item.initialQuantity,
    });
    updateMutation.reset();
  };

  const deleteMutation = useMutation((id: number) => adminApi.deleteItem(id), {
    invalidateKeys: [/^admin-items/, /^user-items/],
    onSuccess: () => {
      setConfirmDeleteId(null);
      refetch();
    },
  });

  const closeCreate = () => {
    setShowCreateModal(false);
    setCreateData(EMPTY_FORM);
    createMutation.reset();
  };

  const closeEdit = () => {
    setEditingItem(null);
    updateMutation.reset();
  };

  const filteredItems = useMemo(() => {
    if (!items) return [];
    let result = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
    switch (sort) {
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
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
  }, [items, search, sort]);

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
        Failed to load items.
        <button
          onClick={() => refetch()}
          className="ml-2 font-medium underline hover:text-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-[2rem] font-semibold leading-10 tracking-tight text-ink">
          Inventory
        </h1>
        <p className="mt-1 text-body text-ink">
          An overview of what each hacker has requested/checked out.
        </p>
      </div>

      <div className="card-panel">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b-2 border-slate-line bg-white p-5">
          <div className="relative max-w-[520px] flex-1">
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
            <option value="name-asc">Sort: Name A→Z</option>
            <option value="name-desc">Sort: Name Z→A</option>
            <option value="quantity-desc">Sort: Stock High to Low</option>
            <option value="quantity-asc">Sort: Stock Low to High</option>
          </select>
          <button
            type="button"
            onClick={() => {
              setCreateData(EMPTY_FORM);
              createMutation.reset();
              setShowCreateModal(true);
            }}
            className="btn-brand ml-auto"
          >
            + Add Item
          </button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[minmax(0,1fr)_150px_150px_180px] border-b-2 border-slate-line bg-slate-soft">
          <div className="flex items-center px-7 py-col-y">
            <p className="text-table-header font-bold tracking-tight text-ink">
              ITEM NAME
            </p>
          </div>
          <div className="flex items-center justify-center border-l-2 border-slate-line px-4 py-col-y">
            <p className="text-table-header font-bold tracking-tight text-ink">
              PHOTO
            </p>
          </div>
          <div className="flex items-center border-l-2 border-slate-line px-7 py-col-y">
            <p className="text-table-header font-bold tracking-tight text-ink">
              STOCK
            </p>
          </div>
          <div className="flex items-center justify-center border-l-2 border-slate-line px-4 py-col-y">
            <p className="text-table-header font-bold tracking-tight text-ink">
              ACTIONS
            </p>
          </div>
        </div>

        {/* Table body */}
        {filteredItems.length === 0 ?
          <div className="px-7 py-12 text-center text-body text-ink-mute">
            {search ?
              'No items match your search.'
            : 'No items in inventory. Add your first item!'}
          </div>
        : <div className="divide-y-2 divide-slate-line">
            {filteredItems.map((item) => {
              const available = item.availableQuantity ?? item.initialQuantity;
              const total = item.initialQuantity;
              const isOutOfStock = available === 0;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[minmax(0,1fr)_150px_150px_180px]"
                >
                  <div className="flex h-row-item items-center px-7">
                    <p className="truncate text-body text-ink">{item.name}</p>
                  </div>

                  <div className="flex h-row-item items-center justify-center border-l-2 border-slate-line">
                    <ItemThumb item={item} />
                  </div>

                  <div className="flex h-row-item items-center gap-1.5 border-l-2 border-slate-line px-7">
                    <span
                      className={`text-body ${isOutOfStock ? 'text-red-500' : 'text-ink'}`}
                    >
                      {available}/{total}
                    </span>
                    <span className="text-body text-ink-soft">units</span>
                  </div>

                  <div className="flex h-row-item flex-col items-center justify-center gap-2 border-l-2 border-slate-line bg-slate-soft px-6 py-4">
                    {confirmDeleteId === item.id ?
                      <>
                        <p className="text-xs font-medium text-red-600">
                          Delete permanently?
                        </p>
                        <div className="flex w-full gap-1.5">
                          <button
                            type="button"
                            onClick={() => deleteMutation.mutate(item.id)}
                            disabled={deleteMutation.isLoading}
                            className="flex-1 rounded-lg border-2 border-red-300 bg-red-50 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                          >
                            {deleteMutation.isLoading ? '...' : 'Confirm'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={deleteMutation.isLoading}
                            className="flex-1 rounded-lg border-2 border-slate-line bg-white py-1 text-xs font-medium text-ink hover:bg-slate-strip disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                        {deleteMutation.error && (
                          <p className="text-xs text-red-600">
                            {deleteMutation.error instanceof HttpError ?
                              deleteMutation.error.message
                            : 'Delete failed'}
                          </p>
                        )}
                      </>
                    : <>
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="w-full rounded-lg border-2 border-slate-line bg-white py-1 text-xs font-medium text-ink transition-colors hover:bg-slate-strip"
                        >
                          Edit Item
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteMutation.reset();
                            setConfirmDeleteId(item.id);
                          }}
                          className="w-full rounded-lg border-2 border-red-200 bg-white py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>

      {showCreateModal && (
        <ItemForm
          title="Add New Item"
          data={createData}
          onChange={setCreateData}
          onSubmit={handleCreate}
          onCancel={closeCreate}
          isLoading={createMutation.isLoading}
          error={createMutation.error}
          submitLabel="Create Item"
        />
      )}

      {editingItem && (
        <ItemForm
          title={`Edit: ${editingItem.name}`}
          data={editData}
          onChange={setEditData}
          onSubmit={handleUpdate}
          onCancel={closeEdit}
          isLoading={updateMutation.isLoading}
          error={updateMutation.error}
          submitLabel="Save Changes"
          existingImageUrl={editingItem.imageUrl}
        />
      )}
    </div>
  );
}
