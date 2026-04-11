'use client';

import { Typography } from "@hackthe6ix/ui";
import cn from 'classnames';

import bunny from './assets/bunny.png';
import Image from "next/image";
import { ComponentPropsWithRef, useEffect, useRef, useState } from "react";

const mockData = new Array(11).fill(0).map((_, idx) => ({
  name: `lorem ipsum lorem ipsum lorem ipsum ${idx}`,
  role: `role - ${idx}`,
  img: 'https://picsum.photos/200',
}));

type UserData = {
  name: string;
  role: string;
  img: string;
};

type BunnyProps = UserData & ComponentPropsWithRef<'div'>;

function Bunny({ img, name, role, ...props }: BunnyProps) {
  return (
    <div {...props} className={cn(props.className, 'relative group')}>
      <div className="transition-opacity group-hover:opacity-100 opacity-0 flex flex-col items-center relative -right-3 max-w-38">
        <Typography className="truncate min-w-1" textColor="text-white" textSize='paragraph-sm' textWeight="medium">{name}</Typography>
        <Typography className="italic truncate opacity-60 min-w-1" textColor="text-white" textSize='label'>{role}</Typography>
      </div>
      <div className='relative'>
        <img className="absolute left-15 top-5 rounded-full border-2 bg-bunny-belt border-bunny-belt size-12" src={img} alt={`${name} - ${role}`} />
        <Image className="size-38 object-contain" width={200} height={200} alt="bunny" src={bunny}/>
      </div>
    </div>
  )
}

export default function Bunnies() {
  const ref = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const effect = new KeyframeEffect(
      target,
      [{ transform: 'translateX(-50%)'}],
      { duration: mockData.length * 1000, fill: 'forwards', iterations: Infinity },
    );

    animation.current = new Animation(effect);
    animation.current.play();
    return () => {
      animation.current?.cancel();
    };
  }, []);

  return (
    <div>
      <div>
        <Typography textSize="heading-sm" textColor="text-white" as="p">
          Meet The <span className="text-warning-400">Team</span>!
        </Typography>
      </div>
      <div className="flex overflow-hidden mask-x-from-90% mask-x-to-100% pb-10">
        <div
          onMouseEnter={() => animation.current?.pause()}
          onMouseLeave={() => animation.current?.play()}
        className="flex shrink-0" ref={ref}>
          {mockData.map((props, idx) => (
            <Bunny className='odd:translate-y-7 -mr-7' key={idx} {...props}/>
          ))}
          {mockData.map((props, idx) => (
            <Bunny className='odd:translate-y-7 -mr-7' key={idx} {...props}/>
          ))}
          {mockData.map((props, idx) => (
            <Bunny className='odd:translate-y-7 -mr-7' key={idx} {...props}/>
          ))}
          {mockData.map((props, idx) => (
            <Bunny className='odd:translate-y-7 -mr-7' key={idx} {...props}/>
          ))}
        </div>
      </div>
    </div>
  )
}