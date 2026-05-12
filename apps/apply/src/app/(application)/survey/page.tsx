'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@hackthe6ix/ui';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';


interface SurveyData {
  requestedWorkshops: string[];
  tshirtSize: string;
  dietaryRestrictions: string;
  allergies: string;
  gender: string;
  ethnicity: string;
  mlhCodeOfConduct: boolean;
  mlhEmailPermission: boolean;
  mlhDataPermission: boolean;
}

const TOTAL_PAGES = 5;

const ENUMS = {
  requestedWorkshops: [
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Cybersecurity',
    'Game Development',
    'Blockchain',
    'Cloud Computing',
    'UI/UX Design',
    'Data Science',
  ],
  shirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  dietaryRestrictions: [
    'None',
    'Vegetarian',
    'Vegan',
    'Halal',
    'Kosher',
    'Gluten-Free',
    'Other',
  ],
  gender: [
    'Man',
    'Woman',
    'Non-binary',
    'Genderqueer',
    'Agender',
    'Prefer not to say',
    'Other',
  ],
  ethnicity: [
    'Asian',
    'Black or African American',
    'Hispanic or Latino',
    'Middle Eastern',
    'Native American',
    'Pacific Islander',
    'White',
    'Mixed',
    'Prefer not to say',
    'Other',
  ],
};

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
      <Typography textSize="paragraph-md" textColor="text-white">
        {children}
      </Typography>
    </label>
  );
}

function StyledSelect({
  value,
  onChange,
  options,
  placeholder,
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
      <option value="" disabled className="bg-neutral-800 text-white/50">
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-neutral-800 text-white">
          {opt}
        </option>
      ))}
    </select>
  );
}

function StyledInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
    />
  );
}

function YellowLink({ children }: { children: React.ReactNode }) {
  return <span className="text-warning-400 font-medium">{children}</span>;
}

