'use client';
import { Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';

export default function LongAnswers() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/experiences');
  };
  const handleNextSection = () => {
    router.push('/survey');
  };

  return (
    <div className="w-full">
      <div className="gap-4 flex flex-col md:w-[60vw]">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
        >
          Long Answers
        </Typography>
        <div className="justify-end flex">
          <Navigator
            handlePrevSection={handlePrevSection}
            handleNextSection={handleNextSection}
            current={1}
            total={3}
          />
        </div>
      </div>
    </div>
  );
}
