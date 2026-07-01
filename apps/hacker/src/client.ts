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

export interface HackerRole {
  type: 'hacker';
  seasonCode: string;
  score: number;
  status:
    | 'no apply'
    | 'applied'
    | 'accepted'
    | 'rejected'
    | 'waitlisted'
    | 'declined'
    | 'rsvped'
    | 'checked-in'
    | null;
  nfcId: string | null;
}

export interface UserProfile {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  isAdmin: boolean;
  roles: Array<
    | HackerRole
    | {
        type: 'sponsor';
        seasonCode: string;
        org: string | null;
      }
    | {
        type: 'mentor';
        seasonCode: string;
      }
    | {
        type: 'volunteer';
        seasonCode: string;
      }
  >;
}

export async function fetchHt6<T, P = unknown>(
  path: string,
  options: { body?: P; method?: string } = {},
): Promise<T> {
  const headers: Record<string, string> = {};

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

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const baseUrl = process.env.NEXT_PUBLIC_HT6_API_URL || '/api/ht6';
  const response = await fetch(`${baseUrl}/users/${userId}`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}
