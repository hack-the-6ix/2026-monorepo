import type { WorkshopCardState, WorkshopColor } from '@hackthe6ix/ui';

export const scheduleCategories = [
  { key: 'main', label: 'Main Events', color: 'lavender' },
  { key: 'sponsor', label: 'Sponsor Bay', color: 'pink' },
  { key: 'social', label: 'Socials', color: 'cyan' },
  { key: 'workshop', label: 'Workshops', color: 'mint' },
] as const satisfies ReadonlyArray<{
  key: string;
  label: string;
  color: WorkshopColor;
}>;

export type ScheduleCategoryKey = (typeof scheduleCategories)[number]['key'];

export const categoryColor = (key: ScheduleCategoryKey): WorkshopColor =>
  scheduleCategories.find((c) => c.key === key)?.color ?? 'lavender';

export interface ScheduleDay {
  key: string;
  label: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  category: ScheduleCategoryKey;
  location?: string;
  start: string;
  end: string;
}

export interface ApiScheduleEvent {
  eventId: string;
  eventName: string;
  startTime: string;
  endTime: string;
  category?: string | null;
  eventType?: string | null;
  type?: string | null;
  location?: string | null;
  room?: string | null;
  venue?: string | null;
}

const pdfHackerScheduleEvents: ScheduleEvent[] = [
  {
    id: 'pdf-hacker-check-in',
    title: 'Hacker Check-In',
    category: 'main',
    location: 'Bahen Lobby',
    start: '2026-07-17T17:00:00-04:00',
    end: '2026-07-17T19:00:00-04:00',
  },
  {
    id: 'pdf-fgf-pastry-detectives',
    title: 'FGF Event: Pastry Detectives',
    category: 'social',
    location: 'BA1160',
    start: '2026-07-17T18:30:00-04:00',
    end: '2026-07-17T19:30:00-04:00',
  },
  {
    id: 'pdf-warp-workshop',
    title: 'Warp Workshop',
    category: 'workshop',
    location: 'BA2155',
    start: '2026-07-17T18:30:00-04:00',
    end: '2026-07-17T19:30:00-04:00',
  },
  {
    id: 'pdf-sponsor-booths-friday',
    title: 'Sponsor Booths',
    category: 'sponsor',
    location: 'Bahen Lobby',
    start: '2026-07-17T19:00:00-04:00',
    end: '2026-07-17T21:30:00-04:00',
  },
  {
    id: 'pdf-friday-dinner',
    title: 'Dinner',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-17T19:00:00-04:00',
    end: '2026-07-17T20:30:00-04:00',
  },
  {
    id: 'pdf-opening-ceremony',
    title: 'Opening Ceremony',
    category: 'main',
    location: 'MS 2158',
    start: '2026-07-17T20:30:00-04:00',
    end: '2026-07-17T21:30:00-04:00',
  },
  {
    id: 'pdf-hacking-begins',
    title: 'Hacking Begins',
    category: 'main',
    start: '2026-07-17T21:30:00-04:00',
    end: '2026-07-17T21:45:00-04:00',
  },
  {
    id: 'pdf-qnx-workshop',
    title: 'QNX Workshop',
    category: 'workshop',
    location: 'BA2155',
    start: '2026-07-17T22:30:00-04:00',
    end: '2026-07-17T23:30:00-04:00',
  },
  {
    id: 'pdf-hardware-bay',
    title: 'Hardware Bay',
    category: 'sponsor',
    location: 'Bahen Atrium',
    start: '2026-07-17T22:45:00-04:00',
    end: '2026-07-19T09:30:00-04:00',
  },
  {
    id: 'pdf-resume-review',
    title: 'Resume Review',
    category: 'sponsor',
    location: 'BA1160',
    start: '2026-07-17T23:00:00-04:00',
    end: '2026-07-17T23:45:00-04:00',
  },
  {
    id: 'pdf-movie-night',
    title: 'Movie Night',
    category: 'social',
    location: 'BA1160',
    start: '2026-07-18T00:00:00-04:00',
    end: '2026-07-18T01:15:00-04:00',
  },
  {
    id: 'pdf-spicy-noodle-challenge',
    title: 'Spicy Noodle Challenge',
    category: 'social',
    location: 'BA1160',
    start: '2026-07-18T01:45:00-04:00',
    end: '2026-07-18T02:45:00-04:00',
  },
  {
    id: 'pdf-saturday-breakfast',
    title: 'Breakfast',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-18T09:00:00-04:00',
    end: '2026-07-18T10:30:00-04:00',
  },
  {
    id: 'pdf-coffee-tea-station',
    title: 'Coffee & Tea Station',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-18T09:00:00-04:00',
    end: '2026-07-18T10:00:00-04:00',
  },
  {
    id: 'pdf-egg-and-spoon-race',
    title: 'Egg and Spoon Race',
    category: 'social',
    location: 'Front Campus',
    start: '2026-07-18T10:45:00-04:00',
    end: '2026-07-18T11:45:00-04:00',
  },
  {
    id: 'pdf-freesolo-workshop',
    title: 'Freesolo Workshop',
    category: 'workshop',
    location: 'BA2145',
    start: '2026-07-18T11:00:00-04:00',
    end: '2026-07-18T12:00:00-04:00',
  },
  {
    id: 'pdf-wheelbarrow-race',
    title: 'Wheelbarrow Race',
    category: 'social',
    location: 'Front Campus',
    start: '2026-07-18T12:00:00-04:00',
    end: '2026-07-18T13:00:00-04:00',
  },
  {
    id: 'pdf-saturday-lunch',
    title: 'Lunch',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-18T12:15:00-04:00',
    end: '2026-07-18T13:15:00-04:00',
  },
  {
    id: 'pdf-typing-contest',
    title: 'Typing Contest',
    category: 'social',
    location: 'BA2145',
    start: '2026-07-18T13:00:00-04:00',
    end: '2026-07-18T14:00:00-04:00',
  },
  {
    id: 'pdf-50m-sprint',
    title: '50m Sprint',
    category: 'social',
    location: 'Front Campus',
    start: '2026-07-18T13:30:00-04:00',
    end: '2026-07-18T14:30:00-04:00',
  },
  {
    id: 'pdf-networking-101',
    title: 'Networking 101',
    category: 'workshop',
    location: 'BA2145',
    start: '2026-07-18T15:00:00-04:00',
    end: '2026-07-18T16:00:00-04:00',
  },
  {
    id: 'pdf-photo-booth',
    title: 'Photo Booth',
    category: 'social',
    location: 'Bahen Atrium',
    start: '2026-07-18T15:00:00-04:00',
    end: '2026-07-18T17:00:00-04:00',
  },
  {
    id: 'pdf-roll-the-6ix',
    title: 'Roll the 6ix',
    category: 'social',
    location: 'Myhal Arena',
    start: '2026-07-18T15:00:00-04:00',
    end: '2026-07-18T18:00:00-04:00',
  },
  {
    id: 'pdf-world-cup-viewing-party',
    title: 'World Cup 3rd Place Viewing Party',
    category: 'social',
    location: 'BA2155',
    start: '2026-07-18T16:30:00-04:00',
    end: '2026-07-18T19:00:00-04:00',
  },
  {
    id: 'pdf-deloitte-workshop',
    title: 'Deloitte Workshop',
    category: 'workshop',
    location: 'BA2145',
    start: '2026-07-18T17:00:00-04:00',
    end: '2026-07-18T18:00:00-04:00',
  },
  {
    id: 'pdf-estimathon',
    title: 'Estimathon presented by Jane Street',
    category: 'sponsor',
    location: 'BA1160',
    start: '2026-07-18T18:00:00-04:00',
    end: '2026-07-18T19:00:00-04:00',
  },
  {
    id: 'pdf-leapfrog-relay-race',
    title: 'Leapfrog Relay Race',
    category: 'social',
    location: 'Front Campus',
    start: '2026-07-18T18:30:00-04:00',
    end: '2026-07-18T19:30:00-04:00',
  },
  {
    id: 'pdf-mlh-google-ai-studio',
    title: 'MLH Intro to Google AI Studio',
    category: 'workshop',
    location: 'BA2145',
    start: '2026-07-18T19:00:00-04:00',
    end: '2026-07-18T19:30:00-04:00',
  },
  {
    id: 'pdf-mlh-github-copilot',
    title: 'MLH Intro to GitHub Copilot',
    category: 'workshop',
    location: 'BA2145',
    start: '2026-07-18T19:30:00-04:00',
    end: '2026-07-18T20:00:00-04:00',
  },
  {
    id: 'pdf-saturday-dinner',
    title: 'Dinner',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-18T20:00:00-04:00',
    end: '2026-07-18T21:30:00-04:00',
  },
  {
    id: 'pdf-trivia',
    title: 'Trivia',
    category: 'social',
    location: 'BA1160',
    start: '2026-07-18T20:30:00-04:00',
    end: '2026-07-18T21:30:00-04:00',
  },
  {
    id: 'pdf-resume-roast',
    title: 'Resume Roast',
    category: 'sponsor',
    location: 'BA1160',
    start: '2026-07-18T21:30:00-04:00',
    end: '2026-07-18T22:30:00-04:00',
  },
  {
    id: 'pdf-leetcode-relay-race',
    title: 'Leetcode Relay Race',
    category: 'social',
    location: 'BA2145',
    start: '2026-07-18T22:15:00-04:00',
    end: '2026-07-18T23:15:00-04:00',
  },
  {
    id: 'pdf-karaoke',
    title: 'Karaoke',
    category: 'social',
    location: 'BA1160',
    start: '2026-07-19T00:15:00-04:00',
    end: '2026-07-19T01:15:00-04:00',
  },
  {
    id: 'pdf-sunday-breakfast',
    title: 'Breakfast',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-19T09:00:00-04:00',
    end: '2026-07-19T09:30:00-04:00',
  },
  {
    id: 'pdf-hacking-deadline',
    title: 'Hacking Deadline',
    category: 'main',
    start: '2026-07-19T09:30:00-04:00',
    end: '2026-07-19T09:45:00-04:00',
  },
  {
    id: 'pdf-pitching-judging',
    title: 'Pitching & Judging',
    category: 'main',
    location:
      'BA B024, BA B025, BA B026, BA2135, BA2145, BA2155, BA2165, BA2175, BA2185',
    start: '2026-07-19T10:00:00-04:00',
    end: '2026-07-19T13:00:00-04:00',
  },
  {
    id: 'pdf-sunday-lunch',
    title: 'Lunch',
    category: 'social',
    location: 'Bahen Lobby',
    start: '2026-07-19T12:00:00-04:00',
    end: '2026-07-19T13:00:00-04:00',
  },
  {
    id: 'pdf-closing-ceremony',
    title: 'Closing Ceremony',
    category: 'main',
    location: 'MS2158',
    start: '2026-07-19T13:15:00-04:00',
    end: '2026-07-19T15:00:00-04:00',
  },
  {
    id: 'pdf-hardware-return',
    title: 'Hardware Return',
    category: 'sponsor',
    start: '2026-07-19T15:00:00-04:00',
    end: '2026-07-19T15:15:00-04:00',
  },
];

