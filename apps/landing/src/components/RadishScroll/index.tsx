'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { assets } from '../../app/_hero/assets';

export default function RadishScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeScroll = Math.max(0, scrollY - windowHeight);
  const zigZag = Math.sin(activeScroll / 500 + Math.PI / 2) * 35 - 48;
  const tilt = (activeScroll * 0.2) % 360;

  return (
    <div
      className={`fixed pointer-events-none transition-opacity duration-500 ease-out`}
      style={{
        zIndex: 20,
        bottom: '20vh',
        left: '110%',
        width: '140px',
        height: '240px',
        transform: `translate3d(calc(-110% + ${zigZag}vw), 0, 0) rotate(${tilt}deg)`,
      }}
    >
      <Image
        src={assets.heroRadishStand}
        alt="Falling Radish"
        fill
        className="object-contain"
      />
    </div>
  );
}
