/** Loosely typed application snapshot for review display only. */
export type ReviewFormData = {
  characterSheet: Record<string, unknown>;
  aboutYou: Record<string, unknown>;
  experiences: Record<string, unknown>;
  longAnswer: Record<string, unknown>;
  survey: Record<string, unknown>;
};

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

function isFilled(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

function displayValue(value: string | undefined): string {
  return isFilled(value) ? value!.trim() : 'Not filled';
}

function firstString(
  ...candidates: (string | undefined | null)[]
): string | undefined {
  for (const c of candidates) {
    if (c != null && String(c).trim().length > 0) {
      return String(c).trim();
    }
  }
  return undefined;
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

function formatWorkshops(v: unknown): string | undefined {
  if (Array.isArray(v)) {
    const joined = v.filter(Boolean).join(', ');
    return joined.length > 0 ? joined : undefined;
  }
  if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  return undefined;
}

function requiredStringsOk(
  values: (string | undefined)[],
): ReviewSectionStatus {
  return values.every((v) => isFilled(v)) ? 'complete' : 'incomplete';
}

function requiredBoolOk(values: unknown[]): ReviewSectionStatus {
  return values.every((v) => v === true || v === 'true')
    ? 'complete'
    : 'incomplete';
}

export const reviewSections: ReviewSectionConfig[] = [
  {
    id: 'character-sheet',
    title: 'Character Sheet',
    editHref: '/about-you/character-sheet',
    getStatus: (d) => {
      const cs = section(d, 'characterSheet');
      return requiredStringsOk([
        cs['character_base'] as string | undefined,
        cs['character_item'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'Character base',
        getValue: (d) =>
          displayValue(
            rawToDisplay(section(d, 'characterSheet')['character_base']),
          ),
      },
      {
        label: 'Character item',
        getValue: (d) =>
          displayValue(
            rawToDisplay(section(d, 'characterSheet')['character_item']),
          ),
      },
    ],
  },
  {
    id: 'about-you',
    title: 'About You',
    editHref: '/about-you',
    getStatus: (d) => {
      const cs = section(d, 'characterSheet');
      const ay = section(d, 'aboutYou');
      const name = firstString(
        cs['full_name'] as string | undefined,
        cs['test1'] as string | undefined,
      );
      const email = firstString(
        cs['email'] as string | undefined,
        cs['test2'] as string | undefined,
      );
      return requiredStringsOk([
        name,
        email,
        ay['city'] as string | undefined,
        ay['province'] as string | undefined,
        ay['country'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'Full name',
        required: true,
        getValue: (d) => {
          const cs = section(d, 'characterSheet');
          return displayValue(
            firstString(
              cs['full_name'] as string | undefined,
              cs['test1'] as string | undefined,
            ),
          );
        },
      },
      {
        label: 'Email',
        required: true,
        getValue: (d) => {
          const cs = section(d, 'characterSheet');
          return displayValue(
            firstString(
              cs['email'] as string | undefined,
              cs['test2'] as string | undefined,
            ),
          );
        },
      },
      {
        label: 'Email consent',
        getValue: (d) =>
          displayValue(formatBoolean(section(d, 'aboutYou')['email_consent'])),
      },
      {
        label: 'City',
        required: true,
        getValue: (d) =>
          displayValue(section(d, 'aboutYou')['city'] as string | undefined),
      },
      {
        label: 'Province',
        required: true,
        getValue: (d) =>
          displayValue(section(d, 'aboutYou')['province'] as string | undefined),
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
    id: 'emergency-contact',
    title: 'Emergency Contact',
    editHref: '/about-you',
    getStatus: (d) => {
      const ay = section(d, 'aboutYou');
      return requiredStringsOk([
        ay['ice_first_name'] as string | undefined,
        ay['ice_last_name'] as string | undefined,
        ay['ice_relationship'] as string | undefined,
        ay['ice_phone'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'First name',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['ice_first_name'] as string | undefined,
          ),
      },
      {
        label: 'Last name',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['ice_last_name'] as string | undefined,
          ),
      },
      {
        label: 'Relationship',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['ice_relationship'] as string | undefined,
          ),
      },
      {
        label: 'Phone',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'aboutYou')['ice_phone'] as string | undefined,
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
        ex['year_of_study'] as string | undefined,
        ex['resume_name'] as string | undefined,
        ex['resume_blob'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'School (most recently attended)',
        getValue: (d) => {
          const ex = section(d, 'experiences');
          return displayValue(
            firstString(
              ex['school'] as string | undefined,
              ex['test4'] as string | undefined,
            ),
          );
        },
      },
      {
        label: 'Program',
        required: true,
        getValue: (d) =>
          displayValue(section(d, 'experiences')['program'] as string | undefined),
      },
      {
        label: 'Year of study',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['year_of_study'] as string | undefined,
          ),
      },
      {
        label: 'Hackathons attended',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['hackathons_attended'] as
              | string
              | undefined,
          ),
      },
      {
        label: 'Resume file name',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['resume_name'] as string | undefined,
          ),
      },
      {
        label: 'Resume',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['resume_blob'] as string | undefined,
          ),
      },
      {
        label: 'Resume share permission',
        getValue: (d) =>
          displayValue(
            formatBoolean(
              section(d, 'experiences')['resume_share_permission'],
            ),
          ),
      },
      {
        label: 'GitHub',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['github_link'] as string | undefined,
          ),
      },
      {
        label: 'Portfolio',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['portfolio_link'] as string | undefined,
          ),
      },
      {
        label: 'LinkedIn',
        getValue: (d) =>
          displayValue(
            section(d, 'experiences')['linkedin_link'] as string | undefined,
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
        firstString(
          la['long_essay'] as string | undefined,
          la['test5'] as string | undefined,
        ),
        la['short_essay'] as string | undefined,
      ]);
    },
    fields: [
      {
        label: 'Long essay',
        required: true,
        getValue: (d) => {
          const la = section(d, 'longAnswer');
          return displayValue(
            firstString(
              la['long_essay'] as string | undefined,
              la['test5'] as string | undefined,
            ),
          );
        },
      },
      {
        label: 'Short essay',
        required: true,
        getValue: (d) =>
          displayValue(
            section(d, 'longAnswer')['short_essay'] as string | undefined,
          ),
      },
      {
        label: 'One-sentence essay',
        getValue: (d) =>
          displayValue(
            section(d, 'longAnswer')['one_sentence_essay'] as
              | string
              | undefined,
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
      const workshops = formatWorkshops(s['workshops_interest']);
      const stringsOk = requiredStringsOk([workshops]);
      const boolsOk = requiredBoolOk([
        s['mlh_coc'],
        s['mlh_email'],
        s['mlh_data'],
      ]);
      return stringsOk === 'complete' && boolsOk === 'complete'
        ? 'complete'
        : 'incomplete';
    },
    fields: [
      {
        label: 'Workshop interest',
        required: true,
        getValue: (d) =>
          displayValue(formatWorkshops(section(d, 'survey')['workshops_interest'])),
      },
      {
        label: 'Dietary restrictions',
        getValue: (d) =>
          displayValue(
            section(d, 'survey')['dietary_restrictions'] as string | undefined,
          ),
      },
      {
        label: 'Allergies',
        getValue: (d) =>
          displayValue(
            section(d, 'survey')['allergies'] as string | undefined,
          ),
      },
      {
        label: 'MLH Code of Conduct',
        required: true,
        getValue: (d) =>
          displayValue(formatBoolean(section(d, 'survey')['mlh_coc'])),
      },
      {
        label: 'MLH emails',
        required: true,
        getValue: (d) =>
          displayValue(formatBoolean(section(d, 'survey')['mlh_email'])),
      },
      {
        label: 'MLH data sharing',
        required: true,
        getValue: (d) =>
          displayValue(formatBoolean(section(d, 'survey')['mlh_data'])),
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
