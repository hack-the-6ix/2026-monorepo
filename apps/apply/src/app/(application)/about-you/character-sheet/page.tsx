'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@hackthe6ix/ui';

import { CharacterFrame } from '@/components/CharacterFrame';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons';
import { StepIndicator } from '@/components/StepIndicator';
import { useApplicationContext } from '@/context/ApplicationContext';
import type { AccessoryKey, CharacterKey } from '@/lib/schemas/character';

type ColorId = 'red' | 'green' | 'dark-red' | 'purple' | 'dark-blue';

const COLORS: { id: ColorId; hex: string }[] = [
  { id: 'red', hex: '#E25C5C' },
  { id: 'green', hex: '#5CB87A' },
  { id: 'dark-red', hex: '#A53A3A' },
  { id: 'purple', hex: '#9B5CC4' },
  { id: 'dark-blue', hex: '#2E3A8F' },
];

const COLOR_TO_CHARACTER: Record<ColorId, CharacterKey> = {
  red: 'turnip',
  green: 'brocoli',
  'dark-red': 'tomato',
  purple: 'mushroom',
  'dark-blue': 'lantern',
};

const CHARMS: { id: AccessoryKey; label: string; src: string }[] = [
  { id: 'pie', label: 'Pie', src: '/assets/accessories/Pie.svg' },
  { id: 'macaroon', label: 'Macaroon', src: '/assets/accessories/macaroon.svg' },
  { id: 'clover', label: 'Clover', src: '/assets/accessories/Clover.svg' },
];

