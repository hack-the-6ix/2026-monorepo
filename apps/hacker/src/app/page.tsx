'use client';

import { Suspense, useMemo } from 'react';
import { FiCalendar, FiLogIn } from 'react-icons/fi';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import Logo from '@/app/assets/logo.svg';
import HackerDashboard from '@/components/dashboards/HackerDashboard';
import MentorDashboard from '@/components/dashboards/MentorDashboard';
import OrganizerDashboard from '@/components/dashboards/OrganizerDashboard';
import SponsorDashboard from '@/components/dashboards/SponsorDashboard';
import VolunteerDashboard from '@/components/dashboards/VolunteerDashboard';
import { useHacker } from '@/context/HackerContext';
import { EVENT_LOCATION, EVENT_NAME } from '@/data/event';
import { HT6_API_CLIENT_URL } from '@/lib/api';
import {
  getAvailablePages,
  registerDashboardPage,
} from '@/lib/dashboard-registry';
import SchedulePage from './event/page';
import RSVPForm from './rsvp-form/page';

registerDashboardPage({
  id: 'hacker',
  title: 'Home',
  roles: ['hacker'],
  statuses: [
    'rsvped',
    'checked-in',
    'accepted',
    'waitlist',
    'rejected',
    'declined',
  ],
  component: HackerDashboard,
});
registerDashboardPage({
  id: 'rsvp-form',
  title: 'RSVP Form',
  roles: ['hacker'],
  statuses: ['accepted', 'waitlist'],
  component: RSVPForm,
});
registerDashboardPage({
  id: 'sponsor',
  title: 'Home',
  roles: ['sponsor'],
  component: SponsorDashboard,
});
registerDashboardPage({
  id: 'volunteer',
  title: 'Home',
  roles: ['volunteer'],
  component: VolunteerDashboard,
});
registerDashboardPage({
  id: 'mentor',
  title: 'Home',
  roles: ['mentor'],
  component: MentorDashboard,
});
registerDashboardPage({
  id: 'organizer',
  title: 'Home',
  roles: ['admin'],
  component: OrganizerDashboard,
});
registerDashboardPage({
  id: 'event',
  title: 'Schedule',
  roles: ['hacker', 'sponsor', 'volunteer', 'mentor', 'admin'],
  statuses: ['waitlist', 'accepted', 'rsvped', 'checked-in'],
  component: SchedulePage,
});

function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
    </div>
  );
}

function SignedOutHome() {
  const signIn = () => {
    const loginUrl = new URL(
      `${HT6_API_CLIENT_URL}/auth/login`,
      window.location.origin,
    );
    loginUrl.searchParams.set('redirectUrl', window.location.origin);
    window.location.href = loginUrl.toString();
  };

  return (
    <div className="min-h-screen px-6 py-8 text-white md:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-between gap-12">
        <header className="flex items-center justify-between">
          <Image src={Logo} alt="Hack the 6ix Logo" className="h-10 w-auto" />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center text-center">
          <Typography
            as="p"
            textSize="label"
            textWeight="bold"
            textColor="text-yellow-300"
            className="uppercase tracking-[0.24em]"
          >
            July 17-19, 2026 | {EVENT_LOCATION}
          </Typography>
          <Typography
            as="h1"
            textSize="display"
            textWeight="extra-bold"
            textColor="text-white"
            className="mt-5 max-w-3xl leading-tight"
          >
            {EVENT_NAME}
          </Typography>
          <Typography
            as="p"
            textSize="paragraph-lg"
            textColor="text-white/75"
            className="mt-5 max-w-xl"
          >
            Sign in to access your dashboard, or view public event information.
          </Typography>

          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              iconLeft={<FiLogIn />}
              onClick={signIn}
              className="w-full sm:w-auto"
            >
              Sign in
            </Button>
            <Button
              as="a"
              href="/schedule"
              kind="secondary"
              iconLeft={<FiCalendar />}
              className="w-full border-white/35 bg-white/[0.06] text-white hover:text-white sm:w-auto"
            >
              View schedule
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const { loading, profile, roleTypes, status } = useHacker();

  const pages = useMemo(
    () => getAvailablePages(roleTypes, status),
    [roleTypes, status],
  );

  if (loading) {
    return <Spinner />;
  }

  if (!profile) {
    return <SignedOutHome />;
  }

  if (pages.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-8 text-center pt-8">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
          Heya!
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Unfortunately,{' '}
          <span className="text-primary-300">
            hacker applications are closed
          </span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/80">
          Please come back next year to apply for
          <br />
          Hack the 6ix 2027.
        </p>
        <p className="mt-8 max-w-md text-sm text-white/50">
          p.s. If you are a sponsor, volunteer, or mentor, reach out to a Hack
          the 6ix exec to set up your account.
        </p>
      </div>
    );
  }

  const tab = searchParams.get('tab') || pages[0]?.id;
  const activePage = pages.find((p) => p.id === tab) || pages[0];

  const Component = activePage.component;
  return <Component />;
}

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomeContent />
    </Suspense>
  );
}
