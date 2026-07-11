'use client';

import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/app/assets/logo.svg';
import DiscordNavButton from '@/components/DiscordNavButton';
import { useHacker } from '@/context/HackerContext';

const Sidebar = () => {
  const pathname = usePathname();

  const { status } = useHacker();
  // const teamHref = hackerRole?.teamId ? '/team' : '/team-formation';
  const isActive = (href: string) => pathname === href;
  return (
    <>
      <nav className="flex flex-col h-full py-12 px-6">
        <div className="mt-4 mb-12 flex justify-center">
          <Image src={Logo} alt="Hack the 6ix Logo" />
        </div>
        <div className="flex flex-col items-center">
          <Button
            as={Link}
            href="/"
            kind="tertiary"
            className={`text-primary-400 ${isActive('/') ? 'underline' : ''}`}
          >
            Dashboard
          </Button>
          {(status === 'accepted' || status === 'waitlist') && (
            <Button
              as={Link}
              href="/rsvp-form"
              kind="tertiary"
              className={`text-primary-400 ${isActive('/rsvp-form') ? 'underline' : ''}`}
            >
              RSVP Form
            </Button>
          )}
          {/* <Button
            as={Link}
            href={teamHref}
            kind="tertiary"
            className={`text-primary-400 ${isActive(teamHref) ? 'underline' : ''}`}
          >
            Team Formation
          </Button> */}
        </div>
        <div className="mt-auto flex w-full flex-col items-stretch text-center">
          <div className="flex items-center justify-center">
            <div>
              <Typography
                as="p"
                textSize="paragraph-sm"
                textWeight="semi-bold"
                textColor="text-white"
              >
                Event date:
              </Typography>
              <Typography
                as="p"
                textSize="paragraph-lg"
                textWeight="semi-bold"
                textColor="text-[#F6BD55]"
                className="mt-2 text-center"
              >
                July 17-19, 2026 <br />
                Bahen Centre
              </Typography>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-col items-stretch gap-4">
            <DiscordNavButton />
            <Button
              kind="secondary"
              className="w-full px-16 rounded-full"
              onClick={() => {
                console.log('log out'); // TODO: implement logout
              }}
            >
              <Typography
                as="p"
                textSize="paragraph-sm"
                textWeight="semi-bold"
                textColor="text-[#00D5BE]"
              >
                Log out
              </Typography>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
