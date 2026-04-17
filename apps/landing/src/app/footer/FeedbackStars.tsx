'use client';
import { useState } from 'react';
import Image from 'next/image';

import EmptyStar1 from '@/assets/footer/star1_empty.png';
import FilledStar1 from '@/assets/footer/star1_filled.png';
import EmptyStar2 from '@/assets/footer/star2_empty.png';
import FilledStar2 from '@/assets/footer/star2_filled.png';
import EmptyStar3 from '@/assets/footer/star3_empty.png';
import FilledStar3 from '@/assets/footer/star3_filled.png';
import EmptyStar4 from '@/assets/footer/star4_empty.png';
import FilledStar4 from '@/assets/footer/star4_filled.png';
import EmptyStar5 from '@/assets/footer/star5_empty.png';
import FilledStar5 from '@/assets/footer/star5_filled.png';

const empty_stars = [
  EmptyStar1,
  EmptyStar2,
  EmptyStar3,
  EmptyStar4,
  EmptyStar5,
];

const filled_stars = [
  FilledStar1,
  FilledStar2,
  FilledStar3,
  FilledStar4,
  FilledStar5,
];

export default function FeedbackStars() {
  const [rating, setRating] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);

  return (
    <div className="flex flex-row gap-2">
      {empty_stars.map((star, index) => (
        <Image
          key={index}
          src={
            index < rating || index < hoverIndex ? filled_stars[index] : star
          }
          alt="star"
          width={24}
          className={`${index < hoverIndex ? 'scale-120 animate-image-glow' : ''} ${index < rating ? 'animate-image-glow' : ''}`}
          onClick={() => {
            setRating(index + 1);
          }}
          onMouseEnter={() => setHoverIndex(index + 1)}
          onMouseLeave={() => setHoverIndex(0)}
        ></Image>
      ))}
    </div>
  );
}
