'use client';
import { Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';
import { useApplicationContext } from '@/context/ApplicationContext';

export default function Review() {
  const router = useRouter();

  const handlePrevSection = () => {
    router.push('/survey');
  };

  const { formData } = useApplicationContext();

  return (
    <div className="gap-4 flex flex-col w-[90%] md:w-[70%] fixed left-1/2 -translate-x-1/2 max-w-5xl">
      <Typography
        textSize="heading-sm"
        textColor="text-white"
        textWeight="bold"
      >
        Review
      </Typography>
      {Object.entries(formData).map(([sectionName, sectionData]) => (
        <Typography
          key={sectionName}
          textSize="paragraph-lg"
          textColor="text-white"
        >
          {sectionName}: {JSON.stringify(sectionData)}
        </Typography>
      ))}
      <div className="justify-end flex">
        <Navigator handlePrevSection={handlePrevSection} />
      </div>
    </div>
  );
}
