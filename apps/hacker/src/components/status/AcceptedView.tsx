import { Button, Typography } from '@hackthe6ix/ui';

interface AcceptedViewProps {
  name: string;
  onAccept: () => void;
  onDecline: () => void;
}

const AcceptedView = ({ name, onAccept, onDecline }: AcceptedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="mt-48"
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
      >
        Welcome to Hack the 6ix 2026! We are excited to offer you the
        opportunity to hack with us.
        <br /> <br />
        To confirm your attendance, please RSVP below by{' '}
        <span className="text-yellow-300">Date</span>.
      </Typography>

      <div className="mt-4 flex flex-row items-center justify-center gap-4">
        <Button
          kind="secondary"
          className="px-6 hover:bg-teal-500/10 transition"
        >
          I can no longer attend
        </Button>
        <Button kind="primary">Accept Invitation</Button>
      </div>
    </div>
  );
};

export default AcceptedView;
