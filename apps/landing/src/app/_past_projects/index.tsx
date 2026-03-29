'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from '../../components/Section';
import Full from '../../assets/projects/full.svg';
import Heading from '../../assets/projects/mobile_projects_heading.svg';
import Carousel1 from '../../assets/projects/carousel1.svg';
import Carousel2 from '../../assets/projects/carousel2.svg';
import Carousel3 from '../../assets/projects/carousel3.svg';

const slides = [Carousel1, Carousel2, Carousel3];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <Section
      id="projects"
      backgroundColor="linear-gradient(to bottom, #0D7F75, #0A7E74, #2A8B78, #D68D05)"
      className="!p-0 !min-h-0 overflow-hidden"
    >
      {/* DESKTOP: full.svg centered */}
      <div className="hidden md:block relative w-full">
        <Image
          src={Full}
          alt="Past projects"
          draggable={false}
          style={{
            width: '700%',
            height: 'auto',
            maxWidth: 'none',
            display: 'block',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-53.5%)',
          }}
        />
      </div>

      {/* MOBILE: heading + carousel */}
      <div className="md:hidden flex flex-col pt-12 px-4 pb-12">

        {/* Heading SVG */}
        <Image
          src={Heading}
          alt="Explore previous projects"
          draggable={false}
          className="mx-auto w-full max-w-xs h-auto"
        />

        {/* Carousel */}
        <div className="relative rounded-xl overflow-hidden -mt-20">
          <Image
            src={slides[current]}
            alt={`Project ${current + 1}`}
            draggable={false}
            className="w-full h-auto block"
          />
          <button
            onClick={prev}
            aria-label="Previous project"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9"
            style={{ color: '#00FFE5', fontSize: '36px', lineHeight: 0.5 }}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9"
            style={{ color: '#00FFE5', fontSize: '36px', lineHeight: 1 }}
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Project ${i + 1}`}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: i === current ? '#00FFE5' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
