import { redirect } from 'next/navigation';

import InviteAcceptView from '@/components/invite/InviteAcceptView';
import {
  fetchInvitePreview,
  formatExpiresAt,
  formatRoleLabel,
  isValidInviteCode,
} from '@/lib/invite';

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<{ inviteCode?: string }>;
}) {
  const { inviteCode } = await searchParams;

  if (!inviteCode || !isValidInviteCode(inviteCode)) {
    redirect('/');
  }

  const preview = await fetchInvitePreview(inviteCode);
  if (!preview) {
    redirect('/');
  }

  return (
    <InviteAcceptView
      inviteCode={inviteCode}
      roleLabel={formatRoleLabel(preview.roleType, preview.roleData)}
      expiresAtLabel={formatExpiresAt(preview.expiresAt)}
    />
  );
}
