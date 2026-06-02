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

  const baseUrl = process.env.HT6_API_URL || '/api/ht6';
  const response = await fetch(`${baseUrl}${path}`, fetchOptions);

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}
