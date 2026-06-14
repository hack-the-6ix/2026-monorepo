import { Button, Typography } from '@hackthe6ix/ui';
import { ArrowRight } from 'lucide-react';

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://2026.dash.hackthe6ix.com';

export default function ApplicationsClosed() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-2 text-center md:gap-8">
      <Typography
        as="h1"
        textSize="heading-sm"
        textWeight="bold"
        textColor="text-white"
        className="max-w-md text-[1.75rem] leading-tight md:text-[2.5rem]"
      >
        Applications are now closed
      </Typography>

      <Button
        as="a"
        href={DASHBOARD_URL}
        iconLeft={<ArrowRight size="inherit" className="size-3.5" />}
        className="w-full max-w-xs border-primary-500 bg-primary-400 px-6 py-3 hover:border-primary-600 hover:bg-primary-500 md:w-auto md:min-w-52 md:max-w-none"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
