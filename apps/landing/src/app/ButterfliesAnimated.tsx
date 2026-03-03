'use client';

import React from 'react';
import Image from 'next/image';

import { butterfliesFrames } from '../lib/butterfliesAssets';

export function ButterfliesAnimated() {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % butterfliesFrames.length);
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute right-[280px] top-[317.89px] w-[214px] h-[533px] animate-subtle-bounce"
      aria-hidden="true"
    >
      <div className="relative w-full h-full animate-pulse">
        {butterfliesFrames.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={214}
            height={533}
            className="asset-image absolute inset-0 transition-opacity duration-200"
            style={{ opacity: i === frame ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
