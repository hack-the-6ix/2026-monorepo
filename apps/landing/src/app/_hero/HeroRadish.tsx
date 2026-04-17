'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { assets } from './assets';

type RadishState = 'hidden' | 'jumping' | 'standing';

export default function HeroRadish() {
  const [radishState, setRadishState] = useState<RadishState>('hidden');
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.75;
      setIsScrolledPast(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRadishClick = () => {
    if (radishState !== 'hidden') return;
    setRadishState('jumping');
    setTimeout(() => setRadishState('standing'), 200);
  };

  return (
    <div
      className={`
        absolute z-100 left-[2080.66px] top-[1286.9px] will-change-transform
        w-125 h-125 origin-bottom-left
        transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isScrolledPast ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${radishState === 'hidden' ? 'cursor-pointer -translate-y-82.5 scale-25' : '-translate-x-20 -translate-y-130 scale-100'}
      `}
      onClick={handleRadishClick}
    >
      <Image
        src={assets.heroRadishHide}
        alt="radish hide"
        width={122}
        height={195}
        className={`absolute inset-0 block max-w-none size-full transition-opacity animate-image-glow hover:scale-105 ${radishState === 'hidden' ? 'visible' : 'hidden'}`}
        priority
      />

      <Image
        src={assets.heroRadishGif}
        alt=""
        width={300}
        height={1000}
        className={`absolute inset-0 object-contain transition-opacity duration-100
          ${radishState !== 'hidden' ? 'visible' : 'hidden'} ${radishState === 'standing' ? 'animate-wiggle origin-bottom' : ''}`}
        unoptimized
        priority
      />
    </div>
  );
}
