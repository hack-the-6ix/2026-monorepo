import { z } from 'zod';

export const CHARACTER_KEYS = [
  'turnip',
  'brocoli',
  'tomato',
  'mushroom',
  'lantern',
] as const;

export const ACCESSORY_KEYS = ['pie', 'macaroon', 'clover'] as const;

export type CharacterKey = (typeof CHARACTER_KEYS)[number];
export type AccessoryKey = (typeof ACCESSORY_KEYS)[number];

export const characterSheetSchema = z.object({
  character: z.enum(CHARACTER_KEYS).nullable(),
  accessory: z.enum(ACCESSORY_KEYS).nullable(),
});

export type CharacterSheetData = z.infer<typeof characterSheetSchema>;

export const initialCharacterSheet: CharacterSheetData = {
  character: null,
  accessory: null,
};
