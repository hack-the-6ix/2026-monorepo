'use client';

import React, { useState } from 'react';
import { HackerStatus } from '@/types/status';
import ReviewingView from '@/components/status/ReviewingView';
import RejectedView from '@/components/status/RejectedView';
import WaitlistView from '@/components/status/WaitlistView';
import AcceptedView from '@/components/status/AcceptedView';
import DeclinedView from '@/components/status/DeclinedView';
import { useHackerStatus } from '@/context/HackerStatusContext';

export default function Home() {
  const { status, setStatus } = useHackerStatus();
  const [userName, setUserName] = useState('Michael');

  const handleDeclineInvite = () => {
    setStatus('declined');
  };

  const renderStatusView = () => {
    switch (status) {
      case 'under_review':
        return <ReviewingView name={userName} />;
      case 'rejected':
        return <RejectedView name={userName} />;
      case 'waitlist':
        return <WaitlistView name={userName} />;
      case 'accepted':
        return (
          <AcceptedView
            name={userName}
            onDecline={handleDeclineInvite}
          />
        );
      case 'declined':
        return <DeclinedView name={userName} />;
      default:
        return <ReviewingView name={userName} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Dynamic application status layout */}
      {renderStatusView()}

      {/* 
        DEVELOPMENT STATUS SWITCHER 
        This is a helpful dev tool that lets you toggle between all Figma states 
        instantly to see and style each view. You can remove or disable this 
        when ready to connect your production database!
      */}
      <div className="fixed bottom-4 right-4 bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-2xl flex flex-col gap-2 z-50 text-xs text-white max-w-[200px]">
        <div className="font-bold text-teal-400 border-b border-slate-700 pb-1 mb-1">
          🛠 Dev View Switcher
        </div>
        <div className="flex flex-col gap-1">
          {(
            [
              'under_review',
              'rejected',
              'waitlist',
              'accepted',
              'declined',
            ] as HackerStatus[]
          ).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-left px-2 py-1 rounded transition ${
                status === s ?
                  'bg-teal-500 text-black font-bold'
                : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              {s.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
