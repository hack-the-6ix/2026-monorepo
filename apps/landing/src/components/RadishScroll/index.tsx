'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { assets } from '../../app/_hero/assets';

export default function RadishScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const activeScroll = Math.max(0, scrollY - windowHeight * 0.5);
  const zigZag = Math.sin(activeScroll / 500 + Math.PI / 2) * 35 - 48;
  const tilt = (activeScroll * 0.3) % 360;

  return (
    <div
      className="animate-fade-in fixed pointer-events-none transition-opacity duration-500 ease-out will-change-transform"
      style={{
        zIndex: 20,
        bottom: '20vh',
        visibility: scrollY > windowHeight * 0.6 ? 'visible' : 'hidden',
        left: '110%',
        width: '140px',
        height: '240px',
        transform: `translate3d(calc(-110% + ${zigZag}vw), 0, 0)`,
      }}
    >
      <div className="w-full h-full will-change-transform">
        <div
          className="w-full h-full origin-center"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          <Image
            src={assets.heroRadishStand}
            alt="Falling Radish"
            width={200}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
