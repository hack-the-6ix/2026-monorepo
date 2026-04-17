'use client';
import { Button, Input, Typography } from '@hackthe6ix/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutYou() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/about-you/character-sheet');
  };
  const handleNextSection = () => {
    router.push('/experiences');
  };

  return (
    <div className="w-full">
      <div className="gap-4 flex flex-col md:w-[60vw]">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
        >
          About You
        </Typography>
        <Input
          label="Username"
          hideLabel={true}
          name="username"
          id="username"
          input={{ placeholder: 'Username' }}
        />
        <div className="justify-end flex flex-row gap-2">
          <Button
            kind="secondary"
            onClick={handlePrevSection}
            iconLeft={<ArrowLeft size="inherit" />}
            className="border-white text-white hover:border-primary-500 hover:text-primary-500"
          >
            Back
          </Button>
          <Button
            onClick={handleNextSection}
            iconLeft={<ArrowRight size="inherit" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
