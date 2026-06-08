'use client';
import { useEffect, useState } from 'react';
import { Button, Input, Selector, Typography } from '@hackthe6ix/ui';
import {
  AsYouType,
  isValidPhoneNumber,
  parseIncompletePhoneNumber,
} from 'libphonenumber-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import z from 'zod';

import { changeHackerRsvpStatus, upsertFormResponse } from '@/actions';
import { useHacker } from '@/context/HackerContext';
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
  const router = useRouter();
  const { profile, status, refresh } = useHacker();

  useEffect(() => {
    if (!status) return;
    if (status != 'accepted') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = async () => {
    if (!profile) return;
    await upsertFormResponse({
      responseJson: formData,
      isSubmitted: true,
    });
    await changeHackerRsvpStatus(profile.userId, 'rsvped', 'S26');
    refresh();
    router.push('/');
  };

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
    <div className="flex flex-col items-start justify-center min-h-screen md:w-[70vw] pt-15 p-8 gap-8">
      <Typography
        textSize="paragraph-lg"
        textColor="text-white"
        textWeight="semi-bold"
      >
        We&apos;re so excited to have you join us at Hack the 6ix 2026! Take a
        minute to complete your information now so we can make sure you have
        everything you need for the event.
      </Typography>

      <div className="flex flex-col gap-4 w-full">
        <Typography
          textSize="subtitle-lg"
          textColor="text-white"
          textWeight="semi-bold"
        >
          Emergency contact information
        </Typography>
        <div className="flex flex-col gap-4 w-full md:w-[50vw]">
          <div className="flex flex-col md:flex-row gap-6 w-full">
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
              className="flex-1 min-w-0"
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
              className="flex-1 min-w-0"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <Selector
              id="relationship"
              name="relationship"
              label="Relationship"
              required
              hasOther={false}
              options={RELATIONSHIP_OPTIONS}
              controlled={{
                value: formData.ECI.relationship || '',
                onValueChange: (val) => updateField('ECI', 'relationship', val),
              }}
              className="flex-1 min-w-0"
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
              className="flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col w-full">
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
              target="_blank"
            >
              here
            </a>{' '}
            if you don&apos;t have one yet!
          </Typography>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[50vw]">
          <div className="flex flex-col md:flex-row gap-6 w-full">
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
              className="flex-1 min-w-0"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <Selector
              id="shirtSize"
              name="shirtSize"
              label="T-shirt size"
              required
              hasOther={false}
              options={SHIRT_OPTIONS}
              controlled={{
                value: formData.personal.shirtSize || '',
                onValueChange: (val) =>
                  updateField('personal', 'shirtSize', val),
              }}
              className="flex-1 min-w-0"
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
              className="flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <hr className="text-white" />
        <div className="flex flex-row justify-between w-full">
          <Button as={Link} href="/" kind="secondary">
            Back
          </Button>
          <Button onClick={handleSubmit} kind="primary">
            Submit RVSP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
