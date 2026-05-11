import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

import Couch from '@/assets/couch.png';
import DrinkPortrait from '@/assets/drink_portrait.png';
import Floor from '@/assets/floor.png';
import GlowSlant from '@/assets/glow_slant.png';
import Lamp from '@/assets/lamp.png';
import MobileTable from '@/assets/mobile_table.png';
import NeedleThread from '@/assets/needle_thread.png';
import Wall from '@/assets/wall.png';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HT6 Application',
  description: "Hack the 6ix's 2026 application page",
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // TODO: add middleware for backend stuff and auth
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen md:max-h-screen md:overflow-hidden bg-[linear-gradient(226deg,#F6BD55_-36.92%,#A53368_4.83%,#3E33AE_84.03%,#100C3F_149.65%)]`}
      >
        {/* Desktop Bg */}
        <div className="hidden md:block fixed inset-0 z-0 pointer-events-none animate-fade-in will-change-opacity">
          <Image
            src={Wall}
            alt=""
            className="absolute top-0 w-full h-[95%] object-fill"
            priority
          />
          <Image
            src={Floor}
            alt=""
            className="absolute bottom-0 w-full h-[40%] object-fill"
            priority
          />
          <Image
            src={DrinkPortrait}
            alt="Drink Portrait"
            className="absolute top-[5vw] lg:top-[4vw] -right-[3vw] lg:h-[8vw] w-auto h-[10vw] animate-fade-in [animation-delay:300ms] opacity-0"
          />
          <Image
            src={Couch}
            alt="couch"
            className="absolute bottom-0 -right-[5vw] w-auto h-[38vw] animate-fade-in [animation-delay:300ms] opacity-0"
          />
          <Image
            src={Lamp}
            alt="Lamp"
            className="absolute bottom-[1vw] -left-[5vw] w-auto h-[32vw] animate-fade-in [animation-delay:300ms] opacity-0"
          />
          <Image
            src={NeedleThread}
            alt="Needle and threads"
            className="absolute -bottom-[10vw] -right-[3vw] w-auto h-[28vw] animate-fade-in [animation-delay:300ms] opacity-0"
          />
          <Image
            src={GlowSlant}
            placeholder="blur"
            alt=""
            className="absolute top-0 right-0 -translate-y-[5vw] translate-x-[5vw] w-full h-180 object-fill mask-[linear-gradient(to_bottom_left,black,transparent)]"
          />
          <div className="absolute inset-0 bg-[rgba(20,4,48,0.2)]"></div>
        </div>

        {/* Mobile Bg */}
        <div className="block md:hidden fixed inset-0 z-0 pointer-events-none animate-fade-in will-change-opacity">
          <Image
            src={Wall}
            alt=""
            className="absolute -left-28 -top-8 h-[90%] w-auto max-w-none"
            priority
          />
          <Image
            src={Floor}
            alt=""
            className="absolute -right-5 bottom-0 h-[25%] w-auto max-w-none"
            priority
          />
          <div className="absolute -left-25 bottom-0 w-[130%] h-[40%] rounded-full -rotate-45 bg-[rgba(255,209,120,0.2)] shadow-[0_0_100px_100px_rgba(255,209,120,0.2)]"></div>
          <Image
            src={MobileTable}
            alt="Needle Thread"
            className="absolute right-0 -bottom-[68vw] h-auto w-full animate-fade-in [animation-delay:300ms] opacity-0"
          />
          <div className="absolute inset-0 bg-black/50 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
