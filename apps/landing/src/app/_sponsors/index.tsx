'use client';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Candle from '../../assets/sponsor_candle.png';
import Grass from '../../assets/sponsor_grass.png';
import Hills from '../../assets/sponsor_hill.png';
import Section from '../../components/Section';
import LogoGrid from './LogoGrid';

export default function Sponsors() {
  const showSponsor = false;
  return (
    <Section
      id="sponsors"
      backgroundColor="linear-gradient(to bottom, #12102F, #12102F, #423994, #355190, #0D7F75)"
      className="items-center overflow-hidden"
    >
      <div className="flex flex-col max-w-[80%] gap-y-7 items-center z-30 md:max-w-[55%] md:gap-y-9">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
          className="text-center md:text-4xl"
        >
          Brewing the future of{' '}
          <span className="text-warning-400">innovation</span>
        </Typography>
        <div className="flex flex-col gap-y-4">
          <Typography
            textSize="paragraph-sm"
            textColor="text-white"
            textWeight="medium"
            className="text-center md:text-lg"
          >
            Each year, our sponsors unite thousands of emerging developers,
            designers, and builders, forging lasting connections with
            connections with hackers. Special thanks to our sponsors for
            supporting Hack the 6ix and the birth of great ideas.
          </Typography>
          <Typography
            textSize="paragraph-sm"
            textColor="text-white"
            textWeight="medium"
            className="text-center md:text-lg"
          >
            Want to help us make Hack the 6ix a reality?
          </Typography>
        </div>
        <Button
          className="w-full md:max-w-45"
          onClick={(e) => {
            window.location.href =
              'mailto:sponsor@hackthe6ix.com?subject=Interest in Sponsoring Hack the 6ix';
            e.preventDefault();
          }}
        >
          Become a Sponsor
        </Button>
      </div>
      <div className="-mt-25 flex flex-col items-end justify-center z-0 md:-mt-75">
        <div className="flex flex-row w-full translate-x-5 items-end justify-center md:gap-10">
          <Image
            src={Hills}
            alt="Purple Hills"
            width={1300}
            height={1300}
            className="w-150 h-auto md:w-300"
          />
          <Image
            src={Grass}
            alt="Big Grass"
            width={1200}
            height={1200}
            className="w-140 h-auto -translate-x-12 md:w-300 md:translate-0 2xl:translate-x-20"
          />
        </div>
        <div className="relative flex flex-col items-center">
          <div
            className="-mt-35 w-[1000vw] -translate-x-8 h-120 bg-radial-[at_25%_25%] from-[#584fdb] to-[#3F3E93] md:w-[280vw] md:-mt-85 lg:w-[180vw] md:translate-x-0 md:from-[#423CB5] md:to-[#3F3E93]"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, #3F3E93 80%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, #3F3E93 80%, transparent 100%)',
            }}
          />
          <div className="absolute flex -top-45 -translate-x-30 justify-center md:-top-90 md:left-1/3 md:translate-x-45 2xl:-top-95 2xl:translate-x-30">
            <Image
              src={Candle}
              alt="cute candle"
              width={100}
              height={100}
              className="w-18 h-auto z-20 md:w-28 2xl:w-35"
            />
            <div className="z-10 absolute bg-[rgba(246, 189, 85, 0.34)] top-0.5 md:top-1.5 -translate-x-1.5 rounded-full w-2 md:w-3 h-3 md:h-5 2xl:h-6 animate-glow" />
            <div className="z-10 absolute bg-[rgba(246, 189, 85, 0.34)] top-0.5 md:top-1.5 -translate-x-1.5 rounded-full w-2 md:w-3 h-3 md:h-5 2xl:h-6 animate-glow" />{' '}
          </div>
          <div className="-mt-95 flex flex-col items-center gap-y-4 w-full px-4 z-10 max-w-90 md:max-w-[60%] lg:max-w-[75%] md:-mt-75">
            <Typography
              textSize="heading-sm"
              textColor="text-white"
              textWeight="bold"
              className="text-center md:text-4xl"
            >
              Our Sponsors
            </Typography>
            {showSponsor ?
              <>
                <Typography
                  textSize="paragraph-lg"
                  textColor="text-white"
                  textWeight="medium"
                  className="text-center md:text-base"
                >
                  Thank you to our sponsors for making Hack the 6ix possible!
                </Typography>
                <LogoGrid />
              </>
            : <Typography
                textSize="paragraph-lg"
                textColor="text-white"
                textWeight="medium"
                className="text-center pb-60 md:text-base"
              >
                Sponsors coming soon :)
              </Typography>
            }
          </div>
        </div>
      </div>
    </Section>
  );
}
