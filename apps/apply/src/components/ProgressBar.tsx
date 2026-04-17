import { Typography } from '@hackthe6ix/ui';

interface ProgressBarProp {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProp) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <Typography textSize="paragraph-sm" textColor="text-white">
        {current}/{total}
      </Typography>
      <div className="h-4 w-full bg-white/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
