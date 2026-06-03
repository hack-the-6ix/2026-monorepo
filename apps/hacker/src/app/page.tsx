'use client';

import RejectedView from '@/components/status/RejectedView';
import ReviewingView from '@/components/status/ReviewingView';
import AcceptedView from '@/components/status/AcceptedView';
import DeclinedView from '@/components/status/DeclinedView';
import WaitlistView from '@/components/status/WaitlistView';
import { useHackerStatus } from '@/context/HackerStatusContext';

export default function Home() {
  const { status, setStatus, loading, displayName } = useHackerStatus();

  const handleDeclineInvite = () => {
    setStatus('declined');
  };

  const renderStatusView = () => {
    switch (status) {
      case 'under_review':
        return <ReviewingView name={displayName} />;
      case 'rejected':
        return <RejectedView name={displayName} />;
      case 'waitlist':
        return <WaitlistView name={displayName} />;
      case 'accepted':
        return (
          <AcceptedView name={displayName} onDecline={handleDeclineInvite} />
        );
      case 'declined':
        return <DeclinedView name={displayName} />;
      default:
        return <ReviewingView name={displayName} />;
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

  return (
    <div className="relative min-h-screen">
      {/* Dynamic application status layout */}
      {renderStatusView()}
    </div>
  );
}
