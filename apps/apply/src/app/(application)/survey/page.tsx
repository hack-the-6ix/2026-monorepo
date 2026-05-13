'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@hackthe6ix/ui';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

interface SurveyData {
  hackathonsAttended: string;
  hackathonsAttendedList: string;
  hackathonCapacity: string[];
  previousHT6Experience: string[];
  howDidYouHearAboutHT6: string[];
  howDidYouHearAnotherHackathon: string;
  howDidYouHearOther: string;
  gender: string;
  ethnicity: string;
  mlhCodeOfConduct: boolean;
  mlhDataPermission: boolean;
  mlhEmailPermission: boolean;
}

const ENUMS = {
  hackathonCapacity: [
    'Hacker',
    'Volunteer',
    'Organizer',
    'Mentor',
    'Judge',
    'Workshop host',
    'Other',
  ],
  previousHT6Experience: [
    "I've previously applied for Hack the 6ix",
    "I've previously attended Hack the 6ix as a hacker",
    "I've previously attended Hack the 6ix as a volunteer",
    "I've previously attended Hack the 6ix in another capacity (mentor, workshop host, etc)",
  ],
  howDidYouHearAboutHT6: [
    'Word of Mouth',
    'Instagram',
    'Discord',
    'Website',
    'LinkedIn',
    'Email',
    'X/Twitter',
    'JamHacks',
    'Hack Western',
    'SheHacks',
    'ElleHacks',
    'QHacks',
    'Another hackathon (please specify below)',
    'Other (please specify below)',
  ],
  gender: [
    'Man', 'Woman', 'Non-binary', 'Genderqueer',
    'Agender', 'Prefer not to say', 'Other',
  ],
  ethnicity: [
    'Asian', 'Black or African American', 'Hispanic or Latino',
    'Middle Eastern', 'Native American', 'Pacific Islander',
    'White', 'Mixed', 'Prefer not to say', 'Other',
  ],
};

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
  { key: 'hackathonCount',    label: 'How many overnight, in-person hackathons have you attended?',                       required: true  },
  { key: 'hackathonList',     label: 'Which overnight, in person hackathons have you attended in the last 12 months?',    required: false },
  { key: 'hackathonCapacity', label: 'In what capacity have you attended these hackathons? Select all that apply.',       required: false },
  { key: 'previousHT6',      label: 'Previous Hack the 6ix Experience. Select all that apply.',                          required: false },
  { key: 'howDidYouHear',    label: 'Where did you hear about Hack the 6ix? Select all that apply.',                     required: false },
  { key: 'mlh',              label: 'Final step: we need your permission!',                                               required: true  },
];

// Sub-components
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

function StyledSelect({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all appearance-none cursor-pointer"
    >
      <option value="" disabled className="bg-neutral-800 text-white/50">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-neutral-800 text-white">{opt}</option>
      ))}
    </select>
  );
}

function StyledInput({
  value, onChange, placeholder, type = 'text', min,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  min?: number;
}) {
  return (
    <input
      type={type}
      min={min}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
    />
  );
}

function YellowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-warning-400 font-medium underline underline-offset-2 hover:text-warning-300 transition-colors"
    >
      {children}
    </a>
  );
}

