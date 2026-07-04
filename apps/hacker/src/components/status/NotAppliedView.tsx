import { Button, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';

interface NotAppliedViewProps {
  name: string;
}

const NotAppliedView = ({ name }: NotAppliedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8 space-y-4">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="mt-6 md:mt-32"
      >
        Heya, {name}!
      </Typography>

      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
        className="leading-tight"
      >
        Looks like you haven&apos;t applied yet!
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-none"
      >
        ☟ don&apos;t miss your chance ☟
      </Typography>
      <Button
        as={Link}
        href="https://2026.apply.hackthe6ix.com/"
        target="_blank"
      >
        Application portal
      </Button>
    </div>
  );
};

export default NotAppliedView;
