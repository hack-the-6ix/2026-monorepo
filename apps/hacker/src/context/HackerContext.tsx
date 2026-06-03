'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getHackerRole, getMe, HackerRole, UserProfile } from '@/actions';
import { HackerStatus } from '@/types/status';

const hackerStatusMap: Record<string, HackerStatus> = {
  'no apply': 'under_review',
  applied: 'under_review',
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlist',
  declined: 'declined',
  rsvped: 'rsvped',
  'checked-in': 'rsvped',
};

function getDisplayName(profile: UserProfile | null) {
  if (!profile) return 'Hacker';

  const fullName = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();
  if (fullName) return fullName;

  const emailName = profile.email.split('@')[0]?.trim();
  return emailName || 'Hacker';
}

interface HackerContextValue {
  profile: UserProfile | null;
  hackerRole: HackerRole | null;
  status: HackerStatus;
  displayName: string;
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
  const status =
    hackerStatusMap[hackerRole?.status ?? 'applied'] ?? 'under_review';
  const displayName = getDisplayName(profile);

  return (
    <HackerContext.Provider
      value={{
        profile,
        hackerRole,
        status,
        displayName,
        loading,
        error,
        refresh,
      }}
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