const apiEventTitlesReplacedByPdf = [
  'Hack the 6ix',
  'Friday Dinner',
  'Saturday Breakfast',
  'Saturday Lunch',
  'Saturday Dinner',
  'Typing Contest (Hosted by Warp)',
  'Estimathon by Jane Street',
  'MLH Google AI Studio and Github CoPilot Workshop',
];

const normalizeEventTitle = (title: string): string =>
  title
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const pdfReplacedEventTitles = new Set([
  ...pdfHackerScheduleEvents.map((event) => normalizeEventTitle(event.title)),
  ...apiEventTitlesReplacedByPdf.map(normalizeEventTitle),
]);

const categoryKeys = new Set<ScheduleCategoryKey>(
  scheduleCategories.map((c) => c.key),
);

const normalizeCategory = (
  value?: string | null,
): ScheduleCategoryKey | null => {
  if (!value) return null;

  const key = value.trim().toLowerCase().replace(/\s+/g, '-');
  if (categoryKeys.has(key as ScheduleCategoryKey))
    return key as ScheduleCategoryKey;
  if (key.includes('workshop')) return 'workshop';
  if (key.includes('sponsor')) return 'sponsor';
  if (key.includes('social')) return 'social';
  if (key.includes('main')) return 'main';
  return null;
};

