'use client';

import { useState } from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Background from '@/assets/projects/projects_hill_door.svg';
import Skewer3 from '@/assets/projects/skewer_BR.svg';
import Skewer2 from '@/assets/projects/skewer_ML.svg';
import Skewer1 from '@/assets/projects/skewer_TR.svg';
import Carousel1 from '../../assets/projects/carousel1.png';
import Carousel2 from '../../assets/projects/carousel2.png';
import Carousel3 from '../../assets/projects/carousel3.png';
import Section from '../../components/Section';
import ProjectDesc from './ProjectDesc';

const slides = [Carousel1, Carousel2, Carousel3];
const projectLinks = [
  'https://devpost.com/software/turretguard',
  'https://devpost.com/software/intelli-drive',
  'https://devpost.com/software/hermes-vfeob3',
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  return (
    <Section
      id="projects"
      backgroundColor="linear-gradient(to bottom, #0D7F75, #0A7E74, #0A7E74, #0A7E74, #D68D05)"
      className="items-center"
    >
      {/* DESKTOP */}
      <div className="hidden md:block relative w-full">
        <Image
          src={Background}
          alt="Door and glow background"
          draggable={false}
          quality={100}
          width={3000}
          style={{
            height: 'auto',
            maxWidth: 'none',
            display: 'block',
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translate(-48%, -5%)',
          }}
        />
        <div className="relative w-full h-full z-30 items-center gap-35 flex flex-col translate-y-75 pb-110">
          {/* DESCRIPTION */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '60%',
              gap: '1.5rem',
            }}
          >
            <Typography
              textSize="heading-lg"
              textColor="text-white"
              textWeight="bold"
              className="text-center md:text-4xl"
            >
              Explore{' '}
              <span className="text-warning-400">previous projects</span>
            </Typography>
            <Typography
              textSize="paragraph-lg"
              textColor="text-white"
              textWeight="medium"
              className="text-center md:text-lg"
            >
              At our last hackathon, teams showcased their creativity and
              ingenuity to bring outstanding projects to life.
            </Typography>
            <Typography
              textSize="paragraph-lg"
              textColor="text-white"
              textWeight="medium"
              className="text-center md:text-lg"
            >
              Unlock the impossible and leave your mark—be the next team to
              create a groundbreaking innovation and build your legacy.
            </Typography>
          </div>
          {/* PROJECTS */}
          <div className="flex flex-col gap-40 lg:gap-50">
            {/* FIRST PROJECT */}
            <div className="relative flex flex-row items-center min-h-37.5 pl-50">
              <ProjectDesc index={0} />
              <a
                href={projectLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-0 w-[45%] h-auto top-[50%] -translate-y-[25%] translate-x-10 z-50 cursor-pointer hover:scale-102 transition-transform lg:translate-x-50"
              >
                <Image
                  src={Skewer1}
                  alt="Turret"
                  width={600}
                  className="w-full h-auto object-contain"
                />
              </a>
            </div>
            {/* SECOND PROJECT */}
            <div className="relative flex flex-row-reverse items-center min-h-37.5 pr-50">
              <ProjectDesc index={1} />
              <a
                href={projectLinks[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-0 w-[55%] h-auto top-[50%] -translate-y-[40%] -translate-x-22 z-50 cursor-pointer hover:scale-102 transition-transform lg:-translate-x-50"
              >
                <Image
                  src={Skewer2}
                  alt="IntelliDrive"
                  width={800}
                  className="w-full h-auto object-contain"
                />
              </a>
            </div>
            {/* THIRD PROJECT */}
            <div className="relative flex flex-row items-center min-h-37.5 pl-50 pb-100">
              <ProjectDesc index={2} />
              <a
                href={projectLinks[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-20 w-[32%] h-auto top-[50%] -translate-y-[45%] z-50 cursor-pointer hover:scale-102 transition-transform lg:-translate-y-[40%]"
              >
                <Image
                  src={Skewer3}
                  alt="hermes"
                  width={500}
                  height={350}
                  className="w-full h-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col relative w-full">
        <Image
          src={Background}
          alt="Door and glow background"
          draggable={false}
          quality={100}
          width={3000}
          style={{
            height: 'auto',
            maxWidth: 'none',
            display: 'block',
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translate(-55%, -10%)',
            zIndex: 0,
          }}
        />
        <div className="relative w-full h-full z-30 items-center gap-8 flex flex-col translate-y-40 pb-70">
          {/* Overall Description */}
          <div
            style={{
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '80%',
              gap: '1.5rem',
            }}
          >
            <Typography
              textSize="heading-lg"
              textColor="text-white"
              textWeight="bold"
              className="text-center"
            >
              Explore{' '}
              <span className="text-warning-400">previous projects</span>
            </Typography>
            <Typography
              textSize="paragraph-lg"
              textColor="text-white"
              textWeight="medium"
              className="text-center"
            >
              At our last hackathon, teams showcased their creativity and
              ingenuity to bring outstanding projects to life. <br /> <br />
              Unlock the impossible and leave your mark—be the next team to
              create a groundbreaking innovation and build your legacy.
            </Typography>
          </div>

          {/* Carousel */}
          <div className="align-center justify-center flex flex-row w-full">
            <button
              onClick={prev}
              aria-label="Previous project"
              style={{ color: '#00FFE5', fontSize: '36px', lineHeight: 0.5 }}
            >
              ‹
            </button>
            <a
              href={projectLinks[current]}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[85%] z-30 overflow-visible cursor-pointer"
            >
              <Image
                src={slides[current]}
                alt={`Project ${current + 1}`}
                width={500}
                height={300}
                draggable={false}
                className="w-full h-auto object-contain"
              />
            </a>
            <button
              onClick={next}
              aria-label="Next project"
              style={{ color: '#00FFE5', fontSize: '36px', lineHeight: 1 }}
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Project ${i + 1}`}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  background:
                    i === current ? '#00FFE5' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>

          {/* Description */}
          <ProjectDesc index={current} />
        </div>
      </div>
    </Section>
  );
}
