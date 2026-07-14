'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { assets } from './assets';

const platinumSponsors = [
  {
    src: assets.sponsorBase44Logo,
    alt: 'Base44',
    href: 'https://www.base44.com',
  },
];

const goldSponsors = [
  {
    src: assets.sponsorBrucePowerLogo,
    alt: 'Bruce Power',
    href: 'https://www.brucepower.com',
  },
  {
    src: assets.sponsorQnxLogo,
    alt: 'QNX',
    href: 'https://blackberry.qnx.com',
  },
];

const silverSponsors = [
  {
    src: assets.sponsorChexyLogo,
    alt: 'Chexy',
    href: 'https://www.chexy.com',
  },
  {
    src: assets.sponsorShopifyLogo,
    alt: 'Shopify',
    href: 'https://www.shopify.com',
  },
  {
    src: assets.sponsorPoparideLogo,
    alt: 'Poparide',
    href: 'https://www.poparide.com/',
  },
  {
    src: assets.sponsorDeloitteLogo,
    alt: 'Deloitte',
    href: 'https://www.deloitte.com',
  },
  {
    src: assets.sponsorStay22Logo,
    alt: 'Stay22',
    href: 'https://www.stay22.com',
  },
  {
    src: assets.sponsorFreesoloLogo,
    alt: 'Freesolo',
    href: 'https://freesolo.co',
  },
];

const bronzeSponsors: {
  src: StaticImageData;
  alt: string;
  href: string;
  doubleWidth?: boolean;
}[] = [
  {
    src: assets.sponsorBackboardIoLogo,
    alt: 'Backboard.io',
    href: 'https://backboard.io',
  },
  {
    src: assets.sponsorElevenLabsLogo,
    alt: 'ElevenLabs',
    href: 'https://elevenlabs.io',
  },
  {
    src: assets.sponsorFdmLogo,
    alt: 'FDM',
    href: 'https://www.fdmgroup.com',
  },
  {
    src: assets.sponsorWarpLogo,
    alt: 'Warp',
    href: 'https://www.warp.dev',
  },
  {
    src: assets.sponsorQualcommLogo,
    alt: 'Qualcomm',
    href: 'https://www.qualcomm.com',
  },
  {
    src: assets.sponsorMouserElectronicsLogo,
    alt: 'Mouser Electronics',
    href: 'https://www.mouser.com',
  },
  {
    src: assets.sponsorMlhLogo,
    alt: 'Major League Hacking',
    href: 'https://mlh.io',
  },
  {
    src: assets.sponsorExaLogo,
    alt: 'Exa',
    href: 'https://exa.ai',
  },
  {
    src: assets.sponsorPhoebeLogo,
    alt: 'Phoebe',
    href: 'https://www.phoebe.work',
  },
  {
    src: assets.sponsorUnifoldLogo,
    alt: 'Unifold',
    href: 'https://unifold.io',
  },
];

function SponsorCard({
  sponsor,
  cardClassName = 'p-4',
  aspectClassName = 'aspect-[3/2]',
  doubleWidth = false,
}: {
  sponsor: { src: StaticImageData; alt: string; href: string };
  cardClassName?: string;
  aspectClassName?: string;
  doubleWidth?: boolean;
}) {
  const aspectMatch = aspectClassName.match(/\[(\d+)\/(\d+)\]/);
  const aspectStyle =
    doubleWidth && aspectMatch ?
      { aspectRatio: `${Number(aspectMatch[1]) * 2} / ${aspectMatch[2]}` }
    : undefined;

  return (
    <Link
      href={sponsor.href}
      target="_blank"
      rel="sponsored"
      className={`w-full ${doubleWidth ? 'col-span-2' : ''}`}
    >
      <div
        className={`bg-white/75 rounded-3xl ${cardClassName} flex items-center justify-center w-full ${doubleWidth ? '' : aspectClassName}`}
        style={aspectStyle}
      >
        <div className="relative w-full h-full">
          <Image
            src={sponsor.src}
            alt={sponsor.alt}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  );
}

export default function LogoGrid() {
  return (
    <div className="pt-8 flex flex-col gap-4 md:gap-8 w-full md:max-w-[50%] items-center">
      <div className="grid grid-cols-1 max-w-[85%] w-full">
        {platinumSponsors.map((sponsor, index) => (
          <SponsorCard
            key={`${sponsor.alt}-${index}`}
            sponsor={sponsor}
            cardClassName="px-6 py-2 md:px-15 md:py-4"
            aspectClassName="aspect-[4/3] md:aspect-[3/1]"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 max-w-[85%] gap-3 md:grid-cols-2 md:gap-8 w-full">
        {goldSponsors.map((sponsor, index) => (
          <SponsorCard
            key={`${sponsor.alt}-${index}`}
            sponsor={sponsor}
            aspectClassName="aspect-[2/1] md:aspect-[3/2]"
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-[85%] w-full">
        {silverSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.alt}-${index}`}
            className="w-[calc(50%_-_0.375rem)] md:w-[calc(33.333%_-_1.333rem)]"
          >
            <SponsorCard sponsor={sponsor} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-[85%] w-full">
        {bronzeSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.alt}-${index}`}
            className={
              sponsor.doubleWidth ?
                'w-[calc(66.667%_-_0.25rem)] md:w-[calc(50%_-_1rem)]'
              : 'w-[calc(33.333%_-_0.5rem)] md:w-[calc(25%_-_1.5rem)]'
            }
          >
            <SponsorCard sponsor={sponsor} doubleWidth={sponsor.doubleWidth} />
          </div>
        ))}
      </div>
    </div>
  );
}
