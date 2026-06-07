'use client';
import { useState } from 'react';
import { Input, Selector, Typography } from '@hackthe6ix/ui';
import {
  AsYouType,
  isValidPhoneNumber,
  parseIncompletePhoneNumber,
} from 'libphonenumber-js';
import z from 'zod';

import { DIETARY_OPTIONS, RELATIONSHIP_OPTIONS, SHIRT_OPTIONS } from './enum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormDataSchema = z.object({
  ECI: z.object({
    firstName: z.string(),
    lastName: z.string(),
    relationship: z.string(),
    phoneNumber: z.string().refine((val) => isValidPhoneNumber(val), {
      message:
        'Please enter a valid phone number (including country code starting with +)',
    }),
  }),
  personal: z.object({
    discordUsername: z.string(),
    shirtSize: z.string(),
    dietaryRestrictions: z.string(),
  }),
});
export type FormData = z.infer<typeof FormDataSchema>;

const RSVPForm = () => {
  const [formData, setFormData] = useState<FormData>({
    ECI: {
      firstName: '',
      lastName: '',
      relationship: '',
      phoneNumber: '',
    },
    personal: {
      discordUsername: '',
      shirtSize: '',
      dietaryRestrictions: '',
    },
  });

  const updateField = <S extends keyof FormData>(
    section: S,
    field: keyof FormData[S],
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      <Typography
        textSize="paragraph-lg"
        textColor="text-white"
        textWeight="semi-bold"
      >
        We&apos;re so excited to have you join us at Hack the 6ix 2026! Take a
        minute to complete your information now so we can make sure you have
        everything you need for the event.
      </Typography>

      <div className="flex flex-col gap-8">
        <Typography
          textSize="subtitle-lg"
          textColor="text-white"
          textWeight="semi-bold"
        >
          Emergency contact information
        </Typography>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-6">
            <Input
              id="firstName"
              name="firstName"
              label="First name"
              required
              controlled={{
                value: formData.ECI.firstName,
                onValueChange: (v) => updateField('ECI', 'firstName', v),
              }}
              input={{ placeholder: 'ie. John' }}
            />
            <Input
              id="lastName"
              name="lastName"
              label="Last name"
              required
              controlled={{
                value: formData.ECI.lastName,
                onValueChange: (v) => updateField('ECI', 'lastName', v),
              }}
              input={{ placeholder: 'ie. Doe' }}
            />
          </div>
          <div className="flex flex-row gap-6">
            <Selector
              id="relationship"
              name="relationship"
              label="Relationship"
              required
              options={RELATIONSHIP_OPTIONS}
              controlled={{
                value: formData.ECI.relationship || '',
                onValueChange: (val) => updateField('ECI', 'relationship', val),
              }}
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              required
              controlled={{
                value: formData.ECI.phoneNumber || '',
                onValueChange: (v) => {
                  const raw = parseIncompletePhoneNumber(v);
                  const formatted = new AsYouType().input(raw);
                  updateField('ECI', 'phoneNumber', formatted);
                },
              }}
              input={{
                type: 'tel',
                inputMode: 'tel',
                placeholder: 'ie. +16471234567',
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <Typography
            textSize="subtitle-lg"
            textColor="text-white"
            textWeight="semi-bold"
          >
            Your information
          </Typography>
          <Typography
            textSize="paragraph-sm"
            textColor="text-white"
            textWeight="medium"
          >
            We&apos;ll be using Discord to communicate throughout the event.
            Please create an account{' '}
            <a
              className="text-primary-400 underline"
              href="https://discord.com/register"
            >
              here
            </a>{' '}
            if you don&apos;t have one yet!
          </Typography>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-6">
            <Input
              id="discordUsername"
              name="discordUsername"
              label="Discord username"
              required
              controlled={{
                value: formData.personal.discordUsername,
                onValueChange: (v) =>
                  updateField('personal', 'discordUsername', v),
              }}
              input={{ placeholder: 'ie. johndoe123' }}
            />
          </div>
          <div className="flex flex-row gap-6">
            <Selector
              id="shirtSize"
              name="shirtSize"
              label="T-shirt size"
              required
              options={SHIRT_OPTIONS}
              controlled={{
                value: formData.personal.shirtSize || '',
                onValueChange: (val) =>
                  updateField('personal', 'shirtSize', val),
              }}
            />
            <Selector
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              label="Dietary restrictions"
              required
              options={DIETARY_OPTIONS}
              hasOther
              controlled={{
                value: formData.personal.dietaryRestrictions || '',
                onValueChange: (val) =>
                  updateField('personal', 'dietaryRestrictions', val),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
