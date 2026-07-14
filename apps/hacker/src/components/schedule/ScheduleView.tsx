'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Typography, WorkshopCard } from '@hackthe6ix/ui';
import cn from 'classnames';

import { listScheduleEvents } from '@/actions';
import { getApiErrorMessage } from '@/client';
import { EVENT_NAME } from '@/data/event';
import {
  apiEventsToScheduleEvents,
  buildScheduleDays,
  categoryColor,
  eventsForDayKey,
  eventState,
  formatTime,
  scheduleCategories,
  type ScheduleCategoryKey,
  type ScheduleEvent,
} from '@/data/schedule';

const ALL_CATEGORIES = new Set<ScheduleCategoryKey>(
  scheduleCategories.map((c) => c.key),
);

const SCROLLBAR_TRACK_INSET = 14;
const MIN_SCROLLBAR_THUMB = 44;
const HOUR_HEIGHT = 140; // Height of 1 hour block on desktop in pixels

type FilterProps = {
  active: Set<ScheduleCategoryKey>;
  toggle: (key: ScheduleCategoryKey) => void;
  className?: string;
  collapsible?: boolean;
};

type ScheduleLayoutItem = {
  event: ScheduleEvent;
  top: number;
  height: number;
  left: string;
  width: string;
};

const ScheduleFilters = ({
  active,
  toggle,
  className,
  collapsible = false,
}: FilterProps) => {
  const [open, setOpen] = useState(false);
  const showItems = !collapsible || open;

  return (
    <div className={className}>
      {collapsible ?
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between"
        >
          <Typography
            as="span"
            textSize="subtitle-sm"
            textWeight="bold"
            textColor="text-white"
          >
            Filter
          </Typography>
          <FiChevronDown
            size={20}
            className={cn(
              'text-white transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>
      : <Typography
          as="p"
          textSize="subtitle-sm"
          textWeight="bold"
          textColor="text-white"
          className="mb-4"
        >
          Filter
        </Typography>
      }

      {showItems && (
        <div
          className={cn(
            'grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-col',
            collapsible && 'mt-4',
          )}
        >
          {scheduleCategories.map((cat) => {
            const on = active.has(cat.key);
            const color = `var(--color-workshop-${cat.color})`;
            return (
              <button
                key={cat.key}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(cat.key)}
                className="flex items-center gap-3"
              >
                <span
                  className="flex size-5 items-center justify-center rounded-md border-2 transition-colors"
                  style={{
                    borderColor: color,
                    backgroundColor:
                      on ?
                        `color-mix(in srgb, ${color} 45%, transparent)`
                      : `color-mix(in srgb, ${color} 15%, transparent)`,
                  }}
                >
                  {on && <FaCheck size={11} className="text-white" />}
                </span>
                <span className="text-sm text-white">{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Real-time indicator line (SVG). `className` positions it at a row's top or
// bottom edge.
const NowLine = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={cn('pointer-events-none absolute inset-x-1 z-20', className)}
    style={style}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/now-line.svg" alt="" aria-hidden className="w-full" />
  </div>
);

const ScheduleView = () => {
  const [day, setDay] = useState(0);
  const [active, setActive] =
    useState<Set<ScheduleCategoryKey>>(ALL_CATEGORIES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollbar, setScrollbar] = useState({
    visible: false,
    thumbHeight: 0,
    thumbTop: 0,
  });

  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSchedule = async () => {
      try {
        const apiEvents = await listScheduleEvents();
        if (cancelled) return;

        setEvents(apiEventsToScheduleEvents(apiEvents));
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(getApiErrorMessage(err, 'Unable to load schedule.'));
      } finally {
        if (!cancelled) setLoading(false);
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

  const toggle = (key: ScheduleCategoryKey) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const days = useMemo(() => buildScheduleDays(events), [events]);

  const { dayEvents, hours, desktopLayout } = useMemo(() => {
    const activeDay = days[day];
    if (!activeDay) return { dayEvents: [], hours: [], desktopLayout: [] };

    const filtered = eventsForDayKey(events, activeDay.key).filter((e) =>
      active.has(e.category),
    );

    if (filtered.length === 0)
      return { dayEvents: [], hours: [], desktopLayout: [] };

    const minTs = Math.min(...filtered.map((e) => new Date(e.start).getTime()));
    const maxTs = Math.max(...filtered.map((e) => new Date(e.end).getTime()));

    // Round start to nearest previous hour
    const startOfDay = new Date(minTs);
    startOfDay.setMinutes(0, 0, 0);

    // Round end to next hour
    const endOfDay = new Date(maxTs);
    if (endOfDay.getMinutes() > 0 || endOfDay.getSeconds() > 0) {
      endOfDay.setHours(endOfDay.getHours() + 1);
    }
    endOfDay.setMinutes(0, 0, 0);

    const hrList: number[] = [];
    for (let t = startOfDay.getTime(); t <= endOfDay.getTime(); t += 3600000) {
      hrList.push(t);
    }

    // Overlap Grid Layout
    const sorted = [...filtered].sort((a, b) => {
      const aStart = new Date(a.start).getTime();
      const bStart = new Date(b.start).getTime();
      const aEnd = new Date(a.end).getTime();
      const bEnd = new Date(b.end).getTime();
      return aStart - bStart || bEnd - aEnd; // sort by start time, then longest duration
    });

    const groups: ScheduleEvent[][] = [];
    let currentGroup: ScheduleEvent[] = [];
    let groupEnd = 0;

    sorted.forEach((ev) => {
      const start = new Date(ev.start).getTime();
      const end = new Date(ev.end).getTime();
      if (start >= groupEnd) {
        if (currentGroup.length > 0) groups.push(currentGroup);
        currentGroup = [ev];
        groupEnd = end;
      } else {
        currentGroup.push(ev);
        groupEnd = Math.max(groupEnd, end);
      }
    });
    if (currentGroup.length > 0) groups.push(currentGroup);

    const layout: ScheduleLayoutItem[] = [];
    groups.forEach((group) => {
      const columns: number[] = [];
      const colIndices = new Map<string, number>();

      group.forEach((ev) => {
        const start = new Date(ev.start).getTime();
        const end = new Date(ev.end).getTime();

        let colIndex = columns.findIndex((colEnd) => colEnd <= start);
        if (colIndex === -1) {
          colIndex = columns.length;
          columns.push(end);
        } else {
          columns[colIndex] = end;
        }
        // Save to the map instead of mutating the event
        colIndices.set(ev.id, colIndex);
      });

      const numCols = columns.length;
      group.forEach((ev) => {
        const start = new Date(ev.start).getTime();
        const end = new Date(ev.end).getTime();
        const top = ((start - hrList[0]) / 3600000) * HOUR_HEIGHT;
        const height = ((end - start) / 3600000) * HOUR_HEIGHT;
        const colIndex = colIndices.get(ev.id) ?? 0;

        layout.push({
          event: ev,
          top,
          height,
          left: `${(colIndex / numCols) * 100}%`,
          width: `${100 / numCols}%`,
        });
      });
    });

    return { dayEvents: filtered, hours: hrList, desktopLayout: layout };
  }, [days, day, active, events]);

  // Earliest event start for each day — used to decide which day "now" belongs to.
  const dayStarts = useMemo(
    () =>
      days.map((d) => {
        const evs = eventsForDayKey(events, d.key);
        return evs.length ?
            Math.min(...evs.map((e) => new Date(e.start).getTime()))
          : Number.POSITIVE_INFINITY;
      }),
    [days, events],
  );

  // Which day the marker sits on: the last day whose events have started, and
  // the first day before the event begins.
  const nowDayIndex = useMemo(() => {
    if (now === null || days.length === 0) return -1;
    let di = 0;
    for (let i = 0; i < dayStarts.length; i++) {
      const start = dayStarts[i];
      if (start !== undefined && now >= start) di = i;
    }
    return di;
  }, [now, days, dayStarts]);

  // Compute the current active hour interval to show the NowLine in mobile view
  const nowHourIndex = useMemo(() => {
    if (now === null || hours.length === 0) return -1;
    return hours.findIndex((h) => now >= h && now < h + 3600000);
  }, [now, hours]);

  const stateFor = (e: ScheduleEvent) =>
    now === null ? 'upcoming' : eventState(e, now);

  const updateScrollbar = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { clientHeight, scrollHeight, scrollTop } = el;
    const maxScrollTop = scrollHeight - clientHeight;
    const trackHeight = Math.max(clientHeight - SCROLLBAR_TRACK_INSET * 2, 0);

    // Always show the rail; when there's nothing to scroll the thumb fills it.
    if (maxScrollTop <= 1) {
      setScrollbar({
        visible: true,
        thumbHeight: trackHeight,
        thumbTop: 0,
      });
      return;
    }

    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      MIN_SCROLLBAR_THUMB,
    );
    const thumbTop =
      (scrollTop / maxScrollTop) * Math.max(trackHeight - thumbHeight, 0);

    setScrollbar({ visible: true, thumbHeight, thumbTop });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollbar();
    const observer = new ResizeObserver(updateScrollbar);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateScrollbar]);

  useEffect(() => {
    updateScrollbar();
  }, [dayEvents, hours, updateScrollbar]);

  return (
    <div className="flex flex-col px-6 py-10 text-white md:h-screen md:overflow-hidden md:px-6 md:pt-14 md:pb-0">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col overflow-hidden">
        <Typography as="h1" textSize="heading-lg" textWeight="bold">
          Event Schedule
        </Typography>
        <Typography
          as="p"
          textSize="paragraph-lg"
          textColor="text-white/70"
          className="mt-2"
        >
          Explore the schedule below and get excited for {EVENT_NAME}!
        </Typography>

        <div className="mt-8 flex min-h-0 flex-1 flex-col gap-6 md:flex-row">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <ScheduleFilters
              active={active}
              toggle={toggle}
              collapsible
              className="mb-4 shrink-0 rounded-2xl border border-white/25 bg-white/[0.06] bg-gradient-to-b from-white/[0.08] to-transparent ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] p-5 backdrop-blur-xl md:hidden"
            />

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.06] bg-gradient-to-b from-white/[0.08] to-transparent ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl md:rounded-b-none md:border-b-0 md:ring-0">
              <div className="shrink-0 border-b border-white/10">
                <div className="hidden px-6 pt-5 md:flex">
                  {days.map((d, i) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDay(i)}
                      className={cn(
                        'flex-1 whitespace-nowrap pb-3 text-center text-sm font-semibold transition-colors',
                        i === day ?
                          'border-b-2 border-yellow-400 text-yellow-400'
                        : 'text-white/60 hover:text-white',
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between px-4 py-4 md:hidden">
                  <button
                    type="button"
                    aria-label="Previous day"
                    disabled={day === 0}
                    onClick={() => setDay((d) => Math.max(0, d - 1))}
                    className="p-1 text-white/70 transition-colors hover:text-white disabled:opacity-30"
                  >
                    <FiChevronLeft size={22} />
                  </button>
                  <Typography
                    as="span"
                    textSize="paragraph-lg"
                    textWeight="semi-bold"
                    textColor="text-white"
                  >
                    {days[day]?.label ?? (loading ? 'Loading' : 'Schedule')}
                  </Typography>
                  <button
                    type="button"
                    aria-label="Next day"
                    disabled={day >= days.length - 1}
                    onClick={() =>
                      setDay((d) => Math.min(days.length - 1, d + 1))
                    }
                    className="p-1 text-white/70 transition-colors hover:text-white disabled:opacity-30"
                  >
                    <FiChevronRight size={22} />
                  </button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1">
                <div
                  ref={scrollRef}
                  onScroll={updateScrollbar}
                  className="schedule-scroll h-full overflow-y-scroll px-4 pt-3 pb-6 md:px-6"
                >
                  {loading ?
                    <Typography
                      as="p"
                      textSize="paragraph-lg"
                      textColor="text-white/60"
                      className="py-10 text-center"
                    >
                      Loading schedule...
                    </Typography>
                  : error ?
                    <Typography
                      as="p"
                      textSize="paragraph-lg"
                      textColor="text-white/60"
                      className="py-10 text-center"
                    >
                      {error}
                    </Typography>
                  : dayEvents.length === 0 ?
                    <Typography
                      as="p"
                      textSize="paragraph-lg"
                      textColor="text-white/60"
                      className="py-10 text-center"
                    >
                      {events.length === 0 ?
                        'No scheduled events yet.'
                      : 'No events match the selected filters.'}
                    </Typography>
                  : <>
                      {/* Mobile View: List layout partitioned into hourly blocks. 
                          Repeats long events in each intersected hour. */}
                      <div className="flex flex-col md:hidden">
                        {hours.slice(0, -1).map((hourTs, i) => {
                          const hourEnd = hourTs + 3600000;
                          const hourEvents = dayEvents.filter((e) => {
                            const start = new Date(e.start).getTime();
                            const end = new Date(e.end).getTime();
                            return start < hourEnd && end > hourTs;
                          });

                          return (
                            <div
                              key={hourTs}
                              className="relative flex gap-3 border-b border-white/5 py-4 last:border-b-0"
                            >
                              {day === nowDayIndex && i === nowHourIndex && (
                                <NowLine className="-top-3" />
                              )}
                              <div className="w-16 shrink-0 whitespace-nowrap pt-1 text-xs font-semibold text-white/70">
                                {formatTime(new Date(hourTs).toISOString())}
                              </div>
                              <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                                {hourEvents.map((ev) => (
                                  <WorkshopCard
                                    key={ev.id}
                                    className="w-full bg-[#3E4259]/55"
                                    title={ev.title}
                                    startTime={formatTime(ev.start)}
                                    endTime={formatTime(ev.end)}
                                    location={ev.location}
                                    color={categoryColor(ev.category)}
                                    state={stateFor(ev)}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Desktop View: Google Calendar style absolute positioning */}
                      <div className="relative hidden w-full pb-12 pt-4 md:block">
                        {/* Background Hour Grid */}
                        <div className="relative">
                          {hours.map((hourTs) => (
                            <div
                              key={hourTs}
                              className="flex border-b border-white/10"
                              style={{ height: HOUR_HEIGHT }}
                            >
                              <div className="w-20 shrink-0 pr-4 text-right text-sm font-semibold text-white/70">
                                <div className="-translate-y-1/2 transform">
                                  {formatTime(new Date(hourTs).toISOString())}
                                </div>
                              </div>
                              <div className="relative flex-1 border-l border-white/10" />
                            </div>
                          ))}
                        </div>

                        {/* Absolute Event Layout */}
                        {hours.length > 0 && (
                          <div className="absolute bottom-0 left-20 right-0 top-4">
                            {desktopLayout.map(
                              ({ event, top, height, left, width }) => (
                                <div
                                  key={event.id}
                                  className="absolute p-0.5"
                                  style={{ top, height, left, width }}
                                >
                                  <WorkshopCard
                                    className="h-full w-full overflow-hidden border border-white/5 bg-[#3E4259]/95 shadow-md hover:z-10"
                                    title={event.title}
                                    startTime={formatTime(event.start)}
                                    endTime={formatTime(event.end)}
                                    location={event.location}
                                    color={categoryColor(event.category)}
                                    state={stateFor(event)}
                                    height={height}
                                  />
                                </div>
                              ),
                            )}

                            {day === nowDayIndex &&
                              now !== null &&
                              now >= hours[0] &&
                              now <= hours[hours.length - 1] + 3600000 && (
                                <NowLine
                                  className="-mt-[5px] left-0 right-0"
                                  style={{
                                    top:
                                      ((now - hours[0]) / 3600000) *
                                      HOUR_HEIGHT,
                                  }}
                                />
                              )}
                          </div>
                        )}
                      </div>
                    </>
                  }
                </div>

                {scrollbar.visible && (
                  <div
                    aria-hidden="true"
                    data-schedule-scrollbar
                    className="pointer-events-none absolute bottom-0 right-2 top-3.5 hidden w-2 md:block"
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 [-webkit-mask-image:linear-gradient(to_bottom,#000_55%,transparent)] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" />
                    <div
                      className="absolute left-0 w-full rounded-full bg-white/65"
                      style={{
                        height: scrollbar.thumbHeight,
                        transform: `translateY(${scrollbar.thumbTop}px)`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="hidden shrink-0 md:block">
            <ScheduleFilters
              active={active}
              toggle={toggle}
              className="w-48 rounded-2xl border border-white/25 bg-white/[0.06] bg-gradient-to-b from-white/[0.08] to-transparent p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] ring-1 ring-inset ring-white/10 backdrop-blur-xl"
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
