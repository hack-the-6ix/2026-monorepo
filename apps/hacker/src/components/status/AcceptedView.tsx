import React, { useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';
import RsvpCancelDialog from './RsvpCancelDialog';
import { featureFlags } from '@/feature-flags';

interface AcceptedViewProps {
  name: string;
  onDecline: () => void;
  isWaitlistToAccepted: boolean;
}

const AcceptedView = ({
  name,
  onDecline,
  isWaitlistToAccepted,
}: AcceptedViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // If the feature flag is on, everyone accepted can RSVP.
  // If it's off, only people freshly bumped off the waitlist can RSVP.
  const canRsvp = featureFlags.teamFormationOpen || isWaitlistToAccepted;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="mt-6 md:mt-32"
      >
        Welcome back, {name}!
      </Typography>
      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
      >
        {canRsvp ?
          <>
            Congratulations, you&apos;ve been{' '}
            <span className="text-primary-300">accepted!</span>
          </>
        : <>
            Unfortunately, the{' '}
            <span className="text-primary-300">RSVP deadline has passed</span>
          </>
        }
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-none"
      >
        {!canRsvp ?
          'Please come back next year to apply for Hack the 6ix 2027.'
        : <>
            Welcome to Hack the 6ix 2026! We are excited to offer you the
            opportunity to hack with us.
            <br /> <br />
            To confirm your attendance, please RSVP below by{' '}
            <span className="text-yellow-300">July 10th at 11:59 PM ET</span>.
          </>
        }
      </Typography>

      {canRsvp && (
        <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            kind="secondary"
            className="w-full md:w-auto max-w-[280px] md:max-w-none px-6 hover:bg-teal-500/10 transition order-2 md:order-1"
            onClick={() => setIsOpen(true)}
          >
            I can no longer attend
          </Button>
          <Button
            kind="primary"
            className="w-full md:w-auto max-w-[280px] md:max-w-none order-1 md:order-2"
            as={Link}
            href="/rsvp-form"
          >
            Accept Invitation
          </Button>
        </div>
      )}

      {canRsvp && isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-[20px] w-full max-w-[300px] p-6 text-center shadow-2xl relative">
            <Typography
              as="h2"
              textSize="paragraph-lg"
              textWeight="bold"
              textColor="text-white"
              className="mb-3 leading-snug"
            >
              Can no longer attend HT6?
            </Typography>
            <p className="text-[#A0AEC0] text-xs font-normal leading-relaxed mb-6">
              This opportunity will be passed onto a waitlisted participant.{' '}
              <span className="text-[#EF5A5A] font-semibold">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                className="px-5 py-2.5 rounded-full border border-slate-600 hover:border-slate-500 hover:bg-slate-800/30 text-white font-medium active:scale-95 transition-all text-xs"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 rounded-full bg-[#EF5A5A] hover:bg-[#D94545] text-white font-medium active:scale-95 transition-all text-xs shadow-lg shadow-[#EF5A5A]/15"
                onClick={() => {
                  setIsOpen(false);
                  onDecline();
                }}
              >
                I can no longer attend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedView;
