import { redirect } from 'next/navigation';

import ScheduleView from '@/components/schedule/ScheduleView';
import { featureFlags } from '@/feature-flags';

export default function SchedulePage() {
  // Schedule isn't public until it's released — send people back to the
  // dashboard if they hit the route directly. (Local preview bypasses this.)
  if (
    !featureFlags.scheduleReleased &&
    process.env.NEXT_PUBLIC_PREVIEW !== '1'
  ) {
    redirect('/');
  }
  return <ScheduleView />;
}
