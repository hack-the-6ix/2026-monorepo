import { Typography } from '@hackthe6ix/ui';

import TicketImage from '../TicketImage';

const RsvpedView = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:pr-10 gap-17 py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center -translate-y-20 md:min-h-[80vh] md:w-[50%]">
        <Typography
          as="p"
          textSize="subtitle-sm"
          textWeight="bold"
          textColor="text-white"
          className="mt-6 md:mt-32"
        >
          You’re all set!
        </Typography>
        <Typography
          as="h1"
          textSize="heading-lg"
          textWeight="bold"
          textColor="text-primary-400"
        >
          RSVP confirmed! 🎉
        </Typography>
        <Typography
          as="p"
          textSize="paragraph-lg"
          textWeight="regular"
          textColor="text-white"
          className="max-w-xs md:max-w-none"
        >
          We&apos;ve received your information and can&apos;t wait to see what
          you&apos;ll build at Hack the 6ix! <br />
          Keep an eye on our emails for event updates, announcements, and next
          steps.
        </Typography>
      </div>
      <TicketImage />
    </div>
  );
};

export default RsvpedView;
