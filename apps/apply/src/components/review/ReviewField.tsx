import { Typography } from '@hackthe6ix/ui';

interface ReviewFieldProps {
  label: string;
  value: string;
  required?: boolean;
}

export default function ReviewField({
  label,
  value,
  required = false,
}: ReviewFieldProps) {
  const isEmpty = value === 'Not filled';

  return (
    <div className="flex flex-col gap-1">
      <Typography
        textSize="label"
        textWeight="semi-bold"
        textColor="text-warning-400"
        as="dt"
      >
        {label}
        {required && (
          <span className="text-error-500 md:text-warning-400">*</span>
        )}
      </Typography>
      <Typography
        textSize="paragraph-lg"
        textWeight="medium"
        textColor={isEmpty ? 'text-neutral-400' : 'text-white'}
        as="dd"
        className="whitespace-pre-line"
      >
        {value}
      </Typography>
    </div>
  );
}
