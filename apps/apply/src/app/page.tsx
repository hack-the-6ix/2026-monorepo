import { Button, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';

import { featureFlags } from '@/feature-flags';

export default function WelcomePage() {
  const applicationFormOpen = featureFlags.applicationFormOpen;

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-[28vh] md:justify-center md:pt-0 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-4 px-6 max-w-3xl">
        <Typography
          as="p"
          textSize="subtitle-lg"
          textWeight="bold"
          textColor="text-yellow-300"
        >
          HACK THE 6IX 2026
        </Typography>
        <Typography
          as="h1"
          textSize="display"
          textWeight="bold"
          textColor="text-white"
        >
          {applicationFormOpen
            ? 'Hacker Application'
            : 'Applications are closed'}
        </Typography>
        {applicationFormOpen ? (
          <>
            <Typography
              as="p"
              textSize="subtitle-sm"
              textColor="text-yellow-300"
            >
              Regular Round Applications Due:{' '}
              <span className="text-error-400">June 17th 11:59 PM ET</span>
            </Typography>
            <Button
              as={Link}
              href="/about-you/character-sheet"
              className="mt-2 w-full max-w-md justify-center"
            >
              Start
            </Button>
          </>
        ) : (
          <Typography
            as="p"
            textSize="subtitle-sm"
            textColor="text-yellow-300"
            className="max-w-xl"
          >
            The Hack the 6ix 2026 application form is now closed. Thanks for
            your interest, and keep an eye on your inbox for updates.
          </Typography>
        )}
        <Button
          as={Link}
          kind="secondary"
          target="_blank"
          href="https://chefoverflow.hackthe6ix.com/"
          className="mt-2 w-full max-w-md justify-center"
        >
          Play HT6 Chef Overflow
        </Button>
      </div>
    </main>
  );
}
