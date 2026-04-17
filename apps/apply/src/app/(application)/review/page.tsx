'use client';
import { Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';

export default function Review() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/survey');
  };

  return (
    <div className="gap-4 flex flex-col w-[90%] md:w-[70%] fixed left-1/2 -translate-x-1/2 max-w-5xl">
      <Typography
        textSize="heading-sm"
        textColor="text-white"
        textWeight="bold"
      >
        Review
      </Typography>
      <div className="justify-end flex">
        <Navigator handlePrevSection={handlePrevSection} />
      </div>
    </div>
  );
}
