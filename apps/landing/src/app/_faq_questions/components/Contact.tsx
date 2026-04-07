import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

const Contact = () => {
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative flex flex-col items-center z-10 w-full max-w-145 px-4">
        <Typography
          textSize="heading-lg"
          textColor="text-neutral-50"
          className="text-center"
        >
          Still Have Questions?
        </Typography>
        <Typography
          textSize="paragraph-lg"
          textColor="text-neutral-50"
          className="text-center opacity-90 mt-6"
        >
          Stir your message into our teacup and we’ll pour out a reply as soon
          as we can. <br />
          <br className="hidden md:block" />
          You can reach out to us at
        </Typography>

        <div className="hidden md:block relative w-[1000px] h-[600px] -mt-16">
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="relative w-[1000px] h-[885px] -translate-x-[220px] -translate-y-[400px]">
              <Image
                src="/assets/faq/svgviewer-output-2.svg"
                alt=""
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center translate-x-[220px] translate-y-[180px]">
                <a
                  href="mailto:hello@hackthe6ix.com"
                  className="group relative z-20 px-8 py-4"
                >
                  <Typography
                    textSize="subtitle-sm"
                    textColor="text-[#F4A42B]"
                    className="group-hover:underline transition-all duration-200 select-all"
                  >
                    hello@hackthe6ix.com
                  </Typography>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden relative w-full max-w-[340px] aspect-[1000/885] mt-4">
          <Image
            src="/assets/faq/Group46.svg"
            alt=""
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center -translate-y-5">
            <a
              href="mailto:hello@hackthe6ix.com"
              className="group relative z-20 px-6 py-3"
            >
              <Typography
                textSize="subtitle-sm"
                textColor="text-[#F4A42B]"
                className="group-hover:underline transition-all duration-200 select-all"
              >
                hello@hackthe6ix.com
              </Typography>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
