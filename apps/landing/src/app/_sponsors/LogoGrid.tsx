'use client';

import Image from 'next/image';
import Link from 'next/link';

import LogoPlaceholder from '../../assets/Free-PlaceHolder-Logo.jpg';

export default function LogoGrid() {
  const platinumSponsors = [
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
  ];

  const goldSponsors = [
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
  ];

  const silverSponsors = [
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
  ];
  const bronzeSponsors = [
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
    {
      src: LogoPlaceholder,
      alt: 'logo',
      href: 'https://orteil.dashnet.org/cookieclicker/',
    },
  ];

  return (
    <div className="pt-8 flex flex-col gap-4 md:gap-8 w-full md:max-w-[50%] items-center">
      <div className="grid grid-cols-1">
        {platinumSponsors.map((sponsor, index) => (
          <Link
            href={sponsor.href}
            key={`${sponsor.alt}-${index}`}
            target="_blank"
            rel="sponsored"
          >
            <Image src={sponsor.src} alt={sponsor.alt} />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 max-w-[85%] gap-3 md:grid-cols-2 md:gap-8 md:max-w-full">
        {goldSponsors.map((sponsor, index) => (
          <Link
            href={sponsor.href}
            key={`${sponsor.alt}-${index}`}
            target="_blank"
            rel="sponsored"
          >
            <Image src={sponsor.src} alt={sponsor.alt} />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-8 max-w-[85%]">
        {silverSponsors.map((sponsor, index) => (
          <Link
            href={sponsor.href}
            key={`${sponsor.alt}-${index}`}
            target="_blank"
            rel="sponsored"
          >
            <Image src={sponsor.src} alt={sponsor.alt} />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-8 max-w-[85%]">
        {bronzeSponsors.map((sponsor, index) => (
          <Link
            href={sponsor.href}
            key={`${sponsor.alt}-${index}`}
            target="_blank"
            rel="sponsored"
          >
            <Image src={sponsor.src} alt={sponsor.alt} />
          </Link>
        ))}
      </div>
    </div>
  );
}
