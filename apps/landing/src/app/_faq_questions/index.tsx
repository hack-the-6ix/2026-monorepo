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
        {/* <Image
          src="/assets/faq/faq-bg-triangle-1.png"
          alt=""
          width={3103}
          height={856}
        /> */}
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
          {/* <div className="relative">
            <Image
              src="/assets/faq/faq-bg-triangle2.png"
              alt=""
              width={4695}
              height={344}
            />
            <Image
              src="/assets/faq/faq-bg-triangle-3.png"
              alt=""
              width={710}
              height={411}
              className="flex"
            />
          </div> */}
          <Image
            src="/assets/faq/svgviewer-output.svg"
            alt=""
            width={4695}
            height={344}
            // className="w-full h-auto block"
          />
          <Contact />

          {/* <svg
            width="1094"
            height="269"
            viewBox="0 0 1094 269"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="1110.32"
              height="118.518"
              transform="matrix(-0.987751 -0.156038 -0.159002 0.987278 1098 173.238)"
              fill="url(#paint0_linear_892_164)"
              
            />
            <path
              d="M414.693 156.421L402.022 152.373L337.54 48.1561L594.939 86.7963L414.693 156.421Z"
              fill="#BA6701"
              fill-opacity="0.04"
            />
            <defs>
              <linearGradient
                id="paint0_linear_892_164"
                x1="579.498"
                y1="37.7542"
                x2="579.415"
                y2="-0.000692666"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D9D9D9" stop-opacity="0" />
                <stop offset="1" stop-color="#AF4727" stop-opacity="0.14" />
              </linearGradient>
            </defs>
          </svg> */}

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

        <div>
          {/* className=" absolute
    top-[120px]
    left-1/2
    -translate-x-1/2
    w-[120%]
    h-auto
    opacity-70
    pointer-events-none
  "
          /> */}
        </div>
      </div>
    </Section>
  );
}
