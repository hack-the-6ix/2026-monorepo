import { redirect } from 'next/navigation';

import ScheduleView from '@/components/schedule/ScheduleView';
import { featureFlags } from '@/feature-flags';

export default function PublicSchedulePage() {
  if (
    !featureFlags.scheduleReleased &&
    process.env.NEXT_PUBLIC_PREVIEW !== '1'
  ) {
    redirect('/');
  }

  return <ScheduleView />;
}
