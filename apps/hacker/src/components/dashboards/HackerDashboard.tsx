'use client';

import { changeHackerRsvpStatus } from '@/actions';
import DeclinedView from '@/components/status/DeclinedView';
import HackerHomeView from '@/components/status/HackerHomeView';
import NotAppliedView from '@/components/status/NotAppliedView';
import RejectedView from '@/components/status/RejectedView';
import ReviewingView from '@/components/status/ReviewingView';
import { useHacker } from '@/context/HackerContext';

export default function HackerDashboard() {
  const { profile, status, loading, displayName, refresh } = useHacker();

  const handleDeclineInvite = async () => {
    if (!profile) return;
    try {
      await changeHackerRsvpStatus(profile.userId, 'declined', 'S26');
      await refresh();
    } catch (error) {
      console.error('Failed to decline invite:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-white">
        <div className="max-w-md space-y-3 rounded-3xl border border-white/10 bg-black/20 px-6 py-8 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
            Loading
          </p>
          <h1 className="text-3xl font-semibold">
            Fetching your application status
          </h1>
          <p className="text-sm text-white/80">
            We&apos;re checking the backend for the current hacker profile.
          </p>
        </div>
      </div>
    );
  }

  const renderStatusView = () => {
    switch (status) {
      case 'under_review':
        return <ReviewingView name={displayName} />;
      case 'rejected':
        return <RejectedView name={displayName} />;
      case 'waitlist':
        return (
          <HackerHomeView name={displayName} onDecline={handleDeclineInvite} />
        );
      case 'accepted':
        return (
          <HackerHomeView name={displayName} onDecline={handleDeclineInvite} />
        );
      case 'checked-in':
      case 'rsvped':
        return (
          <HackerHomeView name={displayName} onDecline={handleDeclineInvite} />
        );
      case 'declined':
        return <DeclinedView name={displayName} />;
      case 'no_apply':
        return <NotAppliedView name={displayName} />;
      default:
        return <NotAppliedView name={displayName} />;
    }
  };

  return <div className="relative min-h-screen">{renderStatusView()}</div>;
}
