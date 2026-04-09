'use client';

import { useState } from 'react';
import Image from 'next/image';
import Section from '../../components/Section';
import Background from '@/assets/projects/background_projects.svg';
import HillDoor from '@/assets/projects/projects_hill_door.png';
import Carousel1 from '../../assets/projects/carousel1.svg';
import Carousel2 from '../../assets/projects/carousel2.svg';
import Carousel3 from '../../assets/projects/carousel3.svg';

import Grass from '@/assets/sponsor_grass.png';
import Hills from '@/assets/sponsor_hill.png';
 
import { Button, Typography } from '@hackthe6ix/ui';
import { featureFlags } from '../../feature-flags';

const slides = [Carousel1, Carousel2, Carousel3];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  return (
    <Section
      id="projects"
      backgroundColor="linear-gradient(to bottom, #0D7F75, #0A7E74, #2A8B78, #D68D05)"
      className="items-center overflow-hidden">
    
    {/* DESKTOP */}
      <div className="hidden md:block relative w-full">
        <Image
          src={Background}
          alt="Purple Hills"
          draggable={false}
          style={{
            width: '700%',
            height: 'auto',
            maxWidth: 'none',
            display: 'block',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-53.7%)',
          }} 
          />
        <div style={{
            position: 'absolute',
            top: '20%',    // move text up/down
            left: '50%',   // move text left/right
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '60%',
            gap: '1.5rem',
          }}
        >
          <Typography
            // textSize="heading-lg"
            style={{ fontSize: '48pt' , paddingBottom: '5.5rem' }}
            textColor="text-white"
            textWeight="bold"
            className="text-center md:text-4xl"
          >
            Explore{' '}
            <span className="text-warning-400">previous projects</span>
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '20pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-center md:text-lg"
          >
            At our last hackathon, teams showcased their creativity and ingenuity to bring outstanding projects to life.
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '20pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-center md:text-lg"
          >
            Unlock the impossible and leave your mark—be the next team to create a groundbreaking innovation and build your legacy.
          </Typography>
        </div>
        <div style={{
          position: 'absolute',
          top: '37%',    // move text up/down
          left: '31%',   // move text left/right
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          // textAlign: 'left',
          maxWidth: '30%',
          gap: '1.5rem',
        }}
        >
          <Typography
          // textSize="paragraph-sm"
          style={{ fontSize: '33pt' , lineHeight: '1.2', fontWeight: 'bold' }}
          textColor="text-white"
          textWeight="medium"
          className="text-left md:text-lg"
          >
          TurretGuard
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '20pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-left md:text-lg"
          >
            1ST PLACE
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '15pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-left md:text-lg"
          >
            "TurretGuard is an Al-powered turret that detects drowning in real time and launches an inflatable buoy using physics-based targeting, saving lives in seconds where lifeguards may be too late." - the TurretGuard team
          </Typography>
        </div>

        {/* SECOND TEXT */}
        <div style={{
          position: 'absolute',
          top: '53%',    // move text up/down
          left: '70%',   // move text left/right
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          // textAlign: 'left',
          maxWidth: '30%',
          gap: '1.5rem',
          }}
        >
          <Typography
          // textSize="paragraph-sm"
          style={{ fontSize: '33pt' , lineHeight: '1.2', fontWeight: 'bold' }}
          textColor="text-white"
          textWeight="medium"
          className="text-left md:text-lg"
          >
            IntelliDrive
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '20pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-left md:text-lg"
          >
            2ND PLACE
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '15pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-left md:text-lg"
          >
            "Control hardware with an LLM through natural language. All autonomous - no CV or pre-processing" — the IntelliDrive team
          </Typography>
        </div>

        {/* THIRD TEXT */}
        <div style={{
            position: 'absolute',
            top: '68%',    // move text up/down
            left: '31%',   // move text left/right
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            // textAlign: 'left',
            maxWidth: '30%',
            gap: '1.5rem',
          }}
        >
          <Typography
          // textSize="paragraph-sm"
          style={{ fontSize: '33pt' , lineHeight: '1.2', fontWeight: 'bold' }}
          textColor="text-white"
          textWeight="medium"
          className="text-left md:text-lg"
          >
            hermes
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '20pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-left md:text-lg"
          >
            3RD PLACE
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '15pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-left md:text-lg"
          >
            "your generalist phone calling agent, never waste time on the phone ever again, book reservations, haircuts, find out information and more all with one prompt" — the hermes team
          </Typography>
        </div>
      </div>
          
      {/* MOBILE */}
      <div className="md:hidden flex flex-col pt-12 px-4 pb-12">
        {/* <Image
          src={HillDoor}
          alt="HillDoor"
          draggable={false}
          style={{
            width: '1000%',
            // height: 'auto',
            maxWidth: 'none',
            display: 'block',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-57%)',
          }}
        /> */}
        <div style={{
            position: 'absolute',
            // top: '10%',    // move text up/down
            left: '50%',   // move text left/right
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '80%',
            // gap: '1.5rem',
          }}
        >
          <Typography
            // textSize="heading-lg"
            style={{ fontSize: '38pt' , paddingBottom: '5.5rem' }}
            textColor="text-white"
            textWeight="bold"
            className="text-center md:text-4xl"
          >
            Explore{' '}
            <span className="text-warning-400">previous projects</span>
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '16pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-center md:text-lg"
          >
            At our last hackathon, teams showcased their creativity and ingenuity to bring outstanding projects to life.
          </Typography>
          <Typography
            // textSize="paragraph-sm"
            style={{ fontSize: '16pt' , lineHeight: '1.2' }}
            textColor="text-white"
            textWeight="medium"
            className="text-center md:text-lg"
          >
            Unlock the impossible and leave your mark—be the next team to create a groundbreaking innovation and build your legacy.
          </Typography>
        </div>

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
