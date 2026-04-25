import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

export default function SocialLinks() {
  return (
    <>
      {/* <Link
        href="https://www.facebook.com/Hackthe6ix/"
        target="_blank"
        rel="sponsored"
        className="text-white hover:text-primary-200"
      >
        <FaFacebook size={22} />
      </Link> */}
      <Link
        href="https://www.instagram.com/hackthe6ix"
        target="_blank"
        rel="sponsored"
        className="text-white hover:text-primary-200"
      >
        <FaInstagram size={22} />
      </Link>
      <Link
        href="https://x.com/hackthe6ix"
        target="_blank"
        rel="sponsored"
        className="text-white hover:text-primary-200"
      >
        <FaXTwitter size={22} />
      </Link>
      <Link
        href="https://www.linkedin.com/company/hackthe6ixofficial/"
        target="_blank"
        rel="sponsored"
        className="text-white hover:text-primary-200"
      >
        <FaLinkedin size={22} />
      </Link>
    </>
  );
}
