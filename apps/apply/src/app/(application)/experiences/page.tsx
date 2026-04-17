'use client';
import { Input, Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';

export default function Experiences() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/about-you');
  };
  const handleNextSection = () => {
    router.push('/long-answer');
  };

  return (
    <div className="w-full">
      <div className="gap-4 flex flex-col md:w-[60vw]">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
        >
          Your Experiences
        </Typography>
        <Input
          label="Username"
          hideLabel={true}
          name="username"
          id="username"
          input={{ placeholder: 'Username' }}
        />
        <div className="justify-end flex">
          <Navigator
            handlePrevSection={handlePrevSection}
            handleNextSection={handleNextSection}
            current={1}
            total={5}
          />
        </div>
      </div>
    </div>
  );
}
