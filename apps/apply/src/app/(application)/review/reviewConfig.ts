import { FormData } from '../../../context/ApplicationContext';

/** Loosely typed application snapshot for review display only. */
export type ReviewFormData = {
  characterSheet: Record<string, unknown>;
  aboutYou: Record<string, unknown>;
  experiences: Record<string, unknown>;
  longAnswer: Record<string, unknown>;
  survey: Record<string, unknown>;
};

export function mapContextToReviewData(ctx: FormData): ReviewFormData {
  return {
    characterSheet: {
      character_base: ctx.characterSheet?.character,
      character_item: ctx.characterSheet?.accessory,
      full_name:
        `${ctx.aboutYou?.firstName || ''} ${ctx.aboutYou?.lastName || ''}`.trim() ||
        undefined,
    },
    aboutYou: {
      city: ctx.aboutYou?.city,
      province: ctx.aboutYou?.province,
      country: ctx.aboutYou?.country,
      gender: ctx.aboutYou?.gender,
      ethnicity: ctx.aboutYou?.ethnicity,
      first_name: ctx.aboutYou?.firstName,
      last_name: ctx.aboutYou?.lastName,
      phone:
        ctx.aboutYou?.phoneNumber ?
          String(ctx.aboutYou.phoneNumber)
        : undefined,
    },
    experiences: {
      school: ctx.experiences?.school,
      program: ctx.experiences?.program,
      year_of_study: ctx.experiences?.yearOfStudy,
      resume_name: ctx.experiences?.resumeName,
      resume_blob: ctx.experiences?.resumeId ? '[File Uploaded]' : undefined,
      resume_share_permission: ctx.experiences?.sponsorPermission,
      github_link: ctx.experiences?.github,
      linkedin_link: ctx.experiences?.linkedin,
      portfolio_link: ctx.experiences?.portfolio,
    },
    longAnswer: {
      long_essay: ctx.longAnswer?.longEssay,
      short_essay: ctx.longAnswer?.shortEssay,
      one_sentence_essay: ctx.longAnswer?.oneSentenceEssay,
    },
    survey: {
      hackathons_attended: ctx.survey?.hackathonsAttended,
      dietary_restrictions: undefined, // Add values here if added to context schema later
      allergies: undefined,
      mlh_coc: ctx.survey?.mlhCodeOfConduct,
      mlh_data: ctx.survey?.mlhDataPermission,
      email_consent: ctx.survey?.emailPermission,
      mlh_email: ctx.survey?.mlhEmailPermission,
    },
  };
}

export type ReviewSectionStatus = 'complete' | 'incomplete';

export interface ReviewFieldConfig {
  label: string;
  required?: boolean;
  getValue: (formData: ReviewFormData) => string | undefined;
}

export interface ReviewSectionConfig {
  id: string;
  title: string;
  editHref: string;
  fields: ReviewFieldConfig[];
  getStatus: (formData: ReviewFormData) => ReviewSectionStatus;
  incompleteTooltip?: string;
}

function section(
  d: ReviewFormData,
  key: keyof ReviewFormData,
): Record<string, unknown> {
  return d[key];
}

function isFilled(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'boolean') return true;
  return Boolean(value);
}

function displayValue(value: unknown): string {
  if (value == null || value === '') return 'Not filled';
  const s = String(value).trim();
  return s.length > 0 ? s : 'Not filled';
}

function rawToDisplay(v: unknown): string | undefined {
  if (v == null || v === '') return undefined;
  const s = String(v).trim();
  return s.length > 0 ? s : undefined;
}

function formatBoolean(v: unknown): string | undefined {
  if (v === true || v === 'true') return 'Yes';
  if (v === false || v === 'false') return 'No';
  return undefined;
}

function requiredStringsOk(
  values: (string | undefined)[],
): ReviewSectionStatus {
  return values.every((v) => isFilled(v)) ? 'complete' : 'incomplete';
}

function requiredBoolOk(values: unknown[]): ReviewSectionStatus {
  return values.every((v) => v === true || v === 'true') ? 'complete' : (
      'incomplete'
    );
}

