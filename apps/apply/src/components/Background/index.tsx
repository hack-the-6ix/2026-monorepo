import Image from 'next/image';

type BackgroundProps = {
  slide?: number;
  mobileSlide?: number;
};

export function Background({ slide = 1, mobileSlide }: BackgroundProps) {
  const mobile = mobileSlide ?? slide;
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Image
        src={`/assets/background/background-${slide}.svg`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden md:block object-cover"
      />
      <Image
        src={`/assets/background/mobile-bg${mobile}.svg`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="md:hidden object-cover object-bottom"
      />
    </div>
  );
}
