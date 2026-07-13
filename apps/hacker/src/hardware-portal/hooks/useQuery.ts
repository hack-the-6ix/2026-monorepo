'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const STALE_TIME = 10_000; // 10 seconds
const DEFAULT_POLL_INTERVAL = 0;

// ── Subscriber registry ──────────────────────────────────────────
// Lets invalidateCache() immediately notify mounted queries to refetch,
// so mutations cause instant UI updates without needing explicit refetch() calls.

const subscribers = new Map<
  string,
  Set<(forceRefresh?: boolean) => Promise<void> | void>
>();

function registerSubscriber(
  key: string,
  callback: (forceRefresh?: boolean) => Promise<void> | void,
): () => void {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key)!.add(callback);
  return () => {
    const set = subscribers.get(key);
    if (set) {
      set.delete(callback);
      if (set.size === 0) subscribers.delete(key);
    }
  };
}

// ── Types ────────────────────────────────────────────────────────

interface QueryState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

// ── Hook ─────────────────────────────────────────────────────────

export function useQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: { enabled?: boolean; pollInterval?: number } = {},
) {
  const { enabled = true, pollInterval = DEFAULT_POLL_INTERVAL } = options;

  const [state, setState] = useState<QueryState<T>>(() => {
    const cached = cache.get(key) as CacheEntry<T> | undefined;
    return {
      data: cached?.data,
      isLoading: !cached && enabled,
      error: null,
    };
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      const cached = cache.get(key) as CacheEntry<T> | undefined;
      const isStale = !cached || Date.now() - cached.timestamp > STALE_TIME;

      // forceRefresh bypasses stale-time check (used by polling)
      // while respecting the shared cache for other consumers
      if (cached && !isStale && !forceRefresh) {
        setState({ data: cached.data, isLoading: false, error: null });
        return;
      }

      if (cached) {
        setState((prev) => ({ ...prev, data: cached.data, isLoading: true }));
      } else {
        setState({ data: undefined, isLoading: true, error: null });
      }

      try {
        const data = await fetcherRef.current();
        cache.set(key, { data, timestamp: Date.now() });
        setState({ data, isLoading: false, error: null });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        }));
      }
    },
    [key],
  );

  const hasFetchedRef = useRef<string | null>(null);

  // Register as subscriber + initial fetch.
  // When invalidateCache() fires for this key, fetchData() is called immediately.
  // Use a ref to track which key we've already fetched for, avoiding duplicate
  // fetches when fetchData's callback identity changes.
  useEffect(() => {
    if (!enabled) {
      hasFetchedRef.current = null;
      return;
    }

    const unsubscribe = registerSubscriber(key, (forceRefresh) =>
      fetchData(forceRefresh ?? false),
    );

    // Only fetch if this is a new key, not just because fetchData's identity changed
    if (hasFetchedRef.current !== key) {
      hasFetchedRef.current = key;
      fetchData();
    }

    return unsubscribe;
  }, [key, enabled, fetchData]);

  // Background polling — uses forceRefresh to bypass stale-time without deleting
  // the shared cache entry, so other consumers aren't negatively affected.
  useEffect(() => {
    if (!enabled || !pollInterval) return;
    const id = setInterval(() => {
      fetchData(true);
    }, pollInterval);
    return () => clearInterval(id);
  }, [enabled, pollInterval, fetchData]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  return { ...state, refetch };
}

// ── Cache utilities ──────────────────────────────────────────────

export function invalidateCache(keyOrPattern: string | RegExp) {
  if (typeof keyOrPattern === 'string') {
    cache.delete(keyOrPattern);
    subscribers.get(keyOrPattern)?.forEach((cb) => cb(true));
  } else {
    // Collect from both cache AND subscribers — a key may have already been
    // evicted from cache but still have a mounted query subscribed to it.
    const keys = new Set<string>();
    for (const k of cache.keys()) {
      if (keyOrPattern.test(k)) keys.add(k);
    }
    for (const k of subscribers.keys()) {
      if (keyOrPattern.test(k)) keys.add(k);
    }
    for (const k of keys) {
      cache.delete(k);
      subscribers.get(k)?.forEach((cb) => cb(true));
    }
  }
}

/**
 * Invalidate cache and await all refetches to complete.
 * Used by mutations to ensure UI updates after cache invalidation.
 */
export async function invalidateCacheAndAwait(
  keyOrPattern: string | RegExp,
): Promise<void> {
  const refetches: Promise<void>[] = [];

  const collectAndRefetch = (key: string) => {
    cache.delete(key);
    subscribers.get(key)?.forEach((cb) => {
      const result = cb(true);
      if (result && typeof result === 'object' && 'then' in result) {
        refetches.push(result as Promise<void>);
      }
    });
  };

  if (typeof keyOrPattern === 'string') {
    collectAndRefetch(keyOrPattern);
  } else {
    const keys = new Set<string>();
    for (const k of cache.keys()) {
      if (keyOrPattern.test(k)) keys.add(k);
    }
    for (const k of subscribers.keys()) {
      if (keyOrPattern.test(k)) keys.add(k);
    }
    for (const k of keys) {
      collectAndRefetch(k);
    }
  }

  // Wait for all refetches to complete
  if (refetches.length > 0) {
    await Promise.all(refetches);
  }
}

export function clearCache() {
  cache.clear();
}
