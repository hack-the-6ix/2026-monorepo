import { Button, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-[28vh] md:justify-center md:pt-0 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-4 px-6 max-w-2xl">
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
          Hacker Application
        </Typography>
        <Typography as="p" textSize="subtitle-lg" textColor="text-yellow-300">
          Applications due: [date]
        </Typography>
        <Button
          as={Link}
          href="/about-you/character-sheet"
          className="mt-2 w-full max-w-md justify-center"
        >
          Start
        </Button>
      </div>
    </main>
  );
}