export default function CharacterSheetPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const { formData, updateFormData } = useApplicationContext();
  const { character, accessory } = formData.characterSheet;

  const setCharacter = (value: CharacterKey | null) =>
    updateFormData('characterSheet', {
      ...formData.characterSheet,
      character: value,
    });

  const setAccessory = (value: AccessoryKey | null) =>
    updateFormData('characterSheet', {
      ...formData.characterSheet,
      accessory: value,
    });

  const displayCharacter: CharacterKey = character ?? 'turnip';
  const accessorySrc =
    step === 2
      ? (CHARMS.find((c) => c.id === accessory)?.src ?? null)
      : null;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16 max-w-6xl mx-auto md:items-center">
      <section className="md:row-start-1 md:col-start-1 flex flex-col gap-2 md:gap-6 max-w-md">
        {step === 1 ? (
          <>
            <div className="contents md:flex md:flex-col md:gap-6 md:h-[200px]">
              <Typography
                as="h1"
                textSize="heading-sm"
                textWeight="bold"
                textColor="text-white"
                className="!text-xl md:!text-3xl !leading-tight md:whitespace-nowrap"
              >
                Mirror, mirror, on the wall...{' '}
                <Typography
                  as="span"
                  textSize="heading-sm"
                  textWeight="bold"
                  textColor="text-yellow-300"
                  className="!text-xl md:hidden !leading-tight"
                >
                  What do you see?
                </Typography>
              </Typography>
              <Typography
                as="p"
                textSize="subtitle-sm"
                textWeight="bold"
                textColor="text-yellow-300"
                className="hidden md:block"
              >
                What do you see?
              </Typography>
              <div className="hidden md:grid grid-cols-5 gap-3 max-w-none">
                {COLORS.map((c) => {
                  const isSelected = character === COLOR_TO_CHARACTER[c.id];
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-label={c.id}
                      aria-pressed={isSelected}
                      onClick={() => setCharacter(COLOR_TO_CHARACTER[c.id])}
                      style={{ backgroundColor: c.hex }}
                      className={`w-full aspect-square md:size-12 rounded-lg cursor-pointer transition-all ring-4 ${
                        isSelected
                          ? 'ring-[#3DB4E8] scale-105'
                          : 'ring-yellow-300 hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-3 mt-4 items-end md:mt-16 md:translate-x-[20%]">
              <Button
                onClick={() => setStep(2)}
                disabled={!character}
                iconLeft={<ArrowRightIcon />}
                className="w-[200px] justify-center"
              >
                That&apos;s me!
              </Button>
              <StepIndicator current={1} total={2} />
            </div>
          </>
        ) : (
          <>
            <div className="contents md:flex md:flex-col md:gap-6 md:h-[200px]">
              <Typography
                as="h1"
                textSize="heading-sm"
                textWeight="bold"
                textColor="text-white"
                className="!text-xl md:!text-3xl !leading-tight md:whitespace-nowrap"
              >
                What&apos;s your{' '}
                <span className="text-yellow-300 md:text-white">
                  lucky charm
                </span>
                ?
              </Typography>
              <div className="hidden md:flex flex-wrap gap-3">
                {CHARMS.map((c) => {
                  const isSelected = accessory === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-label={c.label}
                      aria-pressed={isSelected}
                      onClick={() => setAccessory(c.id)}
                      className={`relative size-16 rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer transition-all ring-4 ${
                        isSelected
                          ? 'ring-[#3DB4E8] scale-105'
                          : 'ring-yellow-300 hover:scale-105'
                      }`}
                    >
                      <Image
                        src={c.src}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-3 mt-4 items-end md:mt-16 md:translate-x-[20%]">
              <div className="flex gap-3">
                <Button
                  kind="secondary"
                  onClick={() => setStep(1)}
                  iconLeft={<ArrowLeftIcon />}
                  className="w-[140px] justify-center [--button-color:#fff]"
                >
                  Back
                </Button>
                <Button
                  onClick={() => router.push('/about-you')}
                  disabled={!accessory}
                  iconLeft={<ArrowRightIcon />}
                  className="w-[140px] justify-center"
                >
                  Next
                </Button>
              </div>
              <StepIndicator current={2} total={2} />
            </div>
          </>
        )}
      </section>

      <section className="md:row-span-2 md:row-start-1 md:col-start-2 flex items-center justify-center md:translate-x-24 md:translate-y-20">
        <CharacterFrame
          characterKey={displayCharacter}
          accessory={accessorySrc}
        />
      </section>

      <section className="md:hidden flex flex-col gap-4 max-w-md">
        {step === 1 ? (
          <>
            <div className="grid grid-cols-3 gap-3 w-full max-w-[300px] self-center">
              {COLORS.map((c) => {
                const isSelected = character === COLOR_TO_CHARACTER[c.id];
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.id}
                    aria-pressed={isSelected}
                    onClick={() => setCharacter(COLOR_TO_CHARACTER[c.id])}
                    style={{ backgroundColor: c.hex }}
                    className={`w-full aspect-[5/3] rounded-lg cursor-pointer transition-all ring-4 ${
                      isSelected
                        ? 'ring-[#3DB4E8] scale-105'
                        : 'ring-yellow-300 hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button
                onClick={() => setStep(2)}
                disabled={!character}
                iconLeft={<ArrowRightIcon />}
                className="w-full max-w-[300px] self-center"
              >
                That&apos;s me!
              </Button>
              <StepIndicator current={1} total={2} className="self-end" />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between w-full max-w-[300px] self-center">
              {CHARMS.map((c) => {
                const isSelected = accessory === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.label}
                    aria-pressed={isSelected}
                    onClick={() => setAccessory(c.id)}
                    className={`relative size-[88px] rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer transition-all ring-4 ${
                      isSelected
                        ? 'ring-[#3DB4E8] scale-105'
                        : 'ring-yellow-300 hover:scale-105'
                    }`}
                  >
                    <Image
                      src={c.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <div className="flex flex-col-reverse gap-3 w-full max-w-[300px] self-center">
                <Button
                  kind="secondary"
                  onClick={() => setStep(1)}
                  iconLeft={<ArrowLeftIcon />}
                  className="w-full [--button-color:#fff]"
                >
                  Back
                </Button>
                <Button
                  onClick={() => router.push('/about-you')}
                  disabled={!accessory}
                  iconLeft={<ArrowRightIcon />}
                  className="w-full"
                >
                  Next
                </Button>
              </div>
              <StepIndicator current={2} total={2} className="self-end" />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
