'use client';
import { Input, Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import Navigator from '@/components/Navigator';

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
        <div className="flex justify-end">
          <Navigator
            handleNextSection={handleNextSection}
            current={1}
            total={2}
          />
        </div>
      </div>
    </div>
  );
}
