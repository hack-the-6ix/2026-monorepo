import { Typography } from '@hackthe6ix/ui';
import { Check } from 'lucide-react';

interface ReviewStatusBadgeProps {
  ready: boolean;
  fullWidth?: boolean;
  className?: string;
  isSubmitted: boolean,
}

export default function ReviewStatusBadge({
  ready,
  fullWidth = false,
  className = '',
  isSubmitted,
}: ReviewStatusBadgeProps) {
  if (ready) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
          fullWidth ?
            'w-full justify-center border-0 bg-[#B8EBD0] py-3 md:border md:border-success-400/30 md:bg-success-500/15 md:py-2.5'
          : 'border border-success-400/30 bg-success-500/15'
        } ${className}`}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success-400 text-white">
          <Check size={12} strokeWidth={3} />
        </span>
        <Typography
          textSize="paragraph-sm"
          textWeight="semi-bold"
          textColor="text-success-300"
          className={fullWidth ? 'text-[#1B6B45] md:text-success-300' : ''}
        >
          {isSubmitted ? 'Submitted' : 'Ready to Submit'}
        </Typography>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-warning-500/40 bg-[#F5F0E8] px-4 py-2 ${
        fullWidth ? 'w-full justify-center py-3 md:py-2.5' : ''
      } ${className}`}
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-warning-500 text-white">
        <span className="text-xs leading-none font-bold">!</span>
      </span>
      <Typography
        textSize="paragraph-sm"
        textWeight="semi-bold"
        textColor="text-warning-600"
      >
        Incomplete Application
      </Typography>
    </div>
  );
}
