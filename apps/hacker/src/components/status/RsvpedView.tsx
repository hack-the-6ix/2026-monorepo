// import { useHacker } from '@/context/HackerContext';
// import { Typography } from '@hackthe6ix/ui';
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaXTwitter,
//   FaDownload,
// } from 'react-icons/fa6';
// import ticketImage from '../../app/assets/ticket.png';
// import TicketImage from '../TicketImage';

// const RsvpedView = () => {
//   const { profile } = useHacker();
//   const firstName = profile?.firstName?.toUpperCase() ?? 'JOHN';
//   const lastName = profile?.lastName?.toUpperCase() ?? 'DOE';

//   const generateTicketBlob = (): Promise<Blob> => {
//     return new Promise((resolve, reject) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       if (!ctx) {
//         reject(new Error('Could not get canvas context'));
//         return;
//       }

//       const img = new window.Image();
//       img.crossOrigin = 'anonymous';
//       img.src = ticketImage.src;
//       img.onload = () => {
//         canvas.width = img.naturalWidth;
//         canvas.height = img.naturalHeight;

//         ctx.drawImage(img, 0, 0);

//         const fontSize = Math.round(canvas.height * 0.04);
//         ctx.font = `bold ${fontSize}px sans-serif`;
//         ctx.fillStyle = '#ffffff';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';

//         ctx.shadowColor = 'rgba(154, 252, 255, 0.91)';
//         ctx.shadowBlur = 8;

//         const x = canvas.width / 2;
//         const targetY = canvas.height * 0.824;
//         const lineHeight = fontSize * 1.25;

//         ctx.fillText(firstName, x, targetY - lineHeight / 2);
//         ctx.fillText(lastName, x, targetY + lineHeight / 2);

//         canvas.toBlob((blob) => {
//           if (blob) {
//             resolve(blob);
//           } else {
//             reject(new Error('Canvas toBlob returned null'));
//           }
//         }, 'image/png');
//       };
//       img.onerror = () => {
//         reject(new Error('Failed to load ticket image source'));
//       };
//     });
//   };

//   const downloadTicket = async () => {
//     try {
//       const blob = await generateTicketBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_ht6_accepted_ticket.png`;
//       link.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Failed to download ticket:', err);
//     }
//   };

//   const shareTicket = async (platform: 'linkedin' | 'instagram') => {
//     try {
//       const blob = await generateTicketBlob();
//       const file = new File([blob], 'ticket.png', { type: 'image/png' });

//       if (
//         navigator.share &&
//         navigator.canShare &&
//         navigator.canShare({ files: [file] })
//       ) {
//         await navigator.share({
//           files: [file],
//           title: 'My Hack the 6ix Ticket',
//           text: 'Check out my RSVP ticket for Hack the 6ix! See you there!',
//         });
//         return;
//       }
//     } catch (err) {
//       console.warn('Web Share API failed, using fallback:', err);
//     }

