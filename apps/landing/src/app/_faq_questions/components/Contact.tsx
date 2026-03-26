import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

const Contact = () => {
  return (
    <>
      <div className="relative flex flex-col items-center gap-6 w-[617px] overflow-visible">
        <Typography textSize="heading-lg" textColor="text-neutral-50">
          Still Have Questions?
        </Typography>
        <Typography
          textSize="paragraph-lg"
          textColor="text-neutral-50"
          className="text-center"
        >
          Stir your message into our teacup and we’ll pour out a reply as soon
          as we can. <br />
          <br />
          You can reach out to us at
        </Typography>
      </div>
      <div className="relative overflow-visible">
        <Image
          src="/assets/faq/svgviewer-output-2.svg"
          alt=""
          width={1000}
          height={885}
          className="h-auto -translate-x-64 -translate-y-98"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-50">
          <Typography textSize="subtitle-sm" textColor="text-[#F4A42B]">
            hello@hackthe6ix.com
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Contact;
