// 'use client';

import { Typography } from '@hackthe6ix/ui';
import Section from '../../components/Section';
import CategoryPills from './components/CategoryPills';
import Image from 'next/image';
import Contact from './components/Contact';
import FAQSection from './components/FAQSection';

export default function FAQ() {
  return (
    <Section
      id="faq"
      backgroundColor="linear-gradient(to bottom, #D68D05, #BA6600)"
    >
      <div className="relative x">
        <Image
          src="/assets/faq/faq-bg-triangle-1.png"
          alt=""
          width={3103}
          height={856}
        />
        <div className="flex flex-col items-center gap-9">
          <Typography textSize="heading-lg" textColor="text-neutral-50">
            FAQ
          </Typography>
          <div>
            <CategoryPills />
          </div>
          <div className="mt-12">
            <FAQSection />
          </div>
          <Contact />

          {/* <Image
            alt="contact us"
            src="/assets/faq/Group.svg"
            width={205}
            height={456}
            className="w-full max-w-[456px] h-auto"
          >
            <Typography
              textSize="subtitle-sm"
              textColor="text-{F4A42B}"
            ></Typography>
          </Image> */}
        </div>
      </div>
    </Section>
  );
}
