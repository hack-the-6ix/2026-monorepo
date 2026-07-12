'use client';

import { Button, Typography } from '@hackthe6ix/ui';

import { useHacker } from '@/context/HackerContext';

export default function OrganizerDashboard() {
  const { displayName } = useHacker();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8 space-y-4">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="mt-6 md:mt-32"
      >
        Welcome, {displayName}!
      </Typography>
      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
      >
        <span className="text-primary-300">Organizer</span> Dashboard
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-none"
      >
        Manage hackers, sponsors, and everything Hack the 6ix.
      </Typography>
      <Button
        kind="primary"
        className="mt-4"
        as="a"
        href="https://admin-v2.hackthe6ix.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Admin Dashboard
      </Button>
    </div>
  );
}
