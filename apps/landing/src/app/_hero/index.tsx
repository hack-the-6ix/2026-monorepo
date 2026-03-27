import Image from 'next/image';

import Section from '../../components/Section';
import { assets } from './assets';

const ARTBOARD_W = 4035;
const ARTBOARD_H = 3662;

export default function Hero() {
  return (
    <Section
      id="hero"
      backgroundColor="#12102F"
      noPadding
      className="relative overflow-hidden items-start"
    >
      <div
        className="relative ml-[-916px] mt-[-405px]"
        style={{
          width: ARTBOARD_W,
          minHeight: ARTBOARD_H,
        }}
      >
        {/* ============================================================
            LAYER 1 (z-0): Background / Atmosphere
            Clouds, spotlight, CN Tower, mists
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

        {/* ============================================================
            LAYER 1 (z-0): Terrain
            Cliffs, cave, trees, mushrooms, grass
            ============================================================ */}

        {/* Tree 1 - Short Tree on Left */}
        <div
          className="absolute"
          style={{
            left: 1912.66,
            top: 1087.9,
            width: 180,
            height: 222,
          }}
        >
          <Image
            src={assets.heroTree1}
            alt=""
            width={180}
            height={222}
            className="block max-w-none size-full"
          />
        </div>

        {/* Tree 2 - Tall Tree on Right*/}
        <div
          className="absolute"
          style={{
            left: 2027.66,
            top: 903.9,
            width: 229,
            height: 398,
          }}
        >
          <Image
            src={assets.heroTree2}
            alt=""
            width={229}
            height={398}
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
            left: 1480.66,
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
        <div
          className="absolute"
          style={{
            left: 2080.66,
            top: 1286.9,
            width: 122,
            height: 195.06,
          }}
        >
          <Image
            src={assets.heroRadishHide}
            alt=""
            width={122}
            height={195}
            className="block max-w-none size-full"
          />
        </div>

        {/* Static Butterflies - Animations later */}
        <div
          className="absolute"
          style={{
            left: 1868.65,
            top: 687.9,
            width: 213.92,
            height: 533.08,
          }}
        >
          <Image
            src={assets.heroButterflies1}
            alt=""
            width={213}
            height={533}
            className="block max-w-none size-full"
          />
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

        {/* Leaf 1 */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: 1867.66,
            top: 330.01,
            width: 139,
            height: 231,
          }}
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={139}
            height={231}
            className="asset-image rotate-[205.37deg]"
          />
        </div>

        {/* Leaf 2 */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: 1979.66,
            top: 382.01,
            width: 139,
            height: 231,
          }}
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={139}
            height={231}
            className="asset-image rotate-[162.76deg]"
          />
        </div>

        {/* Leaf 3 */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: 2207.66,
            top: 426.9,
            width: 139,
            height: 231,
          }}
        >
          <Image
            src={assets.heroLeaf}
            alt=""
            width={139}
            height={231}
            className="asset-image rotate-[196deg]"
          />
        </div>
      </div>
    </Section>
  );
}
