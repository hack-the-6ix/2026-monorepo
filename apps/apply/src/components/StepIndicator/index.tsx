import { Typography } from '@hackthe6ix/ui';

type StepIndicatorProps = {
  current: number;
  total: number;
  className?: string;
};

export function StepIndicator({
  current,
  total,
  className = '',
}: StepIndicatorProps) {
  const ratio = Math.max(0, Math.min(1, current / total));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Typography
        as="span"
        textSize="paragraph-sm"
        textWeight="medium"
        textColor="text-white/80"
      >
        {current}/{total}
      </Typography>
      <div className="relative h-2.5 w-40 rounded-full bg-white/20 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary-500 transition-all"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
