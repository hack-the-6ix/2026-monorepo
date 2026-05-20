import React from 'react';
import { Button, Typography } from '@hackthe6ix/ui';

interface ConfirmedViewProps {
  name: string;
  onDecline: () => void;
}

const ConfirmedView = ({ name, onDecline }: ConfirmedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Salutation */}
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="medium"
        textColor="text-white"
        className="opacity-80"
      >
        Welcome back, {name}!
      </Typography>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mt-4 text-white">
        Your spot is <span className="text-[#00D5BE]">confirmed!</span> 🎉
      </h1>

      {/* Paragraph info */}
      <p className="text-gray-300 max-w-xl mt-6 text-lg leading-relaxed">
        We've registered your RSVP for Hack the 6ix 2026. We can't wait to see you on July 17-19! 
        More details on team formation and schedules will be sent to your email shortly.
      </p>

      {/* Change of mind option */}
      <div className="mt-12">
        <Button
          kind="secondary"
          className="px-6 py-2 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 text-sm"
          onClick={onDecline}
        >
          I can no longer attend
        </Button>
      </div>
    </div>
  );
};

export default ConfirmedView;
