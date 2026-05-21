import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Link from 'next/link';

import CatPortrait from '@/assets/cat_portrait.png';

export default function WelcomePage() {
  return (
    <>
      {/* Placeholder portrait — welcome only; other routes will use the user's character frame later */}
      <Image
        src={CatPortrait}
        alt=""
        className="pointer-events-none fixed top-[19vh] right-[11vw] z-[1] hidden h-[clamp(7.5rem,15vw,13.5rem)] w-auto animate-fade-in opacity-0 [animation-delay:450ms] md:block"
      />
      <Image
        src={CatPortrait}
        alt=""
        className="pointer-events-none fixed top-[22vh] right-[3vw] z-[1] h-[clamp(6.5rem,30vw,13rem)] w-auto animate-fade-in opacity-0 [animation-delay:450ms] md:hidden"
      />

      <main className="relative z-[2] flex min-h-screen flex-col items-center overflow-hidden pt-[28vh] md:justify-center md:pt-0">
        <div className="flex max-w-2xl flex-col items-center gap-4 px-6 text-center">
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
            Round 1 Applications due:{' '}
            <span className="text-error-400">May 26th 11:59EST</span>
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
    </>
  );
}
