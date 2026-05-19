'use client';

import { useMemo, useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ReviewSection from '@/components/review/ReviewSection';
import ReviewStatusBadge from '@/components/review/ReviewStatusBadge';
import SubmitApplicationModal from '@/components/review/SubmitApplicationModal';
import { useApplicationContext } from '@/context/ApplicationContext';
import {
  getApplicationReadiness,
  getSectionStatus,
  reviewSections,
} from './reviewConfig';

export default function ReviewPage() {
  const router = useRouter();
  const { formData } = useApplicationContext();
  const { isReady } = getApplicationReadiness(formData);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const handleBack = () => {
    router.push('/survey?page=6');
  };

  const openSubmitModal = () => {
    if (!isReady) return;
    setSubmitModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    if (!isReady) return;
    setSubmitModalOpen(false);
    router.push('/thank-you');
  };

  const sectionList = useMemo(
    () =>
      reviewSections.map((section) => (
        <ReviewSection
          key={section.id}
          section={section}
          formData={formData}
          status={getSectionStatus(section, formData)}
        />
      )),
    [formData],
  );

  const desktopActions = (
    <div className="review-actions hidden shrink-0 flex-col-reverse gap-3 pt-6 md:flex md:flex-row md:justify-end md:gap-4 md:pt-8">
      <Button
        kind="secondary"
        onClick={handleBack}
        iconLeft={<ArrowLeft size="inherit" />}
        className="review-back-button md:min-w-35 md:w-auto"
      >
        Back
      </Button>
      <Button
        onClick={openSubmitModal}
        iconLeft={<ArrowRight size="inherit" />}
        className="md:min-w-35 md:w-auto"
        disabled={!isReady}
      >
        Submit
      </Button>
    </div>
  );

  return (
    <div className="review-page mx-auto flex h-full min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden">
      {/* Mobile header — on page background */}
      <header className="mb-4 flex shrink-0 flex-col gap-4 md:hidden">
        <Typography
          textSize="heading-sm"
          textColor="text-white"
          textWeight="bold"
          as="h1"
        >
          Review your application
        </Typography>
        <ReviewStatusBadge ready={isReady} fullWidth />
      </header>

      {/* Glass card — only inner content scrolls */}
      <div className="review-panel flex min-h-0 flex-1 flex-col overflow-hidden md:rounded-3xl md:border md:border-white/10 md:bg-[rgba(22,14,42,0.62)] md:p-8 md:backdrop-blur-md">
        <header className="mb-6 hidden shrink-0 md:mb-8 md:block">
          <div className="flex flex-wrap items-center gap-3">
            <Typography
              textSize="heading-sm"
              textColor="text-white"
              textWeight="bold"
              as="h1"
              className="shrink-0"
            >
              Review your application
            </Typography>
            <ReviewStatusBadge ready={isReady} className="md:w-auto" />
          </div>
        </header>

        <div className="review-panel-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] md:pr-2">
          <div className="flex flex-col">{sectionList}</div>
        </div>

        {desktopActions}
      </div>

      {/* Mobile footer — in document flow, outside scroll */}
      <footer className="review-mobile-actions flex shrink-0 flex-col gap-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Button
          onClick={openSubmitModal}
          iconLeft={<ArrowRight size="inherit" />}
          className="w-full"
          disabled={!isReady}
        >
          Submit
        </Button>
        <Button
          kind="secondary"
          onClick={handleBack}
          iconLeft={<ArrowLeft size="inherit" />}
          className="review-back-button w-full"
        >
          Back
        </Button>
      </footer>

      <SubmitApplicationModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
