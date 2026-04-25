import { Typography } from '@hackthe6ix/ui';

import SocialLinks from '@/app/nav/SocialLinks';
import FeedbackStars from './FeedbackStars';

export default function Footer() {
  return (
    <footer className="flex flex-col gap-12 bg-[#BD375C] items-center w-full pb-10">
      <div className="flex flex-row gap-6 items-center">
        <Typography
          textSize="paragraph-sm"
          textWeight="medium"
          textColor="text-white"
          className="z-20"
        >
          How was your experience with our website?
        </Typography>
        <FeedbackStars />
      </div>
      <div className="flex flex-col gap-5.5 w-[90vw]">
        <div className="flex flex-row justify-between">
          <Typography
            textSize="paragraph-sm"
            textWeight="bold"
            textColor="text-white"
          >
            HACK THE 6IX
          </Typography>
          <div className="flex flex-row gap-5">
            <Typography
              textSize="paragraph-sm"
              textWeight="semi-bold"
              textColor="text-white"
              className="hover:text-primary-200"
              as="a"
              href="https://cdn.hackthe6ix.com/privacy-policy.pdf"
              target="_blank"
            >
              Privacy Policy
            </Typography>
            <Typography
              textSize="paragraph-sm"
              textWeight="semi-bold"
              textColor="text-white"
              className="hover:text-primary-200"
              as="a"
              href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
              target="_blank"
            >
              MLH Code of Conduct
            </Typography>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Typography
            textSize="paragraph-sm"
            textWeight="medium"
            textColor="text-white"
          >
            @ Copyright 2026 Hack the 6ix | Made with ♡ in Toronto
          </Typography>
          <div className="flex flex-row gap-5 md:gap-10">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
