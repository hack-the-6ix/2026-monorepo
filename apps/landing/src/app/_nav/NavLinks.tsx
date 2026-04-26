import { FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';

const sectionLinks = [
  { name: 'About', href: '#about' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Projects', href: '#projects' },
  { name: 'FAQ', href: '#faq' },
  {
    name: 'Contact Us',
    href: 'mailto:sponsor@hackthe6ix.com?subject=Interest in Sponsoring Hack the 6ix',
  },
];

interface NavLinksProps {
  closeBurger?: () => void;
}

export default function NavLinks({ closeBurger }: NavLinksProps) {
  return (
    <>
      {sectionLinks.map((link, index) => (
        <Link
          key={`navlink-${index}`}
          href={link.href}
          onClick={closeBurger}
          className="text-lg md:text-sm font-medium text-white hover:text-warning-400 focus:text-warning-400 active:text-warning-400 transition-colors flex items-center gap-1.5 animate-text-glow"
        >
          {link.name}
          {link.name == 'Contact Us' ?
            <FaChevronUp />
          : ''}
        </Link>
      ))}
    </>
  );
}
