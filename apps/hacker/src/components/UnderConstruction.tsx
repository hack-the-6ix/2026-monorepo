'use client';

import { Typography } from '@hackthe6ix/ui';

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 max-w-xl mx-auto gap-6">
      <div className="flex items-center gap-2 bg-yellow-300/10 border border-yellow-300/30 px-4 py-1.5 rounded-full mb-2">
        <Typography
          as="span"
          textSize="label"
          textWeight="bold"
          className="text-yellow-300 uppercase tracking-widest text-[10px]"
        >
          System Status: Launching Soon
        </Typography>
      </div>

      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
        className="tracking-tight text-4xl md:text-6xl leading-tight"
      >
        Hacker Portal is <br />
        <span className="text-primary-300 drop-shadow-[0_0_15px_rgba(114,214,190,0.4)]">
          Under Construction
        </span>
      </Typography>

      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="opacity-80 max-w-md leading-relaxed"
      >
        We are currently polishing the dashboard, setting up team formations,
        and brewing our launch builds. Check back shortly!
      </Typography>
    </div>
  );
};

export default UnderConstruction;
