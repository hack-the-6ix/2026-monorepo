'use client';

import { Check, X } from 'lucide-react';

interface ApplicationSuccessToastProps {
  onDismiss: () => void;
}

export default function ApplicationSuccessToast({
  onDismiss,
}: ApplicationSuccessToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="thank-you-toast flex w-full max-w-md items-center gap-3 rounded-full bg-white px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.28)] animate-[thank-you-toast-in_0.35s_ease-out_forwards] md:max-w-lg md:px-5 md:py-3.5"
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-400 text-white"
        aria-hidden
      >
        <Check className="size-3.5 stroke-[3]" />
      </span>
      <p className="min-w-0 flex-1 text-sm font-semibold text-success-600 md:text-[0.9375rem]">
        Application submitted successfully.
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        aria-label="Dismiss notification"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

