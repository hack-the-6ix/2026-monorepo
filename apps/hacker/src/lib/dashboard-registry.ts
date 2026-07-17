import { ComponentType } from 'react';

import type { HackerStatus, RoleType } from '@/types/status';

export type { RoleType };

export interface DashboardPage {
  id: string;
  title: string;
  roles: RoleType[];
  component: ComponentType;
  statuses?: HackerStatus[];
}

const registry = new Map<string, DashboardPage>();

export function registerDashboardPage(page: DashboardPage): void {
  registry.set(page.id, page);
}

export function getPagesForRoles(roles: RoleType[]): DashboardPage[] {
  return Array.from(registry.values()).filter((page) =>
    page.roles.some((role) => roles.includes(role)),
  );
}

export function getAvailablePages(
  roleTypes: RoleType[],
  status?: HackerStatus,
): DashboardPage[] {
  const pages = getPagesForRoles(roleTypes);
  return pages.filter((page) => {
    const hasNonHackerAccess = page.roles.some(
      (role) => role !== 'hacker' && roleTypes.includes(role),
    );

    if (hasNonHackerAccess || !page.statuses) {
      return true;
    }

    return Boolean(status && page.statuses.includes(status));
  });
}
