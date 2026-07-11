'use client';

import { FaDiscord } from 'react-icons/fa6';
import { Button, Typography } from '@hackthe6ix/ui';

import { useDiscord } from '@/context/DiscordContext';

export default function DiscordNavButton() {
  const { discord, loading, actionLoading, link, unlink, shouldShow } =
    useDiscord();

  if (!shouldShow) {
    return null;
  }

  if (loading) {
    return (
      <Typography
        as="p"
        textSize="paragraph-sm"
        textWeight="regular"
        textColor="text-white/60"
        className="text-center"
      >
        Loading...
      </Typography>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {discord?.linked ?
        <Button
          kind="tertiary"
          destructive
          className="w-full px-16 rounded-full"
          disabled={actionLoading}
          onClick={() => void unlink()}
        >
          Unlink Discord
        </Button>
      : <Button
          kind="primary"
          className="w-full px-16 rounded-full"
          disabled={actionLoading}
          iconLeft={<FaDiscord />}
          onClick={() => void link()}
        >
          Link Discord
        </Button>
      }
    </div>
  );
}
