import { useHacker } from '@/context/HackerContext';
import { Typography } from '@hackthe6ix/ui';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaDownload,
} from 'react-icons/fa6';
import ticketImage from '../../app/assets/ticket.png';
import TicketImage from '../TicketImage';

const RsvpedView = () => {
  const { profile } = useHacker();
  const firstName = profile?.firstName?.toUpperCase() ?? 'JOHN';
  const lastName = profile?.lastName?.toUpperCase() ?? 'DOE';

  const generateTicketBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = ticketImage.src;
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        const fontSize = Math.round(canvas.height * 0.04);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = 'rgba(154, 252, 255, 0.91)';
        ctx.shadowBlur = 8;

        const x = canvas.width / 2;
        const targetY = canvas.height * 0.824;
        const lineHeight = fontSize * 1.25;

        ctx.fillText(firstName, x, targetY - lineHeight / 2);
        ctx.fillText(lastName, x, targetY + lineHeight / 2);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas toBlob returned null'));
          }
        }, 'image/png');
      };
      img.onerror = () => {
        reject(new Error('Failed to load ticket image source'));
      };
    });
  };

  const downloadTicket = async () => {
    try {
      const blob = await generateTicketBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_ht6_accepted_ticket.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download ticket:', err);
    }
  };

  const shareTicket = async (platform: 'linkedin' | 'instagram') => {
    try {
      const blob = await generateTicketBlob();
      const file = new File([blob], 'ticket.png', { type: 'image/png' });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: 'My Hack the 6ix Ticket',
          text: 'Check out my RSVP ticket for Hack the 6ix! See you there!',
        });
        return;
      }
    } catch (err) {
      console.warn('Web Share API failed, using fallback:', err);
    }

    if (platform === 'linkedin') {
      const shareUrl =
        typeof window !== 'undefined' ?
          `${window.location.origin}/`
        : 'https://dash.hackthe6ix.com/';
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        '_blank',
      );
    } else {
      window.open('https://www.instagram.com/', '_blank');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:pr-10 gap-17 py-10">
      <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left md:-translate-y-20 md:min-h-[80vh] md:w-[65%]">
        <Typography
          as="p"
          textSize="subtitle-sm"
          textWeight="bold"
          textColor="text-white"
          className="mt-6 md:mt-32"
        >
          You’re all set!
        </Typography>
        <Typography
          as="h1"
          textSize="display"
          textWeight="bold"
          textColor="text-[#46ECD5]"
          className="mt-[43px]"
        >
          RSVP confirmed!
        </Typography>
        <Typography
          as="p"
          textSize="paragraph-lg"
          textWeight="regular"
          textColor="text-white"
          className="max-w-xs md:max-w-none mt-[43px]"
        >
          We&apos;ve received your information and can&apos;t wait to see what
          you&apos;ll build at Hack the 6ix!
          <br />
          Keep an eye on our Discord for event updates, announcements, and next
          steps.
        </Typography>
        <Typography
          as="p"
          textSize="paragraph-lg"
          textWeight="regular"
          textColor="text-white"
          className="mt-[86px]"
        >
          Stay connected with HT6:
        </Typography>
        <div className="flex mt-[12px] gap-4 text-white">
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
      <div className="flex flex-col items-center gap-6">
        <div className="w-[245px] h-[498px]">
          <TicketImage />
        </div>
        <div className="flex items-center gap-6 text-white">
          <button
            onClick={downloadTicket}
            className="hover:text-primary-300 transition cursor-pointer"
            title="Download Ticket"
          >
            <FaDownload size={22} />
          </button>
          <button
            onClick={() => shareTicket('instagram')}
            className="hover:text-primary-300 transition cursor-pointer"
            title="Share to Instagram"
          >
            <FaInstagram size={24} />
          </button>
          <button
            onClick={() => shareTicket('linkedin')}
            className="hover:text-primary-300 transition cursor-pointer"
            title="Share to LinkedIn"
          >
            <FaLinkedin size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RsvpedView;
