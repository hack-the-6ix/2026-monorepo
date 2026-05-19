'use client';
import { Suspense } from 'react';
import { Checkbox, FileUpload, Input, Selector } from '@hackthe6ix/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { FormData, useApplicationContext } from '@/context/ApplicationContext';
import { PROGRAM_OPTIONS, YEAR_OF_STUDY_OPTIONS } from './enums';
import { SCHOOL_OPTIONS } from './schools';

interface PageConfig {
  key: string;
  label: string;
  required: boolean;
}

const PAGES: PageConfig[] = [
  {
    key: 'school',
    label: 'What school do you attend (or most recently attended?)',
    required: true,
  },
  {
    key: 'programAndYear',
    label: 'What’s your program and year of study?',
    required: true,
  },
  { key: 'resume', label: 'Upload your resume!', required: true },
  {
    key: 'online',
    label: 'Where can we find you online?',
    required: false,
  },
];

function ExperienceContent({ currentPageKey }: { currentPageKey: string }) {
  const { formData, updateFormData } = useApplicationContext();
  const experienceFormData = formData.experiences;

  type ExperienceData = FormData['experiences'];

  const updateField = <K extends keyof ExperienceData>(
    field: K,
    value: ExperienceData[K],
  ) => {
    updateFormData('experiences', { ...experienceFormData, [field]: value });
  };

  switch (currentPageKey) {
    case 'school':
      return (
        <Selector
          id="school"
          name="school"
          label=""
          hideLabel
          options={SCHOOL_OPTIONS}
          controlled={{
            value: experienceFormData.school || '',
            onValueChange: (val) => updateField('school', val),
          }}
        />
      );
    case 'programAndYear':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 w-full">
          <Selector
            id="program"
            name="program"
            label="Program"
            required
            hasOther
            options={[...PROGRAM_OPTIONS]}
            controlled={{
              value: experienceFormData.program || '',
              onValueChange: (val) => updateField('program', val),
            }}
            className="w-full"
          />
          <Selector
            id="yearOfStudy"
            name="yearOfStudy"
            label="Year of Study"
            required
            hasOther={false}
            options={[...YEAR_OF_STUDY_OPTIONS]}
            controlled={{
              value: experienceFormData.yearOfStudy || '',
              onValueChange: (val) => updateField('yearOfStudy', val),
            }}
          />
        </div>
      );
    case 'resume':
      return (
        <div className="flex flex-col gap-5.5">
          <FileUpload
            id="resume"
            name="resume"
            label=""
            hideLabel
            onFileSelect={(file) => updateField('resume', file)}
            className="w-full"
          />
          <Checkbox
            id="sponsorPermission"
            name="sponsorPermission"
            label=""
            hideLabel
            option={{
              label:
                'I give permission to Hack the 6ix for sending me emails containing information from the event sponsors.',
              value: 'sponsorPermission',
            }}
            controlled={{
              value: experienceFormData.sponsorPermission === true,
              onValueChange: (val) => updateField('sponsorPermission', val),
            }}
          />
        </div>
      );
    case 'online':
      return (
        <div className="flex flex-col gap-5.5 w-full">
          <Input
            id="github"
            name="github"
            label="Github"
            controlled={{
              value: experienceFormData.github || '',
              onValueChange: (val) => updateField('github', val),
            }}
            input={{ placeholder: 'Ex: domain1.com/projects' }}
          />
          <Input
            id="linkedin"
            name="linkedin"
            label="Linkedin"
            controlled={{
              value: experienceFormData.linkedin || '',
              onValueChange: (val) => updateField('linkedin', val),
            }}
            input={{ placeholder: 'Ex: linkedin.com/in/johndoe' }}
          />
          <Input
            id="portfolio"
            name="portfolio"
            label="Portfolio"
            controlled={{
              value: experienceFormData.portfolio || '',
              onValueChange: (val) => updateField('portfolio', val),
            }}
            input={{ placeholder: 'Ex: johndoe.com' }}
          />
        </div>
      );
    default:
      return null;
  }
}

function Experiences() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData } = useApplicationContext();

  const page = parseInt(searchParams.get('page') || '1');
  const currentPageConfig = PAGES[page - 1];
  const goToPage = (p: number) => router.push(`/experiences?page=${p}`);

  const handlePrevSection = () => {
    if (page > 1) goToPage(page - 1);
    else router.push('/about-you?page=4');
  };
  const handleNextSection = () => {
    if (page < 4) goToPage(page + 1);
    else {
      router.push('/long-answer');
      console.log(formData);
    }
  };

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={page}
      total={PAGES.length}
      label={currentPageConfig.label}
      required={currentPageConfig.required}
    >
      <ExperienceContent currentPageKey={currentPageConfig.key} />
    </FormStep>
  );
}

export default function ExperiencesPage() {
  return (
    <Suspense>
      <Experiences />
    </Suspense>
  );
}
