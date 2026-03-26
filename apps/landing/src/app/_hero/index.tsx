import React from 'react';
import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import Section from '../../components/Section';
import { assets, butterfliesFrames, radishFrames } from './assets';
import { EVENT_INFO, FORM_CONTENT, HERO_CONTENT, META } from './constants';

// export function ButterfliesAnimated() {
//   const [frame, setFrame] = React.useState(0);

//   React.useEffect(() => {
//     const id = setInterval(() => {
//       setFrame(f => (f + 1) % butterfliesFrames.length);
//     }, 500);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <div
//       className="absolute right-[280px] top-[317.89px] w-[214px] h-[533px] animate-subtle-bounce"
//       aria-hidden="true"
//     >
//       <div className="relative w-full h-full animate-pulse">
//         {butterfliesFrames.map((src, i) => (
//           <Image
//             key={i}
//             src={src}
//             alt=""
//             width={214}
//             height={533}
//             className="asset-image absolute inset-0 transition-opacity duration-200"
//             style={{ opacity: i === frame ? 1 : 0 }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// TODO: when all radish frames come in, create on-click animation
export function RadishAnimated() {
  return;
}

export default function Hero() {
  return (
    <Section id="hero" backgroundColor="#12102F">
      {/* ============================================================
          LAYER 1: Main Elements (z-0)
          Background graphics, clouds, spotlight, CN Tower, mists, 
          cliffs, trees, cave, grasses, mushrooms
          ============================================================ */}

      {/* Cloud Left - left-anchored */}
      <div
        className="absolute"
        style={{
          left: -270.66,
          top: -370.01,
          width: 2093,
          height: 2095.1,
        }}
      >
        <div
          className="absolute"
          style={{
            left: 0,
            top: 464.89,
            width: 2093.76,
            height: 883.17,
          }}
        >
          <Image
            src={assets.heroCloudLeft}
            alt=""
            fill
            sizes="100vw"
            className="object-left"
          />
        </div>
      </div>

      {/* Spotlight and Cloud Right - right-anchored */}
      <div
        className="absolute"
        style={{
          right: 41,
          top: -319.11,
          width: 1904.81,
          height: 1292.72,
        }}
      >
        <div
          className="absolute"
          style={{
            left: 737.15,
            top: 439,
            width: 1520,
            height: 874,
          }}
        >
          <Image
            src={assets.heroCloudRight}
            alt=""
            width={1520}
            height={874}
            className="asset-image"
          />
        </div>
        <div
          className="absolute"
          style={{
            right: 156.3,
            top: -597.85,
            width: 2901.7,
            height: 1882.76,
          }}
        >
          <Image
            src={assets.heroSpotlight}
            alt=""
            width={2902}
            height={1883}
            className="asset-image"
          />
        </div>
      </div>

      {/* CN Tower - left-anchored */}
      <div
        className="absolute"
        style={{
          left: 600,
          top: 450,
          width: 201.45,
          height: 241.76,
        }}
      >
        <Image
          src={assets.heroCnTower}
          alt=""
          fill
          sizes="202px"
          className="object-left"
        />
      </div>

      {/* Mist Left - left-anchored */}
      <div
        className="absolute"
        style={{
          left: -573.32,
          top: 660.77,
          width: 2428.12,
          height: 456,
        }}
      >
        <Image
          src={assets.heroMistLeft}
          alt=""
          fill
          sizes="100vw"
          className="object-left"
        />
      </div>

      {/* Mist Right - left-anchored */}
      <div
        className="absolute"
        style={{
          left: -573.32,
          top: 660.77,
          width: 2428.12,
          height: 456,
        }}
      >
        <Image
          src={assets.heroMistRight}
          alt=""
          fill
          sizes="100vw"
          className="object-right"
        />
      </div>

      {/* Trees - right-anchored */}
      <div className="absolute right-[106px] top-[533.89px] w-[344px] h-[406px]">
        <div className="absolute left-0 top-[184px] w-[180px] h-[222px]">
          <Image
            src={assets.heroTree1}
            alt=""
            width={180}
            height={222}
            className="asset-image"
          />
        </div>
        <div className="absolute left-[115px] top-0 w-[229px] h-[398px]">
          <Image
            src={assets.heroTree2}
            alt=""
            width={229}
            height={398}
            className="asset-image"
          />
        </div>
      </div>

      {/* Cave - right-anchored */}
      <div className="absolute right-[-4px] top-[682.39px] w-[534px] h-[326px]">
        <Image
          src={assets.heroCave}
          alt=""
          width={534}
          height={326}
          className="asset-image"
        />
      </div>

      {/* Butterflies - right-anchored (static for now) */}
      {/* <ButterfliesAnimated /> */}

      {/* Lower Right Cliffs Group - right-anchored */}
      <div className="absolute right-[-5px] top-[854.89px] w-[882.5px] h-[715.5px]">
        {/* Cliff Right Bottom */}
        <div className="absolute left-0 top-[154px] w-[882px] h-[561.5px]">
          <Image
            src={assets.heroCliffRightBottom}
            alt=""
            width={882}
            height={562}
            className="asset-image"
          />
        </div>
        {/* Cliff Right Top */}
        <div className="absolute left-[448px] top-[48px] w-[434.5px] h-[256.5px]">
          <Image
            src={assets.heroCliffRightTop}
            alt=""
            width={435}
            height={257}
            className="asset-image"
          />
        </div>
        {/* Cliff Right Fade */}
        <div className="absolute left-[-10px] top-[106px] w-[542px] h-[121.5px]">
          <Image
            src={assets.heroCliffRightFade}
            alt=""
            width={542}
            height={118}
            className="asset-image"
          />
        </div>
        {/* Mushroom 1 */}
        <div className="absolute left-[776px] top-0 w-[64px] h-[77px]">
          <Image
            src={assets.heroMushroom1}
            alt=""
            width={64}
            height={77}
            className="asset-image"
          />
        </div>
        {/* Grass on right cliff */}
        <div className="absolute left-[704.42px] top-[-240.35px] w-[143px] h-[107px]">
          <Image
            src={assets.heroGrass}
            alt=""
            width={143}
            height={107}
            className="asset-image"
          />
        </div>
      </div>

      {/* Lower Left Cliffs Group - left-anchored */}
      <div
        className="absolute"
        style={{
          left: -420,
          top: 660,
          width: 1200,
          height: 800,
        }}
      >
        {/* Main cliff left */}
        <div
          className="absolute"
          style={{
            left: 0,
            top: 100,
            width: 1200,
            height: 700,
          }}
        >
          <Image
            src={assets.heroCliffLeft}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        {/* Cliff Left Fade */}
        <div
          className="absolute"
          style={{
            left: 800,
            top: 50,
            width: 400,
            height: 200,
          }}
        >
          <Image
            src={assets.heroCliffLeftFade}
            alt=""
            fill
            sizes="400px"
            className="object-contain"
          />
        </div>
        {/* Grass Shadow */}
        <div
          className="absolute"
          style={{
            left: 439.05,
            top: 0,
            width: 140.98,
            height: 105.06,
          }}
        >
          <Image
            src={assets.heroGrassShadow}
            alt=""
            width={141}
            height={105}
            className="asset-image"
          />
        </div>
        {/* Grass */}
        <div
          className="absolute"
          style={{
            left: 468,
            top: 0.32,
            width: 171,
            height: 127.43,
          }}
        >
          <Image
            src={assets.heroGrass}
            alt=""
            width={171}
            height={127}
            className="asset-image"
          />
        </div>
        {/* Mushroom 2 */}
        <div
          className="absolute"
          style={{
            right: 100,
            top: 50,
            width: 52.49,
            height: 101.87,
          }}
        >
          <Image
            src={assets.heroMushroom2}
            alt=""
            width={52}
            height={102}
            className="asset-image"
          />
        </div>
      </div>

      {/* ============================================================
          LAYER 2: Overlay SVGs (z-10)
          Leaves and lighting effects
          ============================================================ */}

      {/* Light Effects - with 0.6 opacity */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        {/* Light Left 1 */}
        <div className="absolute left-[-150px] top-0 w-[756px] h-[381px]">
          <Image
            src={assets.heroLightLeft1}
            alt=""
            width={756}
            height={381}
            className="asset-image"
          />
        </div>
        {/* Light Left 2 */}
        <div
          className="absolute left-[-150px] w-[874px] h-[640px]"
          style={{ top: 100.74 }}
        >
          <Image
            src={assets.heroLightLeft2}
            alt=""
            width={774}
            height={640}
            className="asset-image"
          />
        </div>
        {/* Light Right */}
        <div className="absolute right-[-112.16px] top-0 w-[742px] h-[501px]">
          <Image
            src={assets.heroLightRight}
            alt=""
            width={742}
            height={501}
            className="asset-image"
          />
        </div>
      </div>

      {/* Leaves - right-anchored */}
      <div className="absolute right-[-42px] top-[-95.11px] w-[537.21px] h-[412.1px] z-10">
        {/* Leaf 1 */}
        <div className="absolute left-[20px] top-[20px] w-[139px] h-[231px]">
          <Image
            src={assets.heroLeaf}
            alt=""
            width={139}
            height={231}
            className="asset-image rotate-[205.37deg]"
          />
        </div>
        {/* Leaf 2 */}
        <div className="absolute left-[120px] top-[75px] w-[139px] h-[231px]">
          <Image
            src={assets.heroLeaf}
            alt=""
            width={139}
            height={231}
            className="asset-image rotate-[162.76deg]"
          />
        </div>
        {/* Leaf 3 */}
        <div className="absolute left-[370px] top-[152px] w-[139px] h-[231px]">
          <Image
            src={assets.heroLeaf}
            alt=""
            width={139}
            height={231}
            className="asset-image rotate-[196deg]"
          />
        </div>
      </div>

      {/* ============================================================
          LAYER 3: Static Content (z-20)
          Logo, hero text, sign-up form
          ============================================================ */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute left-[59.34px] top-[36.89px] w-[977px] h-[631px] pointer-events-auto">
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
            <div className="flex flex-col gap-6 items-start justify-center w-full">
              {/* Event Info */}
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

              {/* Title */}
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

            {/* Sign-up Form */}
            <div className="flex flex-col gap-4 w-full">
              <p className="font-medium text-[20px] leading-[24px] tracking-[-0.34px] text-[var(--color-text-primary-white)] m-0 text-glow-subtle">
                {FORM_CONTENT.description}
              </p>
              <div>
                <form className="flex flex-row gap-4 items-center">
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
                    type="submit"
                    className="flex flex-row justify-center items-center gap-2 py-3 px-6 bg-[var(--color-primary)] border border-[var(--color-border-primary)] rounded-[var(--radius-lg)] cursor-pointer transition-opacity hover:opacity-90 box-glow"
                    aria-label="Sign up for updates"
                  >
                    <span className="font-semibold text-[16px] leading-[20px] tracking-[-0.176px] text-[var(--color-text-primary-white)] text-center">
                      {FORM_CONTENT.buttonText}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* KEEP LAYERS:
       * Positioning Strategy:
       * - Left-anchored: Logo, hero content
       * - Right-anchored: Leaves
       * - ALL OTHER ASSETS ARE NOT ANCHORED, AND SHOULD BE POSITIONED ABSOLUTELY WITHIN THE HERO SECTION
       *
       * Structure:
       * - Layer 1 (z-0): Main elements (gradient, spotlight, CN Tower, clouds/mists, cliffs, grasses, butterflies, radish)
       * - Layer 2 (z-10): Overlay SVGs (leaves and lighting only)
       * // TODO: can we figure out a better-looking system for the lighting?
       * - Layer 3 (z-20): Static content (logo, hero text, sign-up button)
       */}
    </Section>
  );
}
