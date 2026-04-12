'use client';

import { useLayoutEffect, useRef } from 'react';
import { Typography } from '@hackthe6ix/ui';

export interface BannerProps {
  words: readonly string[];
}

export default function Banner({ words }: BannerProps) {
  const wordsRef = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const items = wordsRef.current.filter(Boolean) as HTMLLIElement[];
    let timeout: number;

    if (!container || items.length === 0) return;

    container.style.opacity = '1';

    const action = (idx: number) => {
      const ref = items[idx];
      if (!ref) return;

      container.style.height = `${ref.offsetHeight}px`;
      container.scrollTo({
        top: ref.offsetTop - container.offsetTop,
        behavior: idx === 0 ? 'instant' : 'smooth',
      });
      const nextIdx = (idx + 1) % items.length;

      timeout = window.setTimeout(() => action(nextIdx), idx === 0 ? 0 : 2200);
    };
    action(0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [words]);

  return (
    <Typography
      ref={containerRef}
      style={{ opacity: 0, transition: 'opacity 0.3s' }}
      className="overflow-y-hidden list-none inline-block align-top p-5 -mt-2 -ml-5 opacity-0 transition-opacity"
      textColor="text-warning-400"
      textSize="subtitle-lg"
      textWeight="bold"
      as="ul"
    >
      {words.map((word, i) => (
        <li
          ref={(el) => {
            wordsRef.current[i] = el;
          }}
          key={i}
          className="text-glow py-2"
        >
          {word}
        </li>
      ))}
      <li
        ref={(el) => {
          wordsRef.current[words.length] = el;
        }}
        aria-hidden
        className="text-glow py-2"
      >
        {words[0]}
      </li>
    </Typography>
  );
}
