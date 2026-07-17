'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { invalidateCacheAndAwait } from './useQuery';

interface MutationState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  invalidateKeys?: (string | RegExp)[];
}

export function useMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData> = {},
) {
  const [state, setState] = useState<MutationState<TData>>({
    data: undefined,
    isLoading: false,
    error: null,
  });

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState({ data: undefined, isLoading: true, error: null });

      try {
        const data = await mutationFn(variables);
        setState({ data, isLoading: false, error: null });

        // Invalidate cache and await all refetches to complete before resolving
        if (optionsRef.current.invalidateKeys) {
          for (const key of optionsRef.current.invalidateKeys) {
            await invalidateCacheAndAwait(key);
          }
        }
        optionsRef.current.onSuccess?.(data);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: undefined, isLoading: false, error });
        optionsRef.current.onError?.(error);
        throw error;
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => {
    setState({ data: undefined, isLoading: false, error: null });
  }, []);

  return { ...state, mutate, reset };
}
