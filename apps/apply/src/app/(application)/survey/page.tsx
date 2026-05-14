'use client';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HyperLink, Input, Typography } from '@hackthe6ix/ui';

import FormStep from '@/components/FormStep';
import { useApplicationContext, FormData } from '@/context/ApplicationContext';

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
  { key: 'hackathonCount',    label: 'How many overnight, in-person hackathons have you attended?',                    required: true  },
  { key: 'hackathonList',     label: 'Which overnight, in person hackathons have you attended in the last 12 months?', required: false },
  { key: 'hackathonCapacity', label: 'In what capacity have you attended these hackathons? Select all that apply.',    required: false },
  { key: 'previousHT6',      label: 'Previous Hack the 6ix Experience. Select all that apply.',                       required: false },
  { key: 'howDidYouHear',    label: 'Where did you hear about Hack the 6ix? Select all that apply.',                  required: false },
  { key: 'mlh',              label: 'Final step, we need your permission!',                                            required: true  },
];

function StyledCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer rounded-lg bg-white/10 border border-white/20 px-4 py-3 hover:bg-white/15 transition-colors select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 mt-0.5 accent-primary-400 shrink-0"
      />
      <Typography textSize="paragraph-sm" textColor="text-white">
        {children}
      </Typography>
    </label>
  );
}

function SurveyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { formData, updateFormData } = useApplicationContext();
  const survey = formData.survey;

  const updateField = <K extends keyof SurveyData>(field: K, value: SurveyData[K]) => {
    updateFormData('survey', { ...survey, [field]: value });
  };

  const toggleArray = (
    field: 'hackathonCapacity' | 'howDidYouHearAboutHT6' | 'previousHT6Experience',
    value: string,
  ) => {
    const current: string[] = (survey[field] as string[]) ?? [];
    if (current.includes(value)) {
      updateField(field, current.filter((v) => v !== value) as SurveyData[typeof field]);
    } else {
      updateField(field, [...current, value] as SurveyData[typeof field]);
    }
  };

  const hearSelected = survey.howDidYouHearAboutHT6 ?? [];
  const needsAnotherHackathonText = hearSelected.includes('Another hackathon (please specify below)');
  const needsOtherText = hearSelected.includes('Other (please specify below)');
  const hackathonCount = parseInt(survey.hackathonsAttended || '0', 10);
  const attendedHackathon = !isNaN(hackathonCount) && hackathonCount >= 1;

  const activePages = PAGES.filter(
    (p) => p.key !== 'hackathonList' && p.key !== 'hackathonCapacity' || attendedHackathon,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HACKATHON_CAPACITY.map((option) => (
              <StyledCheckbox
                key={option}
                checked={(survey.hackathonCapacity ?? []).includes(option)}
                onChange={() => toggleArray('hackathonCapacity', option)}
              >
                {option}
              </StyledCheckbox>
            ))}
          </div>
        );

      case 'previousHT6':
        return (
          <div className="flex flex-col gap-3">
            {PREVIOUS_HT6_EXPERIENCE.map((option) => (
              <StyledCheckbox
                key={option}
                checked={(survey.previousHT6Experience ?? []).includes(option)}
                onChange={() => toggleArray('previousHT6Experience', option)}
              >
                {option}
              </StyledCheckbox>
            ))}
          </div>
        );

      case 'howDidYouHear':
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HOW_DID_YOU_HEAR_ABOUT_HT6.map((option) => (
                <StyledCheckbox
                  key={option}
                  checked={hearSelected.includes(option)}
                  onChange={() => toggleArray('howDidYouHearAboutHT6', option)}
                >
                  {option}
                </StyledCheckbox>
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
                  onValueChange: (v) => updateField('howDidYouHearAnotherHackathon', v),
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
          <div className="flex flex-col gap-4">
            <StyledCheckbox
              checked={survey.mlhCodeOfConduct ?? false}
              onChange={() => updateField('mlhCodeOfConduct', !survey.mlhCodeOfConduct)}
            >
              <span className="inline">
                I have read and agree to the{' '}
                <HyperLink href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noopener noreferrer" className="!px-0 !py-0 inline">
                  MLH Code of Conduct
                </HyperLink>.{' '}
                <span className="text-error-400">*</span>
              </span>
            </StyledCheckbox>

            <StyledCheckbox
              checked={survey.mlhDataPermission ?? false}
              onChange={() => updateField('mlhDataPermission', !survey.mlhDataPermission)}
            >
              <span className="inline">
                I authorize you to share my application/registration information with Major
                League Hacking for event administration, ranking, and MLH administration
                in-line with the{' '}
                <HyperLink href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" className="!px-0 !py-0 inline">
                  MLH Privacy Policy
                </HyperLink>. I further agree to the terms of both the{' '}
                <HyperLink href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer" className="!px-0 !py-0 inline">
                  MLH Contest Terms and Conditions
                </HyperLink>{' '}
                and the{' '}
                <HyperLink href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" className="!px-0 !py-0 inline">
                  MLH Privacy Policy
                </HyperLink>.{' '}
                <span className="text-error-400">*</span>
              </span>
            </StyledCheckbox>

            <StyledCheckbox
              checked={survey.mlhEmailPermission ?? false}
              onChange={() => updateField('mlhEmailPermission', !survey.mlhEmailPermission)}
            >
              I authorize MLH to send me occasional emails about relevant events, career
              opportunities, and community announcements.
            </StyledCheckbox>
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
