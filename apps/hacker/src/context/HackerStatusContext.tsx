'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { fetchUserProfile, type HackerRole } from '@/client';
import { decodeJwtPayload } from '@/lib/jwt';
import { HackerStatus } from '@/types/status';

interface HackerStatusContextProps {
  status: HackerStatus;
  setStatus: (status: HackerStatus) => void;
  loading: boolean;
  displayName: string;
  userId: string | null;
}

const HACKER_SEASON_CODE = 'S26';

const hackerStatusMap: Record<
  NonNullable<HackerRole['status']>,
  HackerStatus
> = {
  'no apply': 'under_review',
  applied: 'under_review',
  accepted: 'accepted',
  rejected: 'rejected',
  rsvped: 'accepted',
  'checked-in': 'accepted',
};

function getDisplayName(
  firstName: string | null,
  lastName: string | null,
  email: string,
) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  if (fullName) return fullName;

  const emailName = email.split('@')[0]?.trim();
  return emailName || 'Hacker';
}

const HackerStatusContext = createContext<HackerStatusContextProps | undefined>(
  undefined,
);

export const HackerStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState<HackerStatus>('under_review');
  const [loading, setLoading] = useState<boolean>(true);
  const [displayName, setDisplayName] = useState<string>('Hacker');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const tokenFromStorage = localStorage.getItem('token') ?? '';
      const tokenFromCookie =
        document.cookie.match(/(?:^|; )token=([^;]+)/)?.[1] ?? '';
      const payload = decodeJwtPayload(
        tokenFromStorage || decodeURIComponent(tokenFromCookie),
      );
      const currentUserId =
        (typeof payload.sub === 'string' && payload.sub) ||
        (typeof payload.userId === 'string' && payload.userId) ||
        null;

      if (!currentUserId) {
        console.warn('No userId found in JWT');
        setLoading(false);
        return;
      }

      setUserId(currentUserId);

      try {
        const data = await fetchUserProfile(currentUserId);

        setDisplayName(
          getDisplayName(data.firstName, data.lastName, data.email),
        );

        const hackerRole = data.roles.find(
          (role): role is HackerRole =>
            role.type === 'hacker' && role.seasonCode === HACKER_SEASON_CODE,
        );

        setStatus(
          hackerStatusMap[hackerRole?.status ?? 'applied'] ?? 'under_review',
        );
      } catch (error) {
        console.error('Failed to load hacker status', error);
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  return (
    <HackerStatusContext.Provider
      value={{ status, setStatus, loading, displayName, userId }}
    >
      {children}
    </HackerStatusContext.Provider>
  );
};

export const useHackerStatus = () => {
  const context = useContext(HackerStatusContext);
  if (!context) {
    throw new Error('useHackerStatus must be used within HackerStatusProvider');
  }
  return context;
};