//     if (platform === 'linkedin') {
//       const shareUrl =
//         typeof window !== 'undefined' ?
//           `${window.location.origin}/`
//         : 'https://dash.hackthe6ix.com/';
//       window.open(
//         `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
//         '_blank',
//       );
//     } else {
//       window.open('https://www.instagram.com/', '_blank');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:pr-10 gap-17 py-10">
//       <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left md:-translate-y-20 md:min-h-[80vh] md:w-[65%]">
//         <Typography
//           as="p"
//           textSize="subtitle-sm"
//           textWeight="bold"
//           textColor="text-white"
//           className="mt-6 md:mt-32"
//         >
//           You’re all set!
//         </Typography>
//         <Typography
//           as="h1"
//           textSize="display"
//           textWeight="bold"
//           textColor="text-[#46ECD5]"
//           className="mt-[43px]"
//         >
//           RSVP confirmed!
//         </Typography>
//         <Typography
//           as="p"
//           textSize="paragraph-lg"
//           textWeight="regular"
//           textColor="text-white"
//           className="max-w-xs md:max-w-none mt-[43px]"
//         >
//           We&apos;ve received your information and can&apos;t wait to see what
//           you&apos;ll build at Hack the 6ix!
//           <br />
//           Keep an eye on our Discord for event updates, announcements, and next
//           steps.
//         </Typography>
//         <Typography
//           as="p"
//           textSize="paragraph-lg"
//           textWeight="regular"
//           textColor="text-white"
//           className="mt-[86px]"
//         >
//           Stay connected with HT6:
//         </Typography>
//         <div className="flex mt-[12px] gap-4 text-white">
//           <a
//             href="https://www.facebook.com/Hackthe6ix/"
//             target="_blank"
//             className="hover:text-primary-300 transition"
//           >
//             <FaFacebook size={24} />
//           </a>
//           <a
//             href="https://instagram.com/hackthe6ix"
//             target="_blank"
//             className="hover:text-primary-300 transition"
//           >
//             <FaInstagram size={24} />
//           </a>
//           <a
//             href="https://www.linkedin.com/company/hackthe6ixofficial"
//             target="_blank"
//             className="hover:text-primary-300 transition"
//           >
//             <FaLinkedin size={24} />
//           </a>
//           <a
//             href="https://x.com/hackthe6ix"
//             target="_blank"
//             className="hover:text-primary-300 transition"
//           >
//             <FaXTwitter size={24} />
//           </a>
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-6">
//         <div className="w-[245px] h-[498px]">
//           <TicketImage />
//         </div>
//         <div className="flex items-center gap-6 text-white">
//           <button
//             onClick={downloadTicket}
//             className="hover:text-primary-300 transition cursor-pointer"
//             title="Download Ticket"
//           >
//             <FaDownload size={22} />
//           </button>
//           <button
//             onClick={() => shareTicket('instagram')}
//             className="hover:text-primary-300 transition cursor-pointer"
//             title="Share to Instagram"
//           >
//             <FaInstagram size={24} />
//           </button>
//           <button
//             onClick={() => shareTicket('linkedin')}
//             className="hover:text-primary-300 transition cursor-pointer"
//             title="Share to LinkedIn"
//           >
//             <FaLinkedin size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RsvpedView;

import { useState } from 'react';
import { useHacker } from '@/context/HackerContext';
import { Button, Typography } from '@hackthe6ix/ui';
import { FaArrowRightLong } from 'react-icons/fa6';
import discordIcon from '../../app/assets/discord_icon.png';
import devpostIcon from '../../app/assets/devpost_icon.png';
import checkmarkIcon from '../../app/assets/checkmark.png';
import exclamationIcon from '../../app/assets/exclamation.png';
import moreInfoIcon from '../../app/assets/more_info.png';
import notionIcon from '../../app/assets/notion_icon.png';
import paperclipIcon from '../../app/assets/paperclip.png';
import RsvpCancelDialog from './RsvpCancelDialog';

interface RsvpedViewProps {
  name: string;
}

const glassPanelClass =
  'rounded-[32px] border border-white/50 bg-[linear-gradient(293deg,rgba(255,255,255,0.20)_3.25%,rgba(153,153,153,0.20)_100%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]';

const quickLinkPanelClass =
  'rounded-[32px] border border-white/30 bg-[linear-gradient(293deg,rgba(255,255,255,0.40)_3.25%,rgba(16,219,255,0.40)_100%)]';

const faqItems = [
  'Where will the event be located?',
  'What should I bring on event day?',
  'Do I need a team before I arrive?',
  'When is check-in and onboarding?',
];

const participantCodeHelpText =
  'Show this QR code to check-in, grab food, participate in activities, etc! We recommend screenshotting this.';

