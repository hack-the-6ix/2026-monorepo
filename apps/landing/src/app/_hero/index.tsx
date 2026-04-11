'use client';
import React, { useState } from 'react';
import { Button, Input, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Section from '../../components/Section';
import { EVENT_INFO, FORM_CONTENT, HERO_CONTENT } from '../_hero/constants';
import { assets } from './assets';
import { Butterflies } from './Butterflies';
import HeroRadish from './HeroRadish';

const ARTBOARD_W = 4035;
const ARTBOARD_H = 3662;

export default function Hero() {
  // EMAIL FORM SUBMIT
  const [email, setEmail] = useState<string>('');
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubmitStatus({
        message: 'Please provide an email',
        isError: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        message: 'Please provide a valid email',
        isError: true,
      });
      return;
    }
    setSubmitStatus(null);

    try {
      const response = await fetch(
        'https://landingapi.hackthe6ix.com/api/subscribe',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.text();

      if (response.ok) {
        setSubmitStatus({
          message: data,
          isError: false,
        });
        setEmail('');
      } else {
        setSubmitStatus({
          message: data || 'Failed to subscribe. Please try again.',
          isError: true,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        message: 'An error occurred. Please try again later.',
        isError: true,
      });
    }
  };

  // PAGE:
  return (
    <Section
      id="hero"
      backgroundColor="#12102F"
      className="relative z-30 !min-h-0 !py-0"
    >
      <div
        style={
          {
            '--hero-scale': 'clamp(0.222, calc(100vw / 1440px), 1)',
            height: 'calc(675px + 670.4px * var(--hero-scale))',
          } as React.CSSProperties
        }
        className="max-lg:scale-[var(--hero-scale)] max-lg:[transform-origin:center_675px]"
      >
        <div
          className="relative"
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
            className="absolute"
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
              sizes="2094px"
              className="object-contain object-left"
            />
          </div>

          {/* Cloud Right */}
          <div
            className="absolute"
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
              sizes="1834px"
              className="object-contain"
            />
          </div>

          {/* Spotlight */}
          <div
            className="absolute"
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
              sizes="1805px"
              className="object-contain"
            />
          </div>

          {/* CN Tower */}
          <div
            className="absolute"
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
              sizes="222px"
              className="object-contain"
            />
          </div>

          {/* Mist Right */}
          <div
            className="absolute"
            style={{
              left: 589,
              top: 1058.22,
              width: 2562.08,
              height: 428.58,
            }}
          >
            <Image
              src={assets.heroMistRight}
              alt=""
              fill
              sizes="2563px"
              className="object-contain"
            />
          </div>

          {/* Mist Left */}
          <div
            className="absolute"
            style={{
              left: 279.42,
              top: 1023.79,
              width: 2497.7,
              height: 456.02,
            }}
          >
            <Image
              src={assets.heroMistLeft}
              alt=""
              fill
              sizes="2498px"
              className="object-contain"
            />
          </div>

          {/* Trees */}
          <div
            className="absolute"
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
              className="block max-w-none size-full"
            />
          </div>

          {/* Cave */}
          <div
            className="absolute"
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
              sizes="803px"
              className="object-contain"
            />
          </div>

          {/* Cliff Right Fade (pink cliff) */}
          <div
            className="absolute"
            style={{
              left: 1773.85,
              top: 1275.81,
              width: 2261.3,
              height: 2009.63,
            }}
          >
            <Image
              src={assets.heroCliffRightFade}
              alt=""
              fill
              sizes="2262px"
              className="object-contain"
            />
          </div>

          {/* Cliff Right Bottom */}
          <div
            className="absolute"
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
              sizes="1671px"
              className="object-contain"
            />
          </div>

          {/* Cliff Left Fade */}
          <div
            className="absolute"
            style={{
              left: -441,
              top: 1089.9,
              width: 2095,
              height: 1818,
            }}
          >
            <Image
              src={assets.heroCliffLeftFade}
              alt=""
              fill
              sizes="2095px"
              className="object-contain"
            />
          </div>

          {/* Cliff Left */}
          <div
            className="absolute"
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
              sizes="2146px"
              className="object-contain object-right"
            />
          </div>

          {/* Cliff Right Top */}
          <div
            className="absolute"
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
              sizes="1117px"
              className="object-contain"
            />
          </div>

          {/* Mushroom 1 */}
          <div
            className="absolute"
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
              className="block max-w-none size-full"
            />
          </div>

          {/* Mushroom 2 */}
          <div
            className="absolute"
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
              className="block max-w-none size-full"
            />
          </div>

          {/* Left Grass Shadow */}
          <div
            className="absolute"
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
              className="block max-w-none size-full"
            />
          </div>

          {/* Left Grass*/}
          <div
            className="absolute"
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
              className="block max-w-none size-full"
            />
          </div>

          {/* Right Grass */}
          <div
            className="absolute"
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
              className="block max-w-none size-full"
            />
          </div>

          {/* Static Radish - Animations later */}
          <HeroRadish />

          {/* Butterflies - frame cycling + bounce + pulse */}
          <div
            className="absolute animate-subtle-bounce animate-pulse"
            style={{
              left: 1868.65,
              top: 687.9,
              width: 213.92,
              height: 533.08,
            }}
          >
            <Butterflies />
          </div>

          {/* ============================================================
            LAYER 2 (z-10): Overlay - Lights (0.6 opacity)
            ============================================================ */}

          {/* Light Left 1 */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: 735.4,
              top: 35.1,
              width: 855.33,
              height: 844.55,
              opacity: 0.6,
            }}
          >
            <Image
              src={assets.heroLightLeft1}
              alt=""
              fill
              sizes="856px"
              className="object-contain"
            />
          </div>

          {/* Light Left 2 */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: 905,
              top: -42.3,
              width: 774,
              height: 1732.39,
              opacity: 0.6,
            }}
          >
            <Image
              src={assets.heroLightLeft2}
              alt=""
              fill
              sizes="774px"
              className="object-contain"
            />
          </div>

          {/* Light Right */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: 1700,
              top: 228.9,
              width: 759.68,
              height: 669.15,
              opacity: 0.6,
            }}
          >
            <Image
              src={assets.heroLightRight}
              alt=""
              fill
              sizes="760px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      {/* ============================================================
          LAYER 3: Content Elements (no z index?)
          ============================================================ */}
      {/* Render fixed-position hero UI for both landscape and in-between aspect ratios */}
      <div className="layer-content">
        <div className="absolute left-[59.34px] top-0 w-[977px] h-[631px] pointer-events-auto [@media(max-width:1095.68px)]:left-1/2 [@media(max-width:1095.68px)]:-translate-x-1/2 [@media(max-width:1095.68px)]:w-[calc(100vw-118.68px)] [@media(orientation:portrait)]:top-0 [@media(orientation:portrait)]:h-screen [@media(orientation:portrait)]:flex [@media(orientation:portrait)]:items-center">
          <div className="absolute left-[66px] top-[319px] w-[911px] flex flex-col gap-8 [@media(max-width:1095.68px)]:w-[calc(100%-66px)] [@media(max-width:713.68px)]:w-full [@media(max-width:713.68px)]:max-w-[406px] [@media(max-width:713.68px)]:left-1/2 [@media(max-width:713.68px)]:-translate-x-1/2 [@media(orientation:portrait)]:relative [@media(orientation:portrait)]:top-auto [@media(orientation:portrait)]:w-full">
            <div className="flex flex-col gap-6 items-start justify-center w-full">
              <div className="flex flex-row gap-2 items-start w-full overflow-hidden whitespace-nowrap [@media(orientation:portrait)]:flex-wrap">
                <div className="flex gap-2 items-start shrink-0">
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0 text-glow-subtle"
                  >
                    {EVENT_INFO.date}
                  </Typography>
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0 text-glow-subtle"
                  >
                    ⋅
                  </Typography>
                </div>
                <div className="flex gap-2 items-start shrink-0">
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0 text-glow-subtle"
                  >
                    {EVENT_INFO.location}
                  </Typography>
                  <Typography
                    as="p"
                    textSize="subtitle-sm"
                    textWeight="medium"
                    className="text-[var(--color-neutral-50)] m-0 text-glow-subtle"
                  >
                    ⋅
                  </Typography>
                </div>
                <Typography
                  as="p"
                  textSize="subtitle-sm"
                  textWeight="medium"
                  className="text-[var(--color-neutral-50)] m-0 text-glow-subtle shrink-0"
                >
                  {EVENT_INFO.format}
                </Typography>
              </div>
              <Typography
                as="h1"
                textSize="display"
                textWeight="bold"
                className="text-[var(--color-neutral-50)] m-0 text-glow"
              >
                {HERO_CONTENT.title}
              </Typography>
              <Typography
                as="p"
                textSize="subtitle-lg"
                textWeight="medium"
                className="m-0 text-glow"
              >
                <Typography
                  as="span"
                  textSize="subtitle-lg"
                  textWeight="medium"
                  className="text-[var(--color-neutral-50)]"
                >
                  {HERO_CONTENT.subtitlePrefix}
                </Typography>
                <Typography
                  as="span"
                  textSize="subtitle-lg"
                  textWeight="bold"
                  className="text-[var(--color-yellow-300)]"
                >
                  {HERO_CONTENT.subtitleHighlight}
                </Typography>
              </Typography>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Typography
                as="p"
                textSize="paragraph-lg"
                textWeight="medium"
                className="text-[var(--color-neutral-50)] m-0 text-glow-subtle"
              >
                {FORM_CONTENT.description}
              </Typography>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-row gap-2 items-center [@media(max-width:713.68px)]:flex-col"
                >
                  <Input
                    id="hero-email"
                    name="email"
                    label="Email address"
                    hideLabel
                    className="w-[min(100%,406px)] shrink-0"
                    inputBoxClassName="box-glow"
                    controlled={{
                      value: email,
                      onValueChange: setEmail,
                    }}
                    input={{
                      type: 'email',
                      autoComplete: 'email',
                      placeholder: FORM_CONTENT.placeholder,
                      'aria-label': 'Email address',
                      suppressHydrationWarning: false,
                      className:
                        'font-medium text-[var(--color-neutral-50)] placeholder:text-[var(--color-text-placeholder)] flex-1 min-w-0 bg-transparent',
                    }}
                  />
                  <Button
                    type="submit"
                    kind="primary"
                    aria-label="Sign up for updates"
                    className="box-glow [@media(max-width:713.68px)]:w-[min(100%,406px)]"
                  >
                    {FORM_CONTENT.buttonText}
                  </Button>
                </form>
                {submitStatus && (
                  <p
                    className={`--text-sm mt-3 ${submitStatus.isError ? 'text-[var(--color-error-600)]' : 'text-[var(--color-success-600)]'}`}
                  >
                    {submitStatus.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Leaves — anchored to top-right corner, scales with artboard below 1440px */}
      <div
        className="absolute z-10 pointer-events-none max-lg:scale-[var(--hero-scale)] max-lg:[transform-origin:right_116.1px]"
        style={
          {
            '--hero-scale': 'clamp(0.222, calc(100vw / 1440px), 1)',
            top: -116.1,
            right: 'calc(var(--hero-scale) * -48.86px)',
            width: 537.2,
            height: 412.1,
          } as React.CSSProperties
        }
      >
        <Image
          src={assets.heroLeaves}
          alt=""
          width={537}
          height={412}
          className="object-contain"
        />
      </div>
    </Section>
  );
}
