'use client';
import { Button, Input, Typography } from '@hackthe6ix/ui';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CharacterSheet() {
  const router = useRouter();

  const handleNextSection = () => {
    router.push('/about-you');
  };

  return (
    <div className="w-full">
      <div className="gap-4 flex flex-col md:w-[75vw]">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
        >
          Character Sheet
        </Typography>
        <Input
          label="Username"
          hideLabel={false}
          name="username"
          id="username"
          input={{ placeholder: 'Username' }}
        />
        <div className="justify-end flex flex-row gap-2">
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
