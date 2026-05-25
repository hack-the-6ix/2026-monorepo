import { Button, Typography } from '@hackthe6ix/ui';

interface RejectedViewProps {
  name: string;
}

const RejectedView = ({ name }: RejectedViewProps) => {
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
        Unfortunately, your hacker
        <br /> application has{' '}
        <span className="text-error-500">not been selected</span> :(
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-5xl"
      >
        Thank you for your enthusiasm and dedication in applying to Hack the 6ix
        2026. We received an overwhelming number of applications and after
        careful consideration, we regret to inform you that your application was
        not chosen for this year's hackathon. We strongly encourage you to try
        again next year.
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="mt-1"
      >
        Got questions? Feel free to reach out to us!
      </Typography>

      <div className="mt-4 w-full flex justify-center">
        <Button
          kind="secondary"
          className="w-full md:w-auto max-w-[280px] md:max-w-none px-6 hover:bg-teal-500/10 transition"
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
