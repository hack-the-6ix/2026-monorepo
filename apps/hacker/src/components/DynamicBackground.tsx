'use client';

import Image from 'next/image';

import { useHacker } from '@/context/HackerContext';

const DynamicBackground = () => {
  const { status } = useHacker();

  const isPostAcceptance =
    status === 'accepted' || status === 'declined' || status === 'rsvped';

  const desktopSrc =
    isPostAcceptance ? '/bg-post-acceptance.png' : '/bg-pre-acceptance.png';
  const mobileSrc =
    isPostAcceptance ?
      '/bg-mobile-post-acceptance.png'
    : '/bg-mobile-pre-acceptance.png';

  return (
    <>
      <div className="block md:hidden fixed inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          key={mobileSrc}
          src={mobileSrc}
          alt="Mobile Background"
          fill
          priority
          className="object-cover object-[70%_center] scale-110 transition-all duration-500"
        />
      </div>

      <div className="hidden md:block fixed inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          key={desktopSrc}
          src={desktopSrc}
          alt="Desktop Background"
          fill
          priority
          className="object-cover object-center transition-all duration-500"
        />
      </div>
    </>
  );
};

export default DynamicBackground;
