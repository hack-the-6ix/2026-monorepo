import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

const Contact = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-10 w-[617px]">
        <Typography textSize="heading-sm" textColor="text-neutral-50">
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
      <div>
        <img src="/assets/faq/Teacup.svg"></img>
        <div className="relative w-full max-w-[456px]">
          <Image
            src="/assets/faq/Group.svg"
            alt="contact us"
            width={205}
            height={456}
            className="w-full h-auto"
          />
          <div className="mb-10 absolute inset-0 flex items-center justify-center pointer-events-none">
            <Typography textSize="subtitle-sm" textColor="text-[#F4A42B]">
              hello@hackthe6ix.com
            </Typography>
          </div>{' '}
        </div>
      </div>
    </>
  );
};

export default Contact;
