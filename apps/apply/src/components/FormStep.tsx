import { Typography } from '@hackthe6ix/ui';
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
}

export default function FormStep({
  handlePrevSection,
  handleNextSection,
  current = 1,
  total = 1,
  required = false,
  label = '',
  children,
  width,
}: FormStepProp) {
  return (
    <div
      className={cn(
        'w-full gap-5 flex flex-col max-h-[80vh] overflow-y-auto no-scrollbar',
        width ? width : 'md:w-[65vw]',
      )}
    >
      <Typography
        textSize="heading-sm"
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
