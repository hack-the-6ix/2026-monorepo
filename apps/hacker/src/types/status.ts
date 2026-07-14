export type HackerStatus =
  | 'under_review'
  | 'rejected'
  | 'waitlist'
  | 'accepted'
  | 'declined'
  | 'rsvped'
  | 'no_apply'
  | 'checked-in';

export type RoleType = 'hacker' | 'sponsor' | 'mentor' | 'volunteer' | 'admin';
