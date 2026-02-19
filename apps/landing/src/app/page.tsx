'use client';

import React from 'react';
import Image from 'next/image';

import { assets } from '../lib/assets';
import {
  BACKGROUND_GRADIENT,
  EVENT_INFO,
  FORM_CONTENT,
  HERO_CONTENT,
  LAYOUT_TIERS,
  NIGHT_OVERLAY_OPACITY,
} from '../lib/constants';
import { useViewportScale } from '../lib/hooks';

/**
 * Landing Page Component
 *
 * Responsive design: min 1440px wide, scales vertically for smaller viewports
 *
 * Positioning Strategy:
 * - Left-anchored: Logo, hero content, lower-left cliff group, CN Tower skyline
 * - Right-anchored: Leaves, trees, cave, butterflies, lower-right cliff group, spotlight
 *
 * Structure:
 * - Layer 1 (z-0): Background elements (gradient, spotlight, CN Tower)
 * - Layer 2 (z-10): Decorative SVGs (flowers, butterflies, cliffs, groups)
 * - Layer 3 (z-20): Night overlay (full-screen with adjustable opacity)
 * - Layer 4 (z-30): Static content (logo, hero text, placeholder button)
 */
export default function LandingPage() {
  const {
    transformStyle,
    widthToFixedGap,
    effectiveWidth,
    layoutTier,
    isSmallScreen,
    isPortrait,
    smallScale,
    topLayerStyle,
  } = useViewportScale();

  const tier = LAYOUT_TIERS[layoutTier];
  const ll = tier.lowerLeft;
  const llOuterWidth =
    ll.widthRatio != null ?
      effectiveWidth * ll.widthRatio
    : Math.max(ll.minWidth, widthToFixedGap(ll.left, ll.gapFromRight));

  const INNER_TOP_MAX_BUFFER = 45;
  const nextTierMinWidth =
    layoutTier === '4:3' ? 1920
    : layoutTier === '16:9' ? 2560
    : null;
  const innerTopBuffer =
    nextTierMinWidth != null ?
      Math.max(
        0,
        ((effectiveWidth - tier.minWidth) /
          (nextTierMinWidth - tier.minWidth)) *
          INNER_TOP_MAX_BUFFER,
      )
    : 0;

  const cliffAsset =
    layoutTier === 'ultrawide' ? assets.cliffLeftExtrawide
    : layoutTier === '16:9' ? assets.cliffLeftWide
    : assets.kys;

  const lightsContent = (
    <>
      <div className="absolute left-[-150px] top-0 w-[756px] h-[381px]">
        <Image
          src={assets.lightLeft1}
          alt=""
          width={756}
          height={381}
          className="asset-image"
          priority
        />
      </div>
      <div
        className="absolute left-[-150px] w-[774px] h-[640px]"
        style={{ top: 90.74 }}
      >
        <Image
          src={assets.lightLeft2}
          alt=""
          width={774}
          height={640}
          className="asset-image"
          priority
        />
      </div>
      <div className="absolute right-[-112.16px] top-0 w-[742px] h-[501px]">
        <Image
          src={assets.lightRight}
          alt=""
          width={742}
          height={501}
          className="asset-image"
          priority
        />
      </div>
    </>
  );

  const leavesContent = (
    <div className="absolute right-[-42px] top-[-95.11px] w-[537.21px] h-[412.1px]">
      <div className="absolute left-[20px] top-[20px] w-[139px] h-[231px]">
        <Image
          src={assets.leafbase}
          alt=""
          width={139}
          height={231}
          className="asset-image rotate-[205.37deg]"
        />
      </div>
      <div className="absolute left-[120px] top-[75px] w-[139px] h-[231px]">
        <Image
          src={assets.leafbase}
          alt=""
          width={139}
          height={231}
          className="asset-image rotate-[162.76deg]"
        />
      </div>
      <div className="absolute left-[370px] top-[152px] w-[139px] h-[231px]">
        <Image
          src={assets.leafbase}
          alt=""
          width={139}
          height={231}
          className="asset-image rotate-[196deg]"
        />
      </div>
    </div>
  );

  const heroTextContent = (
    <div style={{ paddingLeft: '125px', width: '977px' }}>
      <div className="w-[30px] h-[75.64px] mb-8">
        <Image
          src={assets.logo}
          alt="Hack the 6ix Logo"
          width={30}
          height={76}
          className="block w-full h-full"
          priority
        />
      </div>
      <div className="w-[911px] flex flex-col gap-8">
        <div className="flex flex-col gap-6 items-start justify-center w-full">
          <div className="flex flex-row gap-2 items-start w-full">
            <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
              {EVENT_INFO.date}
            </p>
            <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
              ⋅
            </p>
            <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
              {EVENT_INFO.location}
            </p>
            <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
              ⋅
            </p>
            <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
              {EVENT_INFO.format}
            </p>
          </div>
          <h1 className="font-bold text-[60px] leading-[76px] tracking-[-1.32px] text-[var(--color-text-primary-white)] m-0 text-glow">
            {HERO_CONTENT.title}
          </h1>
          <p className="font-medium text-[32px] leading-[40px] tracking-[-0.704px] m-0 text-glow">
            <span className="text-[var(--color-text-primary-white)]">
              {HERO_CONTENT.subtitlePrefix}
            </span>
            <span className="text-[var(--color-highlight-gold)] font-bold">
              {HERO_CONTENT.subtitleHighlight}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="font-medium text-[20px] leading-[24px] tracking-[-0.34px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
            {FORM_CONTENT.description}
          </p>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-col gap-1 w-[406px]">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-row items-center gap-2 py-3 px-4 bg-[var(--color-input-bg)] border border-[var(--color-border-primary)] rounded-[var(--radius-full)] w-full box-border box-glow">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={FORM_CONTENT.placeholder}
                  className="flex-1 font-medium text-[16px] leading-[20px] tracking-[-0.176px] text-[var(--color-text-primary-white)] bg-transparent border-none outline-none placeholder:text-[var(--color-text-placeholder)]"
                />
              </div>
            </div>
            <button
              type="button"
              className="flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[var(--color-primary)] border border-[var(--color-border-primary)] rounded-[var(--radius-lg)] cursor-pointer transition-opacity hover:opacity-90 box-glow"
              aria-label="Sign up for updates"
            >
              <span className="font-semibold text-[16px] leading-[20px] tracking-[-0.176px] text-[var(--color-text-primary-white)] text-center">
                {FORM_CONTENT.buttonText}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Background gradient - fixed, full viewport, always top-anchored */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: BACKGROUND_GRADIENT, zIndex: -1 }}
      />

      {/* Top-anchored layer for small screens: leaves */}
      {isSmallScreen && (
        <div className="pointer-events-none" style={topLayerStyle}>
          {leavesContent}
        </div>
      )}

      {/* Main scaled container */}
      <div
        className={
          isSmallScreen ? '' : 'relative w-full h-screen overflow-hidden'
        }
        style={{ ...transformStyle }}
        data-name="landing page"
      >
        {/* ============================================================
          LAYER 1: Background Elements (z-index: 0)
          ============================================================ */}
        <div className="layer-background">
          {/* Background graphics - large decorative SVG, left-anchored */}
          <div
            className="absolute top-[-370.01px] h-[2095.1px]"
            style={{
              left: -270.66,
              width: Math.max(2022, widthToFixedGap(-270.66, -311.34)),
            }}
          >
            <div
              className="absolute top-[464.89px] h-[877px]"
              style={{
                left: 0,
                width: Math.min(
                  tier.cloudLeft.maxInnerWidth,
                  Math.max(1903, widthToFixedGap(-270.66, -311.34) - 119),
                ),
              }}
            >
              <Image
                src={assets.cloudLeft}
                alt=""
                fill
                className="object-cover object-left"
                priority
              />
            </div>
          </div>

          {/* Light effects - always inside main container */}
          {lightsContent}

          {/* Spotlight effect - right-anchored */}
          <div className="absolute right-[41px] top-[-319.11px] w-[1904.81px] h-[1292.72px] ">
            <div className="absolute left-[737.15px] top-[439px] w-[1520px] h-[874px]">
              <Image
                src={assets.cloudRight}
                alt=""
                width={1520}
                height={874}
                className="asset-image"
                priority
              />
            </div>
            <div className="absolute right-[156.3px] top-[-597.85px] w-[2901.7px] h-[1882.76px] blur-[1px]">
              <Image
                src={assets.spotlight}
                alt=""
                width={2902}
                height={1883}
                className="asset-image"
                priority
              />
            </div>
          </div>

          {/* Skyline background CN Tower - right-anchored (right offset constant across tiers) */}
          <div
            className="absolute w-[201.45px] h-[241.76px]"
            style={{
              right: tier.cnTower.right,
              top: tier.cnTower.top,
            }}
          >
            <Image
              src={assets.cnTower}
              alt=""
              fill
              className="object-cover object-left"
              priority
            />
          </div>
          {/* Skyline background left mist - left-anchored */}
          <div
            className="absolute top-[660.77px] h-[456px]"
            style={{
              left: -573.32,
              width: Math.max(2428.12, widthToFixedGap(-573.32, -654.8)),
            }}
          >
            <Image
              src={assets.mistLeft}
              alt=""
              fill
              className="object-left"
              priority
            />
          </div>
          {/* Skyline background right mist - left-anchored */}
          <div
            className="absolute top-[660.77px] h-[456px]"
            style={{
              left: -573.32,
              width: Math.max(2428.12, widthToFixedGap(-573.32, -654.8)),
            }}
          >
            <Image
              src={assets.mistRight}
              alt=""
              fill
              className="object-right"
              priority
            />
          </div>
        </div>

        {/* ============================================================
          LAYER 2: Decorative Elements (z-index: 10)
          ============================================================ */}
        <div className="layer-decorative">
          {/* Top Graphics - Leaves: only inside main container on large screens */}
          {!isSmallScreen && leavesContent}

          {/* Trees (right-anchored) */}
          <div className="absolute right-[106px] top-[533.89px] w-[344px] h-[406px]">
            <div className="absolute left-[0px] top-[184px] w-[180px] h-[222px]">
              <Image
                src={assets.tree1}
                alt=""
                width={180}
                height={222}
                className="asset-image"
              />
            </div>
            <div className="absolute left-[115px] top-[0px] w-[229px] h-[398px]">
              <Image
                src={assets.tree2}
                alt=""
                width={229}
                height={398}
                className="asset-image"
              />
            </div>
          </div>

          {/* Right Cave graphics area (right-anchored) */}
          <div className="absolute right-[-4px] top-[682.39px] w-[534px] h-[326px]">
            <Image
              src={assets.caveRight}
              alt=""
              width={534}
              height={326}
              className="asset-image"
            />
          </div>

          {/* Butterflies (right-anchored) */}
          <div className="absolute right-[280px] top-[317.89px] w-[213.92px] h-[533.08px]">
            <Image
              src={assets.butterflies}
              alt=""
              width={214}
              height={533}
              className="asset-image"
            />
          </div>

          {/* Lower Right Graphics Group (right-anchored) */}
          <div className="absolute right-[-5px] top-[854.89px] w-[882.5px] h-[715.5px]">
            <div className="absolute left-0 top-[154px] w-[882px] h-[561.5px]">
              <Image
                src={assets.cliffRight2}
                alt=""
                width={882}
                height={562}
                className="asset-image"
              />
            </div>
            <div className="absolute left-[448px] top-[48px] w-[434.5px] h-[256.5px]">
              <Image
                src={assets.cliffRight1}
                alt=""
                width={435}
                height={257}
                className="asset-image"
              />
            </div>
            <div className="absolute left-[-10px] top-[106px] w-[542px] h-[121.5px]">
              <Image
                src={assets.cliffRight3}
                alt=""
                width={542}
                height={118}
                className="asset-image"
              />
            </div>
            <div className="absolute left-[776px] top-0 w-[64px] h-[77px]">
              <Image
                src={assets.shroom1}
                alt=""
                width={64}
                height={77}
                className="asset-image"
              />
            </div>
            <div className="absolute left-[704.42px] top-[-240.35px] w-[143px] h-[107px]">
              <Image
                src={assets.grass1}
                alt=""
                width={143}
                height={107}
                className="asset-image"
              />
            </div>
          </div>

          {/* Lower Left Graphics Group - tier-aware positions and cliff asset */}
          <div
            className="absolute"
            style={{
              left: ll.left,
              top: ll.top,
              height: ll.height,
              width: llOuterWidth,
            }}
          >
            <div
              className="absolute"
              style={{
                left: 0,
                top: ll.innerTopOffset + innerTopBuffer,
                height: ll.innerHeight,
                width: llOuterWidth,
              }}
            >
              <Image
                src={cliffAsset}
                alt=""
                fill
                className="object-cover object-right"
              />
            </div>
            <div
              className="absolute w-[140.98px] h-[105.06px]"
              style={{ left: 19.05 - ll.left, top: 0 }}
            >
              <Image
                src={assets.grass1Shadow}
                alt=""
                width={141}
                height={105}
                className="asset-image"
              />
            </div>
            <div
              className="absolute w-[171px] h-[127.43px]"
              style={{ left: 48 - ll.left, top: 0.32 }}
            >
              <Image
                src={assets.grass1}
                alt=""
                width={171}
                height={127}
                className="asset-image"
              />
            </div>
            <div
              className="absolute w-[52.49px] h-[101.87px]"
              style={{
                right: tier.shroom2.rightOffsetFromCliff,
                top: tier.shroom2.topOffset,
              }}
            >
              <Image
                src={assets.shroom2}
                alt=""
                width={52}
                height={102}
                className="asset-image"
              />
            </div>
          </div>
        </div>

        {/* ============================================================
          LAYER 2: Night Overlay (z-index: 20)
          Topmost layer - covers entire viewport with adjustable opacity
          ============================================================ */}
        <div
          className="layer-overlay"
          style={{ opacity: NIGHT_OVERLAY_OPACITY / 100 }}
        >
          <Image
            src={assets.nightColorOverlay}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ============================================================
          LAYER 4: Content Elements (z-index: 30)
          Only rendered inside main container on large screens (non-portrait).
          Small screens use a separate fixed overlay for vertical centering.
          ============================================================ */}
        {!isSmallScreen && !isPortrait && (
          <div className="layer-content">
            <div className="absolute left-[59.34px] top-[36.89px] w-[977px] h-[631px]">
              <div className="absolute left-0 top-0 w-[30px] h-[75.64px]">
                <Image
                  src={assets.logo}
                  alt="Hack the 6ix Logo"
                  width={30}
                  height={76}
                  className="block w-full h-full"
                  priority
                />
              </div>
              <div className="absolute left-[66px] top-[319px] w-[911px] flex flex-col gap-8">
                <div className="flex flex-col gap-6 items-start justify-center w-full">
                  <div className="flex flex-row gap-2 items-start w-full">
                    <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                      {EVENT_INFO.date}
                    </p>
                    <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                      ⋅
                    </p>
                    <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                      {EVENT_INFO.location}
                    </p>
                    <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                      ⋅
                    </p>
                    <p className="font-medium text-[26px] leading-[32px] tracking-[-0.52px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                      {EVENT_INFO.format}
                    </p>
                  </div>
                  <h1 className="font-bold text-[60px] leading-[76px] tracking-[-1.32px] text-[var(--color-text-primary-white)] m-0 text-glow">
                    {HERO_CONTENT.title}
                  </h1>
                  <p className="font-medium text-[32px] leading-[40px] tracking-[-0.704px] m-0 text-glow">
                    <span className="text-[var(--color-text-primary-white)]">
                      {HERO_CONTENT.subtitlePrefix}
                    </span>
                    <span className="text-[var(--color-highlight-gold)] font-bold">
                      {HERO_CONTENT.subtitleHighlight}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <p className="font-medium text-[20px] leading-[24px] tracking-[-0.34px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                    {FORM_CONTENT.description}
                  </p>
                  <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-col gap-1 w-[406px]">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <div className="flex flex-row items-center gap-2 py-3 px-4 bg-[var(--color-input-bg)] border border-[var(--color-border-primary)] rounded-[var(--radius-full)] w-full box-border box-glow">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder={FORM_CONTENT.placeholder}
                          className="flex-1 font-medium text-[16px] leading-[20px] tracking-[-0.176px] text-[var(--color-text-primary-white)] bg-transparent border-none outline-none placeholder:text-[var(--color-text-placeholder)]"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[var(--color-primary)] border border-[var(--color-border-primary)] rounded-[var(--radius-lg)] cursor-pointer transition-opacity hover:opacity-90 box-glow"
                      aria-label="Sign up for updates"
                    >
                      <span className="font-semibold text-[16px] leading-[20px] tracking-[-0.176px] text-[var(--color-text-primary-white)] text-center">
                        {FORM_CONTENT.buttonText}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Small landscape text -- outside scaled container, vertically centered */}
      {isSmallScreen && !isPortrait && (
        <div className="fixed inset-0 z-30 flex items-center pointer-events-none">
          <div
            className="pointer-events-auto"
            style={{
              transform: `scale(${smallScale})`,
              transformOrigin: 'left center',
            }}
          >
            {heroTextContent}
          </div>
        </div>
      )}

      {/* Portrait text layout -- outside scaled container, real viewport sizes */}
      {isPortrait && (
        <div className="portrait-text">
          <div className="flex flex-col gap-6">
            <div className="w-[20px] h-[50px]">
              <Image
                src={assets.logo}
                alt="Hack the 6ix Logo"
                width={20}
                height={50}
                className="block w-full h-full"
                priority
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="portrait-event-info text-glow-subtle">
                {EVENT_INFO.date} ⋅ {EVENT_INFO.location} ⋅ {EVENT_INFO.format}
              </p>

              <h1 className="portrait-title text-glow">{HERO_CONTENT.title}</h1>

              <p className="portrait-subtitle text-glow">
                <span className="text-[var(--color-text-primary-white)]">
                  {HERO_CONTENT.subtitlePrefix}
                </span>
                <span className="text-[var(--color-highlight-gold)] font-bold">
                  {HERO_CONTENT.subtitleHighlight}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="portrait-description text-glow-subtle">
                {FORM_CONTENT.description}
              </p>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="email-portrait" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-row items-center gap-2 py-3 px-4 bg-[var(--color-input-bg)] border border-[var(--color-border-primary)] rounded-[var(--radius-full)] w-full box-border box-glow">
                  <input
                    id="email-portrait"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={FORM_CONTENT.placeholder}
                    className="flex-1 font-medium text-[14px] leading-[18px] tracking-[-0.15px] text-[var(--color-text-primary-white)] bg-transparent border-none outline-none placeholder:text-[var(--color-text-placeholder)]"
                  />
                </div>

                <button
                  type="button"
                  className="flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[var(--color-primary)] border border-[var(--color-border-primary)] rounded-[var(--radius-lg)] cursor-pointer transition-opacity hover:opacity-90 box-glow w-full"
                  aria-label="Sign up for updates"
                >
                  <span className="font-semibold text-[14px] leading-[18px] tracking-[-0.15px] text-[var(--color-text-primary-white)] text-center">
                    {FORM_CONTENT.buttonText}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
