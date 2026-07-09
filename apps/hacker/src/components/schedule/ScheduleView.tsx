'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Typography, WorkshopCard } from '@hackthe6ix/ui';
import cn from 'classnames';

import { EVENT_NAME } from '@/data/event';
import {
  categoryColor,
  eventsForDay,
  eventState,
  formatTime,
  scheduleCategories,
  type ScheduleCategoryKey,
  scheduleDays,
  type ScheduleEvent,
} from '@/data/schedule';

const ALL_CATEGORIES = new Set<ScheduleCategoryKey>(
  scheduleCategories.map((c) => c.key),
);

const SCROLLBAR_TRACK_INSET = 14;
const MIN_SCROLLBAR_THUMB = 44;

type FilterProps = {
  active: Set<ScheduleCategoryKey>;
  toggle: (key: ScheduleCategoryKey) => void;
  className?: string;
  /** Mobile only: render the checkboxes as a collapsible dropdown. */
  collapsible?: boolean;
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
            'grid grid-cols-2 gap-x-6 gap-y-3 lg:flex lg:flex-col',
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
                    // Category-coloured outline in every state; translucent
                    // colour fill when checked, a fainter tint when not.
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

  // Start null so SSR renders everything as "upcoming" (matching the first
  // client render), then update once mounted and refresh every minute.
  const [now, setNow] = useState<number | null>(null);
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

  const groups = useMemo(() => {
    const dayEvents = eventsForDay(day).filter((e) => active.has(e.category));
    const map = new Map<string, ScheduleEvent[]>();
    for (const e of dayEvents) {
      const time = formatTime(e.start);
      const bucket = map.get(time);
      if (bucket) bucket.push(e);
      else map.set(time, [e]);
    }
    return Array.from(map, ([time, events]) => ({ time, events }));
  }, [day, active]);

  const stateFor = (e: ScheduleEvent) =>
    now === null ? 'upcoming' : eventState(e, now);

  const updateScrollbar = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { clientHeight, scrollHeight, scrollTop } = el;
    const maxScrollTop = scrollHeight - clientHeight;
    if (maxScrollTop <= 1) {
      setScrollbar({
        visible: false,
        thumbHeight: 0,
        thumbTop: 0,
      });
      return;
    }

    const trackHeight = Math.max(clientHeight - SCROLLBAR_TRACK_INSET * 2, 0);
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
  }, [groups, updateScrollbar]);

  return (
    <div className="flex flex-col px-6 py-10 text-white md:h-full md:overflow-hidden md:px-8 md:pt-14 md:pb-0">
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

        <div className="mt-8 flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            {/* Filters (mobile / small screens) — collapsible dropdown */}
            <ScheduleFilters
              active={active}
              toggle={toggle}
              collapsible
              className="mb-4 shrink-0 rounded-2xl border border-white/25 bg-white/[0.06] bg-gradient-to-b from-white/[0.08] to-transparent ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] p-5 backdrop-blur-xl lg:hidden"
            />

            <div className="schedule-panel-pinned flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/25 bg-white/[0.06] bg-gradient-to-b from-white/[0.08] to-transparent ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl md:rounded-b-none md:border-b-0 md:ring-0">
              <div className="shrink-0 border-b border-white/10">
                {/* Desktop: day tabs */}
                <div className="hidden gap-8 overflow-x-auto px-6 pt-5 lg:flex">
                  {scheduleDays.map((d, i) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setDay(i)}
                      className={cn(
                        'whitespace-nowrap pb-3 text-sm font-semibold transition-colors',
                        i === day ?
                          'border-b-2 border-yellow-400 text-yellow-400'
                        : 'text-white/60 hover:text-white',
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Mobile: previous / next day navigator */}
                <div className="flex items-center justify-between px-4 py-4 lg:hidden">
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
                    {scheduleDays[day]?.label}
                  </Typography>
                  <button
                    type="button"
                    aria-label="Next day"
                    disabled={day === scheduleDays.length - 1}
                    onClick={() =>
                      setDay((d) => Math.min(scheduleDays.length - 1, d + 1))
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
                  {groups.length === 0 ?
                    <Typography
                      as="p"
                      textSize="paragraph-lg"
                      textColor="text-white/60"
                      className="py-10 text-center"
                    >
                      No events match the selected filters.
                    </Typography>
                  : groups.map((group) => {
                      const ongoing = group.events.some(
                        (e) => stateFor(e) === 'active',
                      );
                      return (
                        <div
                          key={group.time}
                          className="relative flex gap-3 border-b border-white/5 py-2.5 last:border-b-0 md:gap-6 lg:py-2"
                        >
                          {ongoing && (
                            <div className="pointer-events-none absolute inset-x-1 top-8 z-10 flex items-center">
                              <span className="size-3 shrink-0 rounded-full bg-red-500" />
                              <span className="h-0.5 flex-1 bg-red-500" />
                            </div>
                          )}
                          <div className="w-16 shrink-0 whitespace-nowrap pt-7 text-xs font-semibold text-white/70 md:w-20 md:text-sm">
                            {group.time}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:flex-row md:flex-wrap lg:gap-2">
                            {group.events.map((ev) => (
                              <WorkshopCard
                                key={ev.id}
                                className="w-full md:min-w-[240px] md:flex-1"
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
                    })
                  }
                </div>

                {scrollbar.visible && (
                  <div
                    aria-hidden="true"
                    data-schedule-scrollbar
                    className="pointer-events-none absolute top-3.5 right-2 bottom-3.5 hidden w-2 rounded-full bg-white/20 lg:block"
                  >
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

          {/* Filters (desktop) */}
          <aside className="hidden shrink-0 lg:block">
            <ScheduleFilters
              active={active}
              toggle={toggle}
              className="w-48 rounded-2xl border border-white/25 bg-white/[0.06] bg-gradient-to-b from-white/[0.08] to-transparent ring-1 ring-inset ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] p-5 backdrop-blur-xl"
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
