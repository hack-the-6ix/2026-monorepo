'use client';
import { Suspense } from 'react';
import { Checkbox, Input, Selector, Typography } from '@hackthe6ix/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { FormData, useApplicationContext } from '@/context/ApplicationContext';
import {
  COUNTRY_OPTIONS,
  ETHNICITY_OPTIONS,
  GENDER_OPTIONS,
  PROVINCE_OPTIONS,
} from './enums';

type AboutYouData = FormData['aboutYou'];

type PageKey = 'fullName' | 'email' | 'location' | 'demographics';

interface PageConfig {
  key: PageKey;
  label: string;
  required: boolean;
}

const PAGES: PageConfig[] = [
  {
    key: 'fullName',
    label: 'Gorgeous! Now, about yourself...',
    required: true,
  },
  { key: 'email', label: "What's your email?", required: true },
  { key: 'location', label: 'Where are you located?', required: true },
  {
    key: 'demographics',
    label: 'Please specify your gender and background:',
    required: false,
  },
];

function AboutYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { formData, updateFormData } = useApplicationContext();
  const aboutYou = formData.aboutYou;

  const updateField = <K extends keyof AboutYouData>(
    field: K,
    value: AboutYouData[K],
  ) => {
    updateFormData('aboutYou', { ...aboutYou, [field]: value });
  };

  const totalPages = PAGES.length;
  const currentPageConfig = PAGES[page - 1];

  const goToPage = (p: number) => router.push(`/about-you?page=${p}`);

  const handlePrevSection = () => {
    if (page > 1) goToPage(page - 1);
    else router.push('/about-you/character-sheet?page=2');
  };

  const handleNextSection = () => {
    if (page < totalPages) goToPage(page + 1);
    else router.push('/experiences');
  };

  const renderPage = () => {
    if (!currentPageConfig) return null;

    switch (currentPageConfig.key) {
      case 'fullName':
        return (
          <div className="flex flex-col gap-4">
            <div className="md:grid md:grid-cols-2 gap-4">
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                required
                controlled={{
                  value: aboutYou.firstName ?? '',
                  onValueChange: (v) => updateField('firstName', v),
                }}
                input={{ placeholder: 'John' }}
              />
              <Input
                id="lastName"
                name="lastName"
                label="Last Name"
                required
                controlled={{
                  value: aboutYou.lastName ?? '',
                  onValueChange: (v) => updateField('lastName', v),
                }}
                input={{ placeholder: 'Doe' }}
              />
            </div>
            <div className="md:grid md:grid-cols-2 gap-4">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                required
                controlled={{
                  value:
                    aboutYou.phoneNumber ? String(aboutYou.phoneNumber) : '',
                  onValueChange: (v) => {
                    const digits = v.replace(/\D/g, '').slice(0, 10);
                    updateField('phoneNumber', digits ? Number(digits) : 0);
                  },
                }}
                input={{
                  type: 'tel',
                  inputMode: 'numeric',
                  placeholder: '6471234567',
                }}
              />
              <Input
                id="age"
                name="age"
                label="Age"
                required
                controlled={{
                  value: aboutYou.age ? String(aboutYou.age) : '',
                  onValueChange: (v) => updateField('age', v ? Number(v) : 0),
                }}
                input={{ type: 'number', min: 0, placeholder: '18' }}
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              name="email"
              label=""
              hideLabel
              controlled={{
                value: aboutYou.email ?? '',
                onValueChange: (v) => updateField('email', v),
              }}
              input={{ type: 'email', placeholder: 'john.doe@university.com' }}
            />
            <Checkbox
              id="emailPermission"
              name="emailPermission"
              label="Email Permission"
              hideLabel
              option={{
                label:
                  'I give permission to Hack the 6ix for sending me emails containing information from the event sponsors.',
                value: 'emailPermission',
              }}
              controlled={{
                value: aboutYou.emailPermission ?? false,
                onValueChange: (v) => updateField('emailPermission', v),
              }}
            />
          </div>
        );

      case 'location':
        return (
          <div className="flex flex-col gap-4">
            <Input
              id="city"
              name="city"
              label="City"
              required
              controlled={{
                value: aboutYou.city ?? '',
                onValueChange: (v) => updateField('city', v),
              }}
              input={{ placeholder: 'Toronto' }}
            />
            <div className="md:grid md:grid-cols-2 gap-4">
              <Selector
                id="country"
                name="country"
                label="Country"
                required
                options={[...COUNTRY_OPTIONS]}
                hasOther={false}
                controlled={{
                  value: aboutYou.country ?? '',
                  onValueChange: (v) => {
                    updateFormData('aboutYou', {
                      ...aboutYou,
                      country: v,
                      province: v !== 'Canada' ? '' : aboutYou.province,
                    });
                  },
                }}
              />
              {aboutYou.country === 'Canada' && (
                <Selector
                  id="province"
                  name="province"
                  label="Province"
                  required
                  options={[...PROVINCE_OPTIONS]}
                  hasOther={false}
                  controlled={{
                    value: aboutYou.province ?? '',
                    onValueChange: (v) => updateField('province', v),
                  }}
                />
              )}
            </div>
          </div>
        );

      case 'demographics':
        return (
          <div className="flex flex-col gap-4">
            <div className="md:grid md:grid-cols-2 gap-4">
              <Selector
                id="gender"
                name="gender"
                label="Gender"
                options={[...GENDER_OPTIONS]}
                hasOther={false}
                controlled={{
                  value: aboutYou.gender ?? '',
                  onValueChange: (v) => updateField('gender', v),
                }}
              />
              <Selector
                id="ethnicity"
                name="ethnicity"
                label="Ethnicity"
                options={[...ETHNICITY_OPTIONS]}
                hasOther={false}
                controlled={{
                  value: aboutYou.ethnicity ?? '',
                  onValueChange: (v) => updateField('ethnicity', v),
                }}
              />
            </div>
            <div className="group relative inline-flex cursor-help">
              <Typography
                textSize="paragraph-sm"
                textWeight="semi-bold"
                textColor="text-white"
                className="underline decoration-dotted underline-offset-2"
              >
                Why are we asking this?
              </Typography>
              <div className="hidden group-hover:block absolute top-full mt-2 left-0 z-50 w-[80vw] md:w-[320px] rounded-2xl bg-neutral-50 p-3.5 shadow-lg text-indigo-800 text-sm font-medium leading-relaxed">
                Hack the 6ix is committed to fostering an inclusive and diverse
                community. We collect this information solely to better
                understand our applicant pool and ensure we are reaching a wide
                range of backgrounds. This data is anonymized and will never be
                used to make admission decisions.
              </div>
            </div>
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

export default function AboutYou() {
  return (
    <Suspense>
      <AboutYouContent />
    </Suspense>
  );
}
