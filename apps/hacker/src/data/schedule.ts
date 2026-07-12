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
  startTime?: string | null;
  endTime?: string | null;
  category?: string | null;
  eventType?: string | null;
  type?: string | null;
  location?: string | null;
  room?: string | null;
  venue?: string | null;
}

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
  event.location?.trim() ||
  event.room?.trim() ||
  event.venue?.trim() ||
  undefined;

export const apiEventsToScheduleEvents = (
  events: ApiScheduleEvent[],
): ScheduleEvent[] =>
  events
    .filter((event) => event.eventName && event.startTime && event.endTime)
    .map((event) => ({
      id: event.eventId,
      title: event.eventName,
      category: inferCategory(event),
      location: eventLocation(event),
      start: event.startTime as string,
      end: event.endTime as string,
    }))
    .sort(
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
    .filter((e) => dayKey(e.start) === key)
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
    events: [...group].sort((a, b) => a.title.localeCompare(b.title)),
  }));
};
