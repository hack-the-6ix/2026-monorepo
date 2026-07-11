'use client';
import { useState } from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DiscordNavButton from '@/components/DiscordNavButton';
import MenuLegs from '../app/assets/nav/legs.png';
import MenuBody from '../app/assets/nav/radish_body.png';
import MenuSwing from '../app/assets/nav/swing.png';

import './index.css';

const navLinks = [
  { name: 'Application Status', href: '/' },
  { name: 'Team Formation', href: '/team-formation' },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const [burgerVisible, setBurgerVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (pathname === '/thank-you') {
    return null;
  }

  const openBurger = () => {
    setBurgerVisible(true);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBurger = () => {
    setIsClosing(true);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setBurgerVisible(false);
      setIsClosing(false);
    }, 500);
  };

  return (
    <div>
      {/* MOBILE */}
      <div className="z-150 relative flex md:hidden w-full justify-end">
        <button
          onClick={burgerVisible && !isClosing ? closeBurger : openBurger}
          aria-label="Toggle Menu"
        >
          <div
            className={`nav-toggle ${burgerVisible && !isClosing ? 'active' : ''}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      {burgerVisible && (
        <>
          <div
            className={`fixed inset-0 z-100 bg-neutral-50/50 transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden="true"
            onClick={closeBurger}
          />
          <div
            className={`fixed inset-x-0 top-0 z-120 md:hidden flex justify-center ${isClosing ? 'animate-menu-hide' : 'animate-menu-reveal'}`}
          >
            {/* Menu */}
            <div className="relative w-full bg-[linear-gradient(210deg,#14204C,#21657F)] rounded-b-3xl py-15 pb-15 flex flex-col gap-8 z-120 items-center">
              <div className="absolute inset-0 bg-black/50 mix-blend-overlay rounded-b-3xl pointer-events-none" />
              {navLinks.map((link) => {
                const isActive = link.href.startsWith(pathname);
                return (
                  <Link key={link.href} href={link.href} onClick={closeBurger}>
                    <Typography
                      textSize="paragraph-lg"
                      textWeight="bold"
                      className={isActive ? 'text-primary-300' : 'text-white'}
                    >
                      {link.name}
                    </Typography>
                  </Link>
                );
              })}
              <div className="relative z-40 w-full max-w-xs px-8">
                <DiscordNavButton />
              </div>
            </div>

            {/* Turnip boi */}
            <div className="absolute items-center pointer-events-none z-20 translate-y-40 animate-swing origin-top will-change-transform">
              <div className="absolute flex flex-col items-center translate-y-17">
                <Image
                  src={MenuBody}
                  alt="radish body"
                  width={180}
                  height={180}
                  className="z-30"
                />
                <Image
                  src={MenuLegs}
                  alt="radish legs"
                  width={80}
                  height={80}
                  className="animate-dangle origin-top will-change-transform -translate-y-6 -translate-x-0.5 z-10"
                />
              </div>
              <Image
                src={MenuSwing}
                alt="swing set"
                width={150}
                height={150}
                className="mt-4"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