const inferCategory = (event: ApiScheduleEvent): ScheduleCategoryKey => {
  const apiCategory = normalizeCategory(
    event.category ?? event.eventType ?? event.type,
  );
  if (apiCategory) return apiCategory;

  const title = event.eventName.toLowerCase();
  if (title.includes('workshop') || title.includes('networking'))
    return 'workshop';
  if (
    title.includes('ceremony') ||
    title.includes('pitching') ||
    title.includes('judging') ||
    title === 'hack the 6ix'
  )
    return 'main';
  if (
    title.includes('sponsor') ||
    title.includes('hosted by') ||
    title.includes('jane street')
  )
    return 'sponsor';
  return 'social';
};

const eventLocation = (event: ApiScheduleEvent): string | undefined =>
  event.location ?? event.room ?? event.venue ?? undefined;

export const apiEventsToScheduleEvents = (
  events: ApiScheduleEvent[],
): ScheduleEvent[] =>
  [
    ...events
      .filter((event) => event.eventName && event.startTime && event.endTime)
      .map((event) => ({
        id: event.eventId,
        title: event.eventName,
        category: inferCategory(event),
        location: eventLocation(event),
        start: event.startTime,
        end: event.endTime,
      }))
      .filter(
        (event) =>
          !pdfReplacedEventTitles.has(normalizeEventTitle(event.title)),
      ),
    ...pdfHackerScheduleEvents,
  ].sort(
    (a, b) =>
      a.start.localeCompare(b.start) ||
      a.end.localeCompare(b.end) ||
      a.title.localeCompare(b.title),
  );

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Toronto',
});

