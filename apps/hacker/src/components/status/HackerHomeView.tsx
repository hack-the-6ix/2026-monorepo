import { useEffect, useMemo, useState } from 'react';
import { FaArrowRightLong, FaChevronDown } from 'react-icons/fa6';
import { Typography, WorkshopCard } from '@hackthe6ix/ui';
import Image from 'next/image';

import {
  changeHackerRsvpStatus,
  listScheduleEvents,
  seasonCode,
} from '@/actions';
import { useHacker } from '@/context/HackerContext';
import {
  apiEventsToScheduleEvents,
  categoryColor,
  formatTime,
  type ScheduleEvent,
} from '@/data/schedule';
import { glassPanelClass } from '@/lib/styles';
import devpostIcon from '../../app/assets/devpost_icon.png';
import discordIcon from '../../app/assets/discord_icon.png';
import moreInfoIcon from '../../app/assets/more_info.png';
import notionIcon from '../../app/assets/notion_icon.png';
import paperclipIcon from '../../app/assets/paperclip.png';
import RsvpCancelDialog from './RsvpCancelDialog';

interface HackerHomeViewProps {
  name: string;
  onDecline?: () => void | Promise<void>;
}

const quickLinkPanelClass =
  'rounded-[32px] border border-white/30 bg-[linear-gradient(293deg,rgba(255,255,255,0.40)_3.25%,rgba(16,219,255,0.40)_100%)]';

const faqItems = [
  {
    title: 'Where will the event be located?',
    content:
      'This year we will be at the Bahen Centre on the University of Toronto’s St. Geroge Campus (40 St. George St, Toronto, ON M5S 2E4).',
  },
  {
    title: 'What should I bring on event day?',
    content:
      'Make sure to bring your laptop (or desktop) and a piece of valid student ID or government ID! You can also bring a pillow and blanket if you want to get comfy. A detailed packing list will be sent to hackers who successfully RSVP.',
  },
  {
    title: 'Do I need a team before I arrive?',
    content:
      'Nope! There will be many events and opportunities where you can find teammates throughout the hackathon. Teams can have between 1–4 members.',
  },
  {
    title: 'When is check-in?',
    content:
      'Check-in is between 5pm-7pm on Friday July 17th. You must arrive before 11:59 PM EST on Friday July 17th, otherwise your admission may be given to another hacker.',
  },
];

