import { Button } from '@hackthe6ix/ui';

interface ReviewingViewProps {
  name: string;
}

const ReviewingView = ({ name }: ReviewingViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      {/* textSize="subtitle-sm" → typography-xl → md:text-xl text-lg */}
      {/* textWeight="bold" → font-bold */}
      <p className="font-sans md:text-xl text-lg font-bold text-white mt-6 md:mt-32">
        Welcome back, {name}!
      </p>

      {/* textSize="heading-lg" → typography-4xl → md:text-4xl text-3xl */}
      <h1 className="font-sans md:text-4xl text-3xl font-bold text-white leading-tight">
        Your application is <br className="block md:hidden" />
        <span className="text-yellow-300">being reviewed.</span>
      </h1>

      {/* textSize="paragraph-lg" → typography-lg → md:text-lg text-base */}
      <p className="font-sans md:text-lg text-base font-normal text-white max-w-xs md:max-w-none">
        Thanks for applying to Hack the 6ix 2026! The first round of hacker
        acceptances will be released on{' '}
        <span className="text-yellow-300">June 7th 11:59PM</span>.
      </p>

      <p className="font-sans md:text-lg text-base font-normal text-white mt-1">
        Got questions? Feel free to reach out to us!
      </p>

      <div className="mt-4 w-full flex justify-center">
        <Button
          className="
            inline-flex items-center justify-center gap-2 cursor-pointer
            rounded-full border-2 border-primary-500
            py-2.5 px-6
            text-primary-500 text-sm font-semibold
            transition-all
            hover:border-primary-600 hover:text-primary-600
            active:border-primary-700 active:text-primary-700
            focus-visible:outline-none
            w-full md:w-auto max-w-[280px] md:max-w-none
            hover:bg-teal-500/10
          "
          onClick={() => {
            window.location.href = 'mailto:hello@hackthe6ix.com';
          }}
        >
          Email HT6
        </Button>
      </div>
    </div>
  );
};

export default ReviewingView;
