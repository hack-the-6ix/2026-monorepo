import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@hackthe6ix/ui';

import radish from '@/assets/nav_radish_body.png';
import legs from '@/assets/nav_legs.png';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[linear-gradient(to_bottom,#12102F_0%,#423994_40%,#0D7F75_80%)] text-white px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative flex flex-col items-center">
          <Image
            src={radish}
            alt="lost radish"
            width={160}
            height={160}
            className="drop-shadow-xl"
          />
          <Image
            src={legs}
            alt="radish legs"
            width={70}
            height={70}
            className="-translate-y-5 -translate-x-0.5"
          />
        </div>

        <Typography textSize="display" textWeight="bold" textColor="text-white">
          404
        </Typography>

        <Typography
          textSize="heading-lg"
          textWeight="semi-bold"
          textColor="text-white"
        >
          Page Not Found
        </Typography>

        <Typography
          textSize="paragraph-lg"
          textWeight="medium"
          textColor="text-white"
          className="max-w-md opacity-80"
        >
          Looks like this radish wandered off the map. Let&apos;s get you back
          to safety.
        </Typography>

        <Link
          href="/"
          className="mt-4 px-8 py-3 rounded-full bg-white text-[#423994] font-semibold text-sm hover:bg-opacity-90 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
