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
import {
  DIETARY_OPTIONS,
  HACKER_TYPE_OPTIONS,
  RELATIONSHIP_OPTIONS,
  SHIRT_OPTIONS,
} from './enum';

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
    hackerType: z.string(),
  }),
  acknowledgements: z.object({
    liabilityWaiver: z.boolean(),
    personalProperty: z.boolean(),
    mediaRelease: z.boolean(),
    codeOfConduct: z.boolean(),
    allTerms: z.boolean(),
  }),
});
export type FormData = z.infer<typeof FormDataSchema>;

const RSVPForm = () => {
  const router = useRouter();
  const { profile, status, loading, refresh } = useHacker();

  useEffect(() => {
    if (loading) return;
    if (status !== 'accepted') {
      router.push('/');
    }
  }, [status, loading, router]);

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
      hackerType: '',
    },
    acknowledgements: {
      liabilityWaiver: false,
      personalProperty: false,
      mediaRelease: false,
      codeOfConduct: false,
      allTerms: false,
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

  const updateAck = (
    field: keyof FormData['acknowledgements'],
    value: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      acknowledgements: { ...prev.acknowledgements, [field]: value },
    }));
  };

  const allFilled = Object.values(formData).every((section) =>
    Object.values(section).every(Boolean),
  );

  if (loading) {
    return <div>Loading...</div>; // or your loading UI
  }

  return (
    <div className="flex flex-col items-start justify-center min-h-screen md:w-[70vw] pt-20 p-8 gap-8">
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
        <div className="flex flex-col w-full gap-0.5">
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
              href="https://support.discord.com/hc/en-us/articles/360033931551-Getting-Started"
              target="_blank"
            >
              here
            </a>{' '}
            if you don&apos;t have one yet!
          </Typography>
          <Typography
            textSize="paragraph-sm"
            textColor="text-white"
            textWeight="medium"
          >
            ALSO Take our hacker personality quiz at {''}
            <a
              className="text-primary-400 underline"
              href="https://ht6i.hackthe6ix.com/home"
              target="_blank"
            >
              ht6i.hackthe6ix.com
            </a>{' '}
            to find out what kind of hacker you are! :]
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
            <Selector
              id="hackerType"
              name="hackerType"
              label="HT6I hacker type"
              required
              hasOther={false}
              options={HACKER_TYPE_OPTIONS}
              controlled={{
                value: formData.personal.hackerType || '',
                onValueChange: (val) =>
                  updateField('personal', 'hackerType', val),
              }}
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
      <div className="flex flex-col gap-4 w-full">
        <Typography
          textSize="subtitle-lg"
          textColor="text-white"
          textWeight="semi-bold"
        >
          Terms &amp; Acknowledgements
        </Typography>

        {/* Scrollable terms */}
        <div
          className="w-full md:w-[50vw] rounded-lg border border-white/20 bg-white/5
                        max-h-60 overflow-y-auto p-4 text-sm text-white/80 leading-relaxed"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
            Liability Waiver
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li>Participation in Hack the 6ix 2026 is voluntary.</li>
            <li>
              I understand that participation may involve certain risks,
              including but not limited to personal injury, illness, property
              damage, or loss.
            </li>
            <li>
              To the fullest extent permitted by law, Hack the 6ix, its
              organizers, volunteers, sponsors, venue partners, and affiliates
              are not liable for any injury, loss, damage, claim, or expense
              arising from my participation in the event.
            </li>
          </ul>

          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
            Personal Property
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li>
              I am solely responsible for my personal belongings and equipment.
            </li>
            <li>
              Hack the 6ix is not responsible for any lost, stolen, damaged, or
              misplaced property, including laptops, devices, bags, or other
              personal items.
            </li>
          </ul>

          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
            Media Release
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li>
              I grant Hack the 6ix permission to photograph, record, livestream,
              or otherwise capture my likeness, voice, and participation during
              the event.
            </li>
            <li>
              These photos, videos, and recordings may be used for promotional,
              marketing, educational, archival, or other event-related purposes
              without compensation.
            </li>
          </ul>

          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
            Code of Conduct
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              I agree to follow the MLH Code of Conduct throughout the event.
            </li>
            <li>
              Failure to comply may result in removal from the event without
              warning or compensation.
            </li>
          </ul>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 w-full md:w-[50vw]">
          {[
            {
              key: 'liabilityWaiver' as const,
              label:
                'I understand and accept that Hack the 6ix is not liable for any personal injury, illness, loss, theft, or damage to my property arising from participation in the event.',
            },
            {
              key: 'personalProperty' as const,
              label:
                'I understand that I am responsible for my own belongings and equipment throughout the event.',
            },
            {
              key: 'mediaRelease' as const,
              label:
                'I consent to being photographed, recorded, or filmed during Hack the 6ix 2026 and allow Hack the 6ix to use such content for event-related purposes.',
            },
            {
              key: 'codeOfConduct' as const,
              label:
                'I have read and agree to abide by the MLH Code of Conduct.',
            },
            {
              key: 'allTerms' as const,
              label:
                'I confirm that I have read and agree to all of the terms above.',
            },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-start gap-3 p-3 rounded-lg border border-white/15
                        bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.acknowledgements[key]}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (key === 'allTerms') {
                    setFormData((prev) => ({
                      ...prev,
                      acknowledgements: {
                        liabilityWaiver: checked,
                        personalProperty: checked,
                        mediaRelease: checked,
                        codeOfConduct: checked,
                        allTerms: checked,
                      },
                    }));
                  } else {
                    updateAck(key, checked);
                    if (!checked) updateAck('allTerms', false);
                  }
                }}
                className="mt-0.5 w-4 h-4 flex-shrink-0 accent-violet-400 cursor-pointer"
              />
              <span className="text-sm text-white/85 leading-relaxed">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <hr className="text-white" />
        <div className="flex flex-row justify-between w-full">
          <Button as={Link} href="/" kind="secondary">
            Back
          </Button>
          <Button onClick={handleSubmit} kind="primary" disabled={!allFilled}>
            Submit RVSP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
