'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getHackerRole, getMe, HackerRole, UserProfile } from '@/actions';
import { HackerStatus, RoleType } from '@/types/status';

const hackerStatusMap: Record<string, HackerStatus> = {
  'no apply': 'no_apply',
  applied: 'under_review',
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlist',
  declined: 'declined',
  rsvped: 'rsvped',
  'checked-in': 'checked-in',
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

function getUserRoleTypes(profile: UserProfile | null): RoleType[] {
  if (!profile) return [];
  const types = new Set<RoleType>();
  for (const role of profile.roles) {
    if (typeof role === 'object' && role !== null) {
      const r = role as { type: string };
      if (
        r.type === 'hacker' ||
        r.type === 'sponsor' ||
        r.type === 'mentor' ||
        r.type === 'volunteer'
      ) {
        types.add(r.type);
      }
    }
  }
  return Array.from(types);
}

interface HackerContextValue {
  profile: UserProfile | null;
  hackerRole: HackerRole | null;
  status: HackerStatus;
  isWaitlistToAccepted: boolean;
  displayName: string;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  roleTypes: RoleType[];
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
    hackerStatusMap[hackerRole?.status ?? 'no_apply'] ?? 'no_apply';
  const displayName = getDisplayName(profile);

  const isWaitlistToAccepted = hackerRole?.state === 'waitlist_to_accepted';

  const baseRoleTypes = getUserRoleTypes(profile);
  const roleTypes =
    profile?.isAdmin ?
      [...new Set([...baseRoleTypes, 'admin' as const])]
    : baseRoleTypes;

  return (
    <HackerContext.Provider
      value={{
        profile,
        hackerRole,
        status,
        isWaitlistToAccepted,
        displayName,
        loading,
        error,
        refresh,
        roleTypes,
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
