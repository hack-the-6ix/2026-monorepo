interface RejectedViewProps {
  name: string;
}

const RejectedView = ({ name }: RejectedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      {/* subtitle-sm → md:text-xl text-lg, bold */}
      <p className="font-sans md:text-xl text-lg font-bold text-white mt-6 md:mt-32">
        Welcome back, {name}!
      </p>

      {/* heading-lg → md:text-4xl text-3xl, bold */}
      <h1 className="font-sans md:text-4xl text-3xl font-bold text-white">
        Unfortunately, your hacker
        <br /> application has{' '}
        <span className="text-error-500">not been selected</span> :(
      </h1>

      {/* paragraph-lg → md:text-lg text-base, regular */}
      <p className="font-sans md:text-lg text-base font-normal text-white max-w-xs md:max-w-5xl">
        Thank you for your enthusiasm and dedication in applying to Hack the 6ix
        2026. We received an overwhelming number of applications and after
        careful consideration, we regret to inform you that your application was
        not chosen for this year&apos;s hackathon. We strongly encourage you to
        try again next year.
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

export default RejectedView;
