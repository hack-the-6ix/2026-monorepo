'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { seasonCode } from '@/actions';
import { getApiErrorMessage } from '@/client';
import DiscordToast from '@/components/DiscordToast';
import { useHacker } from '@/context/HackerContext';
import {
  DiscordMe,
  getDiscordMe,
  startDiscordLink,
  unlinkDiscord,
} from '@/lib/discord';

type CallbackTone = 'success' | 'warning' | 'error';

export interface DiscordCallbackMessage {
  text: string;
  tone: CallbackTone;
}

const discordMessages: Record<string, DiscordCallbackMessage> = {
  linked: {
    text: 'Discord account linked successfully.',
    tone: 'success',
  },
  linked_sync_failed: {
    text: 'Discord linked, but role sync failed. Please contact the team on Discord.',
    tone: 'warning',
  },
  already_linked: {
    text: 'This Discord account is already linked to another HT6 account.',
    tone: 'error',
  },
  link_failed: {
    text: 'Failed to start Discord linking. Please try again.',
    tone: 'error',
  },
};

export const callbackToneClasses: Record<CallbackTone, string> = {
  success: 'border-[#00D5BE]/40 bg-[#0B1A2E] text-[#00D5BE]',
  warning: 'border-yellow-300/40 bg-[#0B1A2E] text-yellow-300',
  error: 'border-error-400/40 bg-[#0B1A2E] text-error-300',
};

interface DiscordContextValue {
  discord: DiscordMe | null;
  loading: boolean;
  actionLoading: boolean;
  shouldShow: boolean;
  link: () => void;
  unlink: () => Promise<void>;
  refresh: () => Promise<void>;
}

const DiscordContext = createContext<DiscordContextValue | null>(null);

export function DiscordProvider({ children }: { children: ReactNode }) {
  const { status } = useHacker();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shouldShow = status === 'rsvped';

  const [discord, setDiscord] = useState<DiscordMe | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<DiscordCallbackMessage | null>(null);
  const oauthProcessedRef = useRef(false);

  const showToast = useCallback((message: DiscordCallbackMessage) => {
    setToast(message);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  const refresh = useCallback(async () => {
    if (!shouldShow) return;

    try {
      setLoading(true);
      const data = await getDiscordMe();
      setDiscord(data);
    } catch (err) {
      showToast({
        text: getApiErrorMessage(err, 'Failed to load Discord status.'),
        tone: 'error',
      });
      setDiscord(null);
    } finally {
      setLoading(false);
    }
  }, [shouldShow, showToast]);

  useEffect(() => {
    if (oauthProcessedRef.current) return;

    const discordStatus = searchParams.get('discord');
    if (!discordStatus) return;

    oauthProcessedRef.current = true;
    const message = discordMessages[discordStatus] ?? null;
    if (message) {
      showToast(message);
    }
    router.replace(pathname, { scroll: false });
    void refresh();
  }, [searchParams, router, pathname, refresh, showToast]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 8000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (shouldShow) {
      void refresh();
    } else {
      setDiscord(null);
      setLoading(false);
    }
  }, [shouldShow, refresh]);

  const link = () => {
    setActionLoading(true);
    startDiscordLink(`${window.location.origin}/`, seasonCode);
  };

  const unlink = async () => {
    try {
      setActionLoading(true);
      await unlinkDiscord();
      await refresh();
      showToast({
        text: 'Discord account unlinked.',
        tone: 'success',
      });
    } catch (err) {
      showToast({
        text: getApiErrorMessage(err, 'Failed to unlink Discord account.'),
        tone: 'error',
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <DiscordContext.Provider
      value={{
        discord,
        loading,
        actionLoading,
        shouldShow,
        link,
        unlink,
        refresh,
      }}
    >
      {children}
      {toast && <DiscordToast message={toast} onDismiss={clearToast} />}
    </DiscordContext.Provider>
  );
}

export function useDiscord() {
  const ctx = useContext(DiscordContext);
  if (!ctx) {
    throw new Error('useDiscord must be used within a DiscordProvider');
  }
  return ctx;
}
