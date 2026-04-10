import React from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Section from '../../components/Section';
import {
  ABOUT_CONTENT,
  ABOUT_HEADER,
  STATS_HACKERS,
  STATS_HEADER,
  STATS_MENTORS,
  STATS_PRIZES,
  STATS_PROJECTS,
  STATS_SCHOOLS,
} from '../_about_stats/constants';
import { assets } from './assets';

const ARTBOARD_W = 3952;
const ARTBOARD_H = 2936.6;

// Mobile artboard — natural size fits a 320px viewport (320/402 scale of Figma 402px frame)
const MOBILE_ARTBOARD_W = 1277.73;
const MOBILE_ARTBOARD_H = 1474.22;

/** Figma → artboard local (origin from schools frame + Gem 1). */
const FIGMA_OX = 5814.438;
const FIGMA_OY = 2165.399;

/** Frame 540 — “Last year, we had…” (sister to artboard; coords in artboard space). */
const STATS_HEADER_FRAME = {
  left: 7501.57421875 - FIGMA_OX,
  top: 3907.9130859375 - FIGMA_OY,
  width: 402.883056640625,
  height: 52,
} as const;

const ARTBOARD_TOP = 0;

/**
 * Gem stat copy: matches design tokens in `packages/ui/src/theme/typography.css`
 * — `--text-3xl` (Heading/Small) + semi-bold 600, `--text-2xl` (Subtitle/Large) + medium 500.
 * Typography component: `heading-sm` + `subtitle-lg`.
 */
function GemStat({ num, stat }: { num: string; stat: string }) {
  return (
    <div className="flex w-[169.171px] flex-col items-center text-center">
      <Typography
        as="p"
        textSize="heading-sm"
        textWeight="semi-bold"
        className="m-0 max-w-full text-[var(--color-neutral-50)]"
      >
        {num}
      </Typography>
      <Typography
        as="p"
        textSize="subtitle-lg"
        textWeight="regular"
        className="m-0 -mt-2 max-w-full text-[var(--color-neutral-50)]"
      >
        {stat}
      </Typography>
    </div>
  );
}

function GemStatMobile({ num, stat }: { num: string; stat: string }) {
  return (
    <div className="flex w-[169.171px] flex-col items-center text-center">
      <Typography
        as="p"
        textSize="subtitle-lg"
        textWeight="semi-bold"
        className="m-0 max-w-full text-[var(--color-neutral-50)]"
      >
        {num}
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        className="m-0 -mt-1 max-w-full text-[var(--color-neutral-50)]"
      >
        {stat}
      </Typography>
    </div>
  );
}

