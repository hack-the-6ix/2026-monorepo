import { NextRequest } from 'next/server';

import { fetchHt6 } from './client';

export const seasonCode = process.env.NEXT_PUBLIC_SEASON_CODE || 'S26';
const uuidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export interface Team {
  teamId: string;
  seasonCode: string;
  teamName: string;
  teamLeaderId: string;
}

export interface TeamMember {
  userId: string;
  firstName: string | null;
  lastName: string | null;
}

export interface TeamDetails extends Team {
  members: TeamMember[];
}

export interface UserProfile {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  isAdmin: boolean;
  roles: unknown[];
}

export interface HackerRole {
  type: 'hacker';
  seasonCode: string;
  score: number;
  status: string | null;
  nfcId: string | null;
  teamId: string | null;
}

export interface MessageResponse {
  message: string;
}

export interface CreateTeamBody {
  teamName: string;
}

export interface ModifyTeamBody {
  teamName?: string;
}

type FetchParams = Parameters<typeof fetch>;
export function fetchWithCookies(
  request: NextRequest,
  ...params: Parameters<typeof fetch>
): ReturnType<typeof fetch>;
export function fetchWithCookies(request: NextRequest): typeof fetch;
export function fetchWithCookies(
  request: NextRequest,
  url?: FetchParams[0],
  init?: FetchParams[1],
) {
  const fetcher = (...params: Parameters<typeof fetch>) => {
    params[1] = {
      ...params[1],
      headers: { Cookie: request.cookies.toString(), ...params[1]?.headers },
    };
    return fetch(...params);
  };

  if (url) return fetcher(url, init);
  return fetcher;
}

export async function listTeams(): Promise<Team[]> {
  return fetchHt6<Team[]>(`/seasons/${seasonCode}/teams`);
}

export async function createTeam(body: CreateTeamBody): Promise<Team> {
  return fetchHt6<Team, CreateTeamBody>(`/seasons/${seasonCode}/teams`, {
    method: 'POST',
    body,
  });
}

export async function getTeamDetails(teamId: string): Promise<TeamDetails> {
  return fetchHt6<TeamDetails>(`/seasons/${seasonCode}/teams/${teamId}`);
}

export async function getMe(): Promise<UserProfile> {
  return fetchHt6<UserProfile>('/users/me');
}

export function getHackerRole(profile: UserProfile) {
  return (
    profile.roles.find(
      (r): r is HackerRole =>
        typeof r === 'object' &&
        r !== null &&
        (r as HackerRole).type === 'hacker' &&
        (r as HackerRole).seasonCode === 'S26',
    ) ?? null
  );
}

export async function modifyTeam(
  teamId: string,
  body: ModifyTeamBody,
): Promise<Team> {
  return fetchHt6<Team, ModifyTeamBody>(
    `/seasons/${seasonCode}/teams/${teamId}`,
    {
      method: 'PATCH',
      body,
    },
  );
}

export async function joinTeam(teamId: string): Promise<MessageResponse> {
  return fetchHt6<MessageResponse>(
    `/seasons/${seasonCode}/teams/${teamId}/members`,
    {
      method: 'POST',
    },
  );
}

export async function leaveOrRemoveTeamMember(
  teamId: string,
  userId: string,
): Promise<MessageResponse> {
  return fetchHt6<MessageResponse>(
    `/seasons/${seasonCode}/teams/${teamId}/members/${userId}`,
    {
      method: 'DELETE',
    },
  );
}

export function isUuid(value: string | null) {
  return Boolean(value && uuidPattern.test(value));
}
