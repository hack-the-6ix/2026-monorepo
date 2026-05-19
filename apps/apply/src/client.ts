export interface ApiResponse<Data> {
  status: number;
  message: Data;
}

export async function fetchHt6<T, P = undefined>(
  path: string,
  options: { body?: P; method?: string } = {},
): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['X-Access-Token'] = token;
  }

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers,
    credentials: 'include',
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const baseUrl = process.env.HT6_API_URL;
  const response = await fetch(`${baseUrl}${path}`, fetchOptions);

  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
}

export interface UpsertResponsePayload {
  sessionToken?: string;
  targetUserId?: string;
  responseJson: Record<string, unknown> | null;
  isSubmitted: boolean;
}

export async function upsertFormResponse(
  body: UpsertResponsePayload,
): Promise<ApiResponse<Record<string, never>>> {
  const path = `/seasons/S26/forms/${process.env.FORM_ID}/responses`;

  return await fetchHt6<
    ApiResponse<Record<string, never>>,
    UpsertResponsePayload
  >(path, {
    method: 'POST',
    body,
  });
}
