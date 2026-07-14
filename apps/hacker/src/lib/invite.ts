import { HT6_API_SERVER_URL } from '@/lib/api';

export interface InvitePreview {
  roleType: string;
  roleData: unknown | null;
  expiresAt: string | null;
}

const INVITE_CODE_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidInviteCode(inviteCode: string): boolean {
  return INVITE_CODE_RE.test(inviteCode);
}

export async function fetchInvitePreview(
  inviteCode: string,
): Promise<InvitePreview | null> {
  const res = await fetch(
    `${HT6_API_SERVER_URL}/invite/${inviteCode}/preview`,
    { cache: 'no-store' },
  );
  if (!res.ok) return null;
  return res.json();
}

export function formatRoleLabel(
  roleType: string,
  roleData: unknown | null,
): string {
  const role = roleType.charAt(0).toUpperCase() + roleType.slice(1);
  if (roleType === 'sponsor' && roleData && typeof roleData === 'object') {
    const org = (roleData as Record<string, unknown>).org;
    if (typeof org === 'string' && org.trim()) {
      return `${role} (${org})`;
    }
  }
  return role;
}

export function formatExpiresAt(expiresAt: string | null): string {
  if (!expiresAt) return 'This invite does not expire.';
  const date = new Date(expiresAt);
  return `Expires at ${date.toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  })}`;
}

export function startInviteAccept(inviteCode: string): void {
  const url = new URL('/share/invite/accept', window.location.origin);
  url.searchParams.set('inviteCode', inviteCode);
  window.location.assign(url.toString());
}
