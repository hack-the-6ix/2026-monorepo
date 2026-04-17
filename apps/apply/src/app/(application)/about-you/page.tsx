'use client';
import { Input, Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';

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
        <div className="flex justify-end">
          <Navigator
            handlePrevSection={handlePrevSection}
            handleNextSection={handleNextSection}
            current={1}
            total={4}
          />
        </div>
      </div>
    </div>
  );
}
