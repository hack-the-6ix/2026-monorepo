export interface ApiResponse<Data> {
  status: number;
  message: Data;
}

const formId =
  process.env.NEXT_PUBLIC_FORM_ID || 'd19d6cf2-9b05-4828-b0b1-65ac7867dcf5';

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
    if (options.body instanceof FormData) {
      fetchOptions.body = options.body;
    } else {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(options.body);
    }
  }

  const baseUrl =
    process.env.HT6_API_URL || 'https://v2.api.hackthe6ix.com/api';
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
  const path = `/seasons/S26/forms/${formId}/responses`;

  return await fetchHt6<
    ApiResponse<Record<string, never>>,
    UpsertResponsePayload
  >(path, {
    method: 'POST',
    body,
  });
}

export async function uploadResumeFile(
  file: File,
): Promise<{ fileId: string }> {
  const path = `/seasons/S26/forms/${formId}/questions/resumeBlob/files`;

  const formData = new FormData();
  formData.append('file', file);

  return await fetchHt6<{ fileId: string }, FormData>(path, {
    method: 'POST',
    body: formData,
  });
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

export async function getResponse(): Promise<PaginatedFormResponses> {
  const path = '/seasons/S26/responses';

  return await fetchHt6<PaginatedFormResponses>(path);
}
