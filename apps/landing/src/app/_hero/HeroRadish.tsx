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
      const threshold = window.innerHeight * 0.5;
      setIsScrolledPast(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRadishClick = () => {
    if (radishState !== 'hidden') return;
    setRadishState('jumping');
    setTimeout(() => setRadishState('standing'), 1000);
    console.log(radishState);
  };

  const containerClasses = `
    absolute z-[100] origin-bottom transition-all duration-300 left-[2080.66px] top-[1286.9px] will-change-transform parallax-layer
    ${isScrolledPast ? 'min-[1050px]:opacity-0 min-[1050px]:pointer-events-none' : 'opacity-100'}
    ${
      radishState === 'hidden' ?
        'w-[122px] h-[195.06px] translate-y-0 cursor-pointer'
      : `w-[140px] h-[240px] ${radishState === 'standing' ? '-translate-y-[150px]' : '-translate-y-[166px]'}`
    }
    `;

  return (
    <div
      className={containerClasses}
      onClick={handleRadishClick}
      style={{
        animationName: 'parallax-right',
        animationDuration: '1s',
      }}
    >
      <Image
        src={assets.heroRadishHide}
        alt="radish hide"
        width={122}
        height={195}
        className={`absolute inset-0 block max-w-none size-full transition-opacity animate-image-glow ${radishState === 'hidden' ? 'visible' : 'hidden'}`}
        priority
      />

      <Image
        src={assets.heroRadishGif}
        alt=""
        fill
        className={`absolute inset-0 object-contain scale-200 transition-opacity duration-200
          ${radishState === 'jumping' ? 'visible' : 'hidden'}`}
        unoptimized
      />

      <Image
        src={assets.heroRadishStand}
        alt="radish stand"
        width={200}
        height={300}
        className={`absolute inset-0 block max-w-none size-full z-10 animate-wiggle origin-bottom ${radishState === 'standing' ? 'visible' : 'hidden'}`}
      />
    </div>
  );
}
