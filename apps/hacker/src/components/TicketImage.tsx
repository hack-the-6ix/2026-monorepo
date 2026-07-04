import { Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import { useHacker } from '@/context/HackerContext';
import ticketImage from '../app/assets/ticket.png';

export default function TickeImage() {
  const { profile } = useHacker();
  const firstName = profile?.firstName?.toUpperCase() ?? 'JOHN';
  const lastName = profile?.lastName?.toUpperCase() ?? 'DOE';
  return (
    <div className="relative w-full h-full">
      <Image
        src={ticketImage}
        alt="rsvp ticket"
        width={300}
        height={600}
        className="w-full h-full object-fill animate-ticket-glow"
      />
      <div className="absolute left-0 right-0 bottom-16 flex flex-col text-center px-6">
        <Typography
          textColor="text-white"
          textSize="paragraph-lg"
          textWeight="bold"
          className="drop-shadow-[0_0_4.363px_rgba(154,252,255,0.91)] leading-tight text-center"
        >
          {firstName} <br /> {lastName}
        </Typography>
      </div>
    </div>
  );
}
