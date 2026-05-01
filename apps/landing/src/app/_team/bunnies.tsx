'use client';

import { ComponentPropsWithRef, useEffect, useRef } from 'react';
import { Typography } from '@hackthe6ix/ui';
import cn from 'classnames';
import Image from 'next/image';

import bunny from './assets/bunny.png';
import { MemberDetails, members } from './assets/headshots';

type BunnyProps = MemberDetails & ComponentPropsWithRef<'div'>;

function Bunny({ img, name, role, linkedin, ...props }: BunnyProps) {
  return (
    <div {...props} className={cn(props.className, 'relative group')}>
      <div className="transition-opacity group-hover:opacity-100 group-active:opacity-100 opacity-0 flex flex-col items-center relative top-1 md:-right-11 -right-9 md:max-w-32 max-w-24 ">
        <Typography
          className="truncate min-w-1"
          textColor="text-white"
          textSize="paragraph-lg"
          textWeight="medium"
        >
          {name}
        </Typography>
        <Typography
          className="italic truncate opacity-60 min-w-1"
          textColor="text-white"
          textSize="paragraph-sm"
        >
          {role}
        </Typography>
      </div>
      <div
        className="relative"
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse') {
            window.open(linkedin, '_blank');
          }
        }}
      >
        <Image
          className="absolute md:left-19 left-14 md:top-6 top-4.5 object-cover rounded-full border-2 bg-team-bunny-belt border-team-bunny-belt md:size-16 size-12"
          alt={`${name} - ${role}`}
          height={300}
          width={300}
          src={img}
        />
        <Image
          className="md:size-48 size-36 object-contain"
          width={200}
          height={200}
          alt="bunny"
          src={bunny}
        />
      </div>
    </div>
  );
}

export default function Bunnies() {
  const ref = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const effect = new KeyframeEffect(
      target,
      [{ transform: 'translateX(-50%)' }],
      {
        duration: members.length * 3000,
        fill: 'forwards',
        iterations: Infinity,
      },
    );

    animation.current = new Animation(effect);
    animation.current.play();
    return () => {
      animation.current?.cancel();
    };
  }, []);

  return (
    <div className="flex overflow-hidden mask-x-from-90% mask-x-to-100% pb-7 min-w-1">
      <div
        onMouseEnter={() => animation.current?.pause()}
        onMouseLeave={() => animation.current?.play()}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') {
            animation.current?.pause();
          }
        }}
        className="flex shrink-0"
        ref={ref}
      >
        {members.map((props, idx) => (
          <Bunny className="odd:translate-y-7 -mr-7" key={idx} {...props} />
        ))}
        {members.map((props, idx) => (
          <Bunny className="odd:translate-y-7 -mr-7" key={idx} {...props} />
        ))}
        {members.map((props, idx) => (
          <Bunny className="odd:translate-y-7 -mr-7" key={idx} {...props} />
        ))}
        {members.map((props, idx) => (
          <Bunny className="odd:translate-y-7 -mr-7" key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}
