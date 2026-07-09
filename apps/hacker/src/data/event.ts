// Core event metadata. Adjust these when the real dates are locked in.
export const EVENT_NAME = 'Hack the 6ix 2026';
export const EVENT_LOCATION = 'Bahen Centre';

// America/Toronto (EDT, -04:00). Used for the sidebar countdown, the schedule
// "now" indicator, and gating the during-event dashboard.
export const EVENT_START = new Date('2026-07-17T09:00:00-04:00');
export const EVENT_END = new Date('2026-07-19T17:00:00-04:00');

/**
 * Flip to `true` once the schedule is published. Mirrors the existing
 * `IS_UNDER_CONSTRUCTION` flag pattern; keeps "schedule page remains the same"
 * true for pre-release states.
 */
export const SCHEDULE_RELEASED = true;
