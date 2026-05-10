import Link from 'next/link';
import { Typography } from '@hackthe6ix/ui';

export const navSections = [
  { id: 'about-you', label: 'About You', href: '/character-select' },
  { id: 'experiences', label: 'Experiences', href: '/experiences' },
  { id: 'long-answer', label: 'Long-Answer', href: '/long-answer' },
  { id: 'survey', label: 'Survey', href: '/survey' },
  { id: 'review', label: 'Review', href: '/review' },
] as const;

export type NavSectionId = (typeof navSections)[number]['id'];

type NavBarProps = {
  active: NavSectionId;
};

export function NavBar({ active }: NavBarProps) {
  return (
    <nav className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-5 md:justify-center md:px-12 md:py-6">
      <ul className="hidden md:flex items-center gap-12">
        {navSections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <Link href={section.href}>
                <Typography
                  as="span"
                  textSize="paragraph-lg"
                  textWeight={isActive ? 'bold' : 'medium'}
                  textColor={isActive ? 'text-yellow-300' : 'text-white/70'}
                  className="hover:text-white transition-colors"
                >
                  {section.label}
                </Typography>
              </Link>
            </li>
          );
        })}
      </ul>

      <span className="md:hidden" />
      <button
        type="button"
        aria-label="Open menu"
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <span className="block h-0.5 w-6 bg-white rounded-full" />
        <span className="block h-0.5 w-6 bg-white rounded-full" />
        <span className="block h-0.5 w-6 bg-white rounded-full" />
      </button>
    </nav>
  );
}
