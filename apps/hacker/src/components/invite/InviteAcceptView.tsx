'use client';

import { Button, Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import { startInviteAccept } from '@/lib/invite';

interface InviteAcceptViewProps {
  inviteCode: string;
  roleLabel: string;
  expiresAtLabel: string;
}

export default function InviteAcceptView({
  inviteCode,
  roleLabel,
  expiresAtLabel,
}: InviteAcceptViewProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
        className="mt-6 md:mt-32"
      >
        Do you want to accept this invite?
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-md"
      >
        You will be granted the{' '}
        <span className="text-primary-300">{roleLabel}</span> role.
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-sm"
        textWeight="regular"
        textColor="text-white"
        className="max-w-md opacity-80"
      >
        {expiresAtLabel}
      </Typography>
      <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <Button
          kind="secondary"
          className="w-full md:w-auto max-w-[280px] md:max-w-none px-6"
          onClick={() => router.push('/')}
        >
          No
        </Button>
        <Button
          kind="primary"
          className="w-full md:w-auto max-w-[280px] md:max-w-none px-6"
          onClick={() => startInviteAccept(inviteCode)}
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
