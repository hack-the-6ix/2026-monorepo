'use client';

import { Button, Tooltip, Typography } from '@hackthe6ix/ui';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import type {
  ReviewFormData,
  ReviewSectionConfig,
  ReviewSectionStatus,
} from '@/app/(application)/review/reviewConfig';
import ReviewField from './ReviewField';

const INCOMPLETE_SECTION_TOOLTIP =
  'Oops! Looks like this section contains a required question that is either blank or a bit too long.';

interface ReviewSectionProps {
  section: ReviewSectionConfig;
  formData: ReviewFormData;
  status: ReviewSectionStatus;
}

function IncompleteIcon() {
  return (
    <span
      className="flex size-4 shrink-0 items-center justify-center rounded-full bg-warning-400 text-secondary-950"
      aria-hidden
    >
      <span className="block text-[10px] font-bold leading-none">!</span>
    </span>
  );
}

function CompleteIcon() {
  return (
    <span
      className="flex size-4 shrink-0 items-center justify-center rounded-full bg-success-400 text-white"
      aria-label="Section complete"
    >
      <Check size={10} strokeWidth={3} />
    </span>
  );
}

export default function ReviewSection({
  section,
  formData,
  status,
}: ReviewSectionProps) {
  const isIncomplete = status === 'incomplete';

  return (
    <section className="review-section flex flex-col gap-3 pb-5 last:pb-0 md:gap-6 md:pb-10">
      <div className="relative z-10 flex items-center justify-between gap-4">
        <Typography
          textSize="subtitle-sm"
          textWeight="bold"
          textColor="text-white"
          as="h2"
          className="m-0 flex min-w-0 items-center gap-2 leading-none"
        >
          {section.title}
          {isIncomplete ?
            <Tooltip
              as="span"
              description={
                section.incompleteTooltip ?? INCOMPLETE_SECTION_TOOLTIP
              }
              icon={<IncompleteIcon />}
              bgColor="#1f1b4b"
              textColor="#f9fafb"
              className="review-incomplete-tooltip !cursor-default"
            />
          : <CompleteIcon />}
        </Typography>

        <Button
          kind="secondary"
          as={Link}
          href={section.editHref}
          iconLeft={<ArrowRight size="inherit" />}
          className="review-edit-button shrink-0"
        >
          Edit
        </Button>
      </div>

      <dl className="grid w-full grid-cols-1 gap-4 md:max-w-2xl md:grid-cols-2 md:gap-x-6 md:gap-y-5">
        {section.fields.map((field) => {
          const value = field.getValue(formData);
          return (
            <ReviewField
              key={field.label}
              label={field.label}
              value={value ?? 'Not filled'}
              required={field.required}
            />
          );
        })}
      </dl>
    </section>
  );
}