const participantCodeHelpText =
  'Show this QR code to check-in! We recommend screenshotting this.';

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col gap-1 py-2">
      <button
        type="button"
        className="group flex w-full cursor-pointer items-center gap-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 rounded-md"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <FaChevronDown
          className="h-3.5 w-3.5 shrink-0 text-white/60 transition-transform duration-200 ease-in-out group-hover:text-yellow-300"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
        <Typography
          as="span"
          textSize="paragraph-sm"
          textWeight="medium"
          textColor="text-white"
          className="opacity-90 transition group-hover:text-yellow-300 group-hover:opacity-100"
        >
          {title}
        </Typography>
      </button>

      <div
        className={`grid w-full transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <Typography
            as="div"
            textSize="paragraph-sm"
            textWeight="regular"
            textColor="text-white"
            className="whitespace-pre-line pl-4 pb-2 pt-1 opacity-75"
          >
            {children}
          </Typography>
        </div>
      </div>
    </div>
  );
}

const HackerHomeView = ({ name }: HackerHomeViewProps) => {
  const { profile, hackerRole, refresh, status } = useHacker();
  const [qrLoadFailed, setQrLoadFailed] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [hasCancelledRsvp, setHasCancelledRsvp] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Current Events State
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSchedule = async () => {
      try {
        const apiEvents = await listScheduleEvents();
        if (cancelled) return;
        setEvents(apiEventsToScheduleEvents(apiEvents));
      } catch (err) {
        console.error('Failed to load schedule events', err);
      } finally {
        if (!cancelled) setLoadingEvents(false);
      }
    };

    void loadSchedule();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const currentEvents = useMemo(() => {
    if (now === null) return [];
    return events.filter((e) => {
      const start = new Date(e.start).getTime();
      const end = new Date(e.end).getTime();
      return now >= start && now <= end;
    });
  }, [events, now]);

  const qrCodeSrc =
    profile?.userId ?
      `/api/ht6/users/${encodeURIComponent(profile.userId)}/qr`
    : null;

  return (
    <div className="mx-auto grid min-h-[80vh] max-h-screen w-full max-w-340 grid-cols-1 gap-10 md:gap-28 px-8 pb-12 pt-20 md:pt-16 md:grid-cols-[1fr_300px] lg:px-10">
      <section className="scrollbar-none flex flex-col gap-7 overflow-y-auto [&::-webkit-scrollbar]:hidden lg:pt-12">
        <div className="space-y-3">
          <Typography
            as="h1"
            textSize="heading-lg"
            textWeight="bold"
            textColor="text-white"
            className="leading-tight"
          >
            Welcome back, <br /> {name}!
          </Typography>
          <Typography
            as="p"
            textSize="paragraph-lg"
            textWeight="regular"
            textColor="text-white"
            className="max-w-3xl"
          >
            Explore your dashboard below and get excited for the event on{' '}
            <span className="text-yellow-300">July 17th</span>!
          </Typography>
        </div>
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full border-2 px-5 py-4 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-colors duration-300 ${
            status === 'waitlist' || status === 'accepted' ?
              'border-[#F6BD55] bg-[#B08630]'
            : hasCancelledRsvp ? 'border-[#ff6d73] bg-[#d54b52]'
            : 'border-[#3fe7a4] bg-[#3e7f7a]'
          }`}
        >
          <span className="flex items-center gap-3 leading-none">
            <span
              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                status === 'waitlist' || status === 'accepted' ?
                  'bg-[#F6BD55] text-[#332200]'
                : hasCancelledRsvp ? 'bg-white/20 text-white'
                : 'bg-[#1ee38e] text-[#0b1f1b]'
              }`}
              aria-hidden="true"
            >
              {status === 'waitlist' || status === 'accepted' ?
                '!'
              : hasCancelledRsvp ?
                '!'
              : '✓'}
            </span>
            <span>
              {status === 'waitlist' ?
                'Status: Waitlisted'
              : status === 'accepted' ?
                "Status: Accepted but didn't RSVP"
              : hasCancelledRsvp ?
                'Status: Not attending'
              : 'Status: Attending'}
            </span>
          </span>

          {status !== 'waitlist' &&
            status !== 'accepted' &&
            hackerRole?.status != 'checked-in' &&
            (hasCancelledRsvp ?
              <span className="text-white/90">RSVP updated</span>
            : <button
                type="button"
                onClick={() => setIsCancelDialogOpen(true)}
                className="text-left font-normal text-white transition hover:text-white/85 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isCancelling}
              >
                Can’t attend anymore? {'  '}
                <span className="font-semibold text-yellow-300 underline decoration-yellow-300 decoration-2 underline-offset-4 transition hover:text-yellow-200">
                  Cancel your RSVP
                </span>
              </button>)}
        </div>
        {(status === 'waitlist' || status === 'accepted') && (
          <div className={`${glassPanelClass} flex flex-col gap-4 px-5 py-6`}>
            <div>
              <Typography
                as="h2"
                textSize="subtitle-sm"
                textWeight="semi-bold"
                textColor="text-white"
                className="mb-3"
              >
                How walk-in works
              </Typography>
              <div className="space-y-3 opacity-85">
                <Typography
                  as="div"
                  textSize="paragraph-sm"
                  textWeight="regular"
                  textColor="text-white"
                >
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      The walk-in sign-up form opens at{' '}
                      <strong>7:00pm on Friday, July 17th</strong>. It will stay
                      open until all spots are filled, first-come first-served.
                    </li>
                    <li>
                      Once you fill out the{' '}
                      <a
                        href="https://forms.gle/6staW7SNctNyFzZt8"
                        target="_blank"
                        className="font-semibold text-yellow-300 underline decoration-yellow-300 decoration-2 underline-offset-4 transition hover:text-yellow-200"
                      >
                        walk-in form
                      </a>{' '}
                      and{' '}
                      <a
                        href="/?tab=rsvp-form"
                        target="_blank"
                        className="font-semibold text-yellow-300 underline decoration-yellow-300 decoration-2 underline-offset-4 transition hover:text-yellow-200"
                      >
                        RSVP form
                      </a>
                      , you have until <strong>7:45pm</strong> to register
                      in-person on the first on the first floor of Bahen Centre.
                    </li>
                    <li>
                      If you are running late, call our help desk at
                      437-424-1232 to hold your spot. If we do not hear from you
                      by 7:45pm, your spot will go to the next person in line.
                    </li>
                    <li>
                      If spots are still open, we will reopen the form at 7:50pm
                      for another round, with the same 45-minute check-in
                      window.
                    </li>
                  </ul>
                </Typography>
                <Typography
                  as="p"
                  textSize="paragraph-sm"
                  textWeight="regular"
                  textColor="text-white"
                >
                  Unfortunately, we do not have an exact number of walk-in spots
                  yet, but we are estimating around 30-50.
                </Typography>
                <Typography
                  as="p"
                  textSize="paragraph-sm"
                  textWeight="regular"
                  textColor="text-white"
                >
                  Do not forget to bring a form of ID to check in. Your
                  dashboard (including Discord invite link) will be updated
                  after you check in.
                </Typography>
              </div>
            </div>
          </div>
        )}

        <div className={`${glassPanelClass} flex flex-col gap-4 px-5 py-6`}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Typography
                as="h2"
                textSize="subtitle-sm"
                textWeight="semi-bold"
                textColor="text-white"
                className={
                  currentEvents.length === 0 && !loadingEvents ? 'mb-3' : ''
                }
              >
                {loadingEvents ?
                  'Loading events...'
                : currentEvents.length > 0 ?
                  'Current Events:'
                : 'No current events.'}
              </Typography>
              {currentEvents.length === 0 && !loadingEvents && (
                <Typography
                  as="p"
                  textSize="paragraph-sm"
                  textWeight="regular"
                  textColor="text-white"
                  className="opacity-85"
                >
                  Check back later to see events!
                </Typography>
              )}
            </div>
            <a
              href="/?tab=event"
              target="_blank"
              rel="noreferrer"
              className="mb-1 shrink-0 text-sm font-semibold underline text-yellow-300 decoration-yellow-300 decoration-2 underline-offset-4 transition hover:text-yellow-200"
            >
              See schedule
              <FaArrowRightLong className="ml-1.5 inline-block align-middle" />
            </a>
          </div>

          {currentEvents.length > 0 && !loadingEvents && (
            <div className="flex flex-col gap-3">
              {currentEvents.map((ev) => (
                <WorkshopCard
                  key={ev.id}
                  className="w-full bg-[#3E4259]/55"
                  title={ev.title}
                  startTime={formatTime(ev.start)}
                  endTime={formatTime(ev.end)}
                  location={ev.location}
                  color={categoryColor(ev.category)}
                  state="active"
                />
              ))}
            </div>
          )}
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
          <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-x-10">
            {faqItems.map((item) => (
              <Disclosure key={item.title} title={item.title}>
                {item.content}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      <aside className="flex flex-col gap-4 lg:pt-6">
        <div className={`${glassPanelClass} px-8 pt-8 pb-6`}>
          <div className="mb-4 flex items-center gap-2">
            <Typography
              as="h2"
              textSize="paragraph-lg"
              textWeight="semi-bold"
              textColor="text-white"
            >
              {status === 'waitlist' || status === 'accepted' ?
                'Walk-in Code'
              : 'Participant Code'}
            </Typography>
            <div className="group relative inline-flex shrink-0 items-center justify-center">
              <button
                type="button"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="More information about participant code"
              >
                <Image
                  src={moreInfoIcon}
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

          <div className="flex flex-col gap-5 pt-2">
            <div className="rounded-2xl bg-white">
              {qrCodeSrc && !qrLoadFailed ?
                <Image
                  src={qrCodeSrc}
                  alt="Participant QR code"
                  width={250}
                  height={250}
                  unoptimized
                  className="aspect-square w-full rounded-xl border border-black/20 object-cover"
                  onError={(e) => {
                    setQrLoadFailed(true);
                    console.log(e);
                  }}
                />
              : <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-black/20 bg-[linear-gradient(0deg,rgba(0,0,0,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.09)_1px,transparent_1px)] bg-size-[16px_16px]">
                  <div className="absolute inset-0 m-auto h-12 w-12 rounded-xl bg-[#65f4d4] shadow-[0_0_20px_rgba(101,244,212,0.75)]" />
                  <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center text-sm font-black text-[#112031]">
                    ht6
                  </div>
                </div>
              }
            </div>
            <div className="flex justify-center">
              {hackerRole?.status === 'checked-in' ?
                <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#3fe7a4] bg-[#3e7f7a] px-2.5 py-1.5 text-[15px] font-semibold text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1ee38e] text-[11px] font-black text-[#0b1f1b]">
                    ✓
                  </span>
                  Checked in
                </div>
              : <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#ff6d73] bg-[#9e3f44] px-2.5 py-1.5 text-[15px] font-semibold text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6d73] text-[11px] font-black text-[#5c1a1e]">
                    !
                  </span>
                  Not checked in
                </div>
              }
            </div>
          </div>
        </div>

        {status !== 'waitlist' && status !== 'accepted' && (
          <a
            href="https://discord.gg/Nj9jTRcBX"
            target="_blank"
            rel="noreferrer"
            className={`${quickLinkPanelClass} block px-5 py-3 transition hover:border-teal-300/60`}
          >
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <Image
                    src={discordIcon}
                    alt="Discord icon"
                    className="h-6 w-6 shrink-0"
                  />
                  <Typography
                    as="h3"
                    textSize="paragraph-sm"
                    textWeight="semi-bold"
                    textColor="text-white"
                    className="leading-tight"
                  >
                    Hack the 6ix Discord
                  </Typography>
                </div>
                <Image
                  src={paperclipIcon}
                  alt="Link icon"
                  className="h-5 w-5 shrink-0"
                />
              </div>
            </div>
          </a>
        )}

        <a
          target="_blank"
          href="https://hackthe6ix.notion.site/hacker-handbook"
          className={`${quickLinkPanelClass} block px-5 py-3 transition hover:border-teal-300/60`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src={notionIcon}
                alt="Notion icon"
                className="h-6 w-6 shrink-0"
              />
              <Typography
                as="h3"
                textSize="paragraph-sm"
                textWeight="semi-bold"
                textColor="text-white"
                className="leading-tight"
              >
                Hacker Guide
              </Typography>
            </div>
            <Image
              src={paperclipIcon}
              alt="Link icon"
              className="h-5 w-5 shrink-0"
            />
          </div>
        </a>

        {status !== 'waitlist' && status !== 'accepted' && (
          <a
            href="https://hackthe6ix2026.devpost.com/"
            target="_blank"
            rel="noreferrer"
            className={`${quickLinkPanelClass} block px-5 py-3 transition hover:border-teal-300/60`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={devpostIcon}
                  alt="Devpost icon"
                  className="h-6 w-6 shrink-0"
                />
                <Typography
                  as="h3"
                  textSize="paragraph-sm"
                  textWeight="semi-bold"
                  textColor="text-white"
                  className="leading-tight"
                >
                  Devpost
                </Typography>
              </div>
              <Image
                src={paperclipIcon}
                alt="Link icon"
                className="h-5 w-5 shrink-0"
              />
            </div>
          </a>
        )}
      </aside>

      <RsvpCancelDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={async () => {
          setIsCancelling(true);
          try {
            if (profile?.userId) {
              await changeHackerRsvpStatus(
                profile.userId,
                'declined',
                seasonCode,
              );
              await refresh();
            }
            setHasCancelledRsvp(true);
          } catch (err) {
            console.error('Failed to cancel RSVP', err);

            alert('Failed to cancel RSVP. Please try again.');
          } finally {
            setIsCancelDialogOpen(false);
            setIsCancelling(false);
          }
        }}
      />
    </div>
  );
};

export default HackerHomeView;
