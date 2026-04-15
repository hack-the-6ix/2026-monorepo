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
    <div className="relative w-full h-full" aria-hidden="true">
      {butterfliesFrames.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          width={214}
          height={533}
          className={`absolute inset-0 block max-w-none size-full ${i === frame ? 'visible' : 'invisible'}`}
        />
      ))}
    </div>
  );
}
