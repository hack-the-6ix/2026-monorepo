'use client';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';
import { InputArea } from '@hackthe6ix/ui';

const PAGES = [
  {
    fieldName: 'longEssay',
    label:
      "Tell us about a project you've enjoyed working on (this can be non-technical!). What made you decide to work on this project? What challenges did you face and how did you overcome them?",
    placeholder: 'My favourite project...',
    maxWords: 200,
    rows: 10,
  },
  {
    fieldName: 'shortEssay',
    label:
      'If you could not do anything related to school, work, or coding for 4 months, what would you do and why?',
    placeholder: 'I would...',
    maxWords: 50,
    rows: 8,
  },
  {
    fieldName: 'oneSentenceEssay',
    label:
      'You are given an elephant. You cannot sell or give away the elephant. What do you do with the elephant?',
    placeholder: 'I would...',
    maxWords: 20,
    rows: 4,
  },
];

function LongAnswerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { formData, updateFormData } = useApplicationContext();

  const updateField = (fieldName: string, value: string) => {
    updateFormData('longAnswer', {
      ...formData.longAnswer,
      [fieldName]: value,
    });
  };

  const handlePrevSection = () => {
    if (page > 1) {
      router.push(`/long-answer?page=${page - 1}`);
    } else {
      router.push('/experiences');
    }
  };

  const handleNextSection = () => {
    if (page < PAGES.length) {
      router.push(`/long-answer?page=${page + 1}`);
    } else {
      router.push('/survey');
    }
  };

  const current = PAGES[page - 1];
  const longAnswer = formData.longAnswer as Record<string, string>;
  const value = longAnswer[current.fieldName] || '';

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={handleNextSection}
      current={page}
      total={PAGES.length}
      label={current.label}
      required
    >
      <InputArea
        id={current.fieldName}
        name={current.fieldName}
        label=""
        hideLabel={true}
        showCounter
        maxLength={current.maxWords}
        controlled={{
          value,
          onValueChange: (v) => updateField(current.fieldName, v),
        }}
        input={{
          placeholder: current.placeholder,
          rows: current.rows,
        }}
      />
    </FormStep>
  );
}

export default function LongAnswer() {
  return (
    <Suspense>
      <LongAnswerContent />
    </Suspense>
  );
}
