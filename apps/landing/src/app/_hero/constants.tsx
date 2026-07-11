/* 
TEMP file for hero ui content, this will need to be 
replaced later probably 
*/

export const EVENT_INFO = {
  date: 'July 17-19, 2026',
  location: 'Toronto',
  format: 'In\u2011Person',
} as const;

export const HERO_CONTENT = {
  title: 'Hack the 6ix',
  subtitlePrefix: 'Tumble down the rabbit hole and ',
  subtitleHighlight: ['create', 'collaborate', 'innovate', 'network'],
} as const;

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://2026.dash.hackthe6ix.com';

export const FORM_CONTENT = {
  description:
    'Applications are now closed. All decisions will be released on July 2nd on the dashboard!',
  buttonText: 'Go to Dashboard',
} as const;

export const META = {
  title: 'Hack the 6ix 2026',
  description: "Toronto's largest summer hackathon",
} as const;
