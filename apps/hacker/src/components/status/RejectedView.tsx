import React from 'react';
import { Button, Typography } from '@hackthe6ix/ui';

interface RejectedViewProps {
  name: string;
}

const RejectedView = ({ name }: RejectedViewProps) => {
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
        Unfortunately, your hacker application has <span className="text-[#FF5252]">not been selected</span> :(
      </h1>

      {/* Paragraph info */}
      <p className="text-gray-300 max-w-2xl mt-6 text-lg leading-relaxed">
        Thank you for your enthusiasm and dedication in applying to Hack the 6ix 2026. We received an overwhelming number of applications and after careful consideration, we regret to inform you that your application was not chosen for this year's hackathon. We strongly encourage you to try again next year.
      </p>

      {/* Support Action Button */}
      <div className="mt-8">
        <Button
          kind="secondary"
          className="px-8 rounded-full border border-teal-500 text-teal-400"
          onClick={() => {
            window.location.href = 'mailto:hello@hackthe6ix.com';
          }}
        >
          Email HT6
        </Button>
      </div>
    </div>
  );
};

export default RejectedView;
