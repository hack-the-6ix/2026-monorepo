'use client';

import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { CharacterFrame } from '@/components/CharacterFrame';
import FormStep from '@/components/FormStep'; // Fixed capitalization import standard
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
  {
    id: 'macaroon',
    label: 'Macaroon',
    src: '/assets/accessories/macaroon.svg',
  },
  { id: 'clover', label: 'Clover', src: '/assets/accessories/Clover.svg' },
];

export default function CharacterSheetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10) as 1 | 2;

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
    page === 2 ? (CHARMS.find((c) => c.id === accessory)?.src ?? null) : null;

  const handlePrevSection = () => {
    if (page === 2) {
      router.push('/about-you/character-sheet?page=1');
    } else {
      router.push('/');
    }
  };

  const handleNextSection = () => {
    if (page === 1) {
      router.push('/about-you/character-sheet?page=2');
    } else if (page === 2) {
      router.push('/about-you');
    }
  };

  const stepLabel =
    page === 1 ? 'Mirror, mirror, on the wall...' : "What's your lucky charm?";

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-3 md:items-center">
      <FormStep
        label={stepLabel}
        current={page}
        total={2}
        required={false}
        handlePrevSection={handlePrevSection}
        handleNextSection={handleNextSection}
        width="md:w-[50vw] md:col-span-2 "
      >
        {page === 1 ?
          <div className="flex flex-col gap-3">
            <Typography
              textColor="text-warning-400"
              textSize="subtitle-lg"
              textWeight="bold"
            >
              What do you see?
            </Typography>
            <CharacterFrame
              characterKey={displayCharacter}
              accessory={accessorySrc}
              className="md:hidden flex self-center md:self-auto"
            />
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 p-1.5 max-w-full md:max-w-90">
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
                    className={`w-full aspect-5/3 md:aspect-square md:size-12 rounded-lg cursor-pointer transition-all ring-4 ${
                      isSelected ?
                        'ring-[#3DB4E8] scale-105'
                      : 'ring-yellow-300 hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        : <div className="flex flex-col gap-3">
            <CharacterFrame
              characterKey={displayCharacter}
              accessory={accessorySrc}
              className="md:hidden flex self-center md:self-auto"
            />
            <div className="grid grid-cols-3 gap-6 p-1.5 max-w-full md:max-w-65">
              {CHARMS.map((c) => {
                const isSelected = accessory === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.label}
                    aria-pressed={isSelected}
                    onClick={() => setAccessory(c.id)}
                    className={`relative aspect-5/4 md:aspect-square md:size-16 rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer transition-all ring-4 ${
                      isSelected ?
                        'ring-[#3DB4E8] scale-105'
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
        }
      </FormStep>
      <CharacterFrame
        characterKey={displayCharacter}
        accessory={accessorySrc}
        className="hidden md:flex"
      />
    </div>
  );
}
