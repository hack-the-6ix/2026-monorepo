import { NextRequest } from 'next/server';

import { fetchHt6 } from './client';

export const seasonCode = process.env.NEXT_PUBLIC_SEASON_CODE || 'S26';
export const hackathonCheckInEventId = 'ed5cad7c-e893-4973-8901-2c3a54486f52';
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
  state?: string | null;
  nfcId: string | null;
  teamId: string | null;
}

export interface MessageResponse {
  message: string;
}

export interface SeasonEvent {
  seasonCode: string;
  eventId: string;
  eventName: string;
  startTime: string | null;
  endTime: string | null;
  category?: string | null;
  eventType?: string | null;
  type?: string | null;
  location?: string | null;
  room?: string | null;
  venue?: string | null;
}

export interface PaginatedResponse<Data> {
  data: Data[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const schedulePageSize = 100;

export interface CreateTeamBody {
  teamName: string;
}

export interface ModifyTeamBody {
  teamName?: string;
}

export interface UpsertResponsePayload {
  sessionToken?: string;
  targetUserId?: string;
  responseJson: Record<string, unknown> | null;
  isSubmitted: boolean;
}

export interface ApiResponse<Data> {
  status: number;
  message: Data;
}

export interface FormResponseItem {
  formResponseId: string;
  formId: string;
  userId: string;
  seasonCode: string;
  responseJson: Record<string, unknown> | null;
  isSubmitted: boolean;
  updatedAt: string;
}

export interface PaginatedFormResponses {
  data: FormResponseItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface FormResponse {
  seasonCode: string;
  responseJson: Record<string, string> | null;
}

export interface CheckInRecord {
  seasonCode?: string;
  eventId: string;
  userId: string;
  authorId?: string | null;
  checkInNotes?: string | null;
  createdAt?: string;
}

export type GetUserCheckInsResponse =
  | PaginatedResponse<CheckInRecord>
  | CheckInRecord[];

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

export async function listScheduleEvents(): Promise<SeasonEvent[]> {
  const response = await fetchHt6<PaginatedResponse<SeasonEvent>>(
    `/seasons/${seasonCode}/events?page=1&pageSize=${schedulePageSize}`,
  );

  // Return empty array safely if no data comes back
  if (!response?.data) return [];

  // Filter out the global hackathon check-in event
  return response.data.filter(
    (event) => event.eventId !== hackathonCheckInEventId,
  );
}

export async function getUserCheckIns(
  userId: string,
  code = seasonCode,
): Promise<GetUserCheckInsResponse> {
  return fetchHt6<GetUserCheckInsResponse>(
    `/seasons/${code}/check-ins?userId=${encodeURIComponent(userId)}`,
    {
      method: 'GET',
    },
  );
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

export async function changeHackerRsvpStatus(
  userId: string,
  status: 'rsvped' | 'declined',
  seasonCode: string,
): Promise<MessageResponse> {
  const body = {
    response: status,
  };
  return fetchHt6<MessageResponse>(
    `/seasonCode/${seasonCode}/hackers/${userId}/rsvp`,
    {
      method: 'POST',
      body,
    },
  );
}

const rsvpFormId = 'd28f0204-e7a4-4ea3-b2a2-852b67a483ae';

export async function upsertFormResponse(
  body: UpsertResponsePayload,
): Promise<ApiResponse<Record<string, never>>> {
  const path = `/seasons/S26/forms/${rsvpFormId}/responses`;

  return await fetchHt6<
    ApiResponse<Record<string, never>>,
    UpsertResponsePayload
  >(path, {
    method: 'POST',
    body,
  });
}

export async function getResponse(): Promise<PaginatedFormResponses> {
  const path = '/seasons/S26/responses';

  return await fetchHt6<PaginatedFormResponses>(path);
}

export async function getUserIdFromNfc(
  nfcId: string,
): Promise<{ userId: string }> {
  return fetchHt6<{ userId: string }>(`/seasons/S26/nfc/id/${nfcId}`, {
    method: 'GET',
  });
}

export async function getSocialsFormFromNfc(
  seasonCode: string,
  nfcId: string,
): Promise<FormResponse> {
  return fetchHt6<FormResponse>(
    `/seasons/${seasonCode}/nfc/${nfcId}/social-response`,
    {
      method: 'GET',
    },
  );
}
