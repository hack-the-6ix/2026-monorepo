'use client';

import { useState } from 'react';
import { Typography } from '@hackthe6ix/ui';
import cn from 'classnames';
import Image from 'next/image';

import star1 from './assets/stars/star-1.png';
import star2 from './assets/stars/star-2.png';
import star3 from './assets/stars/star-3.png';
import star4 from './assets/stars/star-4.png';
import star5 from './assets/stars/star-5.png';

const stars = [star1, star2, star3, star4, star5] as const;

export function Rating() {
  const [currRating, setCurrRating] = useState(5);
  const [rating, setRating] = useState(currRating);

  return (
    <div className="flex justify-center flex-wrap gap-y-2 gap-x-6 w-fit px-content-padding m-auto">
      <Typography
        className="text-center"
        textWeight="medium"
        textSize="paragraph-lg"
        textColor="text-white"
      >
        How was your experience with our website?
      </Typography>
      <div
        onMouseEnter={() => setRating(0)}
        onMouseLeave={() => setRating(currRating)}
        className="flex gap-1 group cursor-pointer"
      >
        {stars.map((star, idx) => (
          <Image
            onMouseOver={() => setRating(idx)}
            onClick={() => setCurrRating(idx)}
            className={cn(
              'transition-all opacity-50 size-7',
              'group-active:scale-125',
              idx <= rating ? 'opacity-100' : 'opacity-50',
            )}
            src={star}
            width={20}
            alt="star"
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
