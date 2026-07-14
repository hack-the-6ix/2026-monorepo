'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import EventDashboard from '@/components/dashboards/EventDashboard';
import HackerDashboard from '@/components/dashboards/HackerDashboard';
import MentorDashboard from '@/components/dashboards/MentorDashboard';
import OrganizerDashboard from '@/components/dashboards/OrganizerDashboard';
import SponsorDashboard from '@/components/dashboards/SponsorDashboard';
import VolunteerDashboard from '@/components/dashboards/VolunteerDashboard';
import RsvpedView from '@/components/status/RsvpedView';
import { useHacker } from '@/context/HackerContext';
import {
  getAvailablePages,
  registerDashboardPage,
} from '@/lib/dashboard-registry';

registerDashboardPage({
  id: 'hacker',
  title: 'Home',
  roles: ['hacker'],
  statuses: ['rsvped', 'checked-in', 'accepted', 'waitlist'],
  component: HackerDashboard,
});
registerDashboardPage({
  id: 'ticket',
  title: 'My Ticket',
  roles: ['hacker'],
  statuses: ['rsvped', 'checked-in'],
  component: RsvpedView,
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
  title: 'Schedule & Materials',
  roles: ['hacker', 'sponsor', 'volunteer', 'mentor', 'admin'],
  statuses: ['rsvped', 'checked-in'],
  component: EventDashboard,
});

function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const { loading, roleTypes, status } = useHacker();

  const pages = useMemo(
    () => getAvailablePages(roleTypes, status),
    [roleTypes, status],
  );

  if (loading) {
    return <Spinner />;
  }

  const isHackerNotRsvped =
    roleTypes?.length === 1 &&
    roleTypes[0] === 'hacker' &&
    status &&
    !['rsvped', 'checked-in'].includes(status);

  if (isHackerNotRsvped) {
    return (
      <div className="relative min-h-screen">
        <HackerDashboard />
      </div>
    );
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
