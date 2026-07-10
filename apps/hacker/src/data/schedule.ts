import type { WorkshopCardState, WorkshopColor } from '@hackthe6ix/ui';

import { fetchHt6 } from '@/client';

// ---------------------------------------------------------------------------
// Schedule data.
//
// Live events come from the backend (`GET /seasons/:seasonCode/events`) via
// `fetchScheduleEvents`. That endpoint only returns { eventId, eventName,
// startTime, endTime }, so `category` (colours + filter) is derived from the
// name on the frontend and `location` is omitted (the API has none).
// `scheduleEvents` below is a mock used only as a fallback if the fetch fails.
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
  /** Toronto calendar-day key, e.g. "2026-07-17". */
  key: string;
  /** Display label, e.g. "Fri, July 17". */
  label: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  category: ScheduleCategoryKey;
  location?: string;
  /** ISO datetimes. */
  start: string;
  end: string;
  /** Legacy day index used only by the mock fallback; live grouping uses dates. */
  day?: number;
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

// --- Day grouping (derived from event dates, in America/Toronto) ----------

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

/** Toronto calendar-day key for an ISO datetime, e.g. "2026-07-17". */
export const dayKey = (iso: string): string =>
  dayKeyFormatter.format(new Date(iso));

/** Distinct days present in `events`, sorted chronologically. */
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

/** Events on a given Toronto day, sorted by start time. */
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

/**
 * Group events that start at the same time into one row, so simultaneous
 * events render side-by-side. Input is pre-sorted by start, so rows stay
 * chronological. Grouping by start time (rather than merging any overlap)
 * keeps a long umbrella event — e.g. "Hack the 6ix" spanning the whole
 * weekend — from swallowing every other event into a single row.
 */
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

// --- Category inference (the backend events have no category) --------------

/** Best-effort category from the event name, for card colours + filtering. */
export const deriveCategory = (name: string): ScheduleCategoryKey => {
  const n = name.toLowerCase();
  if (
    /ceremony|opening|closing|judging|hacking|submission|kickoff|keynote|awards|winner/.test(
      n,
    )
  )
    return 'main';
  if (
    /workshop|tutorial|intro to|\b101\b|hack lab|bootcamp|learn|demo\b/.test(n)
  )
    return 'workshop';
  if (/sponsor|tech talk|recruit|career|networking|booth|fair/.test(n))
    return 'sponsor';
  if (
    /lunch|dinner|breakfast|brunch|snack|meal|food|social|karaoke|game|movie|trivia|mixer|party|break|midnight|coffee|yoga|scavenger|music|\bfun\b/.test(
      n,
    )
  )
    return 'social';
  return 'main';
};

// --- Live fetch ------------------------------------------------------------

/**
 * Events longer than this are treated as umbrella / all-weekend markers
 * (e.g. "Hack the 6ix" spanning the whole event, or stray test rows) rather
 * than real schedule items, and are hidden from the timeline.
 */
const MAX_EVENT_HOURS = 20;

interface ApiEvent {
  seasonCode: string;
  eventId: string;
  eventName: string;
  startTime: string | null;
  endTime: string | null;
}

interface EventsResponse {
  data: ApiEvent[];
  pagination?: { page: number; totalPages: number };
}

/**
 * Fetch the season's events from the backend and map them into
 * `ScheduleEvent`s (deriving category; the API provides no location).
 * Paginates up to a safe cap.
 */
export const fetchScheduleEvents = async (
  seasonCode: string,
): Promise<ScheduleEvent[]> => {
  const all: ApiEvent[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const res = await fetchHt6<EventsResponse>(
      `/seasons/${seasonCode}/events?page=${page}&pageSize=100`,
    );
    all.push(...(res.data ?? []));
    totalPages = res.pagination?.totalPages ?? 1;
    page += 1;
  } while (page <= totalPages && page <= 10);

  return all
    .filter((e): e is ApiEvent & { startTime: string; endTime: string } => {
      if (!e.startTime || !e.endTime) return false;
      const hours =
        (new Date(e.endTime).getTime() - new Date(e.startTime).getTime()) /
        3_600_000;
      // Drop zero/negative-length rows and long umbrella/background events.
      return hours > 0 && hours <= MAX_EVENT_HOURS;
    })
    .map((e) => ({
      id: e.eventId,
      title: e.eventName,
      category: deriveCategory(e.eventName),
      start: e.startTime,
      end: e.endTime,
    }));
};
