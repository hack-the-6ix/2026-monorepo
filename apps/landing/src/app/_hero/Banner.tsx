'use client';

import { useEffectEvent, useLayoutEffect, useRef, useState } from 'react';
import { Typography } from '@hackthe6ix/ui';

export interface BannerProps {
  words: readonly string[];
}

export default function Banner({ words }: BannerProps) {
  const wordsRef = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLUListElement>(null);
  const [isReady, setIsReady] = useState(false);

  const updateReady = useEffectEvent((ready: boolean) => {
    setIsReady(ready);
  });

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
        behavior: idx === 0 ? 'auto' : 'smooth',
      });

      timeout = window.setTimeout(
        () => action((idx + 1) % items.length),
        idx ? 2300 : 0,
      );
    };

    updateReady(true);
    console.log(isReady);
    action(items.length - 1);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <Typography
      ref={containerRef}
      style={{ opacity: 0, transition: 'opacity 0.3s' }}
      className="overflow-y-hidden list-none inline-block align-top"
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
          className={isReady ? 'visible text-glow-subtle ' : 'hidden'}
        >
          {word}
        </li>
      ))}
      <li
        ref={(el) => {
          wordsRef.current[words.length] = el;
        }}
        aria-hidden
        className="text-glow-subtle"
      >
        {words[0]}
      </li>
    </Typography>
  );
}
