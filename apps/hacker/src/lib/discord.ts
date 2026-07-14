import { fetchHt6 } from '@/client';

export interface DiscordMe {
  linked: boolean;
  userId?: string;
  discordId?: string;
  username?: string;
  globalName?: string | null;
  avatarUrl?: string | null;
  linkedAt?: string;
  lastSyncedAt?: string | null;
  syncError?: string | null;
}

export async function getDiscordMe(): Promise<DiscordMe> {
  return fetchHt6<DiscordMe>('/discord');
}

export async function unlinkDiscord(): Promise<{ message: string }> {
  return fetchHt6<{ message: string }>('/discord/unlink', {
    method: 'DELETE',
  });
}

export function startDiscordLink(
  redirectUrl: string,
  seasonCode: string,
): void {
  const url = new URL('/discord/link', window.location.origin);
  url.searchParams.set('redirectUrl', redirectUrl);
  url.searchParams.set('seasonCode', seasonCode);
  window.location.assign(url.toString());
}
