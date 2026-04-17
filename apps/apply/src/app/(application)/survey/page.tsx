'use client';
import { Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';

export default function Survey() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/long-answer');
  };
  const handleNextSection = () => {
    router.push('/review');
  };

  return (
    <div className="w-full">
      <div className="gap-4 flex flex-col md:w-[60vw]">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
        >
          Survey
        </Typography>
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
