type StatusTone = 'success' | 'danger';

import checkmarkIcon from '../../app/assets/checkmark.png';
import exclamationIcon from '../../app/assets/exclamation.png';

interface StatusPillProps {
  text: string;
  tone: StatusTone;
  className?: string;
}

const toneStyles: Record<StatusTone, { container: string; icon: string }> = {
  success: {
    container:
      'border-emerald-300 bg-[#3a8f84] text-white shadow-[0_0_12px_rgba(74,222,128,0.14)]',
    icon: 'bg-[#1ee38e] text-[#0b1f1b]',
  },
  danger: {
    container:
      'border-[#ff8a8a] bg-[#ef5a5a] text-white shadow-[0_0_12px_rgba(244,63,94,0.24)]',
    icon: 'bg-white/20 text-white',
  },
};

const StatusPill = ({ text, tone, className = '' }: StatusPillProps) => {
  const styles = toneStyles[tone];
  const iconSrc = tone === 'success' ? checkmarkIcon.src : exclamationIcon.src;

  return (
    <div
      className={`${styles.container} inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold ${className}`}
    >
      <span
        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${styles.icon}`}
        aria-hidden="true"
      >
        <img src={iconSrc} alt="" className="h-4 w-4" />
      </span>
      <span className="leading-none">{text}</span>
    </div>
  );
};

export default StatusPill;
