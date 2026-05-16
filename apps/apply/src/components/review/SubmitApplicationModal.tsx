'use client';

import { Button, Modal, Typography } from '@hackthe6ix/ui';

interface SubmitApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SubmitApplicationModal({
  isOpen,
  onClose,
  onConfirm,
}: SubmitApplicationModalProps) {
  const actions = (
    <div className="grid w-full grid-cols-2 gap-3">
      <Button
        kind="secondary"
        type="button"
        onClick={onClose}
        className="w-full border-primary-400 px-4 text-white hover:border-primary-300 hover:text-white"
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={onConfirm}
        className="w-full bg-gradient-to-b from-primary-400 to-primary-600 px-4 !border-primary-600 hover:from-primary-500 hover:to-primary-700 hover:!border-primary-700"
      >
        Submit
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label={
        <span className="whitespace-nowrap">Submit Application?</span>
      }
      actions={actions}
      className="submit-application-modal gap-4 !w-[min(92vw,22rem)] !max-w-[min(92vw,22rem)] !bg-[#1a1625] !p-6 text-center shadow-[0_12px_48px_rgba(0,0,0,0.55)] md:gap-5 md:!p-7"
    >
      <div className="modal-content flex flex-col gap-3 text-center">
        <Typography
          as="p"
          textSize="paragraph-sm"
          textWeight="medium"
          textColor="text-white"
          className="leading-relaxed"
        >
          Once you submit this application, you{' '}
          <span className="font-bold text-warning-400">cannot</span> make any
          changes.
        </Typography>
        <Typography
          as="p"
          textSize="paragraph-sm"
          textWeight="medium"
          textColor="text-white"
          className="leading-relaxed"
        >
          Please review your answers to ensure they are accurate.
        </Typography>
      </div>
    </Modal>
  );
}
