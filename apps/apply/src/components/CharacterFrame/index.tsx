import { CSSProperties } from 'react';
import Image from 'next/image';

export type CharacterKey =
  | 'turnip'
  | 'brocoli'
  | 'tomato'
  | 'mushroom'
  | 'lantern';

const CHARACTERS: { key: CharacterKey; src: string }[] = [
  { key: 'turnip', src: '/assets/characters/turnip.svg' },
  { key: 'brocoli', src: '/assets/characters/brocoli.svg' },
  { key: 'tomato', src: '/assets/characters/tomato.svg' },
  { key: 'mushroom', src: '/assets/characters/mushroom.svg' },
  { key: 'lantern', src: '/assets/characters/lantern.svg' },
];

const ACCESSORIES: string[] = [
  '/assets/accessories/Pie.svg',
  '/assets/accessories/macaroon.svg',
  '/assets/accessories/Clover.svg',
];

type AccessoryAnchor = { style: CSSProperties; width: string };

const DEFAULT_ANCHOR: Record<CharacterKey, AccessoryAnchor> = {
  turnip: { style: { top: '22%', left: '38%' }, width: '24%' },
  brocoli: { style: { bottom: '18%', right: '8%' }, width: '26%' },
  tomato: { style: { bottom: '16%', right: '4%' }, width: '26%' },
  mushroom: { style: { top: '4%', left: '36%' }, width: '28%' },
  lantern: { style: { bottom: '2%', right: '6%' }, width: '26%' },
};

const ACCESSORY_OVERRIDES: Partial<
  Record<CharacterKey, Partial<Record<string, AccessoryAnchor>>>
> = {
  turnip: {
    '/assets/accessories/Pie.svg': {
      style: { top: '12%', left: '34%', transform: 'rotate(20deg)' },
      width: '22%',
    },
    '/assets/accessories/Clover.svg': {
      style: { top: '18%', left: '62%' },
      width: '18%',
    },
    '/assets/accessories/macaroon.svg': {
      style: { top: '10%', left: '38%', transform: 'rotate(22deg)' },
      width: '20%',
    },
  },
  brocoli: {
    '/assets/accessories/Pie.svg': {
      style: { top: '62%', left: '54%' },
      width: '20%',
    },
    '/assets/accessories/macaroon.svg': {
      style: { top: '60%', left: '54%' },
      width: '20%',
    },
    '/assets/accessories/Clover.svg': {
      style: { top: '42%', left: '49%', transform: 'rotate(40deg)' },
      width: '18%',
    },
  },
  tomato: {
    '/assets/accessories/Pie.svg': {
      style: { top: '52%', left: '72%', transform: 'rotate(10deg)' },
      width: '22%',
    },
    '/assets/accessories/macaroon.svg': {
      style: { top: '52%', left: '72%', transform: 'rotate(8deg)' },
      width: '20%',
    },
    '/assets/accessories/Clover.svg': {
      style: { top: '24%', left: '56%', transform: 'rotate(8deg)' },
      width: '18%',
    },
  },
  mushroom: {
    '/assets/accessories/Pie.svg': {
      style: { top: '18%', left: '22%', transform: 'rotate(-22deg)' },
      width: '22%',
    },
    '/assets/accessories/macaroon.svg': {
      style: { top: '14%', left: '38%', transform: 'rotate(10deg)' },
      width: '20%',
    },
    '/assets/accessories/Clover.svg': {
      style: { top: '15%', left: '52%', transform: 'rotate(6deg)' },
      width: '18%',
    },
  },
  lantern: {
    '/assets/accessories/Pie.svg': {
      style: { bottom: '22%', right: '24%' },
      width: '22%',
    },
    '/assets/accessories/macaroon.svg': {
      style: { bottom: '20%', right: '26%', transform: 'rotate(10deg)' },
      width: '20%',
    },
    '/assets/accessories/Clover.svg': {
      style: { top: '30%', right: '28%', transform: 'rotate(12deg)' },
      width: '18%',
    },
  },
};

function getAnchor(characterKey: CharacterKey, accessory: string) {
  return (
    ACCESSORY_OVERRIDES[characterKey]?.[accessory] ?? DEFAULT_ANCHOR[characterKey]
  );
}

type CharacterFrameProps = {
  characterKey?: CharacterKey;
  accessory?: string | null;
  className?: string;
};

export function CharacterFrame({
  characterKey = 'turnip',
  accessory,
  className = '',
}: CharacterFrameProps) {
  return (
    <div
      className={`relative aspect-[4/5] w-full max-w-[200px] md:max-w-[300px] ${className}`}
    >
      <Image
        src="/assets/frame.svg"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 80vw, 384px"
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center p-[18%]">
        <div className="relative w-full h-full">
          {CHARACTERS.map((c) => {
            const isActive = c.key === characterKey;
            const padding =
              c.key === 'turnip' || c.key === 'brocoli' ? 'p-[20%]' : 'p-[8%]';
            return (
              <Image
                key={c.key}
                src={c.src}
                alt={isActive ? 'Selected character' : ''}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 60vw, 300px"
                aria-hidden={!isActive}
                className={`absolute inset-0 object-contain ${padding} transition-opacity duration-150 ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            );
          })}
          {ACCESSORIES.map((src) => {
            const isActive = accessory === src;
            const anchor = getAnchor(characterKey, src);
            return (
              <Image
                key={src}
                src={src}
                alt=""
                width={64}
                height={64}
                unoptimized
                aria-hidden={!isActive}
                className={`absolute h-auto drop-shadow-lg transition-opacity duration-150 ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{ ...anchor.style, width: anchor.width }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