export const reviewSections: ReviewSectionConfig[] = [
  {
    id: 'character-sheet',
    title: 'Character Sheet',
    editHref: '/about-you/character-sheet',
    getStatus: (d) => {
      const cs = section(d, 'characterSheet');
      return requiredStringsOk([cs['character'] as string | undefined]);
    },
    fields: [
      {
        label: 'Character base',
        getValue: (d) =>
          displayValue(rawToDisplay(section(d, 'characterSheet')['character'])),
      },
      {
        label: 'Character item',
        getValue: (d) =>
          displayValue(rawToDisplay(section(d, 'characterSheet')['accessory'])),
      },
    ],
  },
  {
    id: 'about-you',
    title: 'About You',
    editHref: '/about-you',
    getStatus: (d) => {
      const ay = section(d, 'aboutYou');
      return requiredStringsOk([
        ay['firstName'] as string | undefined,
        ay['lastName'] as string | undefined,
        ay['phoneNumber'] as string | undefined,
        ay['age'] as string | undefined,
        ay['city'] as string | undefined,
        ay['country'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'First name',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['firstName'] as string | undefined,
          ),
      },
      {
        label: 'Last name',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['lastName'] as string | undefined,
          ),
      },
      {
        label: 'Phone number',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['phoneNumber'] as string | undefined,
          ),
      },
      {
        label: 'age',
        required: true,
        getValue: (d) =>
          displayValue(section(d, 'aboutYou')['age'] as string | undefined),
      },
      {
        label: 'City',
        required: true,
        getValue: (d) =>
          displayValue(section(d, 'aboutYou')['city'] as string | undefined),
      },
      {
        label: 'Province',
        required: false,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['province'] as string | undefined,
          ),
      },
      {
        label: 'Country',
        required: true,
        getValue: (d) =>
          displayValue(section(d, 'aboutYou')['country'] as string | undefined),
      },
      {
        label: 'Gender',
        getValue: (d) =>
          displayValue(section(d, 'aboutYou')['gender'] as string | undefined),
      },
      {
        label: 'Ethnicity',
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['ethnicity'] as string | undefined,
          ),
      },
    ],
  },
  {
    id: 'experiences',
    title: 'Your Experiences',
    editHref: '/experiences',
    getStatus: (d) => {
      const ex = section(d, 'experiences');
      return requiredStringsOk([
        ex['program'] as string | undefined,
        ex['yearOfStudy'] as string | undefined,
        ex['resumeName'] as string | undefined,
        ex['resumeId'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'School (most recently attended)',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['school'] as string | undefined,
          ),
      },
      {
        label: 'Program',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['program'] as string | undefined,
          ),
      },
      {
        label: 'Year of study',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['yearOfStudy'] as string | undefined,
          ),
      },
      {
        label: 'Resume file name',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['resumeName'] as string | undefined,
          ),
      },
      {
        label: 'Resume',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['resumeId'] as string | undefined,
          ),
      },
      {
        label: 'Resume share permission',
        getValue: (d) =>
          displayValue(
            formatBoolean(section(d, 'experiences')['sponsorPermission']),
          ),
      },
      {
        label: 'GitHub',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['github'] as string | undefined,
          ),
      },
      {
        label: 'LinkedIn',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['linkedin'] as string | undefined,
          ),
      },
      {
        label: 'Portfolio',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['portfolio'] as string | undefined,
          ),
      },
    ],
  },
  {
    id: 'long-answer',
    title: 'Long Answers',
    editHref: '/long-answer',
    getStatus: (d) => {
      const la = section(d, 'longAnswer');
      return requiredStringsOk([
        la['longEssay'] as string | undefined,
        la['shortEssay'] as string | undefined,
        la['oneSentenceEssay'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'Long essay',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'longAnswer')['longEssay'] as string | undefined,
          ),
      },
      {
        label: 'Short essay',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'longAnswer')['shortEssay'] as string | undefined,
          ),
      },
      {
        label: 'One-sentence essay',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'longAnswer')['oneSentenceEssay'] as string | undefined,
          ),
      },
    ],
  },
  {
    id: 'survey',
    title: 'Survey',
    editHref: '/survey',
    getStatus: (d) => {
      const s = section(d, 'survey');
      return (
        requiredStringsOk([s['hackathonsAttended'] as string | undefined]) &&
        requiredBoolOk([s['mlhCodeOfConduct'], s['mlhDataPermission']])
      );
    },
    fields: [
      {
        label: 'Hackathons attended number',
        getValue: (d) =>
          displayValue(
            section(d, 'survey')['hackathonsAttended'] as string | undefined,
          ),
      },
      {
        label: 'Hackathons attended list',
        getValue: (d) =>
          displayValue(
            section(d, 'survey')['hackathonsAttendedList'] as
              | string
              | undefined,
          ),
      },
      {
        label: 'Roles in hackathons',
        getValue: (d) => {
          const arr = section(d, 'survey')['hackathonCapacity'] as
            | string[]
            | undefined;
          const joinedString =
            arr && arr.length > 0 ? arr.join(', ') : undefined;
          return displayValue(joinedString);
        },
      },
      {
        label: 'Previous HT6 Experience',
        getValue: (d) => {
          const arr = section(d, 'survey')['previousHT6Experience'] as
            | string[]
            | undefined;
          const joinedString =
            arr && arr.length > 0 ? arr.join(', ') : undefined;
          return displayValue(joinedString);
        },
      },
      {
        label: 'HT6 lead source',
        getValue: (d) => {
          const arr = section(d, 'survey')['howDidYouHearAboutHT6'] as
            | string[]
            | undefined;
          const joinedString =
            arr && arr.length > 0 ? arr.join(', ') : undefined;
          return displayValue(joinedString);
        },
      },
      {
        label: 'MLH Code of Conduct',
        required: true,
        getValue: (d) =>
          displayValue(formatBoolean(section(d, 'survey')['mlhCodeOfConduct'])),
      },
      {
        label: 'MLH emails',
        getValue: (d) =>
          displayValue(
            formatBoolean(section(d, 'survey')['mlhEmailPermission']),
          ),
      },
      {
        label: 'Email consent',
        getValue: (d) =>
          displayValue(formatBoolean(section(d, 'survey')['emailPermission'])),
      },
      {
        label: 'MLH data sharing',
        required: true,
        getValue: (d) =>
          displayValue(
            formatBoolean(section(d, 'survey')['mlhDataPermission']),
          ),
      },
    ],
  },
];

export function getSectionStatus(
  section: ReviewSectionConfig,
  formData: ReviewFormData,
): ReviewSectionStatus {
  return section.getStatus(formData);
}

export function getApplicationReadiness(formData: ReviewFormData) {
  const sectionStatuses = reviewSections.map((section) =>
    section.getStatus(formData),
  );
  const isReady = sectionStatuses.every((status) => status === 'complete');

  return { isReady, sectionStatuses };
}
