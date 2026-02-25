'use client';

import React from 'react';
import Image from 'next/image';
import { butterfliesFrames } from '../lib/butterfliesAssets';

const TAP_DURATION_MS = 2500;
// Suppress synthetic mouseenter/mouseleave that browsers fire after touch
const TOUCH_MOUSE_DEBOUNCE_MS = 500;

export function ButterfliesAnimated() {
  const [hovered, setHovered] = React.useState(false);
  const [tapActive, setTapActive] = React.useState(false);
  const [frame, setFrame] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const tapTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchHappenedRef = React.useRef(false);
  const touchDebounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  const active = hovered || tapActive;

  React.useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setFrame(f => (f + 1) % butterfliesFrames.length);
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setFrame(0);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active]);

  // Attach as non-passive so preventDefault() actually works
  React.useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      // Flag touch so the subsequent synthetic mouseenter is ignored
      touchHappenedRef.current = true;
      if (touchDebounceRef.current) clearTimeout(touchDebounceRef.current);
      touchDebounceRef.current = setTimeout(() => {
        touchHappenedRef.current = false;
      }, TOUCH_MOUSE_DEBOUNCE_MS);
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      setTapActive(true);
      tapTimeoutRef.current = setTimeout(() => {
        setTapActive(false);
        tapTimeoutRef.current = null;
      }, TAP_DURATION_MS);
    };
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => el.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <div
      ref={divRef}
      className={`group absolute right-[280px] top-[317.89px] w-[214px] h-[533px] cursor-pointer pointer-events-auto${active ? ' animate-subtle-bounce' : ''}`}
      aria-hidden="true"
      onMouseEnter={() => { if (!touchHappenedRef.current) setHovered(true); }}
      onMouseLeave={() => { if (!touchHappenedRef.current) setHovered(false); }}
    >
      <div className="w-full h-full animate-pulse">
        <Image
          key={frame}
          src={butterfliesFrames[frame]}
          alt=""
          width={214}
          height={533}
          className="asset-image"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}