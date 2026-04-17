import { Button } from '@hackthe6ix/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import ProgressBar from '@/components/ProgressBar';

interface NavigatorProp {
  handlePrevSection?: () => void;
  handleNextSection?: () => void;
  current?: number;
  total?: number;
}

export default function Navigator({
  handlePrevSection,
  handleNextSection,
  current = 1,
  total = 1,
}: NavigatorProp) {
  return (
    <div className="flex flex-col w-full gap-5 md:gap-5 items-end">
      <div className="flex flex-col-reverse w-full md:w-auto md:flex-row gap-3">
        {handlePrevSection && (
          <Button
            kind="secondary"
            onClick={handlePrevSection}
            iconLeft={<ArrowLeft size="inherit" />}
            className="border-white text-white hover:border-primary-500 hover:text-primary-500"
          >
            Back
          </Button>
        )}
        {handleNextSection && (
          <Button
            onClick={handleNextSection}
            iconLeft={<ArrowRight size="inherit" />}
            className="md:w-35"
          >
            Next
          </Button>
        )}
      </div>
      {handleNextSection && (
        <div className="w-43 md:w-36">
          <ProgressBar current={current} total={total} />
        </div>
      )}
    </div>
  );
}
