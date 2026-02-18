'use client';

import React from 'react';
import Image from 'next/image';

import { assets } from '../lib/assets';
import {
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
  const { transformStyle, widthToFixedGap, effectiveWidth, layoutTier } =
    useViewportScale();

  const tier = LAYOUT_TIERS[layoutTier];
  const ll = tier.lowerLeft;
  const llOuterWidth =
    ll.widthRatio != null ?
      effectiveWidth * ll.widthRatio
    : Math.max(ll.minWidth, widthToFixedGap(ll.left, ll.gapFromRight));

  const cliffAsset =
    layoutTier === 'ultrawide' ? assets.cliffLeftExtrawide
    : layoutTier === '16:9' ? assets.cliffLeftWide
    : assets.kys;

  return (
    <div
      className="relative w-full min-w-[1440px] h-screen min-h-[1080px] overflow-hidden"
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
        {/* Light effects - individually positioned, left-1 and left-2 are left-anchored, right is right-anchored */}
        <div className="absolute left-0 top-0 w-[756px] h-[381px]">
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
          className="absolute left-0 w-[774px] h-[640px]"
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
        <div className="absolute right-0 top-0 w-[742px] h-[501px]">
          <Image
            src={assets.lightRight}
            alt=""
            width={742}
            height={501}
            className="asset-image"
            priority
          />
        </div>

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
          <div className="absolute left-[0.81px] top-[0.61px] w-[1904px] h-[1292px] blur-[5px]">
            <Image
              src={assets.spotlight}
              alt=""
              width={1905}
              height={1293}
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
            className="object-cover object-left"
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
            className="object-cover object-right"
            priority
          />
        </div>
      </div>

      {/* ============================================================
          LAYER 2: Decorative Elements (z-index: 10)
          ============================================================ */}
      <div className="layer-decorative">
        {/* Top Graphics - Leaves (right-anchored) */}
        <div className="absolute right-[-42px] top-[-95.11px] w-[537.21px] h-[412.1px]">
          {/* should be left-0 top-0 */}
          <div className="absolute left-[20px] top-[20px] w-[139px] h-[231px]">
            <Image
              src={assets.leafbase}
              alt=""
              width={139}
              height={231}
              className="asset-image rotate-[205.37deg]"
            />
          </div>
          {/* should be left-[112px] top-[67px] */}
          <div className="absolute left-[120px] top-[75px] w-[139px] h-[231px]">
            <Image
              src={assets.leafbase}
              alt=""
              width={139}
              height={231}
              className="asset-image rotate-[162.76deg]"
            />
          </div>
          {/* should be left-[340px] */}
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
        <div className="absolute right-0 top-[854.89px] w-[882.5px] h-[715.5px]">
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
              top: ll.innerTopOffset,
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
          ============================================================ */}
      <div className="layer-content">
        <div className="absolute left-[59.34px] top-[36.89px] w-[977px] h-[631px]">
          {/* Logo */}
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

          {/* Hero Content */}
          <div className="absolute left-[66px] top-[319px] w-[911px] flex flex-col gap-8">
            {/* Event Info */}
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

              {/* Main Title */}
              <h1 className="font-bold text-[60px] leading-[76px] tracking-[-1.32px] text-[var(--color-text-primary-white)] m-0 text-glow">
                {HERO_CONTENT.title}
              </h1>

              {/* Subtitle */}
              <p className="font-medium text-[32px] leading-[40px] tracking-[-0.704px] m-0 text-glow">
                <span className="text-[var(--color-text-primary-white)]">
                  {HERO_CONTENT.subtitlePrefix}
                </span>
                <span className="text-[var(--color-highlight-gold)] font-bold">
                  {HERO_CONTENT.subtitleHighlight}
                </span>
              </p>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-4 w-full">
              <p className="font-medium text-[20px] leading-[24px] tracking-[-0.34px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                {FORM_CONTENT.description}
              </p>

              <div className="flex flex-row gap-4 items-center">
                {/* Text Field */}
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

                {/* Placeholder Button */}
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
    </div>
  );
}
