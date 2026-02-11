'use client';

import React from 'react';
import Image from 'next/image';

import { assets } from '../lib/assets';
import { EVENT_INFO, FORM_CONTENT, HERO_CONTENT, NIGHT_OVERLAY_OPACITY } from '../lib/constants';

/**
 * Landing Page Component
 *
 * Fixed viewport: 1440x1080px (no scroll)
 *
 * Structure:
 * - Layer 1 (z-0): Background elements (gradient, spotlight, CN Tower)
 * - Layer 2 (z-10): Decorative SVGs (flowers, butterflies, cliffLefts, groups)
 * - Layer 3 (z-20): Night overlay (full-screen with adjustable opacity)
 * - Layer 4 (z-30): Static content (logo, hero text, placeholder button)
 */
export default function LandingPage() {
  return (
    <div
      className="relative w-[1440px] h-[1080px] overflow-hidden"
      style={{ background: 'var(--bg-gradient)' }}
      data-name="landing page"
    >
      {/* ============================================================
          LAYER 1: Background Elements (z-index: 0)
          ============================================================ */}
      <div className="layer-background">
        {/* Background graphics - large decorative SVG */}
        <div className="absolute left-[-270.66px] top-0 w-[2022px] h-[2095.1px]">
          <Image
            src={assets.bgGraphics}
            alt=""
            width={2022}
            height={2095}
            className="asset-image"
            priority
          />
        </div>

        {/* Spotlight effect */}
        <div className="absolute left-[-505.37px] top-[-319.11px] w-[1904.81px] h-[1292.72px] blur-[25px]">
          <Image
            src={assets.spotlight}
            alt=""
            width={1905}
            height={1293}
            className="asset-image"
            priority
          />
        </div>

        {/* CN Tower skyline background */}
        <div className="absolute left-[-573.32px] top-[636.77px] w-[2668.12px] h-[480px]">
          <Image
            src={assets.cnTowerBg}
            alt=""
            width={2668}
            height={480}
            className="asset-image"
            priority
          />
        </div>
      </div>

      {/* ============================================================
          LAYER 2: Decorative Elements (z-index: 10)
          ============================================================ */}
      <div className="layer-decorative">
        {/* Top Graphics - Leaves */}
        <div className="absolute left-[945.34px] top-[-95.11px] w-[537.21px] h-[412.1px]">
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

        {/* Trees*/}
        <div className="absolute left-[990.34px] top-[533.89px] w-[344px] h-[406px]">
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

        {/* Cave graphics area */}
        <div className="absolute left-[910.34px] top-[682.39px] w-[534px] h-[326px]">
          <Image
            src={assets.caveRight}
            alt=""
            width={534}
            height={326}
            className="asset-image"
          />
        </div>

        
        {/* Butterflies */}
        <div className="absolute left-[946.34px] top-[317.89px] w-[213.92px] h-[533.08px]">
          <Image
            src={assets.butterflies}
            alt=""
            width={214}
            height={533}
            className="asset-image"
          />
        </div>

        {/* Lower Right Graphics Group */}
        <div className="absolute left-[558.34px] top-[854.89px] w-[882.5px] h-[715.5px]">
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

        {/* Lower Left Graphics Group */}
        <div className="absolute left-[-2.66px] top-[696.56px] w-[1107px] h-[722.82px]">
          <div className="absolute left-[3px] top-[49.32px] w-[1058px] h-[673.5px]">
            <Image
              src={assets.cliffLeft1}
              alt=""
              width={1058}
              height={673.5}
              className="asset-image"
            />
          </div>
          <div className="absolute left-[3px] top-[23.32px] w-[1104px] h-[278px]">
            <Image
              src={assets.cliffLeft3}
              alt=""
              width={1104}
              height={278}
              className="asset-image"
            />
          </div>
          <div className="absolute left-[19.05px] top-0 w-[140.98px] h-[105.06px]">
            <Image
              src={assets.grass1Shadow}
              alt=""
              width={141}
              height={105}
              className="asset-image"
            />
          </div>
          <div className="absolute left-[48px] top-[0.32px] w-[171px] h-[127.43px]">
            <Image
              src={assets.grass1}
              alt=""
              width={171}
              height={127}
              className="asset-image"
            />
          </div>
          <div className="absolute left-0 top-[259.32px] w-[1013.1px] h-[347.23px] blur-[4px]">
            <Image
              src={assets.cliffLeft2}
              alt=""
              width={1013}
              height={347}
              className="asset-image"
            />
          </div>
          <div className="absolute left-[1013px] top-[162.32px] w-[52.49px] h-[101.87px]">
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
