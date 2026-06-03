'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getHackerRole, getMe, HackerRole, UserProfile } from '@/actions';

interface HackerContextValue {
  profile: UserProfile | null;
  hackerRole: HackerRole | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const HackerContext = createContext<HackerContextValue | null>(null);

export function HackerProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const p = await getMe();
      setProfile(p);
    } catch {
      setError('Failed to load user profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, []);

  const hackerRole = profile ? getHackerRole(profile) : null;

  return (
    <HackerContext.Provider
      value={{ profile, hackerRole, loading, error, refresh }}
    >
      {children}
    </HackerContext.Provider>
  );
}

export function useHacker() {
  const ctx = useContext(HackerContext);
  if (!ctx) throw new Error('useHacker must be used within a HackerProvider');
  return ctx;
}
