'use client';

import Image from 'next/image';
import Logo from '@/app/assets/logo.svg';
import { Button, Typography } from '@hackthe6ix/ui';

const Sidebar = () => {
  return (
    <>
      <nav className="flex flex-col h-full py-12 px-6">
        <div className="mt-8 mb-12 flex justify-center">
          <Image src={Logo} alt="Hack the 6ix Logo" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button
            kind="tertiary"
            className=""
            onClick={() => {
              console.log('application status');
            }}
          >
            Application Status
          </Button>
          <Button
            kind="tertiary"
            className=""
            onClick={() => {
              console.log('team formation');
            }}
          >
            Team Formation
          </Button>
        </div>
        <div className="mt-auto flex flex-col items-center text-center">
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
          <div className="mt-6 flex items-center justify-center">
            <Button
              kind="secondary"
              className="px-16 rounded-full"
              onClick={() => {
                console.log('log out');
              }}
            >
              <Typography
                as="p"
                textSize="paragraph-sm"
                textWeight="semi-bold"
                textColor="text-[#00D5BE]"
                className=""
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
