'use client';

import React from 'react';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa6';
import { Typography } from '@hackthe6ix/ui';
import Logo from '@/app/assets/logo.svg';

const MobileHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center gap-6">
        <Image src={Logo} alt="Hack the 6ix Logo" width={18} height={18} />

        <div className="text-left">
          <Typography
            as="p"
            textSize="label"
            textWeight="bold"
            textColor="text-white"
            className="uppercase tracking-wider leading-none"
          >
            Event date:
          </Typography>
          <Typography
            as="p"
            textSize="paragraph-sm"
            textWeight="semi-bold"
            textColor={null}
            className="text-yellow-300 leading-tight mt-0.5"
          >
            July 17-19, 2026 Bahen Centre
          </Typography>
        </div>
      </div>
      <button className="text-primary-300 hover:opacity-85 active:scale-95 transition-all">
        <FaBars size={20} />
      </button>
    </div>
  );
};

export default MobileHeader;
