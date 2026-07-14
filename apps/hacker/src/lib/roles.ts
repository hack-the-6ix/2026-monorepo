import type { RoleType } from '@/types/status';

export interface RoleConfig {
  label: string;
  hex: string;
}

export const roleConfig: Record<RoleType, RoleConfig> = {
  hacker: { label: 'Hacker', hex: '#46ECD5' },
  sponsor: { label: 'Sponsor', hex: '#fbbf24' },
  volunteer: { label: 'Volunteer', hex: '#ef4444' },
  mentor: { label: 'Mentor', hex: '#3b82f6' },
  admin: { label: 'Organizer', hex: '#a855f7' },
};
