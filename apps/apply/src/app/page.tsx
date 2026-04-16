'use client';

import { Button, Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/about-you/character-sheet');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="gap-4 flex flex-col items-center">
        <Typography textSize="heading-sm" textColor="text-primary-300">
          Welcome
        </Typography>
        <div className="flex flex-row gap-2">
          <Button kind="primary" onClick={handleStart}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
