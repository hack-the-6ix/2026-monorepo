import Image from 'next/image';

export function Background() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Image
        src="/assets/background/background-1.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden md:block object-cover"
      />
      <Image
        src="/assets/background/mobile-bg1.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="md:hidden object-cover object-bottom"
      />
    </div>
  );
}
