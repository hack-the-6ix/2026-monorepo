'use client';

import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../assets/Logo.svg';
import body from '../../assets/nav_radish_body.png';
import swing from '../../assets/nav_swing.png';
import legs from '../../assets/nav_legs.png';
import SocialLinks from './SocialLinks';
import NavLinks from './NavLinks';

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [burgerVisible, setBurgerVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  // sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScroll) {
        // scrolling up
        setVisible(true);
      } else {
        setVisible(false);
      }

      setLastScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

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
    }, 1000);
  };

  return (
    <>
      <div
        className={`px-5 md:px-16 z-300 fixed top-0 w-full h-25 transition-transform duration-300 justify-between gap-12 flex flex-row align-center ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav>
          <div className="mx-auto h-20 flex items-center gap-12">
            <Link href="#hero" className="text-xl font-bold tracking-tighter">
              <Image src={logo.src} alt="ht6 icon" width={20} height={20} />
            </Link>
            <div className="hidden md:flex gap-10">
              <NavLinks />
            </div>
          </div>
        </nav>

        <div className="hidden md:flex h-20 gap-9 items-center">
          <SocialLinks />
        </div>
        {/* Mobile hamburger */}
        <div className="flex md:hidden h-20 items-center">
          <button onClick={openBurger} className="text-white">
            <RxHamburgerMenu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile nav bar open block */}
      {burgerVisible && (
        <>
          <div
            className={`fixed inset-0 z-220 bg-black/20  transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden="true"
            onClick={closeBurger}
          />
          <div
            className={`fixed inset-x-0 top-0 z-250 md:hidden flex justify-center ${isClosing ? 'animate-slide-up' : 'animate-slide-down'}`}
          >
            {/* Menu */}
            <div className="relative w-full bg-[linear-gradient(180deg,#B42525_0%,#E95252_35.19%,#FFA3A3_99.81%)] rounded-b-3xl py-3 pb-8 flex flex-col gap-4 z-100">
              {/* Header */}
              <div className="flex justify-end px-2">
                <button onClick={closeBurger} className="text-white">
                  <IoIosClose size={50} />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-lg font-medium items-center">
                <NavLinks />
              </div>
              <div className="flex gap-10 pt-5 pb-2 justify-center">
                <SocialLinks />
              </div>
            </div>

            {/* Turnip boi */}
            <div className="absolute items-center pointer-events-none z-20 translate-y-80 animate-swing origin-top will-change-transform">
              <div className="absolute flex flex-col items-center translate-y-17">
                <Image
                  src={body}
                  alt="radish body"
                  width={180}
                  height={180}
                  className="z-20"
                />
                <Image
                  src={legs}
                  alt="radish legs"
                  width={80}
                  height={80}
                  className="animate-dangle origin-top will-change-transform -translate-y-6 -translate-x-0.5 z-10"
                />
              </div>
              <Image
                src={swing}
                alt="swing set"
                width={150}
                height={150}
                className="mt-4"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
