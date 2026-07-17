'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Selector, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';

import {
  getSocialsFormResponse,
  upsertSocialsFormResponse,
} from '@/actions';
import { getApiErrorMessage } from '@/client';
import { useHacker } from '@/context/HackerContext';
import { HACKER_TYPE_OPTIONS } from '../rsvp-form/enum';

export type SocialsFormData = {
  fullName: string;
  instagram: string;
  linkedin: string;
  discord: string;
  portfolio: string;
  hackerType: string;
};

type PreservedFields = {
  characterBody?: string;
  characterAccessory?: string;
};

const emptyForm: SocialsFormData = {
  fullName: '',
  instagram: '',
  linkedin: '',
  discord: '',
  portfolio: '',
  hackerType: '',
};

function asString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

const SocialsForm = () => {
  const { profile, loading, displayName } = useHacker();
  const [formData, setFormData] = useState<SocialsFormData>(emptyForm);
  const [preserved, setPreserved] = useState<PreservedFields>({});
  const [loadingForm, setLoadingForm] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (loading) return;

    const loadSocials = async () => {
      try {
        setLoadingForm(true);
        setErrorMessage('');
        const existing = await getSocialsFormResponse();
        const json = existing?.responseJson ?? {};

        setFormData({
          fullName: asString(json.fullName) || displayName || '',
          instagram: asString(json.instagram),
          linkedin: asString(json.linkedin),
          discord: asString(json.discord),
          portfolio: asString(json.portfolio),
          hackerType: asString(json.hackerType),
        });
        setPreserved({
          characterBody:
            typeof json.characterBody === 'string' ?
              json.characterBody
            : undefined,
          characterAccessory:
            typeof json.characterAccessory === 'string' ?
              json.characterAccessory
            : undefined,
        });
      } catch (error) {
        console.error(error);
        setErrorMessage(
          getApiErrorMessage(error, 'Unable to load your socials.'),
        );
        if (displayName) {
          setFormData((prev) => ({ ...prev, fullName: displayName }));
        }
      } finally {
        setLoadingForm(false);
      }
    };

    void loadSocials();
  }, [loading, displayName]);

  const updateField = <K extends keyof SocialsFormData>(
    field: K,
    value: SocialsFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuccessMessage('');
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      setErrorMessage('');
      setSuccessMessage('');

      const responseJson: Record<string, unknown> = {
        fullName: formData.fullName.trim(),
        instagram: formData.instagram.trim(),
        linkedin: formData.linkedin.trim(),
        discord: formData.discord.trim(),
        portfolio: formData.portfolio.trim(),
        hackerType: formData.hackerType,
      };

      if (preserved.characterBody) {
        responseJson.characterBody = preserved.characterBody;
      }
      if (preserved.characterAccessory) {
        responseJson.characterAccessory = preserved.characterAccessory;
      }

      await upsertSocialsFormResponse({
        responseJson,
        isSubmitted: false,
      });
      setSuccessMessage('Socials saved!');
    } catch (error) {
      console.error(error);
      setErrorMessage(
        getApiErrorMessage(error, 'Unable to save your socials.'),
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingForm) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start min-h-screen md:w-[70vw] md:py-20 p-8 gap-8">
      <div className="flex flex-col gap-2">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
        >
          Your socials
        </Typography>
        <Typography
          textSize="paragraph-lg"
          textColor="text-white"
          textWeight="semi-bold"
        >
          Add the links and handles you want others to see when they scan your
          NFC tag.
        </Typography>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-[50vw]">
        <Input
          id="displayName"
          name="displayName"
          label="Display name"
          controlled={{
            value: formData.fullName,
            onValueChange: (v) => updateField('fullName', v),
          }}
          input={{ placeholder: 'ie. John Doe' }}
        />
        <Input
          id="instagram"
          name="instagram"
          label="Instagram"
          controlled={{
            value: formData.instagram,
            onValueChange: (v) => updateField('instagram', v),
          }}
          input={{ placeholder: 'ie. johndoe' }}
        />
        <Input
          id="discord"
          name="discord"
          label="Discord"
          controlled={{
            value: formData.discord,
            onValueChange: (v) => updateField('discord', v),
          }}
          input={{ placeholder: 'ie. johndoe123' }}
        />
        <Input
          id="linkedin"
          name="linkedin"
          label="LinkedIn"
          controlled={{
            value: formData.linkedin,
            onValueChange: (v) => updateField('linkedin', v),
          }}
          input={{ placeholder: 'ie. linkedin.com/in/johndoe' }}
        />
        <Input
          id="portfolio"
          name="portfolio"
          label="Portfolio"
          controlled={{
            value: formData.portfolio,
            onValueChange: (v) => updateField('portfolio', v),
          }}
          input={{ placeholder: 'ie. johndoe.xyz' }}
        />
        <Selector
          id="ht6i"
          name="ht6i"
          label={
            <>
              HT6I hacker type{' '}
              <a
                className="text-primary-300 underline"
                href="https://ht6i.hackthe6ix.com/home"
                target="_blank"
                rel="noreferrer"
              >
                (take the quiz)
              </a>
            </>
          }
          hasOther={false}
          dropUp
          options={HACKER_TYPE_OPTIONS}
          controlled={{
            value: formData.hackerType || '',
            onValueChange: (val) => updateField('hackerType', val),
          }}
        />
      </div>

      {(errorMessage || successMessage) && (
        <Typography
          as="p"
          textSize="paragraph-sm"
          textWeight="bold"
          textColor={errorMessage ? 'text-error-500' : 'text-primary-300'}
        >
          {errorMessage || successMessage}
        </Typography>
      )}

      <div className="flex flex-col w-full gap-2 md:w-[50vw]">
        <hr className="text-white/30" />
        <div className="flex flex-row justify-between w-full">
          <Button as={Link} href="/" kind="secondary">
            Back
          </Button>
          <Button onClick={handleSave} kind="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save socials'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialsForm;
