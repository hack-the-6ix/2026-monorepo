import { Typography } from '@hackthe6ix/ui';

interface RsvpCancelDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}

const RsvpCancelDialog = ({
  open,
  onClose,
  onConfirm,
  confirmLabel = 'I can no longer attend',
}: RsvpCancelDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-85 rounded-[20px] border border-slate-800 bg-[#0b0f19] p-6 text-center shadow-2xl">
        <Typography
          as="h2"
          textSize="paragraph-lg"
          textWeight="bold"
          textColor="text-white"
          className="mb-3 leading-snug"
        >
          Can no longer attend HT6?
        </Typography>
        <p className="mb-6 text-xs font-normal leading-relaxed text-[#A0AEC0]">
          This opportunity will be passed onto a waitlisted participant.{' '}
          <span className="font-semibold text-[#EF5A5A]">
            This action cannot be undone.
          </span>
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            className="rounded-full border border-slate-600 px-5 py-2.5 text-xs font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-800/30 active:scale-95"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-[#EF5A5A] px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-[#EF5A5A]/15 transition-all hover:bg-[#D94545] active:scale-95"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RsvpCancelDialog;
