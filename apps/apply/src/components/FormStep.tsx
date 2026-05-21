import { TextSize, Typography } from '@hackthe6ix/ui';
import cn from 'classnames';

import Navigator from './Navigator';

interface FormStepProp {
  handlePrevSection?: () => void;
  handleNextSection?: () => void;
  current?: number;
  total?: number;
  label: string;
  required?: boolean;
  children?: React.ReactNode;
  width?: string;
  labelSize?: TextSize;
}

export default function FormStep({
  handlePrevSection,
  handleNextSection,
  current = 1,
  total = 1,
  required = false,
  label = '',
  labelSize,
  children,
  width,
}: FormStepProp) {
  return (
    <div
      className={cn(
        'w-full gap-5 flex flex-col overflow-y-auto no-scrollbar md:overflow-y-visible pb-25 md:pb-0',
        width ? width : 'md:w-[62vw]',
      )}
    >
      <Typography
        textSize={labelSize ?? 'heading-sm'}
        textColor="text-white"
        textWeight="bold"
      >
        {label} {required && <span className="text-error-500">*</span>}
      </Typography>
      {children}
      <div className="flex justify-end">
        <Navigator
          handlePrevSection={handlePrevSection}
          handleNextSection={handleNextSection}
          current={current}
          total={total}
        />
      </div>
    </div>
  );
}
