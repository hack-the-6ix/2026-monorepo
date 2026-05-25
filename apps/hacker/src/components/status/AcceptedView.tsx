import { Button, Typography } from '@hackthe6ix/ui';

interface AcceptedViewProps {
  name: string;
  onDecline: () => void;
}

const AcceptedView = ({ name, onDecline }: AcceptedViewProps) => {
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
        Congratulations, you've been{' '}
        <span className="text-primary-300">accepted!</span>
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-none"
      >
        Welcome to Hack the 6ix 2026! We are excited to offer you the
        opportunity to hack with us.
        <br /> <br />
        To confirm your attendance, please RSVP below by{' '}
        <span className="text-yellow-300">Date</span>.
      </Typography>

      <div className="mt-4 w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <Button
          kind="secondary"
          className="w-full md:w-auto max-w-[280px] md:max-w-none px-6 hover:bg-teal-500/10 transition order-2 md:order-1"
          onClick={onDecline}
        >
          I can no longer attend
        </Button>
        <Button
          kind="primary"
          className="w-full md:w-auto max-w-[280px] md:max-w-none order-1 md:order-2"
        >
          Accept Invitation
        </Button>
      </div>
    </div>
  );
};

export default AcceptedView;
