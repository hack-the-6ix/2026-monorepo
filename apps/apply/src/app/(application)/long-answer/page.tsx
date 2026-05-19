'use client';
import { Suspense } from 'react';
import { InputArea } from '@hackthe6ix/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

const PAGES = [
  {
    fieldName: 'longEssay',
    label:
      "What is something you are exceptional at? We're talking the best of the best.",
    placeholder: 'I am the goat at...',
    maxWords: 200,
    rows: 10,
  },
  {
    fieldName: 'shortEssay',
    label:
      "What is your craziest hackathon story? Tell us everything, we're nosy! If you haven't been to a hackathon before, tell us about your craziest group project (Please leave names of people out of this).",
    placeholder: 'So basically...',
    maxWords: 50,
    rows: 8,
  },
  {
    fieldName: 'oneSentenceEssay',
    label: 'How would your worst enemy describe you?',
    placeholder: 'They would say...',
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
      router.push('/experiences?page=4');
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
      labelSize="subtitle-lg"
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
