'use client';

import React from 'react';
import Image from 'next/image';

import { butterfliesFrames } from './assets';

export function Butterflies() {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % butterfliesFrames.length);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="animate-subtle-bounce" aria-hidden="true">
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
