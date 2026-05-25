export const seasonCode = process.env.NEXT_PUBLIC_SEASON_CODE || 'S26';
const teamIdStorageKey = `hacker:${seasonCode}:teamId`;
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
  status: string;
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

export interface MessageResponse {
  message: string;
}

export interface CreateTeamBody {
  teamName: string;
}

export interface ModifyTeamBody {
  teamName?: string;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    Array.isArray(error.error) &&
    error.error[0] &&
    typeof error.error[0] === 'object' &&
    'message' in error.error[0] &&
    typeof error.error[0].message === 'string'
  ) {
    return error.error[0].message;
  }

  return fallback;
}

export async function fetchHt6<T, P = unknown>(
  path: string,
  options: { body?: P; method?: string } = {},
): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {};

  if (token) {
    headers['X-Access-Token'] = token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers,
    credentials: 'include',
  };

  if (options.body) {
    if (options.body instanceof FormData) {
      fetchOptions.body = options.body;
    } else {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(options.body);
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_HT6_API_URL || '/api/ht6';
  const response = await fetch(`${baseUrl}${path}`, fetchOptions);

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
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

export async function getUserProfile(userId: string): Promise<UserProfile> {
  return fetchHt6<UserProfile>(`/users/${userId}`);
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

export function getStoredTeamId() {
  return localStorage.getItem(teamIdStorageKey);
}

export function setStoredTeamId(teamId: string) {
  localStorage.setItem(teamIdStorageKey, teamId);
}

export function clearStoredTeamId() {
  localStorage.removeItem(teamIdStorageKey);
}

export function getCurrentUserId() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const [, payload] = token.split('.');
  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(normalizedPayload)) as {
      id?: string;
      sub?: string;
      userId?: string;
    };

    return (
      decodedPayload.userId || decodedPayload.sub || decodedPayload.id || null
    );
  } catch {
    return null;
  }
}

export function isUuid(value: string | null) {
  return Boolean(value && uuidPattern.test(value));
}
