'use client';
import { Button, Typography } from '@hackthe6ix/ui';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Review() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/survey');
  };

  return (
    <div className="gap-4 flex flex-col w-full md:max-w-5xl">
      <Typography
        textSize="heading-sm"
        textColor="text-white"
        textWeight="bold"
      >
        Review
      </Typography>
      <div className="justify-end flex flex-row gap-2">
        <Button
          kind="secondary"
          onClick={handlePrevSection}
          iconLeft={<ArrowLeft size="inherit" />}
          className="border-white text-white hover:border-primary-500 hover:text-primary-500"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
