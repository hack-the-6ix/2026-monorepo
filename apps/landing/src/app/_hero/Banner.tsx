'use client';

import { useEffect, useState } from 'react';
import { Typography } from '@hackthe6ix/ui';

export interface BannerProps {
  words: readonly string[];
}

export default function Banner({ words }: BannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="inline-grid grid-cols-1 grid-rows-1 align-top">
      {words.map((word, i) => (
        <Typography
          key={word}
          as="span"
          textColor="text-warning-400"
          textSize="subtitle-lg"
          textWeight="bold"
          className={`
            col-start-1 row-start-1
            transition-all duration-1500 ease-in-out
            ${i === index ? 'opacity-100 blur-0' : 'opacity-0 blur-xs pointer-events-none'}
          `}
        >
          {word}
        </Typography>
      ))}
    </div>
  );
}
