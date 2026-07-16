'use client';

import { useMemo } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Logo from '@/app/assets/logo.svg';
import DiscordNavButton from '@/components/DiscordNavButton';
import { useHacker } from '@/context/HackerContext';
import { featureFlags } from '@/feature-flags';
import type { DashboardPage, RoleType } from '@/lib/dashboard-registry';
import { getAvailablePages } from '@/lib/dashboard-registry';
import { roleConfig } from '@/lib/roles';

const roleOrder: RoleType[] = [
  'hacker',
  'sponsor',
  'volunteer',
  'mentor',
  'admin',
];

const Sidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status, roleTypes } = useHacker();

  const pages = useMemo(
    () => getAvailablePages(roleTypes, status),
    [roleTypes, status],
  );

  const activeTab =
    pathname === '/' ? searchParams.get('tab') || pages[0]?.id : null;
  const canAccessSchedule =
    featureFlags.scheduleReleased || process.env.NEXT_PUBLIC_PREVIEW === '1';

  const eventPages = pages.filter(
    (p) => p.id === 'event' || p.id.startsWith('event-'),
  );
  const rolePages = pages
    .filter((p) => p.id !== 'event' && !p.id.startsWith('event-'))
    .sort(
      (a, b) => roleOrder.indexOf(a.roles[0]) - roleOrder.indexOf(b.roles[0]),
    );

  const groupedRoles = rolePages.reduce(
    (acc, page) => {
      const roleType = page.roles[0];
      if (!acc[roleType]) acc[roleType] = [];
      acc[roleType].push(page);
      return acc;
    },
    {} as Record<string, DashboardPage[]>,
  );

  const hasEventNav = eventPages.length > 0 || canAccessSchedule;

  return (
    <nav className="flex flex-col h-full px-6">
      <div className="py-12 flex justify-center">
        <Image src={Logo} alt="Hack the 6ix Logo" />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col items-center gap-1">
        {Object.entries(groupedRoles).map(([roleType, pages]) => {
          const cfg = roleConfig[roleType as RoleType];
          if (!cfg) return null;

          return (
            <div key={roleType} className="w-full flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 py-1">
                <span
                  className="inline-block size-1.5 rounded-full"
                  style={{ backgroundColor: cfg.hex }}
                />
                <Typography
                  as="p"
                  textSize="label"
                  textWeight="bold"
                  className="uppercase tracking-wider"
                  style={{ color: cfg.hex }}
                >
                  {cfg.label}
                </Typography>
              </div>
              {pages.map((page) => {
                const isActive = activeTab === page.id;
                return (
                  <Link
                    key={page.id}
                    href={`/?tab=${page.id}`}
                    className="w-full text-center py-2 rounded-lg transition"
                  >
                    <Typography
                      as="p"
                      textSize="paragraph-sm"
                      textWeight="semi-bold"
                      style={{ color: isActive ? cfg.hex : undefined }}
                      className={isActive ? '' : 'text-white/70'}
                    >
                      {isActive && '➢ '}
                      {page.title}
                    </Typography>
                  </Link>
                );
              })}
            </div>
          );
        })}

        {rolePages.length > 0 && hasEventNav && (
          <div className="w-3/4 border-t border-white/10 my-3" />
        )}

        {hasEventNav && (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-1.5 py-1">
              <span className="inline-block size-1.5 rounded-full bg-white/40" />
              <Typography
                as="p"
                textSize="label"
                textWeight="bold"
                className="uppercase tracking-wider text-white/60"
              >
                Event
              </Typography>
            </div>
            {eventPages.map((page) => {
              const isActive = activeTab === page.id;
              return (
                <Link
                  key={page.id}
                  href={`/?tab=${page.id}`}
                  className="w-full text-center py-2 rounded-lg transition"
                >
                  <Typography
                    as="p"
                    textSize="paragraph-sm"
                    textWeight="semi-bold"
                    className={isActive ? 'text-white' : 'text-white/70'}
                  >
                    {isActive && '➢ '}
                    {page.title}
                  </Typography>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-auto flex w-full flex-col items-stretch text-center pb-8">
        <div className="flex items-center justify-center">
          <div>
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="semi-bold"
              textColor="text-white"
            >
              Event date:
            </Typography>
            <Typography
              as="p"
              textSize="paragraph-lg"
              textWeight="semi-bold"
              textColor="text-[#F6BD55]"
              className="mt-2 text-center"
            >
              July 17-19, 2026 <br />
              Bahen Centre
            </Typography>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col items-stretch gap-4">
          {(['rsvped', 'checked-in'].includes(status) ||
            roleTypes.some((r) => r !== 'hacker')) && <DiscordNavButton />}
          <Button
            kind="secondary"
            className="w-full px-16 rounded-full"
            onClick={() => {
              console.log('log out');
            }}
          >
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="semi-bold"
              textColor="text-[#00D5BE]"
            >
              Log out
            </Typography>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
