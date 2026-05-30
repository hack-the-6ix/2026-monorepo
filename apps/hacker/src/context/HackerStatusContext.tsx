'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HackerStatus } from '@/types/status';
import { fetchUserProfile } from '@/client';
import { decodeJwtPayload } from '@/lib/jwt';

interface HackerStatusContextProps {
  status: HackerStatus;
  setStatus: (status: HackerStatus) => void;
  loading: boolean;
}

const HackerStatusContext = createContext<HackerStatusContextProps | undefined>(undefined);

export const HackerStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<HackerStatus>('under_review');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Retrieve token from localStorage or cookie
    const token = localStorage.getItem('token') ?? '';
    const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] ?? '';
    const finalToken = token || tokenFromCookie;
    const payload = decodeJwtPayload(finalToken);
    const userId = payload.sub ?? payload.userId;
    if (!userId) {
      console.warn('No userId found in JWT');
      setLoading(false);
      return;
    }
    const seasonCode = 'S26';
    fetchUserProfile(userId)
      .then((data) => {
        const hackerRole = (data.roles ?? []).find((r: any) => r.seasonCode === seasonCode);
        if (hackerRole?.status) {
          const map: Record<string, HackerStatus> = {
            no_apply: 'under_review',
            applied: 'under_review',
            accepted: 'accepted',
            rejected: 'rejected',
          };
          const newStatus = map[hackerRole.status] ?? 'under_review';
          setStatus(newStatus);
        }
      })
      .catch((err) => console.error('Failed to load hacker status', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <HackerStatusContext.Provider value={{ status, setStatus, loading }}>
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
