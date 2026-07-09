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
  'no apply': 'no_apply',
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

// Local preview only (NEXT_PUBLIC_PREVIEW=1): use a mock RSVPed hacker instead
// of the /users/me fetch so the schedule is browsable without a real login
// (paired with the bypass in middleware.ts). Off by default.
const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === '1';

const PREVIEW_PROFILE: UserProfile = {
  userId: 'preview-user-0001',
  email: 'preview@hackthe6ix.com',
  firstName: 'Preview',
  lastName: 'Hacker',
  createdAt: '2026-01-01T00:00:00.000Z',
  isAdmin: false,
  roles: [
    {
      type: 'hacker',
      seasonCode: 'S26',
      score: 0,
      status: 'rsvped',
      nfcId: 'PREVIEW-NFC-1234',
      teamId: null,
    },
  ],
};

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
    if (PREVIEW) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(PREVIEW_PROFILE);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, []);

  const hackerRole = profile ? getHackerRole(profile) : null;
  const status =
    hackerStatusMap[hackerRole?.status ?? 'no_apply'] ?? 'no_apply';
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
