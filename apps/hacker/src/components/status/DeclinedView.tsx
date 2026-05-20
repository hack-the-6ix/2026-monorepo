import React from 'react';
import { Typography } from '@hackthe6ix/ui';

interface DeclinedViewProps {
  name: string;
}

const DeclinedView = ({ name }: DeclinedViewProps) => {
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
        Thank you for <span className="text-[#FF5252]">letting us know</span>.
      </h1>

      {/* Paragraph info */}
      <p className="text-gray-300 max-w-xl mt-6 text-lg leading-relaxed">
        We are sorry you won't be able to make it to Hack the 6ix 2026. Your spot has been released 
        to a hacker on our waitlist. We hope to see you at our future events!
      </p>
    </div>
  );
};

export default DeclinedView;