const RsvpedView = ({ name }: RsvpedViewProps) => {
  const { profile } = useHacker();
  const [qrLoadFailed, setQrLoadFailed] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [hasCancelledRsvp, setHasCancelledRsvp] = useState(false);

  const qrCodeSrc =
    profile?.userId ?
      `/api/users/${encodeURIComponent(profile.userId)}/qr`
    : null;
  const discordCommand =
    profile?.email ?
      `!verify ${profile.email}`
    : '/verify your_email@example.com';

  return (
    <div className="mx-auto grid min-h-[80vh] w-full max-w-340 grid-cols-1 gap-6 px-4 pb-12 pt-8 lg:grid-cols-[1fr_320px] lg:px-10">
      <section className="flex flex-col gap-5 lg:pt-12">
        <div className="space-y-3">
          <Typography
            as="h1"
            textSize="heading-lg"
            textWeight="bold"
            textColor="text-white"
            className="leading-tight"
          >
            Welcome back, {name}!
          </Typography>
          <Typography
            as="p"
            textSize="paragraph-lg"
            textWeight="regular"
            textColor="text-white"
            className="max-w-3xl"
          >
            Explore your dashboard below and get excited for the event on{' '}
            <span className="text-yellow-300">July 17th</span>.
          </Typography>
        </div>

        <div
          className={`${glassPanelClass} flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center gap-3 rounded-full border-2 px-4 py-2 text-sm font-semibold text-white ${
                hasCancelledRsvp ?
                  'border-[#FF6467] bg-[rgba(255,100,103,0.50)]'
                : 'border-[#44BDA3] bg-[rgba(94,233,181,0.50)]'
              }`}
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                <img
                  src={
                    hasCancelledRsvp ? exclamationIcon.src : checkmarkIcon.src
                  }
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
              <span className="leading-none">
                {hasCancelledRsvp ? 'Not checked in' : 'Status: Attending'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Typography
              as="p"
              textSize="label"
              textWeight="regular"
              textColor="text-white"
              className="opacity-80"
            >
              Can&apos;t attend anymore?
            </Typography>
            <Button
              kind="tertiary"
              className="px-0! py-0! text-yellow-300 hover:text-yellow-200"
              onClick={() => setIsCancelDialogOpen(true)}
            >
              Cancel your RSVP
            </Button>
          </div>
        </div>

        <div
          className={`${glassPanelClass} flex items-end justify-between gap-4 px-5 py-6`}
        >
          <div>
            <Typography
              as="h2"
              textSize="subtitle-sm"
              textWeight="semi-bold"
              textColor="text-white"
              className="mb-3"
            >
              No current events.
            </Typography>
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="regular"
              textColor="text-white"
              className="opacity-85"
            >
              Check back later to see events!
            </Typography>
          </div>
          <a
            href="https://hackthe6ix.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-yellow-300 transition hover:text-yellow-200"
          >
            See schedule{' '}
            <FaArrowRightLong className="inline-block align-middle" />
          </a>
        </div>

        <div className={`${glassPanelClass} px-5 py-6`}>
          <Typography
            as="h2"
            textSize="subtitle-sm"
            textWeight="semi-bold"
            textColor="text-white"
            className="mb-4"
          >
            Pre-Hackathon FAQ
          </Typography>
          <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
            {faqItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={(event) => event.preventDefault()}
                className="group inline-flex cursor-default items-center gap-2 text-left text-white/90 transition hover:text-white"
              >
                <span className="text-sm text-white/60 transition group-hover:text-yellow-300">
                  {'>'}
                </span>
                <Typography
                  as="span"
                  textSize="paragraph-sm"
                  textWeight="medium"
                  textColor="text-white"
                  className="opacity-90"
                >
                  {item}
                </Typography>
              </button>
            ))}
          </div>
        </div>
      </section>

      <aside className="flex flex-col gap-4 lg:pt-6">
        <div className={`${glassPanelClass} px-5 py-6`}>
          <div className="mb-4 flex items-center gap-2">
            <Typography
              as="h2"
              textSize="paragraph-lg"
              textWeight="semi-bold"
              textColor="text-white"
            >
              Participant Code
            </Typography>
            <div className="group relative inline-flex shrink-0 items-center justify-center">
              <button
                type="button"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="More information about participant code"
              >
                <img
                  src={moreInfoIcon.src}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-72 -translate-x-1/2 rounded-[18px] bg-[#3b416d] px-4 py-3 text-left text-sm leading-relaxed text-white opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {participantCodeHelpText}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4">
            {qrCodeSrc && !qrLoadFailed ?
              <img
                src={qrCodeSrc}
                alt="Participant QR code"
                className="aspect-square w-full rounded-xl border border-black/20 object-cover"
                onError={() => {
                  setQrLoadFailed(true);
                }}
              />
            : <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-black/20 bg-[linear-gradient(0deg,rgba(0,0,0,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.09)_1px,transparent_1px)] bg-size-[16px_16px]">
                <div className="absolute inset-0 m-auto h-12 w-12 rounded-xl bg-[#65f4d4] shadow-[0_0_20px_rgba(101,244,212,0.75)]" />
                <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center text-sm font-black text-[#112031]">
                  HT6
                </div>
              </div>
            }
          </div>

          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#FF6467] bg-[rgba(255,100,103,0.50)] px-4 py-2 text-sm font-semibold text-white">
              <span
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px] font-black text-white"
                aria-hidden="true"
              >
                !
              </span>
              <span className="leading-none">
                {hasCancelledRsvp ? 'RSVP cancelled' : 'Not checked in'}
              </span>
            </div>
          </div>
        </div>

        <a
          href="https://discord.gg/hackthe6ix"
          target="_blank"
          rel="noreferrer"
          className={`${quickLinkPanelClass} block min-h-[210px] px-4 py-4 transition hover:border-teal-300/60`}
        >
          <div className="flex h-full min-h-[170px] flex-col gap-4">
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3">
                <img
                  src={discordIcon.src}
                  alt="Discord icon"
                  className="h-6 w-6 shrink-0"
                />
                <Typography
                  as="h3"
                  textSize="paragraph-lg"
                  textWeight="semi-bold"
                  textColor="text-white"
                  className="leading-tight"
                >
                  Hack the 6ix Discord
                </Typography>
              </div>
              <img
                src={paperclipIcon.src}
                alt="Link icon"
                className="h-5 w-5 shrink-0"
              />
            </div>
            <Typography
              as="p"
              textSize="label"
              textWeight="medium"
              textColor="text-white"
              className="opacity-90"
            >
              Issue the command in #verification channel
            </Typography>
            <div className="mt-auto rounded-full bg-white/15 px-3 py-2 text-center text-[11px] text-white/90">
              {discordCommand}
            </div>
          </div>
        </a>

        <a
          href="#"
          className={`${quickLinkPanelClass} block px-4 py-3 transition hover:border-teal-300/60`}
        >
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={notionIcon.src}
                alt="Notion icon"
                className="h-6 w-6 shrink-0"
              />
              <Typography
                as="h3"
                textSize="paragraph-lg"
                textWeight="semi-bold"
                textColor="text-white"
                className="leading-tight"
              >
                Hacker Guide
              </Typography>
            </div>
            <img
              src={paperclipIcon.src}
              alt="Link icon"
              className="h-5 w-5 shrink-0"
            />
          </div>
        </a>

        <a
          href="https://devpost.com"
          target="_blank"
          rel="noreferrer"
          className={`${quickLinkPanelClass} block px-4 py-3 transition hover:border-teal-300/60`}
        >
          <div className="mb-1 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={devpostIcon.src}
                alt="Devpost icon"
                className="h-6 w-6 shrink-0"
              />
              <Typography
                as="h3"
                textSize="paragraph-lg"
                textWeight="semi-bold"
                textColor="text-white"
                className="leading-tight"
              >
                Devpost
              </Typography>
            </div>
            <img
              src={paperclipIcon.src}
              alt="Link icon"
              className="h-5 w-5 shrink-0"
            />
          </div>
        </a>
      </aside>

      <RsvpCancelDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={() => {
          setIsCancelDialogOpen(false);
          setHasCancelledRsvp(true);
        }}
      />
    </div>
  );
};

export default RsvpedView;
