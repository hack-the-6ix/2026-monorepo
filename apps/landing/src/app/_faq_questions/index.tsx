'use client';

import { useState } from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Triangle1 from '@/assets/faq/faq-bg-triangle-1.svg';
import Slant2 from '@/assets/faq/faq-bg-triangle-4.png';
import Slant1 from '@/assets/faq/svgviewer-output.svg';
import Section from '../../components/Section';
import CategoryPills from './components/CategoryPills';
import Contact from './components/Contact';
import FAQSection from './components/FAQSection';

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('General');

  return (
    <Section
      id="faq"
      backgroundColor="linear-gradient(to bottom, #D68D05, #D68D05, #BA6600)"
      className="py-0! relative"
    >
      <div className="relative w-full overflow-visible">
        <Image
          src={Triangle1}
          alt="pathway"
          width={3181}
          height={987}
          className="absolute -top-[45vw] left-0 w-[180vw] max-w-none h-auto z-10 -translate-x-[30%] md:-translate-x-[25%] mask-[linear-gradient(to_bottom,black_78%,transparent_100%)]"
        />
        <div className="relative z-50 flex flex-col items-center gap-6 pb-24">
          <Typography textSize="heading-lg" textColor="text-neutral-50">
            FAQ
          </Typography>
          <div>
            <CategoryPills
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="mt-6 min-h-[250px] md:min-h-[400px]">
            <FAQSection category={selectedCategory} />
          </div>
          <div className="-mt-8">
            <Image src={Slant1} alt="" width={2000} height={344} />
          </div>
          <Contact />
          <Image src={Slant2} alt="" width={4695} height={344} />
        </div>
      </div>
    </Section>
  );
}
