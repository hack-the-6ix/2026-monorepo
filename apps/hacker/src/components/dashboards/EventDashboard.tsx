'use client';

import { Typography } from '@hackthe6ix/ui';

export default function EventDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="uppercase tracking-[0.25em] text-yellow-300"
      >
        Hack the 6ix 2026
      </Typography>
      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
        className="mt-2"
      >
        <span className="text-primary-300">Schedule</span> &amp; Materials
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white/50"
        className="mt-6 max-w-md"
      >
        Under construction, come back again later.
        <br />
        We&apos;re working on getting the schedule and materials ready for you.
        <br />
        Check the Discord for real-time updates in the meantime.
      </Typography>
    </div>
  );
}
