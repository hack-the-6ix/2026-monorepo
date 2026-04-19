'use client';
import { useEffect, useState } from 'react';
import { Typography } from '@hackthe6ix/ui';

export interface BannerProps {
  words: readonly string[];
}

export default function Banner({ words }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 400);
    }, 2400);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <Typography
      className="overflow-hidden inline-block align-top"
      textColor="text-warning-400"
      textSize="subtitle-lg"
      textWeight="bold"
      as="span"
    >
      <span
        className={`inline-block transition-all duration-400 ease-in-out ${
          isTransitioning ?
            'opacity-0 translate-y-2'
          : 'opacity-100 translate-y-0'
        }`}
      >
        {words[currentIndex]}
      </span>
    </Typography>
  );
}
