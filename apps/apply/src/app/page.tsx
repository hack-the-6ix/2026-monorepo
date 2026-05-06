import { Button, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="gap-4 flex flex-col items-center">
        <Typography textSize="heading-sm" textColor="text-primary-300">
          Welcome
        </Typography>
        <div className="flex flex-row gap-2">
          <Button href="/about-you/character-sheet" kind="primary" as={Link}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
