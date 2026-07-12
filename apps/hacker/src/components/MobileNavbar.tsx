'use client';
import { useMemo, useState } from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import DiscordNavButton from '@/components/DiscordNavButton';
import { useHacker } from '@/context/HackerContext';
import { featureFlags } from '@/feature-flags';
import type { DashboardPage, RoleType } from '@/lib/dashboard-registry';
import { getAvailablePages } from '@/lib/dashboard-registry';
import { roleConfig } from '@/lib/roles';
import MenuLegs from '../app/assets/nav/legs.png';
import MenuBody from '../app/assets/nav/radish_body.png';
import MenuSwing from '../app/assets/nav/swing.png';

import './index.css';

const roleOrder: RoleType[] = [
  'hacker',
  'sponsor',
  'volunteer',
  'mentor',
  'admin',
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status, roleTypes } = useHacker();
  const [burgerVisible, setBurgerVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const pages = useMemo(
    () => getAvailablePages(roleTypes, status),
    [roleTypes, status],
  );

  const activeTab =
    pathname === '/' ? searchParams.get('tab') || pages[0]?.id : null;
  const canAccessRsvpForm = status === 'accepted' || status === 'waitlist';
  const canAccessSchedule =
    featureFlags.scheduleReleased || process.env.NEXT_PUBLIC_PREVIEW === '1';

  const eventPage = pages.find((p) => p.id === 'event');
  const rolePages = pages
    .filter((p) => p.id !== 'event')
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
  const hasEventNav = Boolean(eventPage) || canAccessSchedule;

  if (pathname === '/thank-you') {
    return null;
  }

  const openBurger = () => {
    setBurgerVisible(true);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBurger = () => {
    setIsClosing(true);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setBurgerVisible(false);
      setIsClosing(false);
    }, 500);
  };

  return (
    <div>
      <div className="z-150 relative flex md:hidden w-full justify-end">
        <button
          onClick={burgerVisible && !isClosing ? closeBurger : openBurger}
          aria-label="Toggle Menu"
        >
          <div
            className={`nav-toggle ${burgerVisible && !isClosing ? 'active' : ''}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      {burgerVisible && (
        <>
          <div
            className={`fixed inset-0 z-100 bg-neutral-50/50 transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden="true"
            onClick={closeBurger}
          />
          <div
            className={`fixed inset-x-0 top-0 z-120 md:hidden flex justify-center ${isClosing ? 'animate-menu-hide' : 'animate-menu-reveal'}`}
          >
            {/* Wrapper that holds both siblings so they stack relative to each other */}
            <div className="relative w-full">
              {/* Menu */}
              <div className="relative w-full bg-[linear-gradient(210deg,#14204C,#21657F)] rounded-b-3xl py-15 pb-15 flex flex-col gap-5 z-10 items-center">
                <div className="absolute inset-0 bg-black/50 mix-blend-overlay rounded-b-3xl pointer-events-none" />

                {Object.entries(groupedRoles).map(([roleType, pages]) => {
                  const cfg = roleConfig[roleType as RoleType];
                  if (!cfg) return null;

                  return (
                    <div
                      key={roleType}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-block size-1.5 rounded-full"
                          style={{ backgroundColor: cfg.hex }}
                        />
                        <Typography
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
                            onClick={closeBurger}
                          >
                            <Typography
                              textSize="paragraph-lg"
                              textWeight="bold"
                              style={{
                                color: isActive ? cfg.hex : undefined,
                              }}
                              className={isActive ? '' : 'text-white'}
                            >
                              {page.title}
                            </Typography>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}

                {rolePages.length > 0 && hasEventNav && (
                  <div className="w-1/2 border-t border-white/10" />
                )}

                {hasEventNav && (
                  <div className="flex flex-col items-center gap-1">
                    <Typography
                      textSize="label"
                      textWeight="bold"
                      className="uppercase tracking-wider text-white/60"
                    >
                      Event
                    </Typography>
                    {eventPage && (
                      <Link href="/?tab=event" onClick={closeBurger}>
                        <Typography
                          textSize="paragraph-lg"
                          textWeight="bold"
                          className={
                            activeTab === 'event' && pathname === '/' ?
                              'text-primary-300'
                            : 'text-white'
                          }
                        >
                          Schedule &amp; Materials
                        </Typography>
                      </Link>
                    )}
                    {canAccessSchedule && (
                      <Link href="/schedule" onClick={closeBurger}>
                        <Typography
                          textSize="paragraph-lg"
                          textWeight="bold"
                          className={
                            pathname === '/schedule' ? 'text-primary-300' : (
                              'text-white'
                            )
                          }
                        >
                          Schedule
                        </Typography>
                      </Link>
                    )}
                  </div>
                )}

                {canAccessRsvpForm && (
                  <Link href="/rsvp-form" onClick={closeBurger}>
                    <Typography
                      textSize="paragraph-lg"
                      textWeight="bold"
                      className={
                        pathname === '/rsvp-form' ? 'text-primary-300' : (
                          'text-white'
                        )
                      }
                    >
                      RSVP Form
                    </Typography>
                  </Link>
                )}

                {(['rsvped', 'waitlist', 'checked-in'].includes(status) ||
                  roleTypes.some((r) => r !== 'hacker')) && (
                  <div className="relative z-40 w-full max-w-xs px-8 mt-4">
                    <DiscordNavButton />
                  </div>
                )}
              </div>

              {/* Turnip boi */}
              <div className="absolute top-full inset-x-0 flex justify-center pointer-events-none z-0 -mt-6">
                <div className="flex flex-col items-center animate-swing origin-top will-change-transform">
                  <div className="absolute flex flex-col items-center translate-y-17">
                    <Image
                      src={MenuBody}
                      alt="radish body"
                      width={180}
                      height={180}
                      className="z-30"
                    />
                    <Image
                      src={MenuLegs}
                      alt="radish legs"
                      width={80}
                      height={80}
                      className="animate-dangle origin-top will-change-transform -translate-y-6 -translate-x-0.5 z-10"
                    />
                  </div>
                  <Image
                    src={MenuSwing}
                    alt="swing set"
                    width={150}
                    height={150}
                    className="mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
