'use client';

import React, { createContext, useContext, useState } from 'react';
import { HackerStatus } from '@/types/status';

interface HackerStatusContextProps {
  status: HackerStatus;
  setStatus: (status: HackerStatus) => void;
}

const HackerStatusContext = createContext<HackerStatusContextProps | undefined>(undefined);

export const HackerStatusProvider = ({
  children,
  initialStatus = 'under_review',
}: {
  children: React.ReactNode;
  initialStatus?: HackerStatus;
}) => {
  const [status, setStatus] = useState<HackerStatus>(initialStatus);

  return (
    <HackerStatusContext.Provider value={{ status, setStatus }}>
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
