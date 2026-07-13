'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface CartContextValue {
  selected: Map<number, number>;
  add: (itemId: number, max?: number) => void;
  setQuantity: (itemId: number, qty: number, max?: number) => void;
  remove: (itemId: number) => void;
  clear: () => void;
  totalCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Map<number, number>>(new Map());
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((itemId: number, max?: number) => {
    setSelected((prev) => {
      const next = new Map(prev);
      const current = next.get(itemId) ?? 0;
      const desired = current + 1;
      const capped =
        typeof max === 'number' ? Math.min(desired, Math.max(1, max)) : desired;
      next.set(itemId, capped);
      return next;
    });
  }, []);

  const setQuantity = useCallback(
    (itemId: number, qty: number, max?: number) => {
      setSelected((prev) => {
        const next = new Map(prev);
        if (qty <= 0) {
          next.delete(itemId);
          return next;
        }
        const capped =
          typeof max === 'number' ? Math.min(qty, Math.max(1, max)) : qty;
        next.set(itemId, capped);
        return next;
      });
    },
    [],
  );

  const remove = useCallback((itemId: number) => {
    setSelected((prev) => {
      const next = new Map(prev);
      next.delete(itemId);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelected(new Map()), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const totalCount = useMemo(
    () => Array.from(selected.values()).reduce((sum, q) => sum + q, 0),
    [selected],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      selected,
      add,
      setQuantity,
      remove,
      clear,
      totalCount,
      isOpen,
      open,
      close,
      toggle,
    }),
    [
      selected,
      add,
      setQuantity,
      remove,
      clear,
      totalCount,
      isOpen,
      open,
      close,
      toggle,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
