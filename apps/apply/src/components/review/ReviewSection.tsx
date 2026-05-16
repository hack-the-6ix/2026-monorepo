'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Typography } from '@hackthe6ix/ui';
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

function SectionIncompleteTooltip({ description }: { description: string }) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const placeTooltip = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 6,
      left: rect.left,
    });
  }, []);

  const showTooltip = useCallback(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    placeTooltip();
    setVisible(true);
  }, [placeTooltip]);

  const hideTooltip = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const scrollRoot = document.querySelector('.review-panel-scroll');
    const onMove = () => placeTooltip();

    scrollRoot?.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);

    return () => {
      scrollRoot?.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
  }, [visible, placeTooltip]);

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={0}
        className="review-tooltip-trigger relative inline-flex size-4 shrink-0 cursor-default items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-warning-300"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        <IncompleteIcon />
      </span>
      {visible &&
        createPortal(
          <div
            role="tooltip"
            className="review-tooltip-wrap"
            style={{ top: coords.top, left: coords.left }}
          >
            <span className="review-tooltip-arrow" aria-hidden />
            <p className="review-tooltip-popup">{description}</p>
          </div>,
          document.body,
        )}
    </>
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
        <div className="flex min-w-0 items-center gap-2">
          <Typography
            textSize="subtitle-sm"
            textWeight="bold"
            textColor="text-white"
            as="h2"
            className="m-0 shrink-0 leading-none"
          >
            {section.title}
          </Typography>
          {isIncomplete ?
            <SectionIncompleteTooltip
              description={
                section.incompleteTooltip ?? INCOMPLETE_SECTION_TOOLTIP
              }
            />
          : <CompleteIcon />}
        </div>

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
