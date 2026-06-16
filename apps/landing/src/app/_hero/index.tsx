'use client';
import React from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Section from '../../components/Section';
import {
  DASHBOARD_URL,
  EVENT_INFO,
  FORM_CONTENT,
  HERO_CONTENT,
} from '../_hero/constants';
import { assets } from './assets';
import Banner from './Banner';
import HeroRadish from './HeroRadish';

const ARTBOARD_W = 4035;
const ARTBOARD_H = 3662;

export default function Hero() {
  // PAGE:
  return (
    <Section
      id="hero"
      backgroundColor="#12102F"
      className="!min-h-0 !py-0 relative"
    >
      {/* Mobile clouds — behind mobile artboard PNG (z:auto, paints before z-[1]) */}
      <div
        className="block md:hidden absolute left-0 w-full z-20 "
        style={{ bottom: '-50vw', contain: 'paint' }}
      >
        <Image
          src={assets.heroMobileClouds}
          alt=""
          width={402}
          height={1140}
          priority
          className="w-full h-auto"
          sizes="100vw"
        />
      </div>

      {/* Mobile background — replaces individual artboard layers below 768px */}
      <div
        className="block md:hidden absolute left-0 w-full z-20 "
        style={{ bottom: '-12.5vw' }}
      >
        <Image
          src={assets.heroMobileArtboard}
          alt=""
          width={402}
          height={1322}
          priority
          className="w-full h-auto"
          sizes="100vw"
        />
      </div>

      <div
        style={
          {
            '--hero-scale': 'clamp(0.222, calc(100vw / 1440px), 1)',
            height: 'calc(675px + clamp(148.83px, 46.556vw, 670.4px))',
          } as React.CSSProperties
        }
        className="max-lg:scale-[var(--hero-scale)] max-lg:[transform-origin:center_675px] z-40"
      >
        <div
          className="relative animate-fade-in"
          style={{
            width: ARTBOARD_W,
            minHeight: ARTBOARD_H,
            marginLeft: 'calc(50% - 1636px)',
            marginTop: -405,
          }}
        >
          {/* ============================================================
            LAYER 1 (z-0): Background / Atmosphere / Terrain
            Clouds, spotlight, CN Tower, mists, cliffs, cave, trees, mushrooms, grass
            ============================================================ */}

          {/* Cloud Left */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 465.14,
              top: 464.9,
              width: 2093.77,
              height: 883.17,
            }}
          >
            <Image
              src={assets.heroCloudLeft}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw * 1.454), 2094px"
              className="object-contain object-left"
              unoptimized
            />
          </div>

          {/* Cloud Right */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1153.66,
              top: 489.9,
              width: 1833.39,
              height: 854.01,
            }}
          >
            <Image
              src={assets.heroCloudRight}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw * 1.274), 1834px"
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Spotlight */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 416.42,
              top: 80.81,
              width: 1805.34,
              height: 1293.39,
            }}
          >
            <Image
              src={assets.heroSpotlight}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw * 1.253), 1805px"
              className="object-contain"
            />
          </div>

          {/* CN Tower */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1706.66,
              top: 1023.9,
              width: 221.63,
              height: 258.29,
            }}
          >
            <Image
              src={assets.heroCnTower}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw * 0.154), 222px"
              className="object-contain"
            />
          </div>

          {/* Mist Right */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 279.42,
              top: 1020.79,
              width: 2872.66,
              height: 466.02,
            }}
          >
            <Image
              src={assets.heroMist}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw * 1.780), 2872px"
              className="object-contain"
            />
          </div>

          {/* Trees */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1912.66,
              top: 903.9,
              width: 344,
              height: 406,
            }}
          >
            <Image
              src={assets.heroTrees}
              alt=""
              width={344}
              height={406}
              loading="lazy"
              className="block max-w-none size-full"
            />
          </div>

          {/* Cave */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1832.66,
              top: 1052.4,
              width: 802.34,
              height: 326.5,
            }}
          >
            <Image
              src={assets.heroCave}
              alt=""
              fill
              priority
              sizes="(max-width: 1440px) calc(100vw * 0.557), 803px"
              className="object-contain"
            />
          </div>

          {/* Cliff Right Bottom */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1480.66, // left - 5790, but should be -5349?
              top: 1378.9,
              width: 1670.34,
              height: 1615.6,
            }}
          >
            <Image
              src={assets.heroCliffRightBottom}
              alt=""
              fill
              priority
              sizes="(max-width: 1440px) calc(100vw * 1.160), 1671px"
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Cliff Left */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 0,
              top: 1090,
              width: 2146,
              height: 2564,
            }}
          >
            <Image
              src={assets.heroCliffLeft}
              alt=""
              fill
              priority
              unoptimized
              sizes="(max-width: 1440px) calc(100vw * 1.490), 2146px"
              className="object-contain object-right"
            />
          </div>

          {/* Cliff Right Top */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1928.66,
              top: 1270.9,
              width: 1116.34,
              height: 344.1,
            }}
          >
            <Image
              src={assets.heroCliffRightTop}
              alt=""
              fill
              priority
              sizes="(max-width: 1440px) calc(100vw * 0.776), 1117px"
              className="object-contain"
            />
          </div>

          {/* Mushroom 1 */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 2256.66,
              top: 1232.9,
              width: 64.28,
              height: 76.53,
            }}
          >
            <Image
              src={assets.heroMushroom1}
              alt=""
              width={64}
              height={77}
              loading="lazy"
              className="block max-w-none size-full"
            />
          </div>

          {/* Mushroom 2 */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 1932.66,
              top: 1237,
              width: 52.49,
              height: 101.87,
            }}
          >
            <Image
              src={assets.heroMushroom2}
              alt=""
              width={52}
              height={102}
              loading="lazy"
              className="block max-w-none size-full"
            />
          </div>

          {/* Left Grass Shadow */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 938.7,
              top: 1066.58,
              width: 140.98,
              height: 105.06,
            }}
          >
            <Image
              src={assets.heroGrassShadow}
              alt=""
              width={141}
              height={105}
              loading="lazy"
              className="block max-w-none size-full"
            />
          </div>

          {/* Left Grass*/}
          <div
            className="absolute hidden md:block"
            style={{
              left: 967.66,
              top: 1066.9,
              width: 171,
              height: 127.42,
            }}
          >
            <Image
              src={assets.heroGrass}
              alt=""
              width={171}
              height={127}
              loading="lazy"
              className="block max-w-none size-full"
            />
          </div>

          {/* Right Grass */}
          <div
            className="absolute hidden md:block"
            style={{
              left: 2185.08,
              top: 984.56,
              width: 143.16,
              height: 106.68,
            }}
          >
            <Image
              src={assets.heroGrass}
              alt=""
              width={143}
              height={107}
              loading="lazy"
              className="block max-w-none size-full"
            />
          </div>

          {/* Radish Animation */}
          <HeroRadish />

          {/* Butterflies Animation - frame cycling + bounce + pulse*/}
          <div className="absolute left-455 top-180">
            <Image
              src={assets.heroButterfly1}
              alt=""
              width={35}
              height={35}
              className="absolute left-16 top-0 inset-0 block max-w-none animate-subtle-bounce"
            />
            <Image
              src={assets.heroButterfly1}
              alt=""
              width={35}
              height={35}
              className="absolute left-0 top-50 inset-0 block max-w-none animate-subtle-bounce3"
            />
            <Image
              src={assets.heroButterfly2}
              alt=""
              width={35}
              height={35}
              className="absolute left-43 top-30 inset-0 block max-w-none animate-subtle-bounce2"
            />
            <Image
              src={assets.heroButterfly2}
              alt=""
              width={35}
              height={35}
              className="absolute left-50 top-120 inset-0 block max-w-none animate-subtle-bounce4"
            />
          </div>

          {/* ============================================================
            LAYER 2 (z-10): Overlay - Lights (0.8 opacity)
            ============================================================ */}
          {/* LIGHT */}
          <div
            className="absolute hidden md:block z-10 pointer-events-none"
            style={{
              left: 735.4,
              top: 35.1,
              width: 1718.28,
              height: 2095.1,
              opacity: 0.8,
            }}
          >
            <Image
              src={assets.heroLights}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw * 0.594), 1718px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          LAYER 3: Content Elements
          Responsive hero UI for all aspect ratios
          ============================================================ */}
      <div className="layer-content z-50">
        <div className="absolute left-[59.34px] top-0 w-[977px] h-[631px] pointer-events-auto [@media(max-width:1095.68px)]:left-1/2 [@media(max-width:1095.68px)]:-translate-x-1/2 [@media(max-width:1095.68px)]:w-[calc(100vw-118.68px)] [@media(orientation:portrait)]:top-0 [@media(orientation:portrait)]:h-screen [@media(orientation:portrait)]:flex [@media(orientation:portrait)]:items-center">
          <div className="absolute left-[66px] top-[319px] w-[911px] flex flex-col gap-8 [@media(max-width:1095.68px)]:w-[calc(100%-66px)] [@media(max-width:713.68px)]:w-full [@media(max-width:713.68px)]:max-w-[406px] [@media(max-width:713.68px)]:left-1/2 [@media(max-width:713.68px)]:-translate-x-1/2 [@media(orientation:portrait)]:relative [@media(orientation:portrait)]:top-auto [@media(orientation:portrait)]:w-full">
            <div className="flex flex-col gap-6 items-start justify-center w-full">
              <div className="flex flex-row gap-2 items-start w-full overflow-hidden whitespace-nowrap [@media(orientation:portrait)]:flex-wrap">
                <div className="flex gap-2 items-start shrink-0">
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0"
                  >
                    {EVENT_INFO.date}
                  </Typography>
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0"
                  >
                    ⋅
                  </Typography>
                </div>
                <div className="flex gap-2 items-start shrink-0">
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0"
                  >
                    {EVENT_INFO.location}
                  </Typography>
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0"
                  >
                    ⋅
                  </Typography>
                </div>
                <Typography
                  as="p"
                  textSize="subtitle-sm"
                  textWeight="medium"
                  className="text-[var(--color-neutral-50)] m-0 shrink-0"
                >
                  {EVENT_INFO.format}
                </Typography>
              </div>
              <Typography
                as="h1"
                textSize="display"
                textWeight="bold"
                className="text-[var(--color-neutral-50)] m-0"
              >
                {HERO_CONTENT.title}
              </Typography>
              <div className="m-0">
                <Typography
                  as="span"
                  textSize="subtitle-lg"
                  textWeight="medium"
                  className="text-[var(--color-neutral-50)]"
                >
                  {HERO_CONTENT.subtitlePrefix}
                </Typography>
                <Banner words={HERO_CONTENT.subtitleHighlight} />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Typography
                as="p"
                textSize="paragraph-lg"
                textWeight="medium"
                className="text-[var(--color-neutral-50)] m-0"
              >
                {FORM_CONTENT.description}
              </Typography>
              <div>
                <Button
                  as="a"
                  href={DASHBOARD_URL}
                  kind="primary"
                  aria-label="Go to Dashboard"
                  className="shrink-0 [@media(max-width:713.68px)]:w-[min(100%,406px)]"
                >
                  {FORM_CONTENT.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaves — anchored to top-right corner, scales with artboard below 1440px */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute z-60 pointer-events-none"
          style={
            {
              top: 'clamp(-116.1px, -8.063vw, -25.774px)',
              right: 'clamp(-48.86px, -3.393vw, -10.85px)',
              width: 'clamp(119.259px, 37.306vw, 537.2px)',
              height: 'clamp(91.486px, 28.618vw, 412.1px)',
            } as React.CSSProperties
          }
        >
          <Image
            src={assets.heroLeaves}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 1440px) 37.306vw, 537px"
            className="object-contain"
          />
        </div>
      </div>
    </Section>
  );
}
