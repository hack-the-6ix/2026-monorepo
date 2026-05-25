import { Button, Typography } from '@hackthe6ix/ui';

interface WaitlistViewProps {
  name: string;
}

const WaitlistView = ({ name }: WaitlistViewProps) => {
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
        You have been placed on the{' '}
        <span className="text-yellow-300">waitlist.</span>
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-5xl"
      >
        We received an overwhelming amount of applications this year and have
        placed you on the waitlist. We’ll let you know if a spot opens up, so
        make sure to check your inbox!
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

export default WaitlistView;
