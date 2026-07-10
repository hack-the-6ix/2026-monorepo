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
  day?: number;
}

export const scheduleEvents: ScheduleEvent[] = [
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
