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
    <div className="flex w-[169.171px] flex-col items-center gap-1 text-center">
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
        textWeight="medium"
        className="m-0 max-w-full text-[var(--color-neutral-50)]"
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
      <div
        style={
          {
            '--about-scale': 'clamp(0.222, calc(100vw / 1440px), 1)',
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
            left: 2110, // should be 2925.66 but shifted by 1636/2, +2.34
            top: -10,
            width: 1026.34,
            height: 1430.1,
          }}
        >
          <Image
            src={assets.aboutColumn1}
            alt=""
            fill
            sizes="1026px"
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
            left: 1140.27, // original: 1229.35, right: 1407.89, - width = 1110.27
            top: 1202.66, // original: 1355.5, bottom: 1622.1 - height = 1175.66
            width: 323.13, // original: 297.62, 170.07
            height: 484.71, // original: 446.44, 255.11
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
            top: 1767.5,
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
            top: 1697.46,
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
            top: 1838.28,
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
            top: 1932.24,
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
            top: 1991.51,
            width: 192.8,
            height: 319.17,
          }}
        >
          <GemStat num={STATS_MENTORS.num} stat={STATS_MENTORS.stat} />
        </div>
      </div>
      </div>

      {/* Frame 540 — stats section title (sister to artboard; Figma global → local via FIGMA_O*) */}
      <div
        className="pointer-events-none absolute z-[15] w-[402.88] text-center"
        style={{
          left: `calc(50% - 1636px + ${STATS_HEADER_FRAME.left}px)`,
          top: ARTBOARD_TOP + STATS_HEADER_FRAME.top,
          height: STATS_HEADER_FRAME.height,
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
          LAYER 3: Content Elements
          ============================================================ */}
      {/* Render fixed-position hero UI for both landscape and in-between aspect ratios */}
      <div className="layer-content">
        <div className="absolute left-[128px] top-[1944.9px] w-[850.3px] min-h-[287.6px] pointer-events-auto [@media(max-width:1095.68px)]:left-1/2 [@media(max-width:1095.68px)]:-translate-x-1/2 [@media(max-width:1095.68px)]:w-[calc(100vw-118.68px)] [@media(orientation:portrait)]:top-0 [@media(orientation:portrait)]:min-h-screen [@media(orientation:portrait)]:flex [@media(orientation:portrait)]:items-center">
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
            <div className="flex w-full justify-center px-[28px]">
              <div className="w-full max-w-[568px]">
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
      </div>
    </Section>
  );
}
