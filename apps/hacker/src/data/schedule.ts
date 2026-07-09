import type { WorkshopCardState, WorkshopColor } from '@hackthe6ix/ui';

// ---------------------------------------------------------------------------
// MOCK schedule data.
// The backend does not yet expose an events/schedule endpoint, so these events
// are hardcoded. When an endpoint is added, replace `scheduleEvents` with a
// fetch (keeping the same shape) and everything downstream keeps working.
// ---------------------------------------------------------------------------

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
  label: string;
  short: string;
}

export const scheduleDays: ScheduleDay[] = [
  { label: 'Fri, July 17', short: 'Jul 17' },
  { label: 'Sat, July 18', short: 'Jul 18' },
  { label: 'Sun, July 19', short: 'Jul 19' },
];

export interface ScheduleEvent {
  id: string;
  title: string;
  category: ScheduleCategoryKey;
  location: string;
  /** Day index into `scheduleDays`. */
  day: number;
  /** ISO datetimes (America/Toronto, -04:00). */
  start: string;
  end: string;
}

export const scheduleEvents: ScheduleEvent[] = [
  // Day 1 — Fri July 17
  {
    id: 'opening',
    title: 'Opening Ceremony',
    category: 'main',
    location: 'Main Hall',
    day: 0,
    start: '2026-07-17T09:00:00-04:00',
    end: '2026-07-17T10:00:00-04:00',
  },
  {
    id: 'hacking-begins',
    title: 'Hacking Begins',
    category: 'main',
    location: 'Main Hall',
    day: 0,
    start: '2026-07-17T10:00:00-04:00',
    end: '2026-07-17T10:30:00-04:00',
  },
  {
    id: 'react-workshop',
    title: 'Intro to React Workshop',
    category: 'workshop',
    location: 'Room 1180',
    day: 0,
    start: '2026-07-17T11:00:00-04:00',
    end: '2026-07-17T12:00:00-04:00',
  },
  {
    id: 'sponsor-bay-open',
    title: 'Sponsor Bay Opens',
    category: 'sponsor',
    location: 'Bahen Atrium',
    day: 0,
    start: '2026-07-17T12:00:00-04:00',
    end: '2026-07-17T13:00:00-04:00',
  },
  {
    id: 'lunch-1',
    title: 'Lunch',
    category: 'social',
    location: 'Cafeteria',
    day: 0,
    start: '2026-07-17T13:00:00-04:00',
    end: '2026-07-17T14:00:00-04:00',
  },
  {
    id: 'git-workshop',
    title: 'Git & GitHub Workshop',
    category: 'workshop',
    location: 'Room 1200',
    day: 0,
    start: '2026-07-17T15:00:00-04:00',
    end: '2026-07-17T16:00:00-04:00',
  },
  {
    id: 'cup-stacking',
    title: 'Cup Stacking',
    category: 'social',
    location: 'Atrium',
    day: 0,
    start: '2026-07-17T18:00:00-04:00',
    end: '2026-07-17T19:00:00-04:00',
  },
  {
    id: 'dinner-1',
    title: 'Dinner',
    category: 'social',
    location: 'Cafeteria',
    day: 0,
    start: '2026-07-17T19:00:00-04:00',
    end: '2026-07-17T20:00:00-04:00',
  },

  // Day 2 — Sat July 18
  {
    id: 'breakfast-2',
    title: 'Breakfast',
    category: 'social',
    location: 'Cafeteria',
    day: 1,
    start: '2026-07-18T08:00:00-04:00',
    end: '2026-07-18T09:00:00-04:00',
  },
  {
    id: 'ml-workshop',
    title: 'Intro to ML Workshop',
    category: 'workshop',
    location: 'Room 1180',
    day: 1,
    start: '2026-07-18T10:00:00-04:00',
    end: '2026-07-18T11:00:00-04:00',
  },
  {
    id: 'sponsor-talk',
    title: 'Sponsor Tech Talk',
    category: 'sponsor',
    location: 'Sponsor Bay',
    day: 1,
    start: '2026-07-18T12:00:00-04:00',
    end: '2026-07-18T13:00:00-04:00',
  },
  {
    id: 'lunch-2',
    title: 'Lunch',
    category: 'social',
    location: 'Cafeteria',
    day: 1,
    start: '2026-07-18T13:00:00-04:00',
    end: '2026-07-18T14:00:00-04:00',
  },
  {
    id: 'design-workshop',
    title: 'UI/UX Design Workshop',
    category: 'workshop',
    location: 'Room 1200',
    day: 1,
    start: '2026-07-18T15:00:00-04:00',
    end: '2026-07-18T16:00:00-04:00',
  },
  {
    id: 'karaoke',
    title: 'Karaoke Night',
    category: 'social',
    location: 'Atrium',
    day: 1,
    start: '2026-07-18T20:00:00-04:00',
    end: '2026-07-18T21:00:00-04:00',
  },

  // Day 3 — Sun July 19
  {
    id: 'submissions-due',
    title: 'Submissions Due',
    category: 'main',
    location: 'Devpost',
    day: 2,
    start: '2026-07-19T09:00:00-04:00',
    end: '2026-07-19T09:30:00-04:00',
  },
  {
    id: 'judging',
    title: 'Judging Expo',
    category: 'main',
    location: 'Main Hall',
    day: 2,
    start: '2026-07-19T10:00:00-04:00',
    end: '2026-07-19T12:00:00-04:00',
  },
  {
    id: 'closing',
    title: 'Closing Ceremony',
    category: 'main',
    location: 'Main Hall',
    day: 2,
    start: '2026-07-19T14:00:00-04:00',
    end: '2026-07-19T15:00:00-04:00',
  },
];

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Toronto',
});

/** e.g. "8:00 AM" — deterministic (fixed timezone), so SSR-safe. */
export const formatTime = (iso: string): string =>
  timeFormatter.format(new Date(iso));

/**
 * Time-based card state relative to `now` (defaults to Date.now()).
 * Pass a fixed `now` from a mounted effect to avoid hydration flicker.
 */
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

export const eventsForDay = (day: number): ScheduleEvent[] =>
  scheduleEvents
    .filter((e) => e.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));
