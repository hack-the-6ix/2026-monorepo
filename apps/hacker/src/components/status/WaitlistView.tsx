interface WaitlistViewProps {
  name: string;
}

const WaitlistView = ({ name }: WaitlistViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      {/* subtitle-sm → md:text-xl text-lg, bold */}
      <p className="font-sans md:text-xl text-lg font-bold text-white mt-6 md:mt-32">
        Welcome back, {name}!
      </p>

      {/* heading-lg → md:text-4xl text-3xl, bold */}
      <h1 className="font-sans md:text-4xl text-3xl font-bold text-white">
        You have been placed on the{' '}
        <span className="text-yellow-300">waitlist.</span>
      </h1>

      {/* paragraph-lg → md:text-lg text-base, regular */}
      <p className="font-sans md:text-lg text-base font-normal text-white max-w-xs md:max-w-5xl">
        We received an overwhelming amount of applications this year and have
        placed you on the waitlist. We&apos;ll let you know if a spot opens up,
        so make sure to check your inbox!
      </p>

      <p className="font-sans md:text-lg text-base font-normal text-white mt-1">
        Got questions? Feel free to reach out to us!
      </p>

      <div className="mt-4 w-full flex justify-center">
        <button
          className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-full border-2 border-primary-500 py-2.5 px-6 text-primary-500 text-sm font-semibold transition-all hover:border-primary-600 hover:text-primary-600 active:border-primary-700 active:text-primary-700 focus-visible:outline-none w-full md:w-auto max-w-[280px] md:max-w-none hover:bg-teal-500/10"
          onClick={() => {
            window.location.href = 'mailto:hello@hackthe6ix.com';
          }}
        >
          Email HT6
        </button>
      </div>
    </div>
  );
};

export default WaitlistView;
