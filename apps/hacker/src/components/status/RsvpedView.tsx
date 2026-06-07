import React, { useState } from 'react';

interface RsvpedViewProps {
  name: string;
  onDecline: () => void;
}

const RsvpedView = ({ name, onDecline }: RsvpedViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      {/* subtitle-sm → md:text-xl text-lg, bold */}
      <p className="font-sans md:text-xl text-lg font-bold text-white mt-6 md:mt-32">
        Welcome back, {name}!
      </p>

      {/* heading-lg → md:text-4xl text-3xl, bold */}
      <h1 className="font-sans md:text-4xl text-3xl font-bold text-white">
        Congratulations, you&apos;ve{' '}
        <span className="text-primary-300">RSVPed! 🎉</span>
      </h1>

      {/* paragraph-lg → md:text-lg text-base, regular */}
      <p className="font-sans md:text-lg text-base font-normal text-white max-w-xs md:max-w-none">
        Welcome to Hack the 6ix 2026! We are excited to have you hack with us.
        <br /> <br />
        Your RSVP has been confirmed. We will reach out with more details as the
        event approaches!
      </p>

      <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-center gap-4">
        {/* secondary button */}
        <button
          className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-full border-2 border-primary-500 py-2.5 px-6 text-primary-500 text-sm font-semibold transition-all hover:border-primary-600 hover:text-primary-600 active:border-primary-700 active:text-primary-700 focus-visible:outline-none w-full md:w-auto max-w-[280px] md:max-w-none hover:bg-slate-500/10 order-2 md:order-1"
          onClick={() => setIsOpen(true)}
        >
          I can no longer attend
        </button>

        {/* primary button - disabled */}
        <button
          disabled
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-300 bg-neutral-300 py-2.5 px-6 text-white text-sm font-semibold w-full md:w-auto max-w-[280px] md:max-w-none order-1 md:order-2 opacity-50 cursor-not-allowed"
        >
          Invitation Accepted
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-[20px] w-full max-w-[300px] p-6 text-center shadow-2xl relative">
            {/* paragraph-lg → md:text-lg text-base, bold */}
            <h2 className="font-sans md:text-lg text-base font-bold text-white mb-3 leading-snug">
              Can no longer attend HT6?
            </h2>
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

export default RsvpedView;
