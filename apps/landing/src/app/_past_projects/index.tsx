'use client';

import { useState } from 'react';
import Section from '../../components/Section';
import full from '../../assets/projects/full.svg';
import heading from '../../assets/projects/mobile_projects_heading.svg';
import carousel1 from '../../assets/projects/carousel1.svg';
import carousel2 from '../../assets/projects/carousel2.svg';
import carousel3 from '../../assets/projects/carousel3.svg';

const slides = [carousel1, carousel2, carousel3];

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
      <div className="hidden md:block" style={{ position: 'relative', width: '100%' }}>
        <img
          src={full.src}
          alt="Past projects"
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
        <img
          src={heading.src}
          alt="Explore previous projects"
          className="mx-auto w-full max-w-xs block"
        />

        {/* Carousel */}
        <div className="relative rounded-xl overflow-hidden -mt-20">
          <img
            src={slides[current].src}
            alt={`Project ${current + 1}`}
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
