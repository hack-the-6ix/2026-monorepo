'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@hackthe6ix/ui';

import FormStep from '@/components/FormStep';
import { useApplicationContext } from '@/context/ApplicationContext';

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

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function LongAnswer() {
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
  const wordCount = countWords(value);
  const isOverLimit = wordCount > current.maxWords;
  const isEmpty = value.trim() === '';

  return (
    <FormStep
      handlePrevSection={handlePrevSection}
      handleNextSection={isEmpty || isOverLimit ? undefined : handleNextSection}
      current={page}
      total={PAGES.length}
      label={current.label}
      required
    >
      <div className="flex flex-col gap-2">
        <textarea
          id={current.fieldName}
          name={current.fieldName}
          value={value}
          onChange={(e) => updateField(current.fieldName, e.target.value)}
          placeholder={current.placeholder}
          rows={current.rows}
          className={`w-full resize-y rounded-lg bg-white/10 border text-white placeholder-white/40 p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:border-transparent transition-all min-h-[8rem] ${
            isOverLimit
              ? 'border-error-400 focus:ring-error-400'
              : 'border-white/20 focus:ring-primary-400'
          }`}
        />
        <div className="flex justify-end">
          <Typography
            textSize="paragraph-sm"
            textColor={isOverLimit ? 'text-error-400' : 'text-white'}
            className={isOverLimit ? 'opacity-100' : 'opacity-50'}
          >
            {wordCount} / {current.maxWords} words
          </Typography>
        </div>
      </div>
    </FormStep>
  );
}
