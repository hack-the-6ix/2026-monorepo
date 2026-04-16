'use client';
import { Typography } from '@hackthe6ix/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'About', href: '/about-you/character-sheet' },
  { name: 'Experience', href: '/experiences' },
  { name: 'Long-Answers', href: '/long-answer' },
  { name: 'Survey', href: '/survey' },
  { name: 'Review', href: '/review' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-50 w-[70%] max-w-5xl">
      <div className="flex items-center justify-between">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link key={link.href} href={link.href}>
              <Typography
                textSize="paragraph-lg"
                textWeight="bold"
                className={`${isActive ? 'text-warning-400' : 'text-white'} hover:text-warning-200`}
              >
                {link.name}
              </Typography>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
