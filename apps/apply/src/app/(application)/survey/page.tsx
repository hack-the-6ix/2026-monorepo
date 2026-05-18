'use client';
import { Suspense } from 'react';
import { Checkbox, HyperLink, Input, Typography } from '@hackthe6ix/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { FormData, useApplicationContext } from '@/context/ApplicationContext';
import {
  HACKATHON_CAPACITY,
  HOW_DID_YOU_HEAR_ABOUT_HT6,
  PREVIOUS_HT6_EXPERIENCE,
} from './enums';

type SurveyData = FormData['survey'];

type PageKey =
  | 'hackathonCount'
  | 'hackathonList'
  | 'hackathonCapacity'
  | 'previousHT6'
  | 'howDidYouHear'
  | 'mlh';

interface PageConfig {
  key: PageKey;
  label: string;
  required: boolean;
}

const PAGES: PageConfig[] = [
  {
    key: 'hackathonCount',
    label: 'How many overnight, in-person hackathons have you attended?',
    required: true,
  },
  {
    key: 'hackathonList',
    label:
      'Which overnight, in person hackathons have you attended in the last 12 months?',
    required: false,
  },
  {
    key: 'hackathonCapacity',
    label:
      'In what capacity have you attended these hackathons? Select all that apply.',
    required: false,
  },
  {
    key: 'previousHT6',
    label: 'Previous Hack the 6ix Experience. Select all that apply.',
    required: false,
  },
  {
    key: 'howDidYouHear',
    label: 'Where did you hear about Hack the 6ix? Select all that apply.',
    required: false,
  },
  { key: 'mlh', label: 'Final step, we need your permission!', required: true },
];

function SurveyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { formData, updateFormData } = useApplicationContext();
  const survey = formData.survey;

  const updateField = <K extends keyof SurveyData>(
    field: K,
    value: SurveyData[K],
  ) => {
    updateFormData('survey', { ...survey, [field]: value });
  };

  const toggleArray = (
    field:
      | 'hackathonCapacity'
      | 'howDidYouHearAboutHT6'
      | 'previousHT6Experience',
    value: string,
  ) => {
    const current: string[] = (survey[field] as string[]) ?? [];
    if (current.includes(value)) {
      updateField(
        field,
        current.filter((v) => v !== value) as SurveyData[typeof field],
      );
    } else {
      updateField(field, [...current, value] as SurveyData[typeof field]);
    }
  };

  const hearSelected = survey.howDidYouHearAboutHT6 ?? [];
  const needsAnotherHackathonText = hearSelected.includes(
    'Another hackathon (please specify below)',
  );
  const needsOtherText = hearSelected.includes('Other (please specify below)');
  const hackathonCount = parseInt(survey.hackathonsAttended || '0', 10);
  const attendedHackathon = !isNaN(hackathonCount) && hackathonCount >= 1;

  const activePages = PAGES.filter(
    (p) =>
      (p.key !== 'hackathonList' && p.key !== 'hackathonCapacity') ||
      attendedHackathon,
  );
  const totalPages = activePages.length;
  const currentPageConfig = activePages[page - 1];

  const goToPage = (p: number) => router.push(`/survey?page=${p}`);

  const handlePrevSection = () => {
    if (page > 1) goToPage(page - 1);
    else router.push('/long-answer?page=3');
  };

  const handleNextSection = () => {
    if (page < totalPages) goToPage(page + 1);
    else router.push('/review');
  };

  const renderPage = () => {
    if (!currentPageConfig) return null;

    switch (currentPageConfig.key) {
      case 'hackathonCount':
        return (
          <Input
            id="hackathonsAttended"
            name="hackathonsAttended"
            label=""
            hideLabel
            controlled={{
              value: survey.hackathonsAttended ?? '',
              onValueChange: (v) => {
                const num = parseInt(v, 10);
                if (v === '' || num >= 0) updateField('hackathonsAttended', v);
              },
            }}
            input={{
              type: 'number',
              min: 0,
              placeholder: '0',
            }}
          />
        );

      case 'hackathonList':
        return (
          <Input
            id="hackathonsAttendedList"
            name="hackathonsAttendedList"
            label=""
            hideLabel
            controlled={{
              value: survey.hackathonsAttendedList ?? '',
              onValueChange: (v) => updateField('hackathonsAttendedList', v),
            }}
            input={{
              placeholder: 'e.g. Hack the 6ix, QHacks, Hack Western...',
            }}
          />
        );

      case 'hackathonCapacity':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3">
            {HACKATHON_CAPACITY.map((option) => (
              <Checkbox
                key={option}
                id={`hackathonCapacity-${option}`}
                name="hackathonCapacity"
                option={{ label: option, value: option }}
                controlled={{
                  value: (survey.hackathonCapacity ?? []).includes(option),
                  onValueChange: () => toggleArray('hackathonCapacity', option),
                }}
                label=""
                hideLabel
                className="text-base"
              />
            ))}
          </div>
        );

      case 'previousHT6':
        return (
          <div className="flex flex-col">
            {PREVIOUS_HT6_EXPERIENCE.map((option) => (
              <Checkbox
                key={option}
                id={`previousHT6Experience-${option}`}
                name="previousHT6Experience"
                option={{ label: option, value: option }}
                controlled={{
                  value: (survey.previousHT6Experience ?? []).includes(option),
                  onValueChange: () =>
                    toggleArray('previousHT6Experience', option),
                }}
                label=""
                hideLabel
                className="text-base"
              />
            ))}
          </div>
        );

      case 'howDidYouHear':
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {HOW_DID_YOU_HEAR_ABOUT_HT6.map((option) => (
                <Checkbox
                  key={option}
                  id={`howDidYouHearAboutHT6-${option}`}
                  name="howDidYouHearAboutHT6"
                  option={{ label: option, value: option }}
                  controlled={{
                    value: hearSelected.includes(option),
                    onValueChange: () =>
                      toggleArray('howDidYouHearAboutHT6', option),
                  }}
                  label=""
                  hideLabel
                  className="text-base"
                />
              ))}
            </div>
            {needsAnotherHackathonText && (
              <Input
                id="howDidYouHearAnotherHackathon"
                name="howDidYouHearAnotherHackathon"
                label=""
                hideLabel
                controlled={{
                  value: survey.howDidYouHearAnotherHackathon ?? '',
                  onValueChange: (v) =>
                    updateField('howDidYouHearAnotherHackathon', v),
                }}
                input={{ placeholder: 'Which hackathon?' }}
              />
            )}
            {needsOtherText && (
              <Input
                id="howDidYouHearOther"
                name="howDidYouHearOther"
                label=""
                hideLabel
                controlled={{
                  value: survey.howDidYouHearOther ?? '',
                  onValueChange: (v) => updateField('howDidYouHearOther', v),
                }}
                input={{ placeholder: 'Please specify...' }}
              />
            )}
          </div>
        );

      case 'mlh':
        return (
          <div className="flex flex-col">
            <Checkbox
              id="mlhCodeOfConduct"
              name="mlhCodeOfConduct"
              option={{
                value: 'mlhCodeOfConduct',
                label: (
                  <span className="inline text-base">
                    I have read and agree to the{' '}
                    <HyperLink
                      href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!px-0 !py-0 inline text-base"
                    >
                      MLH Code of Conduct
                    </HyperLink>
                    <span className="text-error-400">*</span>
                  </span>
                ) as unknown as string, // Cast to bypass your design system's string-only typings
              }}
              controlled={{
                value: survey.mlhCodeOfConduct ?? false,
                onValueChange: (checked) =>
                  updateField('mlhCodeOfConduct', checked),
              }}
              label=""
              hideLabel
            />

            <Checkbox
              id="mlhEmailPermission"
              name="mlhEmailPermission"
              option={{
                value: 'mlhEmailPermission',
                label:
                  'I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.',
              }}
              controlled={{
                value: survey.mlhEmailPermission ?? false,
                onValueChange: (checked) =>
                  updateField('mlhEmailPermission', checked),
              }}
              label=""
              hideLabel
              className="text-base"
            />

            <Checkbox
              id="mlhDataPermission"
              name="mlhDataPermission"
              option={{
                value: 'mlhDataPermission',
                label: (
                  <span className="inline text-base">
                    I authorize you to share my application/registration
                    informationwith Major League Hacking for event
                    administration, ranking, and MLH administration in-line with
                    the MLH Privacy Policy. I further agree to the terms of both
                    the{' '}
                    <HyperLink
                      href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!px-0 !py-0 inline text-base"
                    >
                      MLH Contest Terms and Conditions
                    </HyperLink>{' '}
                    and the{' '}
                    <HyperLink
                      href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!px-0 !py-0 inline text-base"
                    >
                      MLH Privacy Policy
                    </HyperLink>
                    <span className="text-error-400">*</span>
                  </span>
                ) as unknown as string,
              }}
              controlled={{
                value: survey.mlhDataPermission ?? false,
                onValueChange: (checked) =>
                  updateField('mlhDataPermission', checked),
              }}
              label=""
              hideLabel
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={page}
      total={totalPages}
      label={currentPageConfig?.label ?? ''}
      required={currentPageConfig?.required ?? false}
    >
      {renderPage()}
    </FormStep>
  );
}

export default function Survey() {
  return (
    <Suspense>
      <SurveyContent />
    </Suspense>
  );
}
