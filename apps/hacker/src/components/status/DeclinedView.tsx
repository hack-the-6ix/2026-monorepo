import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';

interface DeclinedViewProps {
  name: string;
}

const DeclinedView = ({ name }: DeclinedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      {/* subtitle-sm → md:text-xl text-lg, bold */}
      <p className="font-sans md:text-xl text-lg font-bold text-white mt-6 md:mt-32">
        Bye, {name}!
      </p>

      {/* heading-lg → md:text-4xl text-3xl, bold */}
      <h1 className="font-sans md:text-4xl text-3xl font-bold text-white">
        We&apos;re sad to see you go :(
      </h1>

      {/* paragraph-lg → md:text-lg text-base, regular */}
      <p className="font-sans md:text-lg text-base font-normal text-white max-w-xs md:max-w-5xl">
        Thank you for letting us know you will no longer be attending Hack The
        6ix 2026. We hope to see you next year!
      </p>

      <p className="font-sans md:text-lg text-base font-normal text-white mt-8">
        In the meantime, let&apos;s stay connected:
      </p>

      <div className="flex mt-1 gap-4 text-white">
        <a
          href="https://www.facebook.com/Hackthe6ix/"
          target="_blank"
          className="hover:text-primary-300 transition"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://instagram.com/hackthe6ix"
          target="_blank"
          className="hover:text-primary-300 transition"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com/company/hackthe6ixofficial"
          target="_blank"
          className="hover:text-primary-300 transition"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://x.com/hackthe6ix"
          target="_blank"
          className="hover:text-primary-300 transition"
        >
          <FaXTwitter size={24} />
        </a>
      </div>
    </div>
  );
};

export default DeclinedView;
