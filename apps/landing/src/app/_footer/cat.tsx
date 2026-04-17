import Image from 'next/image';

import cat from './assets/cat.png';
import lamp from './assets/lamp.png';
import paw from './assets/paw.png';

export default function Cat() {
  return (
    <div className="bg-linear-to-b from-footer-wall-from to-footer-wall-to relative">
      <div className="flex max-w-content pr-content-padding m-auto relative">
        <Image
          className="md:max-w-150 max-w-75 w-full mt-auto bottom-0 absolute z-1"
          src={lamp}
          width={600}
          alt="lamp"
        />
        <div className="flex ml-auto md:pb-31 pb-17 relative">
          <Image
            className="md:w-80 w-36 mb-auto z-1"
            src={cat}
            width={600}
            alt="cat"
          />
          <Image
            className="w-[80%] -bottom-[5%] -right-[5%] left-auto absolute z-2"
            src={paw}
            width={500}
            alt="paw"
          />
        </div>
      </div>
      <div className="w-[calc(100%-var(--spacing-footer-wall-bend))] inset-0 left-auto h-full bg-linear-to-r from-black/5 to-transparent to-20% absolute" />
    </div>
  );
}
