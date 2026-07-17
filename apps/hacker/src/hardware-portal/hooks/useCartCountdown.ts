'use client';

import { useEffect, useState } from 'react';

const CART_TTL_MS = 5 * 60 * 1000; // 5 minutes

const calc = (createdAt: string) =>
  Math.max(0, new Date(createdAt).getTime() + CART_TTL_MS - Date.now());

/**
 * Returns a live countdown string for a RESERVED cart, ticking every second.
 * - ''        → not yet loaded (render nothing)
 * - '4:32'    → time remaining
 * - 'Expired' → timer ran out
 */
export function useCartCountdown(createdAt: string | null | undefined): string {
  const [remainingMs, setRemainingMs] = useState<number | null>(() =>
    createdAt ? calc(createdAt) : null,
  );

  useEffect(() => {
    if (!createdAt) {
      setRemainingMs(null);
      return;
    }
    setRemainingMs(calc(createdAt));
    const id = setInterval(() => setRemainingMs(calc(createdAt)), 1000);
    return () => clearInterval(id);
  }, [createdAt]);

  if (remainingMs === null) return '';
  if (remainingMs <= 0) return 'Expired';
  const totalSecs = Math.ceil(remainingMs / 1000);
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