export const formatTime = (iso: string): string =>
  timeFormatter.format(new Date(iso));

export const eventState = (
  event: ScheduleEvent,
  now: number = Date.now(),
): WorkshopCardState => {
  const start = new Date(event.start).getTime();
  const end = new Date(event.end).getTime();
  if (now >= end) return 'disabled';
  if (now >= start && now < end) return 'active';
  return 'upcoming';
};

const dayKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'America/Toronto',
});

const dayLabelFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Toronto',
});

export const dayKey = (iso: string): string =>
  dayKeyFormatter.format(new Date(iso));

export const buildScheduleDays = (events: ScheduleEvent[]): ScheduleDay[] => {
  const labels = new Map<string, string>();
  for (const e of events) {
    if (!e.start) continue;
    const key = dayKey(e.start);
    if (!labels.has(key))
      labels.set(key, dayLabelFormatter.format(new Date(e.start)));
  }
  return Array.from(labels, ([key, label]) => ({ key, label })).sort((a, b) =>
    a.key.localeCompare(b.key),
  );
};

export const eventsForDayKey = (
  events: ScheduleEvent[],
  key: string,
): ScheduleEvent[] =>
  events
    .filter((e) => e.start && dayKey(e.start) === key)
    .sort((a, b) => a.start.localeCompare(b.start));

export interface ScheduleRow {
  time: string;
  events: ScheduleEvent[];
}

export const groupByStartTime = (events: ScheduleEvent[]): ScheduleRow[] => {
  const rows = new Map<string, ScheduleEvent[]>();
  for (const e of events) {
    const bucket = rows.get(e.start);
    if (bucket) bucket.push(e);
    else rows.set(e.start, [e]);
  }
  return Array.from(rows, ([start, group]) => ({
    time: formatTime(start),
    events: group,
  }));
};
