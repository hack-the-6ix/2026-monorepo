'use client';

import { useState } from 'react';
import Image from 'next/image';

import StepOne from '../app/_fake_page';
import Couch from '../assets/couch.svg';
import DrinkPortrait from '../assets/drink_portrait.svg';
import Floor from '../assets/floor.png';
import GlowSlant from '../assets/glow_slant.png';
import Lamp from '../assets/lamp.svg';
import NeedleThread from '../assets/needle_thread.svg';
import Wall from '../assets/wall.png';

export default function Home() {
  // TODO: mobile background, all the pages empty version
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="font-sans min-h-screen p-8">
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(226deg,#F6BD55_-36.92%,#A53368_4.83%,#3E33AE_84.03%,#100C3F_149.65%)]">
        <Image
          src={Wall}
          alt="Wall"
          className="absolute top-0 w-full h-[95%] object-fill"
        />
        <Image
          src={Floor}
          alt="Floor"
          className="absolute bottom-0 w-full h-[40%] object-fill"
        />
        <Image
          src={DrinkPortrait}
          alt="Drink Portrait"
          className="absolute top-[5vw] lg:top-[4vw] -right-[3vw] lg:h-[8vw] w-auto h-[10vw]"
        />
        <Image
          src={Couch}
          alt="couch"
          className="absolute bottom-0 -right-[5vw] w-auto h-[38vw]"
        />
        <Image
          src={Lamp}
          alt="Lamp"
          className="absolute bottom-[1vw] -left-[5vw] w-auto h-[32vw]"
        />
        <Image
          src={NeedleThread}
          alt="Needle and threads"
          className="absolute -bottom-[10vw] -right-[3vw] w-auto h-[28vw]"
        />
        <Image
          src={GlowSlant}
          alt="Glow"
          className="absolute top-0 right-0 -translate-y-[5vw] translate-x-[5vw] w-full h-180 object-fill mask-[linear-gradient(to_bottom_left,black,transparent)]"
        />
        <div className="absolute inset-0 bg-[rgba(20,4,48,0.2)]"></div>
      </div>

      <main className="relative z-10 w-full max-w-md">
        {step === 1 && <StepOne />}
      </main>
    </div>
  );
}
