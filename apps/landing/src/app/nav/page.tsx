'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NavLinks = [
  { name: 'About', href: '#about' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Projects', href: '#project' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact Us ^', href: '' },
];

// TODO: fix the nav to be accurate to the figma and use ui library
export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScroll) {
        // scrolling up
        setVisible(true);
      } else {
        setVisible(false);
      }

      setLastScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`px-16 z-20 fixed top-0 w-full h-32 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto h-20 flex items-center gap-10">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-white"
        >
          HACK THE 6IX
        </Link>

        <div className="hidden md:flex gap-8">
          {NavLinks.map((link, index) => (
            <Link
              key={`navlink-${index}`}
              href={link.href}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
