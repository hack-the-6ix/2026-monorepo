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

export default function NavLinks() {
  return (
    <>
      {sectionLinks.map((link, index) => (
        <Link
          key={`navlink-${index}`}
          href={link.href}
          className="text-lg md:text-sm font-medium text-white hover:text-primary-200 transition-colors flex items-center gap-1.5 animate-text-glow"
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
