import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';
import { Typography } from '@hackthe6ix/ui';

const mediaLinks = [
  {
    href: 'https://facebook.com/hackthe6ix',
    icon: FaFacebook,
    alt: 'Facebook',
  },
  {
    href: 'https://instagram.com/hackthe6ix',
    icon: FaInstagram,
    alt: 'Instagram',
  },
  {
    href: 'https://x.com/hackthe6ix',
    icon: FaXTwitter,
    alt: 'X (Formerly Twitter)',
  },
  {
    href: 'https://www.linkedin.com/company/hackthe6ixofficial',
    icon: FaLinkedin,
    alt: 'LinkedIn',
  },
] as const;

export function Details() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-x-11 gap-y-1 justify-between md:flex-row sm:flex-col">
        <Typography
          className="uppercase"
          textWeight="bold"
          textColor="text-white"
          textSize="paragraph-lg"
          as="p"
        >
          Hack The 6ix
        </Typography>
        <div className="flex md:gap-11 sm:gap-4">
          <Typography
            className="transition-colors hover:underline focus:underline hover:text-warning-400 focus:text-warning-400 active:text-warning-500 outline-none"
            textWeight="semi-bold"
            textColor="text-white"
            textSize="paragraph-sm"
            as="a"
            href="https://cdn.hackthe6ix.com/privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Typography>
          <Typography
            className="transition-colors hover:underline focus:underline hover:text-warning-400 focus:text-warning-400 active:text-warning-500 outline-none"
            textWeight="semi-bold"
            textColor="text-white"
            textSize="paragraph-sm"
            as="a"
            href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            MLH Code of Conduct
          </Typography>
        </div>
      </div>
      <div className="flex gap-x-11 gap-y-2 justify-between md:flex-row sm:flex-col">
        <Typography
          textWeight="medium"
          textColor="text-white"
          textSize="paragraph-sm"
          as="p"
        >
          @ Copyright 2025 Hack the 6ix | Made with ♡ in Toronto
        </Typography>
        <ul className="flex md:gap-10 sm:gap-6">
          {mediaLinks.map((link, idx) => (
            <li key={idx}>
              <a
                className="transition-colors hover:text-warning-400 focus:text-warning-400 active:text-warning-500 text-white outline-none"
                href={link.href}
                aria-label={link.alt}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