export default function AboutStats() {
  return (
    <Section
      id="about"
      backgroundColor="linear-gradient(to bottom, #12102F, #12102F)"
      noPadding
      className="!min-h-0"
    >
      {/* Common wrapper: owns --about-scale so all sister divs can use var(--about-scale) */}
      <div
        className="relative hidden md:block"
        style={
          {
            '--about-scale': 'clamp(0.222, calc(100vw / 1440px), 1)',
          } as React.CSSProperties
        }
      >
        <div
          style={
            {
              height: 'calc(2936.6px * var(--about-scale))',
              transformOrigin: 'center 0px',
            } as React.CSSProperties
          }
          className="max-lg:scale-[var(--about-scale)]"
        >
          <div
            className="relative"
            style={{
              width: ARTBOARD_W,
              minHeight: ARTBOARD_H,
              marginLeft: 'calc(50% - 1636px)',
              marginTop: 0,
            }}
          >
            {/* ============================================================
            LAYER 1 (z-0): Background / Atmosphere
            Cave Columns, Rocks, Stars, Lantern (no moving animations!)
            ============================================================ */}

            {/* Right Column 1 */}
            <div
              className="absolute"
              style={{
                left: 2100, // should be 2925.66 but shifted by 1636/2, +2.34
                top: -60,
                width: 1066.34,
                height: 1490.1,
              }}
            >
              <Image
                src={assets.aboutColumn1}
                alt=""
                fill
                sizes="1066px"
                className="object-contain"
              />
            </div>

            {/* Right Column 2 */}
            <div
              className="absolute"
              style={{
                left: 2052.34, // 2868 - 1636/2 + 2.34
                top: 1267.5,
                width: 1083.5,
                height: 690.6,
              }}
            >
              <Image
                src={assets.aboutColumn2}
                alt=""
                fill
                sizes="1084px"
                className="object-contain object-left"
              />
            </div>

            {/* Lantern */}
            <div
              className="absolute"
              style={{
                left: 1832.07, // 0 - 1636/2
                top: 2116.37,
                width: 317.18,
                height: 395.96,
              }}
            >
              <Image
                src={assets.aboutLantern}
                alt=""
                fill
                sizes="317.18px"
                className="object-contain object-left"
              />
            </div>

            {/* Rocky Edge */}
            <div
              className="absolute"
              style={{
                left: -815.66, // 0 - 1636/2 + 2.34
                top: 1586.6,
                width: 3952,
                height: 1340,
              }}
            >
              <Image
                src={assets.aboutRocks}
                alt=""
                fill
                sizes="3952px"
                className="object-contain object-left"
              />
            </div>

            {/* ============================================================
            LAYER 2 (z-10): Items that MIGHT be animated
            Picture frames, gems, lantern, lamp, candle, checkerboard
            ============================================================ */}
            {/* Picture Frame 1 */}
            <div
              className="absolute"
              style={{
                left: 995.27,
                top: -2.5,
                width: 419.82,
                height: 400.41,
              }}
            >
              <Image
                src={assets.aboutFrame1}
                alt=""
                fill
                sizes="420px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 2 */}
            <div
              className="absolute"
              style={{
                left: 1456.07,
                top: 200.22,
                width: 335.24,
                height: 309.84,
              }}
            >
              <Image
                src={assets.aboutFrame2}
                alt=""
                fill
                sizes="420px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 3 */}
            <div
              className="absolute"
              style={{
                left: 1010.21,
                top: 955.5,
                width: 359.11,
                height: 336.7,
              }}
            >
              <Image
                src={assets.aboutFrame3}
                alt=""
                fill
                sizes="359px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 4 */}
            <div
              className="absolute"
              style={{
                left: 1514.67,
                top: 1195.5,
                width: 247.24,
                height: 332.38,
              }}
            >
              <Image
                src={assets.aboutFrame4}
                alt=""
                fill
                sizes="247px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 5 */}
            <div
              className="absolute"
              style={{
                left: 1618.66,
                top: 815.5,
                width: 424.73,
                height: 398.48,
              }}
            >
              <Image
                src={assets.aboutFrame5}
                alt=""
                fill
                sizes="425px"
                className="object-contain object-left"
              />
            </div>

            {/* Checkerboard */}
            <div
              className="absolute"
              style={{
                left: 1085.21,
                top: 1448.95,
                width: 415.28,
                height: 397.05,
              }}
            >
              <Image
                src={assets.aboutCheckerboard}
                alt=""
                fill
                sizes="415px"
                className="object-contain object-left"
              />
            </div>

            {/* Lamp */}
            <div
              className="absolute"
              style={{
                left: 1140.27,
                top: 1202.66,
                width: 323.13,
                height: 484.71,
              }}
            >
              <Image
                src={assets.aboutLamp}
                alt=""
                fill
                sizes="357px"
                className="object-contain object-left"
              />
            </div>

            {/* Candle */}
            <div
              className="absolute"
              style={{
                left: 1925.22,
                top: 346.84,
                width: 188.77,
                height: 227.94,
              }}
            >
              <Image
                src={assets.aboutCandle}
                alt=""
                fill
                sizes="189px"
                className="object-contain object-left"
              />
            </div>

            {/* Top Stars */}
            <div
              className="absolute"
              style={{
                left: 1836.66,
                top: 68.5,
                width: 292.91,
                height: 616.94,
              }}
            >
              <Image
                src={assets.aboutStars1}
                alt=""
                fill
                sizes="293px"
                className="object-contain object-left"
              />
            </div>

            {/* Bottom Star */}
            <div
              className="absolute"
              style={{
                left: 1381,
                top: 1069.58,
                width: 89.02,
                height: 88.09,
              }}
            >
              <Image
                src={assets.aboutStars2}
                alt=""
                fill
                sizes="89px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 1 */}
            <div
              className="absolute"
              style={{
                left: 1142.22,
                top: 1767.5,
                width: 198.25,
                height: 309.6,
              }}
            >
              <Image
                src={assets.aboutGem1}
                alt=""
                fill
                sizes="198px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 2 */}
            <div
              className="absolute"
              style={{
                left: 1518.67,
                top: 1697.46,
                width: 191.5,
                height: 300,
              }}
            >
              <Image
                src={assets.aboutGem2}
                alt=""
                fill
                sizes="192px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 3 */}
            <div
              className="absolute"
              style={{
                left: 1769.33,
                top: 1838.28,
                width: 210.17,
                height: 309.23,
              }}
            >
              <Image
                src={assets.aboutGem3}
                alt=""
                fill
                sizes="210px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 4 */}
            <div
              className="absolute"
              style={{
                left: 1335.01,
                top: 1932.24,
                width: 188.65,
                height: 313.58,
              }}
            >
              <Image
                src={assets.aboutGem4}
                alt=""
                fill
                sizes="189px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 5 */}
            <div
              className="absolute"
              style={{
                left: 1567.51,
                top: 1991.51,
                width: 192.8,
                height: 319.17,
              }}
            >
              <Image
                src={assets.aboutGem5}
                alt=""
                fill
                sizes="193px"
                className="object-contain object-left"
              />
            </div>

            {/* Stats typography over gems — Heading/Small/Semi Bold + Subtitle/Large/Medium (see GemStat) */}
            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 1142.22,
                top: 1803, // gem + 142/4
                width: 198.25,
                height: 309.6,
              }}
            >
              <GemStat num={STATS_SCHOOLS.num} stat={STATS_SCHOOLS.stat} />
            </div>
            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 1518.67,
                top: 1732.46, // gem + 142/4
                width: 191.5,
                height: 300,
              }}
            >
              <GemStat num={STATS_PROJECTS.num} stat={STATS_PROJECTS.stat} />
            </div>
            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 1769.33,
                top: 1873.78, // gem + 142/4
                width: 210.17,
                height: 309.23,
              }}
            >
              <GemStat num={STATS_PRIZES.num} stat={STATS_PRIZES.stat} />
            </div>
            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 1335.01,
                top: 1967.74, // gem + 142/4
                width: 188.65,
                height: 313.58,
              }}
            >
              <GemStat num={STATS_HACKERS.num} stat={STATS_HACKERS.stat} />
            </div>
            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 1567.51,
                top: 2027.01, // gem + 142/4
                width: 192.8,
                height: 319.17,
              }}
            >
              <GemStat num={STATS_MENTORS.num} stat={STATS_MENTORS.stat} />
            </div>
          </div>
        </div>

        {/* Stats section title (artboard-relative, same scale formula as Layer 3) */}
        <div
          className="pointer-events-none absolute z-[15] w-[402.88] text-center"
          style={{
            left: `calc(50% + (${STATS_HEADER_FRAME.left}px - 1636px) * var(--about-scale))`,
            top: `calc(${STATS_HEADER_FRAME.top}px * var(--about-scale))`,
            transformOrigin: 'top left',
            transform: 'scale(var(--about-scale))',
          }}
        >
          <Typography
            as="p"
            textSize="heading-sm"
            textWeight="bold"
            className="m-0 w-full text-[var(--color-neutral-50)]"
          >
            {STATS_HEADER.header}
          </Typography>
        </div>

        {/* ============================================================
          LAYER 3: Content Elements — artboard-relative position
          left = 50% + (949.33 − 1636)px × scale  =  50% − 686.67px × scale
          top  = 600.4px × scale
          (949.33 = frame1.left − 45.94;  600.4 = frame1.bottom + 202.49)
          ============================================================ */}
        <div
          className="pointer-events-auto absolute z-[15] w-[850.3px]"
          style={{
            left: 'calc(50% - 586.67px * var(--about-scale))', // to move N px left or right, add/subtract N to 686.67
            top: 'calc(550.4px * var(--about-scale))', // to move N px up or down, add/subtract N to 600.4
            transformOrigin: 'top left',
            transform: 'scale(var(--about-scale))',
          }}
        >
          <div className="flex w-full flex-col items-start gap-6">
            <Typography
              as="h2"
              textSize="heading-lg"
              textWeight="bold"
              className="m-0 max-w-full text-[var(--color-neutral-50)]"
            >
              <span className="text-[var(--color-neutral-50)]">
                {ABOUT_HEADER.headerPrefix}
              </span>{' '}
              <span className="text-[var(--color-yellow-300)]">
                {ABOUT_HEADER.headerHighlight}
              </span>{' '}
              <span className="text-[var(--color-neutral-50)]">
                {ABOUT_HEADER.headerSuffix}
              </span>
            </Typography>
            <div className="pl-[28px] max-w-[596px]">
              {/* 28px indent + 568px content = 596px total, right offset ~254px */}
              <Typography
                as="p"
                textSize="paragraph-lg"
                textWeight="medium"
                className="m-0 text-[var(--color-neutral-50)]"
              >
                {ABOUT_CONTENT.paragraph1}{' '}
                <span className="font-bold">
                  {ABOUT_CONTENT.paragraph1bold}
                </span>
              </Typography>
              <Typography
                as="p"
                textSize="paragraph-lg"
                textWeight="medium"
                className="mt-6 m-0 text-[var(--color-neutral-50)]"
              >
                {ABOUT_CONTENT.paragraph2}{' '}
                <span className="font-bold">
                  {ABOUT_CONTENT.paragraph2bold}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* end desktop common wrapper */}

      {/* ══════════════════════════════════════════════════════════════
          MOBILE SECTION (<768px) — completely self-contained.
          Owns its own --about-scale (sibling of desktop wrapper, so
          the two variables never interfere). Positions are copies of
          desktop for now — adjust to match mobile Figma layout.
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative md:hidden"
        style={
          {
            // '--about-scale': 'max(0.875, calc(100vw / 320px))',
            '--about-scale': 'clamp(0.875, calc(100vw / 320px), 2)',
          } as React.CSSProperties
        }
      >
        {/* Mobile scaling wrapper — scale always active (div is hidden at ≥768px anyway) */}
        <div
          style={
            {
              height: `calc(${MOBILE_ARTBOARD_H}px * var(--about-scale))`,
              transformOrigin: 'center 0px',
            } as React.CSSProperties
          }
          className="scale-[var(--about-scale)]"
        >
          <div
            className="relative"
            style={{
              width: MOBILE_ARTBOARD_W,
              minHeight: MOBILE_ARTBOARD_H,
              marginLeft: 'calc(50% - 793.86px)',
              marginTop: 0,
            }}
          >
            {/* ============================================================
                LAYER 1 (z-0): Background / Atmosphere
                ============================================================ */}

            {/* Right Column 1 - DONE */}
            <div
              className="absolute"
              style={{
                left: 925.10,
                top: 0,
                width: 228.75,
                height: 318.75,
              }}
            >
              <Image
                src={assets.aboutColumn1}
                alt=""
                fill
                sizes="287px"
                className="object-contain"
              />
            </div>

            {/* Right Column 2 - DONE*/}
            <div
              className="absolute"
              style={{
                left: 839.21,
                top: 703.05,
                width: 438.31,
                height: 356.24,
              }}
            >
              <Image
                src={assets.aboutColumn2}
                alt=""
                fill
                sizes="551px"
                className="object-contain object-left"
              />
            </div>

            {/* Lantern */}
            <div
              className="absolute"
              style={{
                left: 835.93,
                top: 1076.36,
                width: 101.00,
                height: 126.07,
              }}
            >
              <Image
                src={assets.aboutLantern}
                alt=""
                fill
                sizes="127px"
                className="object-contain object-left"
              />
            </div>

            {/* Rocky Edge - DONE */}
            <div
              className="absolute"
              style={{
                left: -100.07,
                top: 872.04,
                width: 1433.15,
                height: 438.60,
              }}
            >
              <Image
                src={assets.aboutRocks}
                alt=""
                fill
                sizes="1800px"
                className="object-contain object-left"
              />
            </div>

            {/* ============================================================
                LAYER 2 (z-10): Items that MIGHT be animated
                ============================================================ */}

            {/* Picture Frame 1 - DONE */}
            <div
              className="absolute"
              style={{
                left: 664.13,
                top: 0.10,
                width: 118.75,
                height: 110.06,
              }}
            >
              <Image
                src={assets.aboutFrame1}
                alt=""
                fill
                sizes="149px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 2 - DONE */}
            <div
              className="absolute"
              style={{
                left: 797.85,
                top: 58.20,
                width: 93.38,
                height: 86.03,
              }}
            >
              <Image
                src={assets.aboutFrame2}
                alt=""
                fill
                sizes="117px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 3 - DONE */}
            <div
              className="absolute"
              style={{
                left: 644.97,
                top: 526.99,
                width: 140.07,
                height: 130.91,
              }}
            >
              <Image
                src={assets.aboutFrame3}
                alt=""
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 4 - DONE */}
            <div
              className="absolute"
              style={{
                left: 806.15,
                top: 604.52,
                width: 86.8,
                height: 116.69,
              }}
            >
              <Image
                src={assets.aboutFrame4}
                alt=""
                fill
                sizes="87px"
                className="object-contain object-left"
              />
            </div>

            {/* Picture Frame 5 - DONE */}
            <div
              className="absolute"
              style={{
                left: 822.47,
                top: 453.08,
                width: 149.03,
                height: 139.44,
              }}
            >
              <Image
                src={assets.aboutFrame5}
                alt=""
                fill
                sizes="149px"
                className="object-contain object-left"
              />
            </div>

            {/* Checkerboard - DONE */}
            <div
              className="absolute"
              style={{
                left: 660.55,
                top: 687.82,
                width: 113.39,
                height: 108.40,
              }}
            >
              <Image
                src={assets.aboutCheckerboard}
                alt=""
                fill
                sizes="142px"
                className="object-contain object-left"
              />
            </div>

            {/* Lamp - DONE */}
            <div
              className="absolute"
              style={{
                left: 689.55,
                top: 641.88,
                width: 69.66,
                height: 109.20,
              }}
            >
              <Image
                src={assets.aboutLamp}
                alt=""
                fill
                sizes="88px"
                className="object-contain object-left"
              />
            </div>

            {/* Candle - DONE */}
            <div
              className="absolute"
              style={{
                left: 905.10,
                top: 79.12,
                width: 55.13,
                height: 63.76,
              }}
            >
              <Image
                src={assets.aboutCandle}
                alt=""
                fill
                sizes="69px"
                className="object-contain object-left"
              />
            </div>

            {/* Top Stars - DONE */}
            <div
              className="absolute"
              style={{
                left: 866.55,
                top: 1.59,
                width: 81.61,
                height: 171.88,
              }}
            >
              <Image
                src={assets.aboutStars1}
                alt=""
                fill
                sizes="103px"
                className="object-contain object-left"
              />
            </div>

            {/* Bottom Star - DONE */}
            <div
              className="absolute"
              style={{
                left: 785.41,
                top: 580.39,
                width: 34.72,
                height: 34.36,
              }}
            >
              <Image
                src={assets.aboutStars2}
                alt=""
                fill
                sizes="44px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 1 */}
            <div
              className="absolute"
              style={{
                left: 653.07,
                top: 892.64,
                width: 110.37,
                height: 107.23,
              }}
            >
              <Image
                src={assets.aboutGem1}
                alt=""
                fill
                sizes="139px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 2 */}
            <div
              className="absolute"
              style={{
                left: 748.30,
                top: 862.39,
                width: 100.01,
                height: 105.43,
              }}
            >
              <Image
                src={assets.aboutGem2}
                alt=""
                fill
                sizes="126px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 3 */}
            <div
              className="absolute"
              style={{
                left: 831.69,
                top: 828.16,
                width: 109.41,
                height: 104.77,
              }}
            >
              <Image
                src={assets.aboutGem3}
                alt=""
                fill
                sizes="137px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 4 */}
            <div
              className="absolute"
              style={{
                left: 705.75,
                top: 958.71,
                width: 114.94,
                height: 115.79,
              }}
            >
              <Image
                src={assets.aboutGem4}
                alt=""
                fill
                sizes="144px"
                className="object-contain object-left"
              />
            </div>

            {/* Gem 5 */}
            <div
              className="absolute"
              style={{
                left: 816.26,
                top: 936.38,
                width: 117.79,
                height: 109.13,
              }}
            >
              <Image
                src={assets.aboutGem5}
                alt=""
                fill
                sizes="148px"
                className="object-contain object-left"
              />
            </div>

            {/* Stats typography over gems */}
            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 655.46,
                top: 926.53,
                width: 67.66,
                height: 43.78,
              }}
            >
              <GemStatMobile num={STATS_SCHOOLS.num} stat={STATS_SCHOOLS.stat} />
            </div>

            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 750.69,
                top: 902.00,
                width: 67.66,
                height: 43.78,
              }}
            >
              <GemStatMobile num={STATS_PROJECTS.num} stat={STATS_PROJECTS.stat} />
            </div>

            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 837.27,
                top: 868.42,
                width: 67.66,
                height: 43.78,
              }}
            >
              <GemStatMobile num={STATS_PRIZES.num} stat={STATS_PRIZES.stat} />
            </div>

            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 712.12,
                top: 1007.03,
                width: 67.66,
                height: 43.78,
              }}
            >
              <GemStatMobile num={STATS_HACKERS.num} stat={STATS_HACKERS.stat} />
            </div>

            <div
              className="pointer-events-none absolute z-[15] flex flex-col items-center justify-center px-[31px] text-[var(--color-neutral-50)]"
              style={{
                left: 818.65,
                top: 978.23,
                width: 67.66,
                height: 43.78,
              }}
            >
              <GemStatMobile num={STATS_MENTORS.num} stat={STATS_MENTORS.stat} />
            </div>
          </div>
        </div>

        {/* Mobile STATS_HEADER — centered on screen, top scales with artboard */}
        <div
          className="pointer-events-none absolute z-[15] text-center"
          style={{
            top: 'calc(788px * var(--about-scale))',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 346,
            width: '100%',
          }}
        >
          <Typography
            as="p"
            textSize="subtitle-lg"
            textWeight="bold"
            className="m-0 w-full text-[var(--color-neutral-50)]"
          >
            {STATS_HEADER.header}
          </Typography>
        </div>

        {/* Mobile ABOUT text — centered on screen, top scales with artboard */}
        <div
          className="pointer-events-auto absolute z-[15] flex flex-col gap-8 text-center"
          style={{
            top: 'calc(175px * var(--about-scale))',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 280,
            width: '100%',
          }}
        >
          <Typography
            as="h2"
            textSize="heading-sm"
            textWeight="bold"
            className="m-0 w-full text-[var(--color-neutral-50)]"
          >
            <span className="text-[var(--color-neutral-50)]">
              {ABOUT_HEADER.headerPrefix}
            </span>{' '}
            <span className="text-[var(--color-yellow-300)]">
              {ABOUT_HEADER.headerHighlight}
            </span>{' '}
            <span className="text-[var(--color-neutral-50)]">
              {ABOUT_HEADER.headerSuffix}
            </span>
          </Typography>
          <div>
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="medium"
              className="m-0 text-[var(--color-neutral-50)]"
            >
              {ABOUT_CONTENT.paragraph1}{' '}
              <span className="font-bold">
                {ABOUT_CONTENT.paragraph1bold}
              </span>
            </Typography>
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="medium"
              className="mt-6 m-0 text-[var(--color-neutral-50)]"
            >
              {ABOUT_CONTENT.paragraph2}{' '}
              <span className="font-bold">
                {ABOUT_CONTENT.paragraph2bold}
              </span>
            </Typography>
          </div>
        </div>
      </div>
      {/* end mobile section */}
    </Section>
  );
}
