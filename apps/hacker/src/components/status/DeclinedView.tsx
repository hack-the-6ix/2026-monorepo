import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';
import { Typography } from '@hackthe6ix/ui';

interface DeclinedViewProps {
  name: string;
}

const DeclinedView = ({ name }: DeclinedViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-4">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="mt-6 md:mt-32"
      >
        Bye, {name}!
      </Typography>
      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
      >
        We’re sad to see you go :(
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-5xl"
      >
        Thank you for letting us know you will no longer be attending Hack The
        6ix 2026. We hope to see you next year!
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="mt-8"
      >
        In the meantime, let’s stay connected:
      </Typography>
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
