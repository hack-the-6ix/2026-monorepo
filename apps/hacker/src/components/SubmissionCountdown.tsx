'use client';

import { Fragment, useEffect, useState } from 'react';
import { Typography } from '@hackthe6ix/ui';

import { SUBMISSION_DEADLINE } from '@/data/event';

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO: TimeParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const calcRemaining = () =>
  Math.max(0, SUBMISSION_DEADLINE.getTime() - Date.now());

const toParts = (remainingMs: number): TimeParts => {
  const totalSecs = Math.floor(remainingMs / 1000);
  return {
    days: Math.floor(totalSecs / 86400),
    hours: Math.floor((totalSecs % 86400) / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
  };
};

const pad = (n: number) => n.toString().padStart(2, '0');

// Ticks client-side only: SSR would see a different Date.now() than the
// browser, so we start "not ready" and fill in on mount to avoid a
// hydration mismatch / flash of an incorrect value.
function useSubmissionCountdown() {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemainingMs(calcRemaining());
    const id = setInterval(() => setRemainingMs(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const ready = remainingMs !== null;
  const isOver = ready && remainingMs <= 0;
  const parts = ready ? toParts(remainingMs) : ZERO;

  return { ...parts, ready, isOver };
}

const UNITS: { key: keyof TimeParts; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function SubmissionCountdown() {
  const countdown = useSubmissionCountdown();

  if (countdown.isOver) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <Typography
          as="p"
          textSize="paragraph-sm"
          textWeight="semi-bold"
          textColor="text-white"
        >
          Submissions are closed
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Typography
        as="p"
        textSize="label"
        textWeight="semi-bold"
        textColor="text-white"
      >
        Time left until submission deadline:
      </Typography>

      <div
        className="grid items-center justify-center gap-x-1"
        style={{ gridTemplateColumns: 'repeat(7, auto)' }}
      >
        {UNITS.map((unit, i) => (
          <Fragment key={unit.key}>
            <Typography
              as="p"
              textSize="subtitle-sm"
              textWeight="extra-bold"
              textColor="text-[#F6BD55]"
              className="text-center tabular-nums"
            >
              {countdown.ready ? pad(countdown[unit.key]) : '--'}
            </Typography>
            {i < UNITS.length - 1 && (
              <Typography
                as="p"
                textSize="subtitle-sm"
                textWeight="bold"
                textColor="text-white/40"
                className="text-center"
                aria-hidden
              >
                :
              </Typography>
            )}
          </Fragment>
        ))}

        {UNITS.map((unit, i) => (
          <Fragment key={`${unit.key}-label`}>
            <Typography
              as="p"
              textSize="label"
              textWeight="semi-bold"
              textColor="text-white/60"
              className="text-center"
            >
              {unit.label}
            </Typography>
            {i < UNITS.length - 1 && <span aria-hidden />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