// Main component
export default function Survey() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { formData, updateFormData } = useApplicationContext();
  const survey = (formData.survey as unknown as SurveyData) ?? {};

  const updateField = <K extends keyof SurveyData>(field: K, value: SurveyData[K]) => {
    updateFormData('survey', { ...survey, [field]: value });
  };

  const toggleArray = (
    field: 'hackathonCapacity' | 'howDidYouHearAboutHT6' | 'previousHT6Experience',
    value: string,
    max?: number,
  ) => {
    const current: string[] = (survey[field] as string[]) ?? [];
    if (current.includes(value)) {
      updateField(field, current.filter((v) => v !== value) as SurveyData[typeof field]);
    } else if (!max || current.length < max) {
      updateField(field, [...current, value] as SurveyData[typeof field]);
    }
  };

  const hearSelected = survey.howDidYouHearAboutHT6 ?? [];
  const needsAnotherHackathonText = hearSelected.includes('Another hackathon (please specify below)');
  const needsOtherText = hearSelected.includes('Other (please specify below)');
  const hackathonCount = parseInt(survey.hackathonsAttended || '0', 10);
  const attendedHackathon = !isNaN(hackathonCount) && hackathonCount >= 1;

  // Skip hackathonList and hackathonCapacity pages if count is 0 or empty
  const activePages = PAGES.filter(
    (p) => p.key !== 'hackathonList' && p.key !== 'hackathonCapacity' || attendedHackathon,
  );
  const totalPages = activePages.length;
  const currentPageConfig = activePages[page - 1];

  const canProceed = (): boolean => {
    if (!currentPageConfig) return false;
    switch (currentPageConfig.key) {
      case 'hackathonCount':    return survey.hackathonsAttended !== '' && survey.hackathonsAttended !== undefined;
      case 'hackathonList':     return true;
      case 'hackathonCapacity': return true;
      case 'previousHT6':      return true;
      case 'howDidYouHear':    return true;
      case 'mlh':               return !!survey.mlhCodeOfConduct && !!survey.mlhDataPermission;
      default:                  return true;
    }
  };

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

      // ── Hackathon count ──────────────────────────────────────────────────
      case 'hackathonCount':
        return (
          <StyledInput
            type="number"
            min={0}
            value={survey.hackathonsAttended ?? ''}
            onChange={(v) => {
              const num = parseInt(v, 10);
              if (v === '' || num >= 0) updateField('hackathonsAttended', v);
            }}
            placeholder="0"
          />
        );

      // ── Hackathon list ───────────────────────────────────────────────────
      case 'hackathonList':
        return (
          <StyledInput
            value={survey.hackathonsAttendedList ?? ''}
            onChange={(v) => updateField('hackathonsAttendedList', v)}
            placeholder="e.g. Hack the 6ix, QHacks, Hack Western..."
          />
        );

      // ── Hackathon capacity ───────────────────────────────────────────────
      case 'hackathonCapacity':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ENUMS.hackathonCapacity.map((option) => (
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

      // ── Previous HT6 ─────────────────────────────────────────────────────
      case 'previousHT6':
        return (
          <div className="flex flex-col gap-3">
            {ENUMS.previousHT6Experience.map((option) => (
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

      // ── How did you hear ─────────────────────────────────────────────────
      case 'howDidYouHear':
        return (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ENUMS.howDidYouHearAboutHT6.map((option) => (
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
              <StyledInput
                value={survey.howDidYouHearAnotherHackathon ?? ''}
                onChange={(v) => updateField('howDidYouHearAnotherHackathon', v)}
                placeholder="Which hackathon?"
              />
            )}
            {needsOtherText && (
              <StyledInput
                value={survey.howDidYouHearOther ?? ''}
                onChange={(v) => updateField('howDidYouHearOther', v)}
                placeholder="Please specify..."
              />
            )}
          </div>
        );

      // ── MLH ──────────────────────────────────────────────────────────────
      case 'mlh':
        return (
          <div className="flex flex-col gap-4">
            <StyledCheckbox
              checked={survey.mlhCodeOfConduct ?? false}
              onChange={() => updateField('mlhCodeOfConduct', !survey.mlhCodeOfConduct)}
            >
              I have read and agree to the{' '}
              <YellowLink href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">
                MLH Code of Conduct
              </YellowLink>.{' '}
              <span className="text-error-400">*</span>
            </StyledCheckbox>

            <StyledCheckbox
              checked={survey.mlhDataPermission ?? false}
              onChange={() => updateField('mlhDataPermission', !survey.mlhDataPermission)}
            >
              I authorize you to share my application/registration information with Major
              League Hacking for event administration, ranking, and MLH administration
              in-line with the{' '}
              <YellowLink href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
                MLH Privacy Policy
              </YellowLink>. I further agree to the terms of both the{' '}
              <YellowLink href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
                MLH Contest Terms and Conditions
              </YellowLink>{' '}
              and the{' '}
              <YellowLink href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">
                MLH Privacy Policy
              </YellowLink>.{' '}
              <span className="text-error-400">*</span>
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
      handleNextSection={canProceed() ? handleNextSection : undefined}
      current={page}
      total={totalPages}
      label={currentPageConfig?.label ?? ''}
      required={currentPageConfig?.required ?? false}
    >
      {renderPage()}
    </FormStep>
  );
}
