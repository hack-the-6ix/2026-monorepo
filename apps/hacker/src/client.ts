export interface HackerRole {
  type: 'hacker';
  seasonCode: string;
  score: number;
  status:
    | 'no apply'
    | 'applied'
    | 'accepted'
    | 'rejected'
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

function getAccessToken() {
  const tokenFromStorage = localStorage.getItem('token') ?? '';
  const tokenFromCookie =
    document.cookie.match(/(?:^|; )token=([^;]+)/)?.[1] ?? '';

  return tokenFromStorage || decodeURIComponent(tokenFromCookie);
}

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const accessToken = getAccessToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (accessToken) {
    headers['X-Access-Token'] = accessToken;
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `${process.env.HT6_API_URL || 'https://v2.api.hackthe6ix.com/api'}/api/users/${userId}`,
    {
      headers,
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}
