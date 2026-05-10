import { Button, Typography } from '@hackthe6ix/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

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

      {/* Progress Bar */}
      {handleNextSection && (
        <div className="w-43 md:w-36">
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
        </div>
      )}
    </div>
  );
}