export default function Survey() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { formData, updateFormData } = useApplicationContext();
  const survey = (formData.survey as unknown as SurveyData) ?? {};

  const updateField = <K extends keyof SurveyData>(field: K, value: SurveyData[K]) => {
    updateFormData('survey', { ...survey, [field]: value });
  };

  const toggleWorkshop = (value: string) => {
    const current = survey.requestedWorkshops ?? [];
    if (current.includes(value)) {
      updateField('requestedWorkshops', current.filter((v) => v !== value));
    } else if (current.length < 3) {
      updateField('requestedWorkshops', [...current, value]);
    }
  };

  const goToPage = (p: number) => router.push(`/survey?page=${p}`);

  const handlePrevSection = () => {
    if (page > 1) goToPage(page - 1);
    else router.push('/long-answer?page=3');
  };

  const handleNextSection = () => {
    if (page < TOTAL_PAGES) goToPage(page + 1);
    else router.push('/review');
  };

  const canProceed = (): boolean => {
    switch (page) {
      case 1: return (survey.requestedWorkshops ?? []).length === 3;
      case 2: return !!survey.tshirtSize;
      case 3: return true; // optional
      case 4: return true; // optional
      case 5: return !!survey.mlhCodeOfConduct && !!survey.mlhDataPermission;
      default: return true;
    }
  };

  const PAGE_LABELS: Record<number, string> = {
    1: 'Please choose 3 workshops that you are interested in.',
    2: "What's your t-shirt size?",
    3: 'Please specify any dietary restrictions or allergies you have.',
    4: 'Please specify your gender and background.',
    5: 'Final step: we need your permission!',
  };

  const REQUIRED_PAGES = new Set([1, 2, 5]);

  const renderPage = () => {
    switch (page) {
      // ── Page 1: Workshops ────────────────────────────────────────────────
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Typography textSize="paragraph-sm" textColor="text-white" className="opacity-60">
              {(survey.requestedWorkshops ?? []).length} / 3 selected
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {ENUMS.requestedWorkshops.map((workshop) => {
                const selected = (survey.requestedWorkshops ?? []).includes(workshop);
                const atLimit = (survey.requestedWorkshops ?? []).length >= 3 && !selected;
                return (
                  <label
                    key={workshop}
                    className={`flex items-center gap-3 cursor-pointer rounded-lg border px-4 py-3 transition-colors select-none ${
                      selected
                        ? 'bg-primary-400/20 border-primary-400'
                        : atLimit
                        ? 'bg-white/5 border-white/10 opacity-40 cursor-not-allowed'
                        : 'bg-white/10 border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleWorkshop(workshop)}
                      disabled={atLimit}
                      className="w-4 h-4 accent-primary-400 shrink-0"
                    />
                    <Typography textSize="paragraph-sm" textColor="text-white">
                      {workshop}
                    </Typography>
                  </label>
                );
              })}
            </div>
          </div>
        );

      // ── Page 2: T-shirt size ─────────────────────────────────────────────
      case 2:
        return (
          <StyledSelect
            value={survey.tshirtSize ?? ''}
            onChange={(v) => updateField('tshirtSize', v)}
            options={ENUMS.shirt}
            placeholder="Select your t-shirt size"
          />
        );

      // ── Page 3: Dietary restrictions + allergies ─────────────────────────
      case 3:
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 w-full sm:w-1/2">
              <Typography textSize="paragraph-sm" textColor="text-white" className="opacity-70">
                Dietary restrictions
              </Typography>
              <StyledSelect
                value={survey.dietaryRestrictions ?? ''}
                onChange={(v) => updateField('dietaryRestrictions', v)}
                options={ENUMS.dietaryRestrictions}
                placeholder="Select dietary restrictions..."
              />
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-1/2">
              <Typography textSize="paragraph-sm" textColor="text-white" className="opacity-70">
                Allergies
              </Typography>
              <StyledInput
                value={survey.allergies ?? ''}
                onChange={(v) => updateField('allergies', v)}
                placeholder="e.g. Peanuts, Dairy..."
              />
            </div>
          </div>
        );

      // ── Page 4: Gender + ethnicity ───────────────────────────────────────
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <Typography textSize="paragraph-sm" textColor="text-white" className="opacity-60">
              Your responses will not affect your application.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <StyledSelect
                  value={survey.gender ?? ''}
                  onChange={(v) => updateField('gender', v)}
                  options={ENUMS.gender}
                  placeholder="Select gender..."
                />
              </div>
              <div className="w-full sm:w-1/2">
                <StyledSelect
                  value={survey.ethnicity ?? ''}
                  onChange={(v) => updateField('ethnicity', v)}
                  options={ENUMS.ethnicity}
                  placeholder="Select ethnicity..."
                />
              </div>
            </div>
          </div>
        );

      // ── Page 5: MLH permissions ──────────────────────────────────────────
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <StyledCheckbox
              checked={survey.mlhCodeOfConduct ?? false}
              onChange={() => updateField('mlhCodeOfConduct', !survey.mlhCodeOfConduct)}
            >
              I have read and agree to the{' '}
              <YellowLink>Major League Hacking (MLH) Code of Conduct</YellowLink>.{' '}
              <span className="text-error-400">*</span>
            </StyledCheckbox>

            <StyledCheckbox
              checked={survey.mlhEmailPermission ?? false}
              onChange={() => updateField('mlhEmailPermission', !survey.mlhEmailPermission)}
            >
              I authorize MLH to send me pre- and post-event informational emails, which
              contain free credit and opportunities from their partners.
            </StyledCheckbox>

            <StyledCheckbox
              checked={survey.mlhDataPermission ?? false}
              onChange={() => updateField('mlhDataPermission', !survey.mlhDataPermission)}
            >
              I authorize Hack the 6ix to share my application/registration information
              with Major League Hacking for event administration, ranking, and MLH
              administration in-line with the{' '}
              <YellowLink>MLH Privacy Policy</YellowLink>. I further agree to the terms
              of both the{' '}
              <YellowLink>MLH Contest Terms and Conditions</YellowLink> and the{' '}
              <YellowLink>MLH Privacy Policy</YellowLink>.{' '}
              <span className="text-error-400">*</span>
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
      total={TOTAL_PAGES}
      label={PAGE_LABELS[page]}
      required={REQUIRED_PAGES.has(page)}
    >
      {renderPage()}
    </FormStep>
  );
}
