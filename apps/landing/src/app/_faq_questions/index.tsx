'use client';

import { useState } from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Section from '../../components/Section';
import CategoryPills from './components/CategoryPills';
import Contact from './components/Contact';
import FAQSection from './components/FAQSection';

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('General');

  return (
    <Section
      id="faq"
      backgroundColor="linear-gradient(to bottom, #D68D05, #BA6600)"
      className="py-0! relative z-10"
    >
      <div className="relative w-full overflow-visible">
        <Image
          src="/assets/faq/faq-bg-triangle-1.png"
          alt=""
          width={3103}
          height={856}
          className="absolute -top-[48vw] left-0 w-full h-auto z-0"
        />
        <div className="relative z-10 flex flex-col items-center gap-6 -mt-[15vw] pb-24">
          <Typography textSize="heading-lg" textColor="text-neutral-50">
            FAQ
          </Typography>
          <div>
            <CategoryPills
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="mt-6">
            <FAQSection category={selectedCategory} />
          </div>
          <div className="-mt-8">
            <Image
              src="/assets/faq/svgviewer-output.svg"
              alt=""
              width={2000}
              height={344}
            />
          </div>
          <Contact />
          <Image
            src="/assets/faq/faq-bg-triangle-4.png"
            alt=""
            width={4695}
            height={344}
          />
        </div>
      </div>
    </Section>
  );
}
