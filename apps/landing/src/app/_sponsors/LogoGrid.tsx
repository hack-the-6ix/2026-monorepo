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
    src: assets.sponsorDeloitteLogo,
    alt: 'Deloitte',
    href: 'https://www.deloitte.com',
  },
  {
    src: assets.sponsorPoparideLogo,
    alt: 'Poparide',
    href: 'https://www.poparide.com',
  },
  {
    src: assets.sponsorShopifyLogo,
    alt: 'Shopify',
    href: 'https://www.shopify.com',
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
    src: assets.sponsorTMURogersCyberSecureLogo,
    alt: 'TMU Rogers Cybersecure Program',
    href: 'https://cybersecurecatalyst.ca/',
    doubleWidth: true,
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
    doubleWidth && aspectMatch
      ? { aspectRatio: `${Number(aspectMatch[1]) * 2} / ${aspectMatch[2]}` }
      : undefined;

  return (
    <Link
      href={sponsor.href}
      target="_blank"
      rel="sponsored"
      className={`w-full ${doubleWidth ? 'col-span-2' : ''}`}
    >
      <div
        className={`bg-white rounded-xl ${cardClassName} flex items-center justify-center w-full ${doubleWidth ? '' : aspectClassName}`}
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
          <SponsorCard key={`${sponsor.alt}-${index}`} sponsor={sponsor} cardClassName="px-15 py-4" aspectClassName="aspect-[2/1]" />
        ))}
      </div>
      <div className="grid grid-cols-1 max-w-[85%] gap-3 md:grid-cols-2 md:gap-8 w-full">
        {goldSponsors.map((sponsor, index) => (
          <SponsorCard key={`${sponsor.alt}-${index}`} sponsor={sponsor} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8 max-w-[85%] w-full">
        {silverSponsors.map((sponsor, index) => (
          <SponsorCard key={`${sponsor.alt}-${index}`} sponsor={sponsor} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-8 max-w-[85%] w-full">
        {bronzeSponsors.map((sponsor, index) => (
          <SponsorCard
            key={`${sponsor.alt}-${index}`}
            sponsor={sponsor}
            doubleWidth={sponsor.doubleWidth}
          />
        ))}
      </div>
    </div>
  );
}
